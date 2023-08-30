
import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { IsUserLoggedIn } from "../hooks/useAuthenticationHelper";
import Login from "./login";

function ProtectedRoute(props){

    const [message, setMessage] = useState("This page is secured, if you are not logged in, you need to login; click on access button.");
    const navigate = useNavigate();

    const execute = () => {
        debugger;
        if(IsUserLoggedIn()){

            var role = sessionStorage.getItem("role");
            if(role == "ADMIN"){
                navigate("/addSubadmin");
            } else if(role == "SUBADMIN"){
                navigate("/adminDashboard");
            } else {
                setMessage("You are not authorized to access this page!")
            }
        } else {
    
            setMessage(<Login signIn = {props.signIn}></Login>);
            var refToButton = document.getElementById("btn");
            refToButton.disabled = true;
        }
    }
    return <center>
        <h1 style={{color: "red"}}>{message}</h1>
        <br></br>
        <button className="btn btn-info" onClick={execute} id="btn">Access</button>
    </center>
    
}
export default ProtectedRoute;