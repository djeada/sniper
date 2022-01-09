import "./styles.css";
import Net from "./Net";
import { useContext, useEffect, useState } from "react";
import { context, initialState } from "./context";

export default function App() {
  const x = 20;
  const y = 50;

  const [state, setState] = useState(initialState);

  const restart = () => {
    setState({ ...initialState, credit: state.credit });
  };

  const jackBot = () => {
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
    });
  };

  return (
    <context.Provider value={{ state, setState }}>
      <div className="App">
        <h1>Your Credit {state.credit.toFixed(2)} PLN</h1>
        <h2>
          Bullet cost {state.price.toFixed(2)} PLN, Hit makes {x * y}x =
          {state.price * x * y} PLN
        </h2>
        <button onClick={restart}>next round</button>
        <button onClick={jackBot}>open</button>
        <Net x={x} y={y} />
      </div>
    </context.Provider>
  );
}
