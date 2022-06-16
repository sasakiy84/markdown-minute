import { Token } from "../models/token";

const TEXT = "text";

export const genTextElement = (
  id: number,
  text: string,
  parent: Token
): Token => {
  return {
    id,
    elmType: TEXT,
    content: text,
    parent,
  };
};
