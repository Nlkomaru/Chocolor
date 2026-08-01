import { HStack, Text, VStack } from "@chakra-ui/react";
import { ColorPalette } from "app/routes/index/_components/molecules/color-palette";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { recolor } from "../../lib/recolor";
import { imagePaletteAtom } from "../../state/palette";
import type { ImagePalette } from "../../type/store";
export const progressAtom = atom<number>(0);

export const Recolor = ({ imageId }: { imageId: string }) => {
    const [recoloredImage, setRecoloredImage] = useState<string | null>(null);
    const [progress, setProgress] = useAtom(progressAtom);
    const [imagePalette, setImagePalette] = useAtom(
        imagePaletteAtom(imageId),
    ) as [ImagePalette, (palette: ImagePalette) => void];
    setImagePalette(imagePalette);
    useEffect(() => {
        const fetchRecoloredImage = async () => {
            const recoloredImage = await recolor(
                imagePalette,
                true,
                15,
                (progress) => {
                    setProgress(progress);
                },
            );
            setRecoloredImage(recoloredImage);
        };
        fetchRecoloredImage();
    }, [imagePalette]);

    return (
        <div>
            <ColorPalette imageId={imagePalette.id} />
            <HStack w="1200px" h="600px">
                <img
                    src={imagePalette.url}
                    alt={imagePalette.name}
                    width="600px"
                    height="600px"
                />
                {recoloredImage && (
                    <img
                        src={recoloredImage}
                        alt={imagePalette.name}
                        width="600px"
                        height="600px"
                    />
                )}
            </HStack>
            <Text>{progress}</Text>
        </div>
    );
};
