import { useState } from 'react';

const LLMConfig = () => {
    const [tokens, setTokens] = useState(150);
    const [temperature, setTemperature] = useState(0.2);
    const [useFillers, setUseFillers] = useState(false);
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const [llmModel, setLLMModel] = useState('Openai');
    const [llmVersion, setLLMVersion] = useState('gpt-4o mini');

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-6xl">
            {/* Responsive Two-column grid layout */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
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
                        onChange={(e) => setTokens(+e.target.value)} // Use + to cast to a number
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
                        onChange={(e) => setTemperature(+e.target.value)} // Use + to cast to a number
                    />
                    <p className="config_helper_text">{temperature}</p>
                    <p className="config_helper_text">
                        Increasing temperature enables heightened creativity but increases the chance of deviation from the prompt.
                    </p>
                </div>

                {/* Column 1: Knowledge Base */}
                <div>
                    <label className="config_label">Add knowledge base <span className="text-xs">(currently in Beta)</span></label>
                    <select 
                        className="config_input" 
                        value={knowledgeBase} 
                        onChange={(e) => setKnowledgeBase(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="base1">Base 1</option>
                        <option value="base2">Base 2</option>
                    </select>
                </div>

                {/* Column 2: Use Fillers Toggle */}
                <div>
                    <label className="config_label">Use Fillers <span className="text-xs">(currently in Beta)</span></label>
                    <div className="flex items-center mt-1">
                        <input 
                            type="checkbox" 
                            checked={useFillers} 
                            onChange={() => setUseFillers(!useFillers)} 
                            className="form-checkbox w-5 h-5 text-teal-600"
                        />
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                            Filler words reduce perceived latency but recipients can feel that the AI agent is not letting them complete their sentence.
                        </span>
                    </div>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="mt-6">
                <label className="config_label">Add FAQs & Guardrails <a href="#" className="text-teal-600">Read docs</a></label>
            </div>

            {/* Add Button with proper spacing */}
            <div className="mt-4">
                <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded w-full md:w-auto text-white transition-colors config_button">
                    + Add a new block for FAQs & Guardrails
                </button>
            </div>
        </div>
    );
};

export default LLMConfig;
