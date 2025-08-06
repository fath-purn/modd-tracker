import { create } from "zustand";
import {
  MoodZustand,
  SearchFilterState,
} from "@/types/zustand";
import { moodSchema } from "@/lib/zod";
import { MoodProps } from "@/types/mood";
import { redirect } from "next/navigation";

export const useMoodStore = create<MoodZustand>((set, get) => ({
  moods: [],
  error: null,
  isHydrated: false,
  setMoods: (moods: MoodProps[]) => set({ moods, isHydrated: true }),
  saveRoom: (jam, tanggal, formData) => {
    const rawData = {
      catatan: formData.get("catatan"),
      mood: formData.get("mood"),
      emosi: formData.getAll("emosi"),
      cuaca: formData.getAll("cuaca"),
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

    useSearchFilterStore.getState().clearFilters();

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
      emosi: formData.getAll("emosi"),
      cuaca: formData.getAll("cuaca"),
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

export const useSearchFilterStore = create<SearchFilterState>((set, get) => ({
  query: "",
  selectedCuaca: [],
  selectedEmosi: [],
  selectedMonth: new Date(),

  setQuery: (q) => set({ query: q }),

  toggleCuaca: (id) => {
    const current = get().selectedCuaca;
    set({
      selectedCuaca: current.includes(id)
        ? current.filter((c) => c !== id)
        : [...current, id],
    });
  },

  toggleEmosi: (id) => {
    const current = get().selectedEmosi;
    set({
      selectedEmosi: current.includes(id)
        ? current.filter((e) => e !== id)
        : [...current, id],
    });
  },

  setSelectedMonth: (date: Date) => set({ selectedMonth: date }),

  clearFilters: () =>
    set({
      query: "",
      selectedCuaca: [],
      selectedEmosi: [],
    }),
}));
