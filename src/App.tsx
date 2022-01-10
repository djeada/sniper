import "./styles.css";
import Net from "./Net";
import { useMemo, useState } from "react";
import { context, getInitialState } from "./context";

const x = 1;
const y = 2;
const init = getInitialState(x, y);

export default function App() {
  const [state, setState] = useState(init);

  const restart = () => {
    setState({ ...init, credit: state.credit });
  };

  const jackBot = () => {
    if (state.opened) {
      return;
    }

    const randomI = Math.floor(Math.random() * x);
    const randomJ = Math.floor(Math.random() * y);

    if (state.net[randomI][randomJ]) {
      alert("Jackbot!!");
      state.credit += 100;
    }

    setState({
      ...state,
      winner: [randomI, randomJ],
      opened: true,
    });
  };

  const mouseDown = () => {
    setState({
      ...state,
      mouseDown: true,
    });

    const w: any = window;
    w.play();
  };

  const mouseUp = () => {
    setState({
      ...state,
      mouseDown: false,
    });
  };

  const renderNet = useMemo(() => {
    return <Net key="net" net={state.net} winner={state.winner} />;
  }, [state.winner, ...state.net.flat(2)]);

  return (
    <context.Provider value={{ state, setState }}>
      <div className="App" onMouseDown={mouseDown} onMouseUp={mouseUp}>
        <h1>Your Credit {state.credit.toFixed(2)} €</h1>
        <h2>
          Bullet cost {state.price.toFixed(2)} €, Hit makes {x * y}x =
          {state.price * x * y} €
        </h2>
        <button className="button" onClick={jackBot}>
          open
        </button>
        <button className="button" onClick={restart}>
          next round
        </button>
        {renderNet}
      </div>
    </context.Provider>
  );
}
