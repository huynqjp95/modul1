// get user list
const users = JSON.parse(localStorage.getItem("userList")) || [];
let login = JSON.parse(localStorage.getItem("login")) || "";
if (login === "success") {
  showError("msg", "sign-up-toast");
  localStorage.setItem("login", JSON.stringify("expired"));
  setTimeout(() => {
    resetError("msg");
  }, 3000);
}
//DOM
const btn = document.querySelector(".btn");
const hiddenElements = Array.from(document.querySelectorAll(".hidden"));

function resetError(containerId) {
  document.getElementById(containerId).classList.remove("show");
  hiddenElements.forEach((e) => {
    e.classList.add("hidden");
  });
}

function showError(containerId, typeId) {
  document.getElementById(containerId).classList.add("show");
  document.getElementById(typeId).classList.remove("hidden");
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  resetError("msg");
  let isValid = true;
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  // kiem tra email pass neu de trong thi return
  if (email.value === "" || password.value === "") {
    showError("msg", "login-validation");
    return;
  }
  let index = users.findIndex((user) => user.email === email.value);
  //   console.log(index);
  if (index == -1) {
    showError("msg", "login-error");
    return;
  }
  if (users[index].password !== password.value) {
    showError("msg", "login-error");
    return;
  }
  localStorage.setItem("login", JSON.stringify("success"));
  // neu nguoi dung nhan login out o dashboard trong khi edit
  //thi se quay lai trang sign-in nen phat dat ben editStatus het han lai
  localStorage.setItem("edit", JSON.stringify("expired"));
  window.location.href = "./dashboard.html";
});
