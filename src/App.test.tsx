import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

beforeEach(() => {
  window.history.replaceState(null, "", "/mosslight-ui/");
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(navigator, "languages", {
    configurable: true,
    value: ["en-US"],
  });
  Object.defineProperty(navigator, "language", {
    configurable: true,
    value: "en-US",
  });
  window.localStorage.clear();
});

describe("component props playground", () => {
  it("syncs page navigation with browser paths and supports direct entry", async () => {
    window.history.replaceState(null, "", "/mosslight-ui/components");

    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: "Browse each primitive one at a time." })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Tokens" }));
    expect(window.location.pathname).toBe("/mosslight-ui/tokens");
    expect(screen.getByRole("heading", { name: "A stronger palette for hand-painted interface atmosphere." })).toBeInTheDocument();

    window.history.pushState(null, "", "/mosslight-ui/install");
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(await screen.findByRole("heading", { name: "Published on npm and ready to import." })).toBeInTheDocument();
  });

  it("uses the browser language initially and toggles languages from the header", async () => {
    Object.defineProperty(navigator, "languages", {
      configurable: true,
      value: ["ko-KR", "en-US"],
    });
    Object.defineProperty(navigator, "language", {
      configurable: true,
      value: "ko-KR",
    });

    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: "손그림 판타지 애니메이션 무드의 React 인터페이스." })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("ko");

    await user.click(screen.getByRole("button", { name: "영어로 언어 전환" }));

    expect(screen.getByRole("heading", { name: "Hand-painted fantasy anime interfaces for React." })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("syncs Button prop controls with preview and code", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Components" }));
    await user.selectOptions(screen.getByLabelText("variant"), "danger");
    await user.selectOptions(screen.getByLabelText("size"), "lg");
    await user.click(screen.getByLabelText("icon"));

    const playground = screen.getByText("Button props").closest("article");
    expect(playground).not.toBeNull();

    expect(within(playground as HTMLElement).getByRole("button", { name: "Button" })).toHaveClass(
      "ms-button--danger",
      "ms-button--lg",
    );
    expect(within(playground as HTMLElement).queryByText("<Wand2")).not.toBeInTheDocument();
    expect(within(playground as HTMLElement).getByText(/variant="danger"/)).toBeInTheDocument();
    expect(within(playground as HTMLElement).getByText(/size="lg"/)).toBeInTheDocument();
  });

  it("renders a valid props playground for every catalog item", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Components" }));
    const menu = screen.getByLabelText("Component list");

    const componentNames = [
      "Button",
      "Badge",
      "Tooltip",
      "Toast",
      "Field",
      "Select",
      "Checkbox",
      "Switch",
      "RadioGroup",
      "Slider",
      "Card",
      "Accordion",
      "Tabs",
      "Breadcrumb",
      "Pagination",
      "Separator",
      "Alert",
      "Dialog",
      "Progress",
      "Skeleton",
      "Spinner",
      "Avatar",
    ];

    for (const componentName of componentNames) {
      const menuButton = within(menu).getByText(componentName).closest("button");
      expect(menuButton).not.toBeNull();
      await user.click(menuButton as HTMLButtonElement);

      const playground = screen.getByText(`${componentName} props`).closest("article");
      expect(playground).not.toBeNull();
      expect(within(playground as HTMLElement).getByText("Preview")).toBeInTheDocument();
      expect(within(playground as HTMLElement).getByText("Code")).toBeInTheDocument();
      expect((playground as HTMLElement).querySelector("code")?.textContent?.trim()).not.toEqual("");
    }
  });

  it("covers component-specific prop options that previously drifted", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Components" }));
    const menu = screen.getByLabelText("Component list");

    await user.click(within(menu).getByText("Skeleton").closest("button") as HTMLButtonElement);
    await user.selectOptions(screen.getByLabelText("variant"), "circle");
    expect(screen.getByText(/variant="circle"/)).toBeInTheDocument();

    await user.click(within(menu).getByText("Alert").closest("button") as HTMLButtonElement);
    await user.selectOptions(screen.getByLabelText("tone"), "danger");
    expect(screen.getByRole("alert")).toHaveTextContent("Draft saved");
    expect(screen.getByText(/tone="danger"/)).toBeInTheDocument();

    await user.click(within(menu).getByText("Spinner").closest("button") as HTMLButtonElement);
    await user.selectOptions(screen.getByLabelText("label"), "Syncing route");
    expect(screen.getByRole("status", { name: "Syncing route" })).toBeInTheDocument();
    expect(screen.getByText(/label="Syncing route"/)).toBeInTheDocument();
  });

  it("keeps Switch preview isolated from the base example", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Components" }));
    const menu = screen.getByLabelText("Component list");
    await user.click(within(menu).getByText("Switch").closest("button") as HTMLButtonElement);

    const baseSwitch = screen.getByLabelText("Campfire mode");
    const propSwitch = screen.getByLabelText("checked");
    const playground = screen.getByText("Switch props").closest("article") as HTMLElement;
    const previewSwitch = within(playground).getByLabelText("Switch label");

    expect(baseSwitch).toBeChecked();
    expect(propSwitch).toBeChecked();
    expect(previewSwitch).toBeChecked();

    await user.click(previewSwitch);

    expect(baseSwitch).toBeChecked();
    expect(propSwitch).not.toBeChecked();
    expect(previewSwitch).not.toBeChecked();
    expect(within(playground).getByText(/checked={false}/)).toBeInTheDocument();
  });
});
