const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const instructions = input.split("\n");
let x = 1;
let cycle = 0;

const tick = () => {
  const mod = cycle % 40;
  const lit = mod >= x - 1 && mod <= x + 1;
  if (cycle > 0 && mod === 0) process.stdout.write("\n");
  process.stdout.write(lit ? "#" : " ");
  cycle++;
};

instructions.forEach((instruction) => {
  if (instruction === "noop") {
    tick();
  } else {
    tick();
    tick();
    x += parseInt(instruction.split(" ")[1], 10);
  }
});

process.stdout.write("\n");
