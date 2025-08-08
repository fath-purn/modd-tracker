"use client";
import { useMonthLabelOptions } from "@/app/data";
import clsx from "clsx";
import { useSearchFilterStore } from "@/lib/action";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SearchButton } from "@/components/head/search-button";

interface MonthNavigationProps {
  onSearchClick: () => void;
}

export function MonthNavigation({ onSearchClick }: MonthNavigationProps) {
  const months = useMonthLabelOptions();
  const setSelectedMonth = useSearchFilterStore((s) => s.setSelectedMonth);
  const selectedMonth = useSearchFilterStore((s) => s.selectedMonth);

  // Mengambil data bulan
  const currentIndex = months.findIndex(
    (m) =>
      m.date.getMonth() === selectedMonth.getMonth() &&
      m.date.getFullYear() === selectedMonth.getFullYear()
  );

  // Tombol kiri
  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1].date);
    }
  };

  // Tombol kanan
  const handleNext = () => {
    if (currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1].date);
    }
  };

  return (
    <div className="mb-6 md:mb-0 flex mx-auto w-full justify-center items-start">
      <div className="flex items-center gap-3 w-full md:w-fit">
        {/* Search */}
        <SearchButton onClick={onSearchClick} />

        {/* Filter berdasarkan bulan */}
        <div className="flex items-center justify-between md:gap-4 bg-white shadow-md rounded-full px-2.5 py-2 w-full md:w-fit mx-auto">
          {/* Tombol kiri */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={clsx(
              "text-2xl px-2 disabled:opacity-30 rounded-full py-2",
              {
                "cursor-pointer": currentIndex !== 0,
              }
            )}
          >
            <FaAngleLeft className="size-3" />
          </button>

          {/* Menampilkan bulan */}
          <span className="text-lg font-semibold hidden md:block">
            {months[currentIndex]?.label.slice(0, 5)}
          </span>

          <span className="text-lg font-semibold block md:hidden">
            {months[currentIndex]?.label}
          </span>

          {/* Tombol kanan */}
          <button
            onClick={handleNext}
            disabled={currentIndex === months.length - 1}
            className={clsx(
              "text-2xl px-2 disabled:opacity-30 rounded-full py-2",
              {
                "cursor-pointer": currentIndex !== months.length - 1,
              }
            )}
          >
            <FaAngleRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
