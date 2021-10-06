import React, { FC, createContext, useContext } from "react";

interface Store {}

const StoreContext = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const Store: FC = ({ children }) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
};

export default Store;
