import React, { useState } from 'react';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputProps = {
  id?: string;
  name?: string; // Added name prop
  label?: string;
  placeholder?: string;
  state?: 'normal' | 'error' | 'success' | 'warning';
  type?: 'text' | 'password' | 'email' | 'textarea';
  className?: string; // For additional custom styling
  value?: string; // Optional controlled value
  defaultValue?: string; // Optional uncontrolled default value
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // Pass original onChange handler
  required?: boolean; // Indicates if the input is required
  disabled?: boolean; // Indicates if the input is disabled
  error?: string; // Optional error message to be displayed below the input
  rows?: number; // Number of rows for textarea
};

const Input: React.FC<InputProps> = ({
  id,
  name, // Added name prop to Input
  label,
  placeholder = '',
  state = 'normal',
  type = 'text',
  className,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  error,
  rows,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles =
    'appearance-none border rounded-[8px] w-full py-[12px] px-[14px] text-gray-700 leading-tight focus:outline-none transition duration-200 dark:text-white dark:bg-[#1D2939] dark:border-white dark:border-opacity-[6%]';

  const stateStyles = {
    normal: 'border-gray-300 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-300 dark:focus:ring-purple-300',
    error: 'border-red-500 focus:border-red-300 focus:ring-1 focus:ring-red-300 dark:focus:border-red-300 dark:focus:ring-red-300',
    success: 'border-green-500 focus:border-green-300 focus:ring-1 focus:ring-green-300 dark:focus:border-green-300 dark:focus:ring-green-300',
    warning: 'border-yellow-500 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 dark:focus:border-yellow-300 dark:focus:ring-yellow-300',
  };

  const disabledStyles = disabled
    ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
    : '';

  const getIconColor = () => (showPassword ? 'gray' : 'gray');

  // Conditional rendering for input type password
  if (type === 'password') {
    return (
      <div className="relative mb-4">
        {label && (
          <label htmlFor={id} className="block mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          id={id}
          name={name} // Added name attribute
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={clsx(baseStyles, stateStyles[state], disabledStyles, className)}
        />
        <button
          type="button"
          className="top-12 right-3 absolute flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash color={getIconColor()} /> : <FaEye color={getIconColor()} />}
        </button>
        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  // Conditional rendering for input type textarea
  if (type === 'textarea') {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="block mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={id}
          name={name} // Added name attribute
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={rows}
          className={clsx(baseStyles, stateStyles[state], disabledStyles, className)}
        />
        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  // Default rendering for all other input types (text, email, etc.)
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name} // Added name attribute
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={clsx(baseStyles, stateStyles[state], disabledStyles, className)}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;