export interface StoreData {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    favoriteColor: string[];
    pictureIdArray: string[]; // グループで使用
    pictureData: PictureData[]; // カラーパレット用に追加
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
