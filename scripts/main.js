function showUserInformation(){
    var storedEmail = localStorage.getItem("email");
    var storedPw = localStorage.getItem("pw");
    console.log(storedEmail + " " + storedPw);
}