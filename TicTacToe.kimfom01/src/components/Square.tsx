interface Props {
  value: string;
  onSquareClick: () => void;
}

export const Square = ({ value, onSquareClick }: Props) => {
  let cellColor = "";

  if (value) {
    cellColor = value !== null && value === "X" ? "color-x" : "color-o";
  }

  return (
    <button className={`square ${cellColor}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};
