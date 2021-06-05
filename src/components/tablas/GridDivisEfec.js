import React, { useEffect, useState, useStyles } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import { XGrid } from "@material-ui/x-grid";

var columns = []
export default function App({ enviardataGrid,valor,dtosAgencias }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(valor == "Recaudación Divisas - Efectivo - Faltantes y Sobrantes"){
      var ArrCotizaciones = enviardataGrid.map((item, index) => {
        return {
          id: index,
          CODIGO_OFICINA: item.CODIGO_OFICINA,
          OFICINA: item.OFICINA,
          FECHA_INGRESO: item.FECHA_INGRESO,
           MONEDA: item.MONEDA,
          NRO_INGRESO: item.NRO_INGRESO,
          TIPO_DOCUMENTO: item.TIPO_DOCUMENTO,
          MTO_LOCAL: item.MTO_LOCAL,
          MTO_MONEDA: item.MTO_MONEDA,
          NRO_ACRE_FALTANTE: item.NRO_ACRE_FALTANTE,
          MTO_FALTANTE: item.MTO_FALTANTE,
          NRO_OBLIG_SOBRANTE: item.NRO_OBLIG_SOBRANTE,
          MTO_SOBRANTE: item.MTO_SOBRANTE,
          CLIENTE: item.CLIENTE,
        };
      });
  // alert(JSON.stringify(ArrCotizaciones))
      setRows(ArrCotizaciones);

      columns = [
        {
          field: "CODIGO_OFICINA",
          headerName: "Código Oficina",
          width: 100,
        },
        {
          field: "OFICINA",
          headerName: "Oficina",
          width: 100,
         
        },
        {
          field: "FECHA_INGRESO",
          headerName: "Fecha Ingreso",
          width: 100,
       
        },
        {
          field: "MONEDA",
          headerName: "Moneda",
          width: 100,
          type: "number",
        },
        {
          field: "NRO_INGRESO",
          headerName: "Nro Ingreso",
          width: 100,
          type: "string",
        },
        {
          field: "TIPO_DOCUMENTO",
          headerName: "Tipo Documento",
          width: 100,
          type: "number",
        },
        {
          field: "MTO_LOCAL",
          headerName: "Monto Local",
          width: 100,
          type: "number",
        }
        ,
        {
          field: "MTO_MONEDA",
          headerName: "Monto Moneda $",
          width: 100,
          type: "number",
        },
        {
          field: "NRO_ACRE_FALTANTE",
          headerName: "Nro Acre. Faltante",
          width: 100,
          type: "string",
        },
        {
          field: "MTO_FALTANTE",
          headerName: "Monto Faltante $",
          width: 100,
          type: "number",
        },
        {
          field: "NRO_OBLIG_SOBRANTE",
          headerName: "Nro Oblig Sobrante $",
          width: 100,
          type: "string",   
        },
        {
          field: "MTO_SOBRANTE",
          headerName: "Monto Sobrante $",
          width: 100,
          type: "number",
        },
        {
          field: "CLIENTE",
          headerName: "Cliente",
          width: 100,

        }
      ]


    }else if(valor == "Recaudo de Divisas en Efectivo"){
      
            var ArrCotizaciones = enviardataGrid.map((item, index) => {
              return {
                id: index,
                OFICINA: item.OFICINA,
                MTO_MONEDA: item.MTO_MONEDA,
              };
            });
        
            setRows(ArrCotizaciones);
      columns = [
        {
          field: "OFICINA",
          headerName: "Oficina",
          width: 150,
        },
        {
          field: "MTO_MONEDA",
          headerName: "Monto Divisa $",
          width: 170,
          type: "number",
        }
      ]
    }else if(valor == "Recaudación Divisas - Efectivo - Faltantes"){
      
      var ArrCotizaciones = enviardataGrid.map((item, index) => {
        return {
          id: index,
          OFICINA: item.OFICINA,
          MTO_FALTANTE: item.MTO_FALTANTE,
        };
      });
  
      setRows(ArrCotizaciones);
      columns = [

        {
          field: "OFICINA",
          headerName: "Oficina",
          width: 150,
        },
        {
          field: "MTO_FALTANTE",
          headerName: "Monto Faltante $",
          width: 170,
          type: "number",
        }
      ]
    }else if(valor == "Recaudación Divisas-Efectivo-Sobrantes"){
          
      var ArrCotizaciones = enviardataGrid.map((item, index) => {
        return {
          id: index,
          // CODOFICINA: item.CODOFICINA,
          OFICINA: item.OFICINA,
          MTO_SOBRANTE: item.MTO_SOBRANTE
        }
      })

      setRows(ArrCotizaciones);
      columns = [

        {
          field: "OFICINA",
          headerName: "Oficina",
          width: 150,
        },
        {
          field: "MTO_SOBRANTE",
          headerName: "Monto Sobrante $",
          width: 170,
          type: "number",
        }
      ]
    }else if(valor == "Efectivo / Sobrantes / Faltantes"){

      var ArrCotizaciones = enviardataGrid.map((item, index) => {
        return {
          id: item.CODIGO_OFICINA,
          OFICINA: item.OFICINA,
          MTO_MONEDA: item.MTO_MONEDA,
          MTO_FALTANTE: item.MTO_FALTANTE,
          MTO_SOBRANTE: item.MTO_SOBRANTE,
        };
      });

      setRows(ArrCotizaciones);
      columns = [
        {
          field: "OFICINA",
          headerName: "Oficina",
          width: 150,
        },
        {
          field: "MTO_MONEDA",
          headerName: "Monto Moneda",
          width: 170,
          type: "number",
        },
        {
          field: "MTO_FALTANTE",
          headerName: "Monto Faltante",
          width: 170,
          type: "number",
        },
        {
          field: "MTO_SOBRANTE",
          headerName: "Monto Sobrante",
          width: 170,
          type: "number",
        }
      ]
}
  }, []);

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
    <div style={{ height: 800, width: "100%" }}>
      <XGrid
        rows={rows}
        columns={columns}
        pagination={true}
        pageSize={19}
        rowsPerPageOptions={[19, 20, 30]}
        showToolbar
        density="compact"
      />
    </div>
  );
}
