document.addEventListener("DOMContentLoaded", async function () {

  const dataApi = await fetch("http://localhost:8000/users");
  const usersData = await dataApi.json();
  const tbody = document.querySelector("tbody");

  function populateTable() {
    tbody.innerHTML = "";

    usersData.forEach((user) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;

      const profileCell = document.createElement("td");
      profileCell.textContent = user.profileType === 2 ? "usuário" : "admin";

      const actionsCell = document.createElement("td");

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "Ver";
      viewBtn.addEventListener("click", () => openUserModal(user));

      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.addEventListener("click", () => openEditUserModal(user));

      const excluirBtn = document.createElement("button");
      excluirBtn.textContent = "Excluir";
      excluirBtn.addEventListener("click", () => deletUser(user));

      actionsCell.appendChild(viewBtn);
      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(excluirBtn);

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(profileCell);
      row.appendChild(actionsCell);

      tbody.appendChild(row);
    });
  }

  populateTable();

  function openUserModal(user) {
    const modal = document.getElementById("userModal");
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = "";

    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", closeModal);

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Detalhes do Usuário";

    const username = document.createElement("input");
    username.value = user.name;

    const email = document.createElement("input");
    email.value = user.email;

    const profile = document.createElement("input");
    profile.value = user.profileType;

    const update = document.createElement("button");
    update.textContent = "Salvar";
    update.style.display = "none";
    update.id = "btn-edit";
    update.addEventListener("click", async () => {
      await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username.value,
          email: email.value,
          profileType: profile.value,
        }),
      });
      window.location.reload();
    });

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(username);
    modalContent.appendChild(email);
    modalContent.appendChild(profile);
    modalContent.appendChild(update);

    modal.style.display = "block";
  }

  function openEditUserModal(user) {
    openUserModal(user);
    const btnEdit = document.getElementById("btn-edit");
    btnEdit.style.display = "block";
  }

  async function  deletUser(user) {
    await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
  }

  function closeModal() {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => (modal.style.display = "none"));
  }

  const closeUserModalButton = document.getElementById("closeUserModal");
  closeUserModalButton.addEventListener("click", closeModal);

  const closeAddUserModalButton = document.getElementById("closeAddUserModal");
  closeAddUserModalButton.addEventListener("click", closeModal);

  const addUserBtn = document.getElementById("addUserBtn");
  addUserBtn.addEventListener("click", () => openAddUserModal());

  const submitNewUser = document.getElementById("submitNewUser");
  submitNewUser.addEventListener("click", async () => {
    const inputName = document.getElementById("newUserName").value;
    const inputEmail = document.getElementById("newUserEmail").value;
    const inputPassword = document.getElementById("newUserPassword").value;
    const inputProfileType = document.getElementById("newUserProfile").value;

    const response = await fetch(`http://localhost:8000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inputName,
          email: inputEmail,
          profileType: inputProfileType,
          password: inputPassword
        }),
      });

      if(response.status === 500){
        alert('Usuário já cadastrado');
        return;
      }

      window.location.reload();
  });

  function openAddUserModal() {
    const addUserModal = document.getElementById("addUserModal");
    addUserModal.style.display = "block";
  }
});
