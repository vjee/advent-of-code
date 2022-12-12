const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const lines = input.split("\n");
const grid = [];
const width = lines[0].length;
const height = lines.length;
let S, E;

const point = (x, y) => ({ x, y });
const strToPoint = (str) => point(...str.split(",").map((x) => parseInt(x)));
const pointToStr = ({ x, y }) => `${x},${y}`;
const pointsAreEqual = (a, b) => a.x === b.x && a.y === b.y;
const neighbors = ({ x, y }) => {
  const height = grid[x][y];
  return [point(x, y - 1), point(x + 1, y), point(x, y + 1), point(x - 1, y)]
    .filter((n) => grid[n.x]?.[n.y] !== undefined)
    .filter((n) => grid[n.x]?.[n.y] <= height + 1)
    .map((n) => pointToStr(n));
};

const reconstructPath = (cameFrom, current) => {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.unshift(current);
  }
  return path;
};

const aStar = (start, end) => {
  const h = (n) => Math.abs(n.x - end.x) + Math.abs(n.y - end.y);
  const openSet = new Set([pointToStr(start)]);
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  gScore.set(pointToStr(start), 0);
  fScore.set(pointToStr(start), h(start));

  while (openSet.size > 0) {
    const current = [...openSet]
      .sort((a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity))
      .at(0);

    if (pointsAreEqual(strToPoint(current), end)) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);
    neighbors(strToPoint(current)).forEach((neighbor) => {
      const tentativeGScore = (gScore.get(current) ?? Infinity) + 1;
      if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + h(strToPoint(neighbor)));
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    });
  }
};

const solveA = () => {
  console.log("Part 1");
  console.log(aStar(S, E).length - 1);
};

const solveB = () => {
  let shortestPath = { length: Infinity };

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const char = lines[y][x];
      if (char === "a" || char === "S") {
        const path = aStar(point(x, y), E);
        if (path && path.length < shortestPath.length) {
          shortestPath = path;
        }
      }
    }
  }

  console.log("Part 2");
  console.log(shortestPath.length - 1);
};

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const char = lines[y][x];
    if (char === "S") S = point(x, y);
    if (char === "E") E = point(x, y);

    grid[x] ||= [];
    grid[x][y] = ALPHABET.indexOf(char.replace("S", "a").replace("E", "z"));
  }
}

solveA();
solveB();
