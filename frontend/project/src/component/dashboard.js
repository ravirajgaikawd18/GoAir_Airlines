import Header from "./header";
import { Route, Link, useNavigate, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import $ from "../../node_modules/jquery/dist/jquery"
// import UseAuthenticationHelper from "../hooks/useAuthenticationHelper";
import {SetSessionStorage, GetSessionStorage, IsUserLoggedIn, ClearStorage} from "../hooks/useAuthenticationHelper";
import Home from "./home";
import NotFound from "./notFound";
import Footer from "./footer";
import Login from "./login";
import PassPage from "./passPage";
import Register from "./register";
import Logout from "./logout";
import AddSubadmin from "./addSubadmin";
import AdminDashboard from "./adminDashboard";
import "../assets/head.css"
import "../assets/td-center.css"
import About from "./about";
import Contact from "./contact";
import ResetPassword from "./reset-password";
import ProtectedRoute from "./protectedRoute";
import AddFlight from "./adminComponents/addFlight";
import FlightSchedule from "./adminComponents/flightSchedule";
import RemoveFlight from "./adminComponents/removeFlight";
import UpdateFlight from "./adminComponents/updateFlight";
import UpdateFlightCont from "./adminComponents/updateFlightCont";
import SearchFlight from "./psgrComponents/searchFlight";
import SelectedFlight from "./psgrComponents/selectedFlight";
import BookTickets from "./psgrComponents/bookTickets";
import AddPsgrDetails from "./psgrComponents/addPsgrDetails";
import UpdateProfile from "./updateProfile";
import ReviewTickets from "./psgrComponents/reviewTickets";
import MakePayment from "./psgrComponents/makePayment";
import PaymentStatus from "./psgrComponents/paymentStatus";
import PsgrList from "./adminComponents/psgrList";
import AllPsgrs from "./adminComponents/allPsgrs";
import MyBookings from "./psgrComponents/myBookings";

function Dashboard(){

  const [userName, setUserName] = useState("Guest");
//   const {SetSessionStorage, GetSessionStorage, IsUserLoggedIn, ClearStorage} = UseAuthenticationHelper;
  const navigate = useNavigate();

  useEffect(() => {
      if(IsUserLoggedIn()){
        setUserName(GetSessionStorage("name"));
      } else{
        setUserName("Guest");
      }
  }, [userName]);

  const signIn = (credentials, onInvalidLoginCallback) => {
    //if credentials are valid
    //call SetUsername.... so that header can show username
    debugger;
    if (credentials.user != undefined) {
      SetSessionStorage("IsUserLoggedIn", true);
      SetSessionStorage("user", JSON.stringify(credentials.user));  // JASON.parse() -- after extracting from sessionStorage use
      SetSessionStorage("userName", credentials.user.username);
      SetSessionStorage("role", credentials.user.role);
      SetSessionStorage("name", credentials.user.firstName + " " + credentials.user.lastName);
      SetSessionStorage("user_id", credentials.user.userId);
      SetSessionStorage("token", credentials.token);
      setUserName(credentials.user.firstName + " " + credentials.user.lastName);         //so that header can change
      console.log("name = " + credentials.user.firstName)
      var role = credentials.user.role;
      if(role == "ADMIN")
        navigate("/addSubadmin");
      else if(role == "SUBADMIN")
        navigate("/adminDashboard");
      else
        navigate("/passPage");
    } else {
      onInvalidLoginCallback();
    }
  }

  const signOut = () => {
    navigate("/logout");
  }

  return <div>
    <table className={["width100", "table-responsive"]}>
      <tbody>
      <tr>
        <td colSpan={3}>
            <Header userName = {userName} signOut = {signOut}></Header>
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
          <table className="width100">
            <tr style={{backgroundColor:"white",color:"black"}}>
              <td><Link to={"/home"}><h5>Home</h5></Link></td>
              <td><Link to={"/about"}><h5>About Us</h5></Link></td>
              <td><Link to={"/contact"}><h5>Contact Us</h5></Link></td>
              <td><Link to={"/login"}><h5>Login</h5></Link></td>
              <td><Link to={"/register"}><h5>Register</h5></Link></td>
              <td></td>
              <br></br><br></br>
            </tr>
          </table>
        </td>
      </tr>
      <tr className="height01">
        <td style={{backgroundColor:"white",color:"black"}}>
          <table style={{width:150}}>
            
            <tr>
              <td style={{color:"black"}}><Link to={"/flightSchedule"}><h5>See Flight Schedule</h5></Link></td>   <br></br><br></br><br></br>
            </tr>
            <tr>
              <td><Link to={"/searchFlight"}><h5>Search Flight</h5></Link></td>   <br></br><br></br><br></br>
            </tr>

            <tr>
              <td><Link to={"/updateProfile"}><h5>Update Profile</h5></Link></td>   <br></br><br></br><br></br>
            </tr>
            <tr>
              <td><Link to={"/passPage"}><h5>Passenger Dashboard</h5></Link></td>   <br></br><br></br><br></br>
            </tr>
            <tr>
              <td><Link to={"/secure"}><h5>Admin page</h5></Link></td>   <br></br><br></br><br></br>
            </tr>
            <tr>
              <td><Link to={"/secure"}><h5>SubAdmin Dashboard</h5></Link></td>   <br></br><br></br><br></br>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
        </td>
        <td className="width100" style={{backgroundColor:"white",}}>
          <Routes>
              <Route exact path = "/" element = {<Home></Home>}></Route>
              <Route exact path={"/home"} element = {<Home></Home>}></Route>
              <Route exact path={"/about"} element = {<About></About>}></Route>
              <Route exact path={"/contact"} element = {<Contact></Contact>}></Route>
              <Route exact path = {"/login"} element = {<Login signIn={signIn}></Login>}></Route>
              <Route exact path={"/register"} element = {<Register></Register>}></Route>
              <Route exact path={"/reset-password"} element = {<ResetPassword></ResetPassword>}></Route>


              <Route exact path = {"/secure"} element = {<ProtectedRoute signIn={signIn}></ProtectedRoute>}></Route>

              <Route exact path = {"/logout"} element = {<Logout  setUserName = {setUserName}></Logout>}></Route>
              <Route exact path={"/adminDashboard"} element = {<AdminDashboard></AdminDashboard>}></Route>
              <Route exact path={"/addSubadmin"} element = {<AddSubadmin></AddSubadmin>}></Route>
              <Route exact path={"/addSubadmin/adminDashboard"} element = {<AdminDashboard></AdminDashboard>}></Route>
              <Route exact path={"/passPage"} element = {<PassPage></PassPage>}></Route>
              <Route exact path = "*" element = {<NotFound></NotFound>}></Route>

              <Route exact path={"/addFlight"} element = {<AddFlight></AddFlight>}></Route>
              <Route exact path={"/flightSchedule"} element = {<FlightSchedule></FlightSchedule>}></Route>
              <Route exact path={"/removeFlight"} element = {<RemoveFlight></RemoveFlight>}></Route>
              <Route exact path={"/updateFlight"} element = {<UpdateFlight></UpdateFlight>}></Route>
              <Route exact path={"/updateFlightCont"} element = {<UpdateFlightCont></UpdateFlightCont>}></Route>
              <Route exact path={"/searchFlight"} element = {<SearchFlight></SearchFlight>}></Route>
              <Route exact path={"/selectedFlight"} element = {<SelectedFlight></SelectedFlight>}></Route>
              <Route exact path={"/bookTickets"} element = {<BookTickets></BookTickets>}></Route>
              <Route exact path={"/addPsgrDetails"} element = {<AddPsgrDetails></AddPsgrDetails>}></Route>
              <Route exact path={"/updateProfile"} element = {<UpdateProfile></UpdateProfile>}></Route>
              <Route exact path={"/reviewTickets"} element = {<ReviewTickets></ReviewTickets>}></Route>
              <Route exact path={"/makePayment"} element = {<MakePayment></MakePayment>}></Route>
              <Route exact path={"/paymentStatus"} element = {<PaymentStatus></PaymentStatus>}></Route>
              <Route exact path={"/psgrList"} element = {<PsgrList></PsgrList>}></Route>
              <Route exact path={"/allPsgrs"} element = {<AllPsgrs></AllPsgrs>}></Route>
              <Route exact path={"/myBookings"} element = {<MyBookings></MyBookings>}></Route>
          </Routes>
        </td>
        {/* <td style={{backgroundColor:"LightGray"}}>
          <img alt="Advertisement" src="./images/cdac-ad.jpg"></img>
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
        <Footer></Footer>
        </td> */}
      </tr>
      </tbody>
    </table>
  </div>
    
}
export default Dashboard;