import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "../index";

const meta = {
  title: "Mosslight/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { title: "Morning route", value: "morning", content: "Check the ridge path before the fog lifts." },
      { title: "Evening route", value: "evening", content: "Return through the lantern road after sunset." },
    ],
  },
};
