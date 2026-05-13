import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  Field,
  Progress,
  RadioGroup,
  Select,
  Switch,
  Tabs,
} from "../index";

const meta = {
  title: "Mosslight/Patterns",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsPanel: Story = {
  render: () => (
    <div className="pattern-grid">
      <Card accent="sky" className="pattern-panel">
        <div className="pattern-header">
          <div>
            <Badge tone="sky">Workspace</Badge>
            <h2>Route settings</h2>
          </div>
          <Switch label="Sync" defaultChecked />
        </div>
        <Field label="Route name" defaultValue="Northern ridge" />
        <Select
          label="Default region"
          defaultValue="lake"
          options={[
            { label: "Lake village", value: "lake" },
            { label: "Old woods", value: "woods" },
            { label: "Amber road", value: "amber" },
          ]}
        />
        <RadioGroup
          label="Density"
          name="settings-density"
          defaultValue="compact"
          options={[
            { label: "Compact", value: "compact" },
            { label: "Comfortable", value: "comfortable" },
          ]}
        />
        <div className="pattern-actions">
          <Button variant="ghost">Reset</Button>
          <Button>Save</Button>
        </div>
      </Card>
      <Card accent="moss" className="pattern-panel">
        <Badge>Signals</Badge>
        <Alert title="Quiet mode enabled" tone="moss">
          Low-contrast surfaces keep repeated settings work calm.
        </Alert>
        <Progress label="Preparation" value={72} />
        <Checkbox label="Notify after sync" hint="Send one summary when the route updates." defaultChecked />
      </Card>
    </div>
  ),
};

export const ProfileForm: Story = {
  render: () => (
    <Card accent="plum" className="pattern-form">
      <div className="pattern-profile">
        <Avatar name="Fern" size="lg" />
        <div>
          <Badge tone="plum">Traveler</Badge>
          <h2>Profile</h2>
        </div>
      </div>
      <div className="pattern-fields">
        <Field label="Display name" defaultValue="Fern" required />
        <Field label="Handle" defaultValue="@fern" hint="Shown in shared route notes." />
      </div>
      <Select
        label="Role"
        defaultValue="mage"
        options={[
          { label: "Mage", value: "mage" },
          { label: "Scout", value: "scout" },
          { label: "Archivist", value: "archivist" },
        ]}
      />
      <Tabs
        items={[
          { label: "Notes", value: "notes", content: "Keeps route summaries short and readable." },
          { label: "Access", value: "access", content: "Shares drafts with the traveling party only." },
        ]}
      />
      <div className="pattern-actions">
        <Button variant="ghost">Cancel</Button>
        <Button>Update profile</Button>
      </div>
    </Card>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="pattern-form">
        <Alert title="Draft route ready" tone="amber">
          Review the route before sending it to the party.
        </Alert>
        <Button onClick={() => setOpen(true)}>Review route</Button>
        <Dialog
          open={open}
          title="Send route"
          description="This shares the latest route notes with the party."
          onOpenChange={setOpen}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Keep editing
              </Button>
              <Button onClick={() => setOpen(false)}>Send route</Button>
            </>
          }
        >
          <div className="pattern-stack">
            <Alert title="Three stops included" tone="sky">
              Lake village, old woods, and the northern ridge are ready.
            </Alert>
            <Checkbox label="Include weather notes" defaultChecked />
          </div>
        </Dialog>
      </div>
    );
  },
};
