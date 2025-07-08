import {
    index,
    layout,
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    layout("layouts/root-layout.tsx", [
        index("routes/home.tsx"),
        // Catch-all route for 404 pages. Must be last.
        route("*", "routes/not-found.tsx"),
    ]),
] satisfies RouteConfig;
