import { useRef } from "react";
import MoodEditForm from "@/components/edit-mood";

interface EditMoodModalProps {
  editingId: string | null;
  onClose: () => void;
}

export function EditMoodModal({ editingId, onClose }: EditMoodModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!editingId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md w-full max-w-[90%] md:max-w-lg relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">Edit Mood</h3>
        <div className="overflow-y-auto relative max-h-[80vh] mb-3">
          <MoodEditForm
            id={editingId}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}