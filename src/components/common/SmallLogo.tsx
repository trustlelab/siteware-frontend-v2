interface LogoProps {
  width: number;
  height: number;
  mode?: 'dark' | 'light';
}

const SmallLogo: React.FC<LogoProps> = ({ width, height, mode = 'light' }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9.39 14.49"
      fill={mode === 'dark' ? 'black' : 'white'}
    >
      <polygon points="9.39 4.12 6.27 0 2.01 0 0 0 0 4.12 2.01 4.12 2.01 14.49 6.27 14.49 6.27 4.12 9.39 4.12" />
    </svg>
  );
};

export default SmallLogo;