import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

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
  // legend: {
  //   position: "bottom",
  //   alignment: "center",
  //   textStyle: {
  //     color: "233238",
  //     fontSize: 14
  //   }
  // },
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

export default function GraficaPrueba({ enviardataGraph, valor }) {

  const [json, setJson] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (valor !== "Efectivo / Sobrantes / Faltantes") {
      const chartData = [['Area', 'Nro_Polizas']]
      for (let i = 0; i < enviardataGraph.length; i += 1) {
        chartData.push([enviardataGraph[i].AREA.substring(14), enviardataGraph[i].COTIZACIONES])
      }
      setJson(chartData);
    } else if (valor === "Efectivo / Sobrantes / Faltantes") {
      const chartData = [['MTO_MONEDA', 'MTO_FALTANTE','MTO_SOBRANTE']]
      for (let i = 0; i < enviardataGraph.length; i += 1) {
        chartData.push([enviardataGraph[i].MTO_MONEDA, enviardataGraph[i].MTO_FALTANTE, enviardataGraph[i].MTO_SOBRANTE])
      }
      setJson(chartData);
    }

    const nums = enviardataGraph.map((cot) => cot.COTIZACIONES);
    let total = nums.reduce((a, b) => a + b, 0);
    setTotal(total)
  }, [enviardataGraph])

  return (
    <div className="App">
      {valor === "realizadas" ? (
        <>
          <b>Cotizaciones Realizadas:</b> {total}
        </>
      ) : valor === "emitidas" ? (
        <>
          <b>Cotizaciones Emitidas:</b> {total}
        </>
      ): valor === "productos" ? (
        <>
          <b>Cotizaciones por Productos:</b> {total}
        </>
      ): valor === "emitXprod" ? (
        <>
          <b>Cotizaciones Emitidas por Productos:</b> {total}
        </>
      ) 
      : (
            <>
              {" "}
              <b>Total:</b> {total}
            </>
          )
      }
      <Chart
        width={'390px'}
        height={'250px'}
        chartType="PieChart"
        data={json}
        options={pieOptions}
       // graph_id="PieChart"
        options={{
          chartArea: { left: 20, top: 10, width: '90%', height: '75%' },
          legend: { position: 'bottom', textStyle: { color: 'black', fontSize: 11 } },
         // title: 'Cotizaciones por Productos',
          slices: [{ offset: 0.1 }],
          titleTextStyle: { fontSize: 16, color: 'gray' },
          is3D: true,
        }}
      />

    </div>
  );

}