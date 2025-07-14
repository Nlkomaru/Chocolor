import { VStack } from "@chakra-ui/react";
import type { ImageEntry } from "../../type/store";
import { ImageItem } from "./image-item";

interface Props {
    images: ImageEntry[];
}

export const ImageGallery = ({ images }: Props) => {
    return (
        <VStack align="start" gap={6} overflowY="auto" w="full">
            {images.map((img) => (
                <ImageItem key={img.path} {...img} />
            ))}
        </VStack>
    );
};
