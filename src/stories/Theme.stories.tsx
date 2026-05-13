import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, Button, Card, Field, Select, Switch } from "../index";

const meta = {
  title: "Mosslight/Theming",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DarkCompact: Story = {
  render: () => (
    <div data-ms-theme="dark" data-ms-density="compact" style={{ padding: "1.25rem", background: "var(--ms-surface-page)" }}>
      <Card accent="sky" style={{ minWidth: "22rem" }}>
        <Alert title="Night route" tone="sky">
          Semantic tokens keep the same component API across themes.
        </Alert>
        <Field label="Traveler" placeholder="Fern" />
        <Select
          label="Region"
          defaultValue="woods"
          options={[
            { label: "Old woods", value: "woods" },
            { label: "Lake village", value: "lake" },
          ]}
        />
        <Switch label="Campfire mode" defaultChecked />
        <Button>Save route</Button>
      </Card>
    </div>
  ),
};
