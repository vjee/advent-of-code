const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const positions = input
  .split(",")
  .map((pos) => parseInt(pos, 10))
  .sort((a, b) => a - b);

const min = positions.at(0);
const max = positions.at(-1);

let lastFuel;

for (let i = min; i <= max; i++) {
  let fuel = 0;
  positions.forEach((pos) => {
    if (i < pos) fuel += pos - i;
    if (i > pos) fuel += i - pos;
  });

  if (lastFuel && fuel > lastFuel) {
    console.log(lastFuel);
    break;
  }

  lastFuel = fuel;
}
