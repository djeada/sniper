import { useContext, useState } from "react";
import { context } from "./context";

const Cell = ({ i, j, watch, on, winner }: any) => {
  let styles = {};
  const classes = ["cell"];

  const store = !watch ? useContext(context) : { state: {} };

  const [power, setPower] = useState(on);
  if (power) {
    classes.push("on");
  }

  if (winner) {
    classes.push("winner");
  }

  const handleOver = () => {
    if (watch) return;

    if (
      store.state.mouse &&
      store.state.credit > 0 &&
      store.state.winner[0] < 0
    ) {
      const w: any = window;
      w.play();

      if (!power) {
        // remove credit
        store.setState({
          ...store.state,
          credit: store.state.credit - store.state.price,
          hits: [...store.state.hits, [i, j]],
        });
      }

      setPower(1);
    }
  };

  if (power) [classes.push("on")];

  return (
    <div
      className={classes.join(" ")}
      style={styles}
      onMouseOver={handleOver}
    ></div>
  );
};

export default Cell;
