// src/pages/Home.js
import React from 'react';
import Counter from '../components/counter'; // Import the Counter component

function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#060610]">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Home Page</h1>
      <Counter /> {/* Display the counter here */}
    </div>
  );
}

export default Home;
