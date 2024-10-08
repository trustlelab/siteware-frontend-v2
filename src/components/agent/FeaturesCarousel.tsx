import React, { useState, useEffect } from 'react';

const FeaturesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Text Agent Feature 1',
      subtitle: 'Chat with our intelligent assistant anytime.',
      img: 'https://via.placeholder.com/600x300?text=Text+Agent',
    },
    {
      id: 2,
      title: 'Voice Agent Feature 1',
      subtitle: 'Experience seamless voice interactions.',
      img: 'https://via.placeholder.com/600x300?text=Voice+Agent',
    },
    {
      id: 3,
      title: 'Text Agent Feature 2',
      subtitle: 'Get instant responses to your queries.',
      img: 'https://via.placeholder.com/600x300?text=Text+Agent+2',
    },
    {
      id: 4,
      title: 'Voice Agent Feature 2',
      subtitle: 'Voice commands made easy and intuitive.',
      img: 'https://via.placeholder.com/600x300?text=Voice+Agent+2',
    },
  ];

  // Automatic slide change every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="relative mx-auto mt-8 w-[300px] h-[100px]">
      {/* Slide Content */}
      <div className="flex justify-center items-center h-full text-center">
        <div className="flex flex-col justify-center items-center p-4 rounded-lg w-full h-full dark:text-white">
          <img
            src={slides[currentIndex].img}
            alt={slides[currentIndex].title}
            className="mb-4 rounded-lg w-full h-48 object-cover"
          />
          <h3 className="font-semibold text-lg">{slides[currentIndex].title}</h3>
          <p className="mb-4 text-sm dark:text-gray-400">{slides[currentIndex].subtitle}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* Optional: Uncomment if you want to navigate manually */}
      {/* <div className="left-0 absolute inset-y-1/2 flex items-center">
        <button onClick={handlePrev} className="text-white hover:text-gray-400 transition duration-200">
          &lt; Prev
        </button>
      </div>
      <div className="right-0 absolute inset-y-1/2 flex items-center">
        <button onClick={handleNext} className="text-white hover:text-gray-400 transition duration-200">
          Next &gt;
        </button>
      </div> */}
    </div>
  );
};

export default FeaturesCarousel;
