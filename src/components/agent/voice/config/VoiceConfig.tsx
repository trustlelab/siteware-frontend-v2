import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 *
 */
const VoiceConfig = () => {
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

  /**
   *
   */
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
      toast.success('Agent configuration saved successfully');
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg w-[900px]">
      <ToastContainer />
      {/* Two-column responsive grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {/* Synthesizer Dropdown */}
        <div>
          <label className="config_label">Choose Synthesizer</label>
          <select className="config_input" value={synthesizer} onChange={(e) => setSynthesizer(e.target.value)}>
            <option value="Deepgram">Deepgram</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Voice Model Dropdown with More Voices button */}
        <div className="flex items-center">
          <select className="w-full config_input" value={voiceModel} onChange={(e) => setVoiceModel(e.target.value)}>
            <option value="Arcas">Arcas</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Buffer Size Slider */}
        <div>
          <label className="config_label">Buffer Size</label>
          <input type="range" className="mt-1 range-slider" min={50} max={300} step={1} value={bufferSize} onChange={(e) => setBufferSize(+e.target.value)} />
          <p className="config_helper_text">{bufferSize}</p>
          <p className="config_helper_text">Increasing buffer size enables agent to speak long responses fluently, but increases latency.</p>
        </div>

        {/* Endpointing Slider */}
        <div>
          <label className="config_label">Endpointing (in ms)</label>
          <input
            type="range"
            className="mt-1 range-slider"
            min={50}
            max={500}
            step={10}
            value={endpointing}
            onChange={(e) => setEndpointing(+e.target.value)}
          />
          <p className="config_helper_text">{endpointing}</p>
          <p className="config_helper_text">
            Number of milliseconds your agent will wait before generating a response. Lower endpointing reduces latency but could lead to agent interrupting
            mid-sentence.
          </p>
        </div>

        {/* Linear Delay Slider */}
        <div>
          <label className="config_label">Linear delay (in ms)</label>
          <input
            type="range"
            className="mt-1 range-slider"
            min={100}
            max={1000}
            step={50}
            value={linearDelay}
            onChange={(e) => setLinearDelay(+e.target.value)}
          />
          <p className="config_helper_text">{linearDelay}</p>
          <p className="config_helper_text">
            Linear delay accounts for long pauses mid-sentence. If the recipient is expected to speak long sentences, increase the value of linear delay.
          </p>
        </div>

        {/* Ambient Noise Dropdown */}
        <div>
          <label className="config_label">Ambient Noise</label>
          <select className="config_input" value={ambientNoise} onChange={(e) => setAmbientNoise(e.target.value)}>
            <option value="No ambient noise">No ambient noise</option>
            <option value="Low noise">Low noise</option>
            <option value="Moderate noise">Moderate noise</option>
            <option value="High noise">High noise</option>
          </select>
        </div>

        {/* Online Check */}
        <div className="col-span-2">
          <div className="flex items-center mt-6">
            <input type="checkbox" checked={isUserOnline} onChange={() => setIsUserOnline(!isUserOnline)} className="form-checkbox w-5 h-5 text-teal-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Agent will check if the user is online if there's no reply from the user.</span>
          </div>

          {/* User Online Message */}
          <div className="mt-4">
            <label className="config_label">User is online message</label>
            <input
              type="text"
              value={userOnlineMessage}
              onChange={(e) => setUserOnlineMessage(e.target.value)}
              className="config_input"
              placeholder="Enter message"
            />
          </div>

          {/* Invoke Message After Slider */}
          <div className="mt-4">
            <label className="config_label">Invoke message after (seconds)</label>
            <input
              type="range"
              className="mt-1 range-slider"
              min={1}
              max={10}
              step={1}
              value={invokeAfterSeconds}
              onChange={(e) => setInvokeAfterSeconds(+e.target.value)}
            />
            <p className="config_helper_text">{invokeAfterSeconds}</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg w-full md:w-auto text-white transition-colors config_button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default VoiceConfig;
