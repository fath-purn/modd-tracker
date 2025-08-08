"use client";
import { moodData, moodTextColors } from "@/app/data";
import clsx from "clsx";
import Link from "next/link";
import { MoodIcon } from "@/components/mood-icons";

export function MoodSelector() {
  return (
    <div className="bg-white shadow-md rounded-lg px-4 py-6">
      <h1 className="font-semibold text-center text-2xl">
        Bagaimana kabarmu sekarang?
      </h1>
      <div className="grid grid-cols-5 mx-auto mt-6">
        {/* Akses tambah mood */}
        {moodData.map((item) => (
          <div key={item.id} className="flex flex-col items-center mb-4 gap-2">
            <Link
              href={`/mood/add?moodId=${item.id}`}
              className={clsx(
                "cursor-pointer flex justify-center p-2.5 md:text-3xl border border-gray-300 transition duration-300 rounded-full shadow bg-white hover:scale-105",
                moodTextColors[item.id]
              )}
            >
              <MoodIcon mood={item.id} className="size-7 md:size-8" />
            </Link>

            <Link href={`/mood/add?moodId=${item.id}`}>
              <span
                className={clsx(
                  "capitalize text-sm w-[80%] text-center mt-1",
                  moodTextColors[item.id]
                )}
              >
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
