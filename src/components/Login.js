import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      await axios.post(`http://localhost:8000/send_verification_code`, { phone });
      setStep(2);
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/verify_code`, { phone, code });
      localStorage.setItem('token', response.data.access_token);
      window.location.href = '/protected';
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendCode}>Send Verification Code</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter the verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default Login;
