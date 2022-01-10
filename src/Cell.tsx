import { useContext, useEffect, useState } from "react";
import { context } from "./context";

interface NetProps {
  key: string;
  i: number;
  j: number;
  on: boolean;
  winner: boolean;
}

const Cell = ({ i, j, on, winner }: NetProps) => {
  console.log("render cell");

  let styles = {};
  const classes = ["cell"];

  const store = useContext(context);

  if (winner) {
    classes.push("winner");
  }

  if (on) [classes.push("on")];

  const handleOver =
    (clicked = false) =>
    () => {
      if (
        (store.state.mouseDown || clicked) &&
        store.state.credit > 0 &&
        store.state.winner[0] < 0
      ) {
        const w: any = window;
        w.play();

        if (!on) {
          const net = store.state.net;
          net[i][j] = true;

          store.setState({
            ...store.state,
            credit: store.state.credit - store.state.price,
            net,
          });
        }
      }
    };

  return (
    <div
      className={classes.join(" ")}
      style={styles}
      onMouseOver={handleOver(false)}
      onClick={handleOver(true)}
    ></div>
  );
};

export default Cell;
