import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://127.0.0.1:8000/register', {
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        password: data.password,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input {...register('username')} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email')} />
        </div>
        <div>
          <label>Full Name:</label>
          <input {...register('full_name')} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register('password')} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
