const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const pairs = input
  .split("\n")
  .map((pair) =>
    pair
      .split(",")
      .map((assignment) => assignment.split("-").map((id) => parseInt(id, 10)))
  );

let overlapCount = 0;

const fill = ([a, b]) => {
  let array = [];
  for (let i = a; i <= b; i++) array.push(i);
  return array;
};

for (let i = 0; i < pairs.length; i++) {
  const [a1, a2] = pairs[i]
    .map((assigmnent) => fill(assigmnent))
    .sort((a, b) => a.length - b.length);

  if (a1.some((id) => a2.includes(id))) overlapCount++;
}

console.log(overlapCount);
