const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const commands = input.split("\n");
const tailPositions = new Set();
const R = Array.from({ length: 10 }).map(() => ({ x: 0, y: 0 }));

tailPositions.add(`${R[0].x},${R[0].y}`);

commands.forEach((command) => {
  let [dir, amount] = command.split(" ");
  amount = parseInt(amount, 10);

  for (let i = 0; i < amount; i++) {
    if (dir === "U") R.at(-1).y--;
    if (dir === "R") R.at(-1).x++;
    if (dir === "D") R.at(-1).y++;
    if (dir === "L") R.at(-1).x--;

    for (let i = R.length - 1; i > 0; i--) {
      const H = R[i], T = R[i - 1];

      if (Math.abs(H.x - T.x) < 2 && Math.abs(H.y - T.y) < 2) continue;
      else if (H.x === T.x) R[i - 1] = { x: T.x, y: H.y < T.y ? T.y - 1 : T.y + 1 };
      else if (H.y === T.y) R[i - 1] = { x: H.x < T.x ? T.x - 1 : T.x + 1, y: T.y };
      else R[i - 1] = { x: H.x < T.x ? T.x - 1 : T.x + 1, y: H.y < T.y ? T.y - 1 : T.y + 1 };
    }

    tailPositions.add(`${R[0].x},${R[0].y}`);
  }
});

console.log(tailPositions.size);
