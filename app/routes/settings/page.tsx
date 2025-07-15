import { Container, Heading, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { sva } from "../../../styled-system/css";
import { settingAtom } from "../../store/setting";
import { ColorSpace } from "./_components/color-space";
import { DebugPanel } from "./_components/debug-panel";
import { PaletteSize } from "./_components/palette-size";

// panda-cssのsvaでスタイルバリアントを定義
const settingStyles = sva({
    slots: ["container", "heading", ],
    base: {
        container: {
            padding: "2rem",
        },
        heading: {
            fontSize: "2xl",
            mb: "10",
        },
    },
});

export default function SettingPage() {
    const [_setting] = useAtom(settingAtom);
    const styles = settingStyles();

    return (
        <Container>
            <Heading as="h1" className={styles.heading}>
                設定
            </Heading>

            <VStack gap={10} align="stretch">
                <ColorSpace />
                <PaletteSize />
                <DebugPanel />
            </VStack>
        </Container>
    );
}
