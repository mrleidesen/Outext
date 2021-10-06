export type TScene = (string | TAction)[];

export type TAction = {
  action: "setUserName" | "select";
  data?: string[][];
  timeout?: number;
};
