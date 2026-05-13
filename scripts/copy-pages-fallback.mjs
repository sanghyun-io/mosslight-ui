import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist-demo");
const indexPath = join(distDir, "index.html");
const fallbackPath = join(distDir, "404.html");

if (!existsSync(indexPath)) {
  throw new Error("dist-demo/index.html does not exist. Run the site build before creating the Pages fallback.");
}

copyFileSync(indexPath, fallbackPath);
