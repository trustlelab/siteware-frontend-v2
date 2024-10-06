import  { useState } from 'react';

const CallConfig = () => {
    const [provider, setProvider] = useState('Twilio');
    const [hangupTime, setHangupTime] = useState(10);
    const [terminationTime, setTerminationTime] = useState(180);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg max-w-full">
            {/* Provider Dropdown */}
            <div className="mb-6">
                <label className="config_label">Provider</label>
                <select
                    className="config_input"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                >
                    <option value="Twilio">Twilio</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Call Hangup Logic */}
            <div className="mb-6">
                <label className="config_label">Call hangup logic</label>
                <div className="flex justify-between items-center">
                    <select className="w-2/3 config_input">
                        <option value="silence">Call hangs up on silence for <strong>{hangupTime}</strong> seconds</option>
                    </select>
                    <div className="ml-4 w-1/3">
                        <label className="block text-gray-500">Time (seconds)</label>
                        <input
                            type="range"
                            className="mt-1 range-slider"
                            min={1}
                            max={60}
                            step={1}
                            value={hangupTime}
                            onChange={(e) => setHangupTime(+e.target.value)}
                        />
                        <p className="mt-1 text-center text-gray-500">{hangupTime}</p>
                    </div>
                </div>
            </div>

            {/* Call Termination */}
            <div className="mb-6">
                <label className="config_label">Call Termination</label>
                <div className="flex justify-between items-center">
                    <select className="w-2/3 config_input">
                        <option value="time">The call ends after <strong>{terminationTime}</strong> seconds of call time</option>
                    </select>
                    <div className="ml-4 w-1/3">
                        <label className="block text-gray-500">Time (seconds)</label>
                        <input
                            type="range"
                            className="mt-1 range-slider"
                            min={60}
                            max={600}
                            step={10}
                            value={terminationTime}
                            onChange={(e) => setTerminationTime(+e.target.value)}
                        />
                        <p className="mt-1 text-center text-gray-500">{terminationTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallConfig;
