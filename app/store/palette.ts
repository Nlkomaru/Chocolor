import type {
    ImagePalette,
    Palette,
    PaletteGroup,
    PictureData,
} from "app/type/store";
import { atom } from "jotai";

// localStorageの安全なアクセス
const safeLocalStorage =
    typeof window !== "undefined" ? window.localStorage : null;

// デフォルトパレットデータを生成する関数（固定日時を使用）
const createDefaultPalette = (groupId: string): Palette => {
    const defaultDate = "1970-01-01T00:00:00.000Z";
    return {
        id: groupId,
        name: `Palette ${groupId}`,
        createdAt: defaultDate,
        updatedAt: defaultDate,
        favoriteColor: [],
        pictureData: [],
    };
};

// 安全なJSON.parse関数（壊れたデータは自動削除）
const safeJsonParse = <T>(
    jsonString: string,
    defaultValue: T,
    storageKey?: string,
): T => {
    // 空文字列、空白文字列、"undefined"文字列の場合は静かにデフォルト値を返す
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

const groupAtom = atom(
    safeLocalStorage
        ? Object.keys(safeLocalStorage).filter((key) =>
              key.startsWith("chocolor-palette-"),
          )
        : [],
);

const groupAtomPersist = atom(
    (get) => get(groupAtom),
    (_get, set, update: string[]) => {
        if (safeLocalStorage) {
            update.forEach((groupId) => {
                safeLocalStorage.setItem(
                    `chocolor-palette-${groupId}`,
                    JSON.stringify(createDefaultPalette(groupId)),
                );
            });
        }
        set(groupAtom, update);
    },
);

// atomのキャッシュ
const paletteAtomCache = new Map<string, ReturnType<typeof atom<Palette>>>();

// atomWithLocalStorage風の実装
const paletteAtom = (groupId: string) => {
    // キャッシュから取得
    if (paletteAtomCache.has(groupId)) {
        return paletteAtomCache.get(groupId)!;
    }
    const storageKey = `chocolor-palette-${groupId}`;

    // 初期値をlocalStorageから取得
    const getInitialValue = () => {
        if (safeLocalStorage) {
            return safeJsonParse(
                safeLocalStorage.getItem(storageKey) || "",
                createDefaultPalette(groupId),
                storageKey,
            );
        }
        return createDefaultPalette(groupId);
    };

    // baseAtomに初期値を設定
    const baseAtom = atom(getInitialValue());

    const derivedAtom = atom(
        // get: baseAtomから取得
        (get) => get(baseAtom),
        // set: baseAtomとlocalStorageの両方を更新
        (_get, set, newValue: Palette) => {
            set(baseAtom, newValue);
            if (safeLocalStorage) {
                safeLocalStorage.setItem(storageKey, JSON.stringify(newValue));
            }
        },
    );

    // キャッシュに保存
    paletteAtomCache.set(groupId, derivedAtom);
    return derivedAtom;
};

// paletteAtomPersistを簡素化（paletteAtomが永続化機能を含むため）
const paletteAtomPersist = (groupId: string) => paletteAtom(groupId);

const imageAtom = (groupId: string, imageId: string) =>
    atom((get) => {
        const paletteData = get(paletteAtom(groupId));
        return (
            paletteData.pictureData?.find(
                (picture: PictureData) => picture.id === imageId,
            ) || undefined
        );
    });

const imageAtomPersist = (groupId: string, imageId: string) =>
    atom(
        (get) => get(imageAtom(groupId, imageId)),
        (get, set, update: PictureData) => {
            const paletteAtomInstance = paletteAtom(groupId);
            const currentPalette = get(paletteAtomInstance);
            const updatedPalette = {
                ...currentPalette,
                pictureData: [...(currentPalette.pictureData || []), update],
                updatedAt: new Date().toISOString(),
            };
            set(paletteAtomInstance, updatedPalette);
        },
    );

// === 新しい画像単位のパレット管理 ===

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
    imagePaletteAtomCache.set(imageId, derivedAtom);
    return derivedAtom;
};

// グループ設定を管理するatom
const groupSettingsAtomCache = new Map<
    string,
    ReturnType<typeof atom<PaletteGroup>>
>();

export const groupSettingsAtom = (groupId: string) => {
    if (groupSettingsAtomCache.has(groupId)) {
        return groupSettingsAtomCache.get(groupId)!;
    }

    const storageKey = `chocolor-group-${groupId}`;

    const createDefaultGroup = (groupId: string): PaletteGroup => {
        const defaultDate = "1970-01-01T00:00:00.000Z";
        return {
            id: groupId,
            name: `Group ${groupId}`,
            createdAt: defaultDate,
            updatedAt: defaultDate,
            favoriteColor: [],
            imageIds: [],
        };
    };

    const getInitialValue = () => {
        if (safeLocalStorage) {
            return safeJsonParse(
                safeLocalStorage.getItem(storageKey) || "",
                createDefaultGroup(groupId),
                storageKey,
            );
        }
        return createDefaultGroup(groupId);
    };

    const baseAtom = atom(getInitialValue());

    const derivedAtom = atom(
        (get) => get(baseAtom),
        (_get, set, newValue: PaletteGroup) => {
            set(baseAtom, newValue);
            if (safeLocalStorage) {
                safeLocalStorage.setItem(storageKey, JSON.stringify(newValue));
            }
        },
    );

    groupSettingsAtomCache.set(groupId, derivedAtom);
    return derivedAtom;
};

// 開発用：localStorageのパレットデータをクリアする関数
export const clearPaletteStorage = () => {
    if (safeLocalStorage) {
        const paletteKeys = Object.keys(safeLocalStorage).filter(
            (key) =>
                key.startsWith("chocolor-palette-") ||
                key.startsWith("chocolor-image-") ||
                key.startsWith("chocolor-group-"),
        );
        paletteKeys.forEach((key) => safeLocalStorage.removeItem(key));
        // キャッシュもクリア
        paletteAtomCache.clear();
        imagePaletteAtomCache.clear();
        groupSettingsAtomCache.clear();
        return paletteKeys.length;
    }
    return 0;
};

export {
    groupAtom,
    groupAtomPersist,
    paletteAtom,
    paletteAtomPersist,
    imageAtom,
    imageAtomPersist,
};
