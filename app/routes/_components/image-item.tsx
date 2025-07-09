import { Image, Text, VStack } from "@chakra-ui/react";
import { sva } from "../../../styled-system/css";
import type { ImageEntry } from "./image-gallery";

interface Props extends ImageEntry { }

const itemStyle = sva({
    slots: ["container", "image"],
    base: {
        container: {
            alignItems: "start",
            gap: 2,
            width: "full",
            padding: "1rem 2rem",
            bgColor: "{colors.rose.100}",
            borderRadius: "md",
        },
        image: {
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "sm",
            bgColor: "white"
        },
    },
});

export const ImageItem = ({ path, url }: Props) => {
    const styles = itemStyle();
    return (
        <VStack align="start" gap={2} w="full" className={styles.container}>
            <Text fontSize="xs" wordBreak="break-all">
                {path}
            </Text>
            <Image
                src={url}
                alt={path}
                className={styles.image}
            />
        </VStack>
    );
};  
