if (sessionStorage.getItem("token") == null) {
  console.log("nao logado");
  Swal.fire({
    title: "Error!",
    text: "Você precisa estar logado para acessar esta página.",
    icon: "error",
    confirmButtonText: "Ok",
  }).then(function () {
    window.location = "login.html";
  });
}

let userLogado = JSON.parse(sessionStorage.getItem("userLogado"));
const HTML = document.getElementById("user");
HTML.innerHTML = `Oi ${userLogado.name}`;

function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userLogado");
  window.location.href = "/login.html";
}

function getCoordintes() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();
    var coordinates = [lat, lng];
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    getCity(coordinates);
    return;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
  var xhr = new XMLHttpRequest();
  var lat = coordinates[0];
  var lng = coordinates[1];

  xhr.open("GET","https://us1.locationiq.com/v1/reverse.php?key=pk.0b50784068cccef9942478a63e0682fc&lat=" +lat +"&lon=" +lng +"&format=json", true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var city = response.address.city;
      console.log(city);
      return city;
    }
  }
}



function postData() {
  let textbox = document.getElementById("textbox");
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  if(textbox.value.match(/^\s+$/) !== null || textbox.value <= 0){ //verifica se é um espaço em branco ou não e se é menor ou igual a 0 para não permitir postar vazio
    Swal.fire({ 
      title: "Error!",
      text: "Você precisa digitar algo para postar.",
      icon: "error",
      confirmButtonText: "Ok",
    })
  }else{ //se não for um espaço em branco 
  posts.push({
    contentText: textbox.value,
    user: userLogado.name,
    getUserLocation: getCoordintes(),
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  document.location.reload();
}

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
        <p>${item.user} <span>${item.date}</span></p> 
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

textbox.addEventListener('keydown', autosize); 
function autosize(){ //autosize para o textbox
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:100; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}