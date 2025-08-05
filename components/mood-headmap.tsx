"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, format } from "date-fns";
import { MoodProps } from "@/types/mood";

type MoodHeatmapProps = MoodProps & {
  count: 1 | 2 | 3 | 4 | 5;
};

export default function MoodHeatmap({ moods }: { moods: MoodProps[] }) {
  const today = new Date();
  const startDate = addDays(today, -90);

  const moodMap = new Map<string, MoodProps>();

  moods.forEach((mood) => {
    moodMap.set(mood.tanggal, mood);
  });

  const values = Array.from(moodMap.entries()).map(([date, mood]) => ({
    date,
    count: Number(mood.mood),
  }));

  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold mb-4">Heatmap Mood Harian</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={values}
        classForValue={(value: MoodHeatmapProps) => {
          if (!value || !value.count) return "color-empty";
          return `color-${value.count}`;
        }}
        showWeekdayLabels={true}
        weekdayLabels={["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]}
        tooltipDataAttrs={(value: any) => {
          if (!value || !value.date) return null;
          return {
            "data-tip": `${format(
              new Date(value.date),
              "dd MMM yyyy"
            )} - Mood: ${value.count}`,
          };
        }}
      />
      <div className="flex items-center gap-4 mt-4 flex-wrap text-sm">
        <LegendBox className="bg-[#44c5a6]" label="Keren" />
        <LegendBox className="bg-[#a4d756]" label="Baik" />
        <LegendBox className="bg-[#71b5dc]" label="Biasa" />
        <LegendBox className="bg-[#f9a44a]" label="Buruk" />
        <LegendBox className="bg-[#f5586b]" label="Parah" />
      </div>
    </div>
  );
}

function LegendBox({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${className}`} />
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
