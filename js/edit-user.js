const users = JSON.parse(localStorage.getItem("userList"));
let indexEdit = JSON.parse(localStorage.getItem("indexEdit"));
console.log(users[indexEdit]);

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
  btnSave.onlick = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = {
        usercode: users[indexEdit].userCode,
        username: userName.value,
        email: users[indexEdit].email,
        password: password.value,
        role: role.value,
        birthday: birthday.value,
        status: active.checked ? active.value : deactive.value,
        description: description.value,
      };
      users.splice(indexEdit, 1, newUser);
      localStorage.setItem("userList", JSON.stringify(users));
      //đặt biến login để toast khi thành công đăng ký
      localStorage.setItem("editStatus", JSON.stringify("success"));
      window.location.href = "./dashboard.html";
    }
  };
})();
