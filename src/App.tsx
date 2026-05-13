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

type PlaygroundValue = string | number | boolean;

type PlaygroundProps = Record<string, PlaygroundValue>;

const defaultPlaygroundProps: PlaygroundProps = {
  action: true,
  activationMode: "automatic",
  accent: "moss",
  checked: true,
  collapsible: true,
  decorative: true,
  disabled: false,
  error: false,
  hasHint: true,
  hasIcon: true,
  hasImage: false,
  hasLabel: true,
  hasFooter: true,
  closeOnEscape: true,
  closeOnInteractOutside: true,
  max: 100,
  orientation: "horizontal",
  page: 2,
  required: false,
  separator: "/",
  size: "md",
  skeletonVariant: "block",
  tone: "moss",
  totalPages: 5,
  value: 72,
  variant: "primary",
  choice: "comfortable",
  alertTone: "plum",
  loadingLabel: "Loading preview",
  tooltipCopy: "Soft hint",
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
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);
  const selectedComponent =
    componentCatalog.find((component) => component.id === activeComponent) ?? componentCatalog[0];
  const groups = Array.from(new Set(componentCatalog.map((component) => component.group)));
  const setPlaygroundProp = (name: string, value: PlaygroundValue) => {
    setPlaygroundProps((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="page-shell">
      <PageHeading
        eyebrow="Components"
        title="Browse each primitive one at a time."
        body="Pick a component from the left panel, inspect its base example, then change props to see the output update."
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

          <PropsPlayground
            component={selectedComponent}
            props={playgroundProps}
            setProp={setPlaygroundProp}
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
          <Avatar name="North Guard" />
          <Avatar name="Moss Sage" size="lg" />
        </div>
      );
    default:
      return null;
  }
}

function PropsPlayground({
  component,
  props,
  setProp,
}: {
  component: ComponentMeta;
  props: PlaygroundProps;
  setProp: (name: string, value: PlaygroundValue) => void;
}) {
  const [playgroundDialogOpen, setPlaygroundDialogOpen] = useState(false);
  const playground = getPlayground(component.id, props, setProp, playgroundDialogOpen, setPlaygroundDialogOpen);
  const code = getPlaygroundCode(component.id, props);
  const controls = Array.isArray(playground.controls)
    ? playground.controls.map((control, index) => (
        <div className="prop-control-slot" key={`${component.id}-${index}`}>
          {control}
        </div>
      ))
    : playground.controls;

  return (
    <Card accent={component.tone} className="prop-playground-card">
      <div className="component-detail__header">
        <div>
          <Badge tone={component.tone}>Props playground</Badge>
          <h2>{component.label} props</h2>
          <p>Change one prop at a time and watch the preview update.</p>
        </div>
      </div>

      <div className="prop-playground">
        <div className="prop-controls">{controls}</div>
        <div className="prop-preview">
          <div className="prop-preview__label">Preview</div>
          <div className="prop-preview__stage">{playground.preview}</div>
        </div>
        <div className="prop-code">
          <div className="prop-preview__label">Code</div>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </Card>
  );
}

