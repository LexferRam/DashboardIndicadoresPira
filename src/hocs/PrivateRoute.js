import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";

//validando rutas segun si se esta logeado y si se tiene permiso segun el rol de usuario
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  //   const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!JSON.parse(sessionStorage.getItem("DATA_DASH")))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        // if (!roles.includes(user.role))
        // return (
        //   <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        // );
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
