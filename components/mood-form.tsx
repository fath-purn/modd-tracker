"use client";
import { useState, useActionState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMoodStore, useSearchFilterStore } from "@/lib/action";
import clsx from "clsx";
import { moodData, cuacaData, emosiData } from "@/app/data";
import { MoodIcon, CuacaIcon, EmosiIcon } from "@/components/mood-icons";
import { useSearchParams } from "next/navigation";

export default function MoodForm() {
  const searchParams = useSearchParams();
  const moodId = searchParams.get("moodId");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const saveRoom = useMoodStore((state) => state.saveRoom);
  const resetFilter = useSearchFilterStore((s)=> s.clearFilters)

  // save data
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const tanggal = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "";
      const jam = selectedTime
        ? selectedTime.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      const result = saveRoom(jam, tanggal, formData);
      return result.error || null;
    },
    null
  );

  return (
    <div className="transition opacity-0 animate-[fadeSlideIn_0.5s_forwards]">
      <form action={formAction}>
        <div className="grid md:grid-cols-2 md:gap-4 mb-4">
          <div className="mb-4 md:mb-0">
            {/* Tanggal */}
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tanggal
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date && selectedTime) {
                  const updated = new Date(date);
                  updated.setHours(selectedTime.getHours());
                  updated.setMinutes(selectedTime.getMinutes());
                  setSelectedDate(updated);
                } else {
                  setSelectedDate(date);
                }
              }}
              maxDate={new Date()}
              dateFormat="dd-MM-yyyy"
              className="py-2 px-2 rounded-md border border-gray-300 w-full"
              wrapperClassName="w-full"
            />
          </div>

          {/* Jam */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Jam
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(time: Date | null) => {
                if (time && selectedDate) {
                  const updated = new Date(selectedDate);
                  updated.setHours(time.getHours());
                  updated.setMinutes(time.getMinutes());
                  setSelectedDate(updated);
                  setSelectedTime(time);
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Jam"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              className="py-2 px-2 rounded-md border border-gray-300 w-full"
              wrapperClassName="w-full"
            />
          </div>
        </div>

        {/* Mood */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Mood
          </label>
          <div className="grid grid-cols-5 md:gap-3 md:w-[70%] mx-auto">
            {moodData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center mb-4 group"
              >
                <input
                  type="radio"
                  name="mood"
                  id={`mood-${item.id}`}
                  value={item.id}
                  className="sr-only peer"
                  defaultChecked={String(moodId) === String(item.id)}
                />

                {/* ICON */}
                <label
                  htmlFor={`mood-${item.id}`}
                  className={clsx(
                    "cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full shadow bg-white",
                    {
                      "text-[#44c5a6] hover:bg-[#44c5a6]/10 hover:text-[#44c5a6] peer-checked:bg-[#44c5a6] peer-checked:text-white":
                        item.id === 1,
                      "text-[#a4d756] hover:bg-[#a4d756]/10 hover:text-[#a4d756] peer-checked:bg-[#a4d756] peer-checked:text-white":
                        item.id === 2,
                      "text-[#71b5dc] hover:bg-[#71b5dc]/10 hover:text-[#71b5dc] peer-checked:bg-[#71b5dc] peer-checked:text-white":
                        item.id === 3,
                      "text-[#f9a44a] hover:bg-[#f9a44a]/10 hover:text-[#f9a44a] peer-checked:bg-[#f9a44a] peer-checked:text-white":
                        item.id === 4,
                      "text-[#f5586b] hover:bg-[#f5586b]/10 hover:text-[#f5586b] peer-checked:bg-[#f5586b] peer-checked:text-white":
                        item.id === 5,
                    }
                  )}
                >
                  <MoodIcon mood={item.id} className="size-8" />
                </label>

                {/* TEKS */}
                <label htmlFor={`mood-${item.id}`} className={clsx(
                      "capitalize text-sm w-[80%] text-center transition duration-200 text-gray-600 mt-1",
                      {
                        "group-hover:text-[#44c5a6] peer-checked:text-[#44c5a6]":
                          item.id === 1,
                        "group-hover:text-[#a4d756] peer-checked:text-[#a4d756]":
                          item.id === 2,
                        "group-hover:text-[#71b5dc] peer-checked:text-[#71b5dc]":
                          item.id === 3,
                        "group-hover:text-[#f9a44a] peer-checked:text-[#f9a44a]":
                          item.id === 4,
                        "group-hover:text-[#f5586b] peer-checked:text-[#f5586b]":
                          item.id === 5,
                      }
                    )}>
                    {item.name}
                </label>
              </div>
            ))}
            {state &&
              typeof state === "object" &&
              Array.isArray(state.mood) &&
              state.mood.map((msg, idx) => (
                <span key={"mood" + idx} className="text-sm text-red-500 mx-2">
                  {msg}
                </span>
              ))}
          </div>
        </div>

        {/* Cuaca */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Cuaca
          </label>
          <div className="grid grid-cols-4 justify-between md:grid-cols-7 md:gap-3 md:w-[70%] mx-auto">
            {cuacaData.map((item) => (
              <div key={item.id} className="flex flex-col items-center mb-4">
                <input
                  type="checkbox"
                  name="cuaca"
                  id={`cuaca-${item.id}`}
                  value={item.id}
                  className="sr-only peer"
                />

                <label
                  htmlFor={`cuaca-${item.id}`}
                  className="cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full hadow bg-white text-[#44c5a6] peer-checked:bg-[#44c5a6] peer-checked:text-white"
                >
                  <CuacaIcon cuaca={item.id} className="size-8" />
                </label>
                <label htmlFor={`cuaca-${item.id}`}>
                  <span className="capitalize text-sm w-[80%] text-center text-[#44c5a6]">
                    {item.name}
                  </span>
                </label>
              </div>
            ))}

            {/* Error */}
            {state &&
              typeof state === "object" &&
              Array.isArray(state.cuaca) &&
              state.cuaca.map((msg, idx) => (
                <span
                  key={"cuaca" + idx}
                  className="text-sm text-red-500 mx-2 contents"
                >
                  Pilih cuaca
                </span>
              ))}
          </div>
        </div>

        {/* Emosi */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Emosi
          </label>
          <div className="grid grid-cols-4 justify-between md:grid-cols-7 md:gap-3 md:w-[70%] mx-auto">
            {emosiData.map((item) => (
              <div key={item.id} className="flex flex-col items-center mb-4">
                <input
                  type="checkbox"
                  name="emosi"
                  id={`emosi-${item.id}`}
                  value={item.id}
                  className="sr-only peer"
                />

                <label
                  htmlFor={`emosi-${item.id}`}
                  className="cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full hadow bg-white text-[#44c5a6] peer-checked:bg-[#44c5a6] peer-checked:text-white"
                >
                  <EmosiIcon emosi={item.id} className="size-8" />
                </label>
                <label htmlFor={`emosi-${item.id}`}>
                  <span className="capitalize text-sm w-[80%] text-center text-[#44c5a6]">
                    {item.name}
                  </span>
                </label>
              </div>
            ))}

            {/* Error */}
            {state &&
              typeof state === "object" &&
              Array.isArray(state.cuaca) &&
              state.cuaca.map((msg, idx) => (
                <span
                  key={"cuaca" + idx}
                  className="text-sm text-red-500 mx-2 contents"
                >
                  Pilih cuaca
                </span>
              ))}
          </div>
        </div>

        {/* Catatan */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Catatan
          </label>
          <textarea
            name="catatan"
            placeholder="Catatan..."
            className="py-2 px-2 rounded-md border border-gray-300 w-full"
            rows={4}
          ></textarea>
          {state &&
            typeof state === "object" &&
            Array.isArray(state.catatan) &&
            state.catatan.map((msg, idx) => (
              <span key={"catatan" + idx} className="text-sm text-red-500 mx-2">
                {msg}
              </span>
            ))}
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className={clsx(
            "px-10 py-3 text-center w-full bg-[#15b790] rounded-sm cursor-pointer font-semibold text-gray-100 hover:bg-[#15b791d8]",
            {
              "opacity-50 cursor-progress": isPending,
            }
          )}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
