import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../lib/Button';
import Dropdown from '../../../lib/DropDown';
import SliderInput from '../../../lib/SliderInput';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const CallConfig = () => {
  const { t } = useTranslation('callConfig'); // Use the namespace for CallConfig translations
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);

  const [provider, setProvider] = useState('Twilio');
  const [hangupTime, setHangupTime] = useState(10);
  const [terminationTime, setTerminationTime] = useState(180);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData) {
      setProvider(agentData.callProvider || 'Twilio');
      setHangupTime(agentData.callHangupLogic ? parseInt(agentData.callHangupLogic) : 10);
      setTerminationTime(agentData.callTerminationTime || 180);
    }
  }, [agentData]);

  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        callProvider: provider,
        callHangupLogic: hangupTime.toString(),
        callTerminationTime: terminationTime,
      },
    };
    try {
      await dispatch(updateAgentData(updatedData));
      toast.success(t('configuration_saved')); // Translated toast message
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg w-[900px]">
      <ToastContainer />
      
      {/* Provider Dropdown */}
      <Dropdown
        label={t('provider')}
        options={['Twilio', 'Other']}
        selected={provider}
        onChange={(value) => setProvider(value)}
      />

      {/* Call Hangup Logic */}
      <div className="mb-6">
        <label className="config_label">{t('call_hangup_logic')}</label>
        <div className="flex justify-between items-center">
          <Dropdown
            label=""
            options={[`${t('hangup_on_silence', { seconds: hangupTime })}`]}
            selected={`${t('hangup_on_silence', { seconds: hangupTime })}`}
            onChange={() => {}}
          />
          <div className="ml-4 w-1/3">
            <SliderInput
              label={t('time_seconds')}
              min={1}
              max={60}
              step={1}
              value={hangupTime}
              onChange={(value) => setHangupTime(value)}
            />
          </div>
        </div>
      </div>

      {/* Call Termination */}
      <div className="mb-6">
        <label className="config_label">{t('call_termination')}</label>
        <div className="flex justify-between items-center">
          <Dropdown
            label=""
            options={[`${t('termination_after_seconds', { seconds: terminationTime })}`]}
            selected={`${t('termination_after_seconds', { seconds: terminationTime })}`}
            onChange={() => {}}
          />
          <div className="ml-4 w-1/3">
            <SliderInput
              label={t('time_seconds')}
              min={60}
              max={600}
              step={10}
              value={terminationTime}
              onChange={(value) => setTerminationTime(value)}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <Button
          variant="primary"
          size="normal"
          radius="lg"
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

export default CallConfig;
