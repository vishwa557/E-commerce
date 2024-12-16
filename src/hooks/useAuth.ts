import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import type {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
} from '../types/auth';
import toast from 'react-hot-toast';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSuccess = (response: AuthResponse) => {
    localStorage.setItem('authToken', response.token);
    // You can also store user data in a global state management solution like Redux
    localStorage.setItem('user', JSON.stringify(response.user));
    navigate('/dashboard');
  };

  const handleError = (error: any) => {
    setError(error.message || 'An error occurred');
    toast.error(error.message || 'An error occurred');
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      handleSuccess(response);
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.signup(credentials);
      handleSuccess(response);
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (phone: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.sendOtp(phone);
      toast.success(response.message);
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.verifyOtp({ phone, otp });
      handleSuccess(response);
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    signup,
    sendOtp,
    verifyOtp,
    loading,
    error,
  };
}