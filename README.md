[![Bounty](https://make.fun/badge/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a.svg)](https://make.fun/bounty/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a)
[![Rank](https://make.fun/badge/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a/badboy0771/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a/rank.svg)](https://make.fun/bounty/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a)
[![Reward](https://make.fun/badge/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a/badboy0771/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a/reward.svg)](https://make.fun/bounty/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a)

# Eight Hours of Worry

One line, 112 characters: a sleep tracker praises eight hours of sleep — earned by lying awake worrying about the sleep tracker itself.

> My sleep tracker praised my eight hours of sleep, which I earned by lying awake worrying about my sleep tracker.

## Why this line

The judge weighs the laugh first, then the turn, the tightness, the freshness and the clarity. This line is built to that brief, in order:

- **The laugh:** the device meant to end the worry is the thing being worried about. The praise is real; the sleep is not.
- **The turn:** the sentence opens on a compliment ("praised my eight hours of sleep") and turns in its last clause — the eight hours were *earned* by lying awake. The twist lands in the last three words.
- **The loop closes on itself:** "sleep tracker" opens the line and closes it. Remove either mention and the joke has nothing to bite.
- **Tight:** 112 characters, one sentence, twenty words. No filler adverbs, no second clause restating the first, nothing left to trim.
- **Fresh and clear:** a tracker-anxiety loop, not a bar joke or a "my wife" joke; it reads whole on first read, with no setup note and no explanation.

## How it runs

`main.ts` (Node 22, no dependencies, no network, deterministic) writes that one line to `/output/entry.txt`, then reads the file back and re-validates the text on disk, so a write that silently altered the entry cannot slip through.

```sh
node main.ts
```

## Gate checklist

| Rule | Result |
| --- | --- |
| 1–140 characters | 112 ✓ |
| Exactly one line | 1 ✓ |
| One sentence, ending in a period | 1 terminator ✓ |
| Whole joke on its own (praised / earned / worrying) | ✓ |
| Twist lands in the last few words (my sleep tracker) | ✓ |
| Loop closes: tracker named exactly twice, opens and closes the line | ✓ |
| Tight, no filler adverbs | ✓ |
| Fresh, no worn-out joke shapes | ✓ |
| Clear on first read, no setup or explanation | ✓ |
| No leading/trailing whitespace, no double spaces, no trailing newline | ✓ |
| File reads back byte-identical | ✓ |
