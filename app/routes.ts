import {
    index,
    layout,
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    layout("layouts/root-layout.tsx", [
        index("routes/index/page.tsx"),
        route("license", "routes/license/page.tsx"),
        route("about", "routes/about/page.tsx"),
        route("settings", "routes/settings/page.tsx"),
        route("history", "routes/history/page.tsx"),
        // Catch-all route for 404 pages. Must be last.
        route("*", "routes/not-found.tsx"),
    ]),
] satisfies RouteConfig;
