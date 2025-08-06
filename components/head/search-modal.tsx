"use client";
import { useRef, useEffect } from "react";
import { useSearchFilterStore } from "@/lib/action";
import { SearchInput } from "@/components/head/search-input";
import { FilterTags } from "@/components/head/filter-tags";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Store hooks
  const query = useSearchFilterStore((s) => s.query);
  const setQuery = useSearchFilterStore((s) => s.setQuery);
  const selectedEmosi = useSearchFilterStore((s) => s.selectedEmosi);
  const setEmosi = useSearchFilterStore((s) => s.toggleEmosi);
  const selectedCuaca = useSearchFilterStore((s) => s.selectedCuaca);
  const setCuaca = useSearchFilterStore((s) => s.toggleCuaca);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const input = modalRef.current.querySelector("input") as HTMLInputElement;
      input?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start py-20 md:pt-0 md:items-center justify-center px-4 opacity-50 animate-[fadeSlideIn_0.3s_forwards]"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white w-full flex flex-col justify-between max-w-md p-6 rounded-lg shadow-xl h-full md:h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <SearchInput query={query} setQuery={setQuery} />
          <FilterTags
            selectedEmosi={selectedEmosi}
            selectedCuaca={selectedCuaca}
            onEmosiToggle={setEmosi}
            onCuacaToggle={setCuaca}
          />
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#15b790] text-white font-semibold py-2 rounded hover:bg-[#12a080] transition"
        >
          Cari
        </button>
      </div>
    </div>
  );
}
