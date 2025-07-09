import { VStack } from "@chakra-ui/react";
import { LicenseGroup, LicenseGroupProps } from "./_components/license-group";
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

type LicenseGroup = [string, Array<[string, LicenseInfo]>];

/**
 * License page – lists OSS dependencies and their licenses.
 */
export default function LicensePage(_: Route.ComponentProps) {
    // Convert to array and group by license string
    const groups = getGrouedLicense();

    return (
        <VStack align="stretch" gap={10}>
            {groups.map(([license, packages]) => (
                <LicenseGroup
                    key={license}
                    license={license}
                    packages={packages}
                />
            ))}
        </VStack>
    );
}

function getGrouedLicense(): LicenseGroup[] {
    const grouped = new Map<string, Array<[string, any]>>();
    Object.entries(data).forEach(([pkg, info]) => {
        const lic = info.licenses ?? "UNKNOWN";
        if (!grouped.has(lic)) grouped.set(lic, []);
        grouped.get(lic)!.push([pkg, info]);
    });

    return Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}