import { Heading, Text, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css, sva } from "../../../styled-system/css";
import { settingAtom } from "../../store/setting";
import { ColorSpace } from "./_components/color-space";
import { DebugPanel } from "./_components/debug-panel";

// panda-cssのsvaでスタイルバリアントを定義
const settingStyles = sva({
    slots: ["container", "debugPanel"],
    base: {
        container: {
            padding: "2rem",
        },
    },
});

export default function SettingPage() {
    const [setting] = useAtom(settingAtom);
    const styles = settingStyles();

    return (
        <div className={styles.container}>
            <VStack gap={8} align="stretch">
                <Heading size="xl">
                    設定
                </Heading>

                <VStack gap={4} align="stretch">
                    <ColorSpace />

                    <DebugPanel />
                </VStack>
            </VStack>
        </div>
    );
}
