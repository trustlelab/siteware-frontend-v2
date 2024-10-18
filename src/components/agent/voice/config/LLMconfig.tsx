import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { updateAgentData, fetchAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../lib/Button';
import Dropdown from '../../../lib/DropDown';
import SliderInput from '../../../lib/SliderInput'; // Importing the new SliderInput component
import { useTranslation } from 'react-i18next'; // Import useTranslation

const LLMConfigurator = () => {
  const { t } = useTranslation(); // Use 'llmConfigurator' namespace for translations
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);

  const [tokens, setTokens] = useState(150);
  const [temperature, setTemperature] = useState(0.2);
  const [llmModel, setLLMModel] = useState('Openai');
  const [llmVersion, setLLMVersion] = useState('gpt-4o mini');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData) {
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
        tokenLimit: tokens,
        temperature,
        llmModel,
        llmVersion,
      },
    };
    try {
      await dispatch(updateAgentData(updatedData));
      toast.success(t('save_success')); // Use translated success message
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="shadow-lg p-6 rounded-2xl w-full md:w-5xl mx-auto">
      <ToastContainer />
      {/* Responsive Two-column grid layout */}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* LLM Model Dropdown */}
        <div>
          <Dropdown
            searchable
            label={t('choose_llm_model')} // Translated label
            options={['Openai', 'Other']}
            selected={llmModel}
            onChange={(value) => setLLMModel(value)}
          />
        </div>

        {/* LLM Version Dropdown */}
        <div>
          <Dropdown
            label={t('choose_llm_version')} // Translated label
            options={['gpt-4o mini', 'gpt-3.5']}
            selected={llmVersion}
            onChange={(value) => setLLMVersion(value)}
          />
        </div>

        {/* Tokens Slider */}
        <SliderInput
          label={t('tokens_generated')} // Translated label
          min={50}
          max={300}
          step={1}
          value={tokens}
          onChange={(value) => setTokens(value)}
          helperText={t('tokens_helper_text')} // Translated helper text
        />

        {/* Temperature Slider */}
        <SliderInput
          label={t('temperature')} // Translated label
          min={0}
          max={1}
          step={0.1}
          value={temperature}
          onChange={(value) => setTemperature(value)}
          helperText={t('temperature_helper_text')} // Translated helper text
        />
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <Button
          variant="primary"
          size="normal"
          radius="md"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? t('saving') : t('save')} {/* Translated button text */}
        </Button>
      </div>
    </div>
  );
};

export default LLMConfigurator;
