import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  Leaf,
  Moon,
  Package,
  Palette,
  Sparkles,
  Sun,
  Wand2,
} from "lucide-react";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Dialog,
  Field,
  Pagination,
  Progress,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Toast,
  ToastViewport,
  Tooltip,
} from "./index";

type Page = "home" | "components" | "patterns" | "tokens" | "install";

const pages: Array<{ label: string; value: Page }> = [
  { label: "Home", value: "home" },
  { label: "Components", value: "components" },
  { label: "Patterns", value: "patterns" },
  { label: "Tokens", value: "tokens" },
  { label: "Install", value: "install" },
];

type ComponentTone = "moss" | "sky" | "amber" | "plum";

type ComponentMeta = {
  id: string;
  label: string;
  group: "Actions" | "Forms" | "Structure" | "Feedback";
  tone: ComponentTone;
  summary: string;
  features: string[];
};

const componentCatalog: ComponentMeta[] = [
  {
    id: "button",
    label: "Button",
    group: "Actions",
    tone: "moss",
    summary: "Primary, secondary, ghost, danger variants with icon and size support.",
    features: ["Variants", "Sizes", "Icons"],
  },
  {
    id: "badge",
    label: "Badge",
    group: "Actions",
    tone: "moss",
    summary: "Compact status labels for categories, tags, and state hints.",
    features: ["Tone variants", "Inline rhythm", "High-contrast border"],
  },
  {
    id: "tooltip",
    label: "Tooltip",
    group: "Actions",
    tone: "moss",
    summary: "Small contextual notes for icon-only or compact controls.",
    features: ["Hover content", "Keyboard focus", "Compact placement"],
  },
  {
    id: "toast",
    label: "Toast",
    group: "Actions",
    tone: "moss",
    summary: "Non-blocking status feedback with title, body, and optional action.",
    features: ["Tone variants", "Viewport wrapper", "Action slot"],
  },
  {
    id: "field",
    label: "Field",
    group: "Forms",
    tone: "sky",
    summary: "Text input with label, hint, error, disabled, and required states.",
    features: ["Hint text", "Error state", "Required marker"],
  },
  {
    id: "select",
    label: "Select",
    group: "Forms",
    tone: "sky",
    summary: "Native select styling with the same form control system as Field.",
    features: ["Options", "Hint text", "Error state"],
  },
  {
    id: "checkbox",
    label: "Checkbox",
    group: "Forms",
    tone: "sky",
    summary: "Checkbox control with label and helper text for small decisions.",
    features: ["Checked state", "Hint text", "Disabled state"],
  },
  {
    id: "switch",
    label: "Switch",
    group: "Forms",
    tone: "sky",
    summary: "Binary setting control for preferences and feature toggles.",
    features: ["On/off state", "Label support", "Keyboard input"],
  },
  {
    id: "radio-group",
    label: "RadioGroup",
    group: "Forms",
    tone: "sky",
    summary: "Grouped single-choice selection with shared label and name.",
    features: ["Default value", "Controlled value", "Grouped semantics"],
  },
  {
    id: "slider",
    label: "Slider",
    group: "Forms",
    tone: "sky",
    summary: "Range input for numeric tuning with visible output text.",
    features: ["Min/max", "Controlled value", "Output label"],
  },
  {
    id: "card",
    label: "Card",
    group: "Structure",
    tone: "amber",
    summary: "Framed content surface with accent color support.",
    features: ["Accent variants", "Article semantics", "Stacked content"],
  },
  {
    id: "accordion",
    label: "Accordion",
    group: "Structure",
    tone: "amber",
    summary: "Collapsible disclosure sections with keyboard navigation.",
    features: ["Default open item", "Collapsible mode", "Arrow key support"],
  },
  {
    id: "tabs",
    label: "Tabs",
    group: "Structure",
    tone: "amber",
    summary: "Tabbed sections for switching related panels in one surface.",
    features: ["Automatic/manual activation", "Keyboard navigation", "Panel linkage"],
  },
  {
    id: "breadcrumb",
    label: "Breadcrumb",
    group: "Structure",
    tone: "amber",
    summary: "Hierarchical path display for multi-level app screens.",
    features: ["Current page", "Custom separator", "Link props"],
  },
  {
    id: "pagination",
    label: "Pagination",
    group: "Structure",
    tone: "amber",
    summary: "Page navigation control with previous, next, and numbered pages.",
    features: ["Controlled page", "Disabled edges", "Page buttons"],
  },
  {
    id: "separator",
    label: "Separator",
    group: "Structure",
    tone: "amber",
    summary: "Horizontal or vertical divider for dense tool surfaces.",
    features: ["Orientation", "Decorative mode", "ARIA separator mode"],
  },
  {
    id: "alert",
    label: "Alert",
    group: "Feedback",
    tone: "plum",
    summary: "Persistent message block for warnings, success, and status context.",
    features: ["Title", "Icon slot", "Tone variants"],
  },
  {
    id: "dialog",
    label: "Dialog",
    group: "Feedback",
    tone: "plum",
    summary: "Modal surface with title, description, footer, and focus return behavior.",
    features: ["Controlled open", "Footer actions", "Escape close"],
  },
  {
    id: "progress",
    label: "Progress",
    group: "Feedback",
    tone: "plum",
    summary: "Linear progress meter for loading, completion, and readiness states.",
    features: ["Value/max", "Optional label", "ARIA progressbar"],
  },
  {
    id: "skeleton",
    label: "Skeleton",
    group: "Feedback",
    tone: "plum",
    summary: "Placeholder blocks for loading text and content regions.",
    features: ["Text variant", "Block variant", "Reduced layout shift"],
  },
  {
    id: "spinner",
    label: "Spinner",
    group: "Feedback",
    tone: "plum",
    summary: "Compact loading indicator with accessible label text.",
    features: ["Sizes", "Accessible label", "Inline use"],
  },
  {
    id: "avatar",
    label: "Avatar",
    group: "Feedback",
    tone: "plum",
    summary: "User image or initials for people, authors, and account surfaces.",
    features: ["Image fallback", "Initials", "Sizes"],
  },
];

