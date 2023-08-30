
function GetDateTime(){

    var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        if(month < 10)
            month = "0" + month;
        var day =  today.getDate();
        if(day < 10)
            day = "0" + day;
        var date = year + '-' + month + '-' + day;
        
        var hh = today.getHours();
        if(hh < 10)
            hh = "0" + hh;
        var mm = today.getMinutes();
        if(mm < 10)
            mm = "0" + mm;
        var ss = today.getSeconds();
        if(ss < 10)
            ss = "0" + ss;
        var time = hh + ':' + mm + ':' + ss;
        var dateTime = date + "T" + time;

        return dateTime;
}
export default GetDateTime;