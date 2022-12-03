const input = require("node:fs").readFileSync("./input.txt", "utf-8");

let [numbers, ...boards] = input.split("\n\n");
numbers = numbers.split(",").map((nr) => parseInt(nr, 10));
boards = boards.map((board) =>
  board
    .trim()
    .replace(/(\n| )+/g, " ")
    .split(" ")
    .map((nr) => parseInt(nr, 10))
);

const drawnNumbers = [];
const winningBoards = [];
let result = null;

while (winningBoards.length < boards.length) {
  drawnNumbers.push(numbers.shift());

  for (let i = 0; i < boards.length; i++) {
    if (winningBoards.includes(i)) continue;

    const board = boards[i];
    const sequences = [];

    for (let i = 0; i < 5; i++) {
      sequences.push([0, 1, 2, 3, 4].map((offset) => board[i * 5 + offset]));
      sequences.push([0, 5, 10, 15, 20].map((offset) => board[i + offset]));
    }

    if (sequences.some((seq) => seq.every((nr) => drawnNumbers.includes(nr)))) {
      const sum = board
        .filter((nr) => !drawnNumbers.includes(nr))
        .reduce((acc, item) => acc + item, 0);

      winningBoards.push(i);
      result = sum * drawnNumbers.at(-1);
    }
  }
}

console.log(result);
