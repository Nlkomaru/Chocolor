import { Heading, VStack } from "@chakra-ui/react";
import { ClearLocalStorage } from "./_components/clear-localstorage";
import { ColorSpace } from "./_components/color-space";
import { DebugPanel } from "./_components/debug-panel";
import { PaletteSize } from "./_components/palette-size";

export default function SettingPage() {
    return (
        <>
            <Heading as="h1">設定</Heading>

            <VStack gap={6} align="stretch">
                <ColorSpace />
                <PaletteSize />
                <ClearLocalStorage />
                <DebugPanel />
            </VStack>
        </>
    );
}
