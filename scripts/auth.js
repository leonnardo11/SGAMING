


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

  if (pw.value.length < 6) {
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
      id: user.length + 1, //adiciona um id ao usuario
      name: name.value, //adiciona o nome do usuario
      email: email.value, //adiciona o email do usuario
      password: pw.value, //adiciona a senha do usuario
      cpf: cpf.value, //adiciona o cpf do usuario
      telephone: tel.value, //adiciona o telefone do usuario
    }); 

    localStorage.setItem("user", JSON.stringify(user)); //salva o array de usuarios no localStorage
    Swal.fire({
      title: 'Sucesso!',
      text: 'Usuario cadastrado com sucesso. Por favor, faça login com o email e senha que você escolheu.',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(() => {
      window.location = "/index.html";
  });
  }
}
function login() {
  let email = document.querySelector("#email");
  let pw = document.querySelector("#password");

  let user = []; //cria um array vazio para armazenar os usuarios do localStorage

  let userValid = { //cria um objeto com os dados do usuario validado para ser salvo no localStorage
    id: 0, //adiciona um id ao usuario validado para ser salvo no localStorage
    name: "", //adiciona o nome do usuario validado para ser salvo no localStorage
    email: "", //adiciona o email do usuario validado para ser salvo no localStorage
    pw: "", //adiciona a senha do usuario validado para ser salvo no localStorage
  };

  user = JSON.parse(localStorage.getItem("user")); //pega o array de usuarios do localStorage e se não existir cria um novo array vazio para o usuario logar no sistema
  user.forEach((item) => { //percorre o array de usuarios do localStorage e verifica se o email e senha digitados pelo usuario são iguais aos do localStorage
    if (email.value == item.email && pw.value == item.password) { //verifica se o email e a senha são iguais aos dos usuarios cadastrados no localStorage e armazena os dados do usuario validado no objeto userValid
      userValid = {
        id: item.id,
        name: item.name,
        email: item.email,
        pw: item.password,
      };
    }
  });

  if (email.value == "" && pw.value == "") { //verifica se o email e a senha estão vazios e retorna um alerta
    Swal.fire({
      title: 'Error!',
      text: 'Você precisa inserir um email e senha.',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  } else {//se não estiverem vazios entra no if abaixo
    if (email.value == userValid.email && pw.value == userValid.pw) { //verifica se o email e a senha são iguais aos dos usuarios cadastrados no localStorage e armazena os dados do usuario validado no objeto userValid
      window.location.href = "/feed.html"; //se o usuario estiver correto redireciona para a pagina de feed
      let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); //gera um token aleatorio
      sessionStorage.setItem("token", token); //salva o token no sessionStorage
      sessionStorage.setItem("userLogado", JSON.stringify(userValid)); //salva o usuario logado no sessionStorage como um objeto
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
