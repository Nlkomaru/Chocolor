import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { css } from "../../../styled-system/css";
import type { Route } from "./+types/page";

export function meta(_: Route.MetaArgs) {
    return [
        { title: "Chocolor | 「ちょこっと色を変えたい！」を実現するアプリ" },
        { name: "description", content: "画像の色変換アプリケーション" },
    ];
}

export default function About() {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await fetch("/docs.md");
                const docs = await res.text();
                setMarkdown(docs);
            } catch (error) {
                console.error("Failed to load docs.md:", error);
                setMarkdown(
                    "# About\n\nドキュメントの読み込みに失敗しました。",
                );
            }
        };
        fetchDocs();
    }, []);

    return (
        <div
            className={css({
                "& h3,h4,h5,h6": {
                    mb: "1rem",
                },
                "& p": {
                    marginBottom: "1rem",
                },
                "& li": {
                    marginBottom: "0.25rem",
                },
                "& em": {
                    fontStyle: "italic",
                },
                "& strong": {
                    fontWeight: "bold",
                },
                "& code": {
                    fontFamily: "JetBrains Mono Variable, monospace",
                    backgroundColor: "var(--chakra-colors-bg-subtle)",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.4rem",
                },
                "& pre": {
                    backgroundColor: "var(--chakra-colors-bg-subtle)",
                    padding: "1rem",
                    borderRadius: "0.4rem",
                },
                "& blockquote": {
                    borderLeft: "4px solid var(--chakra-colors-bg-subtle)",
                    paddingLeft: "1rem",
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                },
                "& hr": {
                    border: "1px solid var(--chakra-colors-bg-subtle)",
                    margin: "2rem 0",
                },
                "& ol": {
                    marginLeft: "1.5rem",
                    marginBottom: "1rem",
                    listStyleType: "decimal",
                },
                "& ul": {
                    marginLeft: "1.5rem",
                    marginBottom: "1rem",
                    listStyleType: "disc",
                },
            })}
        >   
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>        </div>
    );
}
