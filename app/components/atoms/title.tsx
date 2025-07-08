import { VStack } from "@chakra-ui/react";
import { Link } from "react-router";
import { sva } from "@/styled-system/css";

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

export const Title = () => {
    const classes = titleStyles();
    return (
        <Link to="/">
            <VStack gap={2} className={classes.container}>
                <h1 className={classes.title}>Chocolor</h1>
                <span className={classes.description}>
                    「ちょこっと色を変えたい！」を実現するウェブアプリケーションです。
                </span>
                {/* <Pen size={24} /> */}
            </VStack>
        </Link>
    );
};
