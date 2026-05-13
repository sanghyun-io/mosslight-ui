import { readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const requiredFiles = [
  "dist/index.d.ts",
  "dist/mosslight-ui.cjs",
  "dist/mosslight-ui.js",
  "dist/styles.css",
  "dist/styles.css.d.ts",
];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else {
      files.push(path);
    }
  }

  return files;
}

const missingFiles = [];
for (const file of requiredFiles) {
  if (!(await exists(resolve(file)))) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  throw new Error(`Missing required package files: ${missingFiles.join(", ")}`);
}

const distFiles = await walk(resolve("dist"));
const leakedFiles = distFiles.filter((file) => /\.test\./.test(file) || /stories/i.test(file));

if (leakedFiles.length > 0) {
  throw new Error(`Test or story files leaked into dist: ${leakedFiles.join(", ")}`);
}

console.log("dist verification ok");
