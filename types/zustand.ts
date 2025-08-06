import { MoodProps } from "@/types/mood";

export interface MoodZustand {
  moods: MoodProps[];
  error: string | Record<string, string[]> | null;
  isHydrated: boolean;
  setMoods: (moods: MoodProps[]) => void;
  saveRoom: (
    jam: string,
    tanggal: string,
    formData: FormData
  ) => { error?: string | Record<string, string[]> };
  deleteMood: (id: string) => void;
  updateMood: (
    id: string,
    jam: string,
    tanggal: string,
    formData: FormData
  ) => { error?: string | Record<string, string[]> };
}

export interface SearchFilterState {
  query: string;
  selectedCuaca: string[];
  selectedEmosi: string[];
  selectedMonth: Date;

  setQuery: (q: string) => void;
  toggleCuaca: (id: string) => void;
  toggleEmosi: (id: string) => void;
  setSelectedMonth: (date: Date) => void;
  clearFilters: () => void;
}
