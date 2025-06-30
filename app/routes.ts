import { index, layout, type RouteConfig } from "@react-router/dev/routes";

export default [
    layout("layouts/root-layout.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
