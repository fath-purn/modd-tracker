import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchInput({ query, setQuery }: SearchInputProps) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari cuaca atau emosi..."
        className="peer block w-full rounded-md border border-gray-200 py-[15px] pl-10 text-sm shadow-sm placeholder:text-gray-500"
      />
      <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
    </div>
  );
}
