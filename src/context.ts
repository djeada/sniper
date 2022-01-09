import React from "react";

export const initialState = {
  credit: 50,
  price: 0.1,
  hits: [],
  winner: [-1, -1],
};
export const context = React.createContext<any>(null);
