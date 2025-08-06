import clsx from "clsx";
import { getMoodLabel } from "@/lib/utils";

interface MoodHeaderProps {
  mood: string;
  time: string;
}

export function MoodHeader({ mood, time }: MoodHeaderProps) {
  return (
    <div>
      <span
        className={clsx("text-2xl font-bold", {
          "text-[#44c5a6]": mood === "1",
          "text-[#a4d756]": mood === "2",
          "text-[#71b5dc]": mood === "3",
          "text-[#f9a44a]": mood === "4",
          "text-[#f5586b]": mood === "5",
        })}
      >
        {getMoodLabel(mood)}
      </span>
      <span className="text-gray-700 text-sm mt-2 ml-2">
        {time}
      </span>
    </div>
  );
}