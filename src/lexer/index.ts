import { matchWithListRegxp } from "./list";

export const analyze = (markdown: string) => {
  const NEUTRAL_STATE = "neutral_state";
  const LIST_STATE = "list_state";
  let state = NEUTRAL_STATE;

  let lists = "";

  const rawMdArray = markdown.split(/\r\n|\r|\n/);
  let mdArray: string[] = [];

  rawMdArray.forEach((md, index) => {
    const listMatch = matchWithListRegxp(md);
    if (state === NEUTRAL_STATE && listMatch) {
      state = LIST_STATE;
      lists += `${md}\n`;
    } else if (state === LIST_STATE && listMatch) {
      lists += `${md}\n`;
    } else if (state === LIST_STATE && !listMatch) {
      state = NEUTRAL_STATE;
      mdArray.push(lists);
      lists = "";
    }
    if (
      lists.length > 0 &&
      (state === NEUTRAL_STATE || index === rawMdArray.length - 1)
    ) {
      mdArray.push(lists);
    }

    if (lists.length === 0) mdArray.push(md);
  });

  return mdArray;
};
