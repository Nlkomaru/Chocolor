import { Button, HStack } from "@chakra-ui/react"

import { VStack } from "@chakra-ui/react"
import { Stats } from "../atoms/stats"
import { PaletteSizeSlider } from "../atoms/palette-size-slider"
import { Download, Eye } from "lucide-react"
import { ImagePalette } from "app/type/store"
import { ImageData } from "app/type/color"
import ImageRelocorDialog from "../organisms/image-relocor-dialog"

interface Props {
    id: string;
    imageData: {
        imageData: ImageData | null;
        isLoading: boolean;
        error: string | null;
    };
    isGenerating: boolean;
    imagePalette: ImagePalette | null;
}
export const Control = ({ id, imageData, isGenerating, imagePalette }: Props) => {
    return (
        <VStack align="start" height="160px" justifyContent="space-between">
            <HStack align="start" gap={6}>
                <Stats
                    imageId={id}
                    imageData={imageData}
                    isGeneratingPalette={
                        isGenerating || imagePalette?.palette.length === 0
                    }
                />

                <VStack align="start" minW="160px">
                    <PaletteSizeSlider imageId={id} />
                </VStack>
            </HStack>

            <HStack align="start" justifyContent="space-between" w="344px" gap={2}>
                <ImageRelocorDialog />
                <Button size="lg" w="160px">
                    Download <Download />
                </Button>
            </HStack>
        </VStack>
    )
}