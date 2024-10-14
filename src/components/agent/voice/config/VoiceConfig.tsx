import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../lib/Button';
import Dropdown from '../../../lib/DropDown';
import SliderInput from '../../../lib/SliderInput';
import Input from '../../../lib/Input';
import Checkbox from '../../../lib/Checkbox';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const VoiceConfig = () => {
  const { t } = useTranslation('voiceConfig'); // Use the 'voiceConfig' namespace
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);

  const [synthesizer, setSynthesizer] = useState('Deepgram');
  const [voiceModel, setVoiceModel] = useState('Arcas');
  const [bufferSize, setBufferSize] = useState(150);
  const [endpointing, setEndpointing] = useState(100);
  const [linearDelay, setLinearDelay] = useState(400);
  const [ambientNoise, setAmbientNoise] = useState('No ambient noise');
  const [isUserOnline, setIsUserOnline] = useState(true);
  const [userOnlineMessage, setUserOnlineMessage] = useState('Hey, are you still there');
  const [invokeAfterSeconds, setInvokeAfterSeconds] = useState(6);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData) {
      setSynthesizer(agentData.ttsEngine || 'Deepgram');
      setVoiceModel(agentData.ttsVoices || 'Arcas');
      setBufferSize(agentData.bufferSize || 150);
      setEndpointing(agentData.endpointing || 100);
      setLinearDelay(agentData.linearDelay || 400);
      setAmbientNoise(agentData.ambientNoise || 'No ambient noise');
      setIsUserOnline(agentData.voiceCallSupported || true);
      setUserOnlineMessage(agentData.onlineCheckMessage || 'Hey, are you still there');
      setInvokeAfterSeconds(agentData.invokeAfterSeconds || 6);
    }
  }, [agentData]);

  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        ttsEngine: synthesizer,
        ttsVoices: voiceModel,
        bufferSize,
        endpointing,
        linearDelay,
        ambientNoise,
        voiceCallSupported: isUserOnline,
        onlineCheckMessage: userOnlineMessage,
        invokeAfterSeconds,
      },
    };
    try {
      await dispatch(updateAgentData(updatedData));
      toast.success(t('save_success')); // Translated success message
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg w-[900px]">
      <ToastContainer />
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <Dropdown
          label={t('choose_synthesizer')} // Translated label
          options={['Deepgram', 'Other']}
          selected={synthesizer}
          onChange={(value) => setSynthesizer(value)}
        />

        <Dropdown
          label={t('choose_voice_model')} // Translated label
          options={['Arcas', 'Other']}
          selected={voiceModel}
          onChange={(value) => setVoiceModel(value)}
        />

        <SliderInput
          label={t('buffer_size')} // Translated label
          min={50}
          max={300}
          step={1}
          value={bufferSize}
          onChange={(value) => setBufferSize(value)}
          helperText={t('buffer_size_helper')} // Translated helper text
        />

        <SliderInput
          label={t('endpointing')} // Translated label
          min={50}
          max={500}
          step={10}
          value={endpointing}
          onChange={(value) => setEndpointing(value)}
          helperText={t('endpointing_helper')} // Translated helper text
        />

        <SliderInput
          label={t('linear_delay')} // Translated label
          min={100}
          max={1000}
          step={50}
          value={linearDelay}
          onChange={(value) => setLinearDelay(value)}
          helperText={t('linear_delay_helper')} // Translated helper text
        />

        <Dropdown
          label={t('ambient_noise')} // Translated label
          options={['No ambient noise', 'Low noise', 'Moderate noise', 'High noise']}
          selected={ambientNoise}
          onChange={(value) => setAmbientNoise(value)}
        />

        <div className="col-span-2">
          <Checkbox
            label={t('user_online_check')} // Translated label
            checked={isUserOnline}
            onChange={() => setIsUserOnline(!isUserOnline)}
            className="mt-6"
          />

          <Input
            label={t('user_online_message')} // Translated label
            placeholder={t('user_online_message')}
            value={userOnlineMessage}
            onChange={(e) => setUserOnlineMessage(e.target.value)}
          />

          <SliderInput
            label={t('invoke_after_seconds')} // Translated label
            min={1}
            max={10}
            step={1}
            value={invokeAfterSeconds}
            onChange={(value) => setInvokeAfterSeconds(value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="primary"
          size="normal"
          radius="lg"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? t('saving') : t('save')} {/* Translated text */}
        </Button>
      </div>
    </div>
  );
};

export default VoiceConfig;
