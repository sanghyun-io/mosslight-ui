import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Tooltip } from "../index";

const meta = {
  title: "Mosslight/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    content: "Save this route for the evening watch.",
    children: <Button>Save</Button>,
  },
  render: () => (
    <Tooltip content="Save this route for the evening watch.">
      <Button>Save</Button>
    </Tooltip>
  ),
};
