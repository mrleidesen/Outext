import React, { FC, createContext, useContext, useState } from "react";

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
interface Store {
  select: string;
  setSelect: SetStateAction<string>;
}

const StoreContext = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const Store: FC = ({ children }) => {
  const [select, setSelect] = useState("1");

  return (
    <StoreContext.Provider
      value={{
        select,
        setSelect,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
