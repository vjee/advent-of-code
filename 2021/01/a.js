const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const depths = input.split("\n").map((depth) => parseInt(depth, 10));

let increaseCount = 0;
let lastDepth = null;

depths.forEach((depth) => {
  if (lastDepth !== null && depth > lastDepth) increaseCount++;
  lastDepth = depth;
});

console.log(increaseCount);
