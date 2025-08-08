import { EmosiIcon, CuacaIcon } from "@/components/mood-icons";
import { emosiData, cuacaData } from "@/app/data";

interface MoodTagsProps {
  cuaca?: string[];
  emosi?: string[];
}

export function MoodTags({ cuaca, emosi }: MoodTagsProps) {
  return (
    <div className="flex flex-wrap items-center mt-2">
      {/* Cuaca tag */}
      {cuaca?.map((id: string) => {
        const label = cuacaData.find((e) => String(e.id) === id);
        return (
          <div
            key={id}
            className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-full bg-gray-50 text-sm text-gray-700 mr-2 mb-2"
          >
            <CuacaIcon cuaca={id} className="size-4" />
            <span>{label?.name}</span>
          </div>
        );
      })}

      {/* Emosi tag */}
      {emosi?.map((id: string) => {
        const label = emosiData.find((e) => String(e.id) === id);
        return (
          <div
            key={id}
            className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-full bg-gray-50 text-sm text-gray-700 mr-2 mb-2"
          >
            <EmosiIcon emosi={id} className="size-4" />
            <span>{label?.name}</span>
          </div>
        );
      })}
    </div>
  );
}
