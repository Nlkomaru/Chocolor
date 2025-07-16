import type { ImageEntry } from "app/type/store";
import { atom } from "jotai";

// 現在のグループID
export const currentGroupAtom = atom<string | null>(null);

// ファイル選択
export const fileSelectionAtom = atom<ImageEntry[]>([]);
