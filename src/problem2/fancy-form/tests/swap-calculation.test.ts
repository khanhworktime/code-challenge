import { describe, expect, it } from "vitest";

import {
  calculateRate,
  calculateReceiveAmount,
} from "@/utils/swap-calculation";

describe("swap calculation utilities", () => {
  describe("calculateRate", () => {
    it("divides the pay token price by the receive token price", () => {
      expect(calculateRate(120, 30)).toBe(4);
    });

    it("returns 0 when either price is missing or zero", () => {
      expect(calculateRate(undefined, 30)).toBe(0);
      expect(calculateRate(120, null)).toBe(0);
      expect(calculateRate(0, 30)).toBe(0);
      expect(calculateRate(120, 0)).toBe(0);
    });
  });

  describe("calculateReceiveAmount", () => {
    it("multiplies the pay amount by the rate", () => {
      expect(calculateReceiveAmount(2.5, 4)).toBe(10);
    });

    it("returns 0 when the pay amount or rate is missing or zero", () => {
      expect(calculateReceiveAmount(undefined, 4)).toBe(0);
      expect(calculateReceiveAmount(2.5, null)).toBe(0);
      expect(calculateReceiveAmount(0, 4)).toBe(0);
      expect(calculateReceiveAmount(2.5, 0)).toBe(0);
    });
  });
});
