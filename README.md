ngày 10/3

- Xong tạm thời project
- Kiểm tra lại code
- Viết lại comment cho mỗi trang (code lập lại thì không cần)

- Chức năng từng trang
  - Trang Sign-up :
    Nhấn nút-->kiểm tra lỗi-->lỗi-->hiển thị.
    Không lỗi-->load trang Sign in-->hiển thị đăng ký thành công.
    Ẩn/hiện text của password.

  - Trang Sign-in :
    Hiển thị đăng ký thành công nếu người dùng từ trang sign-up thành công.
    Kiểm tra định dạng của input. nếu sai hiển thị lỗi.
    Đăng nhập thành công sẽ load đến trang dashboard.
    Không có chức năng lưu đăng nhập.

  - Trang Dashboard :
    Hiển thị đăng nhập thành công nếu người dùng đăng nhập từ sign-in.
    Hiển thị edit thành công nếu người dùng hoàn thành edit từ trang edit.
    Hiển thị danh sách 5 user và page tương ứng.
    Nút trái phải tăng giảm page, chọn được page muốn xem.
    Chức năng search theo input nhập vào không cần click nút search.
    Xóa được user chỉ với 1 cú click gọn gàng.
    Nhấn edit sẽ load sang trang edit.

  - Trang Edit-user
    Hiển thị thông tin user được edit lên input.
    Validate theo yêu cầu , không để trống , định dạng mật khẩu.
    Nút back quay lại dashboard, nút Edit lưu nếu định dạng input thành công.
    Xem được text của password.

  - Trang Add-user
    Usercode sinh ra tự động và duy nhất.
    Hiện thông báo Add thành công tại trang add-user.
    Chức năng củng giống như trang edit. copy sang y chang.
