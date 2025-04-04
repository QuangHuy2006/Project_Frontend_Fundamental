let number2 = window.location.href.split("?task")[1];
number2 = number2[number2.length - 2];
let number = window.location.href.split("?task")[1];
number = number[number.length - 1];
let userLocals2 = JSON.parse(localStorage.getItem(`task${number2}`)) || [];
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
const taskName = document.querySelector("#taskName");
const date = document.querySelector("#date");
const dueDate = document.querySelector("#dueDate");
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
  userLocals2[number - 1].description
}`;
brand.textContent = `${
  userLocals2[number - 1].name
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
let userEmailLocals =
  JSON.parse(
    localStorage.getItem(`userEmail${window.location.href.split("?task")[1]}`)
  ) || [];
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
    localStorage.setItem(
      `userEmail${window.location.href.split("?task")[1]}`,
      JSON.stringify(userEmailLocals)
    );
    renderUser(tableForUserList);
    renderUserList();
    renderAssignee();
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
        localStorage.setItem(
          `userEmail${window.location.href.split("?task")[1]}`,
          JSON.stringify(userEmailLocals)
        );
        renderUser(tableForUserList);
        renderUserList();
        renderAssignee();
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
    li.classList.add("classForLiOnly");
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
const assignee = document.querySelector("#assignee");
function renderAssignee() {
  userEmailLocals.forEach((value) => {
    const option = document.createElement("option");
    option.innerHTML = `${value.email.split("@")[0]}`;
    assignee.appendChild(option);
  });
}
renderAssignee();
const progressError = document.querySelector(".progressError");
const statusError = document.querySelector(".statusError");
const priorityError = document.querySelector(".priorityError");
const assigneeError = document.querySelector(".assigneeError");
function getAssigneeValue() {
  if (
    document.querySelector("#assignee").value ==
    document.querySelector("#assignee").options[0].value
  ) {
    assigneeError.textContent = "Vui lòng chọn người phụ trách";
    assigneeError.style.color = "red";
    document.querySelector("#assignee").style.borderColor = "red";
  } else {
    assigneeError.textContent = "";
    assigneeError.style.color = "lightgray";
    document.querySelector("#assignee").style.borderColor = "lightgray";
    return document.querySelector("#assignee").value;
  }
}
function getPriorityValue() {
  if (
    document.querySelector("#priority").value ==
    document.querySelector("#priority").options[0].value
  ) {
    priorityError.textContent = "Vui lòng chọn người phụ trách";
    priorityError.style.color = "red";
    document.querySelector("#priority").style.borderColor = "red";
  } else {
    priorityError.textContent = "";
    priorityError.style.color = "lightgray";
    document.querySelector("#priority").style.borderColor = "lightgray";
    return document.querySelector("#priority").value;
  }
}
function getProgressValue() {
  if (
    document.querySelector("#progress").value ==
    document.querySelector("#progress").options[0].value
  ) {
    progressError.textContent = "Vui lòng chọn người phụ trách";
    progressError.style.color = "red";
    document.querySelector("#progress").style.borderColor = "red";
  } else {
    progressError.textContent = "";
    progressError.style.color = "lightgray";
    document.querySelector("#progress").style.borderColor = "lightgray";
    return document.querySelector("#progress").value;
  }
}
function getStatusValue() {
  if (
    document.querySelector("#status").value ==
    document.querySelector("#status").options[0].value
  ) {
    statusError.textContent = "Vui lòng chọn người phụ trách";
    statusError.style.color = "red";
    document.querySelector("#status").style.borderColor = "red";
  } else {
    statusError.textContent = "";
    statusError.style.color = "lightgray";
    document.querySelector("#status").style.borderColor = "lightgray";
    return document.querySelector("#status").value;
  }
}
let taskLocal =
  JSON.parse(
    localStorage.getItem(`userTask${window.location.href.split("?task")[1]}`)
  ) || [];
function addTask() {
  const taskAddByUser = {
    name: taskName.value,
    assignee: getAssigneeValue(),
    status: getStatusValue(),
    date: date.value,
    dueDate: dueDate.value,
    priority: getPriorityValue(),
    progress: getProgressValue(),
  };
  taskLocal.push(taskAddByUser);
  addTaskWindow.style.display = "none";
  background.style.display = "none";
}
const navLink = document.querySelector("#nav-links");
const navLinks = [
  {
    link: "../HTML/HTML_projectManagement.html",
    class: "project",
    name: "Dự Án",
  },
  {
    link: "../HTML/HTML_taskManagement.html",
    class: "task",
    name: "Nhiệm vụ của tôi",
  },
  { link: "../HTML/HTML_signIn.html", class: "logOut", name: "Đăng xuất" },
];
function renderNavLinks() {
  navLink.textContent = "";
  navLinks.forEach((value) => {
    const li = document.createElement("li");
    li.innerHTML = `
              <a
                href="${value.link}?${number}"
                class="${value.link}"
                >${value.name}</a
              >
    `;
    navLink.appendChild(li);
  });
}
renderNavLinks();
