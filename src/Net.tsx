import { useCallback, useEffect, useMemo, useRef } from "react";
import Cell from "./Cell";

function usePrevious(value: any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const getDiffArray = (prev: boolean[][] | undefined, next: boolean[][]) => {
  if (!prev) {
    return [];
  }

  const x = prev.length;
  const y = prev[0].length;

  const diff = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (prev[i][j] !== next[i][j]) {
        diff.push([i, j]);
      }
    }
  }
  return diff;
};

interface NetProps {
  net: boolean[][];
  winner: number[];
}
// [
//   [0, 0, 0, 0, 0, 1],
//   [0, 0, 1, 0, 0, 0],
// ];
const Net = ({ winner, net }: NetProps) => {
  console.log("render net");
  const x = net.length;
  const y = net[0].length;

  const previousNet = usePrevious(net);
  console.log("🚀 ~ file: Net.tsx ~ line 45 ~ Net ~ previousNet", previousNet);

  let styles = {
    border: "3px solid green",
    padding: "5px",
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: `repeat(${y},20px)`,
    gridTemplateRows: `repeat(${x},20px)`,
  };

  let cells: any = [];

  // useEffect(() => {
  //   const diff = getDiffArray(previousNet, net);

  //   if (winner && winner[0] > -1 && winner[1] > -1) {
  //     diff.push(winner);
  //   }
  // }, [winner, ...net.flat(2)]);

  const build = useCallback(() => {
    cells = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const isOn = net[i][j];
        const isWinner = winner && winner[0] === i && winner[1] === j;

        const cell = (
          <Cell on={isOn} winner={isWinner} key={`${i}-${j}`} i={i} j={j} />
        );

        cells.push(cell);
      }
    }
    return cells;
  }, [winner, net]);

  return (
    <>
      <h1>Ilan</h1>
      <div className="net" style={styles}>
        {build()}
      </div>
    </>
  );
};

export default Net;
