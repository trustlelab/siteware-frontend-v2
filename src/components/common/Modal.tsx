
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; 
  overlayClassName?: string; 
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  overlayClassName = '',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 left-0 top-0 bottom-0 right-0 flex items-center backdrop-blur-[5px] justify-center bg-black bg-opacity-50 ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white p-6 rounded-lg shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="top-2 right-2 absolute hover:dark:bg-gray-700 p-2 rounded-full w-[40px] h-[40px] text-gray-500 hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-white"
        >
          ✕
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
