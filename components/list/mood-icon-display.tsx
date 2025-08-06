import clsx from "clsx";
import { MoodIcon } from "@/components/mood-icons";

interface MoodIconDisplayProps {
  mood: string;
}

export function MoodIconDisplay({ mood }: MoodIconDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={clsx(
          "text-2xl font-bold flex items-center gap-2",
          {
            "text-[#44c5a6]": mood === "1",
            "text-[#a4d756]": mood === "2",
            "text-[#71b5dc]": mood === "3",
            "text-[#f9a44a]": mood === "4",
            "text-[#f5586b]": mood === "5",
          }
        )}
      >
        <MoodIcon mood={mood} className="size-8" />
      </div>
    </div>
  );
}