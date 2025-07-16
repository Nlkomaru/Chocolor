import { Box, Heading, HStack, RadioCard, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { settingAtom } from "../../../store/setting";
import type { Setting } from "../../../type/setting";
import { settingStyle } from "./setting-style";

const colorSpaceItems = [
    {
        value: "RGBA",
        title: "RGBA",
        description: "標準的な色空間。多くの画像処理で使用される。",
    },
    {
        value: "OKLAB",
        title: "OKLAB",
        description: "より知覚的に均一な色空間。色の変換がより自然。",
    },
] as const;

export const ColorSpace = () => {
    const [setting, setSetting] = useAtom(settingAtom);
    const styles = settingStyle();

    const handleColorSpaceChange = (colorSpace: Setting["colorSpace"]) => {
        setSetting((prev: Setting) => ({
            ...prev,
            colorSpace,
        }));
    };

    return (
        <Box as="section" className={styles.container}>
            <Heading className={styles.heading}>色空間</Heading>
            <Text className={styles.text}>
                画像の色変換に使用する色空間を選択してください。
            </Text>

            <RadioCard.Root
                value={setting.colorSpace}
                onValueChange={(details) =>
                    handleColorSpaceChange(
                        details.value as Setting["colorSpace"],
                    )
                }
            >
                <HStack align="stretch">
                    {colorSpaceItems.map((item) => (
                        <RadioCard.Item key={item.value} value={item.value}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemContent>
                                    <RadioCard.ItemText>
                                        {item.title}
                                    </RadioCard.ItemText>
                                    <RadioCard.ItemDescription>
                                        {item.description}
                                    </RadioCard.ItemDescription>
                                </RadioCard.ItemContent>
                                <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>
        </Box>
    );
};
