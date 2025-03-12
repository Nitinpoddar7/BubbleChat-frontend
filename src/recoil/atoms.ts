import { atom } from "recoil";
import { darkModeSelector } from "./selectors";

export const darkModeAtom = atom({
    key: 'darkModeAtom',
    default: darkModeSelector
})