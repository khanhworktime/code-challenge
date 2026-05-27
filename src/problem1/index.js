// A - Using loop to perform a sum from 1 -> n
// Complexity: O(n)
var sum_to_n_a = function (n) {
  if (n < 0) throw Error("Negative input");
  let result = 0;
  for (var i = 1; i <= n; i++) {
    result += i;
  }

  return result;
};

// B - Using recursive
// Complexity: O(n)
var sum_to_n_b = function (n) {
  if (n < 0) throw Error("Negative input");

  if (n > 1) {
    return n + sum_to_n_b(n - 1);
  }

  return 1;
};

// C - Using the Arithmetic Progression
// Complexity: O(1)
// Formular is: S(n) = (n / 2) * (2 * a + (n - 1) * d)
// Explaination:
//  - n : total numbers
//  - a : first number of the array = 1
//  - d : difference of 2 numbers = 1
// The simplify formular is: S(n) = (n/2) * (1 + n)
var sum_to_n_c = function (n) {
  if (n < 0) throw Error("Negative input");

  let result = (n / 2) * (1 + n);

  return result;
};

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
