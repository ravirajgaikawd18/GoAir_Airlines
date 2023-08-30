import axios from "axios";
import {useState,useEfrect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/head.css"
import $ from "../../../node_modules/jquery/dist/jquery"

function FlightSchedule() { 

    const [flights, setFlights] = useState([]);
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const styles = {
      border: '1px solid rgb(100, 100, 100)', 
    }

    const loadFlights = () => {
        
        // axios
        //     .post("http://localhost:8080/admin/allflights")
        //     .then((response) => {
        //         console.log("response = " + response)
        //         setFlights(response);
        //     })
        //     .catch((err) => {
        //         console.log("error = " + err);
        //         setMessage("Failed!")
        //     });

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
            }else{
              setContent( <h2 style={{textAlign:"center", color:"tomato"}}>No flights scheduled</h2>)
            }
            
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage(error);
        })
        
    }

    const submitDetails = (para) => {
      sessionStorage.removeItem("selectedFlight");
      sessionStorage.setItem("selectedFlight", JSON.stringify(para));
      navigate("/selectedFlight");
    }

   return <center>
            <h2>Flight_Schedule</h2>
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
                <h1 style={{color:"red"}}>{message}</h1>
         </center>
} 
export default FlightSchedule;