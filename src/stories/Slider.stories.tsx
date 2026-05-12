import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../index";

const meta = {
  title: "Mosslight/Slider",
  component: Slider,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Warmth",
    output: "70%",
    defaultValue: 70,
  },
};
