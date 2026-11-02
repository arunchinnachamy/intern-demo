// Safe clean: removes only build output inside this repo.
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const dir of ["dist", "coverage"]) {
  rmSync(join(root, dir), { recursive: true, force: true });
  console.log(`cleaned ${dir}/`);
}
