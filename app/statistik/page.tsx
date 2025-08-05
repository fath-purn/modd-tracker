import StatistikChart from "@/components/statistik";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statistik",
}

export default function Mood() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="max-w-screen-lg mx-auto py-20 px-4">
        <h1 className="text-center text-4xl mb-8">
          Statistik
        </h1>
        <Suspense fallback={<p>loading...</p>}>
          <StatistikChart />
        </Suspense>
      </div>
    </div>
  );
}
