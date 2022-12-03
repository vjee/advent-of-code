const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const rucksacks = input.split("\n");
let sum = 0;

rucksacks.forEach((rucksack) => {
  const one = rucksack.slice(0, rucksack.length / 2).split("");
  const two = rucksack.slice(rucksack.length / 2).split("");

  const commonChar = one.find((char) => two.includes(char));
  const charScore = (ALPHABET + ALPHABET.toUpperCase()).indexOf(commonChar) + 1;

  sum += charScore;
});

console.log(sum);
