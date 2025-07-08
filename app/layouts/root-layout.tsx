import { Outlet } from "react-router";
import { Layout } from "../components/templates/layout";

export default function RootLayout() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
