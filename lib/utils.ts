import { moodData } from "@/app/data";

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
