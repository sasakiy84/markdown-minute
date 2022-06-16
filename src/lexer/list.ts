// mは複数行検索
const LIST_REGEXP = /^( *)([-|\*|\+] (.+))$/m;
export const matchWithListRegxp = (text: string) => {
  return text.match(LIST_REGEXP);
};
