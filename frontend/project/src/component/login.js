import { useEffect, useState } from "react";
import GetResponse from "../axios-fun/user-fun";

function Login(props){

    const [message, setMessage] = useState("");
    const [user, setUser] = useState({uName: "", pswd: ""});
    const [error, setError] = useState("");

    const onInvalidLogin = () => {
        //set message and clean input message
        setUser({uName: "", pswd: ""});
        setMessage("Invalid credentials");
    }

    useEffect(() => {
        var errorMessage = "";
        for(const property in user){
            const valueOfProperty = user[property]
            if(valueOfProperty == ""){
                errorMessage = errorMessage + " | " + property + " is required";
            }
        }
        setError(errorMessage);
    }, [user]);

    const changeHandler = (args) => {
        var copyOfUser = {...user};
        copyOfUser[args.target.id] = args.target.value;
        setUser(copyOfUser);
    }

    async function SubmitLogin(para){
        debugger;
        
    
        var dataToBeSend = {username: para.uName, password: para.pswd};
        console.log("dataToBeSend = " + dataToBeSend);
    
        var data = await fetch("http://localhost:8080/token",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dataToBeSend)
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data.user.username)
            props.signIn(data, onInvalidLogin);
        })
        .catch((error) => {
            console.log("error = " + error);
            props.signIn(error, onInvalidLogin);
        })
    
    }
    
    // const sendRequest = () => {
    //     debugger;
    //     console.log("user = "+ user);
    //     var response = GetResponse(user);
    //     console.log("response in login = " + response.userName);
    //     // props.signIn(responce, onInvalidLogin)
    // }

    return <div>
        <center>
        <h1>Login here!</h1>
        <br></br>
        <br></br>
        <table>
            <tbody>
                <tr>
                    <td>Username: <br></br><br></br></td>
                    <td><input type={'text'} placeholder="username"
                                id="uName"
                                value={user.uName}
                                onChange={changeHandler}></input>
                        <br></br>
                        <br></br>
                    </td>
                </tr>
                <tr>
                    <td>Password: <br></br><br></br></td>
                    <td>
                    <input type={'password'} placeholder="password"
                                id="pswd"
                                value={user.pswd}
                                onChange={changeHandler}></input>
                        <br></br>
                        <br></br>
                    </td>
                </tr>
                <tr>
                    <td style={{columnSpan:2}}>
                    <button className="btn btn-info" onClick={() => {SubmitLogin(user)}}>Login</button>
                        <br></br>
                        <br></br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="/register">New user register here</a>  <br></br><br></br>
                    </td>
                    <td>
                        <a href="/reset-password">Forget password</a>   <br></br><br></br>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style={{color:"red"}}><h3>{message}</h3></div>
        <div style={{color:"red"}}><h3>{error}</h3></div>
        </center>
    </div>

}
export default Login;