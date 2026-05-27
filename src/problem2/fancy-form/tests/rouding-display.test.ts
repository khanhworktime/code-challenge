import { describe, expect, it } from "vitest";

import { formatWithTilde } from "@/utils/rouding-display";

describe("formatWithTilde", () => {
  it("returns the original rounded number when precision does not change it", () => {
    expect(formatWithTilde(12)).toBe(12);
    expect(formatWithTilde(12.345678)).toBe(12.345678);
  });

  it("prefixes rounded values with a tilde using the default precision", () => {
    expect(formatWithTilde(12.3456789)).toBe("~12.345679");
  });

  it("uses a custom precision when provided", () => {
    expect(formatWithTilde(12.345, 2)).toBe("~12.35");
    expect(formatWithTilde(12.3, 2)).toBe(12.3);
  });

  it("handles negative values", () => {
    expect(formatWithTilde(-1.2345678)).toBe("~-1.234568");
    expect(formatWithTilde(-1.25, 2)).toBe(-1.25);
  });
});
