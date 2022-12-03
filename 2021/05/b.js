const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const segments = input.split("\n");
const coords = {};

const SEGMENT_REGEX = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/;

const fill = (a, b) => {
  const length = Math.abs(a - b);
  if (a < b) return Array.from({ length: length + 1 }).map((_, i) => a + i);
  if (a > b) return Array.from({ length: length + 1 }).map((_, i) => a - i);
  return [a];
};

for (let i = 0; i < segments.length; i++) {
  const [_, x1, y1, x2, y2] = segments[i]
    .match(SEGMENT_REGEX)
    .map((nr) => parseInt(nr, 10));

  const x = fill(x1, x2);
  const y = fill(y1, y2);

  const lineLength = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) + 1;

  Array.from({ length: lineLength })
    .map((_, i) => [x[i % x.length], y[i % y.length]])
    .forEach((coord) => {
      coords[coord.join(",")] ||= 0;
      coords[coord.join(",")] += 1;
    });
}

const result = Object.values(coords).reduce(
  (acc, item) => (item >= 2 ? acc + 1 : acc),
  0
);

console.log(result);
