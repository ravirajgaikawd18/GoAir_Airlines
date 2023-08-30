function SetSessionStorage(key, value){

    sessionStorage.setItem(key, value);
}

function GetSessionStorage(key){

    return sessionStorage.getItem(key);
}

function IsUserLoggedIn(){

    var isUserSignedIn = GetSessionStorage("IsUserLoggedIn");
    if (isUserSignedIn != null) {
        return isUserSignedIn;
    } else {
        return false;
    }
}

function ClearStorage(){

    sessionStorage.removeItem("IsUserLoggedIn");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("token");
}

function UseAuthenticationHelper(){

    return {
        SetSessionStorage, GetSessionStorage, IsUserLoggedIn, ClearStorage
    };
}

// export default UseAuthenticationHelper;
export {SetSessionStorage,GetSessionStorage, ClearStorage, IsUserLoggedIn};