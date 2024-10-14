import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const FilterAgentAndSearch: React.FC = () => {
  const { t } = useTranslation('filter'); // Use 'filter' namespace
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'text' | 'voice'>('text');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleFilterChange = (filter: 'text' | 'voice') => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={t('search_agents')} // Translated placeholder
        className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-black dark:text-white focus:outline-none"
      />

      <div className="flex items-center dark:border-gray-700 border rounded-full">
        <button
          onClick={() => handleFilterChange('text')}
          className={`px-4 py-2 rounded-l-full ${activeFilter === 'text' ? 'bg-gray-200 dark:bg-gray-600' : 'bg-transparent'} focus:outline-none`}
        >
          {t('text_filter')} {/* Translated button label */}
        </button>
        <button
          onClick={() => handleFilterChange('voice')}
          className={`px-4 py-2 rounded-r-full ${activeFilter === 'voice' ? 'bg-gray-200 dark:bg-gray-600' : 'bg-transparent'} focus:outline-none`}
        >
          {t('voice_filter')} {/* Translated button label */}
        </button>
      </div>

      <button className="p-2 focus:outline-none">
        <FiFilter size={20} />
      </button>
    </div>
  );
};

export default FilterAgentAndSearch;
