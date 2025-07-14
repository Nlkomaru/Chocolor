import { Text } from "@chakra-ui/react";
import { FileSelector } from "./_components/file-selector";
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
    return (
        <>
            <Text fontSize="lg" textAlign="center">
                カラーパレットベースの色変換を行います
            </Text>
            <FileSelector />
        </>
    );
}
