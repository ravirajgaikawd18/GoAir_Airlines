import { wait } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetDateTime from "./getDateTime";
import RegValidate from "./regCommonValidaton";

function Register(){

    var dateTime = GetDateTime();

    const [user, setUser] = useState({username: "", email: "", password: "", firstName: "", lastName: "",
                                        phone: "", adhar: "", role: "PASSANGER", createdTime: dateTime, isActive: true});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const changeHandler = (args) => {
        var copyOfUser = {...user};
        copyOfUser[args.target.id] = args.target.value;
        setUser(copyOfUser);
    }

    async function SubmitRegister(para){
        debugger;
        var status = RegValidate();
        console.log("status = " + status);
        if(status){
            var role = sessionStorage.getItem("role");
            if(role == "ADMIN"){
                var dataToBeSend = {username: para.username, email: para.email, password: para.password,
                    firstName: para.firstName, lastName: para.lastName,
                       phone: para.phone, adhar: para.adhar, role: "SUBADMIN", createdTime: dateTime,
                        isActive: true};
            } else {
                var dataToBeSend = {username: para.username, email: para.email, password: para.password,
                    firstName: para.firstName, lastName: para.lastName,
                       phone: para.phone, adhar: para.adhar, role: "PASSANGER", createdTime: dateTime,
                        isActive: true};
            }
            
            console.log("dataToBeSend = " + dataToBeSend.username + " " + dataToBeSend.createdTime);

            var data = await fetch("http://localhost:8080/users/register", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dataToBeSend)
            }
            )
            .then((response) => {return response.json()})
            .then((data) => {
            console.log("responce = "+ data.username);
            if(data.username != undefined){
                setMessage(data.firstName + " Registered successfully!");
                setTimeout(() => navigate("/login"), 5000);
            }
            else
                setMessage("Registration failed!");

            })
            .catch((error) => {
            console.log("error = " + error);
            setMessage("Registration failed!");
            })
        }
    
    }

    return <center>
            <div>
            <h1>Register here!</h1>     <br></br>
            <table>
                <tbody>
                    <tr>
                        <td>Username: <br></br><br></br></td>
                        <td><input type={'text'} required
                                    id="username"
                                    value={user.username}
                                    onChange={changeHandler}></input>   <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForUserName" style={{color:"red"}}></div>     <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>password: <br></br><br></br></td>
                        <td>
                        <input type={'password'} required
                                    id="password"
                                    value={user.password}
                                    onChange={changeHandler}></input>       <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForPassword" style={{color:"red"}}></div>     <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>email: <br></br><br></br></td>
                        <td>
                        <input type={'email'} required
                                    id="email"
                                    value={user.email}
                                    onChange={changeHandler}></input>       <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForEmail" style={{color:"red"}}></div>        <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>firstName: <br></br><br></br></td>
                        <td>
                        <input type={'text'} required
                                    id="firstName"
                                    value={user.firstName}
                                    onChange={changeHandler}></input>       <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForFirstName" style={{color:"red"}}></div>    <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>lastName: <br></br><br></br></td>
                        <td>
                        <input type={'text'} required
                                    id="lastName"
                                    value={user.lastName}
                                    onChange={changeHandler}></input>       <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForLastName" style={{color:"red"}}></div>     <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>phone: <br></br><br></br></td>
                        <td>
                        <input type={'number'} required
                                    id="phone"
                                    value={user.phone}
                                    onChange={changeHandler}></input>       <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForPhone" style={{color:"red"}}></div>        <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>adhar: <br></br><br></br></td>
                        <td>
                        <input type={'number'}
                                    id="adhar"
                                    value={user.adhar}
                                    onChange={changeHandler}></input>       <br></br><br></br>
                        </td>
                        <td>
                            <div id="ErrorForAdhar" style={{color:"red"}}></div>        <br></br><br></br>
                        </td>
                    </tr>
                    <tr>
                        <td style={{columnSpan:2}}>
                        <button className="btn btn-info" onClick={() => {SubmitRegister(user)}}>Register</button>        <br></br><br></br>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{color:"red"}}><h3>{message}</h3></div>
            <div style={{color:"red"}}><h3>{error}</h3></div>       <br></br><br></br>
            
            </div>
            </center>
}
export default Register;