"use client";
import { moodData } from "@/app/data";
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
        {moodData.map((item) => (
          <div key={item.id} className="flex flex-col items-center mb-4">
            <Link
              href={`/mood/add?moodId=${item.id}`}
              className={clsx(
                "cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full shadow bg-white hover:scale-105",
                {
                  "text-[#44c5a6]": item.id === 1,
                  "text-[#a4d756]": item.id === 2,
                  "text-[#71b5dc]": item.id === 3,
                  "text-[#f9a44a]": item.id === 4,
                  "text-[#f5586b]": item.id === 5,
                }
              )}
            >
              <MoodIcon mood={item.id} className="size-8" />
            </Link>

            <Link href={`/mood/add?moodId=${item.id}`}>
              <span
                className={clsx(
                  "capitalize text-sm w-[80%] text-center mt-1",
                  {
                    "text-[#44c5a6]": item.id === 1,
                    "text-[#a4d756]": item.id === 2,
                    "text-[#71b5dc]": item.id === 3,
                    "text-[#f9a44a]": item.id === 4,
                    "text-[#f5586b]": item.id === 5,
                  }
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