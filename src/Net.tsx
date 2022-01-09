import Cell from "./Cell";

const Net = ({ x, y }: any) => {
  let styles = {
    border: "3px solid green",
    padding: "5px",
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: `repeat(${y},20px)`,
    gridTemplateRows: `repeat(${x},20px)`,
  };

  const audio = new Audio("assets/shooting.mp3");

  let cells = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      cells.push(<Cell key={Math.random()} i={i} j={j} />);
    }
  }

  const handleClick = () => {};

  return (
    <>
      <div className="net" style={styles} onClick={handleClick}>
        {cells}
      </div>
    </>
  );
};

export default Net;