function getPlayground(
  id: string,
  props: PlaygroundProps,
  setProp: (name: string, value: PlaygroundValue) => void,
  dialogOpen: boolean,
  setDialogOpen: (open: boolean) => void,
) {
  const tone = String(props.tone) as ComponentTone;
  const accent = String(props.accent) as ComponentTone;
  const size = String(props.size) as "sm" | "md" | "lg";
  const value = Number(props.value);
  const max = Number(props.max);
  const totalPages = Number(props.totalPages);
  const page = Math.min(Number(props.page), totalPages);
  const hasLabel = Boolean(props.hasLabel);
  const alertTone = String(props.alertTone) as "moss" | "sky" | "amber" | "plum" | "danger";
  const controls: Record<string, ReactNode> = {
    action: <PropSwitch name="action" label="action" value={props.action} setProp={setProp} />,
    activationMode: (
      <PropSelect
        name="activationMode"
        label="activationMode"
        value={String(props.activationMode)}
        setProp={setProp}
        options={["automatic", "manual"]}
      />
    ),
    accent: (
      <PropSelect name="accent" label="accent" value={String(props.accent)} setProp={setProp} options={toneOptions} />
    ),
    checked: <PropSwitch name="checked" label="checked" value={props.checked} setProp={setProp} />,
    collapsible: <PropSwitch name="collapsible" label="collapsible" value={props.collapsible} setProp={setProp} />,
    decorative: <PropSwitch name="decorative" label="decorative" value={props.decorative} setProp={setProp} />,
    disabled: <PropSwitch name="disabled" label="disabled" value={props.disabled} setProp={setProp} />,
    error: <PropSwitch name="error" label="error" value={props.error} setProp={setProp} />,
    closeOnEscape: <PropSwitch name="closeOnEscape" label="closeOnEscape" value={props.closeOnEscape} setProp={setProp} />,
    closeOnInteractOutside: (
      <PropSwitch
        name="closeOnInteractOutside"
        label="closeOnInteractOutside"
        value={props.closeOnInteractOutside}
        setProp={setProp}
      />
    ),
    hasFooter: <PropSwitch name="hasFooter" label="footer" value={props.hasFooter} setProp={setProp} />,
    hasHint: <PropSwitch name="hasHint" label="hint" value={props.hasHint} setProp={setProp} />,
    hasIcon: <PropSwitch name="hasIcon" label="icon" value={props.hasIcon} setProp={setProp} />,
    hasImage: <PropSwitch name="hasImage" label="src" value={props.hasImage} setProp={setProp} />,
    hasLabel: <PropSwitch name="hasLabel" label="label" value={props.hasLabel} setProp={setProp} />,
    max: <PropSlider name="max" label="max" min={60} max={140} value={max} setProp={setProp} />,
    orientation: (
      <PropSelect
        name="orientation"
        label="orientation"
        value={String(props.orientation)}
        setProp={setProp}
        options={["horizontal", "vertical"]}
      />
    ),
    page: <PropSlider name="page" label="page" min={1} max={totalPages} value={page} setProp={setProp} />,
    required: <PropSwitch name="required" label="required" value={props.required} setProp={setProp} />,
    separator: (
      <PropSelect name="separator" label="separator" value={String(props.separator)} setProp={setProp} options={["/", ">", "-"]} />
    ),
    size: <PropSelect name="size" label="size" value={String(props.size)} setProp={setProp} options={["sm", "md", "lg"]} />,
    skeletonVariant: (
      <PropSelect
        name="skeletonVariant"
        label="variant"
        value={String(props.skeletonVariant)}
        setProp={setProp}
        options={["block", "text", "circle"]}
      />
    ),
    tone: <PropSelect name="tone" label="tone" value={String(props.tone)} setProp={setProp} options={toneOptions} />,
    alertTone: (
      <PropSelect
        name="alertTone"
        label="tone"
        value={String(props.alertTone)}
        setProp={setProp}
        options={alertToneOptions}
      />
    ),
    loadingLabel: (
      <PropSelect
        name="loadingLabel"
        label="label"
        value={String(props.loadingLabel)}
        setProp={setProp}
        options={["Loading preview", "Syncing route", "Preparing map"]}
      />
    ),
    tooltipCopy: (
      <PropSelect
        name="tooltipCopy"
        label="content"
        value={String(props.tooltipCopy)}
        setProp={setProp}
        options={["Soft hint", "Keyboard accessible", "Compact context"]}
      />
    ),
    totalPages: <PropSlider name="totalPages" label="totalPages" min={2} max={8} value={totalPages} setProp={setProp} />,
    value: <PropSlider name="value" label="value" min={0} max={max} value={Math.min(value, max)} setProp={setProp} />,
    variant: (
      <PropSelect
        name="variant"
        label="variant"
        value={String(props.variant)}
        setProp={setProp}
        options={["primary", "secondary", "ghost", "danger"]}
      />
    ),
    choice: (
      <PropSelect
        name="choice"
        label="value"
        value={String(props.choice)}
        setProp={setProp}
        options={["compact", "comfortable", "spacious"]}
      />
    ),
  };

  switch (id) {
    case "button":
      return {
        controls: [controls.variant, controls.size, controls.hasIcon, controls.disabled],
        preview: (
          <Button
            variant={String(props.variant) as "primary" | "secondary" | "ghost" | "danger"}
            size={size}
            disabled={Boolean(props.disabled)}
            icon={props.hasIcon ? <Wand2 size={16} /> : undefined}
          >
            Button
          </Button>
        ),
      };
    case "badge":
      return {
        controls: [controls.tone],
        preview: <Badge tone={tone}>Badge</Badge>,
      };
    case "tooltip":
      return {
        controls: [controls.tooltipCopy],
        preview: (
          <Tooltip content={String(props.tooltipCopy)}>
            <button className="utility-help" type="button">
              ?
            </button>
          </Tooltip>
        ),
      };
    case "toast":
      return {
        controls: [controls.tone, controls.action],
        preview: (
          <ToastViewport>
            <Toast title="Status updated" tone={tone} action={props.action ? <Button size="sm">Undo</Button> : undefined}>
              The action prop controls the trailing command slot.
            </Toast>
          </ToastViewport>
        ),
      };
    case "field":
      return {
        controls: [controls.required, controls.disabled, controls.hasHint, controls.error],
        preview: (
          <Field
            label="Traveler"
            placeholder="Fern"
            required={Boolean(props.required)}
            disabled={Boolean(props.disabled)}
            hint={props.hasHint ? "Hint text is controlled by the hint prop." : undefined}
            error={props.error ? "Error text changes the invalid state." : undefined}
          />
        ),
      };
    case "select":
      return {
        controls: [controls.choice, controls.required, controls.disabled, controls.hasHint, controls.error],
        preview: (
          <Select
            label="Region"
            required={Boolean(props.required)}
            disabled={Boolean(props.disabled)}
            hint={props.hasHint ? "Hint text is controlled by the hint prop." : undefined}
            error={props.error ? "Error text changes the invalid state." : undefined}
            value={String(props.choice)}
            onChange={(event) => setProp("choice", event.currentTarget.value)}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Comfortable", value: "comfortable" },
              { label: "Spacious", value: "spacious" },
            ]}
          />
        ),
      };
    case "checkbox":
      return {
        controls: [controls.checked, controls.disabled, controls.hasHint],
        preview: (
          <Checkbox
            label="Remember route"
            checked={Boolean(props.checked)}
            disabled={Boolean(props.disabled)}
            hint={props.hasHint ? "The hint prop renders helper text." : undefined}
            onChange={(event) => setProp("checked", event.currentTarget.checked)}
          />
        ),
      };
    case "switch":
      return {
        controls: [controls.checked, controls.disabled],
        preview: (
          <Switch
            label="Campfire mode"
            checked={Boolean(props.checked)}
            disabled={Boolean(props.disabled)}
            onChange={(event) => setProp("checked", event.currentTarget.checked)}
          />
        ),
      };
    case "radio-group":
      return {
        controls: [controls.choice, controls.disabled],
        preview: (
          <RadioGroup
            label="Density"
            name="playground-density"
            value={String(props.choice)}
            disabled={Boolean(props.disabled)}
            onChange={(event) => setProp("choice", event.currentTarget.value)}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Comfortable", value: "comfortable" },
              { label: "Spacious", value: "spacious" },
            ]}
          />
        ),
      };
    case "slider":
      return {
        controls: [controls.value, controls.max, controls.hasLabel],
        preview: (
          <Slider
            label="Ambient glow"
            min={0}
            max={max}
            value={Math.min(value, max)}
            output={props.hasLabel ? `${Math.min(value, max)} / ${max}` : undefined}
            onChange={(event) => setProp("value", Number(event.currentTarget.value))}
          />
        ),
      };
    case "card":
      return {
        controls: [controls.accent],
        preview: (
          <Card accent={accent}>
            <Badge tone={accent}>Card</Badge>
            <p>The accent prop changes the border and highlight tone.</p>
          </Card>
        ),
      };
    case "accordion":
      return {
        controls: [controls.collapsible, controls.choice],
        preview: (
          <Accordion
            key={`${props.collapsible}-${props.choice}`}
            collapsible={Boolean(props.collapsible)}
            defaultValue={String(props.choice)}
            items={[
              { title: "Compact", value: "compact", content: "defaultValue opens this item first." },
              { title: "Comfortable", value: "comfortable", content: "collapsible controls whether the open item can close." },
              { title: "Spacious", value: "spacious", content: "Keyboard movement still works across triggers." },
            ]}
          />
        ),
      };
    case "tabs":
      return {
        controls: [controls.orientation, controls.activationMode, controls.choice],
        preview: (
          <Tabs
            key={`${props.orientation}-${props.activationMode}-${props.choice}`}
            orientation={String(props.orientation) as "horizontal" | "vertical"}
            activationMode={String(props.activationMode) as "automatic" | "manual"}
            defaultValue={String(props.choice)}
            items={[
              { label: "Compact", value: "compact", content: "defaultValue selects the initial panel." },
              { label: "Comfortable", value: "comfortable", content: "orientation changes keyboard direction." },
              { label: "Spacious", value: "spacious", content: "manual activation waits for Enter or Space." },
            ]}
          />
        ),
      };
    case "breadcrumb":
      return {
        controls: [controls.separator],
        preview: (
          <Breadcrumb
            separator={String(props.separator)}
            items={[
              { label: "Mosslight", href: "#" },
              { label: "Components", href: "#" },
              { label: "Breadcrumb", current: true },
            ]}
          />
        ),
      };
    case "pagination":
      return {
        controls: [controls.totalPages, controls.page],
        preview: <Pagination page={page} totalPages={totalPages} onPageChange={(nextPage) => setProp("page", nextPage)} />,
      };
    case "separator":
      return {
        controls: [controls.orientation, controls.decorative],
        preview: (
          <div className="separator-demo">
            <span>Before</span>
            <Separator
              orientation={String(props.orientation) as "horizontal" | "vertical"}
              decorative={Boolean(props.decorative)}
            />
            <span>After</span>
          </div>
        ),
      };
    case "alert":
      return {
        controls: [controls.alertTone, controls.hasIcon],
        preview: (
          <Alert title="Draft saved" tone={alertTone} icon={props.hasIcon ? <Sparkles size={18} /> : undefined}>
            The tone and icon props reshape the same feedback message.
          </Alert>
        ),
      };
    case "dialog":
      return {
        controls: [controls.hasFooter, controls.hasHint, controls.closeOnEscape, controls.closeOnInteractOutside],
        preview: (
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>
              Open dialog
            </Button>
            <Dialog
              open={dialogOpen}
              title="Confirm journey"
              description={props.hasHint ? "description adds supporting copy below the title." : undefined}
              onOpenChange={setDialogOpen}
              closeOnEscape={Boolean(props.closeOnEscape)}
              closeOnInteractOutside={Boolean(props.closeOnInteractOutside)}
              footer={
                props.hasFooter ? (
                  <>
                    <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                  </>
                ) : undefined
              }
            >
              <p className="dialog-copy">Children render inside the dialog body.</p>
            </Dialog>
          </>
        ),
      };
    case "progress":
      return {
        controls: [controls.value, controls.max, controls.hasLabel],
        preview: <Progress value={Math.min(value, max)} max={max} label={hasLabel ? "Readiness" : undefined} />,
      };
    case "skeleton":
      return {
        controls: [controls.skeletonVariant],
        preview: <Skeleton variant={String(props.skeletonVariant) as "block" | "text" | "circle"} />,
      };
    case "spinner":
      return {
        controls: [controls.size, controls.loadingLabel],
        preview: <Spinner size={size} label={String(props.loadingLabel)} />,
      };
    case "avatar":
      return {
        controls: [controls.size, controls.hasImage],
        preview: (
          <Avatar
            name="Fern Vale"
            size={size}
            src={props.hasImage ? "https://github.com/sanghyun-io.png" : undefined}
          />
        ),
      };
    default:
      return { controls: null, preview: null };
  }
}

