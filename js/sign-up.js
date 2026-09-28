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

function isEmail(element) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(element.value);
}

function checkMin(element, min) {
  return element.value.lenght >= min;
}

//  {
//     usercode: 'U001',
//     username: 'user_1',
//     email: 'user1@example.com',
//     password: 'UserPass01',
//     role: 'admin',
//     birthday: '1997-07-05',
//     status: 'Deactive',
//     description:
//       'National again month truth. Actually civil table put nearly base.',
//   },
function emailExist(email) {
    
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
function hiddenError() {
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

// validate form
function validate() {
  let isSucces = true;
  hiddenError();
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
    return error;
  }
  // nhóm 2 : sign up error
  error = {
    type: "sign-up-error",
  };

  return 1;
}

// Onclick
btn.onclick = function (e) {
  e.preventDefault();
  console.log(validate());
};
