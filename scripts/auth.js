


function formatar(mascara, documento) {
  var i = documento.value.length;
  var saida = mascara.substring(0, 1);
  var texto = mascara.substring(i);

  if (texto.substring(0, 1) != saida) {
    documento.value += texto.substring(0, 1);
  }
}

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
    Swal.fire({
      title: 'Error!',
      text: 'Você precisa inserir um email válido.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (pw.value.length == 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Você precisa inserir uma senha válida.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (pw.value.length == 0 && email.value.length == 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Você precisa inserir um email e senha válidos.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (cpf.value.length == 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Você precisa inserir um cpf.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (pw.value.length < 6) {
    Swal.fire({
      title: 'Error!',
      text: 'Sua senha deve conter no mínimo 6 caracteres.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (pw.value != pw2.value) {
    //verifica se as senhas são iguais
    Swal.fire({
      title: 'Error!',
      text: 'As senhas não conferem.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (!pw.value.match(numbers)) {
    Swal.fire({
      title: 'Error!',
      text: 'Sua senha deve conter números.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else if (!pw.value.match(upperCaseLetters)) {
    Swal.fire({
      title: 'Error!',
      text: 'Sua senha deve conter letras maiúsculas.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else {
    let user = JSON.parse(localStorage.getItem("user")) || []; //pega o array de usuarios do localStorage e se não existir cria um novo array vazio para o usuario logar no sistema
    user.push({
      name: name.value,
      email: email.value,
      password: pw.value,
      cpf: cpf.value,
      telephone: tel.value,
    }); 

    localStorage.setItem("user", JSON.stringify(user)); //salva o array de usuarios no localStorage
    Swal.fire({
      title: 'Sucesso!',
      text: 'Usuario cadastrado com sucesso. Por favor, faça login com o email e senha que você escolheu.',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(() => {
      window.location = "/login.html";
  });
  }
}
function login() {
  let email = document.querySelector("#email");
  let pw = document.querySelector("#password");

  let user = []; //

  let userValid = {
    name: "",
    email: "",
    pw: "",
  };

  user = JSON.parse(localStorage.getItem("user"));
  user.forEach((item) => {
    if (email.value == item.email && pw.value == item.password) {
      //verifica se o email e a senha são iguais aos dos usuarios cadastrados
      userValid = {
        name: item.name,
        email: item.email,
        pw: item.password,
      };
    }
  });

  if (email.value == "" && pw.value == "") {
    //verifica se o email e a senha estão vazios
    Swal.fire({
      title: 'Error!',
      text: 'Você precisa inserir um email e senha.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else {
    //se não estiverem vazios entra no if abaixo
    if (email.value == userValid.email && pw.value == userValid.pw) {
      //verifica se o email e a senha são iguais aos dos usuarios cadastrados
      window.location.href = "/index.html";

      let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); //gera um token aleatorio
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userLogado", JSON.stringify(userValid)); //salva o usuario logado no sessionStorage
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Email ou senha incorretos.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }
}
