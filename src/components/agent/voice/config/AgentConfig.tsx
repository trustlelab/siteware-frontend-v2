import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { fetchAgentData, updateAgentData } from '../../../../redux/slices/agent-slice';

const AgentConfig = () => {
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
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-6xl">
      <h2 className="mb-4 text-xl">Agent Configuration</h2>

      {agentData && (
        <>
          <div className="mb-4">
            <label className="config_label">Agent Welcome Message</label>
            <input
              type="text"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="config_input"
              placeholder="Enter welcome message"
            />
            <p className="config_helper_text">
              This will be the initial message from the agent. You can use variables here using <code>{'{variable_name}'}</code>
            </p>
          </div>

          <div className="mb-4">
            <label className="config_label">Agent Prompt</label>
            <textarea
              className="config_input"
              rows={14}
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              placeholder="You are a helpful agent..."
            />
            <p className="config_helper_text">
              You can define variables in the prompt using <code>{'{variable_name}'}</code>
            </p>
          </div>

          <button
            className="config_button"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </>
      )}
    </div>
  );
};

export default AgentConfig;