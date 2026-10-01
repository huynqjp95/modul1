const users = JSON.parse(localStorage.getItem("userList")) || [];
let login = JSON.parse(localStorage.getItem("login")) || "";
let editStatus = JSON.parse(localStorage.getItem("editStatus")) || "";

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
if (editStatus === "success") {
  //show login toast khi dang nhap thanh cong
  document.getElementById("msg").classList.add("show");
  document.getElementById("edit-toast").classList.remove("hidden");
  // dat bien login thanh expired de khong hien thi login toast lai nua
  localStorage.setItem("editStatus", JSON.stringify("expired"));
  setTimeout(() => {
    document.getElementById("msg").classList.remove("show");
    document.getElementById("edit-toast").classList.add("hidden");
  }, 3000);
}

// 5user trên 1 trang
const ITEMS_PER_PAGE = 5;
// hàm lấy maxpage
function getMaxPage() {
  return Math.ceil(users.length / ITEMS_PER_PAGE);
}
// hàm render user theo arr được truyền vào , ví dụ user hoặc cho hiển thị 5 user theo arr
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
        <td>
          <button class="btn btn-edit" data-id="${e.usercode}">Edit</button>
          <button class="btn btn-delete" data-id="${e.usercode}">Delete</button>
        </td>
      </tr>
    `);
  }, "");
  document.getElementById("table-body").innerHTML = html;
}

// search event
document.getElementById("search-box").addEventListener("input", function () {
  const arr = users.filter((e) => {
    return e.username.toLowerCase().includes(this.value.trim().toLowerCase());
  });
  pageWakeru(arr);
});

// ham display nay dung de hien thị số trang đang hiển thị, maxpage là số trang từ tổng user chia cho 5
function displayPageNum() {
  // biến maxpage nay cần kiểm soát , khi thay đổi số lượng phần tử trong users cần cập nhật lại
  const maxpage = getMaxPage();
  let html = "";
  for (let i = 1; i <= maxpage; i++) {
    html += `
    <option value="${i}">page ${i} </option>
    `;
  }
  document.getElementById("select").innerHTML = html;
}

function pageWakeru(userList) {
  // tao arr chua tuong ung voi so page (đặt tên hơi chuối)
  function takeIndex(arr) {
    return arr.filter((e, i) => {
      return i >= (num - 1) * 5 && i <= num * 5 - 1;
    });
  }
  // num là số trang đang hiển thị, mỗi trang hiển thị 5 user
  let num = 1;
  const maxpage = getMaxPage();

  //hiển thị số trang, gán num cho giá trị được người dùng chọn trong select, render user tương ứng
  displayPageNum();
  const select = document.getElementById("select");
  select.addEventListener("change", function () {
    num = this.value;
    renderUsers(takeIndex(userList));
  });

  // arr là list chỉ 5 element được return từ takeIndex
  renderUsers(takeIndex(userList));

  // event left-right button
  document.querySelector(".arrow-left").addEventListener("click", () => {
    if (num <= 1) return;
    num--;
    select.value = num;
    renderUsers(takeIndex(userList));
  });
  document.querySelector(".arrow-right").onclick = () => {
    if (num >= maxpage) return;
    num++;
    select.value = num;
    renderUsers(takeIndex(userList));
  };
}
//chay hien thi page luon
pageWakeru(users);

// event click cho cac btn edit delete
document.getElementById("table-body").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const indexDelete = users.findIndex(
      (el) => el.usercode === e.target.dataset.id,
    );
    users.splice(indexDelete, 1);
    localStorage.setItem("userList", JSON.stringify(users));
    pageWakeru(users);
    return;
  }

  if (e.target.classList.contains("btn-edit")) {
    const indexEdit = users.findIndex(
      (el) => el.usercode === e.target.dataset.id,
    );

    localStorage.setItem("indexEdit", JSON.stringify(indexEdit));
    window.location.href = "./edit-user.html";
  }
});
