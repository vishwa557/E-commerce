import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, User, ArrowRight } from 'lucide-react';
import { FormInput } from './FormInput';
import { OtpInput } from './OtpInput';
import { useAuth } from '../hooks/useAuth';
import type { LoginCredentials, SignupCredentials } from '../types/auth';

type FormData = SignupCredentials;

type AuthFormProps = {
  type: 'login' | 'signup';
};

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [phone, setPhone] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { login, signup, sendOtp, verifyOtp, loading } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      if (step === 'details') {
        setPhone(data.phone);
        await sendOtp(data.phone);
        setStep('otp');
      } else {
        const enteredOtp = otp.join('');
        await verifyOtp(phone, enteredOtp);
        
        // After OTP verification, proceed with login/signup
        if (type === 'login') {
          const { name, ...loginData } = data;
          await login(loginData as LoginCredentials);
        } else {
          await signup(data);
        }
      }
    } catch (error) {
      // Error handling is managed by useAuth hook
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 'details' ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>

            {type === 'signup' && (
              <FormInput
                icon={User}
                register={register}
                name="name"
                placeholder="Full Name"
                validation={{ required: type === 'signup' }}
                error={errors.name?.message}
              />
            )}

            <FormInput
              icon={Mail}
              register={register}
              name="email"
              placeholder="Email Address"
              validation={{ 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email'
                }
              }}
              error={errors.email?.message}
            />

            <FormInput
              icon={Phone}
              register={register}
              name="phone"
              placeholder="Phone Number"
              validation={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              }}
              error={errors.phone?.message}
            />

            <FormInput
              icon={Lock}
              register={register}
              name="password"
              type="password"
              placeholder="Password"
              validation={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
              error={errors.password?.message}
            />
          </>
        ) : (
          <OtpInput otp={otp} onChange={handleOtpChange} />
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
          ) : step === 'details' ? (
            <>
              {type === 'login' ? 'Login' : 'Sign Up'}
              <ArrowRight size={20} />
            </>
          ) : (
            'Verify OTP'
          )}
        </motion.button>

        <p className="text-center text-gray-600">
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => window.location.href = '/signup'}
                className="text-purple-600 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => window.location.href = '/login'}
                className="text-purple-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </form>
    </motion.div>
  );
};