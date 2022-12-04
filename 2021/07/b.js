const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const positions = input
  .split(",")
  .map((pos) => parseInt(pos, 10))
  .sort((a, b) => a - b);

const min = positions.at(0);
const max = positions.at(-1);

let lastFuel;

const calculateFuel = (steps) => {
  let fuel = 0;
  for (let i = 1; i <= steps; i++) fuel += 1 * i;
  return fuel;
};

for (let i = min; i <= max; i++) {
  let fuel = 0;
  positions.forEach((pos) => {
    if (i < pos) fuel += calculateFuel(pos - i);
    if (i > pos) fuel += calculateFuel(i - pos);
  });

  if (lastFuel && fuel > lastFuel) {
    console.log(lastFuel);
    break;
  }

  lastFuel = fuel;
}
