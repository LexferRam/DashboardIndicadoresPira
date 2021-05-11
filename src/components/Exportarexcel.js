import React, { useState, useEffect } from "react";
import ExportExcel from "react-export-excel";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

function Exportarexcel({ enviarjsonGrid, titulo }) {

  return (
    <div className="btnExportarExcel">
      <ExcelFile
        element={
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowDownwardIcon fontSize="small" />}
            style={{ 
              backgroundColor: " #bd261e",
              color: "white",
              fontSize: 10,
              borderRadius: 50,
              marginTop: 15,
              marginRight: 10,
            }}
          >
            Excel
          </Button>
        }
        filename={titulo}
      >
        <ExcelSheet data={enviarjsonGrid} name={titulo}>
          {enviarjsonGrid[0] && Object.keys(enviarjsonGrid[0]).map(columna => (
            <ExcelColumn label={columna} value={columna} />
          ))}
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}

export default Exportarexcel;
