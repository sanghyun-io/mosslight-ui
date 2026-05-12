import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../index";

const meta = {
  title: "Mosslight/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <Skeleton variant="text" />
      <Skeleton variant="block" />
    </div>
  ),
};
