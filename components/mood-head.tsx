// "use client";
// import { moodData, useMonthLabelOptions } from "@/app/data";
// import clsx from "clsx";
// import Link from "next/link";
// import { useSearchFilterStore } from "@/lib/action";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { HiMiniMagnifyingGlass } from "react-icons/hi2";
// import { useRef, useEffect, useState } from "react";
// import { CuacaIcon, EmosiIcon, MoodIcon } from "@/components/mood-icons";
// import { cuacaData, emosiData } from "@/app/data";

// export default function MoodHead() {
//   const months = useMonthLabelOptions();

//   //   filter bulan
//   const setSelectedMonth = useSearchFilterStore((s) => s.setSelectedMonth);
//   const selectedMonth = useSearchFilterStore((s) => s.selectedMonth);

//   //   cari
//   const query = useSearchFilterStore((s) => s.query);
//   const setQuery = useSearchFilterStore((s) => s.setQuery);

//   //   filter emosi
//   const selectedEmosi = useSearchFilterStore((s) => s.selectedEmosi);
//   const setEmosi = useSearchFilterStore((s) => s.toggleEmosi);

//   //   filter cuaca
//   const selectedCuaca = useSearchFilterStore((s) => s.selectedCuaca);
//   const setCuaca = useSearchFilterStore((s) => s.toggleCuaca);

//   //   search open
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (isSearchOpen && modalRef.current) {
//       const input = modalRef.current.querySelector("input") as HTMLInputElement;
//       input?.focus();
//     }
//   }, [isSearchOpen]);

//   // Mengambil data bulan
//   const currentIndex = months.findIndex(
//     (m) =>
//       m.date.getMonth() === selectedMonth.getMonth() &&
//       m.date.getFullYear() === selectedMonth.getFullYear()
//   );

//   //   Tombol kiri
//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setSelectedMonth(months[currentIndex - 1].date);
//     }
//   };

//   //   Tombol kanan
//   const handleNext = () => {
//     if (currentIndex < months.length - 1) {
//       setSelectedMonth(months[currentIndex + 1].date);
//     }
//   };

//   return (
//     <div className="mb-6 md:px-8 md:grid md:grid-cols-2 flex flex-col-reverse">
//       <div className="bg-white shadow-md rounded-lg px-4 py-6">
//         <h1 className="font-semibold text-center text-2xl">
//           Bagaimana kabarmu sekarang?
//         </h1>
//         <div className="grid grid-cols-5 mx-auto mt-6">
//           {moodData.map((item) => (
//             <div key={item.id} className="flex flex-col items-center mb-4">
//               <Link
//                 href={`/mood/add?moodId=${item.id}`}
//                 className={clsx(
//                   "cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full shadow bg-white hover:scale-105",
//                   {
//                     "text-[#44c5a6]": item.id === 1,
//                     "text-[#a4d756]": item.id === 2,
//                     "text-[#71b5dc]": item.id === 3,
//                     "text-[#f9a44a]": item.id === 4,
//                     "text-[#f5586b]": item.id === 5,
//                   }
//                 )}
//               >
//                 <MoodIcon mood={item.id} className="size-8" />
//               </Link>

//               <Link href={`/mood/add?moodId=${item.id}`}>
//                 <span
//                   className={clsx(
//                     "capitalize text-sm w-[80%] text-center mt-1",
//                     {
//                       "text-[#44c5a6]": item.id === 1,
//                       "text-[#a4d756]": item.id === 2,
//                       "text-[#71b5dc]": item.id === 3,
//                       "text-[#f9a44a]": item.id === 4,
//                       "text-[#f5586b]": item.id === 5,
//                     }
//                   )}
//                 >
//                   {item.name}
//                 </span>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mb-6 md:mb-0 flex mx-auto w-full justify-center items-start ">
//         <div className="flex items-center gap-3 w-full md:w-fit">
//           <button
//             onClick={() => setIsSearchOpen(true)}
//             className="mr-5 rounded-full bg-white shadow-md p-3 text-gray-400 hover:text-gray-800"
//           >
//             <HiMiniMagnifyingGlass className="size-5" />
//           </button>

//           <div className="flex items-center justify-between md:gap-4 bg-white shadow-md rounded-full px-2.5 py-2 w-full md:w-fit mx-auto">
//             <button
//               onClick={handlePrev}
//               disabled={currentIndex === 0}
//               className={clsx(
//                 "text-2xl px-2 disabled:opacity-30  rounded-full py-2",
//                 {
//                   "cursor-pointer": currentIndex !== 0,
//                 }
//               )}
//             >
//               <FaAngleLeft className="size-3" />
//             </button>

//             {/* Menampilkan bulan */}
//             <span className="text-lg font-semibold hidden md:block">
//               {months[currentIndex]?.label.slice(0, 4)}
//             </span>

//             <span className="text-lg font-semibold block md:hidden">
//               {months[currentIndex]?.label}
//             </span>

//             <button
//               onClick={handleNext}
//               disabled={currentIndex === months.length - 1}
//               className={clsx(
//                 "text-2xl px-2 disabled:opacity-30  rounded-full py-2",
//                 {
//                   "cursor-pointer": currentIndex !== months.length - 1,
//                 }
//               )}
//             >
//               <FaAngleRight className="size-3" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {isSearchOpen && (
//         <div
//           className="fixed inset-0 z-50 bg-black/50 flex items-start py-20 md:pt-0 md:items-center justify-center  px-4 opacity-50 animate-[fadeSlideIn_0.3s_forwards]"
//           onClick={() => setIsSearchOpen(false)}
//         >
//           <div
//             ref={modalRef}
//             className="bg-white w-full flex flex-col justify-between max-w-md p-6 rounded-lg shadow-xl h-full md:h-fit"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="">
//               <div className="relative flex flex-1 flex-shrink-0">
//                 <label htmlFor="search" className="sr-only">
//                   Search
//                 </label>
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Cari cuaca atau emosi..."
//                   className="peer block w-full rounded-md border border-gray-200 py-[15px] pl-10 text-sm shadow-sm placeholder:text-gray-500"
//                 />

//                 <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
//               </div>
//               <div className="mt-3">
//                 <div className="flex flex-wrap gap-2">
//                   {emosiData.map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => setEmosi(String(item.id))}
//                       className={clsx(
//                         "flex items-center gap-1 px-3 py-1 rounded-full border text-sm transition",
//                         selectedEmosi.includes(String(item.id))
//                           ? "bg-[#15b790] text-white border-[#15b790]"
//                           : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
//                       )}
//                     >
//                       <EmosiIcon emosi={item.id} className="size-4" />
//                       <span>{item.name}</span>
//                     </button>
//                   ))}
//                   {cuacaData.map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => setCuaca(String(item.id))}
//                       className={clsx(
//                         "flex items-center gap-1 px-3 py-1 rounded-full border text-sm transition",
//                         selectedCuaca.includes(String(item.id))
//                           ? "bg-[#15b790] text-white border-[#15b790]"
//                           : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
//                       )}
//                     >
//                       <CuacaIcon cuaca={item.id} className="size-4" />
//                       <span>{item.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 setIsSearchOpen(false);
//               }}
//               className="mt-6 w-full bg-[#15b790] text-white font-semibold py-2 rounded hover:bg-[#12a080] transition"
//             >
//               Cari
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { MoodSelector } from "@/components/head/mood-selector";
import { MonthNavigation } from "@/components/head/mont-navigation";
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