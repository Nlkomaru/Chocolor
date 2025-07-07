import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Header } from "../components/organisms/header";

export default function RootLayout() {
    return (
        <Box minH="100vh" bg="gray.50" px={8} py={4}>
            <VStack gap={8} maxW="1200px" mx="auto">
                <Header />
                <Outlet />
            </VStack>
        </Box>
    );
}
