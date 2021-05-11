import React, { useState, useEffect } from "react";
import { Pie } from "@reactchartjs/react-chart.js";

const PieChart = ({ enviardataGraph }) => {
  const [rows, setRows] = useState([]);
  const [realizadas, setRealizadas] = useState(0);

  const data = {
    // labels:areas,
    labels: ["Cotizaciones Emitidas", "Cotizaciones No Emitidas"],

    datasets: [
      {
        // label: 'Cotizaciones Productos',
        data: rows,
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: "red",
              fontSize: "20px",
            },
          },
        },

        backgroundColor: ["#E71818", "#EB6914", "#F9D120", "red", "#8FBC8F"],
        borderColor: ["#E71818", "#EB6914", "#F9D120", "red", "#8FBC8F"],
        borderWidth: 1,
      },
    ],
    options: {
      title: {
        display: true,
        text: "Título del gráfico",
      },
    },
  };

  useEffect(() => {
    // console.log('desde el graphTOTALES values:  ' + JSON.stringify(enviardataGraph));

    //  if (enviardataGraph) {
    //     alert('NUlo' + JSON.stringify(enviardataGraph));
    //  }
    //  else  {
    //     alert(' MAC ' + JSON.stringify(enviardataGraph.TOTAL_COTIZACIONES));
    //  }

    if (enviardataGraph.length > 0) {
      const nums = [
        //    enviardataGraph[0].TOTAL_COTIZACIONES,
        // enviardataGraph[0].COTIZACIONES_EMITIDAS,

        enviardataGraph[0].PORC_COT_EMITIDAS,
        // enviardataGraph[0].COTIZACIONES_NO_EMITIDAS,
        enviardataGraph[0].PORC_COT_NO_EMITIDAS,
      ];
      setRows(nums);
      let totalRealizadas = nums.reduce((a, b) => a + b, 0);

      setRealizadas(totalRealizadas);
    }

    //const Arrareas = enviardataGraph.map(cot => cot.AREA.substring(14));
    // const Arrareas = enviardataGraph[0].map(cot => cot.AREA);

    //setAreas(Arrareas);
  }, [enviardataGraph]);

  return (
    <div className="chartPie">
      <b>Porcentajes Cotizaciones Emitidas vs No Emitidas</b> 
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
