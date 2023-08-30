import {useEffect, useState} from "react";

function RemoveFlight() {

    const [flights, setFlights] = useState([]);
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");

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

    const submitRemove = (para) => {
        var data = fetch( "http://localhost:8080/admin/removeflight/" + para,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data.message)
            if(data.message == "flight removed"){
                setMessage(data.message);
            }
            else
                setMessage("Failed");
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
        
    }

return <center>
        <h2>Remove Flight From Schedule</h2>
        <button className="btn btn-info" onClick={loadFlights}>Load Flight Schedule</button>
        <br></br><br></br>
        <table className={["table table-success table-striped"]}>
          {content}
      
          {
              flights.map((flight) => {
                if(flight.landingStatus){
                    var status = "Not available";
                    
                    // $(document).ready(function(){
                    //   $("#{flight.flightId}").css("background-color", "tomato");
                    // });
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
                            <td><button className="btn btn-warning" onClick={() => submitRemove(flight.flightId)}>Remove</button></td>
                          </tr>  
                }
              })
          }  
        </table>
            <h4 style={{color:"red"}}>{message}</h4>
     </center>
}
export default RemoveFlight;