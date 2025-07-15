import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { groupAtom } from "app/store/palette";
import { useAtomValue } from "jotai";
import type { Route } from "./+types/page";
import { LicenseGroup } from "../license/_components/license-group";

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
    const group = useAtomValue(groupAtom);
    return (
        <>
            <Container>
            <Heading as="h1" size="2xl" mb={10}>
                履歴
            </Heading>
            <VStack align="stretch" gap={10}>
                {group.map((groupId) => (
                    <div key={groupId}>
                        <Text>{groupId}</Text>
                    </div>
                ))}
            </VStack>
        </Container>
        </>
    );
}
