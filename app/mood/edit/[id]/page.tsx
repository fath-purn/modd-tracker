import { Metadata } from "next";
import MoodEditForm from "@/components/edit-mood";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tambah",
};

export default async function MoodCreate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="max-w-screen-lg mx-auto py-20 px-4">
        <h1 className="text-center text-4xl mb-8">Udah ngerasa baikan?</h1>
        <Suspense fallback={<p>loading...</p>}>
          <MoodEditForm id={id} />
        </Suspense>
      </div>
    </div>
  );
}
