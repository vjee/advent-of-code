const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const rounds = input.split("\n");

const WIN = { A: "Y", B: "Z", C: "X" };
const DRAW = { A: "X", B: "Y", C: "Z" };
const SHAPE_SCORE = { X: 1, Y: 2, Z: 3 };

const score = rounds.reduce((totalScore, round) => {
  const [oppMove, myMove] = round.split(" ");

  let score = 0;

  if (WIN[oppMove] === myMove) score += 6;
  if (DRAW[oppMove] === myMove) score += 3;
  score += SHAPE_SCORE[myMove];

  return totalScore + score;
}, 0);

console.log(score);
