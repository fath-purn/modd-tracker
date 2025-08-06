import { moodData } from "@/app/data";
import { useMemo } from "react";
import { useMoodStore, useSearchFilterStore } from "@/lib/action";

export const getTanggalLabel = (tanggal: string) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toISOString().split("T")[0];
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (tanggal === todayStr) return "Hari ini,";
  if (tanggal === yesterdayStr) return "Kemarin,";
  return;
};

export const formatTanggalIndo = (tanggal: string) => {
  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const [year, month, day] = tanggal.split("-");
  const bulan = bulanIndo[parseInt(month, 10) - 1];
  return `${parseInt(day, 10)} ${bulan}`;
};

export const getMoodLabel = (moodId: number | string) => {
  const found = moodData.find((item) => String(item.id) === String(moodId));
  return found ? found.name : "-";
};

export function useMoodFiltering() {
  const moods = useMoodStore((state) => state.moods);
  const selectedMonth = useSearchFilterStore((s) => s.selectedMonth);
  const selectedCuaca = useSearchFilterStore((s) => s.selectedCuaca);
  const selectedEmosi = useSearchFilterStore((s) => s.selectedEmosi);
  const query = useSearchFilterStore((s) => s.query);

  const filteredAndSortedMoods = useMemo(() => {
    const filtered = moods.filter((item) => {
      const date = new Date(item.tanggal);

      // Cek cuaca
      const matchCuaca =
        selectedCuaca.length === 0 ||
        selectedCuaca.some((id) => item.cuaca?.includes(id));

      // Cek emosi
      const matchEmosi =
        selectedEmosi.length === 0 ||
        selectedEmosi.some((id) => item.emosi?.includes(id));

      // Cek query
      const matchQuery =
        !query || item.catatan?.toLowerCase().includes(query.toLowerCase());

      // Cek sebelum atau sama dengan bulan terpilih
      const isBeforeOrSameMonth =
        date <=
        new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

      return matchCuaca && matchEmosi && matchQuery && isBeforeOrSameMonth;
    });

    // Mengurutkan sesuai tanggal dan jam
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(`${a.tanggal}T${a.jam.replace(".", ":")}`);
      const dateB = new Date(`${b.tanggal}T${b.jam.replace(".", ":")}`);
      return dateB.getTime() - dateA.getTime();
    });

    return sorted;
  }, [moods, selectedMonth, selectedCuaca, selectedEmosi, query]);

  // Group by date
  const moodsByDate = useMemo(() => {
    return filteredAndSortedMoods.reduce<Record<string, typeof filteredAndSortedMoods>>(
      (acc, mood) => {
        if (!acc[mood.tanggal]) acc[mood.tanggal] = [];
        acc[mood.tanggal].push(mood);
        return acc;
      },
      {}
    );
  }, [filteredAndSortedMoods]);

  return { moodsByDate };
}
