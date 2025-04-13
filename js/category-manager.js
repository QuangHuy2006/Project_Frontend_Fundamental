const taskLocal = JSON.parse(localStorage.getItem("userTask")) || {};
const currentUser = localStorage.getItem("user");
const findValue = document.querySelector("#findValue");
let allTasks = [];
let newAllTasks = [];
const statusList = ["todo", "inprogress", "pending", "done"];
for (let i = 0; i < 2; i++) {
  if(taskLocal[currentUser][i]){
    statusList.forEach((statusKey) => {
      allTasks.push(...taskLocal[currentUser][i][statusKey]);
    });
    newAllTasks.push(allTasks);
    allTasks = [];
  }
}
const findName = [];
taskLocal[currentUser] = taskLocal[currentUser] || [];
const stored = {};
stored[currentUser] = stored[currentUser] || [];
function filtered() {
  const status = ["todo", "inprogress", "done", "pending"];
  status.forEach((statusValue) => {
    [taskLocal[currentUser][0]].forEach((value) => {
      value[statusValue].forEach((value2) => {
        stored[currentUser].push(value2);
      });
    });
  });
}
filtered();
const projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
const btn = document.querySelectorAll(".buttonSpinable");
const tableContent = document.querySelectorAll(".table-content");

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function (event) {
    btn[i].classList.toggle("rotated");
    tableContent[i].classList.toggle("active");
  });
}
const confirmWindow = document.querySelector(".confirm-window");
const confirmWindowInput = document.querySelector(".confirm-window-input");
const background = document.querySelector(".overlay");
const revise = document.querySelector("#reviseIcon");
const save = document.querySelector("#save");
const save2 = document.querySelector("#save2");
const input = document.querySelector("#input-value");
const error = document.querySelector("#error");
function closer() {
  confirmWindowInput.style.display = "none";
  confirmWindow.style.display = "none";
  background.style.display = "none";
}
save2.addEventListener("click", function (event) {
  event.preventDefault();
});
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", function () {
  localStorage.removeItem("loggin");
});
const table = document.querySelector(".table2");
function renderTable() {
  table.textContent = "";
  projectLocal[currentUser].forEach((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td colspan="6">
    <button class="buttonSpinable">
    <img
    src="../assets/icon/Triangle.png"
    width="13.5px"
    height="12.5px" />
    </button>
    <span
    style="
    font-weight: 800;
    font-size: 16.11px;
    line-height: 20px;
    letter-spacing: 0px;
    "
    >${value.projectName}</span
    >
    </td>
    `;
    const tfoot = document.createElement("tbody");
    tfoot.classList.add("table-content");
    tfoot.setAttribute("id", `table${index}`);
    tfoot.innerHTML = ``;
    row.querySelector(".buttonSpinable").addEventListener("click", function () {
      this.classList.toggle("rotated");
      tfoot.classList.toggle("active");
    });
    table.appendChild(row);
    table.appendChild(tfoot);
  });
}
const confirmChangeButton = document.querySelector(".confirm-change");
let indexToChange = 0;
let changeList = "";
let listIndex = 0;
renderTable();
function renderEachProject() {
  const status = ["todo", "inprogress", "done", "pending"];
  for (let i = 0; i < taskLocal[currentUser].length; i++) {
    document.querySelector(`#table${i}`).textContent = "";
  }
  for (let i = 0; i < taskLocal[currentUser].length; i++) {
    newAllTasks[i].forEach((value, index) => {
      [value].forEach((value2) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="firstRow"><span class="taskName">${value2.name}</span></td>
          <td class="secondRow"><span class="${
            value2.priority == "Trung bình"
              ? "priorityAverage"
              : value2.priority == "Cao"
              ? "priorityHigh"
              : value2.priority == "Thấp"
              ? "priorityLow"
              : ""
          }">${value2.priority}</span></td>
          <td class="secondThird">${
            value2.status
          } <button class="revise" data-value="${value2.status}"
          data-id="${i}"><img src=../assets/icon/revise.png width="15px" height="15px"></button></td>
          <td class="date" class="fourthRow">${value2.date}</td>
          <td class="dueDate" class="firthRow">${value2.dueDate}</td>
          <td class="sixthRow"><span class="${
            value2.progress == "Đúng tiến độ"
              ? "onProgress"
              : value2.progress == "Có rủi ro"
              ? "progressRisky"
              : value2.progress == "Trễ hạn"
              ? "unProgressive"
              : ""
          }">${value2.progress}</span></td>
          `;
        row.querySelector(".revise").addEventListener("click", function (e) {
          e.preventDefault();
          confirmWindowInput.style.display = "block";
          background.style.display = "block";
          changeList = this.getAttribute("data-value")
            .toLowerCase()
            .replace(" ", "");
          indexToChange = index;
          listIndex = this.getAttribute("data-id");
        });
        document.querySelector(`#table${i}`).appendChild(row);
      });
    }); 
  }
  confirmChangeButton.addEventListener("click", function () {
    if (!input.value.trim()) {
      error.textContent = "Tên Trạng thái mới không được để trống";
      error.style.color = "red";
      input.style.borderColor = "red";
    } else {
      confirmWindow.style.display = "block";
      confirmWindowInput.style.display = "none";
    }
  });
  document
    .querySelector(".confirm-change-button")
    .addEventListener("click", function () {
      console.log(taskLocal[currentUser][listIndex][changeList][indexToChange]);
      taskLocal[currentUser][listIndex][changeList][indexToChange].status =
        input.value.trim();
      renderEachProject();
      renderProject();
      confirmWindow.style.display = "none";
      background.style.display = "none";
    });
}
renderEachProject();

function sortByOption() {
  const status = ["todo", "inprogress", "done", "pending"];
  if (document.querySelector(".select").value == "Hạn chót") {
    status.forEach((statusValue) => {
      taskLocal[currentUser].forEach((project) => {
        project[statusValue].sort(
          (a, b) => b.dueDate.split("-")[1] - a.dueDate.split("-")[1]
        );
        renderEachProject();
      });
    });
  } else if (document.querySelector(".select").value == "Độ ưu tiên") {
    const priorityOrder = {
      Cao: 1,
      "Trung bình": 2,
      Thấp: 3,
    };
    status.forEach((statusValue) => {
      taskLocal[currentUser].forEach((project) => {
        project[statusValue].sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        renderEachProject();
      });
    });
  }
}
let previousObject = "";
function findByName() {
  const status = ["todo", "inprogress", "done", "pending"];
  if (!previousObject) {
    previousObject = JSON.parse(JSON.stringify(taskLocal[currentUser]));
  }
  if (findValue.value) {
    status.forEach((statusValue) => {
      taskLocal[currentUser].forEach((value) => {
        value[statusValue] = value[statusValue].filter((value2) =>
          value2.name.includes(findValue.value.trim())
        );
        renderEachProject();
      });
    });
  } else {
    status.forEach((statusValue) => {
      if (previousObject) {
        taskLocal[currentUser] = JSON.parse(JSON.stringify(previousObject));
      }
    });
    renderEachProject();
  }
}
function renderProject() {
  const status = ["todo", "inprogress", "done", "pending"];
  status.forEach((statusValue) => {
    taskLocal[currentUser].forEach((value) => {
      const allTask = [...value[statusValue]];
      value[statusValue] = [];
      allTask.forEach((value2) => {
        value[value2.status.toLowerCase().replace(" ", "")].push(value2);
      });
    });
  });
  localStorage.setItem("userTask", JSON.stringify(taskLocal));
}
renderProject();
