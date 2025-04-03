const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError");
const emailAddress = document.querySelector("#emailAddress");
const emailAddressError = document.querySelector("#emailAddressError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const confirmPassword = document.querySelector("#confirmPassword");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const signUpButton = document.querySelector("#signUpButton");
const userLocals = JSON.parse(localStorage.getItem("userInfor")) || [];
signUpButton.addEventListener("click", function (event) {
  let check = 0;
  event.preventDefault();
  if (!username.value.trim()) {
    usernameError.textContent = "Tên đăng kí không được để trống";
    username.style.borderColor = "red";
  }
  if (userLocals.length) {
    if (
      userLocals.some(
        (userInfor) => userInfor.username == username.value.trim()
      )
    ) {
      usernameError.textContent = "Tên đăng kí đã tồn tại";
      username.style.borderColor = "red";
    } else {
      if (username.value.trim()) {
        usernameError.textContent = "";
        username.style.borderColor = "whitesmoke";
        check++;
      }
    }
  } else {
    if (username.value.trim()) {
      usernameError.textContent = "";
      username.style.borderColor = "whitesmoke";
      check++;
    }
  }
  if (!emailAddress.value.trim()) {
    emailAddressError.textContent = "Email không được để trống";
    emailAddress.style.borderColor = "red";
  } else if (!emailAddress.value.includes("@")) {
    emailAddressError.textContent = "Email phải có kí tự '@'";
    emailAddress.style.borderColor = "red";
  }
  if (userLocals.length) {
    if (
      userLocals.some(
        (userInfor) => userInfor.emailAddress == emailAddress.value.trim()
      )
    ) {
      emailAddressError.textContent = "Email đã tồn tại";
      emailAddress.style.borderColor = "red";
    } else {
      if (emailAddress.value.trim()) {
        emailAddressError.textContent = "";
        emailAddress.style.borderColor = "whitesmoke";
        check++;
      }
    }
  } else {
    if (emailAddress.value.trim()) {
      emailAddressError.textContent = "";
      emailAddress.style.borderColor = "whitesmoke";
      check++;
    }
  }
  if (!password.value.trim()) {
    passwordError.textContent = "Mật khẩu không được để trống";
    password.style.borderColor = "red";
  }else if(password.value.length < 8){
    passwordError.textContent = "Mật khẩu không đủ dài";
    password.style.borderColor = "red";
  } else {
    passwordError.textContent = "";
    password.style.borderColor = "whitesmoke";
    check++;
  }
  if (!confirmPassword.value.trim()) {
    confirmPasswordError.textContent = "Mật khẩu không được để trống";
    confirmPassword.style.borderColor = "red";
  } else if (!(confirmPassword.value.trim() === password.value.trim())) {
    confirmPasswordError.textContent = "Mật khẩu không khớp";
    confirmPassword.style.borderColor = "red";
  } else if(confirmPassword.value.length < 8){
    confirmPasswordError.textContent = "Mật khẩu không đủ dài";
    confirmPassword.style.borderColor = "red";
  } else {
    confirmPasswordError.textContent = "";
    confirmPassword.style.borderColor = "whitesmoke";
    check++;
  }
  if (check == 4) {
    alert(`Đăng ký thành công`);
    const user = {
      username: username.value,
      emailAddress: emailAddress.value,
      password: password.value,
    };
    userLocals.push(user);
    localStorage.setItem("userInfor", JSON.stringify(userLocals));
    username.value = "";
    emailAddress.value = "";
    password.value = "";
    confirmPassword.value = "";
    if (confirm("Bạn có muốn chuyển dến trang đăng nhập luôn không?"))
      window.location.replace("HTML_SignIn.html");
  }
});
