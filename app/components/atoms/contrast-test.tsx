import { css } from "../../../styled-system/css";

export interface ContrastTestProps {
    variant: "good" | "bad";
}

/**
 * ContrastTest – APCAコントラストチェックをテストするためのコンポーネント
 * good: 十分なコントラストを持つ例
 * bad: 不十分なコントラストを持つ例
 */
export const ContrastTest = ({ variant }: ContrastTestProps) => {
    const goodContrastStyles = css({
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        fontSize: "16px",
        fontWeight: "400",
        border: "1px solid #ccc",
        borderRadius: "4px",
    });

    const badContrastStyles = css({
        backgroundColor: "#f5f5f5",
        color: "#cccccc",
        padding: "16px",
        fontSize: "16px",
        fontWeight: "400",
        border: "1px solid #ccc",
        borderRadius: "4px",
    });

    return (
        <div
            className={
                variant === "good" ? goodContrastStyles : badContrastStyles
            }
        >
            {variant === "good"
                ? "このテキストは十分なコントラストを持っているはずです（黒文字/白背景）"
                : "このテキストはコントラストが不十分です（薄いグレー文字/薄いグレー背景）"}
        </div>
    );
};
