"use client";

import {
  MdSentimentVeryDissatisfied,
  MdSentimentDissatisfied,
  MdSentimentNeutral,
  MdSentimentSatisfied,
  MdSentimentVerySatisfied,
} from "react-icons/md";

export default function MoodIcon({
  mood,
  className,
}: {
  mood: string | number;
  className?: string;
}) {
  const moodStr = String(mood); // normalize jadi string

  switch (moodStr) {
    case "5":
      return <MdSentimentVeryDissatisfied className={className} />;
    case "4":
      return <MdSentimentDissatisfied className={className} />;
    case "3":
      return <MdSentimentNeutral className={className} />;
    case "2":
      return <MdSentimentSatisfied className={className} />;
    case "1":
      return <MdSentimentVerySatisfied className={className} />;
    default:
      return null;
  }
}