function getPlaygroundCode(id: string, props: PlaygroundProps) {
  const tone = String(props.tone);
  const accent = String(props.accent);
  const size = String(props.size);
  const value = Number(props.value);
  const max = Number(props.max);
  const totalPages = Number(props.totalPages);
  const page = Math.min(Number(props.page), totalPages);
  const boundedValue = Math.min(value, max);
  const choice = String(props.choice);
  const alertTone = String(props.alertTone);
  const hasHint = Boolean(props.hasHint);
  const hasIcon = Boolean(props.hasIcon);

  switch (id) {
    case "button":
      return jsxSnippet("Button", [
        stringProp("variant", String(props.variant)),
        stringProp("size", size),
        booleanProp("disabled", Boolean(props.disabled), false),
        hasIcon ? "icon={<Wand2 size={16} />}" : null,
      ], "Button");
    case "badge":
      return jsxSnippet("Badge", [stringProp("tone", tone)], "Badge");
    case "tooltip":
      return [
        `<Tooltip content="${escapeCode(String(props.tooltipCopy))}">`,
        `  <button type="button">?</button>`,
        `</Tooltip>`,
      ].join("\n");
    case "toast":
      return [
        `<ToastViewport>`,
        `  <Toast`,
        `    title="Status updated"`,
        `    tone="${tone}"`,
        Boolean(props.action) ? `    action={<Button size="sm">Undo</Button>}` : null,
        `  >`,
        `    The action prop controls the trailing command slot.`,
        `  </Toast>`,
        `</ToastViewport>`,
      ].filter(Boolean).join("\n");
    case "field":
      return jsxSnippet("Field", [
        `label="Traveler"`,
        `placeholder="Fern"`,
        booleanProp("required", Boolean(props.required), false),
        booleanProp("disabled", Boolean(props.disabled), false),
        hasHint ? `hint="Hint text is controlled by the hint prop."` : null,
        Boolean(props.error) ? `error="Error text changes the invalid state."` : null,
      ]);
    case "select":
      return [
        `<Select`,
        `  label="Region"`,
        `  value="${choice}"`,
        `  onChange={(event) => setValue(event.currentTarget.value)}`,
        propLine(booleanProp("required", Boolean(props.required), false)),
        propLine(booleanProp("disabled", Boolean(props.disabled), false)),
        hasHint ? `  hint="Hint text is controlled by the hint prop."` : null,
        Boolean(props.error) ? `  error="Error text changes the invalid state."` : null,
        `  options={[`,
        `    { label: "Compact", value: "compact" },`,
        `    { label: "Comfortable", value: "comfortable" },`,
        `    { label: "Spacious", value: "spacious" },`,
        `  ]}`,
        `/>`,
      ].filter(Boolean).join("\n");
    case "checkbox":
      return jsxSnippet("Checkbox", [
        `label="Remember route"`,
        expressionProp("checked", Boolean(props.checked)),
        booleanProp("disabled", Boolean(props.disabled), false),
        hasHint ? `hint="The hint prop renders helper text."` : null,
        `onChange={(event) => setChecked(event.currentTarget.checked)}`,
      ]);
    case "switch":
      return jsxSnippet("Switch", [
        `label="Campfire mode"`,
        expressionProp("checked", Boolean(props.checked)),
        booleanProp("disabled", Boolean(props.disabled), false),
        `onChange={(event) => setChecked(event.currentTarget.checked)}`,
      ]);
    case "radio-group":
      return [
        `<RadioGroup`,
        `  label="Density"`,
        `  name="density"`,
        `  value="${choice}"`,
        propLine(booleanProp("disabled", Boolean(props.disabled), false)),
        `  onChange={(event) => setValue(event.currentTarget.value)}`,
        `  options={[`,
        `    { label: "Compact", value: "compact" },`,
        `    { label: "Comfortable", value: "comfortable" },`,
        `    { label: "Spacious", value: "spacious" },`,
        `  ]}`,
        `/>`,
      ].filter(Boolean).join("\n");
    case "slider":
      return jsxSnippet("Slider", [
        `label="Ambient glow"`,
        expressionProp("min", 0),
        expressionProp("max", max),
        expressionProp("value", boundedValue),
        Boolean(props.hasLabel) ? `output="${boundedValue} / ${max}"` : null,
        `onChange={(event) => setValue(Number(event.currentTarget.value))}`,
      ]);
    case "card":
      return jsxSnippet("Card", [stringProp("accent", accent)], [
        `<Badge tone="${accent}">Card</Badge>`,
        `<p>The accent prop changes the border and highlight tone.</p>`,
      ]);
    case "accordion":
      return [
        `<Accordion`,
        `  collapsible={${Boolean(props.collapsible)}}`,
        `  defaultValue="${choice}"`,
        `  items={[`,
        `    { title: "Compact", value: "compact", content: "defaultValue opens this item first." },`,
        `    { title: "Comfortable", value: "comfortable", content: "collapsible controls whether the open item can close." },`,
        `    { title: "Spacious", value: "spacious", content: "Keyboard movement still works across triggers." },`,
        `  ]}`,
        `/>`,
      ].join("\n");
    case "tabs":
      return [
        `<Tabs`,
        `  orientation="${String(props.orientation)}"`,
        `  activationMode="${String(props.activationMode)}"`,
        `  defaultValue="${choice}"`,
        `  items={[`,
        `    { label: "Compact", value: "compact", content: "defaultValue selects the initial panel." },`,
        `    { label: "Comfortable", value: "comfortable", content: "orientation changes keyboard direction." },`,
        `    { label: "Spacious", value: "spacious", content: "manual activation waits for Enter or Space." },`,
        `  ]}`,
        `/>`,
      ].join("\n");
    case "breadcrumb":
      return [
        `<Breadcrumb`,
        `  separator="${escapeCode(String(props.separator))}"`,
        `  items={[`,
        `    { label: "Mosslight", href: "#" },`,
        `    { label: "Components", href: "#" },`,
        `    { label: "Breadcrumb", current: true },`,
        `  ]}`,
        `/>`,
      ].join("\n");
    case "pagination":
      return jsxSnippet("Pagination", [
        expressionProp("page", page),
        expressionProp("totalPages", totalPages),
        `onPageChange={setPage}`,
      ]);
    case "separator":
      return jsxSnippet("Separator", [
        stringProp("orientation", String(props.orientation)),
        expressionProp("decorative", Boolean(props.decorative)),
      ]);
    case "alert":
      return jsxSnippet("Alert", [
        `title="Draft saved"`,
        stringProp("tone", alertTone),
        hasIcon ? `icon={<Sparkles size={18} />}` : null,
      ], "The tone and icon props reshape the same feedback message.");
    case "dialog":
      return [
        `<Dialog`,
        `  open={open}`,
        `  title="Confirm journey"`,
        hasHint ? `  description="description adds supporting copy below the title."` : null,
        `  onOpenChange={setOpen}`,
        `  closeOnEscape={${Boolean(props.closeOnEscape)}}`,
        `  closeOnInteractOutside={${Boolean(props.closeOnInteractOutside)}}`,
        Boolean(props.hasFooter) ? `  footer={<DialogActions />}` : null,
        `>`,
        `  <p>Children render inside the dialog body.</p>`,
        `</Dialog>`,
      ].filter(Boolean).join("\n");
    case "progress":
      return jsxSnippet("Progress", [
        expressionProp("value", boundedValue),
        expressionProp("max", max),
        Boolean(props.hasLabel) ? `label="Readiness"` : null,
      ]);
    case "skeleton":
      return jsxSnippet("Skeleton", [stringProp("variant", String(props.skeletonVariant))]);
    case "spinner":
      return jsxSnippet("Spinner", [stringProp("size", size), stringProp("label", String(props.loadingLabel))]);
    case "avatar":
      return jsxSnippet("Avatar", [
        `name="Fern Vale"`,
        stringProp("size", size),
        Boolean(props.hasImage) ? `src="https://github.com/sanghyun-io.png"` : null,
      ]);
    default:
      return "";
  }
}

