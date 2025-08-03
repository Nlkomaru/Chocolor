import { VStack } from "@chakra-ui/react";
import { ImageItem } from "./image-item";

interface Props {
    images: string[];
}

export const ImageGallery = ({ images }: Props) => {
    return (
        <VStack align="start" gap={6} overflowY="auto" w="full">
            {images.map((img) => (
                <ImageItem key={img} id={img} />
            ))}
        </VStack>
    );
};
