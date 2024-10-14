import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'warning' | 'error' | 'success';
  size?: 'small' | 'normal' | 'large'; // Adjusted to manage padding and font size only
  radius?: 'square' | 'md' | 'lg' | 'full'; // Radius prop
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | 'icon-button';
  className?: string; // Allow custom class names
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal', // Default size is 'normal'
  radius = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className,
}) => {
  const baseStyles = 'font-semibold transition duration-200';

  const variantStyles = {
    primary: `
      bg-[#6941C6] text-white font-bold hover:bg-[#5c37a6]
      dark:bg-gradient-to-r dark:from-[#C1B5FD] dark:to-[#AC9DFC] dark:text-black
    `,
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black',
    error: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:text-white',
    success: 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:text-white',
  };

  const sizeStyles = {
    small: 'text-sm px-3 py-1', // Smaller padding and font size for small buttons
    normal: 'text-base px-4 py-2', // Normal padding and font size for normal buttons
    large: 'text-lg px-6 py-3', // Larger padding and font size for large buttons
  };

  const radiusStyles = {
    square: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

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
        className,
        {
          'opacity-50 cursor-not-allowed': disabled, // Additional styles for disabled state
          'flex items-center space-x-2': type === 'icon-button', // Styles for icon-button type
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;