const tokens = [
  ["Parchment", "var(--ms-color-parchment)"],
  ["Paper", "var(--ms-color-paper)"],
  ["Moss", "var(--ms-color-moss-500)"],
  ["Sky", "var(--ms-color-sky-400)"],
  ["Plum", "var(--ms-color-plum-500)"],
  ["Amber", "var(--ms-color-amber-400)"],
  ["Rose", "var(--ms-color-rose-500)"],
  ["Ink", "var(--ms-color-ink-800)"],
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [dark, setDark] = useState(() => {
    const stored = window.localStorage.getItem("mosslight-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(2);
  const [glow, setGlow] = useState(68);

  useEffect(() => {
    window.localStorage.setItem("mosslight-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <main className="site-shell" data-ms-theme={dark ? "dark" : undefined}>
      <header className="site-header">
        <button className="site-brand" type="button" onClick={() => setPage("home")}>
          <span className="site-brand__mark" aria-hidden="true">
            <Leaf size={18} />
          </span>
          <span>Mosslight UI</span>
        </button>

        <nav className="site-nav" aria-label="Primary navigation">
          {pages.map((item) => (
            <button
              className="site-nav__item"
              type="button"
              key={item.value}
              aria-current={page === item.value ? "page" : undefined}
              onClick={() => setPage(item.value)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Button
          variant="ghost"
          icon={dark ? <Sun size={16} /> : <Moon size={16} />}
          aria-label={dark ? "Use light theme" : "Use dark theme"}
          onClick={() => setDark((value) => !value)}
        >
          {dark ? "Light" : "Dark"}
        </Button>
      </header>

      {page === "home" ? <HomePage setPage={setPage} /> : null}
      {page === "components" ? (
        <ComponentsPage
          dialogOpen={dialogOpen}
          glow={glow}
          paginationPage={paginationPage}
          setDialogOpen={setDialogOpen}
          setGlow={setGlow}
          setPaginationPage={setPaginationPage}
        />
      ) : null}
      {page === "patterns" ? <PatternsPage /> : null}
      {page === "tokens" ? <TokensPage /> : null}
      {page === "install" ? <InstallPage /> : null}
    </main>
  );
}

function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <Badge tone="moss">React UI primitives</Badge>
          <h1>Quiet fantasy interfaces with a hand-painted anime mood.</h1>
          <p>
            Mosslight UI is a compact component library for soft product surfaces:
            moss fields, pale sky, inked borders, luminous feedback, and calm
            interaction states without copying a specific character or frame.
          </p>
          <div className="hero-actions">
            <Button icon={<Package size={16} />} onClick={() => setPage("install")}>
              npm install mosslight-ui
            </Button>
            <Button variant="secondary" icon={<Sparkles size={16} />} onClick={() => setPage("components")}>
              Explore components
            </Button>
          </div>
        </div>

        <div className="anime-stage" aria-label="Mosslight illustrated interface preview">
          <div className="anime-stage__wash" />
          <div className="anime-stage__cloud anime-stage__cloud--one" />
          <div className="anime-stage__cloud anime-stage__cloud--two" />
          <div className="anime-stage__sun" />
          <div className="anime-stage__ridge anime-stage__ridge--far" />
          <div className="anime-stage__ridge anime-stage__ridge--near" />
          <div className="anime-stage__grass" />
          <div className="anime-window">
            <div className="anime-window__bar">
              <span />
              <span />
              <span />
            </div>
            <div className="anime-window__body">
              <Badge tone="amber">Journey panel</Badge>
              <h2>Field journal</h2>
              <p>Compact controls with readable rhythm and soft feedback.</p>
              <Progress value={72} label="Readiness" />
              <div className="anime-window__actions">
                <Button size="sm" icon={<Check size={14} />}>
                  Save
                </Button>
                <Button size="sm" variant="secondary" icon={<Wand2 size={14} />}>
                  Tune
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band feature-grid">
        <FeatureCard title="Public landing first" icon={<Palette size={18} />}>
          A product-style site, not Storybook as the face of the library.
        </FeatureCard>
        <FeatureCard title="Dark mode built in" icon={<Moon size={18} />}>
          Theme tokens switch between parchment daylight and quiet night surfaces.
        </FeatureCard>
        <FeatureCard title="Component catalog" icon={<Package size={18} />}>
          Dedicated pages show primitives, patterns, tokens, and install details.
        </FeatureCard>
      </section>
    </>
  );
}

function ComponentsPage({
  dialogOpen,
  glow,
  paginationPage,
  setDialogOpen,
  setGlow,
  setPaginationPage,
}: {
  dialogOpen: boolean;
  glow: number;
  paginationPage: number;
  setDialogOpen: (open: boolean) => void;
  setGlow: (value: number) => void;
  setPaginationPage: (page: number) => void;
}) {
  const [activeComponent, setActiveComponent] = useState(componentCatalog[0].id);
  const selectedComponent =
    componentCatalog.find((component) => component.id === activeComponent) ?? componentCatalog[0];
  const groups = Array.from(new Set(componentCatalog.map((component) => component.group)));

  return (
    <section className="page-shell">
      <PageHeading
        eyebrow="Components"
        title="Browse each primitive one at a time."
        body="Pick a component from the left panel, inspect its core behavior, then compare it with a composed product example."
      />

      <div className="component-browser">
        <aside className="component-sidebar" aria-label="Component list">
          <div className="component-sidebar__intro">
            <Badge tone="moss">Catalog</Badge>
            <p>{componentCatalog.length} primitives</p>
          </div>
          {groups.map((group) => (
            <div className="component-menu-group" key={group}>
              <h2>{group}</h2>
              <div className="component-menu">
                {componentCatalog
                  .filter((component) => component.group === group)
                  .map((component) => (
                    <button
                      className="component-menu__item"
                      type="button"
                      key={component.id}
                      aria-current={selectedComponent.id === component.id ? "true" : undefined}
                      onClick={() => setActiveComponent(component.id)}
                    >
                      <span>{component.label}</span>
                      <small>{component.features[0]}</small>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </aside>

        <div className="component-main">
          <Card accent={selectedComponent.tone} className="component-detail-card">
            <div className="component-detail__header">
              <div>
                <Badge tone={selectedComponent.tone}>{selectedComponent.group}</Badge>
                <h2>{selectedComponent.label}</h2>
                <p>{selectedComponent.summary}</p>
              </div>
            </div>

            <div className="component-demo-surface">
              {renderComponentDemo(selectedComponent.id, {
                dialogOpen,
                glow,
                paginationPage,
                setDialogOpen,
                setGlow,
                setPaginationPage,
              })}
            </div>

            <div className="component-feature-list" aria-label={`${selectedComponent.label} features`}>
              {selectedComponent.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </Card>

          <CompositeExample
            dialogOpen={dialogOpen}
            glow={glow}
            paginationPage={paginationPage}
            setDialogOpen={setDialogOpen}
            setGlow={setGlow}
            setPaginationPage={setPaginationPage}
          />
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        title="Confirm journey"
        description="A modal primitive with escape handling, focus return, and outside click behavior."
        onOpenChange={setDialogOpen}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="dialog-copy">
          Dialogs keep the fantasy visual system, but still behave like predictable product UI.
        </p>
      </Dialog>
    </section>
  );
}

function renderComponentDemo(
  id: string,
  state: {
    dialogOpen: boolean;
    glow: number;
    paginationPage: number;
    setDialogOpen: (open: boolean) => void;
    setGlow: (value: number) => void;
    setPaginationPage: (page: number) => void;
  },
) {
  switch (id) {
    case "button":
      return (
        <div className="demo-row">
          <Button icon={<Check size={16} />}>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      );
    case "badge":
      return (
        <div className="demo-row">
          <Badge tone="moss">Moss</Badge>
          <Badge tone="sky">Sky</Badge>
          <Badge tone="amber">Amber</Badge>
          <Badge tone="plum">Plum</Badge>
        </div>
      );
    case "tooltip":
      return (
        <Tooltip content="Soft contextual copy for compact controls.">
          <button className="utility-help" type="button">
            ?
          </button>
        </Tooltip>
      );
    case "toast":
      return (
        <ToastViewport>
          <Toast title="Journey saved" tone="plum" action={<Button size="sm">Undo</Button>}>
            Quiet messages, soft contrast, no harsh flashes.
          </Toast>
        </ToastViewport>
      );
    case "field":
      return (
        <div className="demo-stack">
          <Field label="Traveler" placeholder="Fern" hint="Clear focus, compact spacing." />
          <Field label="Route code" value="north-07" error="Route is already assigned." readOnly />
        </div>
      );
    case "select":
      return (
        <Select
          label="Region"
          defaultValue="lake"
          hint="Native select, styled with Mosslight tokens."
          options={[
            { label: "Lake village", value: "lake" },
            { label: "North ridge", value: "north" },
            { label: "Old woods", value: "woods" },
          ]}
        />
      );
    case "checkbox":
      return (
        <div className="demo-stack">
          <Checkbox label="Remember route" hint="Small helper text remains legible." defaultChecked />
          <Checkbox label="Require review" />
        </div>
      );
    case "switch":
      return (
        <div className="demo-stack">
          <Switch label="Campfire mode" defaultChecked />
          <Switch label="Reduce motion" />
        </div>
      );
    case "radio-group":
      return (
        <RadioGroup
          label="Density"
          name="component-density"
          defaultValue="comfortable"
          options={[
            { label: "Compact", value: "compact" },
            { label: "Comfortable", value: "comfortable" },
            { label: "Spacious", value: "spacious" },
          ]}
        />
      );
    case "slider":
      return (
        <Slider
          label="Ambient glow"
          min={20}
          max={100}
          value={state.glow}
          output={`${state.glow}%`}
          onChange={(event) => state.setGlow(Number(event.currentTarget.value))}
        />
      );
    case "card":
      return (
        <div className="demo-card-grid">
          <Card accent="moss">
            <Badge tone="moss">Moss</Badge>
            <p>Grounded surface for settings and actions.</p>
          </Card>
          <Card accent="plum">
            <Badge tone="plum">Plum</Badge>
            <p>Soft feedback surface for status messages.</p>
          </Card>
        </div>
      );
    case "accordion":
      return (
        <Accordion
          items={[
            { title: "Install package", value: "install", content: "Import the React component and CSS bundle." },
            { title: "Pick tokens", value: "tokens", content: "Start with surface, text, accent, and focus tokens." },
            { title: "Compose screens", value: "compose", content: "Use primitives for forms, modals, and feedback." },
          ]}
        />
      );
    case "tabs":
      return (
        <Tabs
          items={[
            { label: "Light", value: "light", content: "Parchment surfaces, moss actions, sky focus." },
            { label: "Dark", value: "dark", content: "Muted ink surfaces with luminous accent tokens." },
            { label: "Motion", value: "motion", content: "Restrained ambient transitions for quiet product screens." },
          ]}
        />
      );
    case "breadcrumb":
      return (
        <Breadcrumb
          items={[
            { label: "Mosslight", href: "#" },
            { label: "Components", href: "#" },
            { label: "Breadcrumb", current: true },
          ]}
        />
      );
    case "pagination":
      return (
        <Pagination
          page={state.paginationPage}
          totalPages={5}
          onPageChange={state.setPaginationPage}
        />
      );
    case "separator":
      return (
        <div className="separator-demo">
          <span>Before</span>
          <Separator orientation="vertical" decorative />
          <span>After</span>
        </div>
      );
    case "alert":
      return (
        <Alert title="Draft saved" tone="plum" icon={<Sparkles size={18} />}>
          Persistent status context stays close to the affected surface.
        </Alert>
      );
    case "dialog":
      return (
        <Button variant="secondary" onClick={() => state.setDialogOpen(true)}>
          Open dialog
        </Button>
      );
    case "progress":
      return <Progress value={72} label="Readiness" />;
    case "skeleton":
      return (
        <div className="demo-stack">
          <Skeleton variant="text" />
          <Skeleton variant="block" />
        </div>
      );
    case "spinner":
      return <Spinner label="Loading preview" size="lg" />;
    case "avatar":
      return (
        <div className="demo-row">
          <Avatar name="Fern Vale" size="sm" />
          <Avatar name="Stark North" />
          <Avatar name="Moss Sage" size="lg" />
        </div>
      );
    default:
      return null;
  }
}

function CompositeExample({
  glow,
  paginationPage,
  setDialogOpen,
  setGlow,
  setPaginationPage,
}: {
  dialogOpen: boolean;
  glow: number;
  paginationPage: number;
  setDialogOpen: (open: boolean) => void;
  setGlow: (value: number) => void;
  setPaginationPage: (page: number) => void;
}) {
  return (
    <Card accent="moss" className="composite-card">
      <div className="component-detail__header">
        <div>
          <Badge tone="moss">Combined example</Badge>
          <h2>Journey settings panel</h2>
          <p>Several primitives working together as one app surface.</p>
        </div>
        <Avatar name="Fern Vale" />
      </div>

      <div className="composite-layout">
        <div className="stack">
          <Field label="Traveler" placeholder="Fern" hint="Shared form spacing." />
          <Select
            label="Region"
            defaultValue="lake"
            options={[
              { label: "Lake village", value: "lake" },
              { label: "North ridge", value: "north" },
              { label: "Old woods", value: "woods" },
            ]}
          />
          <Checkbox label="Remember route" defaultChecked />
          <Switch label="Campfire mode" defaultChecked />
        </div>

        <div className="stack">
          <Alert title="Draft saved" tone="plum" icon={<Sparkles size={18} />}>
            Feedback, actions, and form controls share the same token system.
          </Alert>
          <Slider
            label="Ambient glow"
            min={20}
            max={100}
            value={glow}
            output={`${glow}%`}
            onChange={(event) => setGlow(Number(event.currentTarget.value))}
          />
          <Progress value={glow} label="Mood balance" />
          <Pagination page={paginationPage} totalPages={4} onPageChange={setPaginationPage} />
          <div className="demo-row">
            <Button icon={<Check size={16} />}>Save</Button>
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>
              Review
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PatternsPage() {
  return (
    <section className="page-shell">
      <PageHeading
        eyebrow="Patterns"
        title="Reusable compositions for settings, onboarding, and decision points."
        body="These are the screens a library site needs before people decide whether to install it."
      />

      <div className="pattern-grid">
        <Card accent="moss">
          <Badge tone="moss">Settings</Badge>
          <h3>Theme controls</h3>
          <div className="stack">
            <Switch label="Reduce motion" />
            <Switch label="High contrast borders" defaultChecked />
            <Checkbox label="Use compact density" hint="Useful for admin and dashboard surfaces." />
          </div>
        </Card>

        <Card accent="sky">
          <Badge tone="sky">Onboarding</Badge>
          <h3>Route setup</h3>
          <Breadcrumb
            items={[
              { label: "Mosslight", href: "#" },
              { label: "Patterns", href: "#" },
              { label: "Onboarding", current: true },
            ]}
          />
          <Accordion
            items={[
              { title: "Install package", value: "install", content: "Import the React component and the CSS bundle." },
              { title: "Pick tokens", value: "tokens", content: "Start with surface, text, accent, and focus tokens." },
              { title: "Compose screens", value: "compose", content: "Use primitives for forms, modals, and feedback." },
            ]}
          />
        </Card>

        <Card accent="amber">
          <Badge tone="amber">Decision</Badge>
          <h3>Release checklist</h3>
          <Alert title="Ready for app UI" tone="amber">
            Best suited for dashboards, small tools, and narrative product surfaces.
          </Alert>
          <Tabs
            items={[
              { label: "Light", value: "light", content: "Parchment surfaces, moss actions, sky focus." },
              { label: "Dark", value: "dark", content: "Muted ink surfaces with luminous accent tokens." },
            ]}
          />
        </Card>
      </div>
    </section>
  );
}

function TokensPage() {
  return (
    <section className="page-shell">
      <PageHeading
        eyebrow="Tokens"
        title="A stronger palette for hand-painted interface atmosphere."
        body="Warm neutrals are now balanced with ink, moss, sky, plum, amber, and rose so the page feels less generic."
      />
      <div className="token-grid">
        {tokens.map(([name, color]) => (
          <div className="token-swatch" key={name}>
            <span style={{ background: color }} />
            <strong>{name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function InstallPage() {
  return (
    <section className="page-shell install-page">
      <PageHeading
        eyebrow="Install"
        title="Published on npm and ready to import."
        body="The package ships JavaScript, CommonJS, TypeScript declarations, and a CSS entry for the token/component layer."
      />
      <div className="install-grid">
        <div className="code-panel">
          <Copy size={16} />
          <code>npm install mosslight-ui</code>
        </div>
        <div className="code-panel">
          <Copy size={16} />
          <code>import "mosslight-ui/styles.css"</code>
        </div>
        <a className="ms-button ms-button--secondary ms-button--md" href="https://www.npmjs.com/package/mosslight-ui">
          <span className="ms-button__icon">
            <ArrowRight size={16} />
          </span>
          <span className="ms-button__label">npm package</span>
        </a>
        <a className="ms-button ms-button--ghost ms-button--md" href="https://github.com/sanghyun-io/mosslight-ui">
          <span className="ms-button__icon">
            <Github size={16} />
          </span>
          <span className="ms-button__label">GitHub repo</span>
        </a>
      </div>
    </section>
  );
}

function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

function FeatureCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Card accent="sky">
      <div className="feature-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </Card>
  );
}

export default App;
