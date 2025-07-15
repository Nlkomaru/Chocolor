import { Heading, HStack, Slider, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { settingAtom } from "../../../store/setting";
import type { Setting } from "../../../type/setting";
import { settingStyle } from "./setting-style";

export const PaletteSize = () => {
    const [setting, setSetting] = useAtom(settingAtom);
    const styles = settingStyle();

    const handlePaletteSizeChange = (paletteSize: Setting["paletteSize"]) => {
        setSetting((prev: Setting) => ({
            ...prev,
            paletteSize,
        }));
    };

    return (
        <>
            <Heading size="md" className={styles.heading}>
                ビンの数
            </Heading>
            <Text fontSize="sm" className={styles.text}>
                画像の色変換に使用するデフォルトのパレットの数を選択してください。 <br />
                パレット数を増やすと、性能が上がるというものではないです。<br />
                元のテクスチャに合わせて、変更ページ側で適宜パレット数を調整することを推奨します。<br />
            </Text>

            <Slider.Root
                maxW="sm"
                size="sm"
                defaultValue={[setting.paletteSize || 3]}
                max={15}
                onValueChange={(value) =>
                    handlePaletteSizeChange(
                        value.value[0] as number,
                    )
                }
            >
                <HStack justify="space-between">
                    <Slider.Label>Palette Size</Slider.Label>
                    <Slider.ValueText />
                </HStack>
                <Slider.Control>
                    <Slider.Track>
                        <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs rounded="full" />
                </Slider.Control>
            </Slider.Root>
        </>
    );
};
