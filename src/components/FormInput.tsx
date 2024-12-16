import React from 'react';
import { LucideIcon } from 'lucide-react';

type FormInputProps = {
  icon: LucideIcon;
  register: any;
  name: string;
  type?: string;
  placeholder: string;
  validation?: object;
  error?: string;
};

export const FormInput: React.FC<FormInputProps> = ({
  icon: Icon,
  register,
  name,
  type = 'text',
  placeholder,
  validation,
  error,
}) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      {...register(name, validation)}
      type={type}
      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      placeholder={placeholder}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);