
export function isLoggedIn(){
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.open("GET",process.env.VUE_APP_BACKEND+"test/user", false);
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.send();
    if(xhttp.readyState == 4){
        if(xhttp.status == 200){
            return true;

        }else{
            return false;
        }
    }
}