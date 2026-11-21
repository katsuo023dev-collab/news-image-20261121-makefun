// Writes the 21 November 2026 world-news infographic to /output/entry.png.
// The image is rendered from src/entry.html and committed as entry.png; this program copies its bytes unchanged,
// so every run writes identical output. Locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const image = readFileSync(new URL('./entry.png', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
writeFileSync(join(outDir, 'entry.png'), image);
