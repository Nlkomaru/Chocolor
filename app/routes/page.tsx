import { HStack, Text } from "@chakra-ui/react";
import { ImageUpload } from "../components/molecules/image-upload";
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
            <Text fontSize="lg" color="gray.600" textAlign="center">
                2枚の画像をアップロードして、色の変換を行います
            </Text>

            <HStack gap={8} width="100%" align="start">
                {/* ソース画像アップロード */}
                <ImageUpload
                    title="ソース画像"
                    description="変換元となる画像を選択"
                    accept="image/*"
                    maxFiles={1}
                    type="source"
                />

                {/* ターゲット画像アップロード */}
                <ImageUpload
                    title="ターゲット画像"
                    description="参考となる色の画像を選択"
                    accept="image/*"
                    type="target"
                    maxFiles={1}
                />
            </HStack>
        </>
    );
}
