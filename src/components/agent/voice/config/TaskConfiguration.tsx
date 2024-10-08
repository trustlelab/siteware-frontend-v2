import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { fetchAgentData, updateAgentData } from '../../../../redux/slices/agent-slice';

const TasksConfig = () => {
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
        } catch (error) {
            console.error('Error updating agent data:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 shadow-md p-6 rounded-lg w-[900px]">
            <h3 className="mb-4 font-semibold text-lg">Tasks Configuration</h3>
            <p className="mb-6 text-gray-500 text-sm">
                Configure the tasks that should be executed after the conversation ends.
            </p>

            {/* Summarization Task */}
            <div className="flex justify-between items-center mb-6">
                <div className="w-3/4">
                    <label className="config_label">Summarization</label>
                    <p className="config_helper_text">
                        Automatically generate a summary of the conversation.
                    </p>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isSummarizationEnabled}
                        onChange={() => setIsSummarizationEnabled(!isSummarizationEnabled)}
                        className="form-checkbox w-5 h-5 text-teal-600"
                    />
                    {isSummarizationEnabled && (
                        <select
                            className="ml-4 config_input"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
                            <option value="gpt-3.5-turbo-1110">gpt-3.5-turbo-1110</option>
                            <option value="gpt-4">gpt-4</option>
                        </select>
                    )}
                </div>
            </div>

            {/* Extraction Task */}
            <div className="flex justify-between items-center mb-6">
                <div className="w-3/4">
                    <label className="config_label">Extraction</label>
                    <p className="config_helper_text">
                        Extract structured data from the conversation based on the prompt.
                    </p>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isExtractionEnabled}
                        onChange={() => setIsExtractionEnabled(!isExtractionEnabled)}
                        className="form-checkbox w-5 h-5 text-teal-600"
                    />
                </div>
            </div>

            {/* Webhook Task */}
            <div className="flex justify-between items-center mb-6">
                <div className="w-3/4">
                    <label className="config_label">Post extracted data to webhook</label>
                    <p className="config_helper_text">
                        Automatically send extracted data to a webhook.
                    </p>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={Boolean(webhookUrl)}
                        onChange={() => setWebhookUrl(webhookUrl ? '' : 'https://')}
                        className="form-checkbox w-5 h-5 text-teal-600"
                    />
                    {webhookUrl && (
                        <input
                            type="text"
                            className="ml-4 w-96 config_input"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            placeholder="Enter a valid webhook URL"
                        />
                    )}
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

export default TasksConfig;
