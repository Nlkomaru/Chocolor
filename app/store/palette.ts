import type { StoreData } from "app/type/store";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

// LocalStorage付きのatomを作成するためのヘルパー関数
const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
    const getInitialValue = () => {
        // サーバーサイドレンダリング対応のチェック
        if (typeof window === "undefined") return initialValue;

        const item = localStorage.getItem(key);
        if (item !== null) {
            try {
                return JSON.parse(item);
            } catch (error) {
                console.error(
                    `Failed to parse localStorage item "${key}":`,
                    error,
                );
                return initialValue;
            }
        }
        return initialValue;
    };

    const baseAtom = atom(getInitialValue());
    const derivedAtom = atom(
        (get) => get(baseAtom),
        (get, set, update: T | ((prev: T) => T)) => {
            const prevValue = get(baseAtom);
            const nextValue =
                typeof update === "function"
                    ? (update as (prev: T) => T)(prevValue)
                    : update;

            set(baseAtom, nextValue);

            // LocalStorageに保存
            if (typeof window !== "undefined") {
                localStorage.setItem(key, JSON.stringify(nextValue));
            }
        },
    );

    return derivedAtom;
};

// カラーパレット生成状態を管理するatom（画像ごとに独立）
export const paletteGenerationAtom = atom<Record<string, boolean>>({});

// デフォルトのStoreDataを取得するヘルパー関数
const getDefaultStoreData = (id: string): StoreData => ({
    id,
    name: "",
    createdAt: "",
    updatedAt: "",
    favoriteColor: [],
    pictureIdArray: [],
    pictureData: [],
});

// グループデータを管理するatomFamily (group-{id}形式)
export const groupDataAtom = atomFamily((id: string) =>
    atomWithLocalStorage<StoreData>(`group-${id}`, getDefaultStoreData(id)),
);

// ピクチャーデータを管理するatomFamily (picture-{id}形式)
export const pictureDataAtom = atomFamily((id: string) =>
    atomWithLocalStorage<StoreData>(`picture-${id}`, getDefaultStoreData(id)),
);

// 全てのピクチャーデータをリストとして取得するヘルパーatom
export const allPictureDataListAtom = atom((_get) => {
    if (typeof window === "undefined") return [];

    const pictures: StoreData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("picture-")) {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    pictures.push(JSON.parse(data));
                }
            } catch (error) {
                console.error(
                    `Failed to parse picture data for key: ${key}`,
                    error,
                );
            }
        }
    }
    return pictures;
});

// 全てのグループデータをリストとして取得するヘルパーatom
export const allGroupDataListAtom = atom((_get) => {
    if (typeof window === "undefined") return [];

    const groups: StoreData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("group-")) {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    groups.push(JSON.parse(data));
                }
            } catch (error) {
                console.error(
                    `Failed to parse group data for key: ${key}`,
                    error,
                );
            }
        }
    }
    return groups;
});

// 特定のピクチャーデータを削除するヘルパー関数
export const deletePictureDataAtom = atom(null, (_get, _set, id: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(`picture-${id}`);
    }
});

// 特定のグループデータを削除するヘルパー関数
export const deleteGroupDataAtom = atom(null, (_get, _set, id: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(`group-${id}`);
    }
});

// 全てのパレットデータをクリアするヘルパー関数
export const clearAllPictureDataAtom = atom(null, (_get, _set) => {
    if (typeof window !== "undefined") {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith("picture-") || key?.startsWith("group-")) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
});

// グループにピクチャーIDを追加するヘルパー関数
export const addPictureToGroupAtom = atom(
    null,
    (
        get,
        set,
        { groupId, pictureId }: { groupId: string; pictureId: string },
    ) => {
        const groupAtom = groupDataAtom(groupId);
        const currentGroup = get(groupAtom);

        // pictureIdArrayに既に存在しない場合のみ追加
        if (!currentGroup.pictureIdArray.includes(pictureId)) {
            set(groupAtom, {
                ...currentGroup,
                pictureIdArray: [...currentGroup.pictureIdArray, pictureId],
                updatedAt: new Date().toISOString(),
            });
        }
    },
);

// グループからピクチャーIDを削除するヘルパー関数
export const removePictureFromGroupAtom = atom(
    null,
    (
        get,
        set,
        { groupId, pictureId }: { groupId: string; pictureId: string },
    ) => {
        const groupAtom = groupDataAtom(groupId);
        const currentGroup = get(groupAtom);

        set(groupAtom, {
            ...currentGroup,
            pictureIdArray: currentGroup.pictureIdArray.filter(
                (id: string) => id !== pictureId,
            ),
            updatedAt: new Date().toISOString(),
        });
    },
);

// 特定のグループに属するピクチャーデータを取得するヘルパーatom
export const getPicturesInGroupAtom = atomFamily((groupId: string) =>
    atom((get) => {
        const group = get(groupDataAtom(groupId));
        return group.pictureIdArray
            .map((pictureId: string) => {
                try {
                    return get(pictureDataAtom(pictureId));
                } catch (error) {
                    console.error(
                        `Failed to get picture data for ID: ${pictureId}`,
                        error,
                    );
                    return null;
                }
            })
            .filter(Boolean) as StoreData[];
    }),
);
