import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../index";

const meta = {
  title: "Mosslight/Progress",
  component: Progress,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Map copied",
    value: 68,
  },
};
