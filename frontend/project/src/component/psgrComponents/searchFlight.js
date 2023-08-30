import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "../../../node_modules/jquery/dist/jquery"

function SearchFlight(){

    const [flight, setFlight] = useState({source: "", destination: "", travelDate: ""});
    const [flights, setFlights] = useState([]);
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
    }

    const handleChange=(args)=>{
        var copyOfFlight = {...flight};
        copyOfFlight[args.target.id] = args.target.value;
        setFlight(copyOfFlight);
    }

    const submitSearch = () => {

        setFlights([]);
        setMessage("");
        setContent("");

        console.log(new Date());

        if(new Date(flight.travelDate).getTime() < new Date().getTime()){
            setMessage("You can not search for date in past");
        } else {

            var data = fetch( "http://localhost:8080/psgr/searchflight",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(flight),
            }
            )
            .then((response) => {return response.json()})
            .then((data) => {
                console.log("responce = "+ data.result)
                if(Array.isArray(data.result)){
                    setFlights(data.result);
                    setContent(<>
                        <tr style={styles}>
                          <th>Flight No.</th>  
                          <th>Source</th>  
                          <th>Destination</th>  
                          <th>Arrival Time</th>
                          <th>TakeOff Time</th>
                          <th>Landing Time</th>
                          <th>Availability</th>
                          <th>Action</th>
                        </tr>
                      </>);
                } else
                    setMessage(data.result + " available for your search");
            })
            .catch((error) => {
                console.log("error = " + error);
                setMessage("Failed");
            })
        }
    }

    const submitDetails = (para) => {
        sessionStorage.removeItem("selectedFlight");
        sessionStorage.setItem("selectedFlight", JSON.stringify(para));
        navigate("/selectedFlight");
    }

    return <center>
        <h3>Search flight for Traveling date, Source and Destination...</h3>
        <hr></hr>
            <table className={["table-responsive"]}>
                <tbody>
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
                        <td colSpan={2} style={{textAlign:"center"}}>
                            <button onClick={submitSearch} className="btn btn-info">Search</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className={["table table-success table-striped"]}>
              {content}
          
              {
                  flights.map((flight) => {
                      if(flight.landingStatus){
                        var status = "Not available";
                        $(document).ready(function(){
                            $(`#${flight.flightId}`).css("background-color", "tomato");
                            $(`#btn${flight.flightId}`).prop('disabled', true);
  
                          });
                      }
                      else
                        var status = "Available";
                    {
                      return <tr id={flight.flightId} style={styles}>
                                <td>{flight.flightNo}</td>
                                <td>{flight.source}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.arrivalTime}</td>
                                <td>{flight.takeOffTime}</td>
                                <td>{flight.landingTime}</td> 
                                <td>{status}</td>
                                <td><button className="btn btn-warning" onClick={() => submitDetails(flight)} id={"btn"+flight.flightId}>Details</button></td>
                              </tr>  
                    }
                  })
              }  
            </table>
            <div style={{color:"red", textAlign:"center"}}>{message}</div>
    </center>
}
export default SearchFlight;