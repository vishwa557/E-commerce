import { API_ENDPOINTS } from '../config/api';
import { apiCall } from './api';
import type {
  LoginCredentials,
  SignupCredentials,
  OtpVerification,
  AuthResponse,
  OtpResponse,
} from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiCall<AuthResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    return apiCall<AuthResponse>(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async sendOtp(phone: string): Promise<OtpResponse> {
    return apiCall<OtpResponse>(API_ENDPOINTS.SEND_OTP, {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  async verifyOtp(data: OtpVerification): Promise<AuthResponse> {
    return apiCall<AuthResponse>(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};