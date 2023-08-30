import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Register from "./register";


function AddSubadmin(){

    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    // const [status, setStatus] = useState("");
    const [subadmins, setSubadmins] = useState([]);
    const navigate = useNavigate();

    const styles = {
        border: '1px solid rgb(100, 100, 100)', 
      }

    var renderForm = () => {
        var role = sessionStorage.getItem("role");
        if(role == "ADMIN"){
            navigate("/register");
        }
        else{
            setMessage("You don't have authority to Add Subadmin!");
        }
    }

    var renderAdminDashboard = () => {
        var role = sessionStorage.getItem("role");
        if(role == "ADMIN" || role == "SUBADMIN"){
            navigate("/adminDashboard");
        }
        else{
            setMessage("You don't have authority to see Admin Dashboard!");
        }
    }

    const seeSubadmins = () => {
        debugger;
        var jwt = "Bearer " + sessionStorage.getItem("token");
        console.log("jwt = " + jwt);
        var data = fetch("http://localhost:8080/users/getsubadmins",
            {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": jwt, "Access-Control-Allow-Origin": "*"},
            }
        )
        .then((response) => {return response.json()})
        .then((data) => {
            console.log("responce = "+ data[0].isActive);
            if(data != []){
              setSubadmins(data);
              setContent(<>
                <tr style={styles}>
                  <th>First name</th>  
                  <th>Last name</th>  
                  <th>Phone</th>  
                  <th>Adhar</th>
                  <th>Created Time</th>
                  <th>Is Active</th>
                </tr>
              </>);
            }else{
              setContent( <h2 style={{textAlign:"center", color:"tomato"}}>No Subadmins...</h2>)
            }
            
        })
        .catch((error) => {
            console.log("error = " + error);
            console.log("subadmins = " + subadmins);
            setMessage(error);
        })
    }
     

    return <center>
        <h2 style={{color:"green", marginLeft:-300}}>Actions: </h2>
        <br></br>
        <button onClick={renderForm} className="btn btn-secondary">Add Subadmin</button>
        <br></br>
        <br></br>
        <button onClick={renderAdminDashboard} className="btn btn-secondary">Admin Dashboard</button>
        <br></br>
        <br></br>
        <button onClick={seeSubadmins} className="btn btn-secondary">See Subadmins</button>
        <br></br>
        <br></br>
        <table className={["table table-success table-striped"]}>
              {content}
          
              {
                  subadmins.map((subadmin) => {
                        if(subadmin.isActive)
                            var status = "Yes";
                        else
                            var status = "No";
                    {
                      return <tr id={subadmin.userId} style={styles}>
                                <td>{subadmin.firstName}</td>
                                <td>{subadmin.lastName}</td>
                                <td>{subadmin.phone}</td>
                                <td>{subadmin.adhar}</td>
                                <td>{subadmin.createdTime}</td>
                                <td>{status}</td> 
                              </tr>  
                    }
                  })
              }  
        </table>
        <div style={{color: "red"}}>{message}</div>
    </center>
}
export default AddSubadmin;