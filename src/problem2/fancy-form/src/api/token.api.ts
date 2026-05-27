import type { Token } from "../types/Token.interface";

// Output: Token[]
export async function getTokenList() {
  try {
    const res = await fetch("https://interview.switcheo.com/prices.json");
    const tokenList: Token[] = await res.json();
    return tokenList;
  } catch (e: any) {
    throw e;
  }
}
