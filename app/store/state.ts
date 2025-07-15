import { atom } from "jotai";
import type { FileSelectionData } from "app/type/store";

// ファイル選択のデフォルト値
const defaultFileSelection: FileSelectionData = {
    selectedCount: 0,
    images: [],
};

// ファイル選択に関するatom（セッション中のみ、永続化しない）
export const fileSelectionAtom = atom<FileSelectionData>(defaultFileSelection);
