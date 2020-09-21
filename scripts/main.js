const contadorRegressivo = document.querySelector(".contador");

let valorTotal = 0;
let arrayTopFilmes = [];
let arrayFilmes = [];
let arrayFiltrado = [];
let itemsDoCarrinho = [];

popularArrays();

propaganda.addEventListener("click", () => {
  inputDesconto.value = "HTMLNAOELINGUAGEM";
  let container = propaganda.parentNode;
  container.removeChild(propaganda);
  clearInterval(contadorRegressivoInterval);
  localStorage.setItem("desconto", "HTMLNAOELINGUAGEM");
  let spanValor = document.querySelector(".somatorioTotal");
  if (spanValor) {
    spanValor.innerText = valorTotalDaCompra * 0.9;
  }
});

btnFiltrar.forEach((element) => {
  element.addEventListener("click", () => {
    filtrarFilme(element.value);
    btnFiltrar.forEach((element) => {
      element.setAttribute("class", "categoria");
    });
    element.setAttribute("class", "categoria ativo");
  });
});

popularBagComLocalStorage();

let contador = 59;
let minutos = 9;
let contadorRegressivoInterval = setInterval(() => {
  let mostrador = contadorRegressivo.querySelector("h3");

  if (contador < 10) {
    mostrador.innerText = `00:0${minutos}:0${contador}`;
  } else {
    mostrador.innerText = `00:0${minutos}:${contador}`;
  }
  if (minutos == 0 && contador == 0) {
    document.querySelector(".imagem-promocao").remove();
    clearInterval(contadorRegressivoInterval);
  }
  if (contador == 0) {
    contador = 59;
    minutos--;
  }
  contador--;
}, 1000);
