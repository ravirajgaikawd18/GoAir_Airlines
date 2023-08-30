function UpdateProfileValidation(){
    var isUserNameEmpty = CheckEmpty("username", "ErrorForUserName", "Username is required");
    if(isUserNameEmpty == false){
        // var isNameChar = CheckChar("NameBox", "ErrorForNameDiv", "Numbers not allowed")
        // if(isNameChar == true){
            var expectedLength = 6;
            var isUserNameLengthOk = CheckLength("username", "ErrorForUserName", "Min 6 chars required", expectedLength);
            // if(isNameLengthOk == true)
    }
    var isEmailEmpty = CheckEmpty("email", "ErrorForEmail", "email is required");
    // if(isEmailEmpty == false){
    //     var isEmailValid = ValidateEmail("email", "ErrorForEmail", "Invalid email format");
    // }
    var isFirstNameEmpty = CheckEmpty("firstName", "ErrorForFirstName", "Firstname is required");
    var isLastNameEmpty = CheckEmpty("lastName", "ErrorForLastName", "Lastname is required");
    var isPhoneEmpty = CheckEmpty("phone", "ErrorForPhone", "phone is required");
    if(isPhoneEmpty == false){
            var expectedLength = 10;
            var isPhoneLengthOk = CheckLength("phone", "ErrorForPhone", "10 digits required", expectedLength);
    }
    var isAdharEmpty = CheckEmpty("adhar", "ErrorForAdhar", "");
    if(isAdharEmpty == true)
        isAdharLengthOk = true;
    if(isAdharEmpty == false){
            var expectedLength = 12;
            var isAdharLengthOk = CheckLength("adhar", "ErrorForAdhar", "12 digits required", expectedLength);
    }
    
    // var isAddressEmpty = CheckEmpty("AddressBox", "ErrorForAddressDiv", "Address is required");
    // if(isAddressEmpty == false){
    //     var isAddressChar = CheckChar("AddressBox", "ErrorForAddressDiv", "Numbers not allowed")
    //     if(isAddressChar == true){
    //         var expectedLength = 20;
    //         var isAddressLengthOk = CheckLength("AddressBox", "ErrorForAddressDiv", "Min 20 chars required", expectedLength)
    //         // if(isAddressLengthOk == true)
    //     }
    // }
    // var isAgeEmpty = CheckEmpty("AgeBox", "ErrorForAgeDiv", "Age is required");
    // if(isAgeEmpty == false){
    //     var isAgeNumber = CheckNumber("AgeBox", "ErrorForAgeDiv", "Only numbers allowed");
    //     if(isAgeNumber == true){
    //         var min = 1;
    //         var max = 100
    //         var isAgeLimitOk = CheckLimit("AgeBox", "ErrorForAgeDiv", 
    //                                         "Enter Age between 1 to 100", min, max);
    //         // if(isAgeLimitOk == true)
    //     }
    // }

    console.log(isUserNameLengthOk);
    console.log(isEmailEmpty);
    console.log(isFirstNameEmpty);
    console.log(isLastNameEmpty);
    console.log(isPhoneLengthOk);
    console.log(isAdharLengthOk);
    if(isUserNameLengthOk && isPhoneLengthOk && isAdharLengthOk){
        if(!( isEmailEmpty || isFirstNameEmpty || isLastNameEmpty))
            return true;
        else
            return false;
    } else {
        return false;
    }
}

function ValidateEmail(id, ErrorDivId, ErrorMessage) 
{
    var isEmailOk = false;
    var refToControl = document.getElementById(id);
    var refToErrorDiv = document.getElementById(ErrorDivId);
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(refToControl.value))
    {
        isEmailOk = true;
        refToErrorDiv.innerText = ErrorMessage;
    } else{
        isEmailOk = false;
        refToErrorDiv.innerText = "";
    }
    return isEmailOk;
}

function CheckEmpty(id, ErrorDivId, ErrorMessage){
    // debugger;
    var isEmpty = true;
    var refToControl = document.getElementById(id);
    var refToErrorDiv = document.getElementById(ErrorDivId);

    if (refToControl.value == "") {
        isEmpty = true;
        refToErrorDiv.innerText = ErrorMessage;
    } else {
        isEmpty = false;
        refToErrorDiv.innerText = "";
    }
    return isEmpty;
}
function CheckChar(id, ErrorDivId, ErrorMessage){
    var isChar = false;
    var refToControl = document.getElementById(id);
    var refToErrorDiv = document.getElementById(ErrorDivId);
    isChar = isNaN(refToControl.value)
    if (isChar == true) {
        
        refToErrorDiv.innerText = "";
    } else {
        
        refToErrorDiv.innerText = ErrorMessage;
    }
    return isChar;
}
function CheckLength(id, ErrorDivId, ErrorMessage, expectedLength){
    var isLengthOk = false;
    var refToControl = document.getElementById(id);
    var refToErrorDiv = document.getElementById(ErrorDivId);
    var strLength = refToControl.value.length;
    if (strLength >= expectedLength) {
        isLengthOk = true;
        refToErrorDiv.innerText = "";
    } else {
        isLengthOk = false;
        refToErrorDiv.innerText = ErrorMessage;
    }
    return isLengthOk;
}
function CheckNumber(id, ErrorDivId, ErrorMessage){
    var isAgeNumber = false;
    var refToControl = document.getElementById(id);
    var refToErrorDiv = document.getElementById(ErrorDivId);
    var isAgeNotNumber = isNaN(refToControl.value);
    isAgeNumber = !isAgeNotNumber;
    if (isAgeNumber == true) {
        
        refToErrorDiv.innerText = "";
    } else {
        
        refToErrorDiv.innerText = ErrorMessage;
    }
    return isAgeNumber;
}
function CheckLimit(id, ErrorDivId, ErrorMessage, min, max){
    var isAgeLimitOk = false;
    var refToControl = document.getElementById(id);
    var refToErrorDiv = document.getElementById(ErrorDivId);
    if(refToControl.value >= min && refToControl.value <= max){
        refToErrorDiv.innerText = "";
        isAgeLimitOk = true;
    }
    else{
        refToErrorDiv.innerText = ErrorMessage;
        isAgeLimitOk = false;
    }
    return isAgeLimitOk;
}

export default UpdateProfileValidation;