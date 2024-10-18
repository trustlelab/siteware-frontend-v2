import { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Importing icons
import { useTranslation } from 'react-i18next'; // Import i18n translation hook

/**
 *
 */
const Carousel = () => {
  const { t } = useTranslation(); // Initialize i18n translation
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: t('create_assistant_title'), // Translation key for title
      phrase: t('create_assistant_phrase'), // Translation key for phrase
      image: 'https://tinyurl.com/grt456', // Original image URL
      smallImage: 'https://ln.run/YIXAj', // Original small image URL
      id: 1,
    },
    {
      title: t('customize_responses_title'), // Translation key for title
      phrase: t('customize_responses_phrase'), // Translation key for phrase
      image: 'https://ln.run/8Unoa', // Original image URL
      smallImage: 'https://ln.run/eK7ad', // Original small image URL
      id: 2,
    },
    {
      title: t('deploy_platforms_title'), // Translation key for title
      phrase: t('deploy_platforms_phrase'), // Translation key for phrase
      image: 'https://ln.run/v2boj', // Original image URL
      smallImage: 'https://ln.run/QyDTU', // Original small image URL
      id: 3,
    },
  ];

  /**
   *
   */
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  /**
   *
   */
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
    <div className="relative mx-auto mt-[220px] p-6 rounded-lg max-w-3xl h-[520px] overflow-hidden">
      {/* Main Image and Small Image Container */}
      <div className="flex justify-center items-center mb-4">
        <div className="relative w-[477px] h-[328px]">
          <div className="bg-white rounded-[12px] w-[432px] h-[260px]">
            <img src={slides[currentIndex].image} className="shadow-md rounded-lg w-[432px] h-[260px]" />
          </div>
          <div className="right-[30px] bottom-0 absolute bg-white rounded-[12px] w-[192px] h-[192px]">
            <img src={slides[currentIndex].smallImage} className="shadow-md rounded-[12px] w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Title and Phrase Section */}
      <div className="mb-4 text-center">
        <h2 className="font-medium text-[20px] text-white leading-[30px]">{slides[currentIndex].title}</h2>
        <p className="text-[16px] text-gray-200">{slides[currentIndex].phrase}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="bottom-4 left-1/2 absolute flex justify-between items-center px-4 w-[60%] transform -translate-x-1/2">
        <button onClick={prevSlide} className="dark:hover:bg-black hover:bg-purple-200 p-2 rounded-full transition duration-300">
          <AiOutlineLeft className="text-lg" color="white" />
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

        <button onClick={nextSlide} className="dark:hover:bg-black hover:bg-purple-200 p-2 rounded-full transition duration-300">
          <AiOutlineRight color="white" className="text-lg" />
        </button>
      </div>

      {/* Indicator Dots */}
    </div>
  );
};

export default Carousel;
