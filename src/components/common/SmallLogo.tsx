interface LogoProps {
  width: number;
  height: number;
}

/**
 * SmallLogo component renders a small SVG logo with customizable width and height.
 */
const SmallLogo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.39 14.49" className="fill-black dark:fill-white">
      <polygon points="9.39 4.12 6.27 0 2.01 0 0 0 0 4.12 2.01 4.12 2.01 14.49 6.27 14.49 6.27 4.12 9.39 4.12" />
    </svg>
  );
};

export default SmallLogo;
