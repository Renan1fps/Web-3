const animeBtn = document.getElementById("btn-create-anime");

animeBtn.addEventListener("click", async () => {
  const inputName = document.getElementById("nome").value;
  const inputDescription = document.getElementById("descricao").value;
  const inputUrl = document.getElementById("url").value;

  const response = await fetch(`http://localhost:8000/animes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: inputName,
      description: inputDescription,
      url: inputUrl,
    }),
  });

  if (response.status === 500) {
    alert("Anime já cadastrado");
    return;
  }

  window.location.href = "main.html";
});
