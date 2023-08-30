import { useNavigate } from "react-router-dom";


function PaymentStatus() {

    const navigate = useNavigate();

    var pmt = JSON.parse(sessionStorage.getItem("pmt"));

    const print = () => {
        alert("Print tickets");
    }

    const submitHome = () => {
        navigate("/home");
    }

    return <center>
        <h1 style={{color:"green"}}>Payment Successful!</h1>
        <table style={{width:700}} className={["table table-success table-striped"]}>
            <tbody>
                <tr>
                    <td>Transaction ID: </td>
                    <td>{pmt.txId}</td>
                </tr>
                <tr>
                    <td>Transaction Date</td>
                    <td>{pmt.txDateTime}</td>
                </tr>
                <tr>
                    <td>Booking No.</td>
                    <td>{pmt.bookingNo}</td>
                </tr>
                <tr>
                    <td colSpan={4}>You can Print or Download Tickets here</td>
                </tr>
               
            </tbody>
        </table>
            <button id="btnPrint" className="btn btn-info" onClick={print} >Print Tickets</button>
             <h4></h4>       
            <button className="btn btn-info" onClick={submitHome} >Go to Home Page</button>
                    
    </center>

}
export default PaymentStatus;