25/9 đưa file lên github , có thể làm được bất cứ đâu

- login up : tính năng đăng ký
  đọc xác nhận cấu trúc html, DOM
  viết những dòng code đầu tiên.

27/9 bắt đầu project
tìm hiểu cấu trúc DOM của file html
validate input form :

28/9-----------------------------------
đang dừng ở chổ viết function cho password phải có chữ và số --> Ok

- đã xong phần sign up với các chức năng
  validate cho email, pass, user
  có thể hiện error theo từng lỗi để trống, pass length < 8, email định dạng
  pass yêu cầu chử hoa + thường + số
  với các hàm nhỏ để check trống như hàm isEmpty
  kiểm tra có đúng email không với regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  kiểm tra pass phải có cả chử hoa và thường với hàm isNotMixedCase(element)  và regex = !/^(?=.*[a-z])(?=.*[A-Z]).+$/
  kiểm tra pass không kèm số hasNotDigit(e) regex = /[0-9]/
  isLessThan(e,min) kiểm tra e.value có < min không
  emailEist(e) kiểm tra email tồn tại chưa
  ===> lưu ý các hàm này sẽ trả về true nếu lỗi (có nghĩa là nếu input không hợp lệ) , false nếu không lỗi (input hợp lệ)
  - hàm showError(error) nhận vào một object error
    {
    type: "sign-up-validation",
    "email-cannot-blank": isEmpty(email),
    "password-cannot-blank": isEmpty(password),
    "username-cannot-blank": isEmpty(userName),
    }
    key type để cho biết type error nào
    các key còn lại là cụ thể error không hợp lệ (true)
  - hàm validate
    tạo object error (như trên ) để thể hiện từng lỗi
    return false nếu chỉ cần 1 input value không hợp lệ
    return true nếu hợp lệ hết và reset form, kèm theo hiển thị thông báo đăng ký thành công. thêm vào list user , lưu vào local
    --> củng ok, tạm thời xong phần sign up

29/9-----------------------------------------

- bổ sung phần hiển thị toast khi đăng ký thành công và đăng nhập thành công
  đăng ký thành công --> tự động sang trang đăng nhập --> hiển thị đăng ký thành công
  đăng nhập thành công --> tự động sang DashBoard --> hiển thị đăng nhập thành công
  -> sử dụng biến login = "success" đặt xuống localStorage --> sau khi đổi trang thì lấy biến login lên làm điều kiện để thực hiện việc hiển thị toast (tự ẩn sau 3s)
- Có thời gian làm chức năng ghi nhớ tài khoảng trong 24h !!

30/9 ------------------------------------------

- trang dashboard
  chức năng hiển thị mỗi page 5 user
  nút trái phải tăng giảm page để hiển thị các user khác
  có hiển thị page hiện tại, có thể chọn page mong muốn khi click
  search theo username hiển thị theo input người dùng nhập và hiển thị sẽ thay đổi theo
  có nút delete được user trong list (chưa có làm xác nhận, nhấn btn là xóa)
  nút edit --> nhảy qua trang edit , hiển thị thông tin của user đã nhấn nút edit
- các lưu ý
  trang dashboard đã gần như hoàn thành , còn ít vấn đề như page vẫn hiển thị theo maxpage nếu nhập vào ô search dù số user đã giảm đi --> cái này củng không quan trọng lắm cần thì làm

  nghỉ là cần comment lại các hàm , chức năng hàm ... trông khá lộn xộn
