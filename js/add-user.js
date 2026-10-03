const users = JSON.parse(localStorage.getItem("userList"));
let loginIndex = JSON.parse(localStorage.getItem("loginIndex")) || "";

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

  const btnAdd = document.querySelector(".add-btn");
  const btnBack = document.querySelector(".back-btn");

  // evebt btn back . tại sao nút btn back không có type submit lại nhận event của form nhỉ
  btnBack.onclick = (e) => {
    e.preventDefault();
    window.location.href = "./dashboard.html";
  };

  // event btn add . trang add chỉ
  btnAdd.onclick = (e) => {
    e.preventDefault();

    if (validate()) {
      const newUser = {
        usercode: Date.now().toString(),
        username: userName.value,
        email: email.value,
        password: password.value,
        role: role.value.toLowerCase(),
        birthday: birthday.value,
        status: active.checked ? active.value : deactive.value,
        description: description.value,
      };
      users.push(newUser);
      //form reset. vì không phải load trang khác nên phải reset form/
      document.getElementById("add-new-user-form").reset();

      //hiển thị toast khi add thành công
      showOffToast("add");
      localStorage.setItem("userList", JSON.stringify(users));
    }
  };

  //showError function giống như sign-up và edit-user
  function showError(error) {
    msg.classList.add("show");
    msg.querySelector("#add-error").classList.remove("hidden");

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
    hiddenList.forEach((element) => {
      element.classList.add("hidden");
    });
  }

  //validate function
  function validate() {
    resetError();
    let error = {
      "email-username-password-empty":
        isEmpty(password) || isEmpty(userName) || isEmpty(email),
    };
    if (error["email-username-password-empty"]) {
      showError(error);
      return false;
    }
    error = {
      "email-exist": emailExist(email),
      "email-error": notIsEmail(email),
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
    if (users[loginIndex].role !== "admin") {
      error = {
        "role-not-admin": true,
      };
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

function showOffToast(type) {
  document.getElementById("msg").classList.add("show");
  document.getElementById(`${type}-toast`).classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("msg").classList.remove("show");
    document.getElementById(`${type}-toast`).classList.add("hidden");
  }, 2000);
}
