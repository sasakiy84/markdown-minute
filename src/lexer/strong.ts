import { Token } from "../models/token";

const STRONG = "strong";

export const STRONG_ELM_REGXP = /\*\*(.*?)\*\*/;

export const genStrongElement = (
  id: number,
  _text: string,
  parent: Token
): Token => {
  return {
    id,
    elmType: STRONG,
    content: "",
    parent,
  };
};

export const matchWithStrongRegxp = (text: string) => {
  return text.match(STRONG_ELM_REGXP);
};
