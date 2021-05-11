import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
//validando rutas segun si el usuario esta autenticado o no
const UnPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (JSON.parse(sessionStorage.getItem("DATA_DASH")))
          return (
            <Redirect
              to={{ pathname: "/app", state: { from: props.location } }}
            />
          );

        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRoute;
