const users = JSON.parse(localStorage.getItem("userList")) || [];

//DOM
const form = document.querySelector("#sign-up-form");
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const msg = document.querySelector("#msg");
const btn = document.querySelector(".btn");
const dfas = document.getElementById;
// cac function de validate form
function isEmpty(element) {
  return !element.value ? true : false;
}

// regex email. copy tu AI
function notIsEmail(element) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !regex.test(element.value);
}

// valid password phai gom chữ hoa và thường ((?=.*[0-9]).{8,}$/ số và ít nhất 8 ký tự)
// trả về false nếu không có lỗi , có lỗi là true
function isNotMixedCase(element) {
  return !/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(element.value);
}

function hasNotDigit(element) {
  return !/[0-9]/.test(element.value);
}

function isLessThan(element, min) {
  return element.value.length < min;
}

// data : users . kiem tra email ton tai chua
function emailExist(element) {
  return users.some((user) => {
    return user.email === element.value;
  });
}

//show error
function showError(error) {
  msg.classList.add("show");
  for (const key in error) {
    if (key == "type") {
      msg.querySelector(`#${error[key]}`).classList.remove("hidden");
      continue;
    }
    if (error[key]) {
      msg.querySelector(`.${key}`).classList.remove("hidden");
    }
  }
}
// hidden error
function resetError() {
  msg.classList.remove("show");
  document.getElementById("sign-up-validation").classList.add("hidden");
  document.querySelector(".password-cannot-blank").classList.add("hidden");
  document.querySelector(".email-cannot-blank").classList.add("hidden");
  document.querySelector(".username-cannot-blank").classList.add("hidden");
  document.getElementById("sign-up-toast").classList.add("hidden");
  document.getElementById("sign-up-error").classList.add("hidden");
  document.querySelector(".email-error").classList.add("hidden");
  document.querySelector(".password-min-length-error").classList.add("hidden");
  document
    .querySelector(".password-number-required-error")
    .classList.add("hidden");
  document
    .querySelector(".password-uppercase-lowercase-error")
    .classList.add("hidden");
}

// validate form | hàm validate sẽ trả về true nếu không lỗi và false nếu có lỗi
// cùng với đó nó sẽ hiển thị những error theo từng lỗi
function validate() {
  //reset error
  resetError();
  //chia nhỏ error theo từng nhóm
  //nhóm 1 : validate error sẽ trả về lỗi để trống.
  let error = {
    type: "sign-up-validation",
    "email-cannot-blank": isEmpty(email),
    "password-cannot-blank": isEmpty(password),
    "username-cannot-blank": isEmpty(userName),
  };
  if (
    error["email-cannot-blank"] ||
    error["password-cannot-blank"] ||
    error["username-cannot-blank"]
  ) {
    showError(error);
    return false;
  }
  // nhóm 2 : sign up error
  error = {
    type: "sign-up-error",
    "email-error": notIsEmail(email),
    "email-exist": emailExist(email),
    "password-min-length-error": isLessThan(password, 8),
    "password-number-required-error": hasNotDigit(password),
    "password-uppercase-lowercase-error": isNotMixedCase(password),
  };
  if (
    error["email-error"] ||
    error["email-exist"] ||
    error["password-min-length-error"] ||
    error["password-number-required-error"] ||
    error["password-uppercase-lowercase-error"]
  ) {
    showError(error);
    return false;
  }

  return true;
}

// Onclick
btn.onclick = function (e) {
  e.preventDefault();
  if (validate()) {
    //reset value ="" cho cac input
    const newUser = {
      birthday: null,
      description: null,
      email: email.value,
      password: password.value,
      role: "User",
      status: "Active",
      usercode: Date.now().toString(),
      username: userName.value,
    };
    users.push(newUser);
    localStorage.setItem("userList", JSON.stringify(users));
    //đặt biến login để toast khi thành công đăng ký
    localStorage.setItem("login", JSON.stringify("success"));
    window.location.href = "./sign-in.html";
  }
};
