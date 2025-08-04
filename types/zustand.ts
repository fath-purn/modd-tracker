import { MoodProps } from "@/types/mood";

export interface MoodZustand {
  moods: MoodProps[];
  error: string | Record<string, string[]> | null;
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
