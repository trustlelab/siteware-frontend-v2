// Carousel.js
import { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Importing icons

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: 'Create Your Own Voice Assistant',
      phrase: 'Easily build a custom voice assistant to address your specific needs on any platform.',
      image: 'https://tinyurl.com/grt456', // Original image URL
      smallImage: 'https://ln.run/YIXAj', // Original small image URL
      id: 1
    },
    {
      title: 'Customize Responses for Any Problem',
      phrase: 'Define how your assistant responds to various user inputs with AI-driven solutions.',
      image: 'https://ln.run/8Unoa', // Original image URL
      smallImage: 'https://ln.run/eK7ad', // Original small image URL
      id: 2
    },
    {
      title: 'Deploy Across Platforms',
      phrase: 'Your assistant can be deployed on any platform, supporting web, mobile, and desktop apps.',
      image: 'https://ln.run/v2boj', // Original image URL
      smallImage: 'https://ln.run/QyDTU', // Original small image URL
      id: 3
    }
  ];
  
  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative mt-[220px]  p-6 rounded-lg h-[520px]  overflow-hidden max-w-3xl mx-auto">
      {/* Main Image and Small Image Container */}
      <div className="flex justify-center items-center   mb-4">
        <div className='w-[477px] h-[328px] relative'>
          <div className="w-[432px] h-[260px] rounded-[12px] bg-white">
            <img
              src={slides[currentIndex].image}
              className="w-[432px] h-[260px] rounded-lg shadow-md"
            />
          </div>
          <div className="w-[192px] h-[192px] rounded-[12px] absolute bottom-0 right-[30px] bg-white">
            <img
              src={slides[currentIndex].smallImage}
              className="w-full h-auto rounded-[12px] shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Title and Phrase Section */}
      <div className="text-center mb-4">
        <h2 className="text-[20px] leading-[30px] font-medium text-white">{slides[currentIndex].title}</h2>
        <p className="text-[16px] text-gray-200">{slides[currentIndex].phrase}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-[60%] px-4">
        <button onClick={prevSlide} className="p-2 rounded-full dark:hover:bg-black  hover:bg-purple-200 transition duration-300">
          <AiOutlineLeft className="text-lg"  color='white'/>
        </button>

        <div className="flex justify-center mt-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-[10px] h-[10px] rounded-full mx-1 cursor-pointer ${index === currentIndex ? 'bg-purple-200' : 'bg-[#9E77ED]'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="p-2 rounded-full dark:hover:bg-black   hover:bg-purple-200 transition duration-300">
          <AiOutlineRight color='white' className="text-lg" />
        </button>
      </div>

      {/* Indicator Dots */}

    </div>
  );
};

export default Carousel;
