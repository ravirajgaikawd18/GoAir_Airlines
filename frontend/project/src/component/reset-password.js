import { useState } from "react";
import $ from "../../node_modules/jquery/dist/jquery"

function ResetPassword(){

    const [user, setUser] = useState({email: "", password: "", otp: ""});
    const [message, setMessage] = useState("");

    const changeHandler = (args) => {
        var copyOfUser = {...user};
        copyOfUser[args.target.id] = args.target.value;
        setUser(copyOfUser);
    }

    function SubmitReset(){
        setMessage("");
        var c_password = "";
        $(document).ready(function() {
            c_password = $("#c_password").val();
        });
        if(c_password != user.password)
            setMessage("Both password should match");
        else{
            var data = fetch("http://localhost:8080/user/resetpassword", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: user.email, password: user.password})
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
        console.log("responce = "+ data.message);
        if(data.message == "password updated"){
            setMessage("password updated successfully!");
        }
        else
            setMessage("Failed!");
        })
        .catch((error) => {
        console.log("error = " + error);
            setMessage("Failed!");
        })
        }
    }
    function SubmitSend(){
        setMessage("");
        $(document).ready(function() {
            $("#email").prop("disabled", true);
        });
        var data = fetch("http://localhost:8080/email/sendemail", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({to: user.email, subject: "Regarding password reset", message: "Use this otp to reset password"})
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
        console.log("responce = "+ data.response);
        if(data.response == "success"){
            setMessage("otp sent successfully!");
        }
        else
            setMessage(data.response);
        })
        .catch((error) => {
        console.log("error = " + error);
            setMessage("Failed!");
        })
    }
    function SubmitVerify(){
        setMessage("");
        var data = fetch("http://localhost:8080/users/verifyotp", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({otp: user.otp})
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
        console.log("responce = "+ data.message);
        if(data.message == "verified"){
            setMessage("otp verified successfully!");
            $(document).ready(function() {
                $("#btnReset").prop("disabled", false);
            });
        }
        else
            setMessage("Failed!");
        })
        .catch((error) => {
        console.log("error = " + error);
            setMessage("Failed!");
        })
    }

    return <>
        <center>
        <h1>Reset Password!</h1>        <br></br>
        <table>
            <tbody>
                <tr>
                    <td>Enter email: <br></br><br></br></td>
                    <td><input type={'email'} placeholder="abc@gmail.com"
                                id="email"
                                value={user.email}
                                onChange={changeHandler}></input>   <br></br><br></br>
                    </td>
                </tr>
                <tr>
                    <td>Enter OTP: <br></br><br></br></td>
                    <td><input type={'text'} placeholder="otp"
                                id="otp"
                                value={user.otp}
                                onChange={changeHandler}></input>   <br></br><br></br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btn btn-secondary" onClick={() => {SubmitSend()}}>Send OTP</button> <br></br><br></br>
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={() => {SubmitVerify()}}>Verify OTP</button> <br></br><br></br>
                    </td>
                </tr>
                <tr>
                    <td>New Password: <br></br><br></br></td>
                    <td>
                    <input type={'password'} placeholder="password"
                                id="password"
                                value={user.password}
                                onChange={changeHandler}></input>       <br></br><br></br>
                    </td>
                </tr>
                <tr>
                    <td>Confirm Password: <br></br><br></br></td>
                    <td>
                    <input type={'password'} placeholder="re-enter password"
                                id="c_password"
                                onChange={changeHandler}></input>       <br></br><br></br>
                    </td>
                </tr>
                <tr>
                    <td style={{columnSpan:2}}>
                    <button id="btnReset" className="btn btn-info" onClick={SubmitReset} disabled >Reset</button>     <br></br><br></br>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style={{color:"red"}}><h3>{message}</h3></div>
        </center>
    </>
}
export default ResetPassword;