import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { VoiceIcon } from '../../assets/icons/Icons';

const FilterAgentAndSearch: React.FC = () => {
  const { t } = useTranslation(); // Use 'filter' namespace
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Voice Agents');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
      <div className='h-10 px-3.5 py-3 bg-white dark:bg-gray-800 rounded-lg shadow border border-[#cfd4dc] dark:border-gray-700 justify-start items-center gap-2 inline-flex'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" /> </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={t('search_agents')} // Translated placeholder
          className="bg-transparent text-[#344053] dark:text-white outline-none"
        />
      </div>

      <div className="h-10 rounded-lg shadow border border-[#cfd4dc] dark:border-gray-700 justify-start items-start inline-flex">
        <div
          onClick={() => handleTabClick('Voice Agents')}
          className={`px-4 py-2.5 rounded-l-[12px] ${activeTab === 'Voice Agents' ? 'bg-[#f0ebff] dark:bg-[#4c1d95]' : 'bg-white dark:bg-gray-800'} border-r border-[#cfd4dc] dark:border-gray-700 justify-center items-center gap-2 flex cursor-pointer`}
        >
         <VoiceIcon/>
          <div className="text-[#7e56d8] dark:text-[#d3bffd] text-sm font-bold font-['Manrope'] leading-tight">Voice Agents</div>
        </div>
        <div
          onClick={() => handleTabClick('Text-Based Agents')}
          className={`px-4 py-2.5 ${activeTab === 'Text-Based Agents' ? 'bg-[#f0ebff] dark:bg-[#4c1d95]' : 'bg-white dark:bg-gray-800'} border-r border-[#cfd4dc] dark:border-gray-700 justify-center items-center gap-2 flex cursor-pointer`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <g clipPath="url(#clip0_1_13247)"> <path d="M8.33317 12.4998L5.77046 15.0946C5.41299 15.4565 5.23426 15.6375 5.08063 15.6502C4.94735 15.6613 4.81685 15.6077 4.7298 15.5062C4.62947 15.3892 4.62947 15.1348 4.62947 14.6261V13.3262C4.62947 12.8698 4.25573 12.5396 3.80417 12.4734V12.4734C2.71129 12.3134 1.85298 11.4551 1.6929 10.3622C1.6665 10.182 1.6665 9.96693 1.6665 9.53687V5.6665C1.6665 4.26637 1.6665 3.56631 1.93899 3.03153C2.17867 2.56112 2.56112 2.17867 3.03153 1.93899C3.56631 1.6665 4.26637 1.6665 5.6665 1.6665H11.8332C13.2333 1.6665 13.9334 1.6665 14.4681 1.93899C14.9386 2.17867 15.321 2.56112 15.5607 3.03153C15.8332 3.56631 15.8332 4.26637 15.8332 5.6665V9.1665M15.8332 18.3332L14.0195 17.0722C13.7645 16.895 13.6371 16.8064 13.4983 16.7435C13.3752 16.6878 13.2457 16.6472 13.1128 16.6227C12.963 16.5951 12.8078 16.5951 12.4973 16.5951H10.9998C10.0664 16.5951 9.59971 16.5951 9.24319 16.4134C8.92958 16.2536 8.67462 15.9987 8.51483 15.6851C8.33317 15.3285 8.33317 14.8618 8.33317 13.9284V11.8332C8.33317 10.8997 8.33317 10.433 8.51483 10.0765C8.67462 9.76292 8.92958 9.50795 9.24319 9.34816C9.59971 9.1665 10.0664 9.1665 10.9998 9.1665H15.6665C16.5999 9.1665 17.0666 9.1665 17.4232 9.34816C17.7368 9.50795 17.9917 9.76292 18.1515 10.0765C18.3332 10.433 18.3332 10.8997 18.3332 11.8332V14.0951C18.3332 14.8716 18.3332 15.2599 18.2063 15.5662C18.0371 15.9746 17.7127 16.2991 17.3043 16.4682C16.998 16.5951 16.6097 16.5951 15.8332 16.5951V18.3332Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </g> <defs> <clipPath id="clip0_1_13247"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>
          <div className="text-[#667085] dark:text-gray-300 text-sm font-semibold font-['Manrope'] leading-tight">Text-Based Agents</div>
        </div>
        <div
          onClick={() => handleTabClick('All Agents')}
          className={`px-4 py-2.5 ${activeTab === 'All Agents' ? 'bg-[#f0ebff] dark:bg-[#4c1d95]' : 'bg-white dark:bg-gray-800'} border-r border-[#cfd4dc] dark:border-gray-700 justify-center items-center gap-2 flex cursor-pointer`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path d="M18.3334 17.5V15.8333C18.3334 14.2801 17.2711 12.9751 15.8334 12.605M12.9167 2.7423C14.1383 3.23679 15.0001 4.43443 15.0001 5.83333C15.0001 7.23224 14.1383 8.42988 12.9167 8.92437M14.1667 17.5C14.1667 15.9469 14.1667 15.1703 13.913 14.5577C13.5747 13.741 12.9258 13.092 12.109 12.7537C11.4965 12.5 10.7199 12.5 9.16675 12.5H6.66675C5.11361 12.5 4.33704 12.5 3.72447 12.7537C2.90771 13.092 2.2588 13.741 1.92048 14.5577C1.66675 15.1703 1.66675 15.9469 1.66675 17.5M11.2501 5.83333C11.2501 7.67428 9.7577 9.16667 7.91675 9.16667C6.0758 9.16667 4.58341 7.67428 4.58341 5.83333C4.58341 3.99238 6.0758 2.5 7.91675 2.5C9.7577 2.5 11.2501 3.99238 11.2501 5.83333Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>
          <div className="text-[#667085] dark:text-gray-300 text-sm font-semibold font-['Manrope'] leading-tight">All Agents</div>
        </div>
      </div>
    </div>
  );
};

export default FilterAgentAndSearch;