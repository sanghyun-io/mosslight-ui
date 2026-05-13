import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Select } from "../index";

const meta = {
  title: "Mosslight/Form States",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FieldStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", minWidth: "20rem" }}>
      <Field label="Traveler" hint="Printed on the travel pass." required />
      <Field label="Guild ID" error="Guild ID is required." required />
      <Select
        label="Region"
        hint="Choose a starting route."
        defaultValue="north"
        options={[
          { label: "North ridge", value: "north" },
          { label: "Lake village", value: "lake" },
        ]}
      />
    </div>
  ),
};
