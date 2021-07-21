import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabContent from "./TabContent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const REACT_API_URL_DESA = "http://10.128.49.125:5000/recaudosApi";
    // const REACT_API_URL_DESA = "https://emergencia24horas.segurospiramide.com/node/express/servicios/api";
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Recaudación Divisas-Efectivo" {...a11yProps(0)} />
          <Tab label="Sobrantes" {...a11yProps(1)} />
          <Tab label="Faltantes" {...a11yProps(2)} />
          <Tab label="Efectivo / Sobrantes / Faltantes" {...a11yProps(3)} />
          <Tab label="Recaudación Divisas - Efectivo - Faltantes y Sobrantes" {...a11yProps(4)} />
          {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContent
          titulo="Recaudo de Divisas en Efectivo"
          url={`${REACT_API_URL_DESA}/ResumenIngresosInverMe`}
          urlGraph=""
          urlGraph2=""
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent
          titulo="Recaudación Divisas-Efectivo-Sobrantes"
          url={`${REACT_API_URL_DESA}/ResumenIngresosInverMe`}
          urlGraph=""
          urlGraph2=""
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContent
          titulo="Recaudación Divisas - Efectivo - Faltantes"
          url={`${REACT_API_URL_DESA}/ResumenIngresosInverMe`}
          urlGraph=""
          urlGraph2=""
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabContent
          titulo="Efectivo / Sobrantes / Faltantes"
          url={`${REACT_API_URL_DESA}/ResumenIngresosInverMe`}
          urlGraph=""
          urlGraph2=""
          TotalIngresosME="TotalesIngresosInverME"
          ResumenIngresosME="ResumenIngresosInverME"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TabContent
          titulo="Recaudación Divisas - Efectivo - Faltantes y Sobrantes"
          url={`${REACT_API_URL_DESA}/DetalleIngresosInverMe`}
          urlGraph=""
          urlGraph2=""
        />
      </TabPanel>
  
    </div>
  );
}
