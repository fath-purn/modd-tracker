"use client";
import { useState, useRef, useEffect } from "react";
import { useMoodStore } from "@/lib/action";
import { MoodProps } from "@/types/mood";
import { MoodIconDisplay } from "@/components/list/mood-icon-display";
import { MoodHeader } from "@/components/list/mood-header";
import { MoodTags } from "@/components/list/mood-tags";
import { MoodNote } from "@/components/list/mood-note";
import { MoodMenu } from "@/components/list/mood-menu";

interface MoodCardProps {
  mood: MoodProps;
  onEdit?: (id: string) => void;
  onShowDetail?: (mood: MoodProps) => void;
  detail: boolean;
}

export function MoodCard({
  mood,
  onEdit,
  onShowDetail,
  detail = false,
}: MoodCardProps) {
  const deleteMood = useMoodStore((state) => state.deleteMood);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLongNote = mood.catatan && mood.catatan.length > 100;
  const shortNote = isLongNote
    ? mood.catatan && mood.catatan.slice(0, 100) + "..."
    : mood.catatan;

  return (
    <div className="relative pb-4">
      <div className="flex flex-row items-start gap-3">
        <MoodIconDisplay mood={mood.mood} />

        <div className="flex-1">
          <MoodHeader mood={mood.mood} time={mood.jam} />
          <MoodTags cuaca={mood.cuaca} emosi={mood.emosi} />
          {detail ? (
            <p className="text-sm text-gray-600 mt-2">{mood.catatan}</p>
          ) : (
            <MoodNote
              note={mood.catatan}
              isLongNote={!!(shortNote && shortNote.length > 100)}
              onShowDetail={() => onShowDetail?.(mood)}
            />
          )}
        </div>
      </div>

      {!detail && (
        <MoodMenu
          isOpen={openMenuId === mood.id}
          onToggle={() =>
            setOpenMenuId(openMenuId === mood.id ? null : mood.id)
          }
          onEdit={() => {
            onEdit?.(mood.id);
            setOpenMenuId(null);
          }}
          onDelete={() => {
            deleteMood(mood.id);
            setOpenMenuId(null);
          }}
          ref={menuRef}
        />
      )}
    </div>
  );
}
