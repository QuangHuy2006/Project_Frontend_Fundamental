const taskLocal = JSON.parse(localStorage.getItem("userTask")) || {};
const currentUser = localStorage.getItem("user");
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
save.addEventListener("click", function (event) {
  event.preventDefault();
  if (input.value.trim()) {
    confirmWindowInput.style.display = "none";
    confirmWindow.style.display = "block";
  } else {
    error.textContent = "Nội dung sửa đổi không được để trống";
    input.value = "";
    input.style.borderColor = "red";
  }
});
save2.addEventListener("click", function (event) {
  event.preventDefault();
});
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", function () {
  localStorage.removeItem("loggin");
});
const table = document.querySelector(".table tbody");

function renderTable() {
  table.length = 1;
  projectLocal[currentUser].forEach((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="6">
      <button class="buttonSpinable">
        <img
          src="../Icon/Triangle.png"
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
    const tfoot = document.createElement("tfoot");
    tfoot.classList.add("table-content");
    tfoot.setAttribute("id", `table${index}`);
    tfoot.innerHTML=``;
    row.querySelector(".buttonSpinable").addEventListener("click", function () {
      this.classList.toggle("rotated");
      row.querySelector(".table-content").classList.toggle("active");
    });
    table.appendChild(row);
    table.appendChild(tfoot);
  });
}
renderTable();

function renderEachProject() {
  const status = ["todo", "inprogress", "done", "pending"];
  status.forEach((statusValue) => {
    for (let i = 0; i < taskLocal[currentUser].length; i++) {
      console.log(taskLocal[currentUser][i][statusValue]);
      [taskLocal[currentUser][i]].forEach((value) => {
        value[statusValue].forEach((value2) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td><span class="taskName">${value2.name}</span></td>
          <td><span class="${
            value2.priority == "Trung bình"
              ? "priorityAverage"
              : value2.priority == "Cao"
              ? "priorityHigh"
              : value2.priority == "Thấp"
              ? "priorityLow"
              : ""
          }">${value2.priority}</span></td>
          <td>${value2.status}</td>
          <td class="date">${value2.date}</td>
          <td class="dueDate">${value2.dueDate}</td>
          <td><span class="${
            value2.progress == "Đúng tiến độ"
              ? "onProgress"
              : value2.progress == "Có rủi ro"
              ? "progressRisky"
              : value2.progress == "Trễ hạn"
              ? "unProgressive"
              : ""
          }">${value2.progress}</span></td>
          `;
          document.querySelector(`#table${i}`).appendChild(row);
        });
      });
    }
  });
}
renderEachProject();
