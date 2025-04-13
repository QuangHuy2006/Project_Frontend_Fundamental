let userLocals = JSON.parse(localStorage.getItem("projects")) || {};

const taskLocal = JSON.parse(localStorage.getItem("userTask")) || {};

const indexForRender = window.location.href.split("?")[1] - 1;

const currentUser = localStorage.getItem("user");

taskLocal[currentUser] = taskLocal[currentUser] || [];

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

const date2 = document.querySelector("#date2");

const dueDate2 = document.querySelector("#dueDate2");

const dateError = document.querySelector("#dateError");

const dueDateError = document.querySelector("#dueDateError");

const usedEmail = [];

const confirmDeleteWindow = document.querySelector(".confirm-delete-window");

const confirmDeleteButton = document.querySelector(".confirmDeleteButton");

const addWindow2 = document.querySelector(".add-window2");

const usedTaskName = [];

const fixTaskWindow = document.querySelector(".fix-task-window");

const fixTaskName = document.querySelector("#fixTaskName");

const priorityOrder = {
  "Cao": 1,
  "Trung bình": 2,
  "Thấp": 3,
};
function checkValidTaskName() {
  const status = ["todo", "inprogress", "done", "pending"];
  status.forEach((statusValue) => {
    [taskLocal[currentUser][indexForRender]].forEach((value, index) => {
      value[statusValue].forEach((value2) => {
        if (value2.name != usedTaskName[index]) {
          usedTaskName.push(value2.name);
        }
      });
    });
  });
}

if (taskLocal[currentUser][indexForRender]) {
  checkValidTaskName();
}

function checkValidEmail() {
  userLocals[currentUser].forEach((value) => {
    value.member.forEach((members, index) => {
      if (members.email != usedEmail[index]) {
        usedEmail.push(members.email);
      }
    });
  });
}

if(taskLocal[currentUser][indexForRender]){
  checkValidEmail();
}

const buttonCancelTask = document.querySelector(
  "#add-task-window-header-button"
);

const expandButton = document.querySelector(".expandButton");

const userList = document.querySelector(".userList");

const emailError = document.querySelector("#errorEmail");

const roleError = document.querySelector("#errorRole");

const errorName = document.querySelector("#error");

const brand = document.querySelector(".brand");

const brandDescription = document.querySelector(".brand-description");

brandDescription.textContent = `${
  userLocals[currentUser][window.location.href.split("?")[1] - 1].projectDecribe
}`;

brand.textContent = `${
  userLocals[currentUser][window.location.href.split("?")[1] - 1].projectName
}`;

const cancel = document.querySelector("#cancel");

const save = document.querySelector(".confirmDelete");

const confirmChange = document.querySelector(".confirmChange");

