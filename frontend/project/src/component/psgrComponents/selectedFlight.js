import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SelectedFlight(){

    const navigate = useNavigate();
    const [flight, setFlight] = useState(JSON.parse(sessionStorage.getItem("selectedFlight")));
    const [message, setMessage] = useState("");

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
      }

    if(flight.landingStatus)
        var lstatus = "YES";
    else 
        var lstatus = "NO";
    if(flight.takeOffStatus)
        var tstatus = "YES";
    else
        var tstatus = "NO";

    const submitBookTickets = () => {
        navigate("/bookTickets");
    }

    const refreshPage = () => {
        var data = fetch("http://localhost:8080/admin/flight/" + flight.flightId,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
              console.log("responce = "+ data)
              setFlight(data);
              sessionStorage.removeItem("selectedFlight");
              sessionStorage.setItem("selectedFlight", JSON.stringify(flight));
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
    }

    return <center>
        <h1>Flight Deatils</h1>
        <br></br>
        <table className={["table table-success table-striped"]}>
            <tbody>
                <tr style={styles}>
                    <td>Flight No</td>
                    <td>{flight.flightNo}</td>
                </tr>
                <tr style={styles}>
                    <td>Source</td>
                    <td>{flight.source}</td>
                </tr>
                <tr style={styles}>
                    <td>Destination</td>
                    <td>{flight.destination}</td>
                </tr>
                <tr style={styles}>
                    <td>Travel Date</td>
                    <td>{flight.travelDate}</td>
                </tr>
                <tr style={styles}>
                    <td>Arrival Time</td>
                    <td>{flight.arrivalTime}</td>
                </tr>
                <tr style={styles}>
                    <td>TakeOff Time</td>
                    <td>{flight.takeOffTime}</td>
                </tr>
                <tr style={styles}>
                    <td>Landing Time</td>
                    <td>{flight.landingTime}</td>
                </tr>
                <tr style={styles}>
                    <td>Price of Ticket</td>
                    <td>{flight.price}</td>
                </tr>
                <tr style={styles}>
                    <td>Available Seats</td>
                    <td>{flight.availableSeats}</td>
                </tr>
                <tr style={styles}>
                    <td>Booked Seats</td>
                    <td>{flight.bookedSeats}</td>
                </tr>
                <tr style={styles}>
                    <td>TakeOff Status</td>
                    <td>{tstatus}</td>
                </tr>
                <tr style={styles}>
                    <td>Landing Status</td>
                    <td>{lstatus}</td>
                </tr>
                <tr style={styles}>
                <td><button className="btn btn-info" onClick={() => submitBookTickets(flight)}>Book Tickets</button></td>
                <td><button className="btn btn-info" onClick={refreshPage}>Refresh</button></td>
                </tr>
            </tbody>
        </table>

    </center>

}
export default SelectedFlight;