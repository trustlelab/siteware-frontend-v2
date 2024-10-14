import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createAgentData } from '../../features/slices/agentSlice';
import Button from '../lib/Button';
import Input from '../lib/Input';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

interface AgentCardProps {
  type: 'voice' | 'text';
}

const AgentCard: React.FC<AgentCardProps> = ({ type }) => {
  const { t } = useTranslation('agentCard'); // Use the 'agentCard' namespace
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [agentName, setAgentName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
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
      const action = await dispatch(createAgentData({ name: agentName, data: {} }));
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
    <div className="flex flex-col justify-center items-center space-y-3 p-6 rounded-[30px] dark:text-white">
      <Modal className="border-gray-700 dark:bg-black border !rounded-[20px]" isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="mt-5 px-[12px] w-[480px]">
          <h2 className="mb-6 font-semibold text-2xl">{t('create_agent')}</h2>

          <div className="mb-4">
            <Input
              label={t('agent_name')}
              type="text"
              value={agentName}
              onChange={handleAgentNameChange}
              placeholder={t('agent_name_placeholder')}
              error={error}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleNextClick} disabled={isCreating} className="w-full">
              {isCreating ? t('creating_agent') : t('next')}
            </Button>
          </div>
        </div>
      </Modal>

      <div className="dark:bg-gray-950 p-3 rounded-2xl w-[50%]">
        <div className="flex items-center mb-4">
          <div className="flex justify-center items-center bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full w-12 h-12 text-2xl">
            <span>👤</span>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-xl">{type === 'text' ? t('ai_text_assistant') : t('real_time_voice_assistant')}</h3>
            <p className="text-gray-400 text-sm">{type === 'text' ? t('text_assistant_description') : t('voice_assistant_description')}</p>
          </div>
        </div>
        <Button onClick={handleCreateClick} className="w-full">
          {t('create_button')}
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;
