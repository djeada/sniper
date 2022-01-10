import Cell from "./Cell";

export default function Row({ y }: any) {
  let styles = {
    width: `200px`,
    height: `200px`,
    backgroundColor: `#1DA1F2`
  };

  let cells = [];
  for (let i = 0; i < y; i++) {
    cells.push(<Cell />);
  }

  return (
    <div className="row" style={styles}>
      {cells}
    </div>
  );
}
