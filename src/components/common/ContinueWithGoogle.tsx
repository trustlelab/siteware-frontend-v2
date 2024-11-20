import GoogleLogo from '../../assets/icons/brand/google.svg'; // Adjust the path as needed
import React from 'react';

interface ContinueWithGoogleProps {
  text: string;
}

const ContinueWithGoogle: React.FC<ContinueWithGoogleProps> = ({ text }) => {
  return (
    <button className="flex justify-center items-center space-x-[12px] border-[#D0D5DD] dark:border-white hover:opacity-65 border dark:border-opacity-[30%] rounded-lg w-full h-[48px] font-bold text-black dark:text-white">
      <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" onError={(e) => (e.currentTarget.style.display = 'none')} />
      <span>{text}</span>
    </button>
  );
};

export default ContinueWithGoogle;
