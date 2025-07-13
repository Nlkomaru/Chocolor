import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { getImageInfo } from "app/lib/image";
import type { ColorTransform, ImageData } from "app/type/color";
import { useEffect, useState } from "react";
import { sva } from "../../../styled-system/css";
import { ColorPalette } from "./color-palette";
import type { ImageEntry } from "./image-gallery";

interface Props extends ImageEntry {}

const itemStyle = sva({
    slots: ["container", "image", "statsContainer", "statsTitle", "statValue"],
    base: {
        container: {
            gap: 3,
            width: "full",
            padding: "1rem 2rem",
            bgColor: "var(--chakra-colors-bg-default)",
            border: "1px solid var(--chakra-colors-border)",
            borderRadius: "md",
        },
        image: {
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "sm",
            bgColor: "white",
            flexShrink: 0,
        },
        statsContainer: {
            gap: 4,
            alignItems: "flex-start",
            paddingTop: "1rem",
            flex: 1,
        },
        statsTitle: {
            fontSize: "lg",
            fontWeight: "600",
            textAlign: "left",
            color: "var(--chakra-colors-fg-default)",
        },
        statValue: {
            fontSize: "sm",
            color: "var(--chakra-colors-fg-muted)",
        },
    },
});

// 仮の色パレット生成関数（実際の実装では画像から色を抽出する必要がある）
const generateColorPalette = (): string[] => {
    // 今回は仮で赤系の色を返す（Figmaデザインに合わせて）
    return ["#E53E3E", "#C53030", "#B91C1C", "#DC2626"];
};

export const ImageItem = ({ path, url }: Props) => {
    const styles = itemStyle();
    const [imageData, setImageData] = useState<ImageData | null>(null);

    useEffect(() => {
        const fetchImageData = async () => {
            const data = await getImageInfo(url);
            setImageData(data);
        };
        fetchImageData();
    }, [url]);

    const colorTransform: ColorTransform = {
        id: "1",
        imagePath: path,
        bin: generateColorPalette().length,
        palette: generateColorPalette().map((color, index) => {
            const colors = generateColorPalette();
            return {
                before: color,
                after: colors[index + 1] || color, // 配列の範囲を超えた場合は同じ色を返す
            };
        }),
    };

    return (
        <VStack align="start" className={styles.container}>
            {/* ファイルパス */}
            <Text
                fontSize="md"
                overflowWrap="anywhere"
                textOverflow="ellipsis"
                whiteSpace="pre-line"
                width="full"
                fontWeight="400"
                color="var(--chakra-colors-fg-default)"
            >
                {path}
            </Text>

            {/* 画像とStats */}
            <HStack align="start" gap={6}>
                {/* 画像サムネイル */}
                <Image src={url} alt={path} className={styles.image} />

                {/* Stats セクション */}
                <VStack align="start" className={styles.statsContainer}>
                    <Text className={styles.statsTitle}>Stats</Text>
                    {/* 幅と高さ */}
                    <VStack align="start" gap={1} width="120px">
                        <Text className={styles.statValue}>
                            Width: {imageData?.info.width || "..."}
                        </Text>
                        <Text className={styles.statValue}>
                            Height: {imageData?.info.height || "..."}
                        </Text>
                    </VStack>
                </VStack>
                {/* カラーパレット */}
                <ColorPalette colorTransform={colorTransform} />
            </HStack>
        </VStack>
    );
};
