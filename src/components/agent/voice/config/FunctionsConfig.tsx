import { useState } from 'react';

const FunctionsConfig = () => {
    const [selectedFunction, setSelectedFunction] = useState('Check slot availability (using Cal.com)');

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-full">
            <div className="flex justify-between items-center">
                {/* Dropdown for choosing a function */}
                <div className="w-3/4">
                    <label className="config_label">Choose functions</label>
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
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                        Add this function
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FunctionsConfig;
