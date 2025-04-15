let currentPage = 1;

let totalPerPage = 9;

const pages = document.querySelector(".buttonPages");

const previousButton = document.querySelector(".previous");

const addChangeWindow = document.querySelector(".add-window2");

const continueButton = document.querySelector(".continue");

const addProjectWindow = document.querySelector(".add-window");

const projectName = document.querySelector("#projectName");

const projectNameError = document.querySelector("#error");

const projectDecribe = document.querySelector("#projectDecribe");

const projectDecribeError = document.querySelector("#error2");

const table = document.querySelector("#table tbody");

const background = document.querySelector(".overlay");

const addWindow = document.querySelector(".add-window");

let projectLocals = JSON.parse(localStorage.getItem("projects")) || {};

let userLocals = JSON.parse(localStorage.getItem("userTask")) || [];

const buttonAddWindow = document.querySelector(".addedProjectButton");

const confirmDeleteWindow = document.querySelector(".confirm-delete-window");

const saveBtn = document.querySelector("#save");

const projectNameInput2 = document.querySelector(".projectNameInput");

const currentUser = localStorage.getItem("user");

projectLocals[currentUser] = projectLocals[currentUser] || [];

const userInfor = JSON.parse(localStorage.getItem("userInfor")) || [];

const changedName = document.querySelector("#changedName");

const changedNameError = document.querySelector("#changeNameError");

let usedProject = [];

function renderPages() {
  const totalPages = Math.ceil(
    projectLocals[currentUser].length / totalPerPage
  );
  pages.textContent = "";
  for (let i = 1; i <= totalPages; i++) {
    const singlePages = document.createElement("button");
    singlePages.classList.add("styleButton");
    singlePages.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      renderPages();
      render(projectLocals[currentUser]);
    });
    if (currentPage === i) {
      singlePages.classList.add("btn-active");
    }
    if (currentPage === 1) {
      previousButton.style.background = "rgba(200, 200, 200, 0.5)";
    } else {
      previousButton.style.background = "#FFFFFF";
    }
    if (currentPage === totalPages) {
      continueButton.style.background = "rgba(200, 200, 200, 0.5)";
    } else {
      continueButton.style.background = "#FFFFFF";
    }
    singlePages.textContent = i;
    pages.appendChild(singlePages);
  }
}
continueButton.addEventListener("click", function (event) {
  const totalPages = Math.ceil(
    projectLocals[currentUser].length / totalPerPage
  );
  event.preventDefault();
  if (currentPage < totalPages) {
    currentPage++;
    renderPages();
    render(projectLocals[currentUser]);
  }
});
previousButton.addEventListener("click", function (event) {
  const totalPages = Math.ceil(
    projectLocals[currentUser].length / totalPerPage
  );
  event.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    renderPages();
    render(projectLocals[currentUser]);
  }
});
function closer() {
  addWindow.style.display = "none";
  background.style.display = "none";
  confirmDeleteWindow.style.display = "none";
  addChangeWindow.style.display = "none";
  addProjectWindow.style.display = "none";
}

