import { matchWithStrongRegxp } from "../src/lexer/strong";
import { test, expect } from "vitest";

test("Strong", () => {
  const matchCases = ["****", "**aa**"];
  const unmatchCases = ["", "*aaaa***", "**aaa*"];

  matchCases.forEach((testCase) => {
    expect(matchWithStrongRegxp(testCase)).toBeTruthy();
  });

  unmatchCases.forEach((testCase) => {
    expect(matchWithStrongRegxp(testCase)).toBeNull();
  });
});
