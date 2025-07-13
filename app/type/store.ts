// データの保存形式
export interface StoreData {
    colorTransform: ColorTransform[];
}

// {id}.jsonの中身
export interface ColorTransform {
    id: string;
    imagePath: string;
    bin: number;
    palette: {
        before: string;
        after: string;
    }[];
}
