import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "../index";

const meta = {
  title: "Mosslight/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { label: "Library", href: "#" },
      { label: "Components", href: "#" },
      { label: "Breadcrumb" },
    ],
  },
};
