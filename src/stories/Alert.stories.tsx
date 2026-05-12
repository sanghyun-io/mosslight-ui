import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../index";

const meta = {
  title: "Mosslight/Alert",
  component: Alert,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Path updated",
    children: "The lake road is clear and safe for the afternoon route.",
  },
};

export const Warning: Story = {
  args: {
    title: "Storm warning",
    tone: "danger",
    children: "Move supplies indoors before the night watch begins.",
  },
};
