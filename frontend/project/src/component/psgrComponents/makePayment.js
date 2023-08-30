import { useState } from "react"
import { useNavigate } from "react-router-dom";
import $ from "../../../node_modules/jquery/dist/jquery"


function MakePayment(){
    
    const [ message, setMessage ] = useState("");
    const [user, setUser] = useState({email: "", otp: ""});
    var booking = JSON.parse(sessionStorage.getItem("booking"));
    const [ payment, setPayment ] = useState({email: user.email, cardNo: "", cvv: "", expiryDate: "", amount: booking.totalAmount, bookingNo: booking.bookingNo})
    const navigate = useNavigate();

    const changeHandler = (args) => {
        var copyOfUser = {...user};
        copyOfUser[args.target.id] = args.target.value;
        setUser(copyOfUser);
    }

    const handleChange = (para) => {
        var copyOfPayment = {...payment};
        copyOfPayment[para.target.id] = para.target.value;
        setPayment(copyOfPayment);
    }




    function SubmitPay(){
        debugger;
        setMessage("");
        
            var data = fetch("http://localhost:8080/psgr/makepayment", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payment)
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
        console.log("responce = "+ data.result);
        if(data.result == "payment failed"){
            setMessage("payment failed!");
        }
        else{
            setPayment(data.result);
            sessionStorage.removeItem("pmt");
            sessionStorage.setItem("pmt", JSON.stringify(data.result));
            navigate("/paymentStatus")
        }
        })
        .catch((error) => {
        console.log("error = " + error);
            setMessage("Failed!");
        })
        
    }

    function SubmitSend(){
        setMessage("");
        $(document).ready(function() {
            $("#email").prop("disabled", true);
        });
        var data = fetch("http://localhost:8080/email/sendemail", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({to: user.email, subject: "Regarding payment", message: "Use this otp to make payment"})
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
        console.log("responce = "+ data.response);
        if(data.response == "success"){
            setMessage("otp sent successfully!");
        }
        else
            setMessage(data.response);
        })
        .catch((error) => {
        console.log("error = " + error);
            setMessage("Failed!");
        })
    }

    function SubmitVerify(){
        setMessage("");
        var data = fetch("http://localhost:8080/users/verifyotp", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({otp: user.otp})
        }
        )
        .then((response) => {return response.json()})
        .then((data) => {
        console.log("responce = "+ data.message);
        if(data.message == "verified"){
            setMessage("otp verified successfully!");
            $(document).ready(function() {
                $("#btnPay").prop("hidden", false);
            });
        }
        else
            setMessage("Failed!");
        })
        .catch((error) => {
        console.log("error = " + error);
            setMessage("Failed!");
        })
    }

              return <center>   
                        <h1>Payment Gateway...</h1>
                        <hr></hr>
                        
                        <table> 
                          <tr>
                              <td>Card Number: </td>
                              <td>
                                <input type="number" 
                                  id="cardNo" 
                                  value={payment.cardNo} 
                                  required
                                  onChange={handleChange}></input>
                              </td>
                          </tr>
                          <tr>
                              <td>CVV Number: </td>
                              <td>
                                  <input type="number"
                                  id="cvv" 
                                  value={payment.cvv} 
                                  required
                                  onChange={handleChange}></input>
                              </td>
                          </tr>
                          <tr>
                              <td>Expiry_Date: </td>
                              <td>
                                  <input type="date" 
                                  id="expiryDate" 
                                  value={payment.expiryDate}
                                  required
                                  onChange={handleChange}></input>
                              </td>
                          </tr>
                          <tr>
                              <td>Amount</td>
                              <td>
                                  <input type="number" disabled
                                   id="amount"
                                   value={payment.amount} required
                                   ></input>
                              </td>
                          </tr>
                          <tr>
                              <td>Email: </td>
                              <td>
                                  <input text="email"
                                   id="email" 
                                   value={user.email}
                                   required
                                   onChange={changeHandler}></input>
                              </td>
                          </tr>
                          {/* <tr>
                              <td>Email pay: </td>
                              <td>
                                  <input text="email"
                                   id="email" 
                                   value={user.email}
                                   required
                                   onChange={handleChange}></input>
                              </td>
                          </tr> */}
                          <tr>
                            <td>Enter OTP: <br></br><br></br></td>
                            <td><input type={'text'} placeholder="otp"
                                        id="otp"
                                        value={user.otp}
                                        onChange={changeHandler}></input>   <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-secondary" onClick={() => {SubmitSend()}}>Send OTP</button> <br></br><br></br>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => {SubmitVerify()}}>Verify OTP</button> <br></br><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td style={{columnSpan:2}}>
                            <button id="btnPay" className="btn btn-info" onClick={SubmitPay} hidden >Make Payment</button>     <br></br><br></br>
                            </td>
                        </tr>
                      </table>
                      <div style={{color:"red"}}><h3>{message}</h3></div>
            </center>
}
export default MakePayment;