import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReviewTickets() {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    var flight = JSON.parse(sessionStorage.getItem("selectedFlight"));
    var booking = JSON.parse(sessionStorage.getItem("booking"));
    var tickets = JSON.parse(sessionStorage.getItem("tickets"));


    const execBtn = () => {
        navigate("/makePayment");
    }

    return <center>
        <h1>See tickets...</h1>
        {
            tickets.map(ticket => {
                {
                    return <>
                        <table style={{width:700}} className={["table table-success table-striped"]}>
                            <tbody>
                            <tr>
                                <td colSpan={2}><h3>Boarding Pass</h3></td>
                                <td colSpan={2}><h3>Garuda Airlines</h3></td>
                            </tr>
                            <tr>
                                <td>Ticket No.</td>
                                <td>{ticket.ticketNo}</td>
                                <td>Booking No.</td>
                                <td>{booking.bookingNo}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{flight.travelDate}</td>
                                <td>Boarding Time</td>
                                <td>{flight.arrivalTime}</td>
                            </tr>
                            <tr>
                                <td>Origin</td>
                                <td>{flight.source}</td>
                                <td>Destination</td>
                                <td>{flight.destination}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Check in before 30 min of flight boarding time</td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                }
            })
        }
        <button className="btn btn-info" onClick={execBtn}>Go to payment</button>
        <hr></hr>
    
        <h4>{message}</h4> 
    </center>
}
export default ReviewTickets;