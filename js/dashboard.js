const users = JSON.parse(localStorage.getItem("userList")) || [];
let login = JSON.parse(localStorage.getItem("login")) || "";
console.log(login);

if (login === "success") {
  document.getElementById("msg").classList.add("show");
  document.getElementById("login-toast").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("msg").classList.remove("show");
    document.getElementById("login-toast").classList.add("hidden");
  }, 3000);
}
