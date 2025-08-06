import clsx from "clsx";
import { EmosiIcon, CuacaIcon } from "@/components/mood-icons";
import { emosiData, cuacaData } from "@/app/data";

interface FilterTagsProps {
  selectedEmosi: string[];
  selectedCuaca: string[];
  onEmosiToggle: (id: string) => void;
  onCuacaToggle: (id: string) => void;
}

export function FilterTags({
  selectedEmosi,
  selectedCuaca,
  onEmosiToggle,
  onCuacaToggle,
}: FilterTagsProps) {
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        {emosiData.map((item) => (
          <button
            key={item.id}
            onClick={() => onEmosiToggle(String(item.id))}
            className={clsx(
              "flex items-center gap-1 px-3 py-1 rounded-full border text-sm transition",
              selectedEmosi.includes(String(item.id))
                ? "bg-[#15b790] text-white border-[#15b790]"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            )}
          >
            <EmosiIcon emosi={item.id} className="size-4" />
            <span>{item.name}</span>
          </button>
        ))}
        {cuacaData.map((item) => (
          <button
            key={item.id}
            onClick={() => onCuacaToggle(String(item.id))}
            className={clsx(
              "flex items-center gap-1 px-3 py-1 rounded-full border text-sm transition",
              selectedCuaca.includes(String(item.id))
                ? "bg-[#15b790] text-white border-[#15b790]"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            )}
          >
            <CuacaIcon cuaca={item.id} className="size-4" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}