import { HStack } from "@chakra-ui/react";
import type { PictureData, StoreData } from "app/type/store";
import { ColorTransform as ColorTransformComponent } from "./color-transform";

interface Props {
    // StoreData には pictureData プロパティが含まれる想定
    // 型安全のために PictureData[] をマージしておく
    data: StoreData & { pictureData: PictureData[] };
}

export const ColorPalette = ({ data }: Props) => {
    // pictureData が存在しない、または空の場合は何も描画しない
    if (!data.pictureData || data.pictureData.length === 0) {
        return null;
    }

    return (
        <HStack align="start" gap={2} height="100%">
            {/*
                pictureData（画像ごとの情報）をループし、
                さらに palette（色変換前後の配列）をループして ColorTransformComponent を生成
            */}
            {data.pictureData.flatMap((picture) =>
                picture.palette.map((color, index) => (
                    <ColorTransformComponent
                        key={`${picture.id}-${color.before}-${index}`}
                        image_id={picture.id}
                        index={index}
                        beforeColor={color.before}
                        afterColor={color.after}
                    />
                )),
            )}
        </HStack>
    );
};
