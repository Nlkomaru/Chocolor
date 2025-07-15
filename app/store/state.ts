import type { FileSelectionData } from "app/type/store";
import { atom } from "jotai";

// ファイル選択のデフォルト値
const defaultFileSelection: FileSelectionData = {
    selectedCount: 0,
    images: [],
};

// ファイル選択に関するatom（セッション中のみ、永続化しない）
export const fileSelectionAtom = atom<FileSelectionData>(defaultFileSelection);

// 現在選択中のグループIDを管理するatom（セッション中のみ、永続化しない）
export const currentGroupAtom = atom<string>(crypto.randomUUID());
