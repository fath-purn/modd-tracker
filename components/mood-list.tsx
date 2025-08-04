"use client";

import { useMoodStore } from "@/lib/action";
import { useLoadMoods } from "@/app/data";
import { getTanggalLabel, formatTanggalIndo, getMoodLabel } from "@/lib/utils";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { redirect } from "next/navigation";
import MoodEditForm from "@/components/edit-mood";

export default function MoodList() {
  useLoadMoods();
  const moods = useMoodStore((state) => state.moods);
  const deleteMood = useMoodStore((state) => state.deleteMood);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-xl font-semibold mb-4">Daftar Mood</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {moods.map((item) => {
          return (
            <div
              key={item.id}
              className="relative space-y-2 h-fit rounded shadow mb-3 transition transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div
                className={clsx(
                  "rounded shadow p-4 relative min-h-[160px] transition-all duration-200",
                  {
                    "bg-green-200": item.mood === "1",
                    "bg-purple-200": item.mood === "2",
                    "bg-blue-200": item.mood === "3",
                    "bg-yellow-200": item.mood === "4",
                    "bg-red-200": item.mood === "5",
                  }
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-700">
                      {getTanggalLabel(item.tanggal)}{" "}
                      {formatTanggalIndo(item.tanggal)}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === item.id ? null : item.id)
                    }
                    className="text-gray-600 hover:text-black"
                  >
                    ⋮
                  </button>
                </div>

                <div>
                  <span className="text-2xl mr-2 text-green-700 font-bold">
                    {getMoodLabel(item.mood)}
                  </span>{" "}
                  <span className="text-gray-700 text-sm">{item.jam}</span>
                </div>
                <p>{item.catatan}</p>
              </div>

              {/* Menu edit dan delete */}
              {openMenuId === item.id && (
                <div
                  ref={menuRef}
                  className="absolute top-4 right-4 bg-white rounded shadow-md p-2 z-10 animate-fade-in"
                >
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setOpenMenuId(null);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      deleteMood(item.id);
                      setOpenMenuId(null);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {editingId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setEditingId(null)}
        >
          <div
            className="bg-white p-6 rounded-md w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()} // Supaya klik dalam modal tidak menutup
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setEditingId(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Mood</h3>
            <MoodEditForm id={editingId} />
          </div>
        </div>
      )}
    </div>
  );
}
