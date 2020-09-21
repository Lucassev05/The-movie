atualizarLocalStorage = (idFilme, novo = 0) => {
  let itensDaSacola = localStorage.getItem("itensDaSacola");
  let arrayDaSacola = JSON.parse(itensDaSacola);
  let index = null;

  let elemento = null;

  if (arrayDaSacola) {
    arrayDaSacola.forEach((element, i) => {
      if (idFilme == element.idFilme) {
        elemento = element;
        index = i;
      }
    });
  }

  if (novo == 0) {
    if (arrayDaSacola == null) {
      arrayDaSacola = [];
    }
    item = {
      nomeFilme: elemento.title,
      valorFilme: elemento.price,
      imagemFilme: elemento.poster_path,
      idFilme: elemento.id,
      qtd: 1,
    };
    arrayDaSacola.push(item);
    localStorage.setItem("itensDaSacola", JSON.stringify(arrayDaSacola));
  } else if (novo == 1) {
    item = {
      nomeFilme: arrayDaSacola[index].nomeFilme,
      valorFilme: arrayDaSacola[index].valorFilme,
      imagemFilme: arrayDaSacola[index].imagemFilme,
      idFilme: arrayDaSacola[index].idFilme,
      qtd: arrayDaSacola[index].qtd + 1,
    };
    arrayDaSacola.splice(index, 1, item);
    localStorage.setItem("itensDaSacola", JSON.stringify(arrayDaSacola));
  } else if (novo == 2) {
    item = {
      nomeFilme: arrayDaSacola[index].nomeFilme,
      valorFilme: arrayDaSacola[index].valorFilme,
      imagemFilme: arrayDaSacola[index].imagemFilme,
      idFilme: arrayDaSacola[index].idFilme,
      qtd: arrayDaSacola[index].qtd - 1,
    };
    if (item.qtd == 0) {
      arrayDaSacola.splice(index, 1);
    } else {
      arrayDaSacola.splice(index, 1, item);
    }
    localStorage.setItem("itensDaSacola", JSON.stringify(arrayDaSacola));
  }
  if (arrayDaSacola.length == 0) {
    localStorage.clear();
    let inputDaPagina = document.querySelector(".cupom-input > input");
    inputDaPagina.value = localStorage.getItem("desconto");
    let spanValor = document.querySelector(".somatorioTotal");
  }
  atualizarSubtotal();
};

const criarSubtotal = () => {
  let elementSubtotal = document.createElement("div");
  let subtotal = document.createElement("h3");
  let valorSubtotal = document.createElement("h3");
  let spanTotal = document.createElement("span");

  spanTotal.setAttribute("class", "subtotal-value");
  elementSubtotal.setAttribute("class", "subtotal");

  subtotal.innerText = "Subtotal";
  valorSubtotal.innerText = "R$ ";

  valorSubtotal.append(spanTotal);

  elementSubtotal.append(subtotal);
  elementSubtotal.append(valorSubtotal);

  let divCupom = document.querySelector(".sacola .cupom");
  divCupom.insertAdjacentElement("beforebegin", elementSubtotal);
  atualizarSubtotal();
};

const atualizarSubtotal = (criar = 0) => {
  if (criar == 0) {
    let subtotalValue = document.querySelector(".subtotal-value");
    let arrayDaSacola = JSON.parse(localStorage.getItem("itensDaSacola"));
    let valorTotal = 0;
    if (arrayDaSacola) {
      arrayDaSacola.forEach((element) => {
        valorTotal += element.valorFilme * element.qtd;
      });
    }
    if (valorTotal <= 0) {
      document.querySelector(".subtotal").remove();
    }
    subtotalValue.innerText = valorTotal;
  }
};

const atualizarBotaoComprar = () => {
  const botaoComprar = document.querySelector(".btn-precoTotal");
  const textoComprar = document.querySelector(".btn-precoTotal .texto-botao");
  textoComprar.innerText = "Comprar Agora";
  botaoComprar.setAttribute("form", "formulario");
};

if (localStorage.hasOwnProperty("itensDaSacola")) {
  criarSubtotal();
  popularBagComLocalStorage();
  atualizarBotaoComprar();

  const btnPrecoTotal = document.querySelector(".btn-precoTotal");

  if (btnPrecoTotal) {
    btnPrecoTotal.removeEventListener("click", eventListernerBotaoComprar);
  }

  let form = document.querySelector("form");
  inputs = form.querySelectorAll('[type="text"]');
  let botaoComprar = document.querySelector(".btn-precoTotal");
  botaoComprar.disabled = true;

  for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", () => {
      let values = [];
      inputs.forEach((v) => values.push(v.value));
      botaoComprar.disabled = values.includes("");
    });
  }
}

if (localStorage.hasOwnProperty("desconto")) {
  let inputDaPagina = document.querySelector(".cupom-input > input");
  inputDaPagina.value = localStorage.getItem("desconto");
  let spanValor = document.querySelector(".somatorioTotal");
  if (spanValor) {
    spanValor.innerText = valorTotalDaCompra * 0.9;
  }
}
