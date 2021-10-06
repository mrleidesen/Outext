import React, { FC, createContext, useContext, useState } from "react";

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
interface Store {
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
}

const StoreContext = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const Store: FC = ({ children }) => {
  const [isStart, setIsStart] = useState(false);
  const [select, setSelect] = useState("1");
  const [isFinish, setIsFinish] = useState(false);
  const [deathCount, setDeathCount] = useState(0);
  const [gameFinishTime, setGameFinishTime] = useState<number[]>([]);

  return (
    <StoreContext.Provider
      value={{
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
