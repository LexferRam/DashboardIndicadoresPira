import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const AuthState = (props) => {
  const [userAuth, setUserAuth] = useState("");
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const login = async (user) => {
    try{
    // setIsLoaded(false);
    const res = await axios.post(
      "https://segurospiramide.com/asg-api/login",
      user
    );
    await sessionStorage.setItem("DATA_DASH", JSON.stringify(res.data));     
    setUserAuth(JSON.parse(sessionStorage.getItem("DATA_DASH")).user.PORTAL_USERNAME);
    // setIsLoaded(true);
  } catch (error) {
    if(error.response){
      if(error.response.status == 400){
        alert("Usuario o Contrasena incorrecta")
        props.history.push("/");
      } else{
        //props.history.push("/app");
      }
    }else if(error.request){
      return error.request
    }else{
      return error.message
    }

    // console.log(res);
  };
}
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("DATA_DASH"))) {
      setUserAuth(
        JSON.parse(sessionStorage.getItem("DATA_DASH")).user.PORTAL_USERNAME
      );
      setIsLoaded(true);
    }
  }, [userAuth]);

  return (
    <div>
      {!isLoaded ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
      
        >
          <CircularProgress
            style={{
              color: "#bd261e"
            }} />
        </div>
      ) : (
        <AuthContext.Provider
          value={{
            login,
            userAuth,
            setUserAuth,
            token,
          }}
        >
          {props.children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthState;
