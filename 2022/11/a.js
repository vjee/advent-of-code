const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const int = (arg) => parseInt(arg, 10);

const monkeys = input.split("\n\n").map((monkey) => {
  const data = {};
  const lines = monkey.split("\n");

  data.items = lines[1].slice(18).split(", ").map(int);

  const operator = lines[2].slice(23, 24);
  const value = lines[2].slice(25);
  if (operator === "+") data.operation = (old) => old + (value === "old" ? old : int(value));
  if (operator === "*") data.operation = (old) => old * (value === "old" ? old : int(value));

  const divisor = int(lines[3].slice(21));
  const yes = int(lines[4].slice(-1));
  const no = int(lines[5].slice(-1));
  data.test = (score) => (score % divisor === 0 ? yes : no);

  return data;
});

const times = Object.fromEntries(monkeys.map((_, i) => [i, 0]));

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey, index) => {
    while (monkey.items.length > 0) {
      times[index] += 1;
      const level = monkey.items.shift();
      const newLevel = Math.floor(monkey.operation(level) / 3);
      const nextMonkey = monkey.test(newLevel);
      monkeys.at(nextMonkey).items.push(newLevel);
    }
  });
}

const result = Object.values(times)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((acc, value) => acc * value);

console.log(result);