const changedName = document.querySelector("#changedName");

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
    const newUser = {
      email: userEmail.value.trim(),
      name: accountLocals[
        accountLocals.findIndex(
          (value) => value.emailAddress === userEmail.value.trim()
        )
      ].username,
      role: userRole.value.trim(),
    };
    if (usedEmail.length) {
      if (
        usedEmail.some((valueEmail) => valueEmail === userEmail.value.trim())
      ) {
        emailError.textContent = "Email này đã được sử dụng";
        userEmail.style.borderColor = "red";
      } else {
        userLocals[currentUser].forEach((value) => {
          value.member.push(newUser);
          localStorage.setItem(`projects`, JSON.stringify(userLocals));
          emailError.textContent = "";
          userEmail.style.borderColor = "lightgray";
          renderUser(tableForUserList);
          renderUserList();
          renderAssignee();
          checkValidEmail();
          addWindow.style.display = "none";
          addTaskWindow.style.display = "none";
          background.style.display = "none";
        });
      }
    } else {
      userLocals[currentUser].forEach((value) => {
        value.member.push(newUser);
        localStorage.setItem(`projects`, JSON.stringify(userLocals));
        emailError.textContent = "";
        userEmail.style.borderColor = "lightgray";
        renderUser(tableForUserList);
        renderUserList();
        renderAssignee();
        checkValidEmail();
        addWindow.style.display = "none";
        addTaskWindow.style.display = "none";
        background.style.display = "none";
      });
    }
  }
}
const deleteIndex = [];
const changeRoleInput = [];
function renderUser(tableChoice) {
  const array = [userLocals[currentUser][indexForRender]];
  deleteIndex.length = 0;
  changeRoleInput.length = 0;
  tableChoice.textContent = "";
  array.forEach((value) => {
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
                          <span class="role"><input type="text" class="changeRole" value="${
                            member.role
                          }"></span>
                          <button class="removeUserFromList">
                            <img 
                            src="../assets/icon/Trash.png"
                            width="20px"
                            height="20px"
                            >
                          </button>
                        </div>
                      </td>`;
      row.querySelector(".profilePic").style.background = `rgb(${
        Math.random() * 255
      },${Math.random() * 255}, ${Math.random() * 255})`;
      row.querySelector(".changeRole").addEventListener("click", function () {
        changeRoleInput.push(index);
      });
      row
        .querySelector(".removeUserFromList")
        .addEventListener("click", function () {
          row.classList.add("hide");
          deleteIndex.push(index);
        });

      tableChoice.appendChild(row);
    });
  });
  cancel.addEventListener("click", function () {
    document
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("hide"));
    document.querySelectorAll(".changeRole").forEach((input) => {
      input.value = input.defaultValue;
    });
    userList.style.display = "none";
    background.style.display = "none";
  });
  save.addEventListener("click", function () {
    deleteIndex.forEach((indexNeedToDeleted) => {
      userLocals[currentUser].forEach((value) => {
        usedEmail.splice(
          usedEmail.findIndex(
            (value2) => value2 === value.member[indexNeedToDeleted].email
          ),
          1
        );
        value.member.splice(indexNeedToDeleted, 1);
      });
    });
    localStorage.setItem(`projects`, JSON.stringify(userLocals));
    renderUser(tableForUserList);
    renderUserList();
    renderAssignee();
    userList.style.display = "none";
    background.style.display = "none";
  });
}

renderUser(tableForUserList);
function renderUserList() {
  const array = [userLocals[currentUser][indexForRender]];
  userListRowForm.textContent = "";
  array.forEach((value) => {
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
  const array = [userLocals[currentUser][indexForRender]];
  assignee.length = 1;
  array.forEach((value) => {
    value.member.forEach((value) => {
      const option = document.createElement("option");
      option.innerHTML = `${value.name}`;
      assignee.appendChild(option);
    });
  });
}

const assignee2 = document.querySelector("#assignee2");
function renderAssignee2() {
  const array = [userLocals[currentUser][indexForRender]];
  assignee2.length = 1;
  array.forEach((value) => {
    value.member.forEach((value) => {
      const option = document.createElement("option");
      option.innerHTML = `${value.name}`;
      assignee2.appendChild(option);
    });
  });
}

renderAssignee2();
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

function getAssigneeValue2() {
  return document.querySelector("#assignee2").value;
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

function getPriorityValue2() {
  return document.querySelector("#priority2").value;
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

function getProgressValue2() {
  return document.querySelector("#progress2").value;
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

function getStatusValue2() {
  return document.querySelector("#status2").value;
}

let currentDate = new Date();
currentDate = currentDate.toLocaleDateString().split(" ");
const currentDay = currentDate[0].split("/")[1];
const currentMonth = currentDate[0].split("/")[0];

const accept = document.querySelector("#accept");
function addTask() {
  let check = 0;
  const dateSplit = date.value.split("-");

  const monthDate = dateSplit[1];

  const dayDate = dateSplit[2];

  const dueDateSplit = dueDate.value.split("-");

  const dueMonthDate = dueDateSplit[1];

  const dueDayDate = dueDateSplit[2];

  if (!taskName.value.trim()) {
    taskName.style.borderColor = "red";
    errorName.style.color = "red";
    errorName.textContent = "Tên dự án không được để trống!";
  }
  if (usedTaskName.length) {
    if (taskName.value.length < 5) {
      taskName.style.borderColor = "red";
      errorName.style.color = "red";
      errorName.textContent = "Tên dự án tối thiểu 6 kí tự!";
    } else {
      if (usedTaskName.some((value) => value == taskName.value.trim())) {
        taskName.style.borderColor = "red";
        errorName.style.color = "red";
        errorName.textContent = "Tên dự án này đã tồn tại!";
      } else {
        taskName.style.borderColor = "lightgray";
        errorName.style.color = "black";
        errorName.textContent = "";
        check++;
      }
    }
  } else {
    if (taskName.value.length < 5) {
      taskName.style.borderColor = "red";
      errorName.style.color = "red";
      errorName.textContent = "Tên dự án tối thiểu 6 kí tự!";
    } else {
      taskName.style.borderColor = "lightgray";
      errorName.style.color = "black";
      errorName.textContent = "";
      check++;
    }
  }
  if (date.value == date.defaultValue) {
    dateError.textContent = "Vui lòng chọn ngày bắt đầu";
    dateError.style.color = "red";
    date.style.borderColor = "red";
  } else {
    if (monthDate > dueMonthDate || dayDate > dueDayDate) {
      dateError.textContent = "Ngày bắt đầu không được lớn hơn ngày kết thúc";
      dateError.style.color = "red";
      date.style.borderColor = "red";
    } else if (monthDate < currentDate && dayDate < currentDay) {
      dateError.textContent = "Ngày bắt đầu phải lớn hơn ngày hiện tại";
      dateError.style.color = "red";
      date.style.borderColor = "red";
    } else {
      dateError.textContent = "";
      dateError.style.color = "black";
      date.style.borderColor = "lightgray";
      check++;
    }
  }
  if (dueDate.value == dueDate.defaultValue) {
    dueDateError.textContent = "Vui lòng chọn ngày kết thúc";
    dueDateError.style.color = "red";
    dueDate.style.borderColor = "red";
  } else {
    dueDateError.textContent = "";
    dueDateError.style.color = "black";
    dueDate.style.borderColor = "lightgray";
    check++;
  }
  if (check == 3) {
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
    if (taskLocal[currentUser][indexForRender]) {
      [taskLocal[currentUser][indexForRender]].forEach((value) => {
        value[status].push(taskAddByUser);
      });
      localStorage.setItem("userTask", JSON.stringify(taskLocal));
      render();
    } else {
      if (!taskLocal[currentUser]) {
        taskLocal[currentUser] = [];
      }
      if (!taskLocal[currentUser][indexForRender]) {
        taskLocal[currentUser][indexForRender] = {
          todo: [],
          inprogress: [],
          pending: [],
          done: [],
        };
      }
      taskLocal[currentUser][indexForRender][status].push(taskAddByUser);
      localStorage.setItem("userTask", JSON.stringify(taskLocal));
      render();
      checkValidTaskName();
    }
  }
}

const changeRole = document.querySelectorAll(".changeRole");
const inprogress = document.querySelector("#in-progress");
const done = document.querySelector("#done");
const pending = document.querySelector("#pending");
const todo = document.querySelector("#to-do");

let indexToDelete = 0;
let fixList = "";
let deleteList = "";
let indexToChange = 0;
function render() {
  inprogress.textContent = "";
  done.textContent = "";
  pending.textContent = "";
  todo.textContent = "";
  const status = ["todo", "inprogress", "done", "pending"];
  const array = [taskLocal[currentUser][indexForRender]];
  status.forEach((statusValue) => {
    array.forEach((value2) => {
      value2[statusValue].forEach((value, index) => {
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
        }">${value.progress}</span></td>
          <td>
          <button class="fix" data-value="${value.status
            .toLowerCase()
            .replace(" ", "")}">Sửa</button>
          <button class="delete" data-value="${value.status
            .toLowerCase()
            .replace(" ", "")}">Xóa</button>
          </td>
          `;
        row.querySelector(".fix").addEventListener("click", function (event) {
          fixList = this.getAttribute("data-value");
          event.preventDefault();
          fixTaskWindow.style.display = "block";
          background.style.display = "block";
          indexToChange = index;
        });
        row
          .querySelector(".delete")
          .addEventListener("click", function (event) {
            deleteList = this.getAttribute("data-value");
            event.preventDefault();
            confirmDeleteWindow.style.display = "block";
            background.style.display = "block";
            indexToDelete = index;
          });
        if (value.status == "Done") {
          done.appendChild(row);
        } else if (value.status == "In progress") {
          inprogress.appendChild(row);
        } else if (value.status == "Pending") {
          pending.appendChild(row);
        } else if (value.status == "To do") {
          todo.appendChild(row);
        }
      });
    });
  });
  confirmDeleteButton.addEventListener("click", function () {
    usedTaskName.splice(
      usedTaskName.findIndex(
        (value) =>
          value === taskLocal[currentUser][indexForRender][deleteList].name
      ),
      1
    );
    taskLocal[currentUser][indexForRender][deleteList].splice(indexToDelete, 1);
    localStorage.setItem("userTask", JSON.stringify(taskLocal));
    render();
    confirmDeleteWindow.style.display = "none";
    background.style.display = "none";
  });
  accept.addEventListener("click", function () {
    let check = 0;
    const dateSplit = date2.value.split("-");

    const monthDate = dateSplit[1];

    const dayDate = dateSplit[2];

    const dueDateSplit = dueDate2.value.split("-");

    const dueMonthDate = dueDateSplit[1];

    const dueDayDate = dueDateSplit[2];

    if (fixTaskName.value.trim()) {
      if (usedTaskName.length) {
        if (fixTaskName.value.length < 5) {
          fixTaskName.style.borderColor = "red";
          errorName.style.color = "red";
          errorName.textContent = "Tên dự án tối thiểu 6 kí tự!";
        } else {
          if (usedTaskName.some((value) => value == fixTaskName.value.trim())) {
            fixTaskNametaskName.style.borderColor = "red";
            errorName.style.color = "red";
            errorName.textContent = "Tên dự án này đã tồn tại!";
          } else {
            fixTaskName.style.borderColor = "lightgray";
            errorName.style.color = "black";
            errorName.textContent = "";
            check++;
          }
        }
      }
    } else {
      check++;
    }
    if (date.value != date.defaultValue) {
      if (monthDate > dueMonthDate || dayDate > dueDayDate) {
        dateError.textContent = "Ngày bắt đầu không được lớn hơn ngày kết thúc";
        dateError.style.color = "red";
        date.style.borderColor = "red";
      } else if (monthDate < currentDate && dayDate < currentDay) {
        dateError.textContent = "Ngày bắt đầu phải lớn hơn ngày hiện tại";
        dateError.style.color = "red";
        date.style.borderColor = "red";
      } else {
        dateError.textContent = "";
        dateError.style.color = "black";
        date.style.borderColor = "lightgray";
        check++;
      }
    } else {
      check++;
    }
    if (dueDate.value != dueDate.defaultValue) {
      dueDateError.textContent = "";
      dueDateError.style.color = "black";
      dueDate.style.borderColor = "lightgray";
      check++;
    } else {
      check++;
    }
    if (
      document.querySelector("#status2").value !=
      taskLocal[currentUser][indexForRender][fixList][indexToChange].status
    ) {
      check++;
    } else {
      check++;
    }
    if (
      document.querySelector("#progress2").value !=
      taskLocal[currentUser][indexForRender][fixList][indexToChange].progress
    ) {
      check++;
    } else {
      check++;
    }
    if (
      document.querySelector("#priority2").value !=
      taskLocal[currentUser][indexForRender][fixList][indexToChange].priority
    ) {
      check++;
    } else {
      check++;
    }
    if (
      document.querySelector("#assignee2").value !=
      taskLocal[currentUser][indexForRender][fixList][indexToChange].assignee
    ) {
      check++;
    } else {
      check++;
    }
    if (check == 7) {
      taskLocal[currentUser][indexForRender][fixList][indexToChange].name =
        fixTaskName.value.trim();
      taskLocal[currentUser][indexForRender][fixList][
        indexToChange
      ].date = `${monthDate} - ${dayDate}`;
      taskLocal[currentUser][indexForRender][fixList][
        indexToChange
      ].dueDate = `${dueMonthDate} - ${dueDayDate}`;
      taskLocal[currentUser][indexForRender][fixList][indexToChange].assignee =
        getAssigneeValue2();
      taskLocal[currentUser][indexForRender][fixList][indexToChange].progress =
        getProgressValue2();
      taskLocal[currentUser][indexForRender][fixList][indexToChange].priority =
        getPriorityValue2();
      taskLocal[currentUser][indexForRender][fixList][indexToChange].status =
        getStatusValue2();
      renderProject();
      render();
      checkValidTaskName();
      fixTaskWindow.style.display = "none";
      background.style.display = "none";
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

if (taskLocal[currentUser][indexForRender]) {
  render();
}
function closer() {
  addTaskWindow.style.display = "none";
  addWindow.style.display = "none";
  background.style.display = "none";
  userList.style.display = "none";
  confirmDeleteWindow.style.display = "none";
  fixTaskWindow.style.display = "none";
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
let previousObject = "";
const findTask = document.querySelector("#findTask");
function findByName() {
  const status = ["todo", "done", "pending", "inprogress"];
  if(!previousObject){
    previousObject = JSON.parse(JSON.stringify(taskLocal[currentUser]));
  }
  if (findTask.value.trim()) {
    status.forEach((statusValue) => {
      taskLocal[currentUser][indexForRender][statusValue] = taskLocal[
        currentUser
      ][indexForRender][statusValue].filter((value) =>
        value.name.includes(findTask.value)
      );
    });

    render();
  } else {
    if(previousObject){
      taskLocal[currentUser] = JSON.parse(JSON.stringify(previousObject))
    }
    render();
  }
}

function getSelectedValue(){
  return document.querySelector(".optionSort").value;
}

function sortByOption() {
  const status = ["todo", "done", "pending", "inprogress"];
  if (getSelectedValue() == "Hạn chót") {
    status.forEach((statusValue) => {
      for (
        let i = 0;
        i < taskLocal[currentUser][indexForRender][statusValue].length;
        i++
      ) {
        for (
          let j = 0;
          j <
          taskLocal[currentUser][indexForRender][statusValue].length - 1 - i;
          j++
        ) {
          if (
            taskLocal[currentUser][indexForRender][statusValue][
              j
            ].dueDate.split("-")[1] <
            taskLocal[currentUser][indexForRender][statusValue][
              j + 1
            ].dueDate.split("-")[1]
          ) {
            let temp = taskLocal[currentUser][indexForRender][statusValue][j];
            taskLocal[currentUser][indexForRender][statusValue][j] =
              taskLocal[currentUser][indexForRender][statusValue][j + 1];
            taskLocal[currentUser][indexForRender][statusValue][j + 1] = temp;
          }
        }
      }
    });
    render();
  }else if(getSelectedValue() == "Độ ưu tiên"){
    status.forEach((statusValue) => {
      for (
        let i = 0;
        i < taskLocal[currentUser][indexForRender][statusValue].length;
        i++
      ) {
        for (
          let j = 0;
          j <
          taskLocal[currentUser][indexForRender][statusValue].length - 1 - i;
          j++
        ) {
          if (
            priorityOrder[taskLocal[currentUser][indexForRender][statusValue][
              j
            ].priority] <
            priorityOrder[taskLocal[currentUser][indexForRender][statusValue][
              j + 1
            ].priority]
          ) {
            let temp = taskLocal[currentUser][indexForRender][statusValue][j];
            taskLocal[currentUser][indexForRender][statusValue][j] =
              taskLocal[currentUser][indexForRender][statusValue][j + 1];
            taskLocal[currentUser][indexForRender][statusValue][j + 1] = temp;
          }
        }
      }
    });
    render();
  }
}
function getIndexValue() {
  const index = document.querySelector("#changeRole").value;
  return index.value;
}

if (!localStorage.getItem("loggin") || "") {
  window.history.back();
}
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", function () {
  localStorage.removeItem("loggin");
});
function renderProject() {
  const status = ["todo", "inprogress", "done", "pending"];
  status.forEach((statusValue) => {
    taskLocal[currentUser].forEach((value) => {
        const allTask = [
          ...value[statusValue],
        ];
        value[statusValue] = [];
        allTask.forEach(value2 => { 
            value[value2.status.toLowerCase().replace(" ", "")].push(value2);
        })
      });
    });
    localStorage.setItem("userTask", JSON.stringify(taskLocal));
}
renderProject();