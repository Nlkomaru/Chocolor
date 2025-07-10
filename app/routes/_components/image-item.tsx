import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { sva } from "../../../styled-system/css";
import type { ImageEntry } from "./image-gallery";
import { getImageInfo } from "app/lib/image";
import { useEffect, useState } from "react";
import type { ImageData } from "app/type";

interface Props extends ImageEntry { }

const itemStyle = sva({
    slots: ["container", "image"],
    base: {
        container: {
            alignItems: "start",
            gap: 2,
            width: "full",
            padding: "1rem 2rem",
            bgColor: "var(--chakra-colors-bg-subtle)",
            borderRadius: "md",
        },
        image: {
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "sm",
            bgColor: "white",
        },
    },
});

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
    return (
        <VStack align="start" gap={2} w="full" className={styles.container}>
            <Text
                fontSize="md"
                overflowWrap="anywhere"
                textOverflow="ellipsis"
                whiteSpace="pre-line"
                width="full"
                fontWeight="400"
            >
                {path}
            </Text>
            <HStack>
                <Image src={url} alt={path} className={styles.image} />
                <VStack>
                    <Text>{imageData?.info.width}</Text>
                    <Text>{imageData?.info.height}</Text>
                    <Text>{imageData?.info.format}</Text>
                </VStack>
            </HStack>
        </VStack>
    );
};
