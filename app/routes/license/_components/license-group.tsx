import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { LicenseCard } from "./license-card";

interface PackageInfo {
    licenses: string;
    repository?: string;
    publisher?: string;
}

export interface LicenseGroupProps {
    license: string;
    packages: Array<[string, PackageInfo]>; // [pkgName@version, info]
}

/**
 * LicenseGroup – Box containing a heading for the license type and the list of packages using that license.
 */
export const LicenseGroup = ({ license, packages }: LicenseGroupProps) => {
    //publisherがある方を先に表示する
    packages.sort((a, b) => {
        const aPublisher = a[1].publisher;
        const bPublisher = b[1].publisher;
        if (aPublisher && !bPublisher) return -1;
        if (!aPublisher && bPublisher) return 1;
        return 0;
    });
    return (
        <Box as="section" mb={8}>
            <Heading as="h2" size="lg" mb={4}>
                {license}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {packages.map(([pkg, info]) => (
                    <LicenseCard
                        key={pkg}
                        pkg={pkg}
                        license={info.licenses}
                        repository={info.repository}
                        publisher={info.publisher}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};
