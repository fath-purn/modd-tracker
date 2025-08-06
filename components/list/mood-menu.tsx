import { forwardRef } from "react";

interface MoodMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const MoodMenu = forwardRef<HTMLDivElement, MoodMenuProps>(
  ({ isOpen, onToggle, onEdit, onDelete }, ref) => {
    return (
      <>
        {/* Menu Dropdown */}
        {isOpen && (
          <div
            ref={ref}
            className="absolute top-2 right-2 bg-white rounded shadow-md p-2 z-10 animate-fade-in"
          >
            <button
              onClick={onEdit}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left cursor-pointer text-red-600"
            >
              Hapus
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-700 absolute top-0 right-0 p-2"
        >
          ⋮
        </button>
      </>
    );
  }
);

MoodMenu.displayName = "MoodMenu";