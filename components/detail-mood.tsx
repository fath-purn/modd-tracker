import { MoodProps } from "@/types/mood";
import { getTanggalLabel, formatTanggalIndo, getMoodLabel } from "@/lib/utils";
import { MoodIcon, EmosiIcon, CuacaIcon } from "./mood-icons";
import clsx from "clsx";
import { emosiData, cuacaData } from "@/app/data";

export default function DetailMood({
  detailMood,
  closeModal,
}: {
  detailMood: MoodProps;
  closeModal?: () => void
}) {
  return (
    <>
      <div className="flex justify-between items-start bg-[#15b790] px-4 py-2 rounded-t-lg text-gray-100">
        <div className="flex justify-between items-start ">
          <span className="border-4 w-5 h-5 rounded-full border-gray-100 mr-3"></span>
          <p className="text-sm">
            {getTanggalLabel(detailMood.tanggal)}{" "}
            {formatTanggalIndo(detailMood.tanggal)}
          </p>
        </div>

        <button
          onClick={() => closeModal?.()}
          className="text-gray-200 hover:text-white absolute right-2 top-0 p-2 cursor-pointer"
        >
          ✕
        </button>
      </div>
      <div className="flex items-end px-6 mt-3">
        <span
          className={clsx("text-2xl mr-2 font-bold flex items-end", {
            "text-[#44c5a6]": detailMood.mood === "1",
            "text-[#a4d756]": detailMood.mood === "2",
            "text-[#71b5dc]": detailMood.mood === "3",
            "text-[#f9a44a]": detailMood.mood === "4",
            "text-[#f5586b]": detailMood.mood === "5",
          })}
        >
          <MoodIcon mood={detailMood.mood} className={"size-10 mr-3"} />{" "}
          {getMoodLabel(detailMood.mood)}
        </span>{" "}
        <span className="text-gray-700 text-sm mb-1">{detailMood.jam}</span>
      </div>

      {/* Menampilkan cuaca */}
      <div className="flex flex-wrap items-center mt-2 px-6">
        {detailMood.cuaca?.map((id: string) => {
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
        {detailMood.emosi?.map((id: string) => {
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

      {/* Catatan */}
      <p className="text-sm text-gray-600 mt-4 px-6">
        <strong>Catatan:</strong> {detailMood.catatan}
      </p>
    </>
  );
}
