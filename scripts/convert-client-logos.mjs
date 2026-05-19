#!/usr/bin/env node
/**
 * Convert every .jpg / .jpeg / .png inside src/assets/clients/webp/ to .webp
 * Overwrites any existing .webp with the same basename.
 *
 * Usage:
 *   node scripts/convert-client-logos.mjs              (convert + keep originals)
 *   node scripts/convert-client-logos.mjs --delete-src (convert + remove originals)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = path.resolve(process.cwd(), 'src/assets/clients/webp');
const DELETE_SRC = process.argv.includes('--delete-src');
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);

async function main() {
  const entries = await fs.readdir(DIR);
  const sources = entries.filter((f) => SOURCE_EXT.has(path.extname(f).toLowerCase()));

  if (sources.length === 0) {
    console.log('Nothing to convert — no .jpg/.jpeg/.png found.');
    return;
  }

  console.log(`Converting ${sources.length} files to .webp (quality 85)…\n`);

  let ok = 0, fail = 0;
  for (const file of sources) {
    const src = path.join(DIR, file);
    const dst = path.join(DIR, `${path.parse(file).name}.webp`);
    try {
      const srcStat = await fs.stat(src);
      await sharp(src)
        .webp({ quality: 85, effort: 6 })
        .toFile(dst);
      const dstStat = await fs.stat(dst);
      const pct = Math.round((dstStat.size / srcStat.size) * 100);
      console.log(`  ✓ ${file}  →  ${path.basename(dst)}  (${(srcStat.size / 1024).toFixed(1)}KB → ${(dstStat.size / 1024).toFixed(1)}KB, ${pct}%)`);

      if (DELETE_SRC) {
        await fs.unlink(src);
      }
      ok++;
    } catch (err) {
      console.error(`  ✗ ${file}  —  ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone. ${ok} converted, ${fail} failed.${DELETE_SRC ? ' Originals removed.' : ' Originals kept.'}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
