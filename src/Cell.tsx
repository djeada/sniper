import { useContext, useState } from "react";
import { context } from "./context";

const Cell = ({ i, j }: any) => {
  let styles = {};
  const classes = ["cell"];

  const store = useContext(context);

  const on = store.state.hits.filter(([I, J]: number[]) => {
    return I === i && J === j;
  }).length;

  const [power, setPower] = useState(on);
  if (power) {
    classes.push("on");
  }

  const winner =
    store.state.winner &&
    store.state.winner[0] === i &&
    store.state.winner[1] === j;

  if (winner) {
    classes.push("winner");
  }

  const handleClick = () => {
    if (store.state.credit > 0 && store.state.winner[0] < 0) {
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
      onClick={handleClick}
      onMouseOver={handleClick}
    ></div>
  );
};

export default Cell;
