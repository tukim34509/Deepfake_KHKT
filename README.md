# 🛡️ Ứng dụng Cảnh báo & Nhận diện Deepfake (Deepfake_KHKT)

## 📖 1. Giới thiệu Dự án & Thực trạng công nghệ
Tính đến nay, công nghệ Deepfake đã đạt đến mức độ tinh vi vượt bậc nhờ sự bùng nổ của AI tạo sinh. Các công cụ này có khả năng tạo ra hình ảnh, video và giọng nói giả mạo với độ chân thực gần như hoàn hảo. Người dùng bằng cảm quan thông thường rất khó có thể phân biệt được đâu là sự thật và đâu là sản phẩm nhân bản. Chỉ cần một bức ảnh duy nhất hoặc vài giây ghi âm, hệ thống đã có thể sao chép chính xác nhân dạng và biểu cảm của bất kỳ ai. 

Hơn nữa, phần mềm tạo Deepfake hiện nay cực kỳ dễ tiếp cận, không đòi hỏi kỹ năng lập trình phức tạp hay thiết bị chuyên dụng. Tốc độ xử lý siêu tốc giúp hàng triệu nội dung giả mạo được sản xuất và lan truyền chóng mặt trên các nền tảng mạng xã hội. Thực trạng này đang biến Deepfake từ một công nghệ giải trí thành công cụ lừa đảo phổ biến và khó kiểm soát bậc nhất.

## 💻 2. Nền tảng Công nghệ triển khai
Sản phẩm được phát triển dưới dạng Web Application, tập trung vào khả năng hiển thị trực quan và hỗ trợ người dùng kiểm tra tính chân thật của các dữ liệu truyền thông.
- **Ngôn ngữ phát triển:** HTML5, CSS3, JavaScript (Vanilla).
- **Công cụ lập trình (IDE):** Visual Studio Code.
- **Quản lý mã nguồn:** Git / GitHub.
- **Nền tảng Hosting & CI/CD:** Vercel.

## 🎨 3. Hệ thống Thiết kế (Design System)
Giao diện được quy chuẩn hóa bằng hệ thống biến CSS (CSS Variables), mang lại tính nhất quán cho trải nghiệm người dùng (UX/UI) và hỗ trợ hiển thị các trạng thái quét AI rõ ràng:

```css
:root {
    /* TYPOGRAPHY */
    --font-primary: 'Inter', sans-serif;

    /* BRAND COLORS (Màu hệ thống APP4C) */
    --color-primary: #1e3a8a;       /* Blue 900 - Nút bấm, Logo */
    --color-primary-hover: #1e40af; /* Blue 800 - Hover nút */
    --color-primary-light: #eff6ff; /* Blue 50  - Nền phụ */
    --color-heading: #172554;       /* Blue 950 - Tiêu đề lớn */
    --color-accent: #2563eb;        /* Blue 600 - Chữ nhấn, Link */

    /* STATUS COLORS (Trạng thái kết quả quét AI) */
    --color-danger: #dc2626;        /* Red 600 - Báo động, Lừa đảo */
    --color-danger-light: #fca5a5;  /* Red 300 - Gradient kết quả AI */
    --color-danger-bg: #fef2f2;     /* Red 50  - Nền ô cảnh báo */
    
    --color-success: #16a34a;       /* Green 600 - An toàn, Thật */
    --color-success-light: #bbf7d0; /* Green 200 - Gradient kết quả Thật */
    --color-success-bg: #f0fdf4;    /* Green 50 - Nền ô an toàn */

    --color-warning: #f97316;       /* Orange 500 - Lỗi bất thường nhẹ */

    /* NEUTRAL COLORS (Màu trung tính: Nền, Viền, Chữ) */
    --bg-body: #f8fafc;             /* Slate 50 - Nền trang (body) */
    --bg-surface: #ffffff;          /* White - Nền Card, Header */
    --border-color: #e2e8f0;        /* Slate 200 - Viền chung */
    
    --text-main: #1e293b;           /* Slate 800 - Văn bản chính */
    --text-muted: #64748b;          /* Slate 500 - Văn bản phụ */
}

```

## 🗄️ 4. Kiến trúc Lưu trữ Dữ liệu

Hệ thống kết hợp các giải pháp lưu trữ nhẹ và linh hoạt, không phụ thuộc vào Backend Server truyền thống:

* **Local Storage System:** Xử lý và lưu trữ thông tin, lịch sử tương tác của người dùng trực tiếp trên trình duyệt web, đảm bảo tốc độ phản hồi nhanh chóng và bảo vệ quyền riêng tư.
* **Google Sheets API:** Được tích hợp để lưu trữ và truy xuất cơ sở dữ liệu các câu hỏi trắc nghiệm. Giải pháp này giúp cập nhật nội dung câu hỏi theo thời gian thực một cách liền mạch, dễ dàng quản lý nội dung nội bộ mà không cần phải triển khai lại (re-deploy) ứng dụng.

## 🚀 5. Hướng dẫn Truy cập & Sử dụng

Sản phẩm đã được triển khai hoàn thiện và sẵn sàng để trải nghiệm.

* **Liên kết truy cập (Live Demo):** [https://deepfakekhkt.vercel.app/](https://deepfakekhkt.vercel.app/)

## 👨‍💻 6. Thông tin Tác giả

Dự án được nghiên cứu và phát triển bởi:

* **Kim Quang Tú**
* **Đơn vị:** Sinh viên chuyên ngành Công nghệ Thông tin (Lớp DH25IT03) - Trường Đại học Mở TP.Hồ Chí Minh.
* **Liên hệ Email:** kimquangtu2025@gmail.com
* **Blog cá nhân:** [https://kimquangtu13112007.blogspot.com/](https://kimquangtu13112007.blogspot.com/)

```

```