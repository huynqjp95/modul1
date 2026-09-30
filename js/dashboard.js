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
//
// usercode: 'U002',
//     username: 'user_2',
//     email: 'user2@example.com',
//     password: 'UserPass02',
//     role: 'user',
//     birthday: '1989-10-02',
//     status: 'Deactive',
//     description:
//       'Generation
function renderUsers(arr) {
  const html = arr.reduce((html, e) => {
    return (html += `
      <tr>
        <td>${e.usercode}</td>
        <td>${e.username}</td>
        <td>${e.email}</td>
        <td>${e.role}</td>
        <td>${e.birthday}</td>
        <td>${e.status}</td>
        <td>${e.description}</td>
      </tr>
    `);
  }, "");
  document.getElementById("table-body").innerHTML = html;
}

function pageWakeru() {
  const btnLeft = document.querySelector(".arrow-left");
  const btnRight = document.querySelector(".arrow-right");

  // tao arr chua tuong ung voi so page
  function takeIndex(arr) {
    return arr.filter((e, i) => {
      return i >= (num - 1) * 5 && i <= num * 5 - 1;
    });
  }
  let num = 1;
  const maxpage = Math.ceil(users.length / 5);

  let arr = takeIndex(users);
  renderUsers(arr);
  btnLeft.addEventListener("click", () => {
    console.log(num);

    if (num <= 1) return;
    num--;
    arr = takeIndex(users);
    renderUsers(arr);
  });
  btnRight.onclick = () => {
    if (num >= maxpage) return;
    num++;
    renderUsers(takeIndex(users));
  };
}
pageWakeru();
