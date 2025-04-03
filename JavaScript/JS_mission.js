let userLocals2 = JSON.parse(localStorage.getItem("task")) || [];
const btn = document.querySelectorAll(".buttonSpinable");
const tableContent = document.querySelectorAll(".table-content");
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function (event) {
    btn[i].classList.toggle("rotated");
    tableContent[i].classList.toggle("active");
  });
}
const tableForUserList = document.querySelector("#userList tbody");
const userListRowForm = document.querySelector(".userListRowForm");
const userInfor = [];
let cnt = 0;
const addWindow = document.querySelector(".add-window");
const addTaskWindow = document.querySelector(".add-task-window");
const background = document.querySelector(".overlay");
const cancelBtn = document.querySelector("#add-window-header-button");
const buttonAddUser = document.querySelector("#addedParticipant");
const userEmail = document.querySelector("#email");
const userRole = document.querySelector("#role");
const buttonAddTask = document.querySelector("#added");
const buttonCancelTask = document.querySelector(
  "#add-task-window-header-button"
);
const expandButton = document.querySelector(".expandButton");
const userList = document.querySelector(".userList");
const emailError = document.querySelector("#errorEmail");
const roleError = document.querySelector("#errorRole");
const brand = document.querySelector(".brand");
const brandDescription = document.querySelector(".brand-description");
brandDescription.textContent = `${
  userLocals2[window.location.href.split("?task")[1] - 1].description
}`;
brand.textContent = `${
  userLocals2[window.location.href.split("?task")[1] - 1].name
}`;
function closer() {
  addTaskWindow.style.display = "none";
  addWindow.style.display = "none";
  background.style.display = "none";
  userList.style.display = "none";
}
buttonAddUser.addEventListener("click", function (event) {
  event.preventDefault();
  addWindow.style.display = "block";
  background.style.display = "block";
});
buttonAddTask.addEventListener("click", function (event) {
  event.preventDefault();
  addTaskWindow.style.display = "block";
  background.style.display = "block";
});
expandButton.addEventListener("click", function (event) {
  event.preventDefault();
  userList.style.display = "block";
  background.style.background = "block";
});
let userLocals = JSON.parse(localStorage.getItem("userInfor")) || [];
let userEmailLocals = JSON.parse(localStorage.getItem("userEmail")) || [];
function addUser() {
  let check = 0;
  if (!userEmail.value.trim()) {
    emailError.textContent = "Email thành viên không được để trống";
    userEmail.style.borderColor = "red";
  }
  if (userEmailLocals.length) {
    if (
      userEmailLocals.some((value) => value.email === userEmail.value.trim())
    ) {
      emailError.textContent = "Email của thành viên không được trùng lặp";
      userEmail.style.borderColor = "red";
    } else {
      emailError.textContent = "";
      userEmail.style.borderColor = "lightgray";
      check++;
    }
  } else {
    emailError.textContent = "";
    userEmail.style.borderColor = "lightgray";
    check++;
  }
  if (!userRole.value.trim()) {
    roleError.textContent = "Vai trò thành viên không được để trống";
    userRole.style.borderColor = "red";
  } else {
    roleError.textContent = "";
    userRole.style.borderColor = "lightgray";
    check++;
  }
  if (check == 2) {
    const newUser = {
      email: userEmail.value.trim(),
      role: userRole.value.trim(),
    };
    userEmailLocals.push(newUser);
    localStorage.setItem("userEmail", JSON.stringify(userEmailLocals));
    renderUser(tableForUserList);
    renderUserList();
    addWindow.style.display = "none";
    addTaskWindow.style.display = "none";
    background.style.display = "none";
  }
}
function renderUser(tableChoice) {
  tableChoice.textContent = "";
  userEmailLocals.forEach((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th>
                      <div class="profilePic">
                      <span class="profileName">${
                        value.email[0].toUpperCase() +
                        value.email[1].toUpperCase()
                      }</span>
                       </div>
                  <div style="text-align: left;">
                    <span class="name">${value.email.split("@")[0]}</span>
                    <br />
                    <span class="email">${value.email}</span>
                  </div>
                    </th>
                      <td>
                        <div class="tableRow">
                          <span class="role">${value.role}</span>
                          <button class="removeUserFromList">
                            <img 
                            src="../Icon/Trash.png"
                            width="20px"
                            height="20px"
                            >
                          </button>
                        </div>
                      </td>`;
    row
      .querySelector(".removeUserFromList")
      .addEventListener("click", function (event) {
        event.preventDefault();
        userEmailLocals.splice(index, 1);
        localStorage.setItem("userEmail", JSON.stringify(userEmailLocals));
        renderUser(tableForUserList);
      });
    row.querySelector(".profilePic").style.background = `rgb(${
      Math.random() * 255
    },${Math.random() * 255}, ${Math.random() * 255})`;
    tableChoice.appendChild(row);
  });
}
renderUser(tableForUserList);
function renderUserList() {
  userListRowForm.textContent = "";
  userEmailLocals.forEach((value) => {
    const li = document.createElement("li");
    li.classList.add("classForliOnly");
    li.innerHTML = `<div class="profilePic">
                    <span class="profileName">${
                        value.email[0].toUpperCase() +
                        value.email[1].toUpperCase()
                      }</span>
                    </div>
                  <div>
                    <span class="name">${value.email.split("@")[0]}</span>
                    <br />
                    <span class="roleInPerson">${value.role}</span>
                  </div>`;
                  li.querySelector(".profilePic").style.background = `rgb(${
                    Math.random() * 255
                  },${Math.random() * 255}, ${Math.random() * 255})`;
                  userListRowForm.appendChild(li);
  });
}
renderUserList();
