import React from "react";
//GRID
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//Tabs
import Tabs from "./components/Tabs";
import Tabs2 from "./components/Tabs2";
import "./css/Tabs.css";
import AppBar from "./components/AppBar";
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { BrowserRouter as Router, Route, Switch as Switch2 } from "react-router-dom";
import AuthState from "./Context/AuthContext/AuthState";
import Login from "./components/Login";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnprivateRoute";

//estilos grid
const useStyles = makeStyles((theme) => ({
  checkLabels: {
    marginTop: 10,
    marginRight: 30
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // marginTop: 65,
  },
  borde: {
    borderRadius: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      marginTop: 10,
    },
  },
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: orange[300],
    '&$checked': {
      color: orange[500],
    },
    '&$checked + $track': {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>

      <Router>
        <AuthState>
          <Switch2 >
            <UnPrivateRoute exact path="/" component={Login} />
            <PrivateRoute path="/app" component={() => {
              return (
                <>
                  <AppBar />
                  <div style={{ display: "none", justifyContent: "center", marginTop: 20, marginBottom: -20 }}>
                    <div className={`${classes.checkLabels}`}>Recaudación</div>
                    <FormGroup>
                      <FormControlLabel
                        control={<PurpleSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                      // label="Recaudos"
                      />
                    </FormGroup>
                    <div className={`${classes.checkLabels}`}>Cotizaciones</div>
                  </div>
                  {state.checkedA ? (
                    <div className={`${classes.root}`}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.borde}>
                          <Paper elevation={20} className={classes.paper}>
                            <Tabs />
                          </Paper>
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                      <div className={`${classes.root}`}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} className={classes.borde}>
                            <Paper elevation={20} className={classes.paper}>
                              <Tabs2 />
                            </Paper>
                          </Grid>
                        </Grid>
                      </div>
                    )}
                </>
              )
            }} />


          </Switch2>
        </AuthState>
      </Router>
    </>
  );
}

export default App;
