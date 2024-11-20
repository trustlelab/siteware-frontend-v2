import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../lib/Button';
import { BiPlus } from 'react-icons/bi';

const CATEGORIES = ['All templates', 'Category #1', 'Category #2', 'Category #3', 'Category #4', 'Category #5'];
const AGENTS_BY_CATEGORY: { [key: string]: { name: string; description: string }[] } = {
  'All templates': [
    { name: 'Nina', description: 'Generic sales model. Select this and you can further customize.' },
    { name: 'Max', description: 'Generic sales model. Select this and you can further customize.' },
    { name: 'John', description: 'Generic sales model. Select this and you can further customize.' },
    { name: 'Matthew', description: 'Generic sales model. Select this and you can further customize.' },
    { name: 'Lorenzo', description: 'Generic sales model. Select this and you can further customize.' },
    { name: 'Elisabeth', description: 'Generic sales model. Select this and you can further customize.' }
  ],
  'Category #1': [
    { name: 'Nina', description: 'Specialized sales model for Category #1.' },
    { name: 'Max', description: 'Specialized sales model for Category #1.' }
  ],
  'Category #2': [
    { name: 'John', description: 'Specialized sales model for Category #2.' }
  ],
  'Category #3': [
    { name: 'Matthew', description: 'Specialized sales model for Category #3.' }
  ],
  'Category #4': [
    { name: 'Lorenzo', description: 'Specialized sales model for Category #4.' }
  ],
  'Category #5': [
    { name: 'Elisabeth', description: 'Specialized sales model for Category #5.' }
  ]
};

const ExploreAgents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All templates');
  const [agents, setAgents] = useState(AGENTS_BY_CATEGORY['All templates']);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleCreateClick = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleCategoryClick = (category: string): void => {
    setSelectedCategory(category);
    setAgents(AGENTS_BY_CATEGORY[category] || []);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Modal className="border-gray-700 dark:bg-gray-800 border rounded-lg" isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-[1076px] space-x-[96px] flex mt-4 h-[761px] relative bg-white dark:bg-gray-800 rounded-xl p-8">
          <div>
            <div className="text-[#101828] dark:text-white text-sm font-bold mb-4">BY CATEGORY</div>
            <div className="flex flex-col gap-4 w-[129px]">
              {CATEGORIES.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-[#344053] dark:text-white text-sm font-medium cursor-pointer ${selectedCategory === category ? 'bg-[#f0ebff] dark:bg-[#4c1d95] text-[#6840c6] dark:text-white p-2 rounded-md -ml-3' : ''}`}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">

            <div className='h-10 px-3.5 py-3 w-[403px] bg-white dark:bg-gray-800 rounded-lg shadow border border-[#cfd4dc] dark:border-gray-700 justify-start items-center gap-2 inline-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" /> </svg>
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder={`Search templates`} // Translated placeholder
                className="bg-transparent text-[#344053] dark:text-white outline-none"
              />
            </div>
            <div className="text-[#101828] dark:text-white text-xl font-bold mb-2 mt-6">{selectedCategory}</div>
            <div className="text-[#475466] dark:text-gray-300 text-base font-medium mb-4">Select one of the templates below to create your agent</div>
            <div className="grid grid-cols-3 gap-6">
              {filteredAgents.map((agent, index) => (
                <div key={index} className="flex flex-col gap-3 p-4 h-[153px] rounded-xl border border-[#d0d5dd] dark:border-gray-700 dark:hover:border-[#7F56D9] hover:border-[#7F56D9] hover:border-2 ">
                  <div className="text-[#344053] dark:text-white text-base font-bold">{agent.name}</div>
                  <div className="text-[#667085] dark:text-gray-400 text-sm font-semibold">{agent.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Button variant='light' type="icon-button" onClick={handleCreateClick}>
       <BiPlus className='text-black dark:text-white'/>
        Explore Agents
      </Button>
    </div>
  );
};

export default ExploreAgents;