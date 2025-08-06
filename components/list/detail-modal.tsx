import { useRef } from "react";
import { MoodProps } from "@/types/mood";
import DetailMood from "@/components/detail-mood";

interface DetailMoodModalProps {
  mood: MoodProps | null;
  onClose: () => void;
}

export function DetailMoodModal({ mood, onClose }: DetailMoodModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!mood) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 rounded-lg w-full max-w-[90%] md:max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <DetailMood
          detailMood={mood}
          closeModal={onClose}
        />
      </div>
    </div>
  );
}