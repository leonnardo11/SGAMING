if (sessionStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "/login.html";
}

let userLogado = JSON.parse(sessionStorage.getItem("userLogado"));
const HTML = document.getElementById('user') 
HTML.innerHTML = `Oi ${userLogado.name}`

function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userLogado");
  window.location.href = "/login.html";
}

function postData() {
  let textbox = document.getElementById("textbox");
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push({
    contentText: textbox.value,
    user: userLogado.name,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  document.location.reload();
}

function getPostData() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let feed = document.getElementById("feed");
  posts.map((item) => {
    feed.innerHTML += `  
    <div class="poster"> 
    <div class="header"> 
      <img src="imagens/profile.png" alt="" > 
      <div class="text"> 
        <p>${item.user}</p> 
        <p>São Paulo - SP</p> 
      </div> 
    </div> 
    <div class="content"> 
      <p>${item.contentText}</p> 
      <img src="" alt=""> 
    </div> 
</div>`;
  });
}

document.addEventListener("readystatechange", () => {
  if (document.readyState == "complete") getPostData();
});
