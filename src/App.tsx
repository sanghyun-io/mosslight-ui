import type { CSSProperties, FormEvent, PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  Languages,
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
type Lang = "en" | "ko";
type SpellImpact = { id: number; x: number; y: number };
type TypingTrail = {
  id: number;
  x: number;
  y: number;
  width: number;
  tone: "bolt" | "ember" | "frost";
  direction: "forward" | "backward";
};
type CursorTrail = { id: number; x: number; y: number; length: number; angle: number; tone: "sky" | "amber" | "plum" };
type WarpPoint = { active: boolean; x: number; y: number };

const nightHollowCaptureSize = 760;

function markCaptureCloneSafe(documentClone: Document) {
  const style = documentClone.createElement("style");
  style.textContent = `
    .site-shell,
    .site-shell * {
      background-image: none !important;
      border-color: rgba(37, 49, 55, 0.22) !important;
      box-shadow: none !important;
      color: #253137 !important;
      filter: none !important;
      text-shadow: none !important;
    }

    .site-shell {
      background: #f4efdf !important;
    }

    .site-header,
    .component-sidebar,
    .component-detail-card,
    .prop-playground-card,
    .component-demo-surface,
    .prop-preview,
    .code-panel,
    .ms-card,
    .ms-alert,
    .ms-toast,
    .ms-field,
    .ms-form-control {
      background-color: rgba(255, 250, 240, 0.82) !important;
    }

    .ms-button,
    .component-menu__item,
    .token-swatch,
    .ms-badge {
      background-color: rgba(229, 219, 188, 0.82) !important;
    }
  `;
  documentClone.head.appendChild(style);
}

const pages: Array<{ value: Page }> = [
  { value: "home" },
  { value: "components" },
  { value: "patterns" },
  { value: "tokens" },
  { value: "install" },
];

const routeSegments: Record<Page, string> = {
  home: "",
  components: "components",
  patterns: "patterns",
  tokens: "tokens",
  install: "install",
};

const pageBySegment = Object.entries(routeSegments).reduce<Record<string, Page>>((routeMap, [page, segment]) => {
  routeMap[segment] = page as Page;
  return routeMap;
}, {});

function getSiteBase() {
  const configuredBase = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (configuredBase) return configuredBase;
  if (window.location.pathname === "/mosslight-ui" || window.location.pathname.startsWith("/mosslight-ui/")) {
    return "/mosslight-ui";
  }

  return "";
}

function getPagePath(page: Page) {
  const base = getSiteBase();
  const segment = routeSegments[page];
  return `${base}/${segment}`.replace(/\/$/, "") || "/";
}

function getPageFromPath(pathname: string): Page {
  const base = getSiteBase();
  const withoutBase = base && pathname.startsWith(`${base}/`) ? pathname.slice(base.length + 1) : pathname.replace(/^\//, "");
  const segments = withoutBase.split("/");
  const segment = segments[0] ?? "";

  return pageBySegment[segment] ?? pageBySegment[segments[1] ?? ""] ?? "home";
}

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

const copy = {
  en: {
    nav: {
      home: "Home",
      components: "Components",
      patterns: "Patterns",
      tokens: "Tokens",
      install: "Install",
    },
    chrome: {
      primaryNavigation: "Primary navigation",
      light: "Light",
      dark: "Dark",
      useLight: "Use light theme",
      useDark: "Use dark theme",
      switchLanguage: "Switch language to Korean",
      language: "KO",
    },
    home: {
      eyebrow: "React UI primitives",
      title: "Hand-painted fantasy anime interfaces for React.",
      body:
        "Mosslight UI is a compact component library for soft product surfaces: moss fields, pale sky, inked borders, luminous feedback, and calm scenes that feel closer to an illustrated journey log than a neutral UI kit.",
      install: "npm install mosslight-ui",
      explore: "Explore components",
      stageLabel: "Mosslight illustrated interface preview",
      panelBadge: "Journey panel",
      panelTitle: "Field journal",
      panelBody: "Compact controls with readable rhythm and soft feedback.",
      readiness: "Readiness",
      save: "Save",
      tune: "Tune",
      features: {
        landing: {
          title: "Public landing first",
          body: "A product-style site, not Storybook as the face of the library.",
        },
        dark: {
          title: "Dark mode built in",
          body: "Theme tokens switch between parchment daylight and quiet night surfaces.",
        },
        catalog: {
          title: "Component catalog",
          body: "Dedicated pages show primitives, patterns, tokens, and install details.",
        },
      },
    },
    components: {
      eyebrow: "Components",
      title: "Browse each primitive one at a time.",
      body: "Pick a component from the left panel, inspect its base example, then change props to see the output update.",
      listLabel: "Component list",
      catalog: "Catalog",
      primitives: "primitives",
      props: "Props playground",
      propsBody: "Change one prop at a time and watch the preview update.",
      preview: "Preview",
      code: "Code",
      featuresLabel: "features",
      groups: {
        Actions: "Actions",
        Forms: "Forms",
        Structure: "Structure",
        Feedback: "Feedback",
      },
    },
    componentMeta: {
      button: {
        summary: "Primary, secondary, ghost, danger variants with icon and size support.",
        features: ["Variants", "Sizes", "Icons"],
      },
      badge: {
        summary: "Compact status labels for categories, tags, and state hints.",
        features: ["Tone variants", "Inline rhythm", "High-contrast border"],
      },
      tooltip: {
        summary: "Small contextual notes for icon-only or compact controls.",
        features: ["Hover content", "Keyboard focus", "Compact placement"],
      },
      toast: {
        summary: "Non-blocking status feedback with title, body, and optional action.",
        features: ["Tone variants", "Viewport wrapper", "Action slot"],
      },
      field: {
        summary: "Text input with label, hint, error, disabled, and required states.",
        features: ["Hint text", "Error state", "Required marker"],
      },
      select: {
        summary: "Native select styling with the same form control system as Field.",
        features: ["Options", "Hint text", "Error state"],
      },
      checkbox: {
        summary: "Checkbox control with label and helper text for small decisions.",
        features: ["Checked state", "Hint text", "Disabled state"],
      },
      switch: {
        summary: "Binary setting control for preferences and feature toggles.",
        features: ["On/off state", "Label support", "Keyboard input"],
      },
      "radio-group": {
        summary: "Grouped single-choice selection with shared label and name.",
        features: ["Default value", "Controlled value", "Grouped semantics"],
      },
      slider: {
        summary: "Range input for numeric tuning with visible output text.",
        features: ["Min/max", "Controlled value", "Output label"],
      },
      card: {
        summary: "Framed content surface with accent color support.",
        features: ["Accent variants", "Article semantics", "Stacked content"],
      },
      accordion: {
        summary: "Collapsible disclosure sections with keyboard navigation.",
        features: ["Default open item", "Collapsible mode", "Arrow key support"],
      },
      tabs: {
        summary: "Tabbed sections for switching related panels in one surface.",
        features: ["Automatic/manual activation", "Keyboard navigation", "Panel linkage"],
      },
      breadcrumb: {
        summary: "Hierarchical path display for multi-level app screens.",
        features: ["Current page", "Custom separator", "Link props"],
      },
      pagination: {
        summary: "Page navigation control with previous, next, and numbered pages.",
        features: ["Controlled page", "Disabled edges", "Page buttons"],
      },
      separator: {
        summary: "Horizontal or vertical divider for dense tool surfaces.",
        features: ["Orientation", "Decorative mode", "ARIA separator mode"],
      },
      alert: {
        summary: "Persistent message block for warnings, success, and status context.",
        features: ["Title", "Icon slot", "Tone variants"],
      },
      dialog: {
        summary: "Modal surface with title, description, footer, and focus return behavior.",
        features: ["Controlled open", "Footer actions", "Escape close"],
      },
      progress: {
        summary: "Linear progress meter for loading, completion, and readiness states.",
        features: ["Value/max", "Optional label", "ARIA progressbar"],
      },
      skeleton: {
        summary: "Placeholder blocks for loading text and content regions.",
        features: ["Text variant", "Block variant", "Reduced layout shift"],
      },
      spinner: {
        summary: "Compact loading indicator with accessible label text.",
        features: ["Sizes", "Accessible label", "Inline use"],
      },
      avatar: {
        summary: "User image or initials for people, authors, and account surfaces.",
        features: ["Image fallback", "Initials", "Sizes"],
      },
    },
    patterns: {
      eyebrow: "Patterns",
      title: "Reusable compositions for settings, onboarding, and decision points.",
      body: "These are the screens a library site needs before people decide whether to install it.",
      settings: "Settings",
      themeControls: "Theme controls",
      reduceMotion: "Reduce motion",
      contrast: "High contrast borders",
      compactDensity: "Use compact density",
      compactHint: "Useful for admin and dashboard surfaces.",
      onboarding: "Onboarding",
      routeSetup: "Route setup",
      decision: "Decision",
      checklist: "Release checklist",
      ready: "Ready for app UI",
      readyBody: "Best suited for dashboards, small tools, and narrative product surfaces.",
      light: "Light",
      dark: "Dark",
      lightBody: "Parchment surfaces, moss actions, sky focus.",
      darkBody: "Muted ink surfaces with luminous accent tokens.",
    },
    tokens: {
      eyebrow: "Tokens",
      title: "A stronger palette for hand-painted interface atmosphere.",
      body: "Warm neutrals are now balanced with ink, moss, sky, plum, amber, and rose so the page feels less generic.",
    },
    install: {
      eyebrow: "Install",
      title: "Published on npm and ready to import.",
      body: "The package ships JavaScript, CommonJS, TypeScript declarations, and a CSS entry for the token/component layer.",
      npm: "npm package",
      github: "GitHub repo",
    },
  },
  ko: {
    nav: {
      home: "홈",
      components: "컴포넌트",
      patterns: "패턴",
      tokens: "토큰",
      install: "설치",
    },
    chrome: {
      primaryNavigation: "주요 내비게이션",
      light: "라이트",
      dark: "다크",
      useLight: "라이트 테마 사용",
      useDark: "다크 테마 사용",
      switchLanguage: "영어로 언어 전환",
      language: "EN",
    },
    home: {
      eyebrow: "React UI primitives",
      title: "손그림 판타지 애니메이션 무드의 React 인터페이스.",
      body:
        "Mosslight UI는 부드러운 제품 화면을 위한 작은 컴포넌트 라이브러리입니다. 이끼빛 필드, 옅은 하늘색, 잉크 테두리, 은은한 피드백, 조용한 장면감으로 평범한 UI 키트보다 여행 기록에 가까운 분위기를 만듭니다.",
      install: "npm install mosslight-ui",
      explore: "컴포넌트 보기",
      stageLabel: "Mosslight 일러스트 인터페이스 미리보기",
      panelBadge: "여정 패널",
      panelTitle: "필드 저널",
      panelBody: "읽기 쉬운 리듬과 부드러운 피드백을 가진 컴팩트 컨트롤.",
      readiness: "준비도",
      save: "저장",
      tune: "조정",
      features: {
        landing: {
          title: "공개 랜딩 우선",
          body: "라이브러리의 첫인상을 Storybook이 아니라 제품형 소개 페이지로 보여줍니다.",
        },
        dark: {
          title: "다크 모드 내장",
          body: "토큰이 양피지 같은 밝은 화면과 조용한 밤 화면 사이를 전환합니다.",
        },
        catalog: {
          title: "컴포넌트 카탈로그",
          body: "프리미티브, 패턴, 토큰, 설치 정보를 별도 페이지에서 확인할 수 있습니다.",
        },
      },
    },
    components: {
      eyebrow: "컴포넌트",
      title: "프리미티브를 하나씩 살펴보세요.",
      body: "왼쪽 패널에서 컴포넌트를 고르고, 기본 예시를 본 뒤 props를 바꿔 결과가 어떻게 달라지는지 확인합니다.",
      listLabel: "컴포넌트 목록",
      catalog: "카탈로그",
      primitives: "개 프리미티브",
      props: "Props 플레이그라운드",
      propsBody: "prop을 하나씩 바꾸면 오른쪽 미리보기와 코드가 같이 갱신됩니다.",
      preview: "미리보기",
      code: "코드",
      featuresLabel: "기능",
      groups: {
        Actions: "액션",
        Forms: "폼",
        Structure: "구조",
        Feedback: "피드백",
      },
    },
    componentMeta: {
      button: {
        summary: "primary, secondary, ghost, danger variant와 icon, size를 지원합니다.",
        features: ["Variant", "Size", "Icon"],
      },
      badge: {
        summary: "카테고리, 태그, 상태 힌트를 위한 작은 상태 라벨입니다.",
        features: ["Tone variant", "인라인 리듬", "고대비 테두리"],
      },
      tooltip: {
        summary: "아이콘 버튼이나 좁은 컨트롤에 붙이는 짧은 보조 설명입니다.",
        features: ["Hover content", "키보드 포커스", "컴팩트 배치"],
      },
      toast: {
        summary: "제목, 본문, 선택 액션을 가진 비차단 상태 피드백입니다.",
        features: ["Tone variant", "Viewport wrapper", "Action slot"],
      },
      field: {
        summary: "label, hint, error, disabled, required 상태를 가진 텍스트 입력입니다.",
        features: ["Hint text", "Error state", "Required marker"],
      },
      select: {
        summary: "Field와 같은 form control 시스템을 쓰는 native select 스타일입니다.",
        features: ["Options", "Hint text", "Error state"],
      },
      checkbox: {
        summary: "작은 선택을 위한 label과 helper text가 있는 checkbox입니다.",
        features: ["Checked state", "Hint text", "Disabled state"],
      },
      switch: {
        summary: "설정과 기능 토글에 쓰는 이진 상태 컨트롤입니다.",
        features: ["On/off state", "Label support", "Keyboard input"],
      },
      "radio-group": {
        summary: "공유 label과 name을 가진 단일 선택 그룹입니다.",
        features: ["Default value", "Controlled value", "Grouped semantics"],
      },
      slider: {
        summary: "숫자 값을 조정하고 output label을 보여주는 range input입니다.",
        features: ["Min/max", "Controlled value", "Output label"],
      },
      card: {
        summary: "accent color를 지원하는 프레임형 콘텐츠 surface입니다.",
        features: ["Accent variant", "Article semantics", "Stacked content"],
      },
      accordion: {
        summary: "키보드 내비게이션을 지원하는 접이식 disclosure section입니다.",
        features: ["Default open item", "Collapsible mode", "Arrow key support"],
      },
      tabs: {
        summary: "관련 패널을 한 surface 안에서 전환하는 tab 컴포넌트입니다.",
        features: ["Activation mode", "Keyboard navigation", "Panel linkage"],
      },
      breadcrumb: {
        summary: "여러 단계의 앱 화면 경로를 보여주는 계층형 경로 표시입니다.",
        features: ["Current page", "Custom separator", "Link props"],
      },
      pagination: {
        summary: "이전, 다음, 페이지 번호를 가진 페이지 내비게이션입니다.",
        features: ["Controlled page", "Disabled edges", "Page buttons"],
      },
      separator: {
        summary: "밀도 높은 툴 화면을 나누는 가로/세로 구분선입니다.",
        features: ["Orientation", "Decorative mode", "ARIA separator mode"],
      },
      alert: {
        summary: "경고, 성공, 상태 맥락을 오래 보여주는 메시지 블록입니다.",
        features: ["Title", "Icon slot", "Tone variant"],
      },
      dialog: {
        summary: "title, description, footer, focus return을 가진 modal surface입니다.",
        features: ["Controlled open", "Footer actions", "Escape close"],
      },
      progress: {
        summary: "loading, completion, readiness 상태를 보여주는 linear progress입니다.",
        features: ["Value/max", "Optional label", "ARIA progressbar"],
      },
      skeleton: {
        summary: "텍스트와 콘텐츠 영역 로딩 상태를 보여주는 placeholder입니다.",
        features: ["Text variant", "Block variant", "Reduced layout shift"],
      },
      spinner: {
        summary: "접근성 label을 가진 컴팩트 loading indicator입니다.",
        features: ["Sizes", "Accessible label", "Inline use"],
      },
      avatar: {
        summary: "사용자, 작성자, 계정 화면에 쓰는 이미지 또는 이니셜 표시입니다.",
        features: ["Image fallback", "Initials", "Sizes"],
      },
    },
    patterns: {
      eyebrow: "패턴",
      title: "설정, 온보딩, 의사결정 화면을 위한 재사용 조합.",
      body: "설치 여부를 결정하기 전에 실제 화면 감각을 확인할 수 있는 조합 예시입니다.",
      settings: "설정",
      themeControls: "테마 컨트롤",
      reduceMotion: "모션 줄이기",
      contrast: "고대비 테두리",
      compactDensity: "컴팩트 밀도 사용",
      compactHint: "관리자 화면과 대시보드에 유용합니다.",
      onboarding: "온보딩",
      routeSetup: "경로 설정",
      decision: "결정",
      checklist: "릴리스 체크리스트",
      ready: "앱 UI에 적합",
      readyBody: "대시보드, 작은 도구, 서사적인 제품 화면에 잘 맞습니다.",
      light: "라이트",
      dark: "다크",
      lightBody: "양피지 surface, 이끼빛 action, 하늘색 focus.",
      darkBody: "먹빛 surface와 은은하게 빛나는 accent token.",
    },
    tokens: {
      eyebrow: "토큰",
      title: "손그림 인터페이스 분위기를 위한 더 강한 팔레트.",
      body: "따뜻한 neutral에 ink, moss, sky, plum, amber, rose를 섞어 더 고유한 분위기를 만듭니다.",
    },
    install: {
      eyebrow: "설치",
      title: "npm에 배포되어 바로 import할 수 있습니다.",
      body: "패키지는 JavaScript, CommonJS, TypeScript declaration, CSS entry를 함께 제공합니다.",
      npm: "npm 패키지",
      github: "GitHub 저장소",
    },
  },
} as const;

type Copy = (typeof copy)[Lang];

function getInitialLang(): Lang {
  const stored = window.localStorage.getItem("mosslight-lang");
  if (stored === "en" || stored === "ko") return stored;

  const browserLanguages = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  return browserLanguages.some((language) => language.toLowerCase().startsWith("ko")) ? "ko" : "en";
}

function isTrailInput(element: EventTarget | null): element is HTMLInputElement | HTMLTextAreaElement {
  if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return false;
  if (element instanceof HTMLTextAreaElement) return true;

  return ["", "text", "search", "email", "password", "url", "tel"].includes(element.type);
}

let appMeasureCanvas: HTMLCanvasElement | undefined;

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function measureTextWidth(text: string, styles: CSSStyleDeclaration) {
  appMeasureCanvas ??= document.createElement("canvas");
  const context = appMeasureCanvas.getContext("2d");
  if (!context) return text.length * Number.parseFloat(styles.fontSize || "16") * 0.56;

  context.font =
    styles.font ||
    `${styles.fontStyle} ${styles.fontVariant} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
  return context.measureText(text).width;
}

function getInputCaretViewportX(field: HTMLInputElement | HTMLTextAreaElement, caret: number) {
  const rect = field.getBoundingClientRect();
  const styles = window.getComputedStyle(field);
  const paddingLeft = Number.parseFloat(styles.paddingLeft || "0");
  const paddingRight = Number.parseFloat(styles.paddingRight || "0");
  const measuredText = measureTextWidth(field.value.slice(0, caret), styles);
  const minX = rect.left + paddingLeft;
  const maxX = rect.right - paddingRight;

  return clampNumber(rect.left + paddingLeft + measuredText - field.scrollLeft, minX, maxX);
}

function App() {
  const [page, setPage] = useState<Page>(() => getPageFromPath(window.location.pathname));
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [dark, setDark] = useState(() => {
    const stored = window.localStorage.getItem("mosslight-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(2);
  const [glow, setGlow] = useState(68);
  const [spellImpacts, setSpellImpacts] = useState<SpellImpact[]>([]);
  const [typingTrails, setTypingTrails] = useState<TypingTrail[]>([]);
  const [cursorTrails, setCursorTrails] = useState<CursorTrail[]>([]);
  const [warpPoint, setWarpPoint] = useState<WarpPoint>({ active: false, x: 0, y: 0 });
  const lastCursorPoint = useRef<{ x: number; y: number; time: number } | null>(null);
  const previousCaretByField = useRef(new WeakMap<HTMLInputElement | HTMLTextAreaElement, number>());
  const t = copy[lang];

  useEffect(() => {
    window.localStorage.setItem("mosslight-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    window.localStorage.setItem("mosslight-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToPage = (nextPage: Page) => {
    setPage(nextPage);
    const nextPath = getPagePath(nextPage);
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  };

  const releaseWarp = () => {
    setWarpPoint((current) => ({ ...current, active: false }));
  };

  useEffect(() => {
    if (!warpPoint.active) return;

    const releaseActiveWarp = () => setWarpPoint((current) => ({ ...current, active: false }));
    window.addEventListener("pointerup", releaseWarp);
    window.addEventListener("pointercancel", releaseActiveWarp);
    window.addEventListener("blur", releaseActiveWarp);
    return () => {
      window.removeEventListener("pointerup", releaseWarp);
      window.removeEventListener("pointercancel", releaseActiveWarp);
      window.removeEventListener("blur", releaseActiveWarp);
    };
  }, [warpPoint.active]);

  const castInteractionSpell = (event: PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const interactive = target.closest("button, a, input, select, textarea, label, [role='tab'], [role='button']");
    if (!interactive) return;

    const id = window.performance.now();
    setSpellImpacts((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => {
      setSpellImpacts((current) => current.filter((impact) => impact.id !== id));
    }, 820);
  };

  const castCursorTrail = (event: PointerEvent<HTMLElement>) => {
    const now = window.performance.now();
    const previous = lastCursorPoint.current;
    if (!previous) {
      lastCursorPoint.current = { x: event.clientX, y: event.clientY, time: now };
      return;
    }

    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 9 || now - previous.time < 24) return;

    const id = now;
    const tones: CursorTrail["tone"][] = ["sky", "amber", "plum"];
    setCursorTrails((current) => [
      ...current.slice(-14),
      {
        id,
        x: event.clientX,
        y: event.clientY,
        length: Math.min(92, Math.max(28, distance * 2.4)),
        angle: (Math.atan2(dy, dx) * 180) / Math.PI,
        tone: tones[Math.floor(id) % tones.length],
      },
    ]);
    window.setTimeout(() => {
      setCursorTrails((current) => current.filter((trail) => trail.id !== id));
    }, 520);
    lastCursorPoint.current = { x: event.clientX, y: event.clientY, time: now };
    if (warpPoint.active) {
      setWarpPoint({ active: true, x: event.clientX, y: event.clientY });
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    setWarpPoint({ active: true, x: event.clientX, y: event.clientY });
    castInteractionSpell(event);
  };

  const castTypingTrail = (event: FormEvent<HTMLElement>) => {
    if (!isTrailInput(event.target)) return;
    if (event.target.closest(".ms-field")) return;

    const field = event.target;
    const rect = field.getBoundingClientRect();
    const valueLength = field.value.length;
    const caret = field.selectionStart ?? valueLength;
    const x = getInputCaretViewportX(field, caret);
    const y = rect.top + rect.height / 2;
    const id = window.performance.now();
    const tones: TypingTrail["tone"][] = ["bolt", "ember", "frost"];
    const tone = tones[Math.floor(id) % tones.length];
    const previousCaret = previousCaretByField.current.get(field) ?? 0;
    const inputType = (event.nativeEvent as InputEvent).inputType ?? "";
    const direction = inputType.includes("delete") || caret < previousCaret ? "backward" : "forward";
    previousCaretByField.current.set(field, caret);

    setTypingTrails((current) => [
      ...current.slice(-9),
      { id, direction, x, y, width: Math.min(190, Math.max(88, rect.width * 0.34)), tone },
    ]);
    window.setTimeout(() => {
      setTypingTrails((current) => current.filter((trail) => trail.id !== id));
    }, 680);
  };

  return (
    <main
      className="site-shell"
      data-lang={lang}
      data-ms-theme={dark ? "dark" : undefined}
      data-warping={warpPoint.active ? "true" : undefined}
      onInputCapture={castTypingTrail}
      onPointerCancelCapture={releaseWarp}
      onPointerDownCapture={handlePointerDown}
      onPointerMoveCapture={castCursorTrail}
      onPointerUpCapture={releaseWarp}
    >
      <NightHollowCanvas warpPoint={warpPoint} />

      <div className="cursor-trail-layer" aria-hidden="true">
        {cursorTrails.map((trail) => (
          <span
            className={`cursor-trail cursor-trail--${trail.tone}`}
            key={trail.id}
            style={
              {
                "--cursor-x": `${trail.x}px`,
                "--cursor-y": `${trail.y}px`,
                "--cursor-length": `${trail.length}px`,
                "--cursor-angle": `${trail.angle}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="spell-impact-layer" aria-hidden="true">
        {spellImpacts.map((impact) => (
          <span
            className="spell-impact"
            key={impact.id}
            style={{ "--impact-x": `${impact.x}px`, "--impact-y": `${impact.y}px` } as CSSProperties}
          />
        ))}
      </div>

      <div className="typing-spell-layer" aria-hidden="true">
        {typingTrails.map((trail) => (
          <span
            className={`typing-spell typing-spell--${trail.tone}`}
            data-direction={trail.direction}
            key={trail.id}
            style={
              {
                "--typing-x": `${trail.x}px`,
                "--typing-y": `${trail.y}px`,
                "--typing-width": `${trail.width}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <header className="site-header">
        <button className="site-brand" type="button" onClick={() => navigateToPage("home")}>
          <span className="site-brand__mark" aria-hidden="true">
            <Leaf size={18} />
          </span>
          <span>Mosslight UI</span>
        </button>

        <nav className="site-nav" aria-label={t.chrome.primaryNavigation}>
          {pages.map((item) => (
            <button
              className="site-nav__item"
              type="button"
              key={item.value}
              aria-current={page === item.value ? "page" : undefined}
              onClick={() => navigateToPage(item.value)}
            >
              {t.nav[item.value]}
            </button>
          ))}
        </nav>

        <div className="site-actions">
          <Button
            variant="ghost"
            icon={<Languages size={16} />}
            aria-label={t.chrome.switchLanguage}
            onClick={() => setLang((value) => (value === "en" ? "ko" : "en"))}
          >
            {t.chrome.language}
          </Button>

          <Button
            variant="ghost"
            icon={dark ? <Sun size={16} /> : <Moon size={16} />}
            aria-label={dark ? t.chrome.useLight : t.chrome.useDark}
            onClick={() => setDark((value) => !value)}
          >
            {dark ? t.chrome.light : t.chrome.dark}
          </Button>
        </div>
      </header>

      {page === "home" ? <HomePage setPage={navigateToPage} t={t} /> : null}
      {page === "components" ? (
        <ComponentsPage
          dialogOpen={dialogOpen}
          glow={glow}
          paginationPage={paginationPage}
          setDialogOpen={setDialogOpen}
          setGlow={setGlow}
          setPaginationPage={setPaginationPage}
          t={t}
        />
      ) : null}
      {page === "patterns" ? <PatternsPage t={t} /> : null}
      {page === "tokens" ? <TokensPage t={t} /> : null}
      {page === "install" ? <InstallPage t={t} /> : null}
    </main>
  );
}

function NightHollowCanvas({ warpPoint }: { warpPoint: WarpPoint }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointRef = useRef(warpPoint);
  const captureRef = useRef<HTMLCanvasElement | null>(null);
  const captureMetricsRef = useRef({ left: 0, top: 0, width: 1, height: 1 });
  const activeStartedRef = useRef<number | null>(null);

  useEffect(() => {
    pointRef.current = warpPoint;
  }, [warpPoint]);

  useEffect(() => {
    if (import.meta.env.MODE === "test" || !warpPoint.active) return;

    let cancelled = false;
    const root = document.querySelector(".site-shell") as HTMLElement | null;
    if (!root) return;

    const documentWidth = Math.max(root.scrollWidth, document.documentElement.scrollWidth, window.innerWidth, 1);
    const documentHeight = Math.max(root.scrollHeight, document.documentElement.scrollHeight, window.innerHeight, 1);
    const centerPageX = window.scrollX + warpPoint.x;
    const centerPageY = window.scrollY + warpPoint.y;
    const maxLeft = Math.max(0, documentWidth - nightHollowCaptureSize);
    const maxTop = Math.max(0, documentHeight - nightHollowCaptureSize);
    const left = clampNumber(centerPageX - nightHollowCaptureSize / 2, 0, maxLeft);
    const top = clampNumber(centerPageY - nightHollowCaptureSize / 2, 0, maxTop);
    const captureWidth = Math.min(nightHollowCaptureSize, documentWidth - left);
    const captureHeight = Math.min(nightHollowCaptureSize, documentHeight - top);

    captureMetricsRef.current = {
      left,
      top,
      width: Math.max(captureWidth, 1),
      height: Math.max(captureHeight, 1),
    };

    void html2canvas(root, {
      backgroundColor: null,
      height: captureHeight,
      logging: false,
      scale: Math.min(window.devicePixelRatio || 1, 2),
      width: captureWidth,
      windowHeight: documentHeight,
      windowWidth: documentWidth,
      x: left,
      y: top,
      ignoreElements: (element) =>
        element.classList.contains("night-hollow-canvas") ||
        element.classList.contains("cursor-trail-layer") ||
        element.classList.contains("spell-impact-layer") ||
        element.classList.contains("typing-spell-layer"),
      onclone: markCaptureCloneSafe,
    }).then((capture) => {
      if (!cancelled) captureRef.current = capture;
    }).catch(() => {
      if (!cancelled) captureRef.current = null;
    });

    return () => {
      cancelled = true;
    };
  }, [warpPoint.active]);

  useEffect(() => {
    if (import.meta.env.MODE === "test") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawArc = (
      x: number,
      y: number,
      radius: number,
      start: number,
      end: number,
      color: string,
      lineWidth: number,
      blur: number,
    ) => {
      context.beginPath();
      context.arc(x, y, radius, start, end);
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.shadowBlur = blur;
      context.shadowColor = color;
      context.stroke();
    };

    const drawWarpedCapture = (x: number, y: number, radius: number, seconds: number, charge: number) => {
      const capture = captureRef.current;
      if (!capture) return;

      const metrics = captureMetricsRef.current;
      const sourceScaleX = capture.width / Math.max(metrics.width, 1);
      const sourceScaleY = capture.height / Math.max(metrics.height, 1);
      const tile = charge > 0.7 ? 3.5 : 4.5;
      const swirl = seconds * (3.8 + charge * 2.8);

      context.save();
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.clip();
      context.globalAlpha = 0.96;
      context.globalCompositeOperation = "source-over";

      for (let dy = -radius; dy <= radius; dy += tile) {
        for (let dx = -radius; dx <= radius; dx += tile) {
          const px = x + dx;
          const py = y + dy;
          const distance = Math.hypot(dx, dy);
          if (distance > radius) continue;

          const falloff = 1 - distance / radius;
          const pull = falloff * falloff * (1.1 + charge * 1.05);
          const crease = Math.sin(falloff * 22 + seconds * 8.2 + Math.atan2(dy, dx) * 3) * 0.22 * pull;
          const angle = Math.atan2(dy, dx) + pull * 5.6 + swirl * pull * 0.36 + crease;
          const sourceDistance = distance * (1 + pull * 3.15) + pull * 34;
          const squeeze = 1 - falloff * (0.22 + charge * 0.12);
          const sourceViewportX = x + Math.cos(angle) * sourceDistance;
          const sourceViewportY = y + Math.sin(angle) * sourceDistance * squeeze;
          const sourcePageX = clampNumber(window.scrollX + sourceViewportX, metrics.left, metrics.left + metrics.width - 1);
          const sourcePageY = clampNumber(window.scrollY + sourceViewportY, metrics.top, metrics.top + metrics.height - 1);
          const sx = (sourcePageX - metrics.left) * sourceScaleX;
          const sy = (sourcePageY - metrics.top) * sourceScaleY;
          const sizeX = (tile + 2) * sourceScaleX;
          const sizeY = (tile + 2) * sourceScaleY;
          const drawSize = tile + 2.4 + falloff * 2.4;

          context.drawImage(capture, sx, sy, sizeX, sizeY, px - falloff, py - falloff, drawSize, drawSize);
          if (pull > 0.18) {
            context.globalCompositeOperation = "screen";
            context.globalAlpha = Math.min(0.24, pull * 0.13);
            context.drawImage(capture, sx + pull * 7.5, sy, sizeX, sizeY, px - 1.4, py, drawSize, drawSize);
            context.drawImage(capture, sx - pull * 7.5, sy, sizeX, sizeY, px + 1.4, py, drawSize, drawSize);
            context.globalAlpha = 0.96;
            context.globalCompositeOperation = "source-over";
          }
        }
      }

      context.globalCompositeOperation = "screen";
      for (let index = 0; index < 54; index += 1) {
        const lane = 38 + index * 5.2;
        const spiral = index * 0.62 + seconds * (2.4 + charge * 1.6);
        const fold = 1 - Math.min(lane / radius, 1);
        const sx = (clampNumber(window.scrollX + x + Math.cos(spiral + fold * 4.8) * lane, metrics.left, metrics.left + metrics.width - 1) - metrics.left) * sourceScaleX;
        const sy = (clampNumber(window.scrollY + y + Math.sin(spiral + fold * 4.8) * lane, metrics.top, metrics.top + metrics.height - 1) - metrics.top) * sourceScaleY;
        const targetDistance = lane * (0.78 - fold * 0.34);
        const tx = x + Math.cos(spiral - fold * 5.2) * targetDistance;
        const ty = y + Math.sin(spiral - fold * 5.2) * targetDistance;
        const size = 8 + fold * 14;
        context.globalAlpha = fold * 0.14;
        context.drawImage(capture, sx, sy, 12 * sourceScaleX, 12 * sourceScaleY, tx - size / 2, ty - size / 2, size, size);
      }
      context.globalAlpha = 1;

      context.globalCompositeOperation = "multiply";
      const compression = context.createRadialGradient(x, y, 0, x, y, radius);
      compression.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      compression.addColorStop(0.24, "rgba(18, 16, 28, 0.42)");
      compression.addColorStop(0.58, "rgba(46, 56, 74, 0.16)");
      compression.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = compression;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);

      context.restore();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      const point = pointRef.current;

      if (point.active) {
        const x = point.x;
        const y = point.y;
        const seconds = time / 1000;
        if (activeStartedRef.current === null) activeStartedRef.current = seconds;
        const activeFor = Math.min(1, Math.max(0, seconds - activeStartedRef.current));
        const pulse = Math.sin(seconds * 7.4) * 0.5 + 0.5;
        const charge = Math.min(1, 0.3 + activeFor * 1.2);
        const radius = 218 + charge * 82 + pulse * 16;

        drawWarpedCapture(x, y, radius, seconds, charge);

        context.globalCompositeOperation = "source-over";
        const lens = context.createRadialGradient(x, y, 0, x, y, radius);
        lens.addColorStop(0, "rgba(0, 0, 0, 0.98)");
        lens.addColorStop(0.08, "rgba(4, 5, 10, 0.95)");
        lens.addColorStop(0.17, "rgba(18, 15, 31, 0.7)");
        lens.addColorStop(0.42, "rgba(35, 28, 52, 0.34)");
        lens.addColorStop(0.74, "rgba(61, 78, 106, 0.12)");
        lens.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = lens;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);

        context.globalCompositeOperation = "screen";
        context.save();
        context.translate(x, y);
        context.rotate(seconds * 0.86);
        context.translate(-x, -y);
        drawArc(x - 1.4, y + 0.8, 52, 0.34, 4.7, "rgba(69, 183, 210, 0.46)", 1.4, 18);
        drawArc(x + 1.2, y - 0.6, 78, 2.8, 7.1, "rgba(128, 76, 152, 0.42)", 1.4, 16);
        drawArc(x, y, 124, 0.8, 2.7, "rgba(221, 227, 242, 0.28)", 1, 12);
        drawArc(x, y, 176, 3.1, 6.2, "rgba(80, 108, 148, 0.2)", 0.9, 10);
        context.restore();

        context.save();
        context.translate(x, y);
        context.rotate(-seconds * 0.52);
        context.translate(-x, -y);
        for (let index = 0; index < 42; index += 1) {
          const angle = index * 2.399 + seconds * (0.65 + (index % 5) * 0.045);
          const lane = ((seconds * 38 + index * 11.7) % 122) + 20;
          const inner = lane * (0.68 + (index % 3) * 0.035);
          const outer = lane + 18 + (index % 4) * 5;
          const alpha = Math.max(0, 0.32 - lane / 440);
          context.beginPath();
          context.moveTo(x + Math.cos(angle) * outer, y + Math.sin(angle) * outer);
          context.lineTo(x + Math.cos(angle - 0.14) * inner, y + Math.sin(angle - 0.14) * inner);
          context.strokeStyle = `rgba(214, 221, 238, ${alpha})`;
          context.lineWidth = index % 6 === 0 ? 1.1 : 0.55;
          context.shadowBlur = 10;
          context.shadowColor = "rgba(89, 112, 156, 0.26)";
          context.stroke();
        }
        context.restore();

        context.globalCompositeOperation = "source-over";
        const core = context.createRadialGradient(x, y, 0, x, y, 28);
        core.addColorStop(0, "rgba(0, 0, 0, 1)");
        core.addColorStop(0.42, "rgba(3, 4, 8, 0.96)");
        core.addColorStop(0.74, "rgba(31, 24, 45, 0.5)");
        core.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = core;
        context.beginPath();
        context.arc(x, y, 30, 0, Math.PI * 2);
        context.fill();
      } else {
        activeStartedRef.current = null;
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas className="night-hollow-canvas" ref={canvasRef} aria-hidden="true" />;
}

function HomePage({ setPage, t }: { setPage: (page: Page) => void; t: Copy }) {
  const [spellBurst, setSpellBurst] = useState(0);
  const [stagePointer, setStagePointer] = useState({ x: 50, y: 50 });
  const stageStyle = {
    "--spell-x": `${stagePointer.x}%`,
    "--spell-y": `${stagePointer.y}%`,
  } as CSSProperties;
  const castSpell = () => setSpellBurst((value) => value + 1);

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <Badge tone="moss">{t.home.eyebrow}</Badge>
          <h1>{t.home.title}</h1>
          <p>{t.home.body}</p>
          <div className="hero-actions">
            <Button
              icon={<Package size={16} />}
              onClick={() => {
                castSpell();
                setPage("install");
              }}
            >
              {t.home.install}
            </Button>
            <Button
              variant="secondary"
              icon={<Sparkles size={16} />}
              onClick={() => {
                castSpell();
                setPage("components");
              }}
            >
              {t.home.explore}
            </Button>
          </div>
        </div>

        <div
          className="anime-stage"
          aria-label={t.home.stageLabel}
          onPointerLeave={() => setStagePointer({ x: 50, y: 50 })}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setStagePointer({
              x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
              y: Math.round(((event.clientY - rect.top) / rect.height) * 100),
            });
          }}
          style={stageStyle}
        >
          <div className="anime-stage__wash" />
          <div className="anime-stage__cloud anime-stage__cloud--one" />
          <div className="anime-stage__cloud anime-stage__cloud--two" />
          <div className="anime-stage__sun" />
          <div className="anime-stage__mana-field" />
          <div className="anime-stage__glyph anime-stage__glyph--one" />
          <div className="anime-stage__glyph anime-stage__glyph--two" />
          <div className="anime-stage__comet anime-stage__comet--one" />
          <div className="anime-stage__comet anime-stage__comet--two" />
          <div className="anime-stage__mote anime-stage__mote--one" />
          <div className="anime-stage__mote anime-stage__mote--two" />
          <div className="anime-stage__mote anime-stage__mote--three" />
          {spellBurst > 0 ? <div className="anime-stage__spell-flash" key={spellBurst} /> : null}
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
              <Badge tone="amber">{t.home.panelBadge}</Badge>
              <h2>{t.home.panelTitle}</h2>
              <p>{t.home.panelBody}</p>
              <Progress value={72} label={t.home.readiness} />
              <div className="anime-window__actions">
                <Button size="sm" icon={<Check size={14} />} onClick={castSpell}>
                  {t.home.save}
                </Button>
                <Button size="sm" variant="secondary" icon={<Wand2 size={14} />} onClick={castSpell}>
                  {t.home.tune}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band feature-grid">
        <FeatureCard title={t.home.features.landing.title} icon={<Palette size={18} />}>
          {t.home.features.landing.body}
        </FeatureCard>
        <FeatureCard title={t.home.features.dark.title} icon={<Moon size={18} />}>
          {t.home.features.dark.body}
        </FeatureCard>
        <FeatureCard title={t.home.features.catalog.title} icon={<Package size={18} />}>
          {t.home.features.catalog.body}
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
  t,
}: {
  dialogOpen: boolean;
  glow: number;
  paginationPage: number;
  setDialogOpen: (open: boolean) => void;
  setGlow: (value: number) => void;
  setPaginationPage: (page: number) => void;
  t: Copy;
}) {
  const [activeComponent, setActiveComponent] = useState(componentCatalog[0].id);
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);
  const selectedComponent =
    componentCatalog.find((component) => component.id === activeComponent) ?? componentCatalog[0];
  const selectedCopy = t.componentMeta[selectedComponent.id as keyof Copy["componentMeta"]];
  const groups = Array.from(new Set(componentCatalog.map((component) => component.group)));
  const setPlaygroundProp = (name: string, value: PlaygroundValue) => {
    setPlaygroundProps((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="page-shell">
      <PageHeading
        eyebrow={t.components.eyebrow}
        title={t.components.title}
        body={t.components.body}
      />

      <div className="component-browser">
        <aside className="component-sidebar" aria-label={t.components.listLabel}>
          <div className="component-sidebar__intro">
            <Badge tone="moss">{t.components.catalog}</Badge>
            <p>
              {componentCatalog.length}
              {t.components.primitives.startsWith(" ") ? t.components.primitives : ` ${t.components.primitives}`}
            </p>
          </div>
          <div className="component-sidebar__list">
            {groups.map((group) => (
              <div className="component-menu-group" key={group}>
                <h2>{t.components.groups[group]}</h2>
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
                        <small>{t.componentMeta[component.id as keyof Copy["componentMeta"]].features[0]}</small>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="component-main">
          <Card accent={selectedComponent.tone} className="component-detail-card">
            <div className="component-detail__header">
              <div>
                <Badge tone={selectedComponent.tone}>{t.components.groups[selectedComponent.group]}</Badge>
                <h2>{selectedComponent.label}</h2>
                <p>{selectedCopy.summary}</p>
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

            <div className="component-feature-list" aria-label={`${selectedComponent.label} ${t.components.featuresLabel}`}>
              {selectedCopy.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </Card>

          <PropsPlayground
            component={selectedComponent}
            props={playgroundProps}
            setProp={setPlaygroundProp}
            t={t}
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
  t,
}: {
  component: ComponentMeta;
  props: PlaygroundProps;
  setProp: (name: string, value: PlaygroundValue) => void;
  t: Copy;
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
          <Badge tone={component.tone}>{t.components.props}</Badge>
          <h2>{component.label} props</h2>
          <p>{t.components.propsBody}</p>
        </div>
      </div>

      <div className="prop-playground">
        <div className="prop-controls">{controls}</div>
        <div className="prop-preview">
          <div className="prop-preview__label">{t.components.preview}</div>
          <div className="prop-preview__stage">{playground.preview}</div>
        </div>
        <div className="prop-code">
          <div className="prop-preview__label">{t.components.code}</div>
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
            id="playground-field"
            label="Input label"
            placeholder="Typed value"
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
            id="playground-select"
            label="Select label"
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
            id="playground-checkbox"
            label="Checkbox label"
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
            id="playground-switch"
            label="Switch label"
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
            label="Radio group label"
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
            id="playground-slider"
            label="Slider label"
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
        `label="Input label"`,
        `placeholder="Typed value"`,
        booleanProp("required", Boolean(props.required), false),
        booleanProp("disabled", Boolean(props.disabled), false),
        hasHint ? `hint="Hint text is controlled by the hint prop."` : null,
        Boolean(props.error) ? `error="Error text changes the invalid state."` : null,
      ]);
    case "select":
      return [
        `<Select`,
        `  label="Select label"`,
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
        `label="Checkbox label"`,
        expressionProp("checked", Boolean(props.checked)),
        booleanProp("disabled", Boolean(props.disabled), false),
        hasHint ? `hint="The hint prop renders helper text."` : null,
        `onChange={(event) => setChecked(event.currentTarget.checked)}`,
      ]);
    case "switch":
      return jsxSnippet("Switch", [
        `label="Switch label"`,
        expressionProp("checked", Boolean(props.checked)),
        booleanProp("disabled", Boolean(props.disabled), false),
        `onChange={(event) => setChecked(event.currentTarget.checked)}`,
      ]);
    case "radio-group":
      return [
        `<RadioGroup`,
        `  label="Radio group label"`,
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
        `label="Slider label"`,
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
      id={`prop-${name}`}
      label={label}
      min={min}
      max={max}
      value={value}
      output={String(value)}
      onChange={(event) => setProp(name, Number(event.currentTarget.value))}
    />
  );
}

function PatternsPage({ t }: { t: Copy }) {
  return (
    <section className="page-shell">
      <PageHeading
        eyebrow={t.patterns.eyebrow}
        title={t.patterns.title}
        body={t.patterns.body}
      />

      <div className="pattern-grid">
        <Card accent="moss">
          <Badge tone="moss">{t.patterns.settings}</Badge>
          <h3>{t.patterns.themeControls}</h3>
          <div className="stack">
            <Switch label={t.patterns.reduceMotion} />
            <Switch label={t.patterns.contrast} defaultChecked />
            <Checkbox label={t.patterns.compactDensity} hint={t.patterns.compactHint} />
          </div>
        </Card>

        <Card accent="sky">
          <Badge tone="sky">{t.patterns.onboarding}</Badge>
          <h3>{t.patterns.routeSetup}</h3>
          <Breadcrumb
            items={[
              { label: "Mosslight", href: "#" },
              { label: t.patterns.eyebrow, href: "#" },
              { label: t.patterns.onboarding, current: true },
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
          <Badge tone="amber">{t.patterns.decision}</Badge>
          <h3>{t.patterns.checklist}</h3>
          <Alert title={t.patterns.ready} tone="amber">
            {t.patterns.readyBody}
          </Alert>
          <Tabs
            items={[
              { label: t.patterns.light, value: "light", content: t.patterns.lightBody },
              { label: t.patterns.dark, value: "dark", content: t.patterns.darkBody },
            ]}
          />
        </Card>
      </div>
    </section>
  );
}

function TokensPage({ t }: { t: Copy }) {
  return (
    <section className="page-shell">
      <PageHeading
        eyebrow={t.tokens.eyebrow}
        title={t.tokens.title}
        body={t.tokens.body}
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

function InstallPage({ t }: { t: Copy }) {
  return (
    <section className="page-shell install-page">
      <PageHeading
        eyebrow={t.install.eyebrow}
        title={t.install.title}
        body={t.install.body}
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
          <span className="ms-button__label">{t.install.npm}</span>
        </a>
        <a className="ms-button ms-button--ghost ms-button--md" href="https://github.com/sanghyun-io/mosslight-ui">
          <span className="ms-button__icon">
            <Github size={16} />
          </span>
          <span className="ms-button__label">{t.install.github}</span>
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
