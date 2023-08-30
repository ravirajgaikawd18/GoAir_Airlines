import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "../../../node_modules/jquery/dist/jquery"
import PsgrAddValidation from "./psgrAddValidation";

function AddPsgrDetails() {


    var tkts = JSON.parse(sessionStorage.getItem("tickets"));
    const [passenger, setPassenger] = useState({gender: "", dob: "", adhar: "",
                                                 pfirstName: "", pmiddleName: "", plastName: "",
                                                  phone: "", ticketNo: tkts[0].ticketNo});
    const [passengers, setPassengers] = useState([]);
    const [message, setMessage] = useState("");
    const [psgrTbl, setPsgrTbl] = useState("");
    const [tNos, setTNos] = useState(sessionStorage.getItem("tnos"));
    const navigate = useNavigate();

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
      }

    const handleChange=(args)=>{
        // debugger;
        var copyOfpassenger = {...passenger};
        copyOfpassenger[args.target.id] = args.target.value;
        setPassenger(copyOfpassenger);
    }

    const finalSubmit = () => {
        setMessage("");

        var data = fetch( "http://localhost:8080/psgr/addpsgr",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(passengers),
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data)
            if(data == []){
                setMessage("Booking failed");
            } else if(data.length > 0){
                sessionStorage.removeItem("psgrList");
                sessionStorage.setItem("psgrList", JSON.stringify(data));
                navigate("/reviewTickets");
                
            } else 
                (setMessage("Booking failed"))
                
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Booking Failed");
        })
    }

    const submitPassenger = () => {
        debugger;
        var status = PsgrAddValidation();
        console.log("status = " + status);
        console.log("length = " + passengers.length);
        if(status){
            //push in array
            setPassengers([...passengers, passenger]);
            console.log(passengers);
        }
        if(passengers.length >= (tNos - 1)){
            $(document).ready(function() {
                $("#dtls").hide();
                $("#final").prop("hidden", false);
            });
        }
        else{
            console.log("le = " + passengers.length);
            setPassenger({gender: "", dob: "", adhar: "",
                            pfirstName: "", pmiddleName: "", plastName: "",
                            phone: "", ticketNo: (tkts[(passengers.length + 1)]).ticketNo});
            
        }
            setPsgrTbl(<>
                <tr style={styles}>
                  <th>First Name</th>  
                  <th>Last Name</th>  
                  <th>Middle Name</th>  
                  <th>Gender</th>
                  <th>DOB Time</th>
                  <th>Phone</th>
                  <th>Adhar</th>
                  <th>Ticket No.</th>
                </tr>
            </>);
        
    }

    return <center>

            <table className={["table table-success table-striped"]}>
                {psgrTbl}
            
                {
                    passengers.map((psgr) => {
                        
                        {
                        return <tr id={psgr.ticketNo} style={styles}>
                                    <td>{psgr.pfirstName}</td>
                                    <td>{psgr.plastName}</td>
                                    <td>{psgr.pmiddleName}</td>
                                    <td>{psgr.gender}</td>
                                    <td>{psgr.dob}</td>
                                    <td>{psgr.phone}</td> 
                                    <td>{psgr.adhar}</td>
                                    <td>{psgr.ticketNo}</td> 
                                </tr>  
                        }
                    })
                }  
            </table>
            <div>{message}</div>
            <div id="dtls">
                 <h1>Add passenger details here...</h1>     <br></br>
                 <h3>Passenger No. {(passengers.length) + 1}</h3>     <br></br>
                <table>
                    <tbody>
                        <tr>
                            <td style={{textAlign:"left"}}>First Name: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <input type={'text'}
                                        id="pfirstName"
                                        value={passenger.pfirstName}
                                        onChange={handleChange}></input>   <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForFirstName" style={{color:"red"}}></div>     <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left"}}>Last Name: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <input type={'text'} required
                                        id="plastName"
                                        value={passenger.plastName}
                                        onChange={handleChange}></input>       <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForLastName" style={{color:"red"}}></div>     <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left"}}>Middle Name: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <input type={'text'} required
                                        id="pmiddleName"
                                        value={passenger.pmiddleName}
                                        onChange={handleChange}></input>       <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForMiddleName" style={{color:"red"}}></div>        <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left"}}>Select Gender: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <select id="gender" value={passenger.gender} onChange={handleChange}>
                                            <option value="" selected>select</option>
                                            <option value="MALE">MALE</option>
                                            <option value="FEMALE">FEMALE</option>
                                            <option value="OTHER">OTHER</option>
                                        </select>       <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForGender" style={{color:"red"}}></div>    <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left"}}>DOB: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <input type={'date'} required
                                        id="dob"
                                        value={passenger.dob}
                                        onChange={handleChange}></input>       <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForDob" style={{color:"red"}}></div>     <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left"}}>Phone: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <input type={'number'} required
                                        id="phone"
                                        value={passenger.phone}
                                        onChange={handleChange}></input>       <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForPhone" style={{color:"red"}}></div>        <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left"}}>Adhar: <br></br><br></br></td>
                            <td style={{textAlign:"left"}}>
                            <input type={'number'}
                                        id="adhar"
                                        value={passenger.adhar}
                                        onChange={handleChange}></input>       <br></br><br></br>
                            </td>
                            <td style={{textAlign:"left"}}>
                                <div id="ErrorForAdhar" style={{color:"red"}}></div>        <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{columnSpan:2}}>
                            <button className="btn btn-info" onClick={submitPassenger}>Add</button>        <br></br><br></br>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                
                <button id="final" hidden={true} className="btn btn-info" onClick={finalSubmit}>Submit</button>

    </center>

}
export default AddPsgrDetails;