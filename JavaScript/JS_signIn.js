const emailAddress = document.querySelector("#emailAddress");
const password = document.querySelector("#password");
const signInButton = document.querySelector("#signInButton");
let userLocals = JSON.parse(localStorage.getItem("userInfor")) || [];
const announce = document.querySelector(".announce");
const emailAddressError = document.querySelector("#emailAddressError");
const passwordError = document.querySelector("#passwordError");
signInButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (userLocals.length == 0) {
    alert(`Chưa có tài khoản nào`);
  } else {
    if (!emailAddress.value.trim() || !password.value.trim()) {
      if (!emailAddress.value.trim()) {
        emailAddressError.textContent = "Email không được để trống";
        emailAddress.style.borderColor = "red";
      } else if (!emailAddress.value.includes("@")) {
        emailAddressError.textContent = "Email phải có kí tự '@'";
        emailAddress.style.borderColor = "red";
      } else {
        emailAddressError.textContent = "";
        emailAddress.style.borderColor = "whitesmoke";
      }
      if (!username.value.trim()) {
        usernameError.textContent = "Tên đăng kí không được để trống";
        username.style.borderColor = "red";
      } else {
        usernameError.textContent = "";
        username.style.borderColor = "whitesmoke";
      }
    } else {
      for (let i = 0; i < userLocals.length; i++) {
        if (
          emailAddress.value == userLocals[i].emailAddress &&
          password.value == userLocals[i].password
        ) {
          announce.style.color = "green";
          announce.textContent = "Đăng nhập thành công";
          setTimeout(switchWeb, 600);
          break;
        } else {
          announce.style.color = "red";
          announce.textContent = "Email hoặc mật khẩu chưa chính xác";
        }
      }
    }
  }
});

function switchWeb() {
  window.location.replace("HTML_ProjectManagement.html");
}
