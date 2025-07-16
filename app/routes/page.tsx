import { Heading } from "@chakra-ui/react";
import { currentGroupAtom, groupInfoAtom } from "app/state/group";
import type { GroupInfo } from "app/type/store";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { css } from "styled-system/css";
import { ImageGallery } from "./_components/molecules/image-gallery";
import { FileHeader } from "./_components/organisms/file-header";
import type { Route } from "./+types/page";

export function meta(_: Route.MetaArgs) {
    return [
        { title: "Chocolor | 「ちょこっと色を変えたい！」を実現するアプリ" },
        { name: "description", content: "画像の色変換アプリケーション" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home(_: Route.ComponentProps) {
    const [group] = useAtom(currentGroupAtom);
    const groupAtom = useMemo(() => groupInfoAtom(group), [group]);
    const groupInfo = useAtomValue(groupAtom) as GroupInfo | null;

    return (
        <>
            <Heading as="h1">色変換</Heading>
            <FileHeader />

            {groupInfo && groupInfo.images.length > 0 && (
                <div
                    className={css({
                        width: "100%",
                    })}
                >
                    <ImageGallery images={groupInfo.images} />
                </div>
            )}
        </>
    );
}
