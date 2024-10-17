import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../lib/Button';
import Input from '../../../lib/Input';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const AgentConfig = () => {
  const { t } = useTranslation('agentConfig'); // Use the 'agentConfig' namespace for translations
  const dispatch = useDispatch<AppDispatch>();
  const agentData = useSelector((state: RootState) => state.agent.agentData);
  const id = useSelector((state: RootState) => state.agent.id);

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id && agentData?.id !== id) {
      dispatch(fetchAgentData(id));
    }
  }, [id, dispatch]);

  // Update local state when agentData changes
  useEffect(() => {
    if (agentData) {
      setWelcomeMessage(agentData.welcomeMessage || '');
      setAgentPrompt(agentData.agentPrompt || '');
    }
  }, [agentData]);

  const handleSave = async () => {
    if (id) {
      setIsSaving(true);
      const updatedData = {
        id,
        data: {
          welcomeMessage,
          agentPrompt,
        },
      };
      await dispatch(updateAgentData(updatedData));
      setIsSaving(false);
      toast.success(t('save_success')); // Use translated success message
    }
  };

  return (
    <div className=" p-6 rounded-lg w-full lg:w-[900px]">
      <ToastContainer />
      <h2 className="mb-4 text-lg md:text-xl">{t('agent_configuration')}</h2> {/* Translated heading */}

      {agentData && (
        <>
          <div className="mb-4">
            <Input
              label={t('welcome_message_label')}
              type="text"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              placeholder={t('welcome_message_placeholder')}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              {t('welcome_message_help')} <code>{'{variable_name}'}</code>
            </p>
          </div>

          <div className="mb-4">
            <Input
              label={t('agent_prompt_label')}
              type='textarea'
              rows={14}
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              placeholder={t('agent_prompt_placeholder')}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              {t('agent_prompt_help')} <code>{'{variable_name}'}</code>
            </p>
          </div>

          <Button onClick={handleSave} disabled={isSaving} size='normal' className="w-full md:w-auto">
            {isSaving ? t('saving') : t('save')} {/* Translated button text */}
          </Button>
        </>
      )}
    </div>
  );
};

export default AgentConfig;
