import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "../index";

const meta = {
  title: "Mosslight/Separator",
  component: Separator,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", minWidth: "18rem" }}>
      <span>Before</span>
      <Separator />
      <span>After</span>
    </div>
  ),
};
