import {Track} from "./player.types";
import lastNight from "../../audio/Loofy-LastNight.mp3";
import jamming from "../../audio/BobMarley-Jamming.mp3";
import iLostYou from "../../audio/Havana-ILostYou.mp3";
import afterHouse from "../../audio/TheWeeknd-AfterHours.mp3";

export const playlist: Track[] = [
  {title: "Loofy - Last Night", file: lastNight, howl: null},
  {title: "Bob Marley - Jamming", file: jamming, howl: null},
  {title: "Havana - I Lost You", file: iLostYou, howl: null},
  {title: "The Weeknd - After Hours", file: afterHouse, howl: null},
];

export enum Direction {
  NEXT = "next",
  PREV = "prev",
}
