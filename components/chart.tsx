"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MoodProps } from "@/types/mood";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const moodValueMap: Record<string | number, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
};

const moodLabelMap: Record<number, string> = {
  1: "Keren",
  2: "Baik",
  3: "Biasa",
  4: "Buruk",
  5: "Parah",
};

export default function MoodChart({ moods }: { moods: MoodProps[] }) {
  const sorted = [...moods].sort(
    (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
  );

  const labels = sorted.map((item) =>
    new Date(item.tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    })
  );

  const data = sorted.map((item) => moodValueMap[item.mood]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Mood Harian",
        data,
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.3,
        pointBackgroundColor: "#4bc0c0",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        reverse: true,
        ticks: {
          stepSize: 1,
          callback: (value: number | string) =>
            typeof value === "number" ? moodLabelMap[value] : value,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Mood: ${moodLabelMap[ctx.raw as number] || ctx.raw}`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Grafik Mood Harian</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
