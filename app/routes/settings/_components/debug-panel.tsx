import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "styled-system/css";
import { settingAtom } from "../../../store/setting";

export const DebugPanel = () => {
    const [setting] = useAtom(settingAtom);

    return (
        <div
            className={css({
                padding: "1rem",
                backgroundColor: "var(--chakra-colors-bg-muted)",
                borderRadius: "0.375rem",
                display: "none",
            })}
        >
            <Text fontSize="sm" fontWeight="bold" marginBottom={2}>
                デバッグ情報
            </Text>
            <Text as="pre" fontSize="xs" color="subtle">
                {JSON.stringify(setting, null, 2)}
            </Text>
        </div>
    );
};
