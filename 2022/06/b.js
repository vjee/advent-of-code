const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const nDistinctChars = 14;

for (let i = nDistinctChars; i <= input.length; i++) {
  const marker = input.slice(i - nDistinctChars, i);

  if (new Set(marker).size === nDistinctChars) {
    console.log(i);
    break;
  }
}
