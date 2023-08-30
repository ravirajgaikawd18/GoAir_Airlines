
// async function SubmitLogin(props){
//     debugger;
//     // var xhr = new XMLHttpRequest();
//     // xhr.onreadystatechange = () =>{
//     //     console.log("readystate = " + xhr.readyState)
//     //     console.log("status = " + xhr.status)

//     //     if(xhr.readyState == 4 && xhr.status == 200){
//     //         debugger;
//     //         var responce = JSON.parse(xhr.responseText);
//     //         console.log("responce =" + responce);
//     //         return responce;
//     //     }
        
//     // }

//     // xhr.open("POST", "http://localhost:8080/users/login")

//     // var dataToBeSend = {userName: props.uName, password: props.pswd};
//     // console.log("dataToBeSend = " + dataToBeSend);
//     // xhr.send(dataToBeSend);

//     var dataToBeSend = {userName: props.uName, password: props.pswd};
//     console.log("dataToBeSend = " + dataToBeSend);

//     var data = await fetch("http://localhost:8080/users/login",
//         {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(dataToBeSend)
//         }
//     )
//     .then((responce) => {return responce.json()})
//     .then((data) => {
//         console.log("responce = "+ data.userName)
//         return data;
//     })
//     .catch((error) => {
//         console.log("error = " + error);
//         return error;
//     })

// }

// async function GetResponse(props){
//     debugger;
//     var data = await SubmitLogin(props);
//     console.log("data = " + data.userName);
//     return data;
// }

// export default GetResponse;