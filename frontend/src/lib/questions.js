import { shuffleArray } from "./utils";

export function generateQuestions(table, count = 10, maxMultiplier = 10) {
  const base = Array.from({ length: maxMultiplier + 1 }, (_, i) => ({
    multiplicand: table,
    multiplier: i,
    answer: table * i,
    id: `${table}-${i}`,
  }));

  const shuffled = shuffleArray(base);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function formatDuration(seconds) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}