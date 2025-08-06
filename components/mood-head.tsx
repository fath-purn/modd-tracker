"use client";
import { useState } from "react";
import { MoodSelector } from "@/components/head/mood-selector";
import { MonthNavigation } from "@/components/head/month-navigation";
import { SearchModal } from "@/components/head/search-modal";

export default function MoodHead() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="mb-6 md:px-8 md:grid md:grid-cols-2 flex flex-col-reverse">
      <MoodSelector />

      <MonthNavigation onSearchClick={() => setIsSearchOpen(true)} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
