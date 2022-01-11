import Cell from "./Cell";

const Net = ({ x, y, watch, hits, winner }: any) => {
  const cellSize = watch ? 10 : 20;

  let styles = {
    border: "3px solid green",
    padding: "5px",
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: `repeat(${y},${cellSize}px)`,
    gridTemplateRows: `repeat(${x},${cellSize}px)`,
  };

  let cells = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const isOn =
        hits &&
        hits.filter(([I, J]: any) => {
          return i === I && j === J;
        }).length;

      const isWinner = winner && winner[0] === i && winner[1] === j;

      cells.push(
        <Cell
          watch={watch}
          key={Math.random()}
          i={i}
          j={j}
          on={isOn}
          winner={isWinner}
        />
      );
    }
  }

  return (
    <>
      <div className="net" style={styles}>
        {cells}
      </div>
    </>
  );
};

export default Net;
