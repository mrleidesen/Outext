export type TScene = (string | TAction)[];

type TActionLabel = string;
type TActionValue = string;

export type TLimitType = "power" | "speed" | "wise" | "sneak" | "luck";

export type TActionLimit = {
  type: TLimitType;
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

export type User = {
  [key in TLimitType]: number;
};
