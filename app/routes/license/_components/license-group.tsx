import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { css } from "../../../../styled-system/css";
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
            {license === "W3 License" && (
                // 横線
                <>
                    <Box
                        borderBottom="1px solid"
                        borderColor="bg.default"
                        mb={4}
                    />
                    <Text mb={4} fontSize="xl" fontWeight="bold">
                        オープンソースライセンスではないライセンス
                    </Text>
                </>
            )}
            <Heading as="h2" size="lg" mb={4}>
                {license}
            </Heading>
            <Text
                mb={4}
                className={css({
                    //折り返し
                    wordBreak: "keep-all",
                    overflowWrap: "anywhere",
                })}
            >
                {licenseDescription[license as keyof typeof licenseDescription]}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {packages.map(([pkg, info]) => (
                    <LicenseCard
                        key={pkg}
                        pkg={pkg}
                        repository={info.repository}
                        publisher={info.publisher}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};

const licenseDescription = {
    "W3 License":
        "ウェブコンテンツのアクセシビリティ評価という特定の目的に厳しく限定されたライセンス(非商用目的のソフトウェアであれば、ロイヤリティフリー) Storybookにおいて使用",
    MIT: "著作権表示を条件とした、改変・再配布・商用利用を許容する簡潔な自由ライセンス",
    "Apache-2.0":
        "特許権の明示的許諾を含む、商用利用に適した企業向け自由ライセンス",
    "BSD-3-Clause":
        "再配布を許容しつつ、開発者名の商用宣伝利用を禁じる実用的ライセンス",
    ISC: "MITと機能的に同等であり、より簡潔な文面によるパーミッシブライセンス",
    "OFL-1.1":
        "フォントに特化したライセンスで、改変や組み込みは可能だが単体販売は禁止",
    "MIT OR Apache-2.0":
        "利用者がMITまたはApache-2.0を選択可能とする、柔軟性の高い二重ライセンス方式",
    Unlicense:
        "Public Domainに非常に近く、帰属の必要がない非常に緩いライセンス",
    "MPL-2.0":
        "変更ファイル単位でのソース公開を義務づける、弱コピーレフト型ライセンス",
};
