import { atom } from "jotai";

export const safeLocalStorage =
    typeof window !== "undefined" ? window.localStorage : null;

export const safeJsonParse = <T>(
    jsonString: string | null,
    defaultValue: T,
    _storageKey?: string,
): T => {
    if (safeLocalStorage && jsonString) {
        return JSON.parse(jsonString) as T;
    }
    return defaultValue;
};

// LocalStorage付きのatomを作成するためのヘルパー関数
export const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
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
