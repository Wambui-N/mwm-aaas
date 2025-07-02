'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({ 
  children, 
  icon: Icon, 
  variant = 'primary', 
  size = 'md',
  className = "",
  onClick 
}: CTAButtonProps) {
  const baseClasses = "font-medium transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-black hover:bg-gray-800 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-black",
    outline: "border border-gray-300 hover:border-gray-400 text-black"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Button 
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        onClick={onClick}
      >
        {Icon && <Icon className="mr-2 w-4 h-4" />}
        {children}
      </Button>
    </motion.div>
  );
} 