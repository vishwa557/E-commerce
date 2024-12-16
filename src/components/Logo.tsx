import React from 'react';
import { Shirt } from 'lucide-react';

export const Logo: React.FC = () => (
  <div className="flex items-center gap-2 mb-12">
    <Shirt size={32} className="text-purple-600" />
    <h1 className="text-3xl font-bold text-gray-800">Saree Elegance</h1>
  </div>
);