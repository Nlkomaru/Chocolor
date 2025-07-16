import { Container, Heading, VStack } from "@chakra-ui/react";
import { LicenseGroup } from "./_components/license-group";
import type { Route } from "./+types/page";
import data from "./data.json";

export function meta(_: Route.MetaArgs) {
    return [{ title: "OSS Licenses | Chocolor" }];
}

export function loader(_: Route.LoaderArgs) {
    return {};
}

type LicenseInfo = {
    licenses: string;
    repository?: string;
    publisher?: string;
};

type LicenseGroupData = [string, Array<[string, LicenseInfo]>];

/**
 * License page – lists OSS dependencies and their licenses.
 */
export default function LicensePage(_: Route.ComponentProps) {
    // Convert to array and group by license string
    const groups = getGrouedLicense();

    return (
        <>
            <Heading as="h1">オープンソースソフトウェアライセンス一覧</Heading>
            <VStack align="stretch" gap={6}>
                {groups.map(([license, packages]) => (
                    <LicenseGroup
                        key={license}
                        license={license}
                        packages={packages}
                    />
                ))}
            </VStack>
        </>
    );
}

function getGrouedLicense(): LicenseGroupData[] {
    const grouped = new Map<
        string,
        Array<
            [
                string,
                { licenses: string; repository?: string; publisher?: string },
            ]
        >
    >();
    Object.entries(data).forEach(([pkg, info]) => {
        let lic = info.licenses ?? "UNKNOWN";
        overridenLicense.forEach(({ repo, license }) => {
            if (info.repository?.includes(repo)) {
                lic = license;
            }
        });
        if (!grouped.has(lic)) grouped.set(lic, []);
        grouped.get(lic)?.push([pkg, info]);
    });

    //w3を最後に
    const w3 = grouped.get("W3 License");
    const withoutW3 = Array.from(grouped.entries()).filter(
        ([license]) => license !== "W3 License",
    );
    return [...withoutW3, ["W3 License", w3 ?? []]];
}

const overridenLicense = [
    { repo: "Myndex/apca-w3", license: "W3 License" },
    { repo: "chakra-ui/panda", license: "MIT" },
];
