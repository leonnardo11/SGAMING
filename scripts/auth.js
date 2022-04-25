function register() {
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var pw = document.getElementById("password");
  var pw2 = document.getElementById("confirm-pass");
  var cpf = document.getElementById("cpf");
  var tel = document.getElementById("telephone");
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  if (email.value.length == 0) {
    alert("Por favor insira um email");
  } else if (pw.value.length == 0) {
    alert("Por favor insira uma senha");
  } else if (pw.value.length == 0 && email.value.length == 0) {
    alert("Por favor insira um email e uma senha");
  } else if (cpf.value.length == 0) {
    alert("Por favor insira um CPF");
  } else if (tel.value.length == 0) {
    alert("Por favor insira um telefone");
  } else if (pw.value.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres");
  } else if (pw.value != pw2.value) {
    //verifica se as senhas são iguais
    alert("As senhas não são iguais");
    console.log("Senhas não iguais");
  } else if (!pw.value.match(numbers)) {
    alert("A Senha precisa ter um numero");
  } else if (!pw.value.match(upperCaseLetters)) {
    alert("A Senha precisa ter uma letra maiuscula");
  } else {
    localStorage.setItem("name", name.value);
    localStorage.setItem("pw", pw.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("cpf", cpf.value);
    localStorage.setItem("telephone", tel.value);
    Swal.fire("Bem Vindo!", "Sua conta foi criada com sucesso!", "success");
  }
}

//checking
function login() {
  var storedEmail = localStorage.getItem("email");
  var storedPw = localStorage.getItem("pw");
  var userEmail = document.getElementById("email");
  var userPw = document.getElementById("password");

  if (userEmail.value == storedEmail && userPw.value == storedPw) {
    Swal.fire("Sucessoo!", "Usuário logado", "success");
  } else {
    Swal.fire("Erro!", "Usuário ou senha incorretos.", "error");
  }
}
