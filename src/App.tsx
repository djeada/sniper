import "./styles.css";
import Net from "./Net";
import { useCallback, useContext, useEffect, useState } from "react";
import { context, initialState } from "./context";
import { useInterval } from "react-use";

export const x = 20;
export const y = 50;

const socketUrl = "wss://sockets-wael.herokuapp.com";
const socket = new WebSocket(socketUrl);

socket.addEventListener("open", function (event) {});

export default function App() {
  const [state, setState] = useState(initialState);

  const restart = () => {
    setState({ ...initialState, credit: state.credit });
  };

  const jackBot = () => {
    if (state.opened) {
      return;
    }

    const randomI = Math.floor(Math.random() * x);
    const randomJ = Math.floor(Math.random() * y);

    state.hits.map(([i, j]: any) => {
      if (randomI === i && randomJ === j) {
        alert("Jackbot!!");
        state.credit += 100;
      }
    });

    setState({
      ...state,
      winner: [randomI, randomJ],
      opened: true,
    });
  };

  const mouseDown = () => {
    setState({
      ...state,
      mouse: 1,
    });

    const w: any = window;
    w.play();
  };

  const mouseUp = () => {
    setState({
      ...state,
      mouse: 0,
    });
  };

  useInterval(() => {
    try {
      socket.send(
        JSON.stringify({
          ...state,
          type: "net",
        })
      );
    } catch (e) {}
  }, 1000);

  return (
    <context.Provider value={{ state, setState }}>
      <div className="App" onMouseDown={mouseDown} onMouseUp={mouseUp}>
        <h1>Your Credit {state.credit.toFixed(2)} PLN</h1>
        <h2>
          Bullet cost {state.price.toFixed(2)} PLN, Hit makes {x * y}x =
          {state.price * x * y} PLN
        </h2>
        <button className="button" onClick={restart}>
          next round
        </button>
        <button className="button" onClick={jackBot}>
          open
        </button>
        <Net x={x} y={y} hits={state.hits} winner={state.winner} />
      </div>
    </context.Provider>
  );
}
