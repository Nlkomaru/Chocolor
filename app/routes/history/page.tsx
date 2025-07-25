import { Heading, Text, VStack } from "@chakra-ui/react";
// import { groupAtom } from "app/store/palette";
// import { useAtomValue } from "jotai";
import type { Route } from "./+types/page";

export function meta(_: Route.MetaArgs) {
    return [
        { title: "Chocolor | History" },
        { name: "description", content: "History" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function PageName(_: Route.ComponentProps) {
    // const group = useAtomValue(groupAtom);
    const group: string[] = [];
    return (
        <>
            <Heading as="h1">履歴</Heading>
            <VStack align="stretch" gap={6}>
                {group.map((groupId) => (
                    <div key={groupId}>
                        <Text>{groupId}</Text>
                    </div>
                ))}
            </VStack>
        </>
    );
}
