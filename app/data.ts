"use client";
import { useMoodStore } from "@/lib/action";
import { useEffect } from "react";

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
