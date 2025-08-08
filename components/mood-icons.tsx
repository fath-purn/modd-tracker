"use client";

import {
  MdSentimentSatisfiedAlt,
  MdSentimentNeutral,
  MdSentimentDissatisfied,
  MdSentimentVeryDissatisfied,
  MdEmojiEmotions,
  MdBatteryAlert,
  MdHelpOutline,
  MdOutlineSentimentDissatisfied,
  MdSentimentSatisfied,
  MdSentimentVerySatisfied,
} from "react-icons/md";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnowflakeCold,
  WiHot,
  WiThunderstorm,
  WiStrongWind,
} from "react-icons/wi";
import { FaBolt, FaPrayingHands, FaSadTear } from "react-icons/fa";
import { BiBrain } from "react-icons/bi";
import { LuCoffee } from "react-icons/lu";

export function EmosiIcon({
  emosi,
  className = "",
}: {
  emosi: string | number;
  className?: string;
}) {
  const emosiStr = String(emosi);

  switch (emosiStr) {
    case "1":
      return <MdSentimentSatisfiedAlt className={className} />; // senang
    case "2":
      return <FaBolt className={className} />; // bersemangat
    case "3":
      return <FaPrayingHands className={className} />; // bersyukur
    case "4":
      return <LuCoffee className={className} />; // santai
    case "5":
      return <MdEmojiEmotions className={className} />; // puas
    case "6":
      return <MdBatteryAlert className={className} />; // lelah
    case "7":
      return <MdHelpOutline className={className} />; // bingung
    case "8":
      return <MdSentimentNeutral className={className} />; // bosan
    case "9":
      return <MdOutlineSentimentDissatisfied className={className} />; // cemas
    case "10":
      return <MdSentimentVeryDissatisfied className={className} />; // marah
    case "11":
      return <FaSadTear className={className} />; // badmood
    case "12":
      return <BiBrain className={className} />; // stres
    case "13":
      return <MdSentimentDissatisfied className={className} />; // sedih
    default:
      return null;
  }
}

export function MoodIcon({
  mood,
  className,
}: {
  mood: string | number;
  className?: string;
}) {
  const moodStr = String(mood); // normalize jadi string

  switch (moodStr) {
    case "5":
      return <MdSentimentVeryDissatisfied className={className} />; // keren
    case "4":
      return <MdSentimentDissatisfied className={className} />; // baik
    case "3":
      return <MdSentimentNeutral className={className} />; // biasa
    case "2":
      return <MdSentimentSatisfied className={className} />; // buruk
    case "1":
      return <MdSentimentVerySatisfied className={className} />; // parah
    default:
      return null;
  }
}

export function CuacaIcon({
  cuaca,
  className,
}: {
  cuaca: string | number;
  className?: string;
}) {
  const cuacaStr = String(cuaca);

  switch (cuacaStr) {
    case "1":
      return <WiDaySunny className={className} />; // Cerah
    case "2":
      return <WiCloudy className={className} />; // Berawan
    case "3":
      return <WiRain className={className} />; // Hujan
    case "4":
      return <WiSnowflakeCold className={className} />; // Dingin
    case "5":
      return <WiHot className={className} />; // Panas
    case "6":
      return <WiThunderstorm className={className} />; // Badai
    case "7":
      return <WiStrongWind className={className} />; // Berangin
    default:
      return null;
  }
}
