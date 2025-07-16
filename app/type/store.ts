// 画像エントリー
export interface ImageEntry {
    id: string; // 画像のID
    url: string; // 画像のURL
    path: string; // 画像のパス
}

// 画像単位のパレットデータ
export interface ImagePalette {
    id: string; // 画像のID (UUIDv7) ex: 1234567890-1234-1234-1234-123456789012
    name: string; // 画像の名前 最初はファイル名 ex: 1234567890.png
    imagePath: string; // 画像のパス ex: /images/1234567890.png
    createdAt: string; // 作成日時 ex: 2025-01-01T00:00:00.000Z
    updatedAt: string; // 更新日時 ex: 2025-01-01T00:00:00.000Z
    palette: {
        before: string; // パレットの色 ex: rgba(60, 25, 25, 0.5)
        after: string; // パレットの色 ex: rgba(148, 129, 129, 0.57)
    }[];
}
