import { getTanggalLabel, formatTanggalIndo } from "@/lib/utils";
import { MoodProps } from "@/types/mood";
import { MoodCard } from "@/components/list/mood-card";

interface MoodDayCardProps {
  date: string;
  moods: MoodProps[];
  onEdit: (id: string) => void;
  onShowDetail: (mood: MoodProps) => void;
}

export function MoodDayCard({
  date,
  moods,
  onEdit,
  onShowDetail,
}: MoodDayCardProps) {
  return (
    <div className="relative h-fit rounded-lg shadow transition hover:shadow-lg opacity-0 animate-[fadeSlideIn_0.5s_forwards] mb-1 bg-white">
      {/* Header Tanggal */}
      <div className="flex items-center bg-[#15b790] px-4 py-2 rounded-t-lg text-white">
        <span className="border-4 w-5 h-5 rounded-full border-white mr-3"></span>
        <p className="text-sm font-semibold">
          {getTanggalLabel(date)} {formatTanggalIndo(date)}
        </p>
      </div>

      {/* Mood Items */}
      <div className="p-4 space-y-4">
        {moods.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            onEdit={onEdit}
            onShowDetail={onShowDetail}
            detail={false}
          />
        ))}
      </div>
    </div>
  );
}
