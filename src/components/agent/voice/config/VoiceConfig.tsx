import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../lib/Button';
import Dropdown from '../../../lib/DropDown';
import SliderInput from '../../../lib/SliderInput';

import { useTranslation } from 'react-i18next'; // Import useTranslation

const VoiceConfig = () => {
  const { t } = useTranslation(); // Use the 'voiceConfig' namespace
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
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg w-full max-w-full mx-auto">
  <ToastContainer />
  <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
    
    {/* Synthesizer Dropdown */}
    <div className="flex flex-col">
      <label className="text-gray-600 dark:text-gray-200 mb-1">{t('choose_synthesizer')}</label>
      <Dropdown
            options={['Deepgram', 'Other']}
            selected={synthesizer}
            onChange={(value) => setSynthesizer(value)} label={''}      />
    </div>

    {/* Voice Model Dropdown */}
    <div className="flex flex-col">
      <label className="text-gray-600 dark:text-gray-200 mb-1">{t('choose_voice_model')}</label>
      <Dropdown
            options={['Arcas', 'Other']}
            selected={voiceModel}
            onChange={(value) => setVoiceModel(value)} label={''}      />
    </div>

    {/* Buffer Size Slider */}
    <div className="flex flex-col">
      <label className="text-gray-600 dark:text-gray-200 mb-1">{t('buffer_size')}</label>
      <SliderInput
            min={50}
            max={300}
            step={1}
            value={bufferSize}
            onChange={(value) => setBufferSize(value)}
            helperText={t('buffer_size_helper')} label={''}      />
    </div>

    {/* Endpointing Slider */}
    <div className="flex flex-col">
      <label className="text-gray-600 dark:text-gray-200 mb-1">{t('endpointing')}</label>
      <SliderInput
            min={50}
            max={500}
            step={10}
            value={endpointing}
            onChange={(value) => setEndpointing(value)}
            helperText={t('endpointing_helper')} label={''}      />
    </div>

    {/* Linear Delay Slider */}
    <div className="flex flex-col">
      <label className="text-gray-600 dark:text-gray-200 mb-1">{t('linear_delay')}</label>
      <SliderInput
            min={100}
            max={1000}
            step={50}
            value={linearDelay}
            onChange={(value) => setLinearDelay(value)}
            helperText={t('linear_delay_helper')} label={''}      />
    </div>

    {/* Ambient Noise Dropdown */}
    <div className="flex flex-col">
      <label className="text-gray-600 dark:text-gray-200 mb-1">{t('ambient_noise')}</label>
      <Dropdown
            options={['No ambient noise', 'Low noise', 'Moderate noise', 'High noise']}
            selected={ambientNoise}
            onChange={(value) => setAmbientNoise(value)} label={''}      />
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
      {isSaving ? t('saving') : t('save')}
    </Button>
  </div>
</div>

  );
};

export default VoiceConfig;
