import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../lib/Button'; // Reusable Button component
import Dropdown from '../../../lib/DropDown'; // Reusable Dropdown component
import Input from '../../../lib/Input'; // Reusable Input component
import Checkbox from '../../../lib/Checkbox'; // Reusable Checkbox component
import { useTranslation } from 'react-i18next'; // Import the translation hook

const TasksConfig = () => {
  const { t } = useTranslation(); // Use the namespace for TasksConfig translations
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);

  const [isSummarizationEnabled, setIsSummarizationEnabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo-1106');
  const [isExtractionEnabled, setIsExtractionEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData) {
      setIsSummarizationEnabled(agentData.taskSummarization || false);
      setSelectedModel(agentData.llmModel || 'gpt-3.5-turbo-1106');
      setIsExtractionEnabled(agentData.extractionEnabled || false);
      setWebhookUrl(agentData.webhookURL || '');
    }
  }, [agentData]);

  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        taskSummarization: isSummarizationEnabled,
        extractionEnabled: isExtractionEnabled,
        webhookURL: webhookUrl,
      },
    };
    try {
      await dispatch(updateAgentData(updatedData));
      toast.success(t('save_success')); // Translated toast message
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 shadow-md p-6 rounded-lg w-full md:w-[900px]">
      <ToastContainer />
      <h3 className="mb-4 font-semibold text-lg">{t('tasks_configuration')}</h3>
      <p className="mb-6 text-gray-500 text-sm">{t('tasks_configuration_description')}</p>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-6">
        {/* Summarization Task */}
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="config_label">{t('summarization')}</label>
              <p className="config_helper_text">{t('summarization_description')}</p>
            </div>
            <Checkbox
              id="summarization"
              checked={isSummarizationEnabled}
              onChange={() => setIsSummarizationEnabled(!isSummarizationEnabled)}
            />
          </div>
          {isSummarizationEnabled && (
            <Dropdown
              label=""
              options={['gpt-3.5-turbo-1106', 'gpt-3.5-turbo-1110', 'gpt-4']}
              selected={selectedModel}
              onChange={(value) => setSelectedModel(value)}
              searchable={false}
            />
          )}
        </div>

        {/* Extraction Task */}
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="config_label">{t('extraction')}</label>
              <p className="config_helper_text">{t('extraction_description')}</p>
            </div>
            <Checkbox
              id="extraction"
              checked={isExtractionEnabled}
              onChange={() => setIsExtractionEnabled(!isExtractionEnabled)}
            />
          </div>
        </div>

        {/* Webhook Task */}
        <div className="flex flex-col col-span-1 md:col-span-2 bg-gray-100 dark:bg-gray-800 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="config_label">{t('webhook')}</label>
              <p className="config_helper_text">{t('webhook_description')}</p>
            </div>
            <Checkbox
              id="webhook"
              checked={Boolean(webhookUrl)}
              onChange={() => setWebhookUrl(webhookUrl ? '' : 'https://')}
            />
          </div>
          {webhookUrl && (
            <Input
              id="webhookUrl"
              placeholder={t('enter_webhook')}
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-4"
            />
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button
          variant="primary"
          size="normal"
          radius="lg"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? t('saving') : t('save')}
        </Button>
      </div>
    </div>
  );
};

export default TasksConfig;
