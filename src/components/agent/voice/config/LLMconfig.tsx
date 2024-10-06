import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { updateAgentData, fetchAgentData } from '../../../../redux/slices/agent-slice';

const LLMConfigurator = () => {
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
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="shadow-lg mx-auto p-8 rounded-2xl max-w-5xl">
      {/* Responsive Two-column grid layout */}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* Column 1 */}
        <div>
          <label className="config_label">Choose LLM Model</label>
          <select
            className="config_input"
            value={llmModel}
            onChange={(e) => setLLMModel(e.target.value)}
          >
            <option value="Openai">Openai</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Column 2 */}
        <div>
          <label className="config_label">LLM Version</label>
          <select
            className="config_input"
            value={llmVersion}
            onChange={(e) => setLLMVersion(e.target.value)}
          >
            <option value="gpt-4o mini">gpt-4o mini</option>
            <option value="gpt-3.5">gpt-3.5</option>
          </select>
        </div>

        {/* Column 1: Tokens Slider */}
        <div>
          <label className="config_label">Tokens generated on each LLM output</label>
          <input
            type="range"
            className="l range-slider"
            min={50}
            max={300}
            step={1}
            value={tokens}
            onChange={(e) => setTokens(+e.target.value)}
          />
          <p className="config_helper_text">{tokens}</p>
          <p className="config_helper_text">
            Increasing tokens enables longer responses to be queued before sending to speech generation but increases latency.
          </p>
        </div>

        {/* Column 2: Temperature Slider */}
        <div>
          <label className="config_label">Temperature</label>
          <input
            type="range"
            className="l range-slider"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(+e.target.value)}
          />
          <p className="config_helper_text">{temperature}</p>
          <p className="config_helper_text">
            Increasing temperature enables heightened creativity but increases the chance of deviation from the prompt.
          </p>
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

export default LLMConfigurator;
