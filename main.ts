import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Introducing the Apology Alarm Clock, a bedside clock that wakes you up, then spends ten minutes sincerely apologising for existing, so you feel too guilty to hit snooze.";

// Gate: /output/entry.txt must be UTF-8 text of 1-220 chars, not only
// whitespace, and a single sentence (one line, no surrounding whitespace).
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 220) {
    throw new Error(`entry must be 1-220 chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have surrounding whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be a single complete sentence");
  }
}

validateEntry(PITCH);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
console.log(PITCH);
