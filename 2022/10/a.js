const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const instructions = input.split("\n");
let x = 1;
let cycle = 0;
let result = 0;

const tick = () => {
  cycle++;
  if ((cycle - 20) % 40 === 0) result += cycle * x;
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

console.log(result);
