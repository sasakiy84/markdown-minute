import { matchWithListRegxp } from "./lexer/list";
import { genStrongElement, matchWithStrongRegxp } from "./lexer/strong";
import { genTextElement } from "./lexer/text";
import { Token } from "./models/token";

const rootToken: Token = {
  id: 0,
  elmType: "root",
  content: "",
  parent: {} as Token,
};

export const parse = (markdownRow: string) => {
  if (matchWithListRegxp(markdownRow)) {
    return _tokenizeList(markdownRow);
  }
  return _tokenizeText(markdownRow);
};

const _tokenizeText = (
  textElement: string,
  initialId: number = 0,
  initialRoot: Token = rootToken
) => {
  let elements: Token[] = [];
  let parent: Token = initialRoot;

  let id = initialId;

  const _tokenize = (originalText: string, p: Token) => {
    let processingText = originalText;
    parent = p;
    while (processingText.length !== 0) {
      console.log(processingText);
      const matchArray = matchWithStrongRegxp(processingText);

      if (!matchArray) {
        id++;
        const onlyText = genTextElement(id, processingText, parent);
        processingText = "";
        elements.push(onlyText);
      } else {
        if (Number(matchArray.index)) {
          const text = processingText.substring(0, Number(matchArray.index));
          id++;
          const textElm = genTextElement(id, text, parent);
          elements.push(textElm);
          processingText = processingText.replace(text, "");
        }
        id++;
        const elm = genStrongElement(id, "", parent);

        parent = elm;
        elements.push(elm);

        processingText = processingText.replace(matchArray[0], "");
        // console.log(typeof matchArray[1], matchArray[1]);

        // matchArrayの1以降には、()でマッチしたテキストが入っている
        _tokenize(matchArray[1], parent);
        parent = p;
      }
    }
  };
  _tokenize(textElement, parent);
  return elements;
};

export const _tokenizeList = (listString: string) => {
  const UL = "ul";
  const LIST = "li";

  let id = 1;
  const rootUlToken: Token = {
    id,
    elmType: UL,
    content: "",
    parent: rootToken,
  };
  let parent = rootUlToken;
  let tokens: Token[] = [rootUlToken];
  listString
    .split(/\r\n|\r|\n/)
    .filter((line) => Boolean(line))
    .forEach((line) => {
      // matchされるときしかここに来ない
      const match = matchWithListRegxp(line) as RegExpMatchArray;

      id++;
      const listToken: Token = {
        id,
        elmType: LIST,
        content: "",
        parent,
      };
      tokens.push(listToken);
      const listText: Token[] = _tokenizeText(match[3], id, listToken);
      id += listText.length;
      tokens.push(...listText);
    });
  return tokens;
};
