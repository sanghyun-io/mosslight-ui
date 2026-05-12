import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../index";

const meta = {
  title: "Mosslight/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Pack lantern",
    hint: "Recommended for late routes.",
    defaultChecked: true,
  },
};
