import { popularBagComLocalStorage } from "./main";
const conteudoSacola = document.querySelector(".conteudo-sacola");
const inputPesquisarFilme = document.querySelector(".input > input");
const btnPesquisar = document.querySelector(".input > img");
const btnFavoritos = document.querySelector(".favoritos");
const btnPromocoes = document.querySelector(".promocoes");
const inputDesconto = document.querySelector(".cupom-input > input");
const btnAplicarDesconto = document.querySelector(".cupom-input > img");
const sacola = document.querySelector(".sacola");

popularBagComLocalStorage();
