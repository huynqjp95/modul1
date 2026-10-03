// ----------lấy danh sách users--------
const users = JSON.parse(localStorage.getItem("userList"));

//-----------DOM------------------------
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const msg = document.querySelector("#msg");
const btn = document.querySelector(".btn");
const hiddenList = Array.from(document.querySelectorAll(".hidden"));

//-----------Event button ---------------
btn.onclick = function (e) {
  e.preventDefault();

  // kiểm tra validate
  if (validate()) {
    // validate trả về true thì tạo user mới
    const newUser = {
      birthday: null,
      description: null,
      email: email.value,
      password: password.value,
      role: "user",
      status: "Active",
      usercode: Date.now().toString(),
      username: userName.value,
    };

    // thêm newUser vào list users
    users.push(newUser);

    // update cho cả data userList dưới localStorage
    localStorage.setItem("userList", JSON.stringify(users));

    //đặt biến login = success dưới localStorage
    // để khi tự chuyển sang trang sign-in thì dùng biến này để hiển thị toast đăng ký thành công
    localStorage.setItem("login", JSON.stringify("success"));

    window.location.href = "./sign-in.html";
  }
};

// hàm validate sẽ trả về true nếu tất cả các input đúng định dạng
function validate() {
  // gọi hàm resetError để reset các error cũ
  resetError();
  // tạo đối tượng error với key là các error , củng là tên class của phần hiển thị error
  // value sẽ là return của các hàm kiểm tra định dạng
  let error = {
    type: "sign-up-validation",
    "email-cannot-blank": isEmpty(email),
    "password-cannot-blank": isEmpty(password),
    "username-cannot-blank": isEmpty(userName),
  };

  // chỉ cần 1 trong 3 trường input email, password, username để trống thì hiển thị lỗi
  // hàm validate trả về false và show ra đúng lỗi lên màn hình
  if (
    error["email-cannot-blank"] ||
    error["password-cannot-blank"] ||
    error["username-cannot-blank"]
  ) {
    showError(error);
    return false;
  }

  // nếu input không bị để trống thì tiếp tục kiểm tra lỗi định dạng tiếp theo của email và password
  error = {
    type: "sign-up-error",
    "email-error": notIsEmail(email),
    "email-exist": emailExist(email),
    "password-min-length-error": isLessThan(password, 8),
    "password-number-required-error": hasNotDigit(password),
    "password-uppercase-lowercase-error": isNotMixedCase(password),
  };

  // logic tương tự như trên
  if (
    error["email-error"] ||
    error["email-exist"] ||
    error["password-min-length-error"] ||
    error["password-number-required-error"] ||
    error["password-uppercase-lowercase-error"]
  ) {
    showError(error);
    return false;
  }

  // nếu không có lỗi gì return true cho hàm validate
  return true;
}

// các hàm để kiểm tra validate cho form input . trả vè true nếu không phải định dạng
function isEmpty(element) {
  // kiểm tra element có empty không
  return !element.value ? true : false;
}
function notIsEmail(element) {
  // có phải element.value không phải là định dạng email ?
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !regex.test(element.value);
}
function isNotMixedCase(element) {
  // input không bao gồm chữ hoa và chữ thường phải không ?
  return !/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(element.value);
}
function hasNotDigit(element) {
  // input không có chữ số phải không ?
  return !/[0-9]/.test(element.value);
}
function isLessThan(element, min) {
  // độ dài input nhỏ hơn min phải không ?
  return element.value.length < min;
}
function emailExist(element) {
  // input đã tồn tại phải không ?
  return users.some((user) => {
    return user.email === element.value;
  });
}

// hàm này chức năng hiển thị lỗi theo error truyền vào từ hàm validate
function showError(error) {
  msg.classList.add("show");
  for (const key in error) {
    // phải phân type vì trang html có 2 loại error
    if (key == "type") {
      msg.querySelector(`#${error[key]}`).classList.remove("hidden");
      continue;
    }
    if (error[key]) {
      msg.querySelector(`.${key}`).classList.remove("hidden");
    }
  }
}

// hàm này chức năng thêm class hidden vào lại tất cả các element có chứa class hidden
function resetError() {
  msg.classList.remove("show");
  hiddenList.forEach((element) => {
    element.classList.add("hidden");
  });
}

// ẩn hiện password khi nhấn icon eye
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
