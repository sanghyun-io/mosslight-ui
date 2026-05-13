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

const componentGroups = [
  {
    title: "Actions",
    items: ["Button", "Badge", "Tooltip", "Toast"],
    tone: "moss",
  },
  {
    title: "Forms",
    items: ["Field", "Select", "Checkbox", "Switch", "RadioGroup", "Slider"],
    tone: "sky",
  },
  {
    title: "Structure",
    items: ["Card", "Accordion", "Tabs", "Breadcrumb", "Pagination", "Separator"],
    tone: "amber",
  },
  {
    title: "Feedback",
    items: ["Alert", "Dialog", "Progress", "Skeleton", "Spinner", "Avatar"],
    tone: "plum",
  },
] as const;

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
  return (
    <section className="page-shell">
      <PageHeading
        eyebrow="Components"
        title="A broader primitive set for real app surfaces."
        body="The public page now shows more of the package instead of hiding everything behind Storybook."
      />

      <div className="component-groups">
        {componentGroups.map((group) => (
          <Card accent={group.tone} key={group.title}>
            <Badge tone={group.tone}>{group.title}</Badge>
            <div className="component-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="showcase-grid">
        <Card accent="moss">
          <Badge tone="moss">Forms</Badge>
          <div className="stack">
            <Field label="Traveler" placeholder="Fern" hint="Clear focus, compact spacing." />
            <Select
              label="Region"
              defaultValue="lake"
              options={[
                { label: "Lake village", value: "lake" },
                { label: "North ridge", value: "north" },
                { label: "Old woods", value: "woods" },
              ]}
            />
            <Checkbox label="Remember route" hint="Small helper text remains legible." defaultChecked />
            <Switch label="Campfire mode" defaultChecked />
          </div>
        </Card>

        <Card accent="sky">
          <Badge tone="sky">Controls</Badge>
          <RadioGroup
            label="Density"
            name="density"
            defaultValue="comfortable"
            options={[
              { label: "Compact", value: "compact" },
              { label: "Comfortable", value: "comfortable" },
            ]}
          />
          <Slider label="Ambient glow" min={20} max={100} value={glow} output={`${glow}%`} onChange={(event) => setGlow(Number(event.currentTarget.value))} />
          <Pagination page={paginationPage} totalPages={4} onPageChange={setPaginationPage} />
        </Card>

        <Card accent="plum">
          <Badge tone="plum">Feedback</Badge>
          <Alert title="Draft saved" tone="plum" icon={<Sparkles size={18} />}>
            Status feedback stays calm and close to the task.
          </Alert>
          <ToastViewport>
            <Toast title="Journey saved" tone="plum">
              Quiet messages, soft contrast, no harsh flashes.
            </Toast>
          </ToastViewport>
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
        </Card>
      </div>

      <div className="utility-strip">
        <Avatar name="Fern Vale" size="lg" />
        <Separator orientation="vertical" decorative />
        <Skeleton variant="text" />
        <Skeleton variant="block" />
        <Spinner label="Loading preview" />
        <Tooltip content="Tooltip uses keyboard and hover interactions.">
          <button className="utility-help" type="button">
            ?
          </button>
        </Tooltip>
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
