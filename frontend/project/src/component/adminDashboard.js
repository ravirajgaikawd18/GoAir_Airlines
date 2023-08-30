import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminDashboard(){

    const navigate = useNavigate();

    return <center>
        <h1>Admin Dashboard...</h1> <br></br><br></br>
        <h2 style={{color:"blueviolet", marginLeft:-300}}>Actions: </h2>
        <div style={{marginLeft: 200}}>
            <br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/addFlight")}>Add flight in shedule</button>  <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/removeFlight")}>Remove flight from shedule</button>     <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/flightSchedule")}>See flight schedule</button>     <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/updateFlight")}>Update flight details</button>      <br></br><br></br>
            <button className="btn btn-secondary" onClick={() => navigate("/psgrList")}>See passengers of flight</button>      <br></br><br></br>
        </div>
        
    </center>

}
export default AdminDashboard;