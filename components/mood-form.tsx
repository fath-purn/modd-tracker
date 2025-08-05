"use client";
import { useState, useActionState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMoodStore } from "@/lib/action";
import clsx from "clsx";
import { moodData } from "@/app/data";
import MoodIcon from "./mood-icons";

export default function MoodForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const saveRoom = useMoodStore((state) => state.saveRoom);

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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Mood
          </label>
          <div className="grid grid-cols-5 justify-between md:w-[50%] md:mx-auto">
            {moodData.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <input
                  type="radio"
                  name="mood"
                  id={`mood-${item.id}`}
                  value={item.id}
                  className="sr-only peer"
                />

                <label
                  htmlFor={`mood-${item.id}`}
                  className={clsx(
                    "cursor-pointer flex flex-col items-center justify-center gap-1 border rounded-lg px-2 py-1 transition peer-checked:ring-2 peer-checked:ring-offset-2 ",
                    {
                      "text-[#44c5a6] peer-checked:ring-[#44c5a6]":
                        item.id === 1,
                      "text-[#a4d756] peer-checked:ring-[#a4d756]":
                        item.id === 2,
                      "text-[#71b5dc] peer-checked:ring-[#71b5dc]":
                        item.id === 3,
                      "text-[#f9a44a] peer-checked:ring-[#f9a44a]":
                        item.id === 4,
                      "text-[#f5586b] peer-checked:ring-[#f5586b]":
                        item.id === 5,
                    }
                  )}
                >
                  <MoodIcon mood={item.id} className="size-10 md:text-3xl" />
                  <span className="capitalize text-sm w-[80%] text-center">
                    {item.name}
                  </span>
                </label>
              </div>
            ))}
            {state &&
              typeof state === "object" &&
              Array.isArray(state.mood) &&
              state.mood.map((msg, idx) => (
                <span key={"mood" + idx} className="text-sm text-red-500 mx-2 contents">
                  Pilih mood
                </span>
              ))}
          </div>
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
