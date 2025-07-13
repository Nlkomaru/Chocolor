import { Provider } from "jotai";
import { Outlet } from "react-router";
import { Layout } from "../components/templates/layout";

export default function RootLayout() {
    return (
        <Provider>
            <Layout>
                <Outlet />
            </Layout>
        </Provider>
    );
}
