// src/components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value); // Access the Redux state
  const dispatch = useDispatch(); // Get the dispatch function to dispatch actions

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4">Counter: {count}</h1>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
