const btnVoltarInicio = document.querySelector(".conteudo > button");
localStorage.clear();

btnVoltarInicio.addEventListener("click", () => {
  window.location.replace("././index.html");
});
