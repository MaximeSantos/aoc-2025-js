const fs = require('fs');

function parse(path) {
  let parsed = fs
    .readFileSync(path)
    .toString()
    .split('\n')
    .map((el) => el.trim('\r'))
    .filter((el) => el.length > 0)
    .map((el) => (el[0] == 'L' ? -Math.abs(el.slice(1)) : Math.abs(el.slice(1)))); // L = negative : subtract from dial | R = positive : add to dial

  return parsed;
}

// Read the input file, split it into lines, trim carriage return characters, filter out empty lines, and convert the instructions to numerical values (negative for 'L' and positive for 'R').
let input = parse('./input.txt');
let test_input = parse('./test.txt');

function solve_a(input) {
  let dial = 50;
  let password = 0;

  input.forEach((turn) => {
    dial += turn % 100; // Only keeps the last two digits of the current turn, since going 100 left or right goes back around, the last two digits are the only two that matter here

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

function solve_b(input) {
  let current_dial = 50;
  let password = 0;

  input.forEach((el, k) => {
    next_dial = current_dial + el;

    // Dial goes from 99 to 0 when rotating right
    if (next_dial > 99) {
      password += Math.trunc(next_dial / 100); // Add the number of hundreds on the dial to the password
      next_dial = next_dial % 100; // Then set the dial to the right last two digits

      // Dial goes from 0 to 99 when rotating left
    } else if (next_dial <= 0) {
      password += Math.abs(Math.trunc(next_dial / 100)); // if we go over 100 to the left, add the number of hundreds on the dial to the password
      next_dial %= 100; // then cleanup the dial by removing the hundreds that we already added to the password
      if (next_dial !== 0) {
        next_dial = 100 + next_dial; // then reset the dial to 100 and substract the last two digits that are left
      }

      // If we were not already on zero,
      if (current_dial !== 0) {
        password++; // Then we need to increment the password by one, since that means we passed by zero on the way over
      }
    }

    current_dial = next_dial; // Finally we set the current dial to the correct position
  });

  return password;
}

console.log('The solution for part A is : ', solve_a(input));
console.log('--------------');
// console.log('TEST is : ', solve_b(test_input)); // TEST RESULT SHOULD BE 7
// console.log('--------------');
console.log('The solution for part B is : ', solve_b(input));
console.log('--------------');
