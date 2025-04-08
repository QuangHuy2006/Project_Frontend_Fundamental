let userLocals = JSON.parse(localStorage.getItem("projects")) || {};
const currentUser = localStorage.getItem("user");
const btn = document.querySelectorAll(".buttonSpinable");
const tableContent = document.querySelectorAll(".table-content");
const accountLocals = JSON.parse(localStorage.getItem("userInfor")) || [];
const tableForUserList = document.querySelector("#userList tbody");
const userListRowForm = document.querySelector(".userListRowForm");
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
  userLocals[currentUser][window.location.href.split("?")[1] - 1].projectDecribe
}`;
brand.textContent = `${
  userLocals[currentUser][window.location.href.split("?")[1] - 1].projectName
}`;
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function (event) {
    btn[i].classList.toggle("rotated");
    tableContent[i].classList.toggle("active");
  });
}
function addUser() {
  let check = 0;
  if (accountLocals.length) {
    if (!userEmail.value.trim()) {
      emailError.textContent = "Email thành viên không được để trống";
      userEmail.style.borderColor = "red";
      emailError.style.color = "red";
    }
    if (
      accountLocals.some(
        (value) => value.emailAddress === userEmail.value.trim()
      )
    ) {
      emailError.textContent = "";
      userEmail.style.borderColor = "lightgray";
      check++;
    } else {
      emailError.textContent = "Email không tồn tại";
      userEmail.style.borderColor = "red";
      emailError.style.color = "red";
    }
  }
  if (!userRole.value.trim()) {
    roleError.textContent = "Vai trò thành viên không được để trống";
    userRole.style.borderColor = "red";
    roleError.style.color = "red";
  } else {
    roleError.textContent = "";
    userRole.style.borderColor = "lightgray";
    check++;
  }
  if (check == 2) {
    const newUser = [
      {
        email: userEmail.value.trim(),
        name: accountLocals[
          accountLocals.findIndex(
            (value) => value.emailAddress === userEmail.value.trim()
          )
        ].username,
        role: userRole.value.trim(),
      },
    ];
    // if (
    //   userInfor.some((value) => value.emailAddress == userEmail.value.trim())
    // ) {
    //   emailError.textContent = "Email này đã được sử dụng";
    //   userEmail.style.borderColor = "red";
    // } else {
    userLocals[currentUser].forEach((value) => {
      value.member.push(...newUser);
      localStorage.setItem(`projects`, JSON.stringify(userLocals));
      emailError.textContent = "";
      userEmail.style.borderColor = "lightgray";
      renderUser(tableForUserList);
      renderUserList();
      renderAssignee();
      addWindow.style.display = "none";
      addTaskWindow.style.display = "none";
      background.style.display = "none";
    });
  }
}
function renderUser(tableChoice) {
  tableChoice.textContent = "";
  userLocals[currentUser].forEach((value) => {
    value.member.forEach((member, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<th>
                      <div class="profilePic">
                      <span class="profileName">${
                        member.email[0].toUpperCase() +
                        member.email[1].toUpperCase()
                      }</span>
                       </div>
                  <div style="text-align: left;">
                    <span class="name">${member.name}</span>
                    <br />
                    <span class="email">${member.email}</span>
                  </div>
                    </th>
                      <td>
                        <div class="tableRow">
                          <span class="role">${member.role}</span>
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
          userLocals[currentUser].forEach((value) => {
            value.member.splice(index, 1);
          });
          localStorage.setItem(`projects`, JSON.stringify(userLocals));
          renderUser(tableForUserList);
          renderUserList();
          renderAssignee();
        });
      row.querySelector(".profilePic").style.background = `rgb(${
        Math.random() * 255
      },${Math.random() * 255}, ${Math.random() * 255})`;
      tableChoice.appendChild(row);
    });
  });
}
renderUser(tableForUserList);
function renderUserList() {
  userListRowForm.textContent = "";
  userLocals[currentUser].forEach((value) => {
    value.member.forEach((value) => {
      const li = document.createElement("li");
      li.classList.add("classForLiOnly");
      li.innerHTML = `<div class="profilePic">
                    <span class="profileName">${
                      value.email[0].toUpperCase() +
                      value.email[1].toUpperCase()
                    }</span>
                    </div>
                  <div>
                    <span class="name">${value.name}</span>
                    <br />
                    <span class="roleInPerson">${value.role}</span>
                  </div>`;
      li.querySelector(".profilePic").style.background = `rgb(${
        Math.random() * 255
      },${Math.random() * 255}, ${Math.random() * 255})`;
      userListRowForm.appendChild(li);
    });
  });
}
renderUserList();
const assignee = document.querySelector("#assignee");
function renderAssignee() {
  assignee.length = 1;
  userLocals[currentUser].forEach((value) => {
    value.member.forEach((value) => {
      const option = document.createElement("option");
      option.innerHTML = `${value.name}`;
      assignee.appendChild(option);
    });
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
    statusError.textContent = "Vui lòng chọn trạng thái";
    statusError.style.color = "red";
    document.querySelector("#status").style.borderColor = "red";
  } else {
    statusError.textContent = "";
    statusError.style.color = "lightgray";
    document.querySelector("#status").style.borderColor = "lightgray";
    return document.querySelector("#status").value;
  }
}
const taskLocal = JSON.parse(localStorage.getItem("userTask")) || {};
taskLocal[currentUser] = taskLocal[currentUser] || 
  {
    todo: [],
    inprogress: [],
    pending: [],
    done: [],
  },
function addTask() {
  const dateSplit = date.value.split("-");
  const monthDate = dateSplit[1];
  const dayDate = dateSplit[2];
  const dueDateSplit = dueDate.value.split("-");
  const dueMonthDate = dueDateSplit[1];
  const dueDayDate = dueDateSplit[2];
  const taskAddByUser = {
    name: taskName.value,
    assignee: getAssigneeValue(),
    status: getStatusValue(),
    date: `${monthDate} - ${dayDate}`,
    dueDate: `${dueMonthDate} - ${dueDayDate}`,
    priority: getPriorityValue(),
    progress: getProgressValue(),
  };
  const status = taskAddByUser.status.toLowerCase().replace(" ", "");
  taskLocal[currentUser][status].push(taskAddByUser);
  localStorage.setItem("userTask", JSON.stringify(taskLocal));
  // render();
}
const inprogress = document.querySelector("#in-progress");
const done = document.querySelector("#done");
const pending = document.querySelector("#pending");
const todo = document.querySelector("#to-do");
function render() {
  inprogress.textContent = "";
  done.textContent = "";
  pending.textContent = "";
  todo.textContent = "";
  taskLocal[currentUser].forEach((value, index) => {
    const row = document.createElement("tr");
    row.classList.add("alignRow");
    row.innerHTML = `
    <td><span class="taskName">${value.name}</span></td>
    <td>${value.assignee}</td>
    <td><span class="${
      value.priority == "Trung bình"
        ? "priorityAverage"
        : value.priority == "Cao"
        ? "priorityHigh"
        : value.priority == "Thấp"
        ? "priorityLow"
        : ""
    }">${value.priority}</span></td>
    <td class="date">${value.date}</td>
    <td class="dueDate">${value.dueDate}</td>
    <td>
    <span class="${
      value.progress == "Đúng tiến độ"
        ? "onProgress"
        : value.progress == "Có rủi ro"
        ? "progressRisky"
        : value.progress == "Trễ hạn"
        ? "unProgressive"
        : ""
    }">${value.progress}</td>
    <td>
    <button class="fix">Sửa</button>
    <button class="delete">Xóa</button>
    </td>
    `;
    if (value.status == "Done") {
      done.appendChild(row);
    }
    if (value.status == "In progress") {
      inprogress.appendChild(row);
    }
    if (value.status == "Pending") {
      pending.appendChild(row);
    }
    if (value.status == "To do") {
      todo.appendChild(row);
    }
  });
  addTaskWindow.style.display = "none";
  background.style.display = "none";
  taskName.value = "";
  document.querySelector("#priority").value =
    document.querySelector("#priority").options[0].value;
  document.querySelector("#progress").value =
    document.querySelector("#progress").options[0].value;
  document.querySelector("#status").value =
    document.querySelector("#status").options[0].value;
  document.querySelector("#assignee").value =
    document.querySelector("#assignee").options[0].value;
  date.value = date.defaultValue;
  dueDate.value = dueDate.defaultValue;
}
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
