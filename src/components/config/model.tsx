import React from 'react';

const ModelConfig: React.FC = () => {
    return (
        <div className="bg-gray-950 shadow-md p-6 rounded-lg">
           <div className='text-center'>
           <h2 className="font-semibold text-lg text-white">Model</h2>
           <p className="mb-4 text-gray-400">This section allows you to configure the model for the assistant.</p>
           </div>

            <div className="flex gap-6">
                {/* Left Column - 70% */}
                <div className="flex-1" style={{ flex: '0 0 60%' }}>
                    <div className="mb-4">
                        <label className="text-gray-400">First Message</label>
                        <input
                            type="text"
                            value={'This is a sales call from arxstd! Please speak now'}
                            className="border-gray-600 bg-gray-800 mt-1 p-2 border rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter first message"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-400">System Prompt</label>
                        <textarea
                            className="border-gray-600 bg-gray-800 mt-1 p-2 border rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                            rows={14}
                            placeholder="This is a blank template with minimal defaults, you can change the model, temperature, and messages."
                        >

                            
                        </textarea>
                    </div>
                </div>

                {/* Right Column - 30% */}
                <div className="flex-none" style={{ flex: '0 0 30%' }}>
                    <div className="mb-4">
                        <label className="text-gray-400">Provider</label>
                        <select className="border-gray-600 bg-gray-800 mt-1 p-2 border rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full">
                            <option value="openai">openai</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-400">Model</label>
                        <select className="border-gray-600 bg-gray-800 mt-1 p-2 border rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full">
                            <option value="gpt-3.5-turbo">GPT 3.5 Turbo Cluster</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-400">Max Tokens</label>
                        <input
                            type="number"
                            className="border-gray-600 bg-gray-800 mt-1 p-2 border rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                            defaultValue={250}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400">Temperature</label>
                        <input
                            type="range"
                            className="mt-1 range-slider"
                            min={0}
                            max={1}
                            step={0.1}
                            defaultValue={0.7}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" className="mt-2" />
                        <label className="ml-2 text-gray-400">Detect Emotion</label>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-400">Knowledge Base</label>
                        <button className="bg-black mt-1 p-2 rounded w-full text-white">Select Files</button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default ModelConfig;
