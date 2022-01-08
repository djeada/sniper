import Cell from "./Cell";

export default function Net({ x, y }: any) {
  let styles = {
    display: "grid",
    "grid-template-columns": `repeat(${x},auto)`
  };

  let cells = [];
  for (let i = 0; i < x; i++) {
    for (let i = 0; i < x; i++) {
      cells.push(<Cell y={y} />);
    }
  }

  return (
    <div className="net" style={styles}>
      {cells}
    </div>
  );
}
