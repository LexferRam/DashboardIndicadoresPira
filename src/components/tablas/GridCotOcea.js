import React, { useEffect, useState, useStyles } from "react";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import { XGrid } from "@material-ui/x-grid";

const columns = [
  {
    field: "DATE_CREATION",
    headerName: "Fecha Creación",
    width: 160,
    type: "date",
  },
  { field: "id", headerName: "Nro Cotización", width: 170, type: "number" },
  // { field: 'IDEPOL', headerName: 'Idepol', width: 140,type: 'number' },
  { field: "NRO_POLIZA", headerName: "Nro Póliza", width: 150, type: "number" },
  { field: "AREA_DESCRIPTION", headerName: "Tipo", width: 160 },
  { field: "BUDGET_PARTNER_CODE", headerName: "Asesor", width: 100 },
  { field: "PERFIL", headerName: "Perfil", width: 170 },
];

export default function App(props) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    //console.log(props.enviardataGrid);

    var ArrCotizaciones = props.enviardataGrid.map((item) => {
      var fecha_ini = item.DATE_CREATION.substring(0, 10);

      var fecha = moment(fecha_ini, "YYYY-MM-DD", true).format("DD/MM/YYYY");
      // return {DATE_CREATION: fecha, id: item.NRO_COTIZACION, IDEPOL: item.IDEPOL,NRO_POLIZA: item.NRO_POLIZA, AREA_DESCRIPTION: item.AREA_DESCRIPTION , BUDGET_PARTNER_CODE: item.BUDGET_PARTNER_CODE,PERFIL: item.PERFIL };
      return {
        DATE_CREATION: fecha,
        id: item.NRO_COTIZACION,
        NRO_POLIZA: item.NRO_POLIZA,
        AREA_DESCRIPTION: item.AREA_DESCRIPTION,
        BUDGET_PARTNER_CODE: item.BUDGET_PARTNER_CODE,
        PERFIL: item.PERFIL,
      };
    });
    //console.log("ARRAY ARREGLADO: " + JSON.stringify(ArrCotizaciones));
    setRows(ArrCotizaciones);
  }, [props.enviardataGrid]);

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
    /**
     * ApiRef that let you manipulate the grid.
     */
    api: PropTypes.shape({
      current: PropTypes.object.isRequired,
    }).isRequired,
    /**
     * The GridState object containing the current grid state.
     */
    state: PropTypes.object.isRequired,
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <XGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[10, 20, 30]}
        showToolbar
        density="compact"
        filterModel={{
          items: [
            // { columnField: 'commodity', operatorValue: 'contains', value: 'rice' },
          ],
        }}
      />
    </div>
  );
}
