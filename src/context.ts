import React from "react";

export interface StateType {
  credit: number;
  price: number;
  hits: never[];
  winner: number[];
  mouse: number;
  opened: boolean;
  hash?: string
}

export const initialState = {
  credit: 50,
  price: 0.1,
  hits: [],
  winner: [-1, -1],
  mouse: 0,
  opened: false,
};
export const context = React.createContext<any>(null);
