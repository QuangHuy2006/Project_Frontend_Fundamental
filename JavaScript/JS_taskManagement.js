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
// revise.addEventListener("click", function (event) {
//   event.preventDefault();
//   confirmWindowInput.style.display = "block";
//   background.style.display = "block";
// });
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
save2.addEventListener("click", function(event){
    event.preventDefault();
})
function render(){

}
const navLink = document.querySelector("#nav-links");
const navLinks = [
  { link: "../HTML/HTML_projectManagement.html", class: "project", name: "Dự Án"},
  { link: "../HTML/HTML_taskManagement.html", class: "task", name: "Nhiệm vụ của tôi" },
  { link: "../HTML/HTML_signIn.html", class: "logOut", name: "Đăng xuất" },
];
function renderNavLinks() {
  navLink.textContent = "";
  navLinks.forEach((value) => {
    const li = document.createElement("li");
    li.innerHTML = `
              <a
                href="${value.link}?${window.location.href.split("?")[1]}"
                class="${value.link}"
                >${value.name}</a
              >
    `;
    navLink.appendChild(li);
  });
}
renderNavLinks();