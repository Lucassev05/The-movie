const conteudoSacola = document.querySelector(".conteudo-sacola");
const inputPesquisarFilme = document.querySelector(".input > input");
const btnPesquisar = document.querySelector(".input > img");
const btnFavoritos = document.querySelector(".favoritos");
const btnPromocoes = document.querySelector(".promocoes");
const inputDesconto = document.querySelector(".cupom-input > input");
const btnAplicarDesconto = document.querySelector(".cupom-input > img");
const propaganda = document.querySelector(".imagem-promocao");
const divTopFilmes = document.querySelector(".top-filmes");
const divlistaFilmes = document.querySelector(".todos-filmes");
let btnAddSacola = "";
const btnMarcarFavorito = document.querySelectorAll(
  ".card-filme .favorito > img"
);
const btnFiltrar = document.querySelectorAll(".categoria");
const sacola = document.querySelector(".sacola");
let valorTotal = 0;

let arrayTopFilmes = [];
let arrayFilmes = [];
let arrayFiltrado = [];
let itemsDoCarrinho = [];

const addEventBtnSacola = (inicio = true) => {
  btnAddSacola = document.querySelectorAll(".btn-adicionar");
  if (inicio) {
    btnAddSacola.forEach((element) => {
      element.addEventListener("click", () => {
        let idDaLi = element.value;
        adicionNaSacola(idDaLi);
      });
    });
  } else {
    for (let i = 5; i < 25; i++) {
      btnAddSacola[i].addEventListener("click", () => {
        let idDaLi = btnAddSacola[i].value;
        adicionNaSacola(idDaLi);
      });
    }
  }
};

const popularArrays = () => {
  fetch(
    "https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR"
  )
    .then((resposta) => resposta.json())
    .then((resposta) => {
      arrayTopFilmes = resposta.results.slice(0, 5);
      arrayFilmes = resposta.results.slice(5, 20);

      fetch(
        "https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR&page=2"
      )
        .then((resposta) => resposta.json())
        .then((resposta) => {
          let i = 0;
          while (arrayFilmes.length != 20) {
            arrayFilmes.push(resposta.results[i]);
            i++;
          }
          popularFilmes(divlistaFilmes, arrayFilmes);
          addEventBtnSacola();
        });
      popularFilmes(divTopFilmes, arrayTopFilmes);
    });
};

popularArrays();

const popularFilmes = (elementoPai, array) => {
  let listaHtml = document.createElement("ul");
  listaHtml.setAttribute("class", "lista-filmes");
  array.forEach((element) => {
    nomeFilme = element.title;
    pontuacaoFilme = element.vote_average;
    valor = element.price;
    imagem = element.poster_path;
    idElemento = element.id;
    li = gerarElementoLista(
      nomeFilme,
      pontuacaoFilme,
      valor,
      imagem,
      idElemento
    );
    listaHtml.append(li);
  });
  elementoPai.append(listaHtml);
};

const filtrarFilme = (id) => {
  if (id === "0") {
    let listaHtml = document.createElement("ul");
    listaHtml.setAttribute("class", "lista-filmes");
    arrayFilmes.forEach((element) => {
      nomeFilme = element.title;
      pontuacaoFilme = element.vote_average;
      valor = element.price;
      imagem = element.poster_path;
      idElemento = element.id;
      li = gerarElementoLista(
        nomeFilme,
        pontuacaoFilme,
        valor,
        imagem,
        idElemento
      );
      listaHtml.append(li);
    });
    let ulExistente = document.querySelector(".todos-filmes > .lista-filmes");
    divlistaFilmes.removeChild(ulExistente);
    divlistaFilmes.append(listaHtml);
    addEventBtnSacola(false);
  } else {
    fetch(
      `https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${id}&language=pt-BR`
    )
      .then((resposta) => resposta.json())
      .then((resposta) => {
        let listaHtml = document.createElement("ul");
        listaHtml.setAttribute("class", "lista-filmes");
        arrayFiltrado = resposta.results;
        arrayFiltrado.forEach((element) => {
          nomeFilme = element.title;
          pontuacaoFilme = element.vote_average;
          valor = element.price;
          imagem = element.poster_path;
          idElemento = element.id;
          li = gerarElementoLista(
            nomeFilme,
            pontuacaoFilme,
            valor,
            imagem,
            idElemento
          );
          listaHtml.append(li);
        });
        let ulExistente = document.querySelector(
          ".todos-filmes > .lista-filmes"
        );
        divlistaFilmes.removeChild(ulExistente);
        divlistaFilmes.append(listaHtml);
        addEventBtnSacola(false);
      });
  }
};

