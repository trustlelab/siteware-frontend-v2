import GoogleLogo from '../../assets/icons/google.svg'; // Adjust the path as needed

function ContinueWithGoogle() {
    return (
        <button className='flex hover:opacity-65 justify-center dark:text-white dark:border-white  w-full h-[48px] dark:border-opacity-[30%] border border-[#D0D5DD] items-center rounded-lg space-x-[12px] font-bold text-black'>
            <img src={GoogleLogo} />
            <span>
                Continue with Google
            </span>
        </button>
    )
}
export default ContinueWithGoogle