function findByName() {
  const findName = projectLocals[currentUser].filter((value) =>
    value.projectName.includes(projectNameInput2.value.trim())
  );
  render(findName);
  renderPages();
}
buttonAddWindow.addEventListener("click", function (event) {
  event.preventDefault();
  addProjectWindow.style.display = "block";
  background.style.display = "block";
});
function addUser() {
  let checkIfValueValid = 0;
  if (!projectName.value.trim()) {
    projectNameError.textContent = "Tên dự án không được để trống!";
    projectName.style.borderColor = "red";
    projectNameError.style.color = "red";
  } else {
    if (projectName.value.trim().length < 5) {
      projectNameError.textContent = "Tên dự án phải từ 6 kí tự trở lên!";
      projectName.style.borderColor = "red";
      projectNameError.style.color = "red";
    }else{
      projectNameError.textContent = "";
      projectName.style.borderColor = "lightgray";
      projectNameError.style.color = "lightgray";
      checkIfValueValid++;
    }
  }
  if (!projectDecribe.value.trim()) {
    projectDecribeError.textContent = "Tên dự án không được để trống!";
    projectDecribe.style.borderColor = "red";
    projectDecribeError.style.color = "red";
  } else {
    projectDecribeError.textContent = "";
    projectDecribe.style.borderColor = "lightgray";
    projectDecribeError.style.color = "lightgray";
    checkIfValueValid++;
  }
  if (checkIfValueValid == 2) {
    const projectId = projectLocals[currentUser].length
      ? projectLocals[currentUser][projectLocals[currentUser].length - 1].id + 1
      : 1;
    if (usedProject.length) {
      if (usedProject.some((value) => value === projectName.value.trim())) {
        projectNameError.textContent = "Tên dự án không được trùng nhau";
        projectName.style.borderColor = "red";
        projectNameError.style.color = "red";
      } else {
        const project = {
          id: projectId,
          projectName: projectName.value.trim(),
          projectDecribe: projectDecribe.value.trim(),
          member: [
            {
              email: localStorage.getItem("user"),
              name: userInfor[
                userInfor.findIndex(
                  (value) => value.emailAddress === localStorage.getItem("user")
                )
              ].username,
              role: "Project owner",
            },
          ],
        };
        if (!projectLocals[currentUser]) {
          projectLocals[currentUser] = [];
        }
        projectLocals[currentUser].push(project);
        localStorage.setItem("projects", JSON.stringify(projectLocals));
        render(projectLocals[currentUser]);
        renderPages();
        usedProject.push(projectName.value.trim());
        addProjectWindow.style.display = "none";
        background.style.display = "none";
        projectDecribe.value = "";
        projectName.value = "";
        projectName.style.borderColor = "lightgray";
        projectNameError.style.color = "black";
      }
    } else {
      const project = {
        id: projectId,
        projectName: projectName.value.trim(),
        projectDecribe: projectDecribe.value.trim(),
        member: [
          {
            email: localStorage.getItem("user"),
            name: userInfor[
              userInfor.findIndex(
                (value) => value.emailAddress === localStorage.getItem("user")
              )
            ].username,
            role: "Project owner",
          },
        ],
      };
      if (!projectLocals[currentUser]) {
        projectLocals[currentUser] = [];
      }
      projectLocals[currentUser].push(project);
      localStorage.setItem("projects", JSON.stringify(projectLocals));
      render(projectLocals[currentUser]);
      renderPages();
      usedProject.push(projectName.value.trim());
      addProjectWindow.style.display = "none";
      background.style.display = "none";
      projectDecribe.value = "";
      projectName.value = "";
      projectName.style.borderColor = "lightgray";
      projectNameError.style.color = "black";
    }
  }
}
if (projectLocals[currentUser].length) {
  render(projectLocals[currentUser]);
  renderPages();
}

let indexForChange = 0;
let previousValue = "";
function render(userInput) {
  const getFirstElementEachPage = (currentPage - 1) * totalPerPage;
  const getLastElementEachPage = totalPerPage * currentPage;
  const user = userInput.slice(getFirstElementEachPage, getLastElementEachPage);
  table.textContent = "";
  user.forEach((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${value.id}</td>
        <td id="projectName">${value.projectName}</td>
        <td id="projectAction">
            <div>
                <button class="fix">Sửa</button>
                <button class="delete">Xóa</button>
                <button class="detail"><a href="../pages/dashboard.html?${
                  index + 1
                }">Chi tiết</a></button>
            </div>
        </td>
        `;
    row.querySelector(".fix").addEventListener("click", function (event) {
      previousValue = projectLocals[currentUser][index].projectName;
      event.preventDefault();
      addChangeWindow.style.display = "block";
      background.style.display = "block";
      indexForChange = index;
      changedName.value = projectLocals[currentUser][index].projectName;
    });
    row.querySelector(".delete").addEventListener("click", function (event) {
      event.preventDefault();
      confirmDeleteWindow.style.display = "block";
      background.style.display = "block";
      deletedId = index;
    });
    saveBtn.onclick = function () {
      const totalPages = Math.ceil(
        projectLocals[currentUser].length / totalPerPage
      );
      const realIndex = (currentPage - 1) * totalPerPage + deletedId;
      usedProject.splice(
        usedProject.findIndex(
          (value) => value === projectLocals[currentUser][realIndex].projectName
        ),
        1
      );
      projectLocals[currentUser].splice(realIndex, 1);
      userLocals[currentUser].splice(realIndex, 1);
      localStorage.setItem(`projects`, JSON.stringify(projectLocals));
      localStorage.setItem(`userTask`, JSON.stringify(userLocals));
      render(projectLocals[currentUser]);
      if (currentPage > totalPages) {
        currentPage = totalPages;
      }
      confirmDeleteWindow.style.display = "none";
      background.style.display = "none";
    };
    table.appendChild(row);
  });
}
function changeProjectName() {
  if (changedName.value.trim()) {
    projectLocals[currentUser][indexForChange].projectName =
      changedName.value.trim();
    localStorage.setItem("projects", JSON.stringify(projectLocals));
    render(projectLocals[currentUser]);
    usedProject[usedProject.findIndex((value) => value == previousValue)] =
      projectLocals[currentUser][indexForChange].projectName;
    addChangeWindow.style.display = "none";
    background.style.display = "none";
    changedName.value = "";
  }
  addChangeWindow.style.display = "none";
  background.style.display = "none";
  changedName.value = "";
}
if (!localStorage.getItem("loggin") || "") {
  window.history.back();
}
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", function () {
  localStorage.removeItem("loggin");
});
