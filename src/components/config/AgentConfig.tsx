import { useState } from 'react';

const AgentConfig = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('Hello from Bolna');
    const [agentPrompt, setAgentPrompt] = useState('You are a helpful agent. You will help the customer with their queries and doubts. You will never speak more than 2 sentences. Keep your responses concise.');

    const handleSave = () => {
        const formData = {
            welcomeMessage,
            agentPrompt
        };
        console.log('Form Data Saved:', formData);
        alert('Form data saved successfully!');
    };

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-6xl">
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
                onClick={handleSave}
                className="config_button"
            >
                Save
            </button>
        </div>
    );
};

export default AgentConfig;
