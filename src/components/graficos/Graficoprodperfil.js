// import React, { useState, useEffect } from "react";
// import { Pie } from "@reactchartjs/react-chart.js";

// const PieChart = ({ enviardataGraph }) => {
//   const [rows, setRows] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [total, setTotal] = useState(0);

//   const data = {
//     labels: areas,

//     datasets: [
//       {
//         // label: 'Cotizaciones Productos',
//         data: rows,
//         options: {
//           legend: {
//             display: true,
//             labels: {
//               fontColor: "red",
//               fontSize: "20px",
//             },
//           },
//         },

//         backgroundColor: ["#2980B9", "#2E8B57", "#F9D120", "red", "#8FBC8F"],
//         borderColor: ["#2980B9", "#2E8B57", "#F9D120", "red", "#8FBC8F"],
//         borderWidth: 1,
//       },
//     ],
//     options: {
//       title: {
//         display: true,
//         text: "Título del gráfico",
//       },
//     },
//   };

//   useEffect(() => {
//     // console.log('desde el graph values:  ' + JSON.stringify(enviardataGraph));
//     const nums = enviardataGraph.map((cot) => cot.COTIZACIONES);
//     const Arrperfiles = enviardataGraph.map((cot) => cot.PERFIL);
//     console.log("Perfiles " + Arrperfiles);
//     setRows(nums);
//     setAreas(Arrperfiles);
//     let total = nums.reduce((a, b) => a + b, 0);
//     setTotal(total);
//   }, [enviardataGraph]);

//   return (
//     <div className="chartPie">
//       <b>Total:</b> {total}
//       <Pie data={data} />
//     </div>
//   );
// };

// export default PieChart;

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
  legend: {
    position: "bottom",
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

export default function GraficaPrueba({ enviardataGraph, valor }) {

  const [json, setJson] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    const chartData = [['Area', 'Nro_Polizas']]
    for (let i = 0; i < enviardataGraph.length; i += 1) {
      chartData.push([enviardataGraph[i].PERFIL, enviardataGraph[i].COTIZACIONES])
    }
    setJson(chartData);

    const nums = enviardataGraph.map((cot) => cot.COTIZACIONES);
    let total = nums.reduce((a, b) => a + b, 0);
    setTotal(total)
  }, [enviardataGraph])

  return (
    <div className="App">
      {valor === "prodPerfil" ? (
        <>
          <b>Cotizaciones por Perfil:</b> {total}
        </>
      ) : valor === "emitidas" ? (
        <>
          <b>Cotizaciones Emitidas:</b> {total}
        </>
      ): valor === "productos" ? (
        <>
          <b>Cotizaciones por Productos:</b> {total}
        </>
      ): valor === "emitXperfil" ? (
        <>
          <b>Cotizaciones Emitidas por Perfil:</b> {total}
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
