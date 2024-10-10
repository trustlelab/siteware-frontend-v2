import GoogleLogo from '../../assets/icons/brand/google.svg'; // Adjust the path as needed

/**
 *
 */
function ContinueWithGoogle() {
  return (
    <button className="flex justify-center items-center space-x-[12px] border-[#D0D5DD] dark:border-white hover:opacity-65 border dark:border-opacity-[30%] rounded-lg w-full h-[48px] font-bold text-black dark:text-white">
      <img src={GoogleLogo} />
      <span>Continue with Google</span>
    </button>
  );
}
export default ContinueWithGoogle;
