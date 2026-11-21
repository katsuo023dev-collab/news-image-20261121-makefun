// Writes the 21 November 2026 world-news infographic to /output/entry.png.
// The image is rendered from src/entry.html and committed as entry.png; this program copies its bytes unchanged,
// so every run writes identical output. Locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const image = readFileSync(new URL('./entry.png', import.meta.url));
// Guard the gate's limits: a PNG signature, at most 1 MiB, at most 1024 x 1024 pixels.
const PNG_SIGNATURE = '89504e470d0a1a0a';
if (image.subarray(0, 8).toString('hex') !== PNG_SIGNATURE) throw new Error('entry.png is not a PNG');
if (image.length > 1048576) throw new Error(`entry.png is ${image.length} bytes, over 1 MiB`);
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over 1024x1024`);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
writeFileSync(join(outDir, 'entry.png'), image);
