const input = require("node:fs").readFileSync("./input.txt", "utf-8");

const asArray = (x) => Array.isArray(x) ? x : [x];

const sortPackets = (left, right) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    return left < right ? -1 : left > right ? 1 : 0;
  }
  else if (Array.isArray(left) && Array.isArray(right)) {
    const length = Math.max(left.length, right.length);
    for (let i = 0; i < length; i++) {
      if (i === left.length) return -1;
      if (i === right.length) return 1;
      const res = sortPackets(left[i], right[i]);
      if (res !== 0) return res;
    }
    return 0;
  }
  else {
    return sortPackets(asArray(left), asArray(right));
  }
};

const solveA = () => {
   let result = 0;
   const pairs = input.split("\n\n").map((pair) => pair.split("\n").map(eval));
   
   for (let i = 0; i < pairs.length; i++) {
      const [left, right] = pairs[i];
      if (sortPackets(left, right) === -1) {
         result += i + 1;
      }
   }

  console.log("Part 1");
  console.log(result);
};

const solveB = () => {
  let result = 1;
  const extraPackets = ["[[2]]", "[[6]]"];
  const sortedPackets = input.replaceAll("\n\n", "\n").split("\n").concat(extraPackets).map(eval).sort(sortPackets);

  for (let i = 0; i < sortedPackets.length; i++) {
    if (extraPackets.includes(JSON.stringify(sortedPackets[i]))) {
      result *= i + 1;
    }
  }

  console.log("Part 2");
  console.log(result);
};

solveA();
solveB();
