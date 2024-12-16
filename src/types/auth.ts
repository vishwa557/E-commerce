export interface LoginCredentials {
  email: string;
  phone: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface OtpVerification {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export interface OtpResponse {
  message: string;
  success: boolean;
}