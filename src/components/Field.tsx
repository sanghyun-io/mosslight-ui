import type { CSSProperties, InputHTMLAttributes } from "react";
import { useRef, useState } from "react";

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

type FieldTrail = { id: number; x: string; tone: "bolt" | "ember" | "frost"; direction: "forward" | "backward" };

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
    const visibleSlots = Math.max(valueLength, field.placeholder.length, 10);
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
        x: `${(Math.min(caret, visibleSlots) / visibleSlots) * 100}%`,
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
