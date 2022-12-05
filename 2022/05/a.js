const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const [crates, instructions] = input
  .split("\n\n")
  .map((lines) => lines.split("\n"));

const nStacks = crates.at(-1).match(/[0-9]/g).length;
const stacks = [];

crates.pop();

for (let i = 0; i < nStacks; i++) {
  stacks[i] = [];
  for (let j = crates.length - 1; j >= 0; j--) {
    const from = 4 * i + 1;
    const to = from + 1;
    const crate = crates[j].slice(from, to);
    if (crate !== " ") stacks[i].push(crate);
  }
}

for (let i = 0; i < instructions.length; i++) {
  const [n, from, to] = instructions[i]
    .match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
    .slice(1, 4)
    .map((nr) => parseInt(nr, 10));
  const taken = stacks[from - 1].splice(stacks[from - 1].length - n, n);
  stacks[to - 1].push(...taken.reverse());
}

const result = stacks
  .map((stack) => stack.at(-1))
  .reduce((acc, item) => acc + item, "");

console.log(result);
