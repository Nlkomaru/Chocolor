// 画像エントリー
export interface GroupInfo {
    id: string;
    images: string[];
}

// 画像単位のパレットデータ
export interface ImagePalette {
    id: string; // 画像のID (UUIDv7) ex: 1234567890-1234-1234-1234-123456789012
    name: string; // 画像の名前 最初はファイル名 ex: 1234567890.png
    url: string; // 画像のURL ex: https://example.com/images/1234567890.png | blob:https://example.com/1234567890
    filePath: string; // 画像のパス ex: /images/1234567890.png
    createdAt: string; // 作成日時 ex: 2025-01-01T00:00:00.000Z
    updatedAt: string; // 更新日時 ex: 2025-01-01T00:00:00.000Z
    paletteSize: number | null; // パレットのサイズ ex: 4 nullの場合は、setting.paletteSizeの値を使用する
    palette: {
        before: string; // パレットの色 ex: rgba(60, 25, 25, 0.5)
        after: string; // パレットの色 ex: rgba(148, 129, 129, 0.57)
    }[];
}

export interface ImagePaletteGroup {
    id: string; // グループのID (UUIDv7) ex: 1234567890-1234-1234-1234-123456789012
    name: string; // グループの名前 ex: グループ1
    createdAt: string; // 作成日時 ex: 2025-01-01T00:00:00.000Z
    updatedAt: string; // 更新日時 ex: 2025-01-01T00:00:00.000Z
    palettes: string[]; // パレットのIDの配列 ex: ["1234567890-1234-1234-1234-123456789012", "1234567890-1234-1234-1234-123456789012"]
}
