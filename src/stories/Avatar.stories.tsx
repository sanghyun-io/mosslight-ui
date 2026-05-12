import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../index";

const meta = {
  title: "Mosslight/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: {
    name: "Fern Vale",
    size: "lg",
  },
};
