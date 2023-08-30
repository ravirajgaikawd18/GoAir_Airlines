import { useState } from "react";
import UpdateProfileValidation from "./updateProfileValidation";


function UpdateProfile(){

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [message, setMessage] = useState("");

    const changeHandler = (args) => {
        var copyOfUser = {...user};
        copyOfUser[args.target.id] = args.target.value;
        setUser(copyOfUser);
    }

    function SubmitUpdate(){
        debugger;
        var status = UpdateProfileValidation();
        console.log("status = " + status);
        if(status){
            console.log("dataToBeSend = " + user.username);

            var data = fetch("http://localhost:8080/users/updateprofile", 
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }
            )
            .then((response) => {return response.json()})
            .then((data) => {
            console.log("responce = "+ data.message);
            if(data.message == "profile updated"){
                setMessage(data.message + "  successfully!");
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

    return <center>
        <h1>Update profile...</h1>     <br></br>
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
                        <button className="btn btn-info" onClick={SubmitUpdate}>Update</button>        <br></br><br></br>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{color:"red"}}><h3>{message}</h3></div>
    </center>
}
export default UpdateProfile;