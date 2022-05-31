if (sessionStorage.getItem("token") == null) {
  Swal.fire({
    title: "Error!",
    text: "Você precisa estar logado para acessar esta página.",
    icon: "error",
    confirmButtonText: "Ok",
  }).then(function () {
    window.location = "index.html";
  });
}

let userLogado = JSON.parse(sessionStorage.getItem("userLogado"));
const HTML = document.getElementById("user");
HTML.innerHTML = `Oi ${userLogado.name}`;
function postData() {
  let textbox = document.getElementById("textbox");
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let file = document.getElementById("arquivo").files[0];
  if (textbox.value.match(/^\s+$/) !== null || textbox.value <= 0) {
    Swal.fire({
      title: "Error!",
      text: "Você precisa digitar algo para postar.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (file) { //se o usuario tiver selecionado uma imagem para postar 
    let reader = new FileReader(); //cria um leitor de arquivos
    reader.readAsDataURL(file); //le o arquivo
    reader.onload = function () { //quando o arquivo for lido
      let base64 = reader.result; //pega o resultado do arquivo
      let post = {
        id: posts.length + 1,
        contentText: textbox.value,
        image: base64,
        user: userLogado.name,
        date: new Date().toLocaleString(),
      };
      posts.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
      document.location.reload();
    };
  } else { //se o usuario nao tiver selecionado uma imagem para postar
    let post = {
      id: posts.length + 1,
      contentText: textbox.value,
      user: userLogado.name,
      date: new Date().toLocaleString(),
    };
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    document.location.reload();
  }
}


function getPostData() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let feed = document.getElementById("feed");
  posts.map(poster => {
    if (poster.image) {
      feed.innerHTML += `  
      <div class="poster"> 
      <div class="header"> 
        <img src="imagens/profile.png" alt="" > 
        <div class="text"> 
          <p>${poster.user} <span>${poster.date}</span></p> 
          <p>São Paulo - SP</p>
        </div> 
      </div> 
      <div class="content"> 
        <p>${poster.contentText}</p> 
        <img src="${poster.image}" alt=""> 
      </div> 
  </div>`;
    } else {
      feed.innerHTML += `  
      <div class="poster"> 
      <div class="header"> 
        <img src="imagens/profile.png" alt="" > 
        <div class="text"> 
          <p>${poster.user} <span>${poster.date}</span></p> 
          <p>São Paulo - SP</p>
        </div> 
      </div> 
      <div class="content"> 
        <p>${poster.contentText}</p> 
      </div> 
  </div>`;
    }
  });
}

document.addEventListener("readystatechange", () => {
  if (document.readyState == "complete") getPostData();
});

textbox.addEventListener("keydown", autosize);
function autosize() {
  //autosize para o textbox
  var el = this;
  setTimeout(function () {
    el.style.cssText = "height:100; padding:0";
    el.style.cssText = "height:" + el.scrollHeight + "px";
  }, 0);
}

function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userLogado");
  window.location.href = "/index.html";
}
