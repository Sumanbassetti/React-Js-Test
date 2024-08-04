import React, { useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import "./Home.css";
import InputField from "../../components/InputField/InputField";
import MatrixCalculator from "../../components/MatrixCalculator/MatrixCalculator";
import OverlayLoader from "../../components/OverlayLoader/OverlayLoader";
import SnackBar from "../../components/SnackBar/SnackBar";
import { Constants } from "../../utils/Constant";
const Home = () => {
  const [row, setRow] = useState(4);
  const [column, setColumn] = useState(4);
  const [table1, setTable1] = useState<number[][]>([]);
  const [table2, setTable2] = useState<number[][]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  /**
   * For generating the table1 for the matrixA  and table2 for the matrixB.
   * Construct the table1 for the matrix data.
   */
  const generateMatrix = () => {
    if(row>Constants.MaximumDimension||column>Constants.MaximumDimension){
      setSnackbarOpen(true);
      setSnackbarMessage(Constants.RowColumnInputErrorMsg)
      return;
    }
    setIsLoading(true);
    setIsGenerated(false); // Reset generated state before starting
    setTimeout(() => { 
      const newTable1 = Array.from({ length: row }, (_, rowIndex) =>
        Array.from({ length: column }, (_, columnIndex) => rowIndex + columnIndex)
      );
      const newTable2 = Array.from({ length: row }, (_, rowIndex) =>
        Array.from({ length: column }, (_, columnIndex) => rowIndex * columnIndex)
      );
      setTable1(newTable1);
      setTable2(newTable2);
      setIsGenerated(true);
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed
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
    <React.Fragment>
        {/*For the snackbar message */}
        <SnackBar
        vertical="top"
        horizontal="center"
        open={snackbarOpen}
        message={snackbarMessage}
        serverity="error"
        handleClose={() => setSnackbarOpen(false)}
      />
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
          disabled={row <= 0 || column <= 0}
        >
          Generate
        </Button>
      </form>
      {/* Display the Matrix Calculator component if the matrix is generated */}
      {isGenerated &&  table1.length>0 && table2.length>0 &&(
        <MatrixCalculator
          matrixA={table1}
          matrixB={table2}
          setMatrixA={setTable1}
          setMatrixB={setTable2}
        />
      )}
      {
        // Display the CircularProgress if the matrices are being generated
       isLoading && <OverlayLoader open={isLoading} handleClose={()=>setIsLoading(false)} />
      }
      </CardContent>
    </Card>
    </React.Fragment>
  );
};

export default Home;
