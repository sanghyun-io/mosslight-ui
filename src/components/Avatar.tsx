import type { HTMLAttributes } from "react";
import { useState } from "react";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
};

function initialsFor(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Avatar({ className = "", name, src, size = "md", ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src && !failed);

  return (
    <span className={`ms-avatar ms-avatar--${size} ${className}`.trim()} title={name} {...props}>
      {showImage ? <img src={src} alt={name} onError={() => setFailed(true)} /> : <span>{initialsFor(name)}</span>}
    </span>
  );
}
