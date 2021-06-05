import React, { useEffect, useState } from "react";
//GRID
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Fechas from "./Fechas";
import Button from "@material-ui/core/Button";
import { FormControl, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import GridCotOcea from "./tablas/GridCotOcea";
import Grafico from "./graficos/Grafico";
import GridPorcTotal from "./tablas/GridPorcTotal";
import GraficaCotiVsEm from "./graficos/GraficaCotiVsEm";
import GridEmiOceaPerfil from "./tablas/GridEmiOceaPerfil"
import GridDivisEfec from "./tablas/GridDivisEfec"
// GridDivisEfec
import GridCotProdOcea from "./tablas/GridCotProdOcea";
import Graficoproductos from "./graficos/Graficoproductos";
import ExportarExcel from "./Exportarexcel";

import GridCotOceaPerfil from "./tablas/GridCotOceaPerfil";
import Graficoprodperfil from "./graficos/Graficoprodperfil";
import GrafMtoFaltSobr from "./graficos/GrafMtoFaltSobr";
import GraficoBar from './graficos/GraficoBar'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AlertDialogSlide from "./Alerta";
import {useListCurrencies} from '../hooks/useListCurrencies';

const useStyles = makeStyles((theme) => ({

  root: {
    // flexGrow: 1,
    padding: theme.spacing(1),
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  chart: {
    marginBottom: 20,
  },
  //*************stilos FECHAS*************** */
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: " #bd261e",
    color: "white",
    fontSize: 10,
    borderRadius: 50,
    marginTop: 15,
    marginRight: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  graphBar: {
    height: '815px !important',
    paddingLeft: '60px  !important',

  },
  [theme.breakpoints.down("sm")]: {
    textField: {
      width: 140,
    },
    paper: {
      padding: theme.spacing(1),
    },
  },
  [theme.breakpoints.up("sm")]: {
    textField: {
      width: 140,
    },
    paperresp: {
      padding: theme.spacing(1),
      height: 320
    },
  },
  [theme.breakpoints.up("md")]: {
    respHeight: {
      height: 600,
    }
  },
}));

function TabContent({ titulo, url, urlGraph, urlGraph2,TotalIngresosME,ResumenIngresosME }) {
   // const REACT_API_URL_DESA = "http://10.128.49.125:5000/recaudosApi";
  const REACT_API_URL_DESA = "https://emergencia24horas.segurospiramide.com/node/express/servicios/api";

   const classes = useStyles();
   //////////////////////////////////////////////
  var fecha_hasta = new Date();
  var strfechahasta =
    fecha_hasta.getDate() +
    "/" +
    (fecha_hasta.getMonth() + 1) +
    "/" +
    fecha_hasta.getFullYear();
    //////////////////////////////////////
    var fecha_desde = new Date();
    var strfechadesde =
    fecha_desde.getDate() +
      "/" +
      (fecha_desde.getMonth() + 1) +
      "/" +
      fecha_desde.getFullYear();
      /////////////////////////////////////////
  const [value, setValue] = useState({
    fecha_desde: strfechadesde,
    fecha_hasta: strfechahasta,
    cCodMoneda: "DL"
  });
  const [cotizaciones, setCotizaciones] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [graphdataCot, setGraphdataCot] = useState([]);
  const [graphdataCot2, setGraphdataCot2] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [dtosAgencias, setdtosAgencias] = useState([]);
  const [oficina, setOficina] = useState('0');
  const [open, setOpen] = React.useState(false); 
  const [msn, setMsn] = React.useState(""); 
  const {listCurrencies,moneda, handleChangeMoneda} = useListCurrencies();

  const handleClose = () => {
    setOpen(false);
  };
  
  const onChangeVal = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };
  const onSubmit = (e) => {

    //setIsLoad(false);

    const arrDesde = value.fecha_desde.split("-");
    const arrHasta = value.fecha_hasta.split("-");
    const fechDesde = arrDesde[2] + "/" + arrDesde[1] + "/" + arrDesde[0];
    const fechHasta = arrHasta[2] + "/" + arrHasta[1] + "/" + arrHasta[0];
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
      ////validando que la facha de inicio sea menor a la de culminacion
      const fechaHoy = new Date();
      const startDay = new Date(arrDesde);
      const endDay = new Date(arrHasta);
      if (endDay < startDay) {
        setOpen(true)
        setMsn('La fecha de inicio debe ser menor a la de culminación')
        return 
      }
      if (startDay == "Invalid Date" || endDay == "Invalid Date") {
        setOpen(true)
        setMsn('Favor ingresar la fecha de inicio y culminación');
        return;
      }
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
setIsLoad(false);
    const fechas = { fecha_desde: fechDesde, fecha_hasta: fechHasta,cCodMoneda:moneda };
    //--------------------------------------------------------------------
    async function fetchData() {
      let responsePromise = []
       //********************************************* */
       const source = axios.CancelToken.source();
       let isMounted = true;
       //********************************************* */
     try {
        //*********************************************** */
      const res = axios.post(url, fechas, { cancelToken: source.token });
      responsePromise.push(res);
      //*********************************************** */
      if(urlGraph !== ""){
        const resGraph = axios.post(urlGraph, fechas, { cancelToken: source.token });
        responsePromise.push(resGraph);
      }
      //*********************************************** */
      if(urlGraph2 !== ""){

      const resGraph2 = axios.post(urlGraph2, fechas, { cancelToken: source.token });
      responsePromise.push(resGraph2);
    }
      //*********************************************** */
      let responses = await Promise.all(responsePromise);
      //Setting data
      if (isMounted)  setCotizaciones(responses[0].data);

      setCotizaciones(responses[0].data);
      if(urlGraph !== "" && isMounted){
        setGraphdataCot(responses[1].data);
      }
      if(urlGraph2 !== "" && isMounted){
        setGraphdataCot2(responses[2].data);
      }

      await setIsLoad(true);
     } catch (error) {
       console.log(error)
     }
     return () => {
        isMounted = false;
        source.cancel();
    };
    }
    fetchData();
  };

    useEffect(() => {
      //********************************************* */
      const source = axios.CancelToken.source();
      let isMounted = true;
      //********************************************* */
      try {
       if(titulo === "Efectivo / Sobrantes / Faltantes"){
        const actualiza =async () =>{
         // const valorActualSelect = document.getElementById("listaAgencias").value
         // alert(valorActualSelect)
          const resTotalIngresos = await axios.post(`${REACT_API_URL_DESA}/${TotalIngresosME}`, {...value,"cCodOfi":oficina}, { cancelToken: source.token })
          // responsePromise.push(resTotalIngresos);
          if (isMounted) setdtosAgencias(resTotalIngresos.data)
        // await setdtosAgencias(resTotalIngresos.data)
        }
        actualiza()
     }
      } catch (error) {
        if (!isMounted) return; // comp alresady unmounted, nothing to do
        if (axios.isCancel(error)) console.log(error);
        else console.log(error);
      }
        //cancelando subscripciones
        return () => {
          isMounted = false;
          source.cancel();
      };
     }, [])
     
    useEffect(() => {
      //********************************************* */
      const source = axios.CancelToken.source();
      let isMounted = true;
      //********************************************* */
     try {
       
      if(titulo === "Efectivo / Sobrantes / Faltantes"){
       
       const actualiza =async () =>{
         const resTotalIngresos = await axios.post(`${REACT_API_URL_DESA}/${TotalIngresosME}`, {...value, "cCodOfi":oficina} , { cancelToken: source.token })
         if (isMounted) setdtosAgencias(resTotalIngresos.data)
  
       }    
       actualiza()
    }
     } catch (error) {
          if (!isMounted) return; // comp already unmounted, nothing to do
          if (axios.isCancel(error)) console.log(error);
          else console.log(error);
     }
    //cancelando subscripciones
      return () => {
          isMounted = false;
          source.cancel();
      };
    }, [dtosAgencias])

    useEffect(() => {

      var fec_hasta_Ini_DT =
        fecha_hasta.getFullYear() +
        "-" +
        (fecha_hasta.getMonth() + 1) +
        "-" +
        fecha_hasta.getDate();
      var lmes = (fecha_hasta.getMonth() + 1).toString();
      var ldia = fecha_hasta.getDate();
      if (lmes < 9) {
        var mes = "0" + (fecha_hasta.getMonth() + 1);

        if (ldia < 10) {
          var dia = "0" + fecha_hasta.getDate();
          fec_hasta_Ini_DT = fecha_hasta.getFullYear() + "-" + mes + "-" + dia;
        } else {
          fec_hasta_Ini_DT =
            fecha_hasta.getFullYear() + "-" + mes + "-" + fecha_hasta.getDate();
        }
      }
      //********************************************* */
      const source = axios.CancelToken.source();
      let isMounted = true;
      //********************************************* */
      async function fetchData() {
        let responsePromise = []
        try {
          const res = axios.post(url, value, { cancelToken: source.token });
          responsePromise.push(res);
    
          if(urlGraph !== ""){
            const resGraph = axios.post(urlGraph, value, { cancelToken: source.token });
            responsePromise.push(resGraph);
          }

          if(urlGraph2 !== ""){
            const resGraph2 = axios.post(urlGraph2, value, { cancelToken: source.token });
            responsePromise.push(resGraph2);
          }
    
          if(titulo === "Efectivo / Sobrantes / Faltantes"){
              const resAgencias = axios.post(`${REACT_API_URL_DESA}/${ResumenIngresosME}`, value, { cancelToken: source.token });
              responsePromise.push(resAgencias);

              const resTotalIngresos = await axios.post(`${REACT_API_URL_DESA}/${TotalIngresosME}`, {...value, "cCodOfi":"0"}, { cancelToken: source.token })
             responsePromise.push(resTotalIngresos);
          }
    
          let responses = await Promise.all(responsePromise);
          // console.log(responses)
          //Setting data
          if (isMounted)  setCotizaciones(responses[0].data);
         
          if(urlGraph !== "" && isMounted){
            setGraphdataCot(responses[1].data);
          }
          if(urlGraph2 !== "" && isMounted){
            setGraphdataCot2(responses[2].data);
          }
          if (titulo === "Efectivo / Sobrantes / Faltantes") {
            if (isMounted){
              setAgencias(responses[1].data)
              setdtosAgencias(responses[2].data)//datos por defecto que se pasa al grafico de totales
              
            }
          }
    
          await setValue({
            fecha_desde: fec_hasta_Ini_DT,
            fecha_hasta: fec_hasta_Ini_DT,
          });
          await setIsLoad(true);

        } catch (error) {
              if (!isMounted) return;
              if (axios.isCancel(error)) console.log(error);
              else console.log(error);
              console.log(error)
        }
      
      }
      fetchData();
    
      return () => {
        isMounted = false;
        source.cancel();
      };
    }, []);

   

 
  //######################MANEJADORES EVENTOS DEL SELECT NUEVO(EFECTIVO/SOBRANTE/FALTANTE)##########
  //################################################################################################
  const handleChangeOfic = (e)=>{
    setOficina(e.target.value)
    setCotizaciones(dtosAgencias)
  }
  const handleChange = async (e) => {
    const source = axios.CancelToken.source();
    let isMounted = true;
    try {
      // await setIsLoad(false);

      const arrDesde = value.fecha_desde.split("-");
      const arrHasta = value.fecha_hasta.split("-");
      const fechDesde = arrDesde[2] + "/" + arrDesde[1] + "/" + arrDesde[0];
      const fechHasta = arrHasta[2] + "/" + arrHasta[1] + "/" + arrHasta[0];
      ///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
      ////validando que la facha de inicio sea menor a la de culminacion
      const fechaHoy = new Date();
      const startDay = new Date(arrDesde);
      const endDay = new Date(arrHasta);
      if (endDay < startDay) {
        setOpen(true)
        setMsn('La fecha de inicio debe ser menor a la de culminación')
        return 
      }
      if (startDay == "Invalid Date" || endDay == "Invalid Date") {
        setOpen(true)
        setMsn('Favor ingresar la fecha de inicio y culminación');
        return;
      }
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
await setIsLoad(false);

const fechas = { fecha_desde: fechDesde, fecha_hasta: fechHasta, cCodMoneda:moneda, cCodOfi: oficina };
      // alert(JSON.stringify(fechas))

      const respTotalxAgencia = async () => {
        // alert(JSON.stringify(fechas))
        const res = await axios.post(`${REACT_API_URL_DESA}/${TotalIngresosME}`, fechas, { cancelToken: source.token })
        if (isMounted){
          if(oficina == 0) {
            // setdtosAgencias([])
            // setCotizaciones([])
            // alert(JSON.stringify(agencias))
            let res1 = await axios.post(`${REACT_API_URL_DESA}/${ResumenIngresosME}`, fechas)
            // alert(JSON.stringify(res1.data))
      
             setdtosAgencias(res1.data)
             setCotizaciones(res1.data)//estado del grafico
          } else{

            setdtosAgencias(res.data)
            setCotizaciones(res.data)
            // await setdtosAgencias(res.data)
            // alert("desde tabContent::" + JSON.stringify(res.data))
            setOficina(fechas.cCodOfi)
          }
          await setIsLoad(true);
        }
      }

      respTotalxAgencia();
    } catch (error) {
      if (!isMounted) return;
      if (axios.isCancel(error)) console.log(error);
      else console.log(error);
      console.log(error)
    }
    return () => {
      isMounted = false;
      source.cancel();
    };
  };
//####################################################################################
//####################################################################################

  return (
    <>
    <AlertDialogSlide open={open} setOpen={setOpen} handleClose={handleClose} msn={msn}/>
      {!isLoad ? (
        <>
          <LinearProgress />
        </>
      ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* *******************CONTROLES DE FECHAS************************ */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={4} md={3} lg={2}>
                          <TextField
                            name="fecha_desde"
                            id="fecha_desde"
                            label="Fecha Inicio"
                            type="date"
                            value={value.fecha_desde}
                            //defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={onChangeVal}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} lg={2}>
                          <TextField
                            name="fecha_hasta"
                            id="fecha_hasta"
                            label="Fecha Culminación"
                            type="date"
                            // defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={value.fecha_hasta}
                            onChange={onChangeVal}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} lg={2}>
                          <InputLabel style={{ fontSize: 12, marginBottom: 4, textAlign:"left", marginLeft:20 }}>Moneda</InputLabel>
                                <Select
                                  onChange={handleChangeMoneda}
                                  value={moneda}
                                  id="listaMoneda"
                                  style={{ width: 150,fontSize: 12,textTransform:"capitalize" }}
                                >
                                  {listCurrencies.map((moneda) => {
                                    return (
                                      <MenuItem
                                        key={moneda.CODMONEDA}
                                        name={moneda.CODMONEDA}
                                        value={moneda.CODMONEDA}
                                        style={{fontSize: 12 }}
                                      >
                                        {moneda.DESCMONEDA}
                                      </MenuItem>
                                    )
                                  })}
                                </Select>
                        </Grid>
                       
                      
{/* AGENCIASSSS************************************************************************************************************ */}
{/* AGENCIASSSS************************************************************************************************************ */}
                           {titulo === "Efectivo / Sobrantes / Faltantes" ? (
                          <>
                            <Grid
                              item
                              style={{ display: "flex", flexDirection: 'column' }}
                              xs={6}
                              sm={4}
                              md={3}
                              lg={2}
                            >
                              <FormControl >
                                <InputLabel style={{ fontSize: 12, marginBottom: 4 }}>Agencias</InputLabel>
                                <Select
                                  onChange={handleChangeOfic}
                                  value={oficina}
                                  id="listaAgencias"
                                  style={{ width: 150,fontSize: 12,textTransform:"capitalize" }}
                                >
                                  <MenuItem këy="0" value="0"  style={{fontSize: 12 }}>TODAS</MenuItem>
                                  {agencias.map((oficina) => {
                                    return (
                                      <MenuItem
                                        key={oficina.CODIGO_OFICINA}
                                        name={oficina.CODIGO_OFICINA}
                                        value={oficina.CODIGO_OFICINA}
                                        style={{fontSize: 12 }}
                                      >
                                        {oficina.OFICINA}
                                      </MenuItem>
                                    )
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              style={{ display: "flex" }}
                              xs={12}
                              sm={4}
                              md={3}
                              lg={4}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<SearchIcon fontSize="small" />}
                                onClick={handleChange}
                                style={{ marginRight: 20 }}
                                size="small"
                              >
                                Buscar
                           </Button>
                              <ExportarExcel titulo={titulo} enviarjsonGrid={cotizaciones} />
                            </Grid>
                           
                          </>
                           ) : (
                            <>
                             
                            <Grid
                            item
                            style={{ display: "flex" }}
                            xs={12}
                            sm={4}
                            md={3}
                            lg={4}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<SearchIcon fontSize="small" />}
                                onClick={onSubmit}
                                style={{ marginRight: 20 }}
                                size="small"
                              >
                                Buscar
                          </Button>
                           <ExportarExcel titulo={titulo}  enviarjsonGrid={cotizaciones} />
                          </Grid>
                          </>
                           )}                     
{/* AGENCIASSSS************************************************************************************************************ */}
{/* AGENCIASSSS************************************************************************************************************ */}
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                {/* ************************************************ */}
              </Grid>
              <>
                {titulo == "Porcentajes Totales" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={8}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridPorcTotal enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp}`}
                      >
                        <GraficaCotiVsEm enviardataGraph={graphdataCot} />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Cotizaciones Piramide" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={8}>
                      <Paper elevation={8} className={`${classes.paper} ${classes.respHeight}`}>
                        <GridCotOcea enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} `}
                      >
                        <Grafico
                          enviardataGraph={graphdataCot}
                          valor="realizadas"
                        />
                      </Paper>
                      <Paper elevation={8} className={classes.paper}>
                        <Grafico
                          enviardataGraph={graphdataCot2}
                          valor="emitidas"
                        />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Cotizaciones por Productos" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={8}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridCotProdOcea enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp}`}
                      >
                        {/* <Graficoproductos enviardataGraph={graphdataCot} /> */}
                        <Grafico
                          enviardataGraph={graphdataCot}
                          valor="productos"
                        />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Cotizaciones por Perfil" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={8}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridCotOceaPerfil enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart}`}
                        style={{ height: 300 }}
                      >
                        <Graficoprodperfil enviardataGraph={graphdataCot} valor="prodPerfil" />

                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Cotizaciones Emitidas por Productos" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={8}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridCotProdOcea enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp}`}
                      >
                        <Grafico enviardataGraph={graphdataCot} valor="emitXprod" />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Cotizaciones Emitidas por Perfil" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={8}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridEmiOceaPerfil enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp}`}
                      >
                        <Graficoprodperfil enviardataGraph={graphdataCot} valor="emitXperfil" />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Recaudo de Divisas en Efectivo" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper elevation={8} className={classes.paper}>
                        {/* <GridEmiOceaPerfil enviardataGrid={cotizaciones} /> */}
                        <GridDivisEfec valor={titulo} enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={8} >
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp} ${classes.graphBar}`}
                      >
                        <GraficoBar valor="Recaudo de Divisas en Efectivo" enviardataGraph={cotizaciones} />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Recaudación Divisas-Efectivo-Sobrantes" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper elevation={8} className={classes.paper}>
                        {/* <GridEmiOceaPerfil enviardataGrid={cotizaciones} /> */}
                        <GridDivisEfec valor={titulo} enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={8} >
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp} ${classes.graphBar}`}
                      >
                        <GraficoBar valor="Recaudación Divisas-Efectivo-Sobrantes" enviardataGraph={cotizaciones} />
                      </Paper>
                    </Grid>
                  </>
                ) : titulo == "Recaudación Divisas - Efectivo - Faltantes" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={4}>
                      <Paper elevation={8} className={classes.paper}>
                        {/* <GridEmiOceaPerfil enviardataGrid={cotizaciones} /> */}
                        <GridDivisEfec valor={titulo} enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={8} >
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp} ${classes.graphBar}`}
                      >
                        <GraficoBar valor="Recaudación Divisas - Efectivo - Faltantes" enviardataGraph={cotizaciones} />
                      </Paper>
                    </Grid>
                  </>
                ) 
                : titulo == "Efectivo / Sobrantes / Faltantes" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={6}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridDivisEfec valor={titulo} enviardataGrid={cotizaciones} dtosAgencias={dtosAgencias} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} md={6} >
                      <Paper
                        elevation={8}
                        className={`${classes.paper} ${classes.chart} ${classes.paperresp} ${classes.graphBar}`}
                      >
                        <GraficoBar valor="Efectivo / Sobrantes / Faltantes" enviardataGraph={dtosAgencias} enviardataGrid={cotizaciones}/>
                        {/* <GrafMtoFaltSobr valor={titulo}  dtosAgencias={dtosAgencias} /> */}
                        {/* <GraficaCotiVsEm enviardataGraph={graphdataCot} /> */}
                      </Paper>
                    </Grid>
                  </>
                ) 
                :titulo == "Recaudación Divisas - Efectivo - Faltantes y Sobrantes" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} md={12}>
                      <Paper elevation={8} className={classes.paper}>
                        <GridDivisEfec valor="Recaudación Divisas - Efectivo - Faltantes y Sobrantes" enviardataGrid={cotizaciones} />
                      </Paper>
                    </Grid>
                  
                  </>
                ) : (
                                      "Otra Opcion"
                                    )}
              </>
            </Grid>
          </>
        )}
    </>
  );
}

export default TabContent;

{
  /* <Grid item xs={12} sm={12} md={12} md={8}>
<Paper elevation={8} className={classes.paper}>
  <XGrid />
</Paper>
</Grid>
<Grid item xs={12} sm={12} md={12} md={4}>
<Paper
  elevation={8}
  className={`${classes.paper} ${classes.chart}`}
>
  <Chart />
</Paper>
<Paper elevation={8} className={classes.paper}>
  <Chart />
</Paper>
</Grid> */
}
