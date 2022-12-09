const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const commands = input.split("\n");
const tailPositions = new Set();
let S = { x: 0, y: 0 }, H = { x: 0, y: 0 }, T = { x: 0, y: 0 };

tailPositions.add(`${S.x},${S.y}`);

commands.forEach((command) => {
  let [dir, amount] = command.split(" ");
  amount = parseInt(amount, 10);

  for (let i = 0; i < amount; i++) {
    if (dir === "U") H.y--;
    if (dir === "R") H.x++;
    if (dir === "D") H.y++;
    if (dir === "L") H.x--;

    if (Math.abs(H.x - T.x) < 2 && Math.abs(H.y - T.y) < 2) continue;
    else if (H.x === T.x) T = { x: T.x, y: H.y < T.y ? T.y - 1 : T.y + 1 };
    else if (H.y === T.y) T = { x: H.x < T.x ? T.x - 1 : T.x + 1, y: T.y };
    else T = { x: H.x < T.x ? T.x - 1 : T.x + 1, y: H.y < T.y ? T.y - 1 : T.y + 1 };

    tailPositions.add(`${T.x},${T.y}`);
  }
});

console.log(tailPositions.size);
