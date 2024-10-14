import LinePattern from '../../assets/icons/patterns/line-pattern.svg'; // Adjust the path as needed
import ThemeToggle from './ToggleTheme';
import Carousel from './Carousel';
import LanguageSelector from './LanguageSelector';

/**
 *
 */
function Carouselwrapper() {
  return (
    <section className="sm:block relative hidden bg-gradient-to-r from-dark-purple dark:from-dark-light to-light-purple dark:to-dark-light w-[580px] h-screen overflow-hidden">
      <div className="top-2 right-2 z-50 absolute flex space-x-2">
        <LanguageSelector/>
        <ThemeToggle />
      </div>
      <img src={LinePattern} className="right-0 absolute" alt="Line Pattern" />
      <img src={LinePattern} className="absolute mt-[748px] overflow-hidden" alt="Line Pattern" />
      <Carousel />
    </section>
  );
}

export default Carouselwrapper;
