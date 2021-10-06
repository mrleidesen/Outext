export type TScene = (string | TAction)[];

export type TAction = {
  action: "finish" | "select" | "end";
  data?: string[][];
  timeout?: number;
};
