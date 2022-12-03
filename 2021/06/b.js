const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const counters = input.split(",").map((day) => parseInt(day, 10));

let map = new Map();

for (let i = 0; i < counters.length; i++) {
  const counter = counters[i];
  map.set(counter, (map.get(counter) || 0) + 1);
}

for (let i = 0; i < 256; i++) {
  let mapCopy = new Map();
  for (const [counter, amount] of map) {
    if (counter === 0) {
      mapCopy.set(6, (mapCopy.get(6) || 0) + amount);
      mapCopy.set(8, (mapCopy.get(8) || 0) + amount);
    } else {
      mapCopy.set(counter - 1, (mapCopy.get(counter - 1) || 0) + amount);
    }
  }
  map = mapCopy;
}

const result = [...map.values()].reduce((acc, item) => acc + item, 0);

console.log(result);

// const input = require("node:fs").readFileSync("./input.txt", "utf-8");

// const counters = input.split(",").map((day) => parseInt(day, 10));

// let totalDays = 256;
// let nFish = counters.length;

// const simulate = (counter, day) => {
//   const childCount = Math.max(Math.ceil((totalDays - day - counter) / 7), 0);
//   const firstChildInNDays = counter + 1;

//   nFish += childCount;

//   for (let j = 0; j < childCount; j++) {
//     const offset = 7 * j;
//     simulate(8, day + firstChildInNDays + offset);
//   }
// };

// for (let i = 0; i < counters.length; i++) {
//   const counter = counters[i];
//   simulate(counter, 0, 0);
// }

// console.log(nFish);
