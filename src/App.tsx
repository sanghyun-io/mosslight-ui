import {
  Check,
  Copy,
  Github,
  Leaf,
  Moon,
  Package,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Field,
  Progress,
  RadioGroup,
  Select,
  Switch,
  Tabs,
  Toast,
  ToastViewport,
} from "./index";

const components = [
  "Accordion",
  "Button",
  "Card",
  "Dialog",
  "Field",
  "Select",
  "Tabs",
  "Toast",
];

const tokens = [
  ["Ink", "var(--ms-color-ink-800)"],
  ["Moss", "var(--ms-color-moss-500)"],
  ["Sky", "var(--ms-color-sky-400)"],
  ["Plum", "var(--ms-color-plum-500)"],
  ["Amber", "var(--ms-color-amber-400)"],
  ["Paper", "var(--ms-color-paper)"],
];

function App() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="site-brand" href="#">
          <span className="site-brand__mark" aria-hidden="true">
            <Leaf size={18} />
          </span>
          <span>Mosslight UI</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#components">Components</a>
          <a href="#tokens">Tokens</a>
          <a href="#install">Install</a>
          <a href="https://github.com/sanghyun-io/mosslight-ui">GitHub</a>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <Badge tone="moss">React UI primitives</Badge>
          <h1>Warm fantasy components for quiet product interfaces.</h1>
          <p>
            Mosslight UI is a compact React component library with soft color
            tokens, tactile borders, accessible primitives, and restrained
            motion for calm app surfaces.
          </p>
          <div className="hero-actions">
            <Button icon={<Package size={16} />}>npm install mosslight-ui</Button>
            <a className="ms-button ms-button--secondary ms-button--md" href="https://github.com/sanghyun-io/mosslight-ui">
              <span className="ms-button__icon">
                <Github size={16} />
              </span>
              <span className="ms-button__label">GitHub</span>
            </a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Mosslight interface preview">
          <div className="hero-stage__sky" />
          <div className="hero-stage__sun" />
          <div className="hero-stage__hill hero-stage__hill--back" />
          <div className="hero-stage__hill hero-stage__hill--front" />
          <div className="hero-window">
            <div className="hero-window__bar">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-window__content">
              <div>
                <Badge tone="amber">Preview</Badge>
                <h2>Field journal</h2>
                <p>Compact controls with readable rhythm and soft feedback.</p>
              </div>
              <Progress value={72} label="Readiness" />
              <div className="hero-window__actions">
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

      <section className="section-band section-band--tight" id="components">
        <div className="section-heading">
          <p className="eyebrow">Component surface</p>
          <h2>Primitives that feel designed before they feel decorated.</h2>
        </div>
        <div className="component-strip" aria-label="Available components">
          {components.map((component) => (
            <span key={component}>{component}</span>
          ))}
        </div>
      </section>

      <section className="section-band showcase-grid">
        <Card accent="moss">
          <Badge tone="moss">Form</Badge>
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
            <Switch label="Campfire mode" defaultChecked />
          </div>
        </Card>

        <Card accent="sky">
          <Badge tone="sky">Choice</Badge>
          <RadioGroup
            label="Density"
            name="density"
            defaultValue="comfortable"
            options={[
              { label: "Compact", value: "compact" },
              { label: "Comfortable", value: "comfortable" },
            ]}
          />
          <Tabs
            items={[
              { label: "Moss", value: "moss", content: "Stable action states and grounded surfaces." },
              { label: "Sky", value: "sky", content: "Helpful context, focus rings, and soft contrast." },
            ]}
          />
        </Card>

        <Card accent="plum">
          <Badge tone="plum">Feedback</Badge>
          <ToastViewport>
            <Toast title="Journey saved" tone="plum">
              Quiet status messages stay close to the task.
            </Toast>
          </ToastViewport>
          <div className="feature-row">
            <Moon size={18} />
            <span>Dark theme helpers</span>
          </div>
          <div className="feature-row">
            <Sparkles size={18} />
            <span>Motion tokens</span>
          </div>
        </Card>
      </section>

      <section className="section-band token-section" id="tokens">
        <div className="section-heading">
          <p className="eyebrow">Foundation</p>
          <h2>Tokens first, components second.</h2>
        </div>
        <div className="token-grid">
          {tokens.map(([name, color]) => (
            <div className="token-swatch" key={name}>
              <span style={{ background: color }} />
              <strong>{name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="install-section" id="install">
        <div>
          <p className="eyebrow">Install</p>
          <h2>Published as a small React package.</h2>
        </div>
        <div className="code-panel">
          <Copy size={16} />
          <code>npm install mosslight-ui</code>
        </div>
        <a className="ms-button ms-button--secondary ms-button--md" href="https://www.npmjs.com/package/mosslight-ui">
          <span className="ms-button__icon">
            <Package size={16} />
          </span>
          <span className="ms-button__label">npm package</span>
        </a>
      </section>
    </main>
  );
}

export default App;
