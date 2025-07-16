import type { GroupInfo } from "app/type/store";
import { atom } from "jotai";
import { safeJsonParse, safeLocalStorage } from "./utils";

// WritableAtom の複雑な型付けを避けるため any にしているが、同一インスタンス保証が目的
const groupAtomCache: Map<string, any> = new Map();

// 現在のグループID（一度生成したら同セッション内では固定）
// Cloudflare Workers ではグローバルスコープでの乱数生成が禁止のため onMount で生成する
export const currentGroupAtom = (() => {
    const baseAtom = atom<string>("");
    (baseAtom as any).onMount = (set: (v: string) => void) => {
        // 実際にクライアント側で購読されたときに UUID を生成
        set(crypto.randomUUID());
    };
    return baseAtom;
})();

export const groupInfoAtom = (group: string) => {
    // 既に生成済みならキャッシュを返す
    if (groupAtomCache.has(group)) return groupAtomCache.get(group)!;

    const storageKey = `chocolor-group-${group}`;

    // 初期値をlocalStorageから取得
    const getInitialValue = (): GroupInfo | null => {
        if (safeLocalStorage) {
            const stored = safeJsonParse(
                safeLocalStorage.getItem(storageKey),
                null as GroupInfo | null,
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
        (_get, set, newValue: GroupInfo | null) => {
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

    // キャッシュに保持してから返す
    groupAtomCache.set(group, derivedAtom);
    return derivedAtom;
};
