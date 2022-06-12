export type Token = {
    id: number; // マージ済みトークンの位置を調べるため必要
    parent: Token;
    elmType: string;
    content: string;
}