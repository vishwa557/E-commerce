import React from 'react';

type OtpInputProps = {
  otp: string[];
  onChange: (index: number, value: string) => void;
};

export const OtpInput: React.FC<OtpInputProps> = ({ otp, onChange }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Enter OTP</h2>
    <p className="text-center text-gray-600 mb-6">
      We've sent a code to your phone
    </p>
    <div className="flex justify-center gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(index, e.target.value)}
          className="w-14 h-14 text-center text-2xl font-bold rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      ))}
    </div>
  </div>
);