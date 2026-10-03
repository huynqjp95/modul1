// lấy dữ liệu từ localStorage
const users = JSON.parse(localStorage.getItem("userList"));
let login = JSON.parse(localStorage.getItem("login"));
let editStatus = JSON.parse(localStorage.getItem("edit"));

// nếu các biến success thì hiển thị toast thành công
login === "success" && showOffToast("login");
editStatus === "success" && showOffToast("edit");

// hàm hiện toast , và tắt sau 2s
function showOffToast(type) {
  document.getElementById("msg").classList.add("show");
  document.getElementById(`${type}-toast`).classList.remove("hidden");
  // đặt lại biến điều khiển toast thành hết hạn expired khi đã hiển thị 2s rồi
  localStorage.setItem(type, JSON.stringify("expired"));
  setTimeout(() => {
    document.getElementById("msg").classList.remove("show");
    document.getElementById(`${type}-toast`).classList.add("hidden");
  }, 2000);
}

// biến cố định số user trên 1 trang
const ITEMS_PER_PAGE = 5;
// hàm lấy tổng số trang theo số user
function getMaxPage() {
  return Math.ceil(users.length / ITEMS_PER_PAGE);
}

// search event mỗi khi input vào ô input thì sẽ hiển thị danh sách theo input đã nhập
document.getElementById("search-box").addEventListener("input", function () {
  const arr = users.filter((e) => {
    return e.username.toLowerCase().includes(this.value.trim().toLowerCase());
  });
  pageWakeru(arr);
  displayPageNum(arr);
});

// hiển thị số page
displayPageNum(users);
// hàm hiển thị user theo page
pageWakeru(users);

// hàm này hiển thị số trang (ở giữa 2 cái button trái phải)
function displayPageNum(arr) {
  const maxpage = Math.ceil(arr.length / 5);
  let html = "";
  for (let i = 1; i <= maxpage; i++) {
    html += `
    <option value="${i}">page ${i} </option>
    `;
  }
  // html là những option
  document.getElementById("select").innerHTML = html;
}

// hàm chia page, mỗi page hiển thị 5 user
function pageWakeru(userList) {
  // biến số trang ở hiển thị
  let num = 1;
  const maxpage = getMaxPage();

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

  // hàm này làm nhiệm vụ tạo ra 1 arr chỉ 5 phần tử tương ứng theo num
  function takeIndex(arr) {
    return arr.filter((e, i) => {
      return i >= (num - 1) * 5 && i <= num * 5 - 1;
    });
  }
}

// event click cho cac btn edit delete
document.getElementById("table-body").addEventListener("click", (e) => {
  // nếu nhấn delete btn thi xóa xong hiển thị lại users
  if (e.target.classList.contains("btn-delete")) {
    const indexDelete = users.findIndex(
      (el) => el.usercode === e.target.dataset.id,
    );
    users.splice(indexDelete, 1);
    localStorage.setItem("userList", JSON.stringify(users));
    pageWakeru(users);
    return;
  }
  // nut edit , lấy được index muốn edit gửi xuống local
  if (e.target.classList.contains("btn-edit")) {
    const indexEdit = users.findIndex(
      (el) => el.usercode === e.target.dataset.id,
    );

    localStorage.setItem("edit", JSON.stringify(indexEdit));
    window.location.href = "./edit-user.html";
  }
});

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
