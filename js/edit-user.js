const users = JSON.parse(localStorage.getItem("userList"));
let indexEdit = JSON.parse(localStorage.getItem("edit"));

// function IIFE , chạy luôn và không cần gọi hàm.
(() => {
  //----- DOM -------
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

  // Hiển thị thông tin user đã được nhấn edit từ Dashboard
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
  // Nhấn nút back quay lại dashboard
  btnBack.onclick = () => {
    window.location.href = "./dashboard.html";
  };

  // Nhấn nút save lưu thông tin đã edit và quay trở lại dashboard
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
      //đặt biến edit để hiển thị toast thành công khi quay trở lại dashboard
      localStorage.setItem("edit", JSON.stringify("success"));
      window.location.href = "./dashboard.html";
    }
  };

  // hiển thị theo tham số nhập vào khác một tý với trang sign-up
  function showError(error) {
    msg.classList.add("show");
    msg.querySelector("#edit-error").classList.remove("hidden");

    for (const key in error) {
      if (error[key]) {
        msg.querySelector(`.${key}`).classList.remove("hidden");
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

  //validate function , giống với sign-up nhưng trong error không phân type nửa
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

// cac tool check định dạng input, giống với sign-up
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

// ẩn hiện password khi nhấn icon eye (copy từ sign-up qua)
const faEye = document.querySelector(".fa-eye");
const faEyeSlash = document.querySelector(".fa-eye-slash");
faEye.onclick = () => {
  password.type = "text";
  faEyeSlash.style.display = "inline-block";
};
faEyeSlash.onclick = () => {
  password.type = "password";
  faEyeSlash.style.display = "none";
};
