// Replace entire file with simplified story implementation
import type { Meta, StoryObj, Decorator } from "@storybook/react";
import { ColorPalette } from "./color-palette";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as JotaiProvider, createStore } from "jotai";
import { imagePaletteAtom } from "app/state/palette";

// 共通パレットデータ
const samplePalette = [
  { before: "#ff0000", after: "#ff0000" },
  { before: "#00ff00", after: "#00ff00" },
  { before: "#0000ff", after: "#0000ff" },
  { before: "#ffff00", after: "#777777" },
  { before: "#00ffff", after: "#000000" },
  { before: "#ff00ff", after: "#ffffff" },
] as const;

const baseImageId = "storybook-image";


const meta: Meta<typeof ColorPalette> = {
  title: "root/ColorPalette",
  component: ColorPalette,
  args: {
    imageId: baseImageId,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ColorPalette コンポーネント。before / after の色を並べて表示する UI を確認できます。",
      },
    },
  },
};
export default meta;
export type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {
  args: {
    imageId: baseImageId,
  },
  parameters: {
    jotai: {
      atoms: {
        palette: imagePaletteAtom(baseImageId),
      },
      values: {
        palette: {
          id: baseImageId,
          name: "storybook-img",
          imagePath: "https://picsum.photos/200/200?random=1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          palette: samplePalette,
        },
      },
    },
  },
};

export const EmptyPalette: Story = {
  args: {
    imageId: "empty-img",
  },
  parameters: {
    jotai: {
      atoms: {
        palette: imagePaletteAtom("empty-img"),
      },
      values: {
        palette: {
          id: "empty-img",
          name: "empty",
          imagePath: "https://picsum.photos/200/200?random=2",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          palette: [],
        },
      },
    },
  },
};

