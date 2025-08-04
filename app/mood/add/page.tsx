import { Metadata } from "next";
import MoodForm from "@/components/mood-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tambah",
};

export default function MoodCreate() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="max-w-screen-lg mx-auto py-20 px-4">
        <h1 className="text-center text-4xl mb-8">
          Bagaimana kabarmu sekarang?
        </h1>
        <Suspense fallback={<p>loading...</p>}>
          <MoodForm />
        </Suspense>
      </div>
    </div>
  );
}
