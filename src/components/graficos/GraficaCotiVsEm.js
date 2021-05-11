import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

var encabezado1 = '';
var encabezado2 = '';
var valor1
var valor2
var a = [[encabezado1, encabezado2], [encabezado1, valor1], [encabezado2, valor2]]

const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position:  "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 30,
    width: "80%",
    height: "80%"
  },
  fontName: "Roboto"
};
export default function GraficaPrueba({ enviardataGraph }) {

  const [json, setJson] = useState([]);

  useEffect(() => {

    setJson(enviardataGraph)
    encabezado1 = "COTIZACIONES_EMITIDAS";
    encabezado2 = "COTIZACIONES_NO_EMITIDAS";
    valor1 = enviardataGraph[0].COTIZACIONES_EMITIDAS;
    valor2 = enviardataGraph[0].COTIZACIONES_NO_EMITIDAS;
    a = [[encabezado1, encabezado2], [encabezado1, valor1], [encabezado2, valor2]]

  }, [enviardataGraph])

  return (
    <div className="App">
      <Chart
        width={'390px'}
        height={'250px'}
        chartType="PieChart"
        data={a}
        options={pieOptions}
        graph_id="PieChart"
        options={{
          chartArea:{left:20,top:40,width:'90%',height:'75%'},
          legend: { position: 'bottom',textStyle: {color: 'black', fontSize: 9} },
          title: 'Cotizaciones Emitidas vs No Emitidas',
          slices: [{offset : 0.1}],
          titleTextStyle:{ fontSize: 16, color:'gray'},
          is3D: true,
        }}
      />
    </div>
  );

}


