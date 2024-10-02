import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';  // Import RootState type
import { increment, decrement } from '../features/counter/counterSlice';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);  // Specify RootState type
  const dispatch = useDispatch();  // Get the dispatch function to dispatch actions

  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl dark:text-white">Counter: {count}</h1>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-red-500 px-4 py-2 rounded-lg text-white"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
