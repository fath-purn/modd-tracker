import { object, string, array } from "zod";

export const moodSchema = object({
  catatan: string(),
  mood: string(),
  emosi: array(string()),
  cuaca: array(string()),
});
