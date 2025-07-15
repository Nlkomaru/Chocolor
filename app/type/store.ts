// 画像単位のパレットデータ
export interface ImagePalette {
    id: string; // 画像ID
    imagePath: string;
    bin: number;
    createdAt: string;
    updatedAt: string;
    palette: {
        before: string;
        after: string;
    }[];
}

// グループ全体の設定（複数の画像をまとめるもの）
export interface PaletteGroup {
    id: string; // グループID
    name: string;
    createdAt: string;
    updatedAt: string;
    favoriteColor: string[];
    imageIds: string[]; // 所属する画像IDのリスト
}

// 下位互換用（将来的に削除予定）
export interface Palette {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    favoriteColor: string[];
    pictureData: PictureData[];
}

export interface PictureData {
    id: string;
    imagePath: string;
    bin: number;
    palette: {
        before: string;
        after: string;
    }[];
}

// ファイル選択に関する型定義
export interface FileSelectionData {
    selectedCount: number;
    images: ImageEntry[];
}

// 画像ファイルのパスと ObjectURL のペア
export interface ImageEntry {
    path: string;
    url: string;
    id: string;
}
