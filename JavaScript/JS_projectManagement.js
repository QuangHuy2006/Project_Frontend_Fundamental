let currentPage = 1;
let totalPerPage = 2;
const pages = document.querySelector(".buttonPages");
const confirmDeleteWindow = document.querySelector(".confirm-delete-window");
const previousButton = document.querySelector(".previous");
const continueButton = document.querySelector(".continue");
const saveBtn = document.querySelector("#save");
let deletedId;
let userLocals = JSON.parse(localStorage.getItem("task")) || [];
if (userLocals.length) {
  render(userLocals);
  renderPages();
}
function render(userInput) {
  const user = [];
  const getFirstElementEachPage = (currentPage - 1) * totalPerPage;
  const getLastElementEachPage = totalPerPage * currentPage;
  user.push(
    ...userInput.slice(getFirstElementEachPage, getLastElementEachPage)
  );
  const table = document.querySelector("#table tbody");
  table.textContent = "";
  user.forEach((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${value.id}</td>
        <td id="projectName">${value.name}</td>
        <td id="projectAction">
            <div>
                <button class="fix">Sửa</button>
                <button class="delete">Xóa</button>
                <button class="detail"><a href="../HTML/HTML_mission.html?task${value.id}">Chi tiết</a></button>
            </div>
        </td>
        `;
    row.querySelector(".fix").addEventListener("click", function (event) {
      event.preventDefault();
      user[index].name = prompt("Nhập tên dự án mới");
      localStorage.setItem("task", JSON.stringify(userLocals));
      render(userLocals);
    });
    row.querySelector(".delete").addEventListener("click", function (event) {
      event.preventDefault();
      confirmDeleteWindow.style.display = "block";
      background.style.display = "block";
      deletedId = index;
    });
    saveBtn.onclick = function () {
      const totalPages = Math.ceil(userLocals.length / totalPerPage);
      const realIndex = (currentPage - 1) * totalPerPage + deletedId;
      userLocals.splice(realIndex, 1);
      localStorage.setItem("task", JSON.stringify(userLocals));
      render(userLocals);
      if (currentPage > totalPages) {
        currentPage = totalPages;
      }
      confirmDeleteWindow.style.display = "none";
      background.style.display = "none";
    };
    table.appendChild(row);
  });
}
const addBtn = document.querySelector(".addedProjectButton");
const addWindow = document.querySelector(".add-window");
const background = document.querySelector(".overlay");
const cancelBtn = document.querySelector("#add-window-header-button");
addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addWindow.style.display = "block";
  background.style.display = "block";
});
const projectNameInput = document.querySelector("#projectName");
const projectNameInput2 = document.querySelector(".projectNameInput");
const projectDecribe = document.querySelector("#projectDecribe");
const error1 = document.querySelector("#error");
const error2 = document.querySelector("#error2");
function add(event) {
  let check = 0;
  event.preventDefault();
  if (!projectDecribe.value.trim()) {
    error2.textContent = "Dữ liệu không được để trống";
    projectDecribe.style.borderColor = "red";
  } else {
    error2.textContent = "";
    projectDecribe.style.borderColor = "lightgray";
    check++;
  }
  if (!projectNameInput.value.trim()) {
    error1.textContent = "Dữ liệu không được để trống";
    projectNameInput.style.borderColor = "red";
  }
  if (userLocals.length) {
    if (userLocals.some((value) => value.name === projectNameInput.value)) {
      error1.textContent = "Dữ liệu không được trùng lặp";
      projectNameInput.style.borderColor = "red";
    } else {
      error1.textContent = "";
      projectNameInput.style.borderColor = "lightgray";
      check++;
    }
  } else {
    error1.textContent = "";
    projectNameInput.style.borderColor = "lightgray";
    check++;
  }
  if (check == 2) {
    let newId =
      userLocals.length > 0 ? userLocals[userLocals.length - 1].id + 1 : 1;
    const newTask = {
      id: newId,
      name: projectNameInput.value,
      description: projectDecribe.value,
    };
    userLocals.push(newTask);
    render(userLocals);
    addWindow.style.display = "none";
    background.style.display = "none";
    projectDecribe.value = "";
    projectNameInput.value = "";
    localStorage.setItem("task", JSON.stringify(userLocals));
    renderPages();
  }
}
function renderPages() {
  const totalPages = Math.ceil(userLocals.length / totalPerPage);
  pages.textContent = "";
  for (let i = 1; i <= totalPages; i++) {
    const singlePages = document.createElement("button");
    singlePages.classList.add("styleButton");
    singlePages.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      renderPages();
      render(userLocals);
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
  const totalPages = Math.ceil(userLocals.length / totalPerPage);
  event.preventDefault();
  if (currentPage < totalPages) {
    currentPage++;
    renderPages();
    render(userLocals);
  }
});
previousButton.addEventListener("click", function (event) {
  const totalPages = Math.ceil(userLocals.length / totalPerPage);
  event.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    renderPages();
    render(userLocals);
  }
});
function closer() {
  addWindow.style.display = "none";
  background.style.display = "none";
}
function findByName() {
  const findName = userLocals.filter(
    (value) => value.name == +projectNameInput2.value.trim()
  );
  render(findName);
  renderPages();
}
