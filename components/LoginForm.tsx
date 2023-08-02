// components/LoginForm.tsx

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from './AuthContext'; // Import useAuth from your AuthContext

interface LoginFormProps {
  setAuthenticated: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setAuthenticated }) => {
  const authContext = useAuth(); // Access the AuthContext using the useAuth hook

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Please provide both email and password.');
      return;
    }
    try {
      const success = await authContext.login(formData.email, formData.password);

      if (success) {
        // Handle successful login (redirect, show message, etc.)
        setAuthenticated(true);
       // Fetch and store user todos after successful login
        await authContext.fetchUserPosts();
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while trying to authenticate.');
    }
  };


  const handleInputFocus = () => {
    setError('');
  };

  return (
    <LoginFormContainer>
      <h2>Keel Social Login</h2>
      {error && <ErrorText>{error}</ErrorText>}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <Button onClick={handleLogin}>Login</Button>
    </LoginFormContainer>
  );
};


const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;



const Input = styled.input`
background-color: #f8f8f8;
border: none;
padding: 12px;
margin: 8px 0;
border-radius: 10px;
width: 50%;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
animation: ${slideIn} 0.5s ease-in-out;
&:focus {
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.5);
}
`;

const Button = styled.button`
background-color: #007bff;
color: white;
border: none;
border-radius: 10px;
padding: 12px 20px;
cursor: pointer;
font-weight: bold;
font-size: 16px;
transition: background-color 0.2s ease-in-out;
animation: ${slideIn} 0.5s ease-in-out;
&:hover {
  background-color: #0056b3;
}
`;

const ErrorText = styled.p`
  color: red;
  margin: 5px 0;
  animation: ${slideIn} 0.5s ease-in-out;
`;

export default LoginForm;
