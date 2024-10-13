import React from 'react';
import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa';

type CheckboxProps = {
  id?: string;
  label?: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string; // Additional classes for customization
  size?: 'small' | 'normal' | 'large'; // Option for different sizes
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className,
  size = 'normal',
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center border-2 rounded transition duration-200';
  const sizeStyles = {
    small: 'w-4 h-4',
    normal: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  return (
    <div className={clsx('flex items-center', className)}>
      <div
        className={clsx(baseStyles, sizeStyles[size], {
          'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800': !checked,
          'border-[#5c37a6] bg-[#5c37a6] dark:border-[#5c37a6] dark:bg-[#5c37a6]': checked,
          'cursor-not-allowed opacity-50': disabled,
        })}
        onClick={!disabled ? onChange : undefined}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
      >
        {checked && <FaCheck className="w-3 h-3 text-white" />}
      </div>
      {label && (
        <label
          htmlFor={id}
          className={clsx('ml-3 text-gray-700 dark:text-gray-300 select-none', {
            'cursor-not-allowed opacity-50': disabled,
          })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;