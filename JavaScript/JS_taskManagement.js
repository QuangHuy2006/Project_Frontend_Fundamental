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
console.log(btn);

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
      <tfoot class="table-content" id="${index}"></tfoot>
    `;
    row.querySelector(".buttonSpinable").addEventListener("click", function(){
      this.classList.toggle("rotated");
      console.log(tableContent);
      
      // row.querySelector(".table-content").classList.toggle("active");
    });
    table.appendChild(row);
  });
}
renderTable();
console.log(projectLocal[currentUser]);
