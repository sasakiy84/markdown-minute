import { matchWithListRegxp } from "../src/lexer/list";
import { test, expect } from "vitest";

test("List", () => {
  const matchCases = ["* aaa", "- a", "+ a", "* ***", "- ---", "+ +++"];
  const unmatchCases = ["*a", "-a", "+a"];

  matchCases.forEach((testCase) => {
    expect(matchWithListRegxp(testCase)).toBeTruthy();
  });

  unmatchCases.forEach((testCase) => {
    expect(matchWithListRegxp(testCase)).toBeNull();
  });
});
