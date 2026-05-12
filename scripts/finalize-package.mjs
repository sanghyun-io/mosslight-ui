import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const cssDeclarationPath = resolve("dist/styles.css.d.ts");
const cssDeclaration = [
  "declare const stylesheet: string;",
  "export default stylesheet;",
  "",
].join("\n");

await mkdir(dirname(cssDeclarationPath), { recursive: true });
await writeFile(cssDeclarationPath, cssDeclaration);
