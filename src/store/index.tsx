import React, { FC, createContext, useContext, useState } from "react";

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
type User = {
  power: number;
  speed: number;
};
interface Store {
  user: User;
  setUser: SetStateAction<User>;
  isStart: boolean;
  setIsStart: SetStateAction<boolean>;
  select: string;
  setSelect: SetStateAction<string>;
  isFinish: boolean;
  setIsFinish: SetStateAction<boolean>;
  deathCount: number;
  setDeathCount: SetStateAction<number>;
  gameFinishTime: number[];
  setGameFinishTime: SetStateAction<number[]>;
  restart: () => void;
}

const StoreContext = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const Store: FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    power: 5,
    speed: 5,
  });
  const [isStart, setIsStart] = useState(false);
  const [select, setSelect] = useState("1");
  const [isFinish, setIsFinish] = useState(false);
  const [deathCount, setDeathCount] = useState(0);
  const [gameFinishTime, setGameFinishTime] = useState<number[]>([]);

  const restart = () => {
    setIsStart(false);
    setSelect("1");
    setIsFinish(false);
    setDeathCount(0);
    setGameFinishTime([]);
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        isStart,
        setIsStart,
        select,
        setSelect,
        isFinish,
        setIsFinish,
        deathCount,
        setDeathCount,
        gameFinishTime,
        setGameFinishTime,
        restart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
