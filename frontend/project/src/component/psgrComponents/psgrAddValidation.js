

function PsgrAddValidation() {

    var isFirstNameEmpty = CheckEmpty("pfirstName", "ErrorForFirstName", "First name is required");
    var isLastNameEmpty = CheckEmpty("plastName", "ErrorForLastName", "Last name is required");
    var isMiddleNameEmpty = CheckEmpty("pmiddleName", "ErrorForMiddleName", "Middle name is required");
    var isGenderEmpty = CheckEmpty("gender", "ErrorForGender", "Gender is required");
    var isDOBEmpty = CheckEmpty("dob", "ErrorForDob", "Date Of Birth is required");
    // if(isDOBEmpty == false){
    //     var isDateInPast = IsDateInPast("dob", "ErrorForDob", "DOB must be in past")
    // }else
    //     var isDateInPast = false;
    var isPhoneEmpty = CheckEmpty("phone", "ErrorForPhone", "phone is required");
    if(isPhoneEmpty == false){
            var expectedLength = 10;
            var isPhoneLengthOk = CheckLength("phone", "ErrorForPhone", "10 digits required", expectedLength);
    }else
    var isPhoneLengthOk = false;
    var isAdharEmpty = CheckEmpty("adhar", "ErrorForAdhar", "");
    if(isAdharEmpty == true)
        isAdharLengthOk = true;
    if(isAdharEmpty == false){
            var expectedLength = 12;
            var isAdharLengthOk = CheckLength("adhar", "ErrorForAdhar", "12 digits required", expectedLength);
    }

    console.log(isFirstNameEmpty);
    console.log(isLastNameEmpty);
    console.log(isMiddleNameEmpty);
    console.log(isGenderEmpty);
    console.log(isDOBEmpty);
    console.log(isPhoneLengthOk);
    console.log(isAdharLengthOk);
    if(isPhoneLengthOk && isAdharLengthOk){
        if(!( isMiddleNameEmpty || isFirstNameEmpty || isLastNameEmpty || isDOBEmpty || isGenderEmpty))
            return true;
        else
            return false;
    } else {
        return false;
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

    // function IsDateInPast(id, ErrorDivId, ErrorMessage){
    //     // debugger;
    //     var isInPast = false;
    //     var refToControl = document.getElementById(id);
    //     var refToErrorDiv = document.getElementById(ErrorDivId);
    
    //     if ((refToControl.value).getTime() < new Date().getTime()) {
    //         isInPast = true;
    //         refToErrorDiv.innerText = "";
    //     } else {
    //         isInPast = false;
    //         refToErrorDiv.innerText = ErrorMessage;
    //     }
    //     return isInPast;
    // }
}
export default PsgrAddValidation;