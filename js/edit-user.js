const users = JSON.parse(localStorage.getItem("userList"));
let indexEdit = JSON.parse(localStorage.getItem("indexEdit"));

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
})();
