import clsx from "clsx";
import { getMoodLabel } from "@/lib/utils";
import { moodTextColors } from "@/app/data";

interface MoodHeaderProps {
  mood: string;
  time: string;
}

export function MoodHeader({ mood, time }: MoodHeaderProps) {
  return (
    <div>
      <span className={clsx("text-2xl font-bold", moodTextColors[mood])}>
        {getMoodLabel(mood)}
      </span>
      <span className="text-gray-700 text-sm mt-2 ml-2">{time}</span>
    </div>
  );
}
