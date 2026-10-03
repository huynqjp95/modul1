// lấy data dưới localStorage
const users = JSON.parse(localStorage.getItem("userList"));
let login = JSON.parse(localStorage.getItem("login"));

// đặt biến edit thành expired nếu người dùng nhấn login out ở dashboard
localStorage.setItem("edit", JSON.stringify("expired"));

// hiển thị đăng ký thành công khi người dùng đã đăng ký thành công ở trang sign-up
if (login === "success") {
  showError("msg", "sign-up-toast");
  localStorage.setItem("login", JSON.stringify("expired"));
  setTimeout(() => {
    resetError("msg");
  }, 3000);
}
//-------------DOM----------------
const btn = document.querySelector(".btn");
const hiddenElements = Array.from(document.querySelectorAll(".hidden"));

// event nút submit . kiểm tra trực tiếp trong event các định dạng input
btn.addEventListener("click", (e) => {
  e.preventDefault();

  resetError("msg");

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // kiem tra email pass neu de trong thi return
  if (email.value === "" || password.value === "") {
    showError("msg", "login-validation");
    return;
  }

  let index = users.findIndex((user) => user.email === email.value);
  // kiểm tra email có trong users không
  if (index == -1) {
    showError("msg", "login-error");
    return;
  }
  // pass đúng với pass của email không
  if (users[index].password !== password.value) {
    showError("msg", "login-error");
    return;
  }

  // set biến login dưới local để hiển đăng nhập thành công ở trang dashboard.
  localStorage.setItem("login", JSON.stringify("success"));

  // biến loginIndex để cho biết index của user nào đang đăng nhập, dùng cho kiểm tra user ở add-user
  localStorage.setItem("loginIndex", JSON.stringify(index));

  // load trang dashboard khi không lỗi
  window.location.href = "./dashboard.html";
});

// reset các hiển thị lỗi lần trước
function resetError(containerId) {
  document.getElementById(containerId).classList.remove("show");
  hiddenElements.forEach((e) => {
    e.classList.add("hidden");
  });
}

// hiển thị error theo đối số truyền vào
function showError(containerId, typeId) {
  document.getElementById(containerId).classList.add("show");
  document.getElementById(typeId).classList.remove("hidden");
}
