import React, { useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import "./Home.css";
import InputField from "../../components/InputField/InputField";
import MatrixCalculator from "../../components/MatrixCalculator/MatrixCalculator";
const Home = () => {
  const [row, setRow] = useState(4);
  const [column, setColumn] = useState(4);
  const [table1, setTable1] = useState<number[][]>([]);
  const [table2, setTable2] = useState<number[][]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  /**
   * For generating the table1 for the matrixA  and table2 for the matrixB.
   * Construct the table1 for the matrix data.
   */
  const generateMatrix = () => {
    const newTable1 = Array.from({ length: row }, (_, r) =>
      Array.from({ length: column }, (_, c) => r + c)
    );
    const newTable2 = Array.from({ length: row }, (_, r) =>
      Array.from({ length: column }, (_, c) => r * c)
    );
    setTable1(newTable1);
    setTable2(newTable2);
    setIsGenerated(true);
  };

  /**
   * For change the input value of row and column
   * Set the row column value
   * @param {React.ChangeEvent<HTMLInputElement>} event for the change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "row") {
      setRow(Number(value));
    } else if (name === "column") {
      setColumn(Number(value));
    }
  };

  return (
    <Card className="calculator-card">
      {/* Display the title of the card */}
      <CardHeader title="Matrix Calculator" className="card-header" />
      {/* Display the form for inputting row and column */}
      <CardContent>
      <form>
        {/* Display the input fields for row */}
        <InputField
          label="Row"
          name="row"
          value={row}
          onChange={handleInputChange}
        />
        {/* Display the input fields for column */}
        <InputField
          label="Column"
          name="column"
          value={column}
          onChange={handleInputChange}
        />
        {/* Display the button for generating the matrices */}
        <Button
          variant="contained"
          className="generateBtn"
          style={{ marginTop: "0.5rem" }}
          onClick={generateMatrix}
        >
          Generate
        </Button>
      </form>
      {/* Display the Matrix Calculator component if the matrix is generated */}
      {isGenerated && (
        <MatrixCalculator
          matrixA={table1}
          matrixB={table2}
          setMatrixA={setTable1}
          setMatrixB={setTable2}
        />
      )}
      </CardContent>
    </Card>
  );
};

export default Home;
