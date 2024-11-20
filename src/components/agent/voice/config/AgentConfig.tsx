import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../lib/Button';
import Input from '../../../lib/Input';
import Dropdown from '../../../lib/DropDown';
import SliderInput from '../../../lib/SliderInput';
import { useTranslation } from 'react-i18next';

const CombinedAgentConfig = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const agentData = useSelector((state: RootState) => state.agent.agentData);
  const agentId = useSelector((state: RootState) => state.agent.id);

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [tokens, setTokens] = useState(150);
  const [temperature, setTemperature] = useState(0.2);
  const [llmModel, setLLMModel] = useState('Openai');
  const [llmVersion, setLLMVersion] = useState('gpt-4o mini');
  const [isSaving, setIsSaving] = useState(false);

  // Fetch agent data when component mounts or agentId changes
  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  // Update local state when agentData changes
  useEffect(() => {
    if (agentData) {
      setWelcomeMessage(agentData.welcomeMessage || '');
      setAgentPrompt(agentData.agentPrompt || '');
      setTokens(agentData.tokenLimit || 150);
      setTemperature(agentData.temperature || 0.2);
      setLLMModel(agentData.llmModel || 'Openai');
      setLLMVersion(agentData.llmVersion || 'gpt-4o mini');
    }
  }, [agentData]);

  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        welcomeMessage,
        agentPrompt,
        tokenLimit: tokens,
        temperature,
        llmModel,
        llmVersion,
      },
    };

    try {
      await dispatch(updateAgentData(updatedData));
      toast.success(t('save_success'));
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className=" p-6 rounded-2xl w-full ">
      <ToastContainer />
      <h2 className="mb-6 text-lg md:text-xl">{t('agent_configuration')}</h2>
      
      <div className="flex justify-between space-x-5 flex-wrap">
        {/* Agent Welcome Message and Prompt Configuration */}
        <div className='w-[60%]'>
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
              rows={10}
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              placeholder={t('agent_prompt_placeholder')}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              {t('agent_prompt_help')} <code>{'{variable_name}'}</code>
            </p>
          </div>
        </div>

        {/* LLM Configuration */}
        <div className='w-[35%]'>
          <Dropdown
            searchable
            label={t('choose_llm_model')}
            options={['Openai', 'Other']}
            selected={llmModel}
            onChange={(value) => setLLMModel(value)}
          />

          <Dropdown
            label={t('choose_llm_version')}
            options={['gpt-4o mini', 'gpt-3.5']}
            selected={llmVersion}
            onChange={(value) => setLLMVersion(value)}
          />

          <SliderInput
            label={t('tokens_generated')}
            min={50}
            max={300}
            step={1}
            value={tokens}
            onChange={(value) => setTokens(value)}
            helperText={t('tokens_helper_text')}
          />

          <SliderInput
            label={t('temperature')}
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={(value) => setTemperature(value)}
            helperText={t('temperature_helper_text')}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={isSaving} size='normal' className="w-full md:w-auto">
          {isSaving ? t('saving') : t('save')}
        </Button>
      </div>
    </div>
  );
};

export default CombinedAgentConfig;
