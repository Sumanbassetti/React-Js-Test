import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import MatrixTable from "../Matrix Table/MatrixTable";
import { OperationType } from "../../utils/metaData";
import { Add, Close, Remove } from "@mui/icons-material";
import "./MatrixCalculator.css";
import { Constant } from "../../utils/Constant";
import SnackBar from "../SnackBar/SnackBar";

//For props of this component
interface MatrixCalculatorProps {
  matrixA: number[][];
  matrixB: number[][];
  setMatrixA: React.Dispatch<React.SetStateAction<number[][]>>;
  setMatrixB: React.Dispatch<React.SetStateAction<number[][]>>;
}
const MatrixCalculator: React.FC<MatrixCalculatorProps> = ({
  matrixA,
  matrixB,
  setMatrixA,
  setMatrixB,
}) => {
  const [resultMatrix, setResultMatrix] = useState<number[][]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [operationType, setOperationType] = useState<OperationType>();

  /**
   * Adds two matrices and sets the result to the state.
   * This function sets the operation type to `ADDITION` and computes the resultant matrix
   */
  const addMatrices = () => {
    // Set the operation type to addition
    setOperationType(OperationType.ADDITION);

    // Compute the resultant matrix by adding corresponding elements
    const resultantMatrix = matrixA.map((row, rowIndex) =>
      row.map((cell, colIndex) => cell + matrixB[rowIndex][colIndex])
    );

    // Store the resultant matrix in the state
    setResultMatrix(resultantMatrix);
  };

  /**
   * Subtracts the second matrix from the first and sets the result to the state.
   * This function sets the operation type to `SUBTRACTION` and computes the resultant matrix
   */
  const subtractMatrices = () => {
    // Set the operation type to subtraction
    setOperationType(OperationType.SUBTRACTION);

    // Compute the resultant matrix by subtracting corresponding elements
    const newResultTable = matrixA.map((row, rowIndex) =>
      row.map((cell, colIndex) => cell - matrixB[rowIndex][colIndex])
    );

    // Store the resultant matrix in the state
    setResultMatrix(newResultTable);
  };

  /**
   * Multiplies two matrices and sets the result to the state.
   * This function sets the operation type to `MULTIPLICATION` and performs matrix multiplication.
   */
  const multiplyMatrices = () => {
    // Set the operation type to multiplication
    setOperationType(OperationType.MULTIPLICATION);

    // Check if matrix multiplication is possible
    if (matrixA[0].length !== matrixB.length) {
      // Open snackbar to notify the user of the error
      setSnackbarOpen(true);
      setSnackbarMessage(Constant.MultiplicationErrorMsg);
      return;
    }

    // Compute the resultant matrix by multiplying matrices
    const newResultTable = matrixA.map((row) =>
      Array.from({ length: matrixB[0].length }, (_, c) =>
        row.reduce((sum, cell, r) => sum + cell * matrixB[r][c], 0)
      )
    );

    // Store the resultant matrix in the state
    setResultMatrix(newResultTable);
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
      {/*For grid container*/}
      <Grid
        container
        spacing={0.5}
        style={{ marginTop: "2rem" }}
        columnSpacing={0}
        rowSpacing={2}
      >
        {/* For the matrix A table */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" className="table-label">
            Matrix A
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box mb={2} mr={4} className="matrix-table">
              <MatrixTable
                table={matrixA}
                setTable={setMatrixA}
                isDisableCell={false}
              />
            </Box>
            <Box>
              {operationType === OperationType.ADDITION && <Add />}
              {operationType === OperationType.SUBTRACTION && <Remove />}
              {operationType === OperationType.MULTIPLICATION && <Close />}
            </Box>
          </Box>
        </Grid>
        {/* For the matrix B table */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" className="table-label">
            Matrix B
          </Typography>
          <Box className="matrix-table">
            <MatrixTable
              table={matrixB}
              setTable={setMatrixB}
              isDisableCell={false}
            />
          </Box>
        </Grid>
        {/* For the buttons */}
        <Grid item xs={12} sm={2}>
          <Box className="operation-box">
            <Button
              variant="contained"
              className="operationButton"
              onClick={addMatrices}
            >
              Addition
            </Button>
            <Button
              variant="contained"
              className="operationButton"
              onClick={subtractMatrices}
            >
              Substration
            </Button>
            <Button
              variant="contained"
              className="operationButton"
              onClick={multiplyMatrices}
            >
              Multiplication
            </Button>
          </Box>
        </Grid>
        {/* For the resultant matrix table */}
        {resultMatrix.length > 0 && (
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" className="table-label">
              Resultant Matrix
            </Typography>
            <Box>
              <MatrixTable
                table={resultMatrix}
                setTable={setResultMatrix}
                isDisableCell={true}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default MatrixCalculator;
