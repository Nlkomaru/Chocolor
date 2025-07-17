import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useImageData } from "app/lib/use-image-data";
import { usePaletteGeneration } from "app/lib/use-palette-generation";
import { imagePaletteAtom } from "app/state/palette";
import type { ImagePalette } from "app/type/store";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { sva } from "styled-system/css";
import { ColorPalette } from "../molecules/color-palette";
import { Control } from "../molecules/control";

const imageItemStyles = sva({
    slots: ["container", "image", "statsContainer", "statsTitle", "statValue"],
    base: {
        container: {
            gap: 3,
            width: "full",
            padding: "1rem 2rem",
            bgColor: "var(--chakra-colors-bg-default)",
            border: "1px solid var(--chakra-colors-border)",
            borderRadius: "md",
            overflow: "scroll",
            fontWeight: "400",
        },
        image: {
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "sm",
            bgColor: "white",
            flexShrink: 0,
        },
    },
});

interface Props {
    id: string;
}

export const ImageItem = ({ id }: Props) => {
    const styles = imageItemStyles();
    const paletteAtom = useMemo(() => imagePaletteAtom(id), [id]);
    const imageData = useImageData(id);
    // 画像のパレットを（未生成なら）自動生成
    const { isGenerating } = usePaletteGeneration(id);
    const imagePalette = useAtomValue(paletteAtom) as ImagePalette | null;

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
                {imagePalette?.filePath}
            </Text>

            <HStack align="start" w="full" gap={6} height="100%">
                <Image
                    src={imagePalette?.url || ""}
                    alt={id}
                    className={styles.image}
                />

                <Control
                    id={id}
                    imageData={imageData}
                    isGenerating={isGenerating}
                    imagePalette={imagePalette}
                />

                <ColorPalette imageId={id} />
            </HStack>
        </VStack>
    );
};
