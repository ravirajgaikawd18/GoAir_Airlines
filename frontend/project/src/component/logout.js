import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClearStorage } from "../hooks/useAuthenticationHelper";

function Logout(props){
    
    const [mesg, setMesg] = useState("");
    const navigate = useNavigate();

    async function submitLogout(){
        // debugger;
        // var resBody = {token: sessionStorage.getItem("token"), userName: sessionStorage.getItem("userName")}
        // console.log("token = " + resBody.token + " userName = " + resBody.userName);
        // var res = await fetch("http://localhost:8080/users/logout",
        //     {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(resBody)
        //     }
        // )
        // .then((response) => {return response.json()})
        // .then((data) => {
        //     console.log("responce = "+ data.message)
        //     setMesg(data.message);
        //     ClearStorage();
        //     props.setUserName("Guest");
        //     setTimeout(() => navigate("/home"), 5000);
        // })
        // .catch((error) => {
        //     console.log("error = " + error);
            
        // })

        setMesg("You have logged out successfully!")
        ClearStorage();
        sessionStorage.clear();
        props.setUserName("Guest");
        setTimeout(() => navigate("/home"), 5000);
    }

    return <>
        <h1>Thank you {sessionStorage.getItem("name")}</h1>
        <h2>Click on Logout button to logout</h2>
        <h2>You will be auto redirected to home page!</h2>
        <button onClick={submitLogout} className="btn btn-danger">Logout</button>
        <h1 style={{color: "red"}}>{mesg}</h1>
    </>
}
export default Logout;