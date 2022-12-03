const input = require("node:fs").readFileSync("./input.txt", "utf-8");

let day = 0;
let state = input.split(",").map((day) => parseInt(day, 10));

while (day < 80) {
  let spawnCount = 0;

  state = state
    .map((day) => {
      if (day === 0) {
        spawnCount++;
        return 6;
      }

      return day - 1;
    })
    .concat(Array.from({ length: spawnCount }).fill(8));

  day++;
}

console.log(state.length);
