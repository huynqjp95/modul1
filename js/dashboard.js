const users = JSON.parse(localStorage.getItem("userList")) || [];
let login = JSON.parse(localStorage.getItem("login")) || "";

if (login === "success") {
  //show login toast khi dang nhap thanh cong
  document.getElementById("msg").classList.add("show");
  document.getElementById("login-toast").classList.remove("hidden");
  // dat bien login thanh expired de khong hien thi login toast lai nua
  localStorage.setItem("login", JSON.stringify("expired"));
  setTimeout(() => {
    document.getElementById("msg").classList.remove("show");
    document.getElementById("login-toast").classList.add("hidden");
  }, 3000);
}
