// Make the AI Judge Feel Nostalgic: A Childhood Memory
// Writes one sentence (1-280 chars) recalling a childhood memory to /output/entry.txt.
// The memory is one concrete scene — grandmother's kitchen steps, peas in a tin
// bowl, a crackling radio, rice on the stove — and the ache lands in the last
// clause, when the child does not yet know how happy those hours were.
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ENTRY =
  "Every summer evening my grandmother called me in from the yard, and I sat on the kitchen steps shelling peas into a tin bowl while the radio crackled and the smell of fresh rice drifted out through the open window, not knowing those were the happiest hours of my life.";

function resolveTarget(argv: string[]): string {
  const arg = argv[2] ?? "/output/entry.txt";
  const target = resolve(arg);
  if (existsSync(target) && statSync(target).isDirectory()) {
    return join(target, "entry.txt");
  }
  return target;
}

function main(): void {
  // Gate: a single sentence of 1-280 characters, not only white space.
  // The entry is one sentence: no period appears before the final full stop,
  // so the text reads as a single clean sentence exactly as the rules ask.
  if (ENTRY.length < 1 || ENTRY.length > 280 || ENTRY.trim().length === 0) {
    throw new Error(`entry must be 1-280 characters, got ${ENTRY.length}`);
  }
  const target = resolveTarget(process.argv);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
