interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  isOpen: boolean;
  items: DropdownItem[];
  onClose: () => void;
}

/**
 *
 */
const Dropdown: React.FC<DropdownProps> = ({ isOpen, items, onClose }) => {
  return (
    <div className={`absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
      <div className="py-2">
        {items.map((item, index) => (
          <button
            key={index}
            className="flex items-center hover:bg-gray-700 px-4 py-2 w-full text-gray-300 text-left"
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.icon} <span className="ml-2">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
