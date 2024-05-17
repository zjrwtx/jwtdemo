import os
import random
import string
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from redis import Redis
from sqlalchemy import create_engine, Column, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from alibabacloud_dysmsapi20170525.client import Client as Dysmsapi20170525Client
from alibabacloud_dysmsapi20170525 import models as dysmsapi_20170525_models
from alibabacloud_tea_openapi import models as open_api_models
from passlib.context import CryptContext
from jose import JWTError, jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
REDIS_URL = os.getenv("REDIS_URL")

# Initialize FastAPI app
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"
    username = Column(String(50), primary_key=True, index=True)
    phone = Column(String(20), unique=True, index=True)
    hashed_password = Column(String(100))
    disabled = Column(Boolean, default=False)

Base.metadata.create_all(bind=engine)

# Redis setup
redis_client = Redis.from_url(REDIS_URL)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# JWT settings
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# SMS client setup
def create_client() -> Dysmsapi20170525Client:
    config = open_api_models.Config(
        access_key_id=os.getenv('ALIBABA_CLOUD_ACCESS_KEY_ID'),
        access_key_secret=os.getenv('ALIBABA_CLOUD_ACCESS_KEY_SECRET')
    )
    config.endpoint = 'dysmsapi.aliyuncs.com'
    return Dysmsapi20170525Client(config)

sms_client = create_client()

# Pydantic models
class PhoneNumber(BaseModel):
    phone: str

class VerifyCode(BaseModel):
    phone: str
    code: str

# Helper functions
def send_sms(phone: str, code: str):
    send_sms_request = dysmsapi_20170525_models.SendSmsRequest(
        sign_name='阿里云短信测试',
        template_code='SMS_154950909',
        phone_numbers=phone,
        template_param=f'{{"code":"{code}"}}'
    )
    try:
        resp = sms_client.send_sms(send_sms_request)
        return resp.body.code == 'OK'
    except Exception as e:
        return False

def create_random_code(length=6):
    return ''.join(random.choices(string.digits, k=length))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# API Endpoints
@app.post("/send_verification_code")
async def send_verification_code(data: PhoneNumber, db: Session = Depends(get_db)):
    code = create_random_code()
    success = send_sms(data.phone, code)
    if success:
        redis_client.setex(f"code:{data.phone}", timedelta(minutes=10), code)
        return {"success": True}
    else:
        raise HTTPException(status_code=500, detail="Failed to send SMS")

@app.post("/verify_code")
async def verify_code(data: VerifyCode, db: Session = Depends(get_db)):
    stored_code = redis_client.get(f"code:{data.phone}")
    if stored_code is None or stored_code.decode() != data.code:
        raise HTTPException(status_code=400, detail="Invalid or expired code")

    user = db.query(UserModel).filter(UserModel.phone == data.phone).first()
    if user:
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return {"success": True, "access_token": access_token}
    else:
        new_user = UserModel(
            username=data.phone,
            phone=data.phone,
            hashed_password=pwd_context.hash(data.code)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": new_user.username}, expires_delta=access_token_expires
        )
        return {"success": True, "access_token": access_token}
