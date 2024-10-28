import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '', overlayClassName = '' }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          modalRef.current.style.opacity = '1';
          modalRef.current.style.transform = 'scale(1)';
        }
      }, 10);
    } else if (modalRef.current) {
      modalRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      modalRef.current.style.opacity = '0';
      modalRef.current.style.transform = 'scale(0.9)';
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 left-0 top-0 bottom-0 right-0 flex items-center justify-center bg-[#101828D1] bg-opacity-[80%] ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`relative bg-white dark:bg-[#1D2939] p-6 rounded-lg shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        {/* Close Button */}
        <button
          onClick={() => {
            if (modalRef.current) {
              modalRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              modalRef.current.style.opacity = '0';
              modalRef.current.style.transform = 'scale(0.9)';
              setTimeout(() => {
                setIsVisible(false);
                onClose();
              }, 500);
            }
          }}
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
