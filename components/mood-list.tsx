// "use client";

// import { useMoodStore, useSearchFilterStore } from "@/lib/action";
// import { useLoadMoods } from "@/app/data";
// import { getTanggalLabel, formatTanggalIndo, getMoodLabel } from "@/lib/utils";
// import clsx from "clsx";
// import { useState, useRef, useEffect } from "react";
// import MoodEditForm from "@/components/edit-mood";
// import { MoodProps } from "@/types/mood";
// import { MoodIcon, EmosiIcon, CuacaIcon } from "@/components/mood-icons";
// import { emosiData, cuacaData } from "@/app/data";
// import DetailMood from "@/components/detail-mood";

// export default function MoodList() {
//   useLoadMoods();
//   const moods = useMoodStore((state) => state.moods);
//   const selectedMonth = useSearchFilterStore((s) => s.selectedMonth);
//   const selectedCuaca = useSearchFilterStore((s) => s.selectedCuaca);
//   const selectedEmosi = useSearchFilterStore((s) => s.selectedEmosi);
//   const query = useSearchFilterStore((s) => s.query);

//   const deleteMood = useMoodStore((state) => state.deleteMood);

//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [detailMood, setDetailMood] = useState<MoodProps | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setOpenMenuId(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const filteredMoods = moods.filter((item) => {
//     const date = new Date(item.tanggal);

//     // Cek cuaca
//     const matchCuaca =
//       selectedCuaca.length === 0 ||
//       selectedCuaca.some((id) => item.cuaca?.includes(id));

//     // Cek emosi
//     const matchEmosi =
//       selectedEmosi.length === 0 ||
//       selectedEmosi.some((id) => item.emosi?.includes(id));

//     // Cek query
//     const matchQuery =
//       !query || item.catatan?.toLowerCase().includes(query.toLowerCase());

//     // Cek sebelum atau sama dengan bulan terpilih
//     const isBeforeOrSameMonth =
//       date <=
//       new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

//     return matchCuaca && matchEmosi && matchQuery && isBeforeOrSameMonth;
//   });

//   // mengurutkan sesuai tanggal dan jam
//   const sortedMoods = [...filteredMoods].sort((a, b) => {
//     const dateA = new Date(`${a.tanggal}T${a.jam.replace(".", ":")}`);
//     const dateB = new Date(`${b.tanggal}T${b.jam.replace(".", ":")}`);
//     return dateB.getTime() - dateA.getTime();
//   });

//   return (
//     <div className="md:px-8">
//       <div className="grid md:grid-cols-3 gap-4">
//         {Object.entries(
//           sortedMoods.reduce<Record<string, typeof sortedMoods>>(
//             (acc, mood) => {
//               if (!acc[mood.tanggal]) acc[mood.tanggal] = [];
//               acc[mood.tanggal].push(mood);
//               return acc;
//             },
//             {}
//           )
//         ).map(([tanggal, items]) => (
//           <div
//             key={tanggal}
//             className="relative h-fit rounded-lg shadow transition hover:shadow-lg opacity-0 animate-[fadeSlideIn_0.5s_forwards] mb-1 bg-white"
//           >
//             {/* Header Tanggal */}
//             <div className="flex items-center bg-[#15b790] px-4 py-2 rounded-t-lg text-white">
//               <span className="border-4 w-5 h-5 rounded-full border-white mr-3"></span>
//               <p className="text-sm font-semibold">
//                 {getTanggalLabel(tanggal)} {formatTanggalIndo(tanggal)}
//               </p>
//             </div>

//             {/* Mood Items */}
//             <div className="p-4 space-y-4">
//               {items.map((item) => {
//                 const isLongNote = item.catatan && item.catatan.length > 100;
//                 const shortNote = isLongNote
//                   ? item.catatan && item.catatan.slice(0, 100) + "..."
//                   : item.catatan;

