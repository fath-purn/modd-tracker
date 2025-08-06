import MoodList from "@/components/mood-list";
import MoodHead from "@/components/mood-head";
import { Suspense } from "react";

export default function Mood() {
  return (
    <div className="min-h-screen bg-slate-100 text-gray-900">
      <div className="max-w-screen-lg mx-auto pt-14 pb-20 px-4">
        <Suspense fallback={<p>loading...</p>}>
          <MoodHead />
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
          <MoodList />
        </Suspense>
      </div>
    </div>
  );
}
