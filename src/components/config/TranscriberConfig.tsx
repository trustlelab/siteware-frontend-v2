import  { useState } from 'react';

const TranscriberConfig = () => {
    const [transcriber, setTranscriber] = useState('Deepgram');
    const [version, setVersion] = useState('nova-2');
    const [language, setLanguage] = useState('English');
    const [keywords, setKeywords] = useState('Bruce:100');
    const [interruptWords, setInterruptWords] = useState(0.7); // Updated based on the new slider
    const [backchanneling, setBackchanneling] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-6xl">
            {/* Responsive Two-column grid layout */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {/* Transcriber Dropdown */}
                <div>
                    <label className="config_label">Choose Transcriber</label>
                    <select
                        className="config_input"
                        value={transcriber}
                        onChange={(e) => setTranscriber(e.target.value)}
                    >
                        <option value="Deepgram">Deepgram</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Version Dropdown */}
                <div>
                    <label className="config_label">Version</label>
                    <select
                        className="config_input"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                    >
                        <option value="nova-2">nova-2</option>
                        <option value="version-1">version-1</option>
                    </select>
                </div>

                {/* Language Dropdown */}
                <div>
                    <label className="config_label">Choose language</label>
                    <select
                        className="config_input"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </div>

                {/* Keywords Input */}
                <div>
                    <label className="config_label">Keywords</label>
                    <input
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="config_input"
                        placeholder="Enter keywords"
                    />
                    <p className="config_helper_text">
                        Enter certain keywords/proper nouns you'd want to boost while understanding speech
                    </p>
                </div>
            </div>

            {/* Interruptions and Slider */}
            <div className="mt-6">
                <label className="config_label">
                    Number of words to wait for before interrupting (in words)
                </label>
                <input
                    type="range"
                    className="mt-1 range-slider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={interruptWords}
                    onChange={(e) => setInterruptWords(+e.target.value)} // Casting to a number
                />
                <p className="config_helper_text">{interruptWords}</p>
                <p className="config_helper_text">
                    Agent will not consider interruptions until these many words are spoken (If recipient says
                    "Stopwords" such as Stop, Wait, Hold On, agent will pause by default)
                </p>
            </div>

            {/* Backchanneling Toggle */}
            <div className="mt-6">
                <label className="config_label">Backchanneling</label>
                <div className="flex items-center mt-1">
                    <input
                        type="checkbox"
                        checked={backchanneling}
                        onChange={() => setBackchanneling(!backchanneling)}
                        className="form-checkbox w-5 h-5 text-teal-600"
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                        Agent will speak filler words in between sentences to show the recipient that they are listening
                        to them
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TranscriberConfig;
