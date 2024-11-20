import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../lib/Button';
import Dropdown from '../../../lib/DropDown';
import SliderInput from '../../../lib/SliderInput';
import Input from '../../../lib/Input';
import Checkbox from '../../../lib/Checkbox';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const TranscriberConfig = () => {
  const { t } = useTranslation(); // Use the 'transcriberConfig' namespace
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);

  const [transcriber, setTranscriber] = useState('Deepgram');
  const [version, setVersion] = useState('nova-2');
  const [language, setLanguage] = useState('English');
  const [keywords, setKeywords] = useState('Bruce:100');
  const [interruptWords, setInterruptWords] = useState(0.7);
  const [backchanneling, setBackchanneling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData) {
      setTranscriber(agentData.transcriptionEngine || 'Deepgram');
      setVersion(agentData.transcriptionVersion || 'nova-2');
      setLanguage(agentData.languageSupport || 'Deutsch');
      setKeywords(agentData.keywords || 'Bruce:100');
      setInterruptWords(agentData.endpointing ? agentData.endpointing / 100 : 0.7);
      setBackchanneling(agentData.taskSummarization || false);
    }
  }, [agentData]);

  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        transcriptionEngine: transcriber,
        transcriptionVersion: version,
        languageSupport: language,
        keywords,
        endpointing: interruptWords * 100,
        taskSummarization: backchanneling,
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
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md w-full md:w-5xl mx-auto">
      <ToastContainer />
      {/* Grid layout for responsive form fields */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <Dropdown
          label={t('choose_transcriber')} // Translated label
          options={['Deepgram', 'Other']}
          selected={transcriber}
          onChange={(value) => setTranscriber(value)}
        />

        <Dropdown
          label={t('version')} // Translated label
          options={['nova-2', 'version-1']}
          selected={version}
          onChange={(value) => setVersion(value)}
        />

        <Dropdown
          label={t('choose_language')} // Translated label
          options={['Deutsch','English', 'Spanish', 'French']}
          selected={language}
          onChange={(value) => setLanguage(value)}
        />

        <div>
          <Input
            label={t('keywords')} // Translated label
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t('keywords')}
            className="w-full"
          />
          <p className="config_helper_text">{t('keywords_helper')}</p> {/* Translated helper text */}
        </div>
      </div>

      {/* Interrupt Words Slider */}
      <SliderInput
        label={t('interrupt_words')} // Translated label
        min={0}
        max={1}
        step={0.1}
        value={interruptWords}
        onChange={(value) => setInterruptWords(value)}
        helperText={t('interrupt_words_helper')} // Translated helper text
      />

      {/* Backchanneling Checkbox */}
      <div className="mt-4 flex items-center">
        <Checkbox
          id="backchanneling"
          label={t('backchanneling')} // Translated label
          checked={backchanneling}
          onChange={() => setBackchanneling(!backchanneling)}
        />
        <span className="ml-2 text-gray-600 dark:text-gray-300">
          {t('backchanneling_helper')} {/* Translated helper text */}
        </span>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <Button
          variant="primary"
          size="normal"
          radius="full"
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

export default TranscriberConfig;
