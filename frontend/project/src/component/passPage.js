import { useNavigate } from "react-router-dom";


function PassPage(){
    
    const navigate = useNavigate();
    
    return <center>
        <h1>This page is for passangers...</h1>
        <br></br>
        <h2 style={{color:"blueviolet", marginLeft:-300}}>Actions: </h2>
        <div style={{marginLeft: 200}}>
            <br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/searchFlight")}>Search flight</button>  <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/flightSchedule")}>See flight schedule</button>     <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/logout")}>Go to logout page</button>     <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/myBookings")}>My Bookings</button>     <br></br><br></br>
        </div>
    </center>
}
export default PassPage;