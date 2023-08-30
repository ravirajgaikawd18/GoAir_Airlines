import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function UpdateFlightCont() {

    const navigate = useNavigate();
    const [flight, setFlight] = useState(JSON.parse(sessionStorage.getItem("toUpdateFlight")));
    const [message, setMessage] = useState("");

    if(flight.landingStatus){
        var lstatus = true;
        var lmsg = "YES";
    }
    else {
        var lstatus = false;
        var lmsg = "NO"
    }

    if(flight.takeOffStatus){
        var tstatus = true;
        var tmsg = "YES";
    }
    else {
        var tstatus = false;
        var tmsg = "NO";
    }

    const handleChange=(args)=>{
        var copyOfFlight = {...flight};
        copyOfFlight[args.target.id] = args.target.value;
        setFlight(copyOfFlight);
    }

    const submitUpdate = () => {

        setMessage("");

        sessionStorage.removeItem("toUpdateFlight");

        var data = fetch( "http://localhost:8080/admin/updateflight",
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(flight),
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data.message)
            if(data.message == "flight updated"){
                setMessage(data.message + "; you will be auto redirected to flight schedule page!");
                setTimeout(() => navigate("/flightSchedule"), 3000);
            } else
                setMessage("Failed");
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
    }

    return <div>
        <center>
        <h1>Update Flight Details</h1>
        <hr></hr>
            <table className={["table-responsive"]}>
                <tbody>
                <tr>
                        <td style={{textAlign:"left"}}>Flight_ID: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"number"} disabled
                                    id="flightId"
                                    value={flight.flightId}
                                    onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Flight_No: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"text"} required
                                    id="flightNo"
                                    value={flight.flightNo}
                                    onChange={handleChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td style={{textAlign:"left"}}>Source: </td>
                        <td style={{textAlign:"left"}}>
                            <select id="source" value={flight.source} onChange={handleChange}>
                                <option value={flight.source} selected>{flight.source}</option>
                                <option value="MUMBAI">MUMBAI</option>
                                <option value="CHENNAI">CHENNAI</option>
                                <option value="DELHI">DELHI</option>
                                <option value="KOLKATA">KOLKATA</option>
                                <option value="GOA">GOA</option>
                                <option value="PUNE">PUNE</option>
                                <option value="JAIPUR">JAIPUR</option>
                                <option value="COCHIN">COCHIN</option>
                                <option value="BANGLORE">BANGLORE</option>
                                <option value="AHMADABAD">AHMADABAD</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Destination: </td>
                        <td style={{textAlign:"left"}}>
                        <select id="destination" value={flight.destination} onChange={handleChange}>
                                <option value={flight.destination} selected>{flight.destination}</option>
                                <option value="MUMBAI">MUMBAI</option>
                                <option value="CHENNAI">CHENNAI</option>
                                <option value="DELHI">DELHI</option>
                                <option value="KOLKATA">KOLKATA</option>
                                <option value="GOA">GOA</option>
                                <option value="PUNE">PUNE</option>
                                <option value="JAIPUR">JAIPUR</option>
                                <option value="COCHIN">COCHIN</option>
                                <option value="BANGLORE">BANGLORE</option>
                                <option value="AHMADABAD">AHMADABAD</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Travel_Date: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"date"}
                                    id="travelDate"
                                    value={flight.travelDate}
                                    onChange={handleChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td style={{textAlign:"left"}}>Arrival_Time: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"datetime-local"}
                                    id="arrivalTime"
                                    value={flight.arrivalTime}
                                    onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>TakeOff_Time: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"datetime-local"}
                                    id="takeOffTime"
                                    value={flight.takeOffTime}
                                    onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Landing_Time: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"datetime-local"}
                                    id="landingTime"
                                    value={flight.landingTime}
                                    onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Price: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"number"}
                                id="price"
                                value={flight.price}
                                onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Available_Seats: </td>
                        <td style={{textAlign:"left"}}>
                            <input type={"number"}
                                id="availableSeats"
                                value={flight.availableSeats}
                                onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>TakeOff Status: </td>
                        <td style={{textAlign:"left"}}>
                            <select id="takeOffStatus" value={flight.takeOffStatus} onChange={handleChange}>
                                    <option value={tstatus} selected>{tmsg}</option>
                                    <option value={true}>YES</option>
                                    <option value={false}>NO</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"left"}}>Landing Status: </td>
                        <td style={{textAlign:"left"}}>
                            <select id="landingStatus" value={flight.landingStatus} onChange={handleChange}>
                                    <option value={lstatus} selected>{lmsg}</option>
                                    <option value={true}>YES</option>
                                    <option value={false}>NO</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign:"center"}}>
                            <button onClick={submitUpdate} className="btn btn-info">Update</button>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        <hr></hr>
        <h4 style={{color:"red"}}>{message}</h4>
        </center>
                
    </div>
}
export default UpdateFlightCont;