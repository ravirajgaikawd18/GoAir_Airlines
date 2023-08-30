
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import $ from "../../../node_modules/jquery/dist/jquery"

function PsgrList() {

    const [flights, setFlights] = useState([]);
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
        }

    const loadFlights = () => {

        setContent("");
        setMessage("");
        setFlights([]);

        var data = fetch("http://localhost:8080/admin/allflights",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            if(data.data != "empty schedule"){
            console.log("responce = "+ data.data)
            setFlights(data.data);
            setContent(<>
                <tr style={styles}>
                <th>Flight ID</th>
                <th>Flight No.</th>  
                <th>Source</th>  
                <th>Destination</th>  
                <th>TakeOff Time</th>
                <th>Landing Time</th>
                <th>Ticket Price (INR)</th>
                <th>Available seats</th>
                <th>Booked seats</th>
                <th>TakeOff Status</th>
                <th>Availability</th>
                <th>Action</th>
                </tr>
            </>);
                setMessage("");
            }else{
                setContent( <h2 style={{textAlign:"center", color:"tomato"}}>No flights scheduled</h2>)
            }
            
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
        
    }

    const submitPassengers = (para) => {

        setMessage("");

        sessionStorage.removeItem("flight");
        sessionStorage.setItem("flight", JSON.stringify(para));

        var data = fetch( "http://localhost:8080/admin/psgrlist/" + para.flightId,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data.result)
            if(Array.isArray(data.result)){
                sessionStorage.removeItem("psgrList");
                sessionStorage.setItem("psgrList", JSON.stringify(data.result));
                navigate("/allPsgrs");
               
            }
            else{
                setMessage(data.result);
            }
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
        
    }

return <center>
        <h2>See passengers list for a flight</h2>
        <button className="btn btn-info" onClick={loadFlights}>Load Flight Schedule</button>
        <br></br><br></br>
        <table className={["table table-success table-striped"]}>
          {content}
      
          {
              flights.map((flight) => {
                if(flight.landingStatus){
                    var status = "Not available";
                    
                    $(document).ready(function(){
                      $(`#${flight.flightId}`).css("background-color", "tomato");
                    });
                }
                else {
                    var status = "Available";
                    
                }
                if(flight.takeOffStatus)
                    var tstatus = "YES";
                else
                    var tstatus = "NO";
                {
                  return <tr id={flight.flightId} style={styles}>
                            <td>{flight.flightId}</td>
                            <td>{flight.flightNo}</td>
                            <td>{flight.source}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.takeOffTime}</td>
                            <td>{flight.landingTime}</td>
                            <td>{flight.price}</td>
                            <td>{flight.availableSeats}</td>
                            <td>{flight.bookedSeats}</td>
                            <td>{tstatus}</td>
                             
                            <td>{status}</td>
                            <td><button className="btn btn-warning" onClick={() => submitPassengers(flight)}>Passengers</button></td>
                          </tr>  
                }
              })
          }  
        </table>
            <h4 style={{color:"red"}}>{message}</h4>
     </center>
}
export default PsgrList;