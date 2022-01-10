import React from "react";

export interface getInitialStateReturn {
  credit: number;
  price: number;
  net: boolean[][];
  winner: number[];
  mouseDown: boolean;
  opened: boolean;
}

const createNet = (x: number, y: number) => {
  const net = [];
  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      row.push(false);
    }
    net.push(row);
  }

  return net;
};

export const getInitialState = (
  x: number,
  y: number
): getInitialStateReturn => ({
  credit: 50,
  price: 0.1,
  net: createNet(x, y),
  winner: [-1, -1],
  mouseDown: false,
  opened: false,
});
export const context = React.createContext<any>(null);
