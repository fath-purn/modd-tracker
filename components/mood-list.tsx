"use client";
import { useState } from "react";
import { useLoadMoods } from "@/app/data";
import { MoodProps } from "@/types/mood";
import { MoodDayCard } from "@/components/list/mood-day-card";
import { EditMoodModal } from "@/components/list/edit-mood-modal";
import { DetailMoodModal } from "@/components/list/detail-modal";
import { useMoodFiltering } from "@/lib/utils";

export default function MoodList() {
  useLoadMoods();

  const { moodsByDate } = useMoodFiltering();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailMood, setDetailMood] = useState<MoodProps | null>(null);

  return (
    <div className="md:px-8">
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(moodsByDate).map(([tanggal, moods]) => (
          <MoodDayCard
            key={tanggal}
            date={tanggal}
            moods={moods}
            onEdit={setEditingId}
            onShowDetail={setDetailMood}
          />
        ))}
      </div>

      <EditMoodModal editingId={editingId} onClose={() => setEditingId(null)} />

      <DetailMoodModal mood={detailMood} onClose={() => setDetailMood(null)} />
    </div>
  );
}
