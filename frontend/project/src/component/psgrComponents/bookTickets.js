import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  $ from "../../../node_modules/jquery/dist/jquery"


function BookTickets(){

    //1. ask to enter no. of tickets
    //2. on confirm check availability of seats in flight in db and store new flight in session storage
    //3. if yes -- send request with param as no. of tickets to master method which performs == 
            //1. add booking in db with total amount and save persistent booking in map as booking
            //2. check availability of seats for no of tickets in persistent flight
            //      success -- 1. availableSeats-- and bookedSeats++ 
            //                  2. create no. of tickets; include booking in them and add them in db
            //                  3. return list of persistent tickets
            //      failure -- return null     
            //4. on failure remove booking from db and return map with messages; show booking failure on screeen
            //3. on success return map containing booking and tickets; save booking and tickets in session storage
            //7. ask for no. of passenger details include ticket from session storage and send list
            //8. ask for payment-- on success -- make booking's payStatus = true, isvalid = true, 
                                            // make tickets isvalid = true.
                            //-- on failure --  availableSeats++ and bookedSeats-- for no of inserted tickets
                                            
    

    const [tNos, setTNos] = useState(0);
    const [amount, setAmount] = useState(0);
    const [flight, setFlight] = useState(JSON.parse(sessionStorage.getItem("selectedFlight")));
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [message, setMessage] = useState("");
   
    const navigate = useNavigate();
    
    const handleTNos=(pr)=>{
        setTNos(pr.target.value);
    }

    useEffect(() => {
        var amt = tNos * flight.price;
        setAmount(amt);
    },[tNos]);

    const submitConfirm = () => {

        if (tNos > 0) {
            $(document).ready(function(){
                $(`#tNos`).prop('disabled', true);
                $(`#btnConfirm`).prop('disabled', true);
    
              });
            setMessage("");
    
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
                  if( flight.availableSeats >= tNos){
                    addBooking();
                  } else {
                    setMessage(tNos + " seats are not available in this flight.");
                  }
                  
            })
            .catch((error) => {
                console.log("error = " + error);
                setMessage("Failed (Ensure that you have signed in)");
            })
        } else {
            setMessage("You have to book atleast one ticket...")
        }
    }

    const addBooking = () => {
        setMessage("");
        var tranBooking = {totalAmount: amount, flightId: flight.flightId, userId: user.userId}

        var data = fetch( "http://localhost:8080/psgr/addbooking/" + tNos,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tranBooking),
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data)
            if(data.booking == "no booking" || data.tickets == "no tickets"){
                setMessage("Booking failed");
            } else{
                sessionStorage.removeItem("booking");
                sessionStorage.setItem("booking", JSON.stringify(data.booking));
                sessionStorage.removeItem("tickets");
                sessionStorage.setItem("tickets", JSON.stringify(data.tickets));
                sessionStorage.removeItem("tnos");
                sessionStorage.setItem("tnos", tNos);
                navigate("/addPsgrDetails");
                
            }
                
        })
        .catch((error) => {
            console.log("error = " + error);
            setMessage("Booking Failed");
        })
    }

    return <center>
        <h1>Ticket Booking...</h1>
        <div>Enter number of tickets you want to book:  <input type={"number"} required min={1} max={flight.availableSeats}
                                                                id="tNos"
                                                                value={tNos}
                                                                onChange={handleTNos}/>
            <h6>Total amount to pay = {amount}</h6> 
            <button className="btn btn-info" onClick={submitConfirm} id="btnConfirm">Confirm</button>
            <h4 style={{color:"red"}}>{message}</h4>
        </div>
        
    </center>
}
export default BookTickets;