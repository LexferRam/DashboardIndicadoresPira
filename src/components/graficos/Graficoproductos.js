import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

var encabezados1 = '';
var encabezaValor = '';
 var dataGraf = [encabezados1,encabezaValor]

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

  const [data, setData] = useState([]);

  useEffect(() => {

    //Arreglo de encabezados
    var encabezados1= enviardataGraph.map((cot) => {
      return cot.AREA.substring(14)
    });
    // encabezados1=encabezados;
    // dataGraf.push(encabezados)

    enviardataGraph.map((cot) => {
       var valores = [cot.AREA.substring(14),cot.COTIZACIONES]
       dataGraf.push(valores)
    });


    console.log(dataGraf);
    // setData(a)
    // encabezado1 = "COTIZACIONES_EMITIDAS";
    // encabezado2 = "COTIZACIONES_NO_EMITIDAS";
    // valor1 = enviardataGraph[0].COTIZACIONES_EMITIDAS;
    // valor2 = enviardataGraph[0].COTIZACIONES_NO_EMITIDAS;
    // a = [[encabezado1, encabezado2], [encabezado1, valor1], [encabezado2, valor2]]

  }, [enviardataGraph])

  return (
    <div className="App">
      <Chart
        width={'390px'}
        height={'250px'}
        chartType="PieChart"
        // data={a}
        options={pieOptions}
        graph_id="PieChart"
        options={{
          chartArea:{left:20,top:40,width:'80%',height:'75%'},
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