const gerarElementoLista = (nomeFilme, pontuacaoFilme, valor, imagem, id) => {
  let elementoDaLista = document.createElement("li");
  elementoDaLista.setAttribute("class", "card");

  let imagemDoFilme = document.createElement("img");
  imagemDoFilme.setAttribute("src", imagem);
  imagemDoFilme.setAttribute("alt", `poster-${nomeFilme}`);
  let cardFilme = document.createElement("div");
  cardFilme.setAttribute("class", "card-filme");

  let favorito = document.createElement("div");
  favorito.setAttribute("class", "favorito");
  let favoritoImg = document.createElement("img");
  favoritoImg.setAttribute("src", "./assets/Star 2.svg");
  favoritoImg.setAttribute("alt", "estrela");

  let rodape = document.createElement("div");
  rodape.setAttribute("class", "rodape");

  let nomePontuacao = document.createElement("div");
  nomePontuacao.setAttribute("class", "nome-e-pontuacao");

  let nome = document.createElement("h3");
  nome.setAttribute("class", "nome");
  nome.innerText = nomeFilme;

  let pontuacao = document.createElement("div");
  pontuacao.setAttribute("class", "pontuacao");

  let imgEstrela = document.createElement("img");
  imgEstrela.setAttribute("src", "./assets/Star 1.svg");
  imgEstrela.setAttribute("alt", "pontuacao");

  let pontuacaoNumero = document.createElement("h4");
  pontuacaoNumero.innerText = pontuacaoFilme;

  //   ainda no rodape
  let botaoAdicionar = document.createElement("button");
  botaoAdicionar.setAttribute("class", "btn-adicionar");
  botaoAdicionar.setAttribute("value", id);

  let textoSacola = document.createElement("h3");
  textoSacola.innerText = "Sacola";

  let preco = document.createElement("h3");
  preco.innerText = "R$ ";

  let spanValor = document.createElement("span");
  spanValor.setAttribute("class", "value");
  spanValor.innerText = valor;

  elementoDaLista.append(imagemDoFilme);
  elementoDaLista.append(cardFilme);
  cardFilme.append(favorito);
  cardFilme.append(rodape);
  favorito.append(favoritoImg);
  rodape.append(nomePontuacao);
  rodape.append(botaoAdicionar);
  nomePontuacao.append(nome);
  nomePontuacao.append(pontuacao);
  pontuacao.append(imgEstrela);
  pontuacao.append(pontuacaoNumero);
  botaoAdicionar.append(textoSacola);
  botaoAdicionar.append(preco);
  preco.append(spanValor);

  return elementoDaLista;
};

