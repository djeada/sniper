import { useEffect, useState } from "react";
import { x, y } from "./App";
import { initialState, StateType } from "./context";
import Net from "./Net";

import "./styles.css";

const socketUrl = "wss://sockets-wael.herokuapp.com";

const socket = new WebSocket(socketUrl);

let s = {};

export default function Watch(data: any) {
  const [store, setStore] = useState<{ [key: string]: StateType }>({});

  useEffect(() => {
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
      const json = JSON.parse(event.data);
      s = {
        ...s,
        [json.hash]: json,
      };

      setStore(s);
    });
  }, []);

  const nets = Object.values(store).map((state) => {
    return (
      <Net
        key={state.hash}
        watch={true}
        x={x}
        y={y}
        hits={state.hits}
        winner={state.winner}
      />
    );
  });

  return <div className="watch">{nets}</div>;
}
