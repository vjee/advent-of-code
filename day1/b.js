const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const elves = input
  .split("\n\n")
  .map((elve) => elve.split("\n").map((cal) => parseInt(cal, 10)));

const elveCalSums = elves
  .map((elve) => elve.reduce((acc, item) => acc + item, 0))
  .sort((a, b) => b - a);

const result = elveCalSums.slice(0, 3).reduce((acc, item) => acc + item, 0);

console.log(result);
