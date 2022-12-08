const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");
const maxY = lines.length;
const maxX = lines[0].length;
const grid = [];

for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    grid[y] ||= [];
    grid[y][x] = parseInt(lines[y][x], 10);
  }
}

let result = 0;

for (let y = 1; y < maxY - 1; y++) {
  for (let x = 1; x < maxX - 1; x++) {
    const height = grid[y][x];
    const top = grid.slice(0, y).map((r) => r[x]);
    const right = grid[y].slice(x + 1);
    const bottom = grid.slice(y + 1).map((r) => r[x]);
    const left = grid[y].slice(0, x);

    top.reverse();
    left.reverse();

    const score = [top, right, bottom, left]
      .map((dir) => {
        let score = 0;
        for (let i = 0; i < dir.length; i++) {
          score++;
          if (dir[i] >= height) break;
        }
        return score;
      })
      .reduce((acc, score) => acc * score);

    if (score > result) result = score;
  }
}

console.log(result);
