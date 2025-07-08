import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { sva } from "../../styled-system/css";

/**
 * 404 (Not Found) ページ
 * 画面中央（縦横）に大きめに表示する
 */

const notFoundStyles = sva({
    slots: ["root", "heading", "text", "button", "vstack"],
    base: {
        root: {
            minH: "100vh", // 画面全体の高さを確保
            display: "flex",
            alignItems: "center", // 縦方向中央揃え
            justifyContent: "center", // 横方向中央揃え
            color: "var(--chakra-colors-wafer-900)",
        },
        vstack: {
            gap: "2rem", // 余白を大きめに
            textAlign: "center",
        },
        heading: {
            fontSize: "4xl", // かなり大きく
            fontWeight: "bold",
        },
        text: {
            fontSize: "xl", // テキストも大きめ
        },
        button: {
            colorScheme: "potato",
            fontSize: "lg", // ボタンも大きめ
            paddingX: "2.5rem",
            paddingY: "1.5rem",
        },
    },
});

export default function NotFound() {
    const styles = notFoundStyles();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, [navigate]);
    return (
        <Center className={styles.root}>
            <VStack gap="2rem" className={styles.vstack}>
                <Heading as="h1" className={styles.heading}>
                    404 Not Found
                </Heading>
                <VStack gap="1rem">
                    <Text className={styles.text}>
                        お探しのページは見つかりませんでした。
                    </Text>
                    <Text className={styles.text}>
                        5秒後に自動的に移動します。
                    </Text>
                </VStack>
            </VStack>
        </Center>
    );
}
