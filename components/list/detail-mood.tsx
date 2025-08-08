import { MoodProps } from "@/types/mood";
import { getTanggalLabel, formatTanggalIndo } from "@/lib/utils";
import { MoodCard } from "@/components/list/mood-card";

export default function DetailMood({
  detailMood,
  closeModal,
}: {
  detailMood: MoodProps;
  closeModal?: () => void;
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
      <div className="p-4 space-y-4">
        <MoodCard mood={detailMood} detail={true} />
      </div>
    </>
  );
}
