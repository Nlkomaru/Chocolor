import type { ImagePalette } from "app/type/store";
import { atom } from "jotai";

// localStorageの安全なアクセス
const safeLocalStorage =
    typeof window !== "undefined" ? window.localStorage : null;

// 安全なJSON.parse関数（壊れたデータは自動削除）
const safeJsonParse = <T>(
    jsonString: string,
    defaultValue: T,
    storageKey?: string,
): T => {
    // 空文字列、空白文字列、"undefined"文字列、"null"文字列の場合は静かにデフォルト値を返す
    if (
        !jsonString ||
        jsonString.trim() === "" ||
        jsonString.trim() === "undefined" ||
        jsonString.trim() === "null"
    ) {
        // 無効なデータをクリア
        if (storageKey && safeLocalStorage && jsonString.trim() !== "") {
            safeLocalStorage.removeItem(storageKey);
        }
        return defaultValue;
    }

    try {
        return JSON.parse(jsonString) as T;
    } catch (error) {
        // 本当に壊れたデータの場合のみエラーログを出力
        console.warn(
            "Corrupted JSON data detected, clearing and using default value:",
            {
                storageKey,
                data: jsonString.substring(0, 100), // 最初の100文字だけ表示
                error: error instanceof Error ? error.message : error,
            },
        );
        // 壊れたデータをlocalStorageから削除
        if (storageKey && safeLocalStorage) {
            safeLocalStorage.removeItem(storageKey);
        }
        return defaultValue;
    }
};

// 画像単位のパレットatomのキャッシュ
const imagePaletteAtomCache = new Map<
    string,
    ReturnType<typeof atom<ImagePalette | null>>
>();

// 画像単位のパレットデータを管理するatom
export const imagePaletteAtom = (imageId: string) => {
    // キャッシュから取得
    if (imagePaletteAtomCache.has(imageId)) {
        return imagePaletteAtomCache.get(imageId)!;
    }

    const storageKey = `chocolor-image-${imageId}`;

    // 初期値をlocalStorageから取得
    const getInitialValue = (): ImagePalette | null => {
        if (safeLocalStorage) {
            const stored = safeJsonParse(
                safeLocalStorage.getItem(storageKey) || "",
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

    // キャッシュに保存
    imagePaletteAtomCache.set(imageId, baseAtom);
    return baseAtom;
};

// 開発用：localStorageのパレットデータをクリアする関数
export const clearPaletteStorage = () => {
    if (safeLocalStorage) {
        const paletteKeys = Object.keys(safeLocalStorage).filter((key) =>
            key.startsWith("chocolor-image-"),
        );
        paletteKeys.forEach((key) => safeLocalStorage.removeItem(key));
        // キャッシュもクリア
        imagePaletteAtomCache.clear();
        return paletteKeys.length;
    }
    return 0;
};
