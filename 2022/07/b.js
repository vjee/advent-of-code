const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");
const flatTree = new Map();

let i = 0;
let path = [];
while (true) {
  const line = lines[i];
  const command = line.slice(2, 4);
  const nextCommand = lines.slice(i + 1).findIndex((line) => line[0] === "$");

  if (command === "cd") {
    const arg = line.slice(5);
    if (arg === "/") path = [];
    else if (arg === "..") path.pop();
    else path.push(arg);
  }

  if (command === "ls") {
    const output =
      nextCommand > -1
        ? lines.slice(i + 1, i + 1 + nextCommand)
        : lines.slice(i + 1);

    output.forEach((item) => {
      if (item.startsWith("dir")) {
        const dirname = item.slice(4);
        flatTree.set([...path, dirname].join("/"), []);
      } else {
        const [size, filename] = item.split(" ");
        flatTree.set([...path, filename].join("/"), parseInt(size, 10));
      }
    });
  }

  if (nextCommand === -1) break;
  i += nextCommand + 1;
}

const sum = (acc, [, val]) => acc + val;
const isDir = ([, val]) => Array.isArray(val);
const isFile = ([, val]) => typeof val === "number";
const isChild = ([kParent], [kChild]) =>
  kChild !== kParent && kChild.startsWith(kParent);

const CAPACITY = 70_000_000;
const UPDATE_SIZE = 30_000_000;

const usedSpace = [...flatTree].filter(isFile).reduce(sum, 0);
const availableSpace = CAPACITY - usedSpace;
const missingSpace = UPDATE_SIZE - availableSpace;

const result = [...flatTree]
  .filter(isDir)
  .map((dirEntry) =>
    [...flatTree]
      .filter((entry) => isFile(entry) && isChild(dirEntry, entry))
      .reduce(sum, 0)
  )
  .sort((a, b) => a - b)
  .find((val) => val >= missingSpace);

console.log(result);
