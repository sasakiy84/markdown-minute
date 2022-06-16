import { generate } from "./generator";
import { analyze } from "./lexer";
import { parse } from "./parser";

const convertToHTMLString = (markdown: string) => {
  const mdArray = analyze(markdown);
  const asts = mdArray.map((mdRow) => parse(mdRow));
  const htmlString = generate(asts);
  return htmlString;
};

console.log(convertToHTMLString("normal text\n \n * **boldlist1**\n * list2"));
