import {sum_to_n_a, sum_to_n_b, sum_to_n_c} from "./index"

const input = 9007199254740991
const expect = 20100

console.log(`
    --- Sum to N - A ---
    Input: ${input}
    Output: ${sum_to_n_a(input)}
    Expect: ${expect}
    `)

console.log(`
    --- Sum to N - B ---
    Input: ${input}
    Output: ${sum_to_n_b(input)}
    Expect: ${expect}
    `)

console.log(`
    --- Sum to N - C ---
    Input: ${input}
    Output: ${sum_to_n_c(input)}
    Expect: ${expect}
    `)