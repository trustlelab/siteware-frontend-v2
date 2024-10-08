import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { updateAgentData, fetchAgentData } from '../../../../redux/slices/agent-slice';

const FunctionsConfig = () => {
    const dispatch = useDispatch<AppDispatch>();
    const agentId = useSelector((state: RootState) => state.agent.id);
    const agentData = useSelector((state: RootState) => state.agent.agentData);
    const [selectedFunction, setSelectedFunction] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (agentId) {
            dispatch(fetchAgentData(agentId));
        }
    }, [agentId, dispatch]);

    useEffect(() => {
        if (agentData && agentData.functionName) {
            setSelectedFunction(agentData.functionName);
        }
    }, [agentData]);

    const handleSave = async () => {
        if (!agentId) return;

        setIsSaving(true);
        const updatedData = {
            id: agentId,
            data: {
                functionName: selectedFunction,
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
            <div className="flex justify-between items-center">
                {/* Dropdown for choosing a function */}
                <div className="w-3/4">
                    <label className="config_label">Choose a function</label>
                    <select
                        className="w-full config_input"
                        value={selectedFunction}
                        onChange={(e) => setSelectedFunction(e.target.value)}
                    >
                        <option value="Check slot availability (using Cal.com)">
                            Check slot availability (using Cal.com)
                        </option>
                        <option value="Another function">Another function</option>
                        <option value="Yet another function">Yet another function</option>
                    </select>
                </div>

                {/* Add Function Button */}
                <div className="flex justify-end w-1/4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Function'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FunctionsConfig;
