import { Container, Heading, Text } from "@chakra-ui/react";
import { FileSelector } from "./_components/file-selector";
import type { Route } from "./+types/page";
import { sva } from "styled-system/css";

export function meta(_: Route.MetaArgs) {
    return [
        { title: "Chocolor | 「ちょこっと色を変えたい！」を実現するアプリ" },
        { name: "description", content: "画像の色変換アプリケーション" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

const homeStyles = sva({
    slots: ["heading"],
    base: {
        heading: {
            fontSize: "2xl",
            mb: "10",
        },
    },
});

export default function Home(_: Route.ComponentProps) {
    const styles = homeStyles();
    return (
        <Container>
            <Heading as="h1" className={styles.heading}>
                色変換
            </Heading>
            <FileSelector />
        </Container>
    );
}
