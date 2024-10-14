import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'warning' | 'error' | 'success';
  size?: 'small' | 'normal' | 'large';
  radius?: 'square' | 'md' | 'lg' | 'full';
  elevated?: boolean; // New elevated prop to manage shadow
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | 'icon-button';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  radius = 'md',
  elevated = false, // Default is no shadow
  onClick,
  disabled = false,
  type = 'button',
  className,
}) => {
  const baseStyles = 'font-semibold transition duration-200 focus:outline-none focus:ring-4';

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
      hover:bg-gradient-to-br 
      focus:ring-purple-300 dark:focus:ring-purple-800 
      text-white
    `,
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black',
    error: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:text-white',
    success: 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:text-white',
  };

  const sizeStyles = {
    small: 'text-sm px-3 py-1',
    normal: 'text-base px-4 py-2',
    large: 'text-lg px-6 py-3',
  };

  const radiusStyles = {
    square: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const shadowStyles = elevated
    ? 'shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80'
    : ''; // Shadow applied if elevated is true

  return (
    <button
      type={type === 'icon-button' ? 'button' : type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        radiusStyles[radius],
        shadowStyles, // Apply shadow conditionally
        className,
        {
          'opacity-50 cursor-not-allowed': disabled,
          'flex items-center space-x-2': type === 'icon-button',
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
