import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";


var encabezado1 = '';
var encabezado2 = '';
var encabezado3 = '';
var valor1= 0;
var valor2= 0;
var valor3= 0;
var a = [[encabezado1, encabezado2], [encabezado1, valor1], [encabezado2, valor2], [encabezado3, valor3]]

export default function GraficaPrueba({dtosAgencias,oficina,enviardataGrid}) {

  const [json, setJson] = useState([]);

  useEffect(()=> {
  // alert('****************'+JSON.stringify(dtosAgencias))

    // if (dtosAgencias !== "undefined") {
      encabezado1 = "Monto Moneda";
      encabezado2 = "Monto Faltante";
      encabezado3 = "Monto Sobrante";
      valor1 = dtosAgencias[0].MTO_MONEDA;
      valor2 = dtosAgencias[0].MTO_FALTANTE;
      valor3 = dtosAgencias[0].MTO_SOBRANTE;
      a = [[encabezado1, encabezado2], [encabezado1, valor1], [encabezado2, valor2], [encabezado3, valor3]]
      setJson(a)
      // setAgencia(enviardataGrid[0].OFICINA)
    // }

  },[dtosAgencias,oficina])

  return (
    <div className="App">
        <b style={{marginLeft:-70}}>Recaudos Totales </b> 
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        chartLanguage="es"
        loader={<div>Cargando Gráfica...</div>}
        data={json}
        options={{
          chartArea:{left:20,top:40,width:'90%',height:'75%'},
          legend: { position: 'bottom',textStyle: {color: 'black', fontSize: 9} },
          slices: [{offset : 0.1}],
          titleTextStyle:{ fontSize: 16, color:'gray'},
          is3D: true,
        }}
      />s
    </div>
  );

}

