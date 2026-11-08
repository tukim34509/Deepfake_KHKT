
        const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_EQWndRl0oxjcNZqQ7TJMRDG3i9JYwtgpqUzE9I8_mPu3Eip5XWVm8yaBqt8KJ3xIUq-svtkwyvE/pub?output=csv';

        // Tùy chỉnh vị trí các cột trong file Google Sheets (Index bắt đầu từ 0)
        // Nếu file của bạn có cấu trúc khác, hãy đổi các số bên dưới cho khớp
        const CONFIG = {
            colQuestion: 1,       // Cột chứa nội dung câu hỏi
            colOptionsStart: 2,   // Cột chứa đáp án A (Các đáp án tiếp theo sẽ nằm ở cột 3, 4, 5)
            colImage1: 6,         // Cột chứa link ảnh 1 (Nếu có)
            colImage2: 7          // Cột chứa link ảnh 2 (Nếu có)
        };

        // ---------------------------------------------------------
        // 2. BIẾN TOÀN CỤC (STATE)
        // ---------------------------------------------------------
        let questions = [];
        let currentIdx = 0;
        let score = 0;
        let streak = 0;

        const questionTextEl = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const progressDisplay = document.getElementById('progress-display');
        const scoreDisplay = document.getElementById('score-display');
        const streakDisplay = document.getElementById('streak-display');
        const imageContainer = document.getElementById('image-compare-container');
        const imageA = document.getElementById('image-a');
        const imageB = document.getElementById('image-b');

        // Bắt đầu tải dữ liệu khi trang vừa mở
        window.onload = loadData;

        // ---------------------------------------------------------
        // 3. HÀM XỬ LÝ DATA
        // ---------------------------------------------------------
        async function loadData() {
            try {
                const response = await fetch(CSV_URL);
                const csvText = await response.text();
                parseCSV(csvText);
                
                if (questions.length > 0) {
                    renderQuestion();
                } else {
                    questionTextEl.innerText = "Không tìm thấy câu hỏi nào trong file.";
                }
            } catch (error) {
                console.error("Lỗi tải dữ liệu CSV:", error);
                questionTextEl.innerText = "Lỗi kết nối. Không thể tải dữ liệu từ Google Sheets.";
            }
        }

        // Hàm bóc tách file CSV xử lý cả những ô có chứa dấu phẩy bên trong dấu ngoặc kép
        function parseCSV(text) {
            const lines = text.split('\n');
            
            // Bỏ qua dòng số 0 (thường là tiêu đề cột)
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                const cols = parseCsvRow(lines[i]);
                
                let qText = cols[CONFIG.colQuestion] || "";
                if (!qText.trim()) continue; // Bỏ qua nếu dòng trống không có câu hỏi

                let options = [];
                // Lấy 4 cột đáp án liền kề
                for(let j = 0; j < 4; j++) {
                    let optText = cols[CONFIG.colOptionsStart + j];
                    if (optText) options.push(optText.trim());
                }

                questions.push({
                    question: qText,
                    options: options,
                    imgA: cols[CONFIG.colImage1] ? cols[CONFIG.colImage1].trim() : "",
                    imgB: cols[CONFIG.colImage2] ? cols[CONFIG.colImage2].trim() : ""
                });
            }
        }

        // Thuật toán tách dòng CSV tiêu chuẩn
        function parseCsvRow(rowStr) {
            const r = [];
            let inQuotes = false;
            let currentStr = '';
            for (let i = 0; i < rowStr.length; i++) {
                let char = rowStr[i];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    r.push(currentStr);
                    currentStr = '';
                } else {
                    currentStr += char;
                }
            }
            r.push(currentStr);
            return r;
        }

        // ---------------------------------------------------------
        // 4. HÀM HIỂN THỊ GIAO DIỆN CÂU HỎI
        // ---------------------------------------------------------
        function renderQuestion() {
            const q = questions[currentIdx];
            
            // Cập nhật text
            progressDisplay.innerText = `Câu ${currentIdx + 1} / ${questions.length}`;
            questionTextEl.innerText = q.question;

            // Xử lý hình ảnh
            if (q.imgA || q.imgB) {
                imageContainer.classList.remove('hidden');
                imageA.src = q.imgA || "https://placehold.co/600x400/eeeeee/999999?text=No+Image";
                imageB.src = q.imgB || "https://placehold.co/600x400/eeeeee/999999?text=No+Image";
            } else {
                imageContainer.classList.add('hidden');
            }

            // Xóa đáp án cũ
            optionsContainer.innerHTML = '';
            
            const labels = ['A', 'B', 'C', 'D'];
            
            q.options.forEach((opt, index) => {
                let isCorrect = false;
                let displayText = opt;
                
                // KIỂM TRA ĐÁP ÁN ĐÚNG BẰNG KÝ HIỆU "D-" 
                // VÀ LOẠI BỎ NÓ KHỎI CHUỖI HIỂN THỊ
                if (displayText.startsWith('D-') || displayText.startsWith('d-')) {
                    isCorrect = true;
                    displayText = displayText.substring(2).trim(); // Bỏ chữ D- ở đầu
                }

                // Tạo nút bấm
                const btn = document.createElement('button');
                btn.className = "text-left bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-lg p-4 transition flex items-center gap-3 group";
                btn.dataset.correct = isCorrect;
                
                btn.innerHTML = `
                    <span class="w-6 h-6 flex-shrink-0 rounded bg-white border border-slate-300 group-hover:border-blue-400 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-blue-600">${labels[index] || '-'}</span>
                    <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-900">${displayText}</span>
                `;
                
                btn.onclick = () => handleAnswer(btn, isCorrect);
                optionsContainer.appendChild(btn);
            });
        }

        // ---------------------------------------------------------
        // 5. XỬ LÝ LOGIC KHI NGƯỜI DÙNG CHỌN ĐÁP ÁN
        // ---------------------------------------------------------
        function handleAnswer(selectedBtn, isCorrect) {
            // 1. Khóa tất cả các nút để tránh bấm nhiều lần
            const allBtns = optionsContainer.querySelectorAll('button');
            allBtns.forEach(btn => btn.disabled = true);

            // 2. Kiểm tra đúng sai và tô màu
            if (isCorrect) {
                selectedBtn.classList.add('btn-correct');
                score += 50; // Cộng điểm
                streak += 1; // Tăng chuỗi
            } else {
                selectedBtn.classList.add('btn-wrong');
                streak = 0; // Đứt chuỗi
                
                // Tự động bôi xanh đáp án đúng để người dùng biết
                allBtns.forEach(btn => {
                    if (btn.dataset.correct === "true") {
                        btn.classList.add('btn-correct');
                    }
                });
            }

            // Cập nhật điểm lên UI
            scoreDisplay.innerText = score;
            streakDisplay.innerText = streak + " trận liên tiếp";

            // 3. Đợi 2 giây rồi tự động chuyển câu tiếp theo
            setTimeout(() => {
                currentIdx++;
                if (currentIdx < questions.length) {
                    renderQuestion();
                } else {
                    showFinalResult();
                }
            }, 2000);
        }

        function showFinalResult() {
            imageContainer.classList.add('hidden');
            optionsContainer.innerHTML = '';
            questionTextEl.innerHTML = `
                <div class="text-center py-10">
                    <i class="fa-solid fa-trophy text-5xl text-yellow-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-blue-900 mb-2">Chúc mừng bạn đã hoàn thành!</h3>
                    <p class="text-slate-600">Tổng điểm: <strong class="text-blue-600">${score}</strong></p>
                    <button onclick="location.reload()" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Chơi Lại</button>
                </div>
            `;
        }