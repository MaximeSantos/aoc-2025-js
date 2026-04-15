const fs = require('fs');

// Read the input file, split it into lines, trim carriage return characters, filter out empty lines, and convert the instructions to numerical values (negative for 'L' and positive for 'R').
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((el) => el.trim('\r'))
  .filter((el) => el.length > 0)
  .map((el) => (el[0] == 'L' ? -Math.abs(el.slice(1)) : Math.abs(el.slice(1)))); // L = negative : subtract from dial | R = positive : add to dial

function solve_a(input) {
  let dial = 50;
  let password = 0;

  input.forEach((el) => {
    dial += el % 100;

    if (dial > 99) {
      // Dial goes from 99 to 0 when rotating right
      dial = dial % 100;
    } else if (dial < 0) {
      // Dial goes from 0 to 99 when rotating left
      dial = 100 + dial;
    }

    if (dial === 0) {
      password++;
    }
  });

  return password;
}

console.log(solve_a(input));
console.log();
