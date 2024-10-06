import { useState } from 'react';

const VoiceConfig = () => {
    const [synthesizer, setSynthesizer] = useState('Deepgram');
    const [voiceModel, setVoiceModel] = useState('Arcas');
    const [bufferSize, setBufferSize] = useState(150);
    const [endpointing, setEndpointing] = useState(100);
    const [linearDelay, setLinearDelay] = useState(400);
    const [ambientNoise, setAmbientNoise] = useState('No ambient noise');
    const [isUserOnline, setIsUserOnline] = useState(true);
    const [userOnlineMessage, setUserOnlineMessage] = useState('Hey, are you still there');
    const [invokeAfterSeconds, setInvokeAfterSeconds] = useState(6);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-6xl">
            {/* Two-column responsive grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {/* Synthesizer Dropdown */}
                <div>
                    <label className="config_label">Choose Synthesizer</label>
                    <select
                        className="config_input"
                        value={synthesizer}
                        onChange={(e) => setSynthesizer(e.target.value)}
                    >
                        <option value="Deepgram">Deepgram</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Voice Model Dropdown with More Voices button */}
                <div className="flex items-center">
                    <select
                        className="w-full config_input"
                        value={voiceModel}
                        onChange={(e) => setVoiceModel(e.target.value)}
                    >
                        <option value="Arcas">Arcas</option>
                        <option value="Other">Other</option>
                    </select>
                
                </div>

                {/* Buffer Size Slider */}
                <div>
                    <label className="config_label">Buffer Size</label>
                    <input
                        type="range"
                        className="mt-1 range-slider"
                        min={50}
                        max={300}
                        step={1}
                        value={bufferSize}
                        onChange={(e) => setBufferSize(+e.target.value)}
                    />
                    <p className="config_helper_text">{bufferSize}</p>
                    <p className="config_helper_text">
                        Increasing buffer size enables agent to speak long responses fluently, but increases latency.
                    </p>
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
                        Number of milliseconds your agent will wait before generating a response. Lower endpointing reduces latency but could lead to agent interrupting mid-sentence.
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
                    <select
                        className="config_input"
                        value={ambientNoise}
                        onChange={(e) => setAmbientNoise(e.target.value)}
                    >
                        <option value="No ambient noise">No ambient noise</option>
                        <option value="Low noise">Low noise</option>
                        <option value="Moderate noise">Moderate noise</option>
                        <option value="High noise">High noise</option>
                    </select>
                </div>

                {/* Online Check */}
                <div className="col-span-2">
                    <div className="flex items-center mt-6">
                        <input
                            type="checkbox"
                            checked={isUserOnline}
                            onChange={() => setIsUserOnline(!isUserOnline)}
                            className="form-checkbox w-5 h-5 text-teal-600"
                        />
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                            Agent will check if the user is online if there's no reply from the user.
                        </span>
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
        </div>
    );
};

export default VoiceConfig;