function jsxSnippet(name: string, propLines: Array<string | null>, children?: string | string[]) {
  const props = propLines.filter(Boolean);
  const lines = [`<${name}`];
  props.forEach((prop) => lines.push(`  ${prop}`));

  if (!children) {
    return [...lines, `/>`].join("\n");
  }

  const childLines = Array.isArray(children) ? children : [children];
  return [...lines, `>`, ...childLines.map((line) => `  ${line}`), `</${name}>`].join("\n");
}

function stringProp(name: string, value: string) {
  return `${name}="${escapeCode(value)}"`;
}

function expressionProp(name: string, value: string | number | boolean) {
  return `${name}={${JSON.stringify(value)}}`;
}

function booleanProp(name: string, value: boolean, defaultValue: boolean) {
  return value === defaultValue ? null : expressionProp(name, value);
}

function propLine(prop: string | null) {
  return prop ? `  ${prop}` : null;
}

function escapeCode(value: string) {
  return value.replace(/"/g, '\\"');
}

const toneOptions = ["moss", "sky", "amber", "plum"];
const alertToneOptions = ["moss", "sky", "amber", "plum", "danger"];

function PropSelect({
  name,
  label,
  value,
  options,
  setProp,
}: {
  name: string;
  label: string;
  value: string;
  options: string[];
  setProp: (name: string, value: PlaygroundValue) => void;
}) {
  return (
    <Select
      id={`prop-${name}`}
      label={label}
      value={value}
      onChange={(event) => setProp(name, event.currentTarget.value)}
      options={options.map((option) => ({ label: option, value: option }))}
    />
  );
}

function PropSwitch({
  name,
  label,
  value,
  setProp,
}: {
  name: string;
  label: string;
  value: PlaygroundValue;
  setProp: (name: string, value: PlaygroundValue) => void;
}) {
  return (
    <Switch
      id={`prop-${name}`}
      label={label}
      checked={Boolean(value)}
      onChange={(event) => setProp(name, event.currentTarget.checked)}
    />
  );
}

function PropSlider({
  name,
  label,
  min,
  max,
  value,
  setProp,
}: {
  name: string;
  label: string;
  min: number;
  max: number;
  value: number;
  setProp: (name: string, value: PlaygroundValue) => void;
}) {
  return (
    <Slider
      label={label}
      min={min}
      max={max}
      value={value}
      output={String(value)}
      onChange={(event) => setProp(name, Number(event.currentTarget.value))}
    />
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
