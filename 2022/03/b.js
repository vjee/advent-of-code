const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const chunk = (array, size) =>
  array.reduce((acc, item, i) => {
    i % size === 0 ? acc.push([item]) : acc.at(-1).push(item);
    return acc;
  }, []);

const rucksacks = input.split("\n");
const groups = chunk(rucksacks, 3);

let sum = 0;

groups.forEach((group) => {
  const [one, two, three] = group.map((rucksack) => rucksack.split(""));

  const commonChar = one.find(
    (char) => two.includes(char) && three.includes(char)
  );
  const charScore = (ALPHABET + ALPHABET.toUpperCase()).indexOf(commonChar) + 1;

  sum += charScore;
});

console.log(sum);
