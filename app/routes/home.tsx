import { Button } from "@chakra-ui/react";
import { css } from "@/styled-system/css";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <div className={css({})}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            小田原熱海間に、軽便鉄道敷設の工事が始まったのは、良平の八つの年だった。良平は毎日村外れへ、その工事を見物に行った。工事を――といったところが、唯トロッコで土を運搬する――それが面白さに見に行ったのである。
            <Button> test</Button>
        </div>
    );
}
