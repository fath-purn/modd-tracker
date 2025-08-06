import clsx from "clsx";
import { MoodIcon } from "@/components/mood-icons";
import { moodTextColors } from "@/app/data";

interface MoodIconDisplayProps {
  mood: string;
}

export function MoodIconDisplay({ mood }: MoodIconDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={clsx(
          "text-2xl font-bold flex items-center gap-2",
          moodTextColors[mood]
        )}
      >
        <MoodIcon mood={mood} className="size-8" />
      </div>
    </div>
  );
}
