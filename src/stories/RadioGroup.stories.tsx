import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "../index";

const meta = {
  title: "Mosslight/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Route",
    name: "route",
    defaultValue: "lake",
    options: [
      { label: "North ridge", value: "north" },
      { label: "Lake village", value: "lake" },
      { label: "Old woods", value: "woods" },
    ],
  },
};
