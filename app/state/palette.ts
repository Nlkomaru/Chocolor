import type { ImagePalette } from "app/type/store";
import { atom } from "jotai";
import { safeJsonParse, safeLocalStorage } from "./utils";

// imageId ごとの atom インスタンスを共有するキャッシュ
const paletteAtomCache: Map<string, any> = new Map();

// 画像単位のパレットデータを管理するatom
export const imagePaletteAtom = (imageId: string) => {
    if (paletteAtomCache.has(imageId)) return paletteAtomCache.get(imageId)!;

    const storageKey = `chocolor-image-${imageId}`;

    // 初期値をlocalStorageから取得
    const getInitialValue = (): ImagePalette | null => {
        if (safeLocalStorage) {
            const stored = safeJsonParse(
                safeLocalStorage.getItem(storageKey),
                null as ImagePalette | null,
                storageKey,
            );
            return stored;
        }
        return null;
    };

    // baseAtomに初期値を設定
    const baseAtom = atom(getInitialValue());

    const derivedAtom = atom(
        // get: baseAtomから取得
        (get) => get(baseAtom),
        // set: baseAtomとlocalStorageの両方を更新
        (_get, set, newValue: ImagePalette | null) => {
            set(baseAtom, newValue);
            if (safeLocalStorage) {
                if (newValue) {
                    safeLocalStorage.setItem(
                        storageKey,
                        JSON.stringify(newValue),
                    );
                } else {
                    safeLocalStorage.removeItem(storageKey);
                }
            }
        },
    );

    paletteAtomCache.set(imageId, derivedAtom);
    return derivedAtom;
};
