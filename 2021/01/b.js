const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const depths = input.split("\n").map((depth) => parseInt(depth, 10));

const windows = [];
let windowIndex = 0;

while (depths.length >= windowIndex + 3) {
  windows.push(depths.slice(windowIndex, windowIndex + 3));
  windowIndex++;
}

let increaseCount = 0;
let lastDepth = null;

windows.forEach((window) => {
  const depth = window.reduce((acc, item) => acc + item);
  if (lastDepth !== null && depth > lastDepth) increaseCount++;
  lastDepth = depth;
});

console.log(increaseCount);
