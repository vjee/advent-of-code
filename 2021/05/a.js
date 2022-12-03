const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const segments = input.split("\n");
const coords = {};

const SEGMENT_REGEX = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/;

const addToCoords = (coord) => {
  coords[coord.join(",")] ||= 0;
  coords[coord.join(",")] += 1;
};

for (let i = 0; i < segments.length; i++) {
  const [_, x1, y1, x2, y2] = segments[i]
    .match(SEGMENT_REGEX)
    .map((nr) => parseInt(nr, 10));

  if (x1 === x2) {
    Array.from({ length: Math.abs(y1 - y2) + 1 })
      .map((_, i) => [x1, y1 < y2 ? y1 + i : y1 - i])
      .forEach(addToCoords);
  }

  if (y1 === y2) {
    Array.from({ length: Math.abs(x1 - x2) + 1 })
      .map((_, i) => [x1 < x2 ? x1 + i : x1 - i, y1])
      .forEach(addToCoords);
  }
}

const result = Object.values(coords).reduce(
  (acc, item) => (item >= 2 ? acc + 1 : acc),
  0
);

console.log(result);
