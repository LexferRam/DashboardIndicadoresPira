import React, { useEffect, useState, useStyles } from "react";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import PropTypes from "prop-types";
import { XGrid } from "@material-ui/x-grid";

const columns = [
  {
    field: "id",
    headerName: "Total Cotizaciones",
    width: 180,
    fontSize: "18px",
  },
  {
    field: "COTIZACIONES_EMITIDAS",
    headerName: "Emitidas",
    width: 120,
    type: "number",
  },
  {
    field: "COTIZACIONES_NO_EMITIDAS",
    headerName: "No Emitidas",
    width: 140,
    type: "number",
    display: "none",
  },

];

export default function App({ enviardataGrid }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // console.log("prod ocea" + enviardataGrid);

    var ArrCotizaciones = enviardataGrid.map((item) => {
      // var fecha_ini = item.DATE_CREATION.substring(0, 10);

      //  var fecha = moment(fecha_ini, 'YYYY-MM-DD', true).format("DD/MM/YYYY");
      return {
        id: item.TOTAL_COTIZACIONES,
        TOTAL_COTIZACIONES: item.TOTAL_COTIZACIONES,
        COTIZACIONES_EMITIDAS: item.COTIZACIONES_EMITIDAS,
        PORC_COT_EMITIDAS: item.PORC_COT_EMITIDAS,
        COTIZACIONES_NO_EMITIDAS: item.COTIZACIONES_NO_EMITIDAS,
        PORC_COT_NO_EMITIDAS: item.PORC_COT_NO_EMITIDAS,
      };
    });

    setRows(ArrCotizaciones);
  }, [enviardataGrid]);

  function CustomPagination(props) {
    const { state, api } = props;
    const classes = useStyles();

    return (
      <Pagination
        className={classes.root}
        color="primary"
        page={state.pagination.page}
        count={state.pagination.pageCount}
        onChange={(event, value) => api.current.setPage(value)}
      />
    );
  }

  CustomPagination.propTypes = {
   
    api: PropTypes.shape({
      current: PropTypes.object.isRequired,
    }).isRequired,
  
    state: PropTypes.object.isRequired,
  };

  return (
    <div id="GridCotProd" style={{ height: 300, width: "100%" }}>
      <XGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[10, 20, 30]}
        showToolbar
        density="compact"
      />
    </div>
  );
}
