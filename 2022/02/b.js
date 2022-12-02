const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const rounds = input.split("\n");

const WIN = { A: "B", B: "C", C: "A" };
const DRAW = { A: "A", B: "B", C: "C" };
const LOSE = { A: "C", B: "A", C: "B" };

const SHAPE_SCORE = { A: 1, B: 2, C: 3 };

const score = rounds.reduce((totalScore, round) => {
  const [oppMove, strategy] = round.split(" ");
  let myMove;

  if (strategy === "X") myMove = LOSE[oppMove];
  if (strategy === "Y") myMove = DRAW[oppMove];
  if (strategy === "Z") myMove = WIN[oppMove];

  let score = 0;

  if (WIN[oppMove] === myMove) score += 6;
  if (DRAW[oppMove] === myMove) score += 3;
  score += SHAPE_SCORE[myMove];

  return totalScore + score;
}, 0);

console.log(score);
