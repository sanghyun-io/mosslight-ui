import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "../index";

const meta = {
  title: "Mosslight/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Loading map",
    size: "lg",
  },
};
