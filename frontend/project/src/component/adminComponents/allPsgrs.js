import { useState } from "react";

function AllPsgrs() {

    const [passengers, setPassengers] = useState(JSON.parse(sessionStorage.getItem("psgrList")));
    const [ticket, setTicket] = useState({});
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const [flight, setFlight] = useState(JSON.parse(sessionStorage.getItem("flight")))

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
        }

    const submitSee = (para) => {
        setMessage("");
        var data = fetch( "http://localhost:8080/psgr/ticket/" + para,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data);
            setTicket(data);
            setContent(<>
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
            </>);
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Failed");
        })
    }

    return <center>
            <h1>This is passengers list, you can see ticket of passenger</h1>
            <br></br><br></br>
            <table className={["table table-success table-striped"]}>
                <tr style={styles}>
                  <th>First Name</th>  
                  <th>Last Name</th>  
                  <th>Middle Name</th>  
                  <th>Gender</th>
                  <th>DOB Time</th>
                  <th>Phone</th>
                  <th>Adhar</th>
                  <th>Ticket No.</th>
                  <th>Action</th>
                </tr>
            
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
                                    <td><button className="btn btn-info" onClick={() => submitSee(psgr.ticketNo)}>See Ticket</button></td>
                                </tr>  
                        }
                    })
                } 
            </table>
            {content}
            <h1 style={{color:"red"}}>{message}</h1>
    </center>
}
export default AllPsgrs;