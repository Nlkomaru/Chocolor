import { sva } from "@/styled-system/css";
import { Heading, VStack } from "@chakra-ui/react";

const titleStyles = sva({
    slots: ["container", "title", "description"],
    base: {
        container: {
            width: "100%",
            padding: "3rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            fontSize: "24px",
            fontWeight: "bold",
        },
        description: {
            fontSize: "xs",
            overflowWrap: "break-word",
            textAlign: "center",
        },
    },
});

export const Title = ({ className }: { className?: string }) => {
    const classes = titleStyles();
    return <>
        <VStack gap={2} className={classes.container}>
            <Heading className={classes.title}>Chocolor</Heading>
            <span className={classes.description}>
            「ちょこっと色を変えたい！」を実現するウェブアプリケーションです。
            </span>
            {/* <Pen size={24} /> */}
        </VStack>
    </>;
};
