import { atom } from "jotai";

const imageAtom = atom<string>("");
const isLoadingResultsAtom = atom<boolean>(false);

export { imageAtom, isLoadingResultsAtom };
