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
  } else if (file) {
    //se o usuario tiver selecionado uma imagem para postar
    let reader = new FileReader(); //cria um leitor de arquivos
    reader.readAsDataURL(file); //le o arquivo
    reader.onload = function () {
      //quando o arquivo for lido
      let base64 = reader.result; //pega o resultado do arquivo
      let post = {
        id: posts.length + 1,
        contentText: textbox.value,
        file: base64,
        user: userLogado.name,
        date: new Date().toLocaleString(),
      };
      posts.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
      document.location.reload();
    };
  } else {
    //se o usuario nao tiver selecionado uma imagem para postar
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
  posts.map((poster) => {
    if (poster.file == null) {
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
    } else if (poster.file.includes("data:image/png;base64")) {
      feed.innerHTML += `  
      <div class="poster"> 
      <div class="header"> 
        <img src="imagens/profile.png" alt="" > 
        <div class="text"> 
          <p>${poster.user} <span>${poster.date}</span></p> 
          <p id="x"></p>
        </div> 
      </div> 
      <div class="content"> 
        <p>${poster.contentText}</p> 
        <img src="${poster.file}" alt="" >
        </div> 
  </div>`;
    } else if (
      poster.file.includes("data:video/mp4;base64")) {
      feed.innerHTML += `  
      <div class="poster"> 
      <div class="header"> 
        <img src="imagens/profile.png" alt="" > 
        <div class="text"> 
          <p>${poster.user} <span>${poster.date}</span></p> 
          <p id="position">São Paulo - SP</p>
        </div> 
      </div> 
      <div class="content"> 
        <p>${poster.contentText}</p> 
        <video controls>
           <source src="${poster.file}" type="video/mp4">
  
        </video>
        </div>
  </div>`;
    } else if (
      poster.file.includes("data:audio/mpeg")) {
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
        <audio controls>
          <source src="${poster.file}" type="audio/mpeg">
         </audio>
        </div>
  </div>`;
    }
  });
}



var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const gCanvas = document.querySelector('#drawing-board');
const toolbar = document.getElementById('toolbar');
const gCtx = gCanvas.getContext('2d');


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    }
});


function onMouseDown(e) {
    e.preventDefault();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
    e.preventDefault();
    gCtx.fillRect(e.offsetX - 4, e.offsetY - 4, 8, 8);
}

function onMouseUp(e) {
    e.preventDefault();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

}

function onSave() {
    gCanvas.toBlob((blob) => {
        const timestamp = Date.now().toString();
        const a = document.createElement('a');
        document.body.append(a);
        a.download = `export-${timestamp}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
        toolbar.style.display = 'none';
    });
}


gCanvas.addEventListener('mousedown', onMouseDown);
document.querySelector('#save').addEventListener('click', onSave);


textbox.addEventListener("keydown", autosize);
function autosize() {
  //autosize para o textbox
  var el = this;
  setTimeout(function () {
    el.style.cssText = "height:100; padding:0";
    el.style.cssText = "height:" + el.scrollHeight + "px";
  }, 0);
}

document.addEventListener("readystatechange", () => {
  if (document.readyState == "complete") {
    getPostData();
    Geolocation();
  }
});




function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userLogado");
  window.location.href = "/index.html";
}
