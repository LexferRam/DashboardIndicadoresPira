import React, { useEffect, useState, useStyles } from "react";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import PropTypes from "prop-types";
import { XGrid } from "@material-ui/x-grid";

const columns = [
  { field: "PERFIL", headerName: "Perfil", width: 200, fontSize: "18px" },
  {
    field: "COTIZACIONES",
    headerName: "Pólizas",
    width: 100,
    type: "number",
  },
];

export default function App({ enviardataGrid }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // console.log("prod ocea" + enviardataGrid);

    var ArrCotizaciones = enviardataGrid.map((item) => {

      return {
        id: item.COTIZACIONES,
        COTIZACIONES: item.COTIZACIONES,
        PERFIL: item.PERFIL,
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
    <div id="GridCotProd" style={{ height: 300 }}>
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
