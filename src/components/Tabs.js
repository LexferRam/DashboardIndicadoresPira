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
          <Typography>{children}</Typography>
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const REACT_API_URL= "https://emergencia24horas.segurospiramide.com/node/express/servicios/api"

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
          <Tab label="Cotizaciones emitidas vs no emitidas" {...a11yProps(0)} />
          <Tab label="Cotizaciones Piramide" {...a11yProps(1)} />
          <Tab label="Cotizaciones por Productos" {...a11yProps(2)} />
          <Tab label="Cotizaciones por Perfil" {...a11yProps(3)} />
          <Tab label="Pólizas Emitidas por Productos" {...a11yProps(4)} />
          <Tab label="Pólizas Emitidas por Perfil" {...a11yProps(5)} />
          {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContent
          titulo="Porcentajes Totales"
          url="/api/Ver_TotalesPira"
          urlGraph="/api/Ver_TotalesPira"
          urlGraph2="/api/Ver_CotizacionesPiraEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent
          titulo="Cotizaciones Piramide"
          url="/api/Ver_CotizacionesPira"
          urlGraph="/api/Ver_CotizacionesPira_Productos"
          urlGraph2="/api/Ver_CotizacionesPiraEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContent
          titulo="Cotizaciones por Productos"
          url="/api/Ver_CotizacionesPira_Productos"
          urlGraph="/api/Ver_CotizacionesPira_Productos"
          urlGraph2="/api/Ver_CotizacionesPiraEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabContent
          titulo="Cotizaciones por Perfil"
          url="/api/Ver_CotizacionesPira_Perfil"
          urlGraph="/api/Ver_CotizacionesPira_Perfil"
          urlGraph2="/api/Ver_CotizacionesPiraEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TabContent
          titulo="Cotizaciones Emitidas por Productos"
          url="/api/Ver_CotizacionesPiraEmit"
          urlGraph="/api/Ver_CotizacionesPiraEmit"
          urlGraph2="/api/Ver_CotizacionesPiraEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TabContent
          titulo="Cotizaciones Emitidas por Perfil"
          url="/api/Ver_EmisionesPira_Perfil"
          urlGraph="/api/Ver_EmisionesPira_Perfil"
          urlGraph2="/api/Ver_EmisionesPira_Perfil"
        />
      </TabPanel>
    </div>
  );
}
