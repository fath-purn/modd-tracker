"use client";

import { useMoodStore } from "@/lib/action";
import { useLoadMoods } from "@/app/data";
import MoodChart from "@/components/chart";
import MoodHeatmap from "@/components/mood-headmap";

export default function StatistikChart() {
  useLoadMoods();

  const moods = useMoodStore((state) => state.moods);
  const isHydrated = useMoodStore((s) => s.isHydrated);

  if (!isHydrated) return null;

  if (!moods || moods.length === 0) {
    return <p className="text-sm text-gray-500">Belum ada data mood.</p>;
  }

  return (
    <div>
      <MoodChart moods={moods} />
      <MoodHeatmap moods={moods} />
    </div>
  );
}
