import { create } from "zustand";
import { MoodZustand } from "@/types/zustand";
import { moodSchema } from "@/lib/zod";
import { MoodProps } from "@/types/mood";
import { redirect } from "next/navigation";

export const useMoodStore = create<MoodZustand>((set, get) => ({
  moods: [],
  error: null,
  setMoods: (moods: MoodProps[]) => set({ moods }),
  saveRoom: (jam, tanggal, formData) => {
    const rawData = {
      catatan: formData.get("catatan"),
      mood: formData.get("mood"),
      // mood: formData.getAll("mood"),
    };

    const validateFields = moodSchema.safeParse(rawData);
    if (!validateFields.success) {
      const fieldErrors = validateFields.error.flatten().fieldErrors;
      set({ error: fieldErrors });
      console.log("error validate", fieldErrors);
      return { error: fieldErrors };
    }

    const moodWithId = {
      ...validateFields.data,
      id: crypto.randomUUID(),
      jam: jam,
      tanggal: tanggal,
    };
    const updatedMoods = [...get().moods, moodWithId];

    set({ moods: updatedMoods, error: null });

    if (typeof window !== "undefined") {
      localStorage.setItem("moods", JSON.stringify(updatedMoods));
    }

    redirect("/");
  },
  deleteMood: (id: string) => {
    const updatedMoods = get().moods.filter((item) => item.id !== id);
    set({ moods: updatedMoods });
    if (typeof window !== "undefined") {
      localStorage.setItem("moods", JSON.stringify(updatedMoods));
    }
  },
  updateMood: (id, jam, tanggal, formData) => {
    const rawData = {
      catatan: formData.get("catatan"),
      mood: formData.get("mood"),
    };

    const validateFields = moodSchema.safeParse(rawData);
    if (!validateFields.success) {
      const fieldErrors = validateFields.error.flatten().fieldErrors;
      set({ error: fieldErrors });
      return { error: fieldErrors };
    }

    const updatedMoods = get().moods.map((item) =>
      item.id === id ? { ...item, ...validateFields.data, jam, tanggal } : item
    );

    set({ moods: updatedMoods, error: null });
    if (typeof window !== "undefined") {
      localStorage.setItem("moods", JSON.stringify(updatedMoods));
    }

    return {};
  },
}));
