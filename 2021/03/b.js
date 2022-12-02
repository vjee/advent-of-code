const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const numbers = input.split("\n");

const findNumber = (type) => {
  let remainingNumbers = numbers;
  let i = 0;
  while (remainingNumbers.length > 1) {
    const bits = remainingNumbers.map((nr) => nr[i]);
    const moreZeros =
      bits.filter((bit) => bit === "0").length > bits.length / 2;

    remainingNumbers =
      type === "oxygen"
        ? remainingNumbers.filter((nr) => nr[i] === (moreZeros ? "0" : "1"))
        : remainingNumbers.filter((nr) => nr[i] === (moreZeros ? "1" : "0"));

    i++;
  }
  return parseInt(remainingNumbers[0], 2);
};

const oxygen = findNumber("oxygen");
const co2 = findNumber("co2");

console.log(oxygen * co2);
