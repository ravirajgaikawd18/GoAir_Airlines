import { useState } from "react";
import axios from "axios";
// import "../../assets/td-left.css"

function AddFlight() {   
    

    const [message, setMessage] = useState("");
    const [flight, setFlight] = useState({
                                            flightNo: "", source: "", destination: "", travelDate: "",
                                             arrivalTime: "", takeOffTime: "",
                                              landingTime: "", price: 0, availableSeats: 0,
                                               bookedSeats: 0, takeOffStatus: false, landingStatus: false
                                        });
   

    const handleChange=(args)=>{
            var copyOfFlight = {...flight};
            copyOfFlight[args.target.id] = args.target.value;
            setFlight(copyOfFlight);
    }

   
    const submitFlight = () => {
            
        setMessage("");

        console.log("flight = " +flight);
        if(flight.source != flight.destination){
            axios
                .post("http://localhost:8080/admin/addflight", flight)
                .then((response) => {
                    console.log("response = " + response);
                    setMessage("Flight added successfully!")
                })
                .catch((err) => {
                    console.log("error = " + err);
                    setMessage("Failed!")
                });
        }else
            setMessage("Source and destinationcan not be same");
    }

    const clearBoxes = () => {
        window.location.reload(false);
    }
    return <div>
                <center>
                <h1>Add flight in shedule</h1>
                <hr></hr>
                    <table className={["table-responsive"]}>
                        <tbody>
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
                                        <option value="" selected>select</option>
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
                                       <option value="" selected>select</option>
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
                                <td style={{textAlign:"center"}}><br></br>
                                    <button onClick={submitFlight} className="btn btn-info">Add Flight</button>
                                </td>   
                               <td>     <br></br>
                                <button onClick={clearBoxes} className="btn btn-info">Clear boxes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <hr></hr>
                <h4 style={{color:"red"}}>{message}</h4>
                </center>
                        
           </div>

}

export default AddFlight;