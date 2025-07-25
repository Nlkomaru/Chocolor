import { defineTokens } from "@chakra-ui/react";
import { potato } from "./base/potato";
import { rose } from "./base/rose";
import { wafer } from "./base/wafer";

export const colors = defineTokens.colors({
    transparent: {
        value: "transparent",
    },
    current: {
        value: "currentColor",
    },
    black: {
        value: "#09090B",
    },
    white: {
        value: "#FFFFFF",
    },
    whiteAlpha: {
        "50": {
            value: "rgba(255, 255, 255, 0.04)",
        },
        "100": {
            value: "rgba(255, 255, 255, 0.06)",
        },
        "200": {
            value: "rgba(255, 255, 255, 0.08)",
        },
        "300": {
            value: "rgba(255, 255, 255, 0.16)",
        },
        "400": {
            value: "rgba(255, 255, 255, 0.24)",
        },
        "500": {
            value: "rgba(255, 255, 255, 0.36)",
        },
        "600": {
            value: "rgba(255, 255, 255, 0.48)",
        },
        "700": {
            value: "rgba(255, 255, 255, 0.64)",
        },
        "800": {
            value: "rgba(255, 255, 255, 0.80)",
        },
        "900": {
            value: "rgba(255, 255, 255, 0.92)",
        },
        "950": {
            value: "rgba(255, 255, 255, 0.95)",
        },
    },
    blackAlpha: {
        "50": {
            value: "rgba(0, 0, 0, 0.04)",
        },
        "100": {
            value: "rgba(0, 0, 0, 0.06)",
        },
        "200": {
            value: "rgba(0, 0, 0, 0.08)",
        },
        "300": {
            value: "rgba(0, 0, 0, 0.16)",
        },
        "400": {
            value: "rgba(0, 0, 0, 0.24)",
        },
        "500": {
            value: "rgba(0, 0, 0, 0.36)",
        },
        "600": {
            value: "rgba(0, 0, 0, 0.48)",
        },
        "700": {
            value: "rgba(0, 0, 0, 0.64)",
        },
        "800": {
            value: "rgba(0, 0, 0, 0.80)",
        },
        "900": {
            value: "rgba(0, 0, 0, 0.92)",
        },
        "950": {
            value: "rgba(0, 0, 0, 0.95)",
        },
    },
    gray: {
        "50": {
            value: "#fafafa",
        },
        "100": {
            value: "#f4f4f5",
        },
        "200": {
            value: "#e4e4e7",
        },
        "300": {
            value: "#d4d4d8",
        },
        "400": {
            value: "#a1a1aa",
        },
        "500": {
            value: "#71717a",
        },
        "600": {
            value: "#52525b",
        },
        "700": {
            value: "#3f3f46",
        },
        "800": {
            value: "#27272a",
        },
        "900": {
            value: "#18181b",
        },
        "950": {
            value: "#111111",
        },
    },
    red: {
        "50": {
            value: "#fef2f2",
        },
        "100": {
            value: "#fee2e2",
        },
        "200": {
            value: "#fecaca",
        },
        "300": {
            value: "#fca5a5",
        },
        "400": {
            value: "#f87171",
        },
        "500": {
            value: "#ef4444",
        },
        "600": {
            value: "#dc2626",
        },
        "700": {
            value: "#991919",
        },
        "800": {
            value: "#511111",
        },
        "900": {
            value: "#300c0c",
        },
        "950": {
            value: "#1f0808",
        },
    },
    orange: {
        "50": {
            value: "#fff7ed",
        },
        "100": {
            value: "#ffedd5",
        },
        "200": {
            value: "#fed7aa",
        },
        "300": {
            value: "#fdba74",
        },
        "400": {
            value: "#fb923c",
        },
        "500": {
            value: "#f97316",
        },
        "600": {
            value: "#ea580c",
        },
        "700": {
            value: "#92310a",
        },
        "800": {
            value: "#6c2710",
        },
        "900": {
            value: "#3b1106",
        },
        "950": {
            value: "#220a04",
        },
    },
    yellow: {
        "50": {
            value: "#fefce8",
        },
        "100": {
            value: "#fef9c3",
        },
        "200": {
            value: "#fef08a",
        },
        "300": {
            value: "#fde047",
        },
        "400": {
            value: "#facc15",
        },
        "500": {
            value: "#eab308",
        },
        "600": {
            value: "#ca8a04",
        },
        "700": {
            value: "#845209",
        },
        "800": {
            value: "#713f12",
        },
        "900": {
            value: "#422006",
        },
        "950": {
            value: "#281304",
        },
    },
    green: {
        "50": {
            value: "#f0fdf4",
        },
        "100": {
            value: "#dcfce7",
        },
        "200": {
            value: "#bbf7d0",
        },
        "300": {
            value: "#86efac",
        },
        "400": {
            value: "#4ade80",
        },
        "500": {
            value: "#22c55e",
        },
        "600": {
            value: "#16a34a",
        },
        "700": {
            value: "#116932",
        },
        "800": {
            value: "#124a28",
        },
        "900": {
            value: "#042713",
        },
        "950": {
            value: "#03190c",
        },
    },
    teal: {
        "50": {
            value: "#f0fdfa",
        },
        "100": {
            value: "#ccfbf1",
        },
        "200": {
            value: "#99f6e4",
        },
        "300": {
            value: "#5eead4",
        },
        "400": {
            value: "#2dd4bf",
        },
        "500": {
            value: "#14b8a6",
        },
        "600": {
            value: "#0d9488",
        },
        "700": {
            value: "#0c5d56",
        },
        "800": {
            value: "#114240",
        },
        "900": {
            value: "#032726",
        },
        "950": {
            value: "#021716",
        },
    },
    blue: {
        "50": {
            value: "#eff6ff",
        },
        "100": {
            value: "#dbeafe",
        },
        "200": {
            value: "#bfdbfe",
        },
        "300": {
            value: "#a3cfff",
        },
        "400": {
            value: "#60a5fa",
        },
        "500": {
            value: "#3b82f6",
        },
        "600": {
            value: "#2563eb",
        },
        "700": {
            value: "#173da6",
        },
        "800": {
            value: "#1a3478",
        },
        "900": {
            value: "#14204a",
        },
        "950": {
            value: "#0c142e",
        },
    },
    cyan: {
        "50": {
            value: "#ecfeff",
        },
        "100": {
            value: "#cffafe",
        },
        "200": {
            value: "#a5f3fc",
        },
        "300": {
            value: "#67e8f9",
        },
        "400": {
            value: "#22d3ee",
        },
        "500": {
            value: "#06b6d4",
        },
        "600": {
            value: "#0891b2",
        },
        "700": {
            value: "#0c5c72",
        },
        "800": {
            value: "#134152",
        },
        "900": {
            value: "#072a38",
        },
        "950": {
            value: "#051b24",
        },
    },
    purple: {
        "50": {
            value: "#faf5ff",
        },
        "100": {
            value: "#f3e8ff",
        },
        "200": {
            value: "#e9d5ff",
        },
        "300": {
            value: "#d8b4fe",
        },
        "400": {
            value: "#c084fc",
        },
        "500": {
            value: "#a855f7",
        },
        "600": {
            value: "#9333ea",
        },
        "700": {
            value: "#641ba3",
        },
        "800": {
            value: "#4a1772",
        },
        "900": {
            value: "#2f0553",
        },
        "950": {
            value: "#1a032e",
        },
    },
    pink: {
        "50": {
            value: "#fdf2f8",
        },
        "100": {
            value: "#fce7f3",
        },
        "200": {
            value: "#fbcfe8",
        },
        "300": {
            value: "#f9a8d4",
        },
        "400": {
            value: "#f472b6",
        },
        "500": {
            value: "#ec4899",
        },
        "600": {
            value: "#db2777",
        },
        "700": {
            value: "#a41752",
        },
        "800": {
            value: "#6d0e34",
        },
        "900": {
            value: "#45061f",
        },
        "950": {
            value: "#2c0514",
        },
    },
    ...rose,
    ...wafer,
    ...potato,
});
