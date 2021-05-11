import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import img from "../logo-piramides.svg";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withRouter} from "react-router-dom"
import Alert from "./Alerta"

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "fixed",
    zIndex: 999999999999,
    flexGrow: 1,
    width: "100%",
  },
  menu: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: 150,
    // marginRight:700
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleClose = () => {

    setAnchorEl(null);
    sessionStorage.clear('DATA');
    props.history.push("/");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <img src={img} className="imgAppBar" />

          <div onClick={handleClose} className="salir" style={{ marginLeft: "40%", cursor: "pointer", color: "gray" }}>
            Salir
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar)
