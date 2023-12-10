window.addEventListener("load", verifyLogin);

function verifyLogin() {
  const token = localStorage.getItem("@token");
  const cadUser = document.getElementById("create-user");
  const cadAnime = document.getElementById("create-anime");

  if (!token) {
    window.location.href = "index.html";
  }

  const user = JSON.parse(localStorage.getItem("@user"));

  if (user.profileType === 2) {
    cadUser.style.display = "none";
    cadAnime.style.display = "none";
    deleteButton.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const animeContainer = document.getElementById("anime-container");
  const animeContaine = document.getElementById("anime-containe");

  fetch("http://localhost:8000/animes?createdAt=DESC")
    .then((response) => response.json())
    .then((animes) => {
      animes.forEach((anime) => {
        const card = createAnimeCard(anime);
        animeContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro na requisição:", error));

  fetch("http://localhost:8000/animes?popularity=DESC")
    .then((response) => response.json())
    .then((animes) => {
      animes.forEach((anime) => {
        const a = createAnimeCard(anime);
        animeContaine.appendChild(a);
      });
    })
    .catch((error) => console.error("Erro na requisição:", error));

  function createAnimeCard(anime) {
    const card = document.createElement("div");
    card.classList.add("anime-card");

    const img = document.createElement("img");
    img.classList.add("anime-img");
    img.src = anime.url;
    img.alt = anime.name;

    const name = document.createElement("p");
    name.classList.add("anime-name");
    name.textContent = anime.name;

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");

    likeButton.addEventListener('click', ()=> {
      likeButton.style.backgroundColor = 'red'
    })
    
    const icon = document.createElement("img");
    icon.src = "./public/coracao.png";
    icon.style.maxHeight = '1rem'
    icon.style.maxHeight = '1rem'
    likeButton.appendChild(icon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("like-button");
    deleteButton.textContent = "delete";

    const user = JSON.parse(localStorage.getItem("@user"));

    if (user.profileType === 2) {
      deleteButton.style.display = "none";
    }

    deleteButton.addEventListener("click", async function () {
      await fetch(`http://localhost:8000/animes/${anime.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = "main.html";
    });

    likeButton.addEventListener("click", async function () {
      await fetch(`http://localhost:8000/animes/${anime.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ popularity: 1 }),
      });
    });

    const info = document.createElement("div");
    info.classList.add("anime-info");

    const description = document.createElement("p");
    description.textContent = anime.description;

    info.appendChild(description);
    info.appendChild(likeButton);
    info.appendChild(deleteButton);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(name);

    return card;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const faleConoscoBtnModal = document.getElementById("faleConoscoBtn");

  const faleConoscoBtn = document.getElementById("enviarBtn");

  faleConoscoBtn.addEventListener("click", async () => {
    const faleConosco = document.getElementById("descricao-fale").value;

    const user = JSON.parse(localStorage.getItem("@user"));

    await fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ faleConosco: faleConosco }),
    });
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    alert("Sugestão cadastrada!");
  });

  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");

  faleConoscoBtnModal.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const profileCircle = document.getElementById("profileCircle");
  const profileTooltip = document.getElementById("profileTooltip");

  profileCircle.addEventListener("click", function () {
    profileTooltip.style.display =
      profileTooltip.style.display === "block" ? "none" : "block";
  });
});
