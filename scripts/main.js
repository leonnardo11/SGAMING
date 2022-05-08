let userLogado = JSON.parse(sessionStorage.getItem('userLogado')) 
console.log(userLogado)
console.log(userLogado.name)

const HTML = document.getElementById('user') 
HTML.innerHTML = `Oi ${userLogado.name} `



if(sessionStorage.getItem('token') == null){
  alert('Você precisa estar logado para acessar essa página')
  window.location.href = 'https://cdpn.io/thicode/debug/ZELzYxV/nqkwvzJowRxA'
}

function sair(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userLogado')
  window.location.href = 'https://cdpn.io/thicode/debug/ZELzYxV/nqkwvzJowRxA'
}