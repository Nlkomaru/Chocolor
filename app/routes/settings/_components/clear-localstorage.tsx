import { Button } from "@chakra-ui/react";

export const ClearLocalStorage = () => {
    return (
        <Button
            size="xl"
            width="100%"
            bgColor="var(--chakra-colors-red-500)"
            onClick={() => {
                localStorage.clear();
                alert("ローカルストレージをクリアしました");
            }}
        >
            ローカルストレージをクリア
        </Button>
    );
};
