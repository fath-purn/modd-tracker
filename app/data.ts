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
    name: "Sangat Buruk",
  },
];

export const useLoadMoods = () => {
  const setMoods = useMoodStore((state) => state.setMoods);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("moods");
      if (stored) {
        setMoods(JSON.parse(stored));
      }
    }
  }, [setMoods]);
};
