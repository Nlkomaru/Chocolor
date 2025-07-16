import type { Setting } from "../type/setting";
import { atomWithLocalStorage } from "./utils";

// 設定のデフォルト値
const defaultSetting: Setting = {
    colorSpace: "RGBA",
    paletteSize: 3,
};

// 設定を永続化するatom
export const settingAtom = atomWithLocalStorage<Setting>(
    "chocolor-setting",
    defaultSetting,
);
