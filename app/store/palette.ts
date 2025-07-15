import { atom, Atom } from "jotai";
import type { Palette, PictureData } from "app/type/store";

const groupAtom = atom(
    Object.keys(localStorage).filter((key) =>
        key.startsWith("chocolor-palette-"),
    ) ||
    [],
);

const groupAtomPersist = atom(
    (get) => get(groupAtom),
    (get, set, update: string[]) => {
        update.forEach((groupId) => {
            localStorage.setItem(
                `chocolor-palette-${groupId}`,
                JSON.stringify({}),
            );
        });
        set(groupAtom, update);
    },
);

const paletteAtom = (groupId: string) => atom(
    JSON.parse(localStorage.getItem(`chocolor-palette-${groupId}`) || "{}") as Palette,
);

const paletteAtomPersist = (groupId: string) => atom(
    (get) => get(paletteAtom(groupId)),
    (get, set, update: Palette) => {
        localStorage.setItem(`chocolor-palette-${groupId}`, JSON.stringify(update));
        set(paletteAtom(groupId), update);
    },
);

const imageAtom = (groupId: string, imageId: string) => atom(
    (JSON.parse(localStorage.getItem(`chocolor-palette-${groupId}-${imageId}`) || "{}") as Palette)
    .pictureData.find((picture: PictureData) => picture.id === imageId) || undefined,
);

const imageAtomPersist = (groupId: string, imageId: string) => atom(
    (get) => get(imageAtom(groupId, imageId)),
    (get, set, update: PictureData) => {
        const palette = get(paletteAtom(groupId));
        palette.pictureData.push(update);
        localStorage.setItem(`chocolor-palette-${groupId}`, JSON.stringify(palette));
        set(imageAtom(groupId, imageId), update);
    },
);

export { groupAtom, groupAtomPersist, paletteAtom, paletteAtomPersist, imageAtom, imageAtomPersist };