import type { CSSProperties, InputHTMLAttributes } from "react";
import { useRef, useState } from "react";

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

type FieldTrail = { id: number; x: string; tone: "bolt" | "ember" | "frost"; direction: "forward" | "backward" };

let fieldMeasureCanvas: HTMLCanvasElement | undefined;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTextWidth(text: string, styles: CSSStyleDeclaration) {
  fieldMeasureCanvas ??= document.createElement("canvas");
  const context = fieldMeasureCanvas.getContext("2d");
  if (!context) return text.length * Number.parseFloat(styles.fontSize || "16") * 0.56;

  context.font =
    styles.font ||
    `${styles.fontStyle} ${styles.fontVariant} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
  return context.measureText(text).width;
}

function getCaretX(field: HTMLInputElement, caret: number) {
  const styles = window.getComputedStyle(field);
  const paddingLeft = Number.parseFloat(styles.paddingLeft || "0");
  const paddingRight = Number.parseFloat(styles.paddingRight || "0");
  const measuredText = getTextWidth(field.value.slice(0, caret), styles);
  const minX = paddingLeft;
  const maxX = Math.max(minX, field.clientWidth - paddingRight);

  return clamp(paddingLeft + measuredText - field.scrollLeft, minX, maxX);
}

export function Field({ className = "", id, label, hint, error, required, disabled, onInput, ...props }: FieldProps) {
  const [trails, setTrails] = useState<FieldTrail[]>([]);
  const previousCaret = useRef(0);
  const fieldId = id ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const castTrail: NonNullable<FieldProps["onInput"]> = (event) => {
    onInput?.(event);
    const field = event.currentTarget;
    const valueLength = field.value.length;
    const caret = field.selectionStart ?? valueLength;
    const caretX = getCaretX(field, caret);
    const id = window.performance.now();
    const tones: FieldTrail["tone"][] = ["bolt", "ember", "frost"];
    const inputType = (event.nativeEvent as InputEvent).inputType ?? "";
    const direction = inputType.includes("delete") || caret < previousCaret.current ? "backward" : "forward";
    previousCaret.current = caret;

    setTrails((current) => [
      ...current.slice(-5),
      {
        id,
        direction,
        x: `${caretX}px`,
        tone: tones[Math.floor(id) % tones.length],
      },
    ]);
    window.setTimeout(() => {
      setTrails((current) => current.filter((trail) => trail.id !== id));
    }, 680);
  };

  return (
    <label className={`ms-field ${className}`.trim()} data-invalid={error ? "" : undefined} htmlFor={fieldId}>
      <span className="ms-field__label">
        <span>{label}</span>
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <span className="ms-field__control-shell">
        <input
          id={fieldId}
          className="ms-field__control"
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          required={required}
          onInput={castTrail}
          {...props}
        />
        {trails.map((trail) => (
          <span
            aria-hidden="true"
            className={`ms-field__trail ms-field__trail--${trail.tone} ms-field__trail--${trail.direction}`}
            key={trail.id}
            style={{ "--field-trail-x": trail.x } as CSSProperties}
          />
        ))}
      </span>
      {hint ? (
        <span className="ms-field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="ms-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
