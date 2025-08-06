"use client";
import { useEffect, useState, useActionState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMoodStore } from "@/lib/action";
import clsx from "clsx";
import { moodData, emosiData, cuacaData } from "@/app/data";
import { MoodIcon, CuacaIcon, EmosiIcon } from "@/components/mood-icons";

export default function MoodEditForm({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const moods = useMoodStore((state) => state.moods);
  const mood = moods.find((item) => item.id === id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  useEffect(() => {
    if (mood?.tanggal && mood?.jam) {
      const isoString = `${mood.tanggal}T${mood.jam.replace(".", ":")}`;
      const parsedDate = new Date(isoString);

      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setSelectedTime(parsedDate);
      } else {
        console.warn("Invalid date:", isoString);
      }
    }
  }, [mood]);

  const updateMood = useMoodStore((state) => state.updateMood);

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
      const result = updateMood(id, jam, tanggal, formData);
      if (!result.error && onSuccess) {
        onSuccess();
      }
      return result.error || null;
    },
    null
  );

  return (
    <div>
      <form action={formAction}>
        <div className="grid md:grid-cols-2 md:gap-4 mb-4">
          <div className="mb-4 md:mb-0">
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
          <div className="grid grid-cols-5 gap-3">
            {moodData.map((item) => (
              <div key={item.id} className="flex flex-col items-center mb-4">
                <input
                  type="radio"
                  name="mood"
                  id={`mood-${item.id}`}
                  value={item.id}
                  defaultChecked={String(mood?.mood) === String(item.id)}
                  className="sr-only peer/mood"
                />

                <label
                  htmlFor={`mood-${item.id}`}
                  className={clsx(
                    "cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full hadow bg-white peer-checked/mood:text-white",
                    {
                      "text-[#44c5a6] peer-checked/mood:bg-[#44c5a6]":
                        item.id === 1,
                      "text-[#a4d756] peer-checked/mood:bg-[#a4d756]":
                        item.id === 2,
                      "text-[#71b5dc] peer-checked/mood:bg-[#71b5dc]":
                        item.id === 3,
                      "text-[#f9a44a] peer-checked/mood:bg-[#f9a44a]":
                        item.id === 4,
                      "text-[#f5586b] peer-checked/mood:bg-[#f5586b]":
                        item.id === 5,
                    }
                  )}
                >
                  <MoodIcon mood={item.id} className="size-8" />
                </label>
                <label htmlFor={`cuaca-${item.id}`}>
                  <span
                    className={clsx(
                      "capitalize text-sm w-[80%] text-center text-[#44c5a6]",
                      {
                        "text-[#44c5a6]": item.id === 1,
                        "text-[#a4d756]": item.id === 2,
                        "text-[#71b5dc]": item.id === 3,
                        "text-[#f9a44a]": item.id === 4,
                        "text-[#f5586b]": item.id === 5,
                      }
                    )}
                  >
                    {item.name}
                  </span>
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
          <div className="grid grid-cols-5 gap-3">
            {cuacaData.map((item) => (
              <div key={item.id} className="flex flex-col items-center mb-4">
                <input
                  type="checkbox"
                  name="cuaca"
                  id={`cuaca-${item.id}`}
                  value={item.id}
                  defaultChecked={mood?.cuaca?.includes(String(item.id))}
                  className="sr-only peer/cuaca"
                />

                <label
                  htmlFor={`cuaca-${item.id}`}
                  className="cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full hadow bg-white text-[#44c5a6] peer-checked/cuaca:bg-[#44c5a6] peer-checked/cuaca:text-white"
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
          <div className="grid grid-cols-5 gap-3">
            {emosiData.map((item) => (
              <div key={item.id} className="flex flex-col items-center mb-4">
                <input
                  type="checkbox"
                  name="emosi"
                  id={`emosi-${item.id}`}
                  value={item.id}
                  defaultChecked={mood?.emosi?.includes(String(item.id))}
                  className="sr-only peer/emosi"
                />

                <label
                  htmlFor={`emosi-${item.id}`}
                  className="cursor-pointer flex justify-center p-3 md:text-3xl border border-gray-300 transition duration-300 rounded-full hadow bg-white text-[#44c5a6] peer-checked/emosi:bg-[#44c5a6] peer-checked/emosi:text-white"
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
            defaultValue={mood?.catatan}
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
