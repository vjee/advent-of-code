const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const source = { x: 500, y: 0 };
const rockPaths = input.split("\n").map((line) =>
  line.split(" -> ").map((p) => {
    const [x, y] = p.split(",").map((coord) => parseInt(coord, 10));
    return { x, y };
  })
);
const yCoords = rockPaths.flatMap((path) => path.map((point) => point.y));
const yMax = Math.max(...yCoords);

const createScan = () => {
  const scan = [];

  for (let i = 0; i < rockPaths.length; i++) {
    const points = rockPaths[i];
    const allPoints = [];
    const lines = Array.from({ length: points.length - 1 }).map((_, i) => [
      points[i],
      points[i + 1],
    ]);

    for (let i = 0; i < lines.length; i++) {
      const [a, b] = lines[i];

      if (a.x === b.x) {
        const x = a.x;
        const [y1, y2] = a.y < b.y ? [a.y, b.y] : [b.y, a.y];
        for (let y = y1; y <= y2; y++) allPoints.push([x, y]);
      } else {
        const y = a.y;
        const [x1, x2] = a.x < b.x ? [a.x, b.x] : [b.x, a.x];
        for (let x = x1; x <= x2; x++) allPoints.push([x, y]);
      }
    }

    allPoints.forEach(([x, y]) => {
      scan[y] ||= [];
      scan[y][x] = "#";
    });
  }

  return scan;
};

const solveA = () => {
  const getElement = (p) => scan[p.y]?.[p.x];
  const canGoTo = (p) => getElement(p) !== "#" && getElement(p) !== "O";

  const scan = createScan();
  let result = 0;

  while (true) {
    let current = { ...source };
    let stop = false;

    while (current.y <= yMax) {
      const bottom = { x: current.x, y: current.y + 1 };
      const left = { x: current.x - 1, y: current.y + 1 };
      const right = { x: current.x + 1, y: current.y + 1 };

      if (canGoTo(bottom)) current = bottom;
      else if (canGoTo(left)) current = left;
      else if (canGoTo(right)) current = right;
      else break;

      if (current.y >= yMax) stop = true;
    }

    if (stop) break;

    scan[current.y] ||= [];
    scan[current.y][current.x] = "O";
    result++;
  }

  console.log("Part 1");
  console.log(result);
};

const solveB = () => {
  const getElement = (p) => (p.y === yMax + 2 ? "#" : scan[p.y]?.[p.x]);
  const canGoTo = (p) => getElement(p) !== "#" && getElement(p) !== "O";

  const scan = createScan();
  let result = 0;

  while (getElement(source) !== "O") {
    let current = { ...source };

    while (true) {
      const bottom = { x: current.x, y: current.y + 1 };
      const left = { x: current.x - 1, y: current.y + 1 };
      const right = { x: current.x + 1, y: current.y + 1 };

      if (canGoTo(bottom)) current = bottom;
      else if (canGoTo(left)) current = left;
      else if (canGoTo(right)) current = right;
      else break;
    }

    scan[current.y] ||= [];
    scan[current.y][current.x] = "O";
    result++;
  }

  console.log("Part 2");
  console.log(result);
};

solveA();
solveB();