//                 return (
//                   <div key={item.id} className="relative pb-4">
//                     <div className="flex flex-row items-start gap-3">
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={clsx(
//                             "text-2xl font-bold flex items-center gap-2",
//                             {
//                               "text-[#44c5a6]": item.mood === "1",
//                               "text-[#a4d756]": item.mood === "2",
//                               "text-[#71b5dc]": item.mood === "3",
//                               "text-[#f9a44a]": item.mood === "4",
//                               "text-[#f5586b]": item.mood === "5",
//                             }
//                           )}
//                         >
//                           <MoodIcon mood={item.mood} className="size-8" />
//                         </div>

//                         {/* <div className="w-[2px] h-4 bg-gray-300 mt-1"></div> */}
//                       </div>

//                       <div>
//                         {/* Mood */}
//                         <span
//                           className={clsx("text-2xl font-bold", {
//                             "text-[#44c5a6]": item.mood === "1",
//                             "text-[#a4d756]": item.mood === "2",
//                             "text-[#71b5dc]": item.mood === "3",
//                             "text-[#f9a44a]": item.mood === "4",
//                             "text-[#f5586b]": item.mood === "5",
//                           })}
//                         >
//                           {getMoodLabel(item.mood)}
//                         </span>
//                         <span className="text-gray-700 text-sm mt-2 ml-2">
//                           {item.jam}
//                         </span>

//                         {/* Menampilkan cuaca */}
//                         <div className="flex flex-wrap items-center mt-2">
//                           {item.cuaca?.map((id: string) => {
//                             const label = cuacaData.find(
//                               (e) => String(e.id) === id
//                             );
//                             return (
//                               <div
//                                 key={id}
//                                 className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-full bg-gray-50 text-sm text-gray-700 mr-2 mb-2"
//                               >
//                                 <CuacaIcon cuaca={id} className="size-4" />
//                                 <span>{label?.name}</span>
//                               </div>
//                             );
//                           })}

//                           {/* Menampilkan emosi */}
//                           {item.emosi?.map((id: string) => {
//                             const label = emosiData.find(
//                               (e) => String(e.id) === id
//                             );
//                             return (
//                               <div
//                                 key={id}
//                                 className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-full bg-gray-50 text-sm text-gray-700 mr-2 mb-2"
//                               >
//                                 <EmosiIcon emosi={id} className="size-4" />
//                                 <span>{label?.name}</span>
//                               </div>
//                             );
//                           })}
//                         </div>

//                         {/* Catatan */}
//                         <div className="">
//                           <p className="text-sm text-gray-600 mt-2 hidden md:block">
//                             {shortNote}{" "}
//                             {isLongNote && (
//                               <button
//                                 onClick={() => setDetailMood(item)}
//                                 className="text-blue-700 underline text-xs cursor-pointer"
//                               >
//                                 Lihat Selengkapnya
//                               </button>
//                             )}
//                           </p>

//                           <p className="text-sm text-gray-600 mt-2 block md:hidden">
//                             {item.catatan}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Menu edit dan delete */}
//                     {openMenuId === item.id && (
//                       <div
//                         ref={menuRef}
//                         className="absolute top-2 right-2 bg-white rounded shadow-md p-2 z-10 animate-fade-in"
//                       >
//                         <button
//                           onClick={() => {
//                             setEditingId(item.id);
//                             setOpenMenuId(null);
//                           }}
//                           className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left cursor-pointer"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => {
//                             deleteMood(item.id);
//                             setOpenMenuId(null);
//                           }}
//                           className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left cursor-pointer text-red-600"
//                         >
//                           Hapus
//                         </button>
//                       </div>
//                     )}

//                     {/* Tombol 3 titik */}
//                     <button
//                       onClick={() =>
//                         setOpenMenuId(openMenuId === item.id ? null : item.id)
//                       }
//                       className="text-gray-400 hover:text-gray-700 absolute top-0 right-0 p-2"
//                     >
//                       ⋮
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Menampilkan edit data */}
//       {editingId && (
//         <div
//           ref={menuRef}
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
//           onClick={() => setEditingId(null)}
//         >
//           <div
//             className="bg-white p-6 rounded-md w-full max-w-[90%] md:max-w-lg  relative max-h-[90vh] "
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-black"
//               onClick={() => setEditingId(null)}
//             >
//               ✕
//             </button>
//             <h3 className="text-xl font-semibold mb-4">Edit Mood</h3>
//             <div className="overflow-y-auto  relative max-h-[80vh] mb-3">
//               <MoodEditForm
//                 id={editingId}
//                 onSuccess={() => setEditingId(null)}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Detail mood */}
//       {detailMood && (
//         <div
//           ref={menuRef}
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in "
//           onClick={() => setDetailMood(null)}
//         >
//           <div
//             className="bg-white pb-6 rounded-lg w-full max-w-[90%] md:max-w-lg relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <DetailMood
//               detailMood={detailMood}
//               closeModal={() => setDetailMood(null)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useLoadMoods } from "@/app/data";
import { MoodProps } from "@/types/mood";
import { MoodDayCard } from "@/components/list/mood-day-card";
import { EditMoodModal } from "@/components/list/edit-mood-modal";
import { DetailMoodModal } from "@/components/list/detail-modal";
import { useMoodFiltering } from "@/lib/utils";

export default function MoodList() {
  useLoadMoods();
  
  const { moodsByDate } = useMoodFiltering();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailMood, setDetailMood] = useState<MoodProps | null>(null);

  return (
    <div className="md:px-8">
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(moodsByDate).map(([tanggal, moods]) => (
          <MoodDayCard
            key={tanggal}
            date={tanggal}
            moods={moods}
            onEdit={setEditingId}
            onShowDetail={setDetailMood}
          />
        ))}
      </div>

      <EditMoodModal 
        editingId={editingId} 
        onClose={() => setEditingId(null)} 
      />

      <DetailMoodModal 
        mood={detailMood} 
        onClose={() => setDetailMood(null)} 
      />
    </div>
  );
}