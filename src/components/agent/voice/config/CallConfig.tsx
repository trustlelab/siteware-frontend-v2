import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { fetchAgentData, updateAgentData } from '../../../../redux/slices/agent-slice';

const CallConfig = () => {
    const dispatch = useDispatch<AppDispatch>();
    const agentId = useSelector((state: RootState) => state.agent.id);
    const agentData = useSelector((state: RootState) => state.agent.agentData);

    const [provider, setProvider] = useState('Twilio');
    const [hangupTime, setHangupTime] = useState(10);
    const [terminationTime, setTerminationTime] = useState(180);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (agentId) {
            dispatch(fetchAgentData(agentId));
        }
    }, [agentId, dispatch]);

    useEffect(() => {
        if (agentData) {
            setProvider(agentData.callProvider || 'Twilio');
            setHangupTime(agentData.callHangupLogic ? parseInt(agentData.callHangupLogic) : 10);
            setTerminationTime(agentData.callTerminationTime || 180);
        }
    }, [agentData]);

    const handleSave = async () => {
        if (!agentId) return;

        setIsSaving(true);
        const updatedData = {
            id: agentId,
            data: {
                callProvider: provider,
                callHangupLogic: hangupTime.toString(),
                callTerminationTime: terminationTime,
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
        <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg w-[900px]">
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

export default CallConfig;
