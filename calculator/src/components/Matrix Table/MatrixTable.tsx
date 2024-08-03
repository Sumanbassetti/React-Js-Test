import React from "react";
import "./MatrixTable.css";
interface MatrixTableProps {
  table: number[][];
  isDisableCell: boolean;
  setTable: React.Dispatch<React.SetStateAction<number[][]>>;
}

const MatrixTable: React.FC<MatrixTableProps> = ({
  table,
  isDisableCell,
  setTable,
}) => {

/**
 * For change the matrix cell value 
 * @param {React.ChangeEvent<HTMLInputElement>} event The input value change event
 * @param {number} rowIndex The index of the row
 * @param {number} colIndex The index of the column
 */
const handleCellChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const newValue = Number(event.target.value);
    const newTable = table.map((row, cuurentRowIndex) =>
      row.map((cell, cuurentColIndex) =>
        cuurentRowIndex === rowIndex && cuurentColIndex === colIndex ? newValue : cell
      )
    );
    setTable(newTable);
  };

  return (
    <div className="matrix-table">
      {table.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "table-row" }}>
          {row.map((cell, colIndex) => (
            <input
              className="table-cell"
              key={`${rowIndex}-${colIndex}`}
              type="number"
              value={cell}
              disabled={isDisableCell}
              onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixTable;
