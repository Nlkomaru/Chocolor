import { VStack } from "@chakra-ui/react";
import { ImageItem } from "./image-item";

export type ImageEntry = { path: string; url: string };

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