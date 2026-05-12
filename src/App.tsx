import { BookOpen, Check, Leaf, Moon, Plus, Search, Sparkles, Wand2 } from "lucide-react";
import { Badge, Button, Card, Field, Select, Switch, Tabs, Toast, ToastViewport } from "./index";

const swatches = [
  ["Parchment", "var(--ms-color-parchment)"],
  ["Moss", "var(--ms-color-moss-500)"],
  ["Sky", "var(--ms-color-sky-400)"],
  ["Plum", "var(--ms-color-plum-500)"],
  ["Amber", "var(--ms-color-amber-400)"],
  ["Ink", "var(--ms-color-ink-800)"],
];

function App() {
  return (
    <main className="demo-shell">
      <aside className="demo-sidebar" aria-label="Mosslight sections">
        <div className="demo-brand">
          <span className="demo-brand__mark">
            <Leaf size={18} />
          </span>
          <span>
            <strong>Mosslight</strong>
            <small>UI library</small>
          </span>
        </div>
        <nav className="demo-nav">
          <a className="demo-nav__item demo-nav__item--active" href="#preview">
            <Sparkles size={16} />
            Preview
          </a>
          <a className="demo-nav__item" href="#tokens">
            <Moon size={16} />
            Tokens
          </a>
          <a className="demo-nav__item" href="#components">
            <BookOpen size={16} />
            Components
          </a>
        </nav>
      </aside>

      <section className="demo-workbench">
        <header className="demo-toolbar">
          <div>
            <p className="demo-kicker">Original cozy fantasy system</p>
            <h1>Mosslight UI</h1>
          </div>
          <div className="demo-toolbar__actions">
            <Button variant="ghost" icon={<Search size={16} />} aria-label="Search tokens" />
            <Button variant="secondary" icon={<Wand2 size={16} />}>
              Theme
            </Button>
          </div>
        </header>

        <section id="preview" className="demo-preview-grid">
          <div className="demo-scene" aria-label="Mosslight visual atmosphere">
            <div className="demo-scene__sky" />
            <div className="demo-scene__sun" />
            <div className="demo-scene__hills demo-scene__hills--back" />
            <div className="demo-scene__hills demo-scene__hills--front" />
            <div className="demo-scene__path" />
            <div className="demo-scene__house">
              <span />
            </div>
            <div className="demo-scene__grass demo-scene__grass--one" />
            <div className="demo-scene__grass demo-scene__grass--two" />
          </div>

          <div className="demo-panel demo-panel--focus">
            <div className="demo-panel__header">
              <span>
                <small>Quest board</small>
                <strong>Herbal delivery</strong>
              </span>
              <Badge tone="amber">gentle</Badge>
            </div>
            <p>
              A compact product surface with inked borders, soft depth, readable controls,
              and enough animation to feel alive.
            </p>
            <div className="demo-actions">
              <Button icon={<Check size={16} />}>Accept</Button>
              <Button variant="secondary" icon={<Plus size={16} />}>
                Save
              </Button>
            </div>
          </div>
        </section>

        <section id="tokens" className="demo-section">
          <div className="demo-section__heading">
            <p className="demo-kicker">Foundation</p>
            <h2>Color tokens</h2>
          </div>
          <div className="demo-swatches">
            {swatches.map(([name, color]) => (
              <div className="demo-swatch" key={name}>
                <span className="demo-swatch__chip" style={{ background: color }} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="components" className="demo-section">
          <div className="demo-section__heading">
            <p className="demo-kicker">Primitives</p>
            <h2>Components</h2>
          </div>
          <div className="demo-components">
            <Card accent="moss">
              <Badge tone="moss">Button</Badge>
              <div className="demo-stack">
                <Button>Primary action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </Card>
            <Card accent="sky">
              <Badge tone="sky">Form</Badge>
              <div className="demo-stack">
                <Field label="Traveler" placeholder="Fern" hint="Soft focus ring included" />
                <Select
                  label="Region"
                  defaultValue="north"
                  options={[
                    { label: "North ridge", value: "north" },
                    { label: "Lake village", value: "lake" },
                    { label: "Old woods", value: "woods" },
                  ]}
                />
                <Switch label="Campfire mode" defaultChecked />
              </div>
            </Card>
            <Card accent="plum">
              <Badge tone="plum">Feedback</Badge>
              <ToastViewport>
                <Toast title="Journey saved" tone="plum">
                  The interface keeps feedback quiet, legible, and close to the task.
                </Toast>
              </ToastViewport>
              <Tabs
                items={[
                  { label: "Ready", value: "ready", content: "Use moss for stable success states and primary actions." },
                  { label: "Calm", value: "calm", content: "Use sky for helpful secondary context and focus rings." },
                ]}
              />
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
