import { Heading, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { settingAtom } from "../../store/setting";
import { ColorSpace } from "./_components/color-space";
import { DebugPanel } from "./_components/debug-panel";
import { PaletteSize } from "./_components/palette-size";

export default function SettingPage() {
    const [_setting] = useAtom(settingAtom);

    return (
        <>
            <Heading as="h1">設定</Heading>

            <VStack gap={6} align="stretch">
                <ColorSpace />
                <PaletteSize />
                <DebugPanel />
            </VStack>
        </>
    );
}
