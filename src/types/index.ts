export type TScene = (string | TAction)[];

type TActionLabel = string;
type TActionValue = string;
export type TActionLimit = {
  type: "power" | "speed";
  minValue: number;
};

export type TActionData = [TActionLabel, TActionValue, TActionLimit[]?];

export type TActionList = TActionData[];

export type TActionType = "finish" | "select" | "end";

export type TAction = {
  action: TActionType;
  data?: TActionList;
  timeout?: number;
};
