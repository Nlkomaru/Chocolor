import { sva } from "styled-system/css";
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
            // Fix the sidebar to the viewport so it does not scroll with the page
            width: "320px",
            height: "100vh",
            position: "fixed",
            top: 0, // keep it aligned to the very top
            left: 0, // align it to the left edge of the viewport
            display: "block",
            overflowY: "auto", // allow internal scrolling if contents overflow
        },
        main: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
        },
        content: {
            flex: 1,
            padding: "4rem 8rem",
            maxWidth: "1800px",
            // Offset the content so it does not hide behind the fixed sidebar
            marginLeft: "320px",
            "& h1": {
                fontSize: "2xl",
                mb: "8",
            },
            "& h2": {
                fontSize: "xl",
                mb: "4",
            },
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
                <div className={styles.content}>{children}</div>
            </main>
        </div>
    );
};
