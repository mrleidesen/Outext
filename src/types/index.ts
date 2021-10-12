export type TScene = (string | TAction)[];

type TActionLabel = string;
type TActionValue = string;
type TActionLimit = {
  type: "power" | "speed";
  minValue: number;
};

export type TActionData = [TActionLabel, TActionValue, TActionLimit?][];

export type TAction = {
  action: "finish" | "select" | "end";
  data?: TActionData;
  timeout?: number;
};