propaganda.addEventListener("click", () => {
  inputDesconto.value = "HTMLNAOELINGUAGEM";
  let container = propaganda.parentNode;
  container.removeChild(propaganda);
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

//EXISTE NA SACOLA
const adicionNaSacola = (idFilme) => {
  let divItens = document.querySelector(".conteudo-sacola .itens");
  let existeNaSacola = document.getElementById(idFilme);
  let estaFiltrado = document.querySelector(".categoria.ativo").value;

  let nomeFilme;
  let valorFilme;
  let imagemFilme;

  let filme = arrayTopFilmes.find(
    (element) => element.id === parseInt(idFilme)
  );
  if (estaFiltrado === "0") {
    if (!filme) {
      filme = arrayFilmes.find((element) => element.id === parseInt(idFilme));
    }
    nomeFilme = filme.title;
    valorFilme = filme.price;
    imagemFilme = filme.poster_path;
  } else {
    if (!filme) {
      filme = arrayFiltrado.find((element) => element.id === parseInt(idFilme));
    }
    nomeFilme = filme.title;
    valorFilme = filme.price;
    imagemFilme = filme.poster_path;
  }

  if (divItens) {
    if (existeNaSacola) {
      editarItemSacola(idFilme); //PAREI AQUI
    } else {
      const novoItem = criarItem(nomeFilme, valorFilme, imagemFilme, idFilme);
      divItens.append(novoItem);
      atualizarValorTotal(idFilme);
    }
  } else {
    const divSacola = criarDivSacola(
      nomeFilme,
      valorFilme,
      imagemFilme,
      idFilme
    );
    conteudoSacola.innerHTML = "";
    conteudoSacola.append(divSacola);
    const botaoConfirmar = criarBotaoConfirmarDados(filme.price);
    sacola.append(botaoConfirmar);
  }
};

const criarDivSacola = (
  nomeFilme,
  valorFilme,
  imagemFilme,
  idFilme,
  qtd = 1
) => {
  let divItens = document.createElement("div");
  let listaNaoOrdenada = document.createElement("ul");
  divItens.setAttribute("class", "itens");
  listaNaoOrdenada.append(
    criarItem(nomeFilme, valorFilme, imagemFilme, idFilme, qtd)
  );

  divItens.append(listaNaoOrdenada);
  return divItens;
};

const criarItem = (nomeFilme, valorFilme, imagemFilme, idFilme, qtd = 1) => {
  let linha = document.createElement("li");
  let divDadosItem = document.createElement("div");
  let divImage = document.createElement("div");
  let divEscura = document.createElement("div");
  let imgPoster = document.createElement("img");
  let divNomeValor = document.createElement("div");
  let nome = document.createElement("h3");
  let valorCifrao = document.createElement("h3");
  let valor = document.createElement("span");
  let divIncrementador = document.createElement("div");
  let btnIncrementar = document.createElement("button");
  let imgIncrementar = document.createElement("img");
  let quantidade = document.createElement("h3");
  let btnDecrementar = document.createElement("button");
  let imgDecrementar = document.createElement("img");

  divDadosItem.setAttribute("class", "dados-item");
  divImage.setAttribute("class", "imagem");
  imgPoster.setAttribute("src", imagemFilme);
  imgPoster.setAttribute("alt", `poster-${nomeFilme}`);
  divNomeValor.setAttribute("class", "nome-valor");
  nome.setAttribute("class", "nome");
  nome.innerText = nomeFilme;
  valorCifrao.setAttribute("class", "valor");
  valorCifrao.innerText = "R$ ";

  valor.setAttribute("class", "valor-filme");
  valor.innerText = valorFilme;

  divIncrementador.setAttribute("class", "incrementador");
  imgIncrementar.setAttribute("src", "./assets/add.svg");
  imgIncrementar.setAttribute("alt", "adicionar");
  quantidade.setAttribute("class", "quantidadeTotal");
  quantidade.innerText = qtd;
  imgDecrementar.setAttribute("src", "./assets/Delete.svg");
  imgIncrementar.setAttribute("alt", "remover");
  btnIncrementar.setAttribute("class", "adicionar");
  btnDecrementar.setAttribute("class", "remover");

  btnIncrementar.append(imgIncrementar);
  btnDecrementar.append(imgDecrementar);
  divIncrementador.append(btnIncrementar);
  divIncrementador.append(quantidade);
  divIncrementador.append(btnDecrementar);

  divNomeValor.append(nome);
  valorCifrao.append(valor);
  divNomeValor.append(valorCifrao);

  divImage.append(divEscura);
  divImage.append(imgPoster);

  divDadosItem.append(divImage);
  divDadosItem.append(divNomeValor);

  linha.append(divDadosItem);
  linha.append(divIncrementador);
  linha.setAttribute("id", idFilme);

  criarEscuta(btnIncrementar, 0, idFilme);
  criarEscuta(btnDecrementar, 1, idFilme);

  atualizarLocalStorage(idFilme);

  return linha;
};

const criarBotaoConfirmarDados = (valorFilme) => {
  let bntPrecoTotal = document.createElement("button");
  let confirmeDados = document.createElement("h3");
  let valorTotal = document.createElement("h3");
  let spanValor = document.createElement("span");

  bntPrecoTotal.setAttribute("class", "btn-precoTotal");
  confirmeDados.innerText = "Confirme seus dados";
  valorTotal.innerText = "R$ ";
  spanValor.setAttribute("class", "somatorioTotal");
  spanValor.innerText = valorFilme;

  valorTotal.append(spanValor);
  bntPrecoTotal.append(confirmeDados);
  bntPrecoTotal.append(valorTotal);

  bntPrecoTotal.addEventListener("click", () => {
    window.location.assign("././formulario.html");
  });
  return bntPrecoTotal;
};

const criarEscuta = (btn, controle, idFilme) => {
  if (controle === 0) {
    btn.addEventListener("click", () => {
      editarItemSacola(idFilme);
    });
  } else if (controle === 1) {
    btn.addEventListener("click", () => {
      editarItemSacola(idFilme, false);
    });
  }
};

const editarItemSacola = (id, incrementar = true) => {
  const elementoNaBag = document.getElementById(id);
  const elementoQuantidade = elementoNaBag.querySelector(".quantidadeTotal");
  let removerButtonImg = elementoNaBag.querySelector(".remover > img");
  if (!removerButtonImg) {
    removerButtonImg = elementoNaBag.querySelector(".diminuir > img");
  }
  let removerButton = elementoNaBag.querySelector(".remover");
  if (!removerButton) {
    removerButton = elementoNaBag.querySelector(".diminuir");
  }

  let quantidadeAtual = parseInt(elementoQuantidade.innerText);
  removerButtonImg.setAttribute("src", "./assets/menos.svg");
  removerButton.setAttribute("class", "diminuir");

  if (incrementar) {
    quantidadeAtual++;
    elementoQuantidade.innerText = quantidadeAtual;
    atualizarValorTotal(id);
    atualizarLocalStorage(id, 1);
  } else {
    if (quantidadeAtual === 1) {
      atualizarValorTotal(id, false);
      atualizarLocalStorage(id, 2);
      elementoNaBag.remove();

      // mudar div e remover botao caso não tenha nenhum item na bag
    } else {
      if (quantidadeAtual === 2) {
        removerButtonImg.setAttribute("src", "./assets/Delete.svg");
      }
      atualizarValorTotal(id, false);
      atualizarLocalStorage(id, 2);

      quantidadeAtual--;
      elementoQuantidade.innerText = quantidadeAtual;
    }
  }
};

const sacolaVazia = () => {
  const titulo = document.createElement("h2");
  const aviso = document.createElement("h3");
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/Social Media.svg");
  img.setAttribute("alt", "sacola vazia");
  aviso.innerText = "Adicione filmes agora";
  titulo.innerText = "Sua Sacola está vazia";

  return [titulo, aviso, img];
};

const atualizarValorTotal = (idElemento, adicionar = true) => {
  const elemento = document.getElementById(idElemento);
  let valorUnitario = elemento.querySelector(".valor-filme");

  valorUnitario = Number(valorUnitario.innerHTML);
  const botaoPreco = document.querySelector(".btn-precoTotal");

  const spanValorTotal = botaoPreco.querySelector(".somatorioTotal");
  valorTotal = Number(spanValorTotal.innerText);
  let cupom = document.querySelector(".cupom-input > input").value;

  if (adicionar) {
    valorTotal += valorUnitario;
  } else {
    valorTotal -= Number(valorUnitario);
    if (valorTotal === 0) {
      document.querySelector(".btn-precoTotal").remove();
      document.querySelector(".conteudo-sacola .itens").remove();
      const conteudoSacola = document.querySelector(".conteudo-sacola");
      conteudoSacola.append(sacolaVazia()[0]);
      conteudoSacola.append(sacolaVazia()[1]);
      conteudoSacola.append(sacolaVazia()[2]);
    }
  }
  if (cupom === "HTMLNAOELINGUAGEM") {
    valorComDesconto = valorUnitario * 0.9;
  }
  spanValorTotal.innerText = valorTotal;
};

const atualizarLocalStorage = (idFilme, novo = 0) => {
  let itensDaSacola = localStorage.getItem("itensDaSacola");
  let arrayDaSacola = JSON.parse(itensDaSacola);
  let index = null;

  let filtro = document.querySelector(".categoria.ativo").value;
  console.log(filtro);

  if (arrayDaSacola) {
    arrayDaSacola.forEach((element, i) => {
      if (idFilme == element.idFilme) {
        console.log("encontrei", element.idFilme);
        index = i;
      }
    });
  }

  let elemento = null;
  arrayTopFilmes.forEach((element) => {
    if (element.id == idFilme) {
      elemento = element;
    }
  });

  if (filtro == 0) {
    arrayFilmes.forEach((element) => {
      if (element.id == idFilme) {
        elemento = element;
      }
    });
  } else {
    arrayFiltrado.forEach((element) => {
      if (element.id == idFilme) {
        elemento = element;
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
  }
};

if (localStorage.hasOwnProperty("itensDaSacola")) {
  arrayLocalStorage = JSON.parse(localStorage.getItem("itensDaSacola"));
  let novoItem = null;

  arrayLocalStorage.forEach((element) => {
    let divItens = document.querySelector(".conteudo-sacola .itens");
    if (divItens) {
      novoItem = criarItem(
        element.nomeFilme,
        element.valorFilme,
        element.imagemFilme,
        element.idFilme,
        element.qtd
      );
      divItens.append(novoItem);
      atualizarValorTotal(idFilme);
    } else {
      let divSacola = criarDivSacola(
        element.nomeFilme,
        element.valorFilme,
        element.imagemFilme,
        element.idFilme,
        element.qtd
      );
      conteudoSacola.innerHTML = "";
      conteudoSacola.append(divSacola);
      const botaoConfirmar = criarBotaoConfirmarDados(filme.price);
      sacola.append(botaoConfirmar);
    }
  });
}
// consts removerItemLocalStorage = () => {};
