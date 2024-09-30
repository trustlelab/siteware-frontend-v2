// About.js
import React from 'react';
import LinePattern from '../../assets/designs/Linepattern.svg'; // Adjust the path as needed
import Carousel from './Carousel';
import ThemeToggle from '../../components/ToggleTheme';
function Carouselwrapper() {
  return (
    <section className="w-[580px] hidden sm:block bg-gradient-to-r from-dark-purple to-light-purple  dark:from-dark-light dark:to-dark-light h-screen relative overflow-hidden">
      <div className='absolute right-2 top-2 z-50'>
      <ThemeToggle/>
      </div>
      <img src={LinePattern} className='absolute right-0' alt="Line Pattern" />
      <img src={LinePattern} className='absolute mt-[748px] overflow-hidden' alt="Line Pattern" />
      <Carousel />
    </section>
  );
}

export default Carouselwrapper;
