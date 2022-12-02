const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const numbers = input.split("\n");
let gamma = "";
let epsilon = "";

const bitCount = numbers[0].length;

for (let i = 0; i < bitCount; i++) {
  const bits = numbers.map((nr) => nr[i]);
  const zero = bits.filter((bit) => bit === "0").length;
  const one = bits.filter((bit) => bit === "1").length;

  gamma += zero > one ? "0" : "1";
  epsilon += zero > one ? "1" : "0";
}

gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);

console.log(gamma * epsilon);
