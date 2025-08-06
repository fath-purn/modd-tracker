interface MoodNoteProps {
  note?: string;
  isLongNote: boolean;
  onShowDetail: () => void;
}

export function MoodNote({ note, isLongNote, onShowDetail }: MoodNoteProps) {
  if (!note) return null;

  return (
    <div>
      <p className="text-sm text-gray-600 mt-2 hidden md:block">
        {note}{" "}
        {isLongNote && (
          <button
            onClick={onShowDetail}
            className="text-blue-700 underline text-xs cursor-pointer"
          >
            Lihat Selengkapnya
          </button>
        )}
      </p>

      <p className="text-sm text-gray-600 mt-2 block md:hidden">
        {note}
      </p>
    </div>
  );
}