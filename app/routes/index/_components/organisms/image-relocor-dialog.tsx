import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Eye } from "lucide-react";
import { Recolor } from "app/components/atoms/recolor";

type ImageRelocorDialogProps = {
    imageId: string;
};

export default function ImageRelocorDialog({
    imageId,
}: ImageRelocorDialogProps) {
    return (
        <Dialog.Root size="cover" motionPreset="slide-in-bottom" lazyMount>
            <Dialog.Trigger asChild>
                <Button size="lg" w="160px">
                    Preview <Eye />
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Recolor imageId={imageId} />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
