import { MergedToken } from "./src/models/merged_token";
import { Token } from "./src/models/token";

const isAllElmParentRoot = (tokens: Array<Token | MergedToken>) => {
  return tokens.map((t) => t.parent.elmType).every((val) => val === "root");
};

const _getInsertPosition = (content: string) => {
  let state = 0;
  const closeTagParentheses = ["<", ">"];
  let position = 0;
  content.split("").some((char, index) => {
    if (state === 1 && char === closeTagParentheses[state]) {
      position = index;
      return true;
    } else if (state === 0 && char === closeTagParentheses[state]) {
      state++;
    }
  });
  return position + 1;
};

const _createMergedContent = (
  currentToken: Token | MergedToken,
  parentToken: Token | MergedToken
) => {
  let content = "";
  switch (parentToken.elmType) {
    case "li":
      content = `<li>${currentToken.content}</li>`;
      break;
    case "ul":
      content = `<ul>${currentToken.content}</ul>`;
      break;
    case "strong":
      content = `<strong>${currentToken.content}</strong>`;
      break;
    case "merged":
      const position = _getInsertPosition(parentToken.content);

      content = `${parentToken.content.slice(0, position)}${
        currentToken.content
      }${parentToken.content.slice(position)}`;
  }

  return content;
};

const _generateHTMLString = (tokens: Array<MergedToken | Token>) => {
  return tokens
    .map((t) => t.content)
    .reverse()
    .join("");
};

const generate = (asts: Token[][]) => {
  const htmlStrings = asts.map((lineTokens) => {
    let rearrangedAst: Array<Token | MergedToken> = lineTokens.reverse();

    while (!isAllElmParentRoot(rearrangedAst)) {
      let index = 0;
      while (index < rearrangedAst.length) {
        if (rearrangedAst[index].parent.elmType === "root") {
          index++;
        } else {
          const currentToken = rearrangedAst[index];
          rearrangedAst = rearrangedAst.filter(
            (_, tokenIndex) => tokenIndex !== index
          );
          const parentIndex = rearrangedAst.findIndex(
            (token) => token.id === currentToken.parent.id
          );
          const parentToken = rearrangedAst[parentIndex];
          const mergedToken: MergedToken = {
            id: parentToken.id,
            elmType: "merged",
            content: _createMergedContent(currentToken, parentToken),
            parent: parentToken.parent,
          };
          rearrangedAst.splice(parentIndex, 1, mergedToken);
        }
      }
    }

    return _generateHTMLString(rearrangedAst);
  });
  //   行をすべて結合
  return htmlStrings.join("");
};

export { generate };
