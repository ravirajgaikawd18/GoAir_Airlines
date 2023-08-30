// import UseAuthenticationHelper from "../hooks/useAuthenticationHelper";
import { IsUserLoggedIn } from "../hooks/useAuthenticationHelper";
import "../assets/head.css"
import { useNavigate } from "react-router-dom";

function Header(props){

    // const {IsUserLoggedIn} = UseAuthenticationHelper;
    const navigate = useNavigate();

    const showLogout = () => {
        var loginStatus = IsUserLoggedIn();
        if (loginStatus) {
            return <button className="btn btn-warning" onClick={props.signOut}>Logout</button>
        } else{
            return <button className="btn btn-success" onClick={() => {navigate("/login")}}>Login</button>
        }
    }
    return <table className="width100" >
        <tbody>
            <tr style={{backgroundColor:"white"}}>
                <td><img alt="ARS-logo" src="./images/logo.png" className="logoStyle"></img></td>
                <td style={{textAlign:"center", color:"black"}}><h4>GoAir</h4></td>
                {/* <h3 style={{textAlign:"center"}}>BookYourTicket</h3> */}
                 <td><div style={{width:300}}></div></td> 
                <td><div style={{width:300}}></div></td>
                <td style={{textAlign:"center", width:"100"}}>{showLogout()}</td>
                <td style={{textAlign:"center", color:"black"}}><h3>Welcome {props.userName}</h3></td>
            </tr>
        </tbody>
    </table>

}

export default Header;