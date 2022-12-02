const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");
let horizontal = 0;
let depth = 0;

lines.forEach((line) => {
  let [command, value] = line.split(" ");
  value = parseInt(value, 10);

  if (command === "down") depth += value;
  if (command === "up") depth -= value;
  if (command === "forward") horizontal += value;
});

console.log(horizontal * depth);
