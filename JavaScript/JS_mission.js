let userLocals2 = JSON.parse(localStorage.getItem("task")) || [];
const btn = document.querySelectorAll(".buttonSpinable");
const tableContent = document.querySelectorAll(".table-content");
for(let i = 0;i<btn.length;i++){
    btn[i].addEventListener("click", function(event){
        btn[i].classList.toggle("rotated");
        tableContent[i].classList.toggle("active");
    })
}
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
const buttonCancelTask = document.querySelector("#add-task-window-header-button");
const expandButton = document.querySelector(".expandButton");
const userList = document.querySelector(".userList");
const brand = document.querySelector(".brand");
const brandDescription = document.querySelector(".brand-description");
brandDescription.textContent = `${userLocals2[window.location.href.split("?task")[1] - 1].description}`
brand.textContent = `${userLocals2[window.location.href.split("?task")[1] - 1].name}`;
function closer(){
    addTaskWindow.style.display = "none";
    addWindow.style.display = "none";
    background.style.display = "none";
    userList.style.display = "none";
}
buttonAddUser.addEventListener("click", function(event){
    event.preventDefault();
    addWindow.style.display = "block";
    background.style.display = "block";
})
buttonAddTask.addEventListener("click", function(event){
    event.preventDefault();
    addTaskWindow.style.display = "block";
    background.style.display = "block";
})
expandButton.addEventListener("click", function(event){
    event.preventDefault();
    userList.style.display = "block";
    background.style.background = "block";
})
let userLocals = JSON.parse(localStorage.getItem("userInfor")) || [];
function addUser(){
    const user = {
        id: +prompt(`Nhập id cho thành viên thứ ${cnt+1}:`),
        fullName: prompt(`Nhập tên thành viên thứ ${cnt+1}:`),

    }
} 