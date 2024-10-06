import { useState } from 'react';

const TasksConfig = () => {
    const [isSummarizationEnabled, setIsSummarizationEnabled] = useState(true);
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo-1106');
    const [isExtractionEnabled, setIsExtractionEnabled] = useState(false);
    const [extractionPrompt, setExtractionPrompt] = useState('');
    const [isWebhookEnabled, setIsWebhookEnabled] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');

    return (
        <div className="bg-white dark:bg-gray-950 shadow-md mx-auto p-6 rounded-lg max-w-6xl">
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
                    {isExtractionEnabled && (
                        <textarea
                            className="ml-4 w-96 config_input"
                            value={extractionPrompt}
                            onChange={(e) => setExtractionPrompt(e.target.value)}
                            placeholder="Enter custom extraction prompt"
                        />
                    )}
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
                        checked={isWebhookEnabled}
                        onChange={() => setIsWebhookEnabled(!isWebhookEnabled)}
                        className="form-checkbox w-5 h-5 text-teal-600"
                    />
                    {isWebhookEnabled && (
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
        </div>
    );
};

export default TasksConfig;
