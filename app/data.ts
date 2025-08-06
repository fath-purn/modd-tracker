"use client";
import { useMoodStore } from "@/lib/action";
import { useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MoodProps } from "@/types/mood";

export const moodData = [
  {
    id: 1,
    name: "Keren",
  },
  {
    id: 2,
    name: "Baik",
  },
  {
    id: 3,
    name: "Biasa",
  },
  {
    id: 4,
    name: "Buruk",
  },
  {
    id: 5,
    name: "Parah",
  },
];

export const cuacaData = [
  {
    id: 1,
    name: "Cerah",
  },
  {
    id: 2,
    name: "Berawan",
  },
  {
    id: 3,
    name: "Hujan",
  },
  {
    id: 4,
    name: "Dingin",
  },
  {
    id: 5,
    name: "Panas",
  },
  {
    id: 6,
    name: "Badai",
  },
  {
    id: 7,
    name: "Berangin",
  },
];

export const emosiData = [
  {
    id: 1,
    name: "Senang",
  },
  {
    id: 2,
    name: "Bersemangat",
  },
  {
    id: 3,
    name: "Bersykur",
  },
  {
    id: 4,
    name: "Santai",
  },
  {
    id: 5,
    name: "Puas",
  },
  {
    id: 6,
    name: "Lelah",
  },
  {
    id: 7,
    name: "Bingung",
  },
  {
    id: 8,
    name: "Bosan",
  },
  {
    id: 9,
    name: "Cemas",
  },
  {
    id: 10,
    name: "Marah",
  },
  {
    id: 11,
    name: "Stres",
  },
  {
    id: 12,
    name: "Sedih",
  },
  {
    id: 13,
    name: "Badmood",
  },
];

export const useLoadMoods = () => {
  const setMoods = useMoodStore((state) => state.setMoods);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("moods");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMoods(parsed);
        } catch (e) {
          console.error("Gagal parse moods:", e);
        }
      } else {
        setMoods([]);
      }
    }
  }, [setMoods]);
};

export const useMonthLabelOptions = () => {
  const moods: MoodProps[] = useMoodStore((s) => s.moods);

  const availableMonths = Array.from(
    new Set(
      moods.map((item) => {
        const d = new Date(item.tanggal);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort();

  const monthOptions = availableMonths.map((val) => {
    const [year, month] = val.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return {
      key: val,
      label: format(date, "MMMM yyyy", { locale: id }),
      date,
    };
  });

  return monthOptions;
};