import { Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ImageUpload } from "../components/molecules/image-upload";
import { getStats } from "../lib/stats";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
    return [
        { title: "Color Migrator" },
        { name: "description", content: "画像の色変換アプリケーション" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home(_: Route.ComponentProps) {
    // 画像ファイルの状態管理
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [targetFile, setTargetFile] = useState<File | null>(null);

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
                    colorScheme="blue"
                    accept="image/*"
                    maxFiles={1}
                    type="source"
                    onFilesChange={setSourceFile}
                />

                {/* ターゲット画像アップロード */}
                <ImageUpload
                    title="ターゲット画像"
                    description="参考となる色の画像を選択"
                    colorScheme="green"
                    accept="image/*"
                    type="target"
                    maxFiles={1}
                    onFilesChange={setTargetFile}
                />
            </HStack>

            {/* 変換実行ボタン */}
            {sourceFile && targetFile && (
                <Button
                    size="lg"
                    colorScheme="purple"
                    onClick={async () => {
                        // TODO: 色変換処理を実装
                        const stats = await getStats(sourceFile, targetFile);

                        console.log(stats);
                        // TODO: use stats result
                    }}
                >
                    色変換を実行
                </Button>
            )}
        </>
    );
}
