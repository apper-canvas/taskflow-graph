import React from 'react';
import { cn } from '@/utils/cn';

const Input = React.forwardRef(({ 
  type = 'text', 
  className = '',
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2 border rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder-gray-400";
  
  const variants = {
    default: "border-gray-300 focus:border-primary focus:ring-primary/20",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500/20"
  };

  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, error ? variants.error : variants.default, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;