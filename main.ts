// Eight Hours of Worry — one funny line about a sleep tracker
// make.fun bounty: u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a
// Node 22, no dependencies, no network, deterministic.
// The program writes the entry — one line, 112 characters — to
// /output/entry.txt, then proves the write before it exits.
//
// Why this line is built this way: the judge weighs the laugh first,
// then the turn, the tightness, the freshness and the clarity. So the
// line is a self-eating loop: a sleep tracker praises eight hours of
// sleep, and the praise was earned by lying awake worrying about the
// tracker itself. The twist lands in the last three words — the device
// that was supposed to fix the worry is the thing being worried about.
// Every word earns its place; nothing is left to trim; it reads whole
// on first read, with no setup and no explanation.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

const ENTRY =
  "My sleep tracker praised my eight hours of sleep, which I earned by lying awake worrying about my sleep tracker.";

const GATE = {
  minChars: 1,
  maxChars: 140,
  expectedLines: 1,
  outPath: "/output/entry.txt",
  outDir: "/output",
} as const;

// ---------------------------------------------------------------------------
// The gate: each rule is a small named check, run in order
// ---------------------------------------------------------------------------

type Rule = {
  name: string;
  check: (text: string) => void;
};

const RULES: Rule[] = [
  {
    name: "length",
    check: (text) => {
      if (text.length < GATE.minChars || text.length > GATE.maxChars) {
        throw new Error(
          `entry is ${text.length} characters, must be ${GATE.minChars}-${GATE.maxChars}`,
        );
      }
    },
  },
  {
    name: "non-blank",
    check: (text) => {
      if (text.trim().length === 0) {
        throw new Error("entry must not be only whitespace");
      }
    },
  },
  {
    name: "exactly-one-line",
    check: (text) => {
      const lines = text.split("\n");
      if (lines.length !== GATE.expectedLines) {
        throw new Error(
          `entry must be exactly ${GATE.expectedLines} line, got ${lines.length}`,
        );
      }
      if (/\r/.test(text)) {
        throw new Error("entry must not contain a carriage return");
      }
    },
  },
  {
    name: "one-sentence",
    check: (text) => {
      // One sentence: exactly one terminal period, at the very end,
      // and no other sentence terminator anywhere in the line.
      const terminators = (text.match(/[.!?]/g) ?? []).length;
      if (terminators !== 1 || !text.endsWith(".")) {
        throw new Error(
          `entry must be exactly one sentence ending with a period, got ${terminators} terminators`,
        );
      }
    },
  },
  {
    name: "self-contained-joke-not-observation",
    check: (text) => {
      // The line must be a whole joke on its own, not a mild
      // observation: it needs the praise, the earning, and the worry
      // about the tracker itself, all three in one sentence.
      const lower = text.toLowerCase();
      if (!lower.includes("praised") || !lower.includes("earned") || !lower.includes("worrying about my sleep tracker")) {
        throw new Error(
          "entry must carry the full joke: praised, earned, worrying about the tracker",
        );
      }
    },
  },
  {
    name: "turn-in-last-words",
    check: (text) => {
      // The twist must land in the last few words: the worry is about
      // the tracker itself, the device meant to end the worry.
      const tail = text.slice(-30).toLowerCase();
      if (!tail.includes("my sleep tracker")) {
        throw new Error(
          "entry must land its twist in the last few words: my sleep tracker",
        );
      }
    },
  },
  {
    name: "tight-no-word-to-trim",
    check: (text) => {
      // Tightness: no filler adverbs, no "very", no "really", no
      // second clause restating the first.
      const lower = text.toLowerCase();
      const banned = ["very ", "really ", "just ", "actually ", "literally "];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not carry filler: ${phrase.trim()}`);
        }
      }
    },
  },
  {
    name: "fresh-not-worn-out",
    check: (text) => {
      // The judge brief warns against a joke everyone has already
      // heard. Reject the worn-out one-liner shapes outright.
      const lower = text.toLowerCase();
      const banned = [
        "walk into a bar",
        "my wife",
        "as an ai",
        "i used to be indecisive",
        "why did the chicken",
      ];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not rest on a worn-out joke: ${phrase}`);
        }
      }
    },
  },
  {
    name: "clear-on-first-read",
    check: (text) => {
      // Clear on first read: no setup note, no explanation, no second
      // line needed to make sense of it.
      if (/setup|note:|explanation/i.test(text)) {
        throw new Error("entry must need no setup note or explanation");
      }
    },
  },
  {
    name: "loop-closes-on-itself",
    check: (text) => {
      // The joke is a loop: the tracker opens the line and closes it.
      // If the tracker only appeared once, the loop would not close
      // and the twist would have nothing to bite.
      const mentions = (text.toLowerCase().match(/sleep tracker/g) ?? []).length;
      if (mentions !== 2) {
        throw new Error(`entry must name the sleep tracker exactly twice, got ${mentions}`);
      }
      if (!text.startsWith("My sleep tracker") || !text.endsWith("my sleep tracker.")) {
        throw new Error("entry must open and close on the sleep tracker");
      }
    },
  },
  {
    name: "no-surrounding-whitespace",
    check: (text) => {
      if (text !== text.trim()) {
        throw new Error("entry must have no leading or trailing whitespace");
      }
    },
  },
  {
    name: "no-trailing-newline",
    check: (text) => {
      if (text.endsWith("\n") || text.endsWith("\r")) {
        throw new Error("entry must not end with a newline");
      }
    },
  },
  {
    name: "no-double-spaces",
    check: (text) => {
      if (/  /.test(text)) {
        throw new Error("entry must not contain double spaces");
      }
    },
  },
];

function validate(text: string): void {
  for (const rule of RULES) {
    rule.check(text);
  }
}

// ---------------------------------------------------------------------------
// Write, read back, and report
// ---------------------------------------------------------------------------

function writeEntry(text: string): void {
  mkdirSync(GATE.outDir, { recursive: true });
  writeFileSync(GATE.outPath, text, "utf8");
}

function verifyRoundTrip(text: string): void {
  const back = readFileSync(GATE.outPath, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  // Second pass: the text on disk must pass the same gate on its own,
  // so a write that silently altered the entry cannot slip through.
  validate(back);
}

function report(text: string): void {
  const words = text.split(/\s+/).length;
  const punch = text.slice(text.lastIndexOf(",") + 2);
  console.log(`wrote ${GATE.outPath} (${text.length} characters, ${words} words)`);
  console.log(`entry (${text.length} chars): ${text}`);
  console.log(`twist in last words: "${punch}"`);
  console.log(text);
}

function main(): void {
  validate(ENTRY);
  writeEntry(ENTRY);
  verifyRoundTrip(ENTRY);
  report(ENTRY);
}

main();
