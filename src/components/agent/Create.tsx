import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createAgentData } from '../../features/slices/agentSlice';
import Button from '../lib/Button';
import Input from '../lib/Input';
import { useTranslation } from 'react-i18next';
import { ChatBubbleIcon, TickIcon, VoiceIcon } from '../../assets/icons/Icons';

// AccessibleCard Component
interface AccessibleCardProps {
  title: string;
  type:string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const AccessibleCard: React.FC<AccessibleCardProps> = ({ title, type, description, isActive, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    className={`h-[82px] w-full flex justify-between  p-4 rounded-xl border-2 ${isActive ? 'bg-[#f9f5ff] dark:bg-[#4c1d95]/20 border-[#7e56d8]' : 'bg-white dark:bg-gray-800 border-[#d0d5dd] dark:border-gray-700'} flex items-center  gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
  >
    <div className="flex items-center gap-4 ">
      <div className="w-10 h-10 flex items-center justify-center bg-[#f4ebff] dark:bg-[#3b216f] rounded-full border-4 border-[#f9f5ff] dark:border-[#4c1d95]">
        {type === 'voice' ? <VoiceIcon /> : <ChatBubbleIcon />}
      </div>
      <div className="flex flex-col">
        <div className={`${isActive ? 'text-[#6840c6] dark:text-[#d3bffd]' : 'text-[#344054] dark:text-white'} text-base font-bold font-['Manrope']`}>
          {title}
        </div>
        <div className={`flex-nowrap ${isActive ? 'text-[#6840c6] dark:text-[#d3bffd]' : 'text-[#475466] dark:text-gray-400'} text-sm font-medium font-['Manrope'] leading-[30px]`}>
          {description}
        </div>
      </div>
    </div>
    <div className={`w-5 h-5 flex items-center justify-center rounded-full border ${isActive ? 'bg-[#7e56d8] border-none dark:bg-[#4c1d95]' : 'bg-white dark:bg-gray-800 border-[#cfd4dc] dark:border-gray-500'}`}>
      {isActive && <TickIcon/>}
    </div>
  </div>
);


const CreateAgent: React.FC = () => {
  const { t } = useTranslation('create_agent');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [agentName, setAgentName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('TEXT');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateClick = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setError('');
  };

  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAgentName(e.target.value);
  };

  const handleNextClick = async (): Promise<void> => {
    if (agentName.length < 4) {
      setError(t('agent_name_error'));
      return;
    }
  
    setIsCreating(true);
  
    try {
      // Include agentType in the dispatch
      const action = await dispatch(createAgentData({ name: agentName, agentType: selectedAgent, data: {} }));
      if (createAgentData.fulfilled.match(action)) {
        navigate(`/configure-agent?id=${action.payload.id}`);
      } else {
        setError(t('create_agent_error'));
      }
    } catch (error) {
      setError(t('creation_error'));
    } finally {
      setIsCreating(false);
    }
  };
  

  return (
    <div>
      <Modal className="border-gray-700 dark:bg-gray-800 border !rounded-[20px]" isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="mt-5 px-[12px] w-[480px]">
          <div className="w-12 h-12 p-3 bg-white dark:bg-gray-800 rounded-[10px] shadow border border-[#eaecf0] dark:border-gray-700 justify-center items-center inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="mb-6 font-semibold text-2xl mt-4 dark:text-white">{t('create_agent')}</h2>

          <div className="text-[#475466] dark:text-gray-300 text-base font-medium font-['Manrope'] leading-[30px]">
            {t('select_option')}
          </div>
          <div className="w-[421px] h-[0px] border border-[#eaecf0] dark:border-gray-700 mt-4"></div>
          <div className="flex flex-col space-y-4 my-6">
            <AccessibleCard
               type ="text"

              title={t('chat_agent')}
              description={t('chat_agent_description')}
              isActive={selectedAgent === 'TEXT'}
              onClick={() => setSelectedAgent('TEXT')}
            />

            <AccessibleCard
               type ="voice"

              title={t('voice_agent')}
              description={t('voice_agent_description')}
              isActive={selectedAgent === 'VOICE'}
              onClick={() => setSelectedAgent('VOICE')}
            />
          </div>

          <div className='flex flex-col gap-y-3'>
            <div className="text-[#344053] dark:text-white text-base font-bold font-['Manrope'] leading-tight">{t('agent_name')}</div>
            <div className="mb-4">
              <Input
                type="text"
                value={agentName}
                onChange={handleAgentNameChange}
                placeholder={t('agent_name_placeholder')}
                error={error}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={() => setIsModalOpen(false)} variant='light' className="w-full">
              {t('cancel')}
            </Button>
            <Button onClick={handleNextClick} disabled={isCreating} className="w-full">
              {isCreating ? t('creating_agent') : t('create_agent')}
            </Button>
          </div>
        </div>
      </Modal>
      <Button type="icon-button" onClick={handleCreateClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-white text-sm font-bold leading-normal">{t('create_agent')}</div>
      </Button>
    </div>
  );
};

export default CreateAgent;
