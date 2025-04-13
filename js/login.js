const emailAddress = document.querySelector("#emailAddress");
const password = document.querySelector("#password");
const signInButton = document.querySelector("#signInButton");
let userLocals = JSON.parse(localStorage.getItem("userInfor")) || [];
const announce = document.querySelector(".announce");
const emailAddressError = document.querySelector("#emailAddressError");
const passwordError = document.querySelector("#passwordError");
let userNumber = 0;
signInButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (userLocals.length == 0) {
    alert(`Chưa có tài khoản nào`);
  } else {
    if (!emailAddress.value.trim() || !password.value.trim()) {
      if (!emailAddress.value.trim()) {
        emailAddressError.textContent = "Email không được để trống";
        emailAddress.style.borderColor = "red";
        emailAddressError.style.color = "red";
      } else if (!emailAddress.value.includes("@")) {
        emailAddressError.textContent = "Email phải có kí tự '@'";
        emailAddress.style.borderColor = "red";
        emailAddressError.style.color = "red";
      } else {
        emailAddressError.textContent = "";
        emailAddress.style.borderColor = "whitesmoke";
      }
      if (!password.value.trim()) {
        passwordError.textContent = "Tên đăng kí không được để trống";
        password.style.borderColor = "red";
        passwordError.style.color = "red";
      } else {
        passwordError.textContent = "";
        password.style.borderColor = "whitesmoke";
      }
    } else {
      for (let i = 0; i < userLocals.length; i++) {
        if (
          emailAddress.value == userLocals[i].emailAddress &&
          password.value == userLocals[i].password
        ) {
          userNumber = i + 1;
          localStorage.setItem("user", emailAddress.value);
          announce.style.color = "green";
          announce.textContent = "Đăng nhập thành công";
          window.location.replace("product-manager.html");
          localStorage.setItem("loggin", "true");
        } else {
          announce.style.color = "red";
          announce.textContent = "Email hoặc mật khẩu chưa chính xác";
        }
      }
    }
  }
});
if(localStorage.getItem("loggin")){
  window.history.back();
}