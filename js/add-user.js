const users = JSON.parse(localStorage.getItem("userList"));
let indexAdd = JSON.parse(localStorage.getItem("add"));

(() => {
  const userCode = document.getElementById("user-code");
  const userName = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const role = document.getElementById("role");
  const birthday = document.getElementById("dob");
  const active = document.getElementById("status-active");
  const deactive = document.getElementById("status-deactive");
  const description = document.querySelector(".description-text-input");
  const msg = document.getElementById("msg");
  const hiddenList = Array.from(document.querySelectorAll(".hidden"));

  userCode.value = users[indexEdit].usercode;
  userName.value = users[indexEdit].username;
  email.value = users[indexEdit].email;
  password.value = users[indexEdit].password;
  role.value = users[indexEdit].role;
  birthday.value = users[indexEdit].birthday;
  description.value = users[indexEdit].description;
  if (users[indexEdit].status === "Deactive") {
    deactive.checked = true;
  }

  const btnSave = document.querySelector(".save-btn");
  const btnBack = document.querySelector(".back-btn");
  btnBack.onclick = () => {
    window.location.href = "./dashboard.html";
  };
  btnSave.onclick = (e) => {
    e.preventDefault();

    if (validate()) {
      const newUser = {
        usercode: users[indexEdit].usercode,
        username: userName.value,
        email: users[indexEdit].email,
        password: password.value,
        role: role.value.toLowerCase(),
        birthday: birthday.value,
        status: active.checked ? active.value : deactive.value,
        description: description.value,
      };
      users.splice(indexEdit, 1, newUser);
      localStorage.setItem("userList", JSON.stringify(users));
      //đặt biến login để toast khi thành công đăng ký
      localStorage.setItem("edit", JSON.stringify("success"));
      window.location.href = "./dashboard.html";
    }
  };

  //showError function vi phai dung bien msg trong nay nen bo vo day
  function showError(error) {
    msg.classList.add("show");
    msg.querySelector("#edit-error").classList.remove("hidden");

    console.log(msg);

    for (const key in error) {
      if (error[key]) {
        msg.querySelector(`.${key}`).classList.remove("hidden");
        console.log(msg.querySelector(`.${key}`));
      }
    }
  }
  // reset error function
  function resetError() {
    msg.classList.remove("show");
    msg.querySelector("#edit-error").classList.remove("hidden");
    hiddenList.forEach((element) => {
      element.classList.add("hidden");
    });
  }

  //validate function
  function validate() {
    resetError();

    let error = {
      "username-and-password-empty": isEmpty(password) || isEmpty(userName),
    };
    if (error["username-and-password-empty"]) {
      showError(error);
      return false;
    }
    error = {
      "password-min-length-error": isLessThan(password, 8),
      "password-number-required-error": hasNotDigit(password),
      "password-uppercase-lowercase-error": isNotMixedCase(password),
    };
    if (
      error["password-min-length-error"] ||
      error["password-number-required-error"] ||
      error["password-uppercase-lowercase-error"]
    ) {
      showError(error);
      return false;
    }

    return true;
  }
})();

// cac tool check

function isEmpty(element) {
  return !element.value ? true : false;
}

function notIsEmail(element) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !regex.test(element.value);
}

function isNotMixedCase(element) {
  return !/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(element.value);
}

function hasNotDigit(element) {
  return !/[0-9]/.test(element.value);
}

function isLessThan(element, min) {
  return element.value.length < min;
}

function emailExist(element) {
  return users.some((user) => {
    return user.email === element.value;
  });
}
