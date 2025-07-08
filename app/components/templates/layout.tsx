import { VStack } from "@chakra-ui/react";
import { sva } from "../../../styled-system/css";
import { FOOTER_LINKS, NAVIGATION_LINKS } from "../../lib/links";
import type { MenuButtonProps } from "../atoms/menu-button";
import type { FooterItem } from "../molecules/menu-footer";
import { VerticalMenu } from "../organisms/vertical-menu";

// panda-cssのsvaでスタイルバリアントを定義
const layoutStyles = sva({
    slots: ["container", "header", "sidebar", "main", "content"],
    base: {
        container: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
        },
        header: {
            width: "100%",
            padding: "1rem 2rem",
            borderBottom: "1px solid",
            borderColor: "gray.200",
            backgroundColor: "white",
            boxShadow: "sm",
        },
        sidebar: {
            width: "320px",
            height: "100vh",
            bgColor: "var(--chakra-colors-potato-100)/40",
        },
        main: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
        },
        content: {
            flex: 1,
            padding: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
        },
    },
});

interface LayoutProps {
    children: React.ReactNode;
    navbarItems?: MenuButtonProps[];
    footerItems?: FooterItem[];
}

export const Layout = ({
    children,
    navbarItems = NAVIGATION_LINKS,
    footerItems = FOOTER_LINKS,
}: LayoutProps) => {
    // svaで生成したスタイルを適用
    const styles = layoutStyles();

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {navbarItems.length > 0 && (
                    <aside className={styles.sidebar}>
                        <VerticalMenu
                            navbarItems={navbarItems}
                            footerItems={footerItems}
                        />
                    </aside>
                )}

                {/* コンテンツエリア */}
                <div className={styles.content}>
                    <VStack gap={8} align="stretch">
                        {children}
                    </VStack>
                </div>
            </main>
        </div>
    );
};
