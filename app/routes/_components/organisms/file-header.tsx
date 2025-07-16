import { Text } from "@chakra-ui/react";
import { currentGroupAtom, groupInfoAtom } from "app/state/group";
import type { GroupInfo } from "app/type/store";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { sva } from "styled-system/css";
import { FileUploader } from "../atoms/file-uploader";

const fileHeaderStyles = sva({
    slots: ["container", "stats"],
    base: {
        container: {
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: "2rem",
            gap: "4rem",
        },
        stats: {
            display: "flex",
            height: "100%",
            width: "100%",
            gap: "1rem",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
        },
    },
});
export const FileHeader = () => {
    const [currentGroup] = useAtom(currentGroupAtom);
    const styles = fileHeaderStyles();
    const groupAtom = useMemo(
        () => groupInfoAtom(currentGroup),
        [currentGroup],
    );
    const groupInfo = useAtomValue(groupAtom) as GroupInfo | null;
    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <Text>現在のグループ: {currentGroup}</Text>
                <Text>
                    アップロード画像数: {groupInfo?.images.length || "0"}
                </Text>
            </div>
            <FileUploader />
        </div>
    );
};
