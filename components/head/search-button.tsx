import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mr-5 rounded-full bg-white shadow-md p-3 text-gray-400 hover:text-gray-800 hover:scale-110 transition duration-300"
    >
      <HiMiniMagnifyingGlass className="size-5" />
    </button>
  );
}
