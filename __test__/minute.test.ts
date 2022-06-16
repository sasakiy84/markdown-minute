import { convertToHTMLString } from "../src/index";
import { test, expect } from "vitest";

test("HTMLList", () => {
  const testCases = [
    ["* a", "<ul><li>a</li></ul>"],
    ["* a\n* b", "<ul><li>a</li><li>b</li></ul>"],
    // TODO nested list の実装
    // ["* a\n  * nested", "<ul><li>a<ul><li>nested</li></ul></li></ul>"],

    ["- a", "<ul><li>a</li></ul>"],
    ["- a\n- b", "<ul><li>a</li><li>b</li></ul>"],
    // ['- a\n  - nested', '<ul><li>a<ul><li>nested</li></ul></li></ul>'],

    ["+ a", "<ul><li>a</li></ul>"],
    ["+ a\n+ b", "<ul><li>a</li><li>b</li></ul>"],
    // ['+ a\n  + nested', '<ul><li>a<ul><li>nested</li></ul></li></ul>'],
  ];
  testCases.forEach((testCase) => {
    expect(convertToHTMLString(testCase[0])).toBe(testCase[1]);
  });
});

test("HTMLBold", () => {
  const testCases = [
    ["**bold**", "<strong>bold</strong>"],
    ["normal**bold**normal", "normal<strong>bold</strong>normal"],
  ];

  testCases.forEach((testCase) => {
    expect(convertToHTMLString(testCase[0])).toBe(testCase[1]);
  });
});
