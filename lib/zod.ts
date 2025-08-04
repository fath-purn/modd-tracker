import { object, string, array } from "zod";

export const moodSchema = object({
  catatan: string(),
  mood: string(),
  // mood: array(string()).nonempty(),
});
