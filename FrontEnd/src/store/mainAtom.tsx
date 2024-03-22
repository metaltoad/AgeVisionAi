import { atom } from "jotai";

const imageAtom = atom<string>("");
const isLoadingResultsAtom = atom<boolean>(false);
const ageAtom = atom<number | undefined>(undefined);
const emotionAtom = atom<string>("");

export { imageAtom, isLoadingResultsAtom, ageAtom, emotionAtom };
