import { useState } from "react";
import { useNavigate } from "react-router-dom";


function MyBookings() {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const [bookings, setBookings] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [flight, setFlight] = useState({});

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
      }

    const submitBooking = () => {
        setMessage("");
        var uid = sessionStorage.getItem("user_id");

        var data = fetch( "http://localhost:8080/psgr/bookings/" + uid,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data);
            if(Array.isArray(data) && data.length > 0){
                setBookings(data);
                sessionStorage.removeItem("bks");
                sessionStorage.setItem("bks", JSON.stringify(data));
                
                setContent(<>
                        <tr style={styles}>
                            <th>Booking No</th>  
                            <th>Booking Time</th>  
                            <th>Total Amount</th>
                            <th>Flight ID</th>
                            <th>Action</th>
                        </tr>
                </>);
            } else if(Array.isArray(data))
                setMessage("You don't have any booking")
            else
                setMessage("Failed")
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
    }

    const getFlight = (fid) => {
        setMessage("");

        var data = fetch( "http://localhost:8080/admin/flight/" + fid,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data);
            if(data != undefined)
                setFlight(data);
            else
                setMessage("Failed")
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
    }

    const submitSeeTickets = (para) => {
        setMessage("");
        getFlight(para.flightId);
        var data = fetch( "http://localhost:8080/psgr/seetickets",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(para),
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data.result);
            if(data.result == "no tickets")
                setMessage("No tickets");
            else {
                setTickets(data.result);
            }
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
    }


    return <center>
        <h1>You can see your booking here</h1>
        <br></br>
        <button className="btn btn-secondary" onClick={submitBooking}>Load Bookings</button>     <br></br><br></br>
        <br></br>
        <table className={["table table-success table-striped"]}>
                {content}
            
                {
                    bookings.map((bk) => {
                        
                        {
                        return <tr id={bk.bookingNo} style={styles}>
                                    <td>{bk.bookingNo}</td>
                                    <td>{bk.bookingTime}</td>
                                    <td>{bk.totalAmount}</td>
                                    <td>{bk.flightId}</td>
                                    <td><button className="btn btn-warning" onClick={() => submitSeeTickets(bk)}>See Tickets</button></td>
                                </tr>  
                        }
                    })
                }  
        </table>

        {
            tickets.map(ticket => {
                {
                    return <>
                        <table style={{width:700}} className={["table table-success table-striped"]}>
                            <tbody>
                            <tr>
                                <td colSpan={2}><h3>Boarding Pass</h3></td>
                                <td colSpan={2}><h3>GoAir Airlines</h3></td>
                            </tr>
                            <tr>
                                <td>Ticket No.</td>
                                <td>{ticket.ticketNo}</td>
                                <td>Booking No.</td>
                                <td>{ticket.bookingNo}</td>
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
                        <br></br>
                    </>
                }
            })
        }

        <h1 style={{color:"red"}}>{message}</h1>
    </center>

}
export default MyBookings;