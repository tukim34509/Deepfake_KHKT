 document.addEventListener('DOMContentLoaded', () => {
            // DOM Elements - Upload
            const dropZone = document.getElementById('drop-zone');
            const fileInput = document.getElementById('media-upload');
            const uploadPlaceholder = document.getElementById('upload-placeholder');
            const previewArea = document.getElementById('preview-area');
            const imagePreview = document.getElementById('image-preview');
            const videoPreview = document.getElementById('video-preview');
            const removeBtn = document.getElementById('remove-file-btn');
            const scanBtn = document.getElementById('scan-btn');
            
            // DOM Elements - States
            const idleState = document.getElementById('idle-state');
            const scanningState = document.getElementById('scanning-state');
            const resultState = document.getElementById('result-state');
            const scanStatusText = document.getElementById('scan-status-text');
            const scanProgressBar = document.getElementById('scan-progress-bar');
            
            // DOM Elements - Results
            const resultTitle = document.getElementById('result-title');
            const resultHeader = document.getElementById('result-header');
            const resultBadge = document.getElementById('result-badge');
            const fileNameDisplay = document.getElementById('file-name-display');
            const resultCircle = document.getElementById('result-circle');
            const aiPercentage = document.getElementById('ai-percentage');
            const resultDescription = document.getElementById('result-description');
            const processTime = document.getElementById('process-time');
            const fileTypeDisplay = document.getElementById('file-type-display');
            
            const resultImg = document.getElementById('result-img');
            const resultVideo = document.getElementById('result-video');
            const aiOverlays = document.getElementById('ai-overlays');
            const resultScanLine = document.getElementById('result-scan-line');
            const resetBtn = document.getElementById('reset-btn');

            let currentFile = null;

            // --- 1. UPLOAD HANDLING ---
            
            // Click to open file dialog
            dropZone.addEventListener('click', (e) => {
                if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
                    fileInput.click();
                }
            });

            // Drag & Drop
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('border-blue-500', 'bg-blue-100');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-blue-500', 'bg-blue-100');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-blue-500', 'bg-blue-100');
                if (e.dataTransfer.files.length > 0) {
                    handleFile(e.dataTransfer.files[0]);
                }
            });

            // File input change
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleFile(e.target.files[0]);
                }
            });

            // Remove file
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Ngăn không cho nổi bọt tới dropZone click
                resetUpload();
            });

            function handleFile(file) {
                // Kiểm tra loại file
                if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                    alert('Chỉ hỗ trợ tải lên Hình ảnh hoặc Video!');
                    return;
                }

                currentFile = file;
                const fileURL = URL.createObjectURL(file);

                uploadPlaceholder.classList.add('hidden');
                previewArea.classList.remove('hidden');

                if (file.type.startsWith('image/')) {
                    imagePreview.src = fileURL;
                    imagePreview.classList.remove('hidden');
                    videoPreview.classList.add('hidden');
                } else if (file.type.startsWith('video/')) {
                    videoPreview.src = fileURL;
                    videoPreview.classList.remove('hidden');
                    imagePreview.classList.add('hidden');
                }

                // Cập nhật giao diện
                scanBtn.disabled = false;
                idleState.classList.remove('hidden');
                resultState.classList.add('hidden');
            }

            function resetUpload() {
                currentFile = null;
                fileInput.value = '';
                uploadPlaceholder.classList.remove('hidden');
                previewArea.classList.add('hidden');
                imagePreview.src = '';
                videoPreview.src = '';
                scanBtn.disabled = true;
                
                idleState.classList.remove('hidden');
                resultState.classList.add('hidden');
                scanningState.classList.add('hidden');
            }


            // --- 2. AI SCANNING SIMULATION ---
            
            scanBtn.addEventListener('click', () => {
                if (!currentFile) return;
                simulateAIScan();
            });

            function simulateAIScan() {
                // 1. Chuyển sang màn hình loading
                idleState.classList.add('hidden');
                resultState.classList.add('hidden');
                scanningState.classList.remove('hidden');
                scanBtn.disabled = true;
                
                let progress = 0;
                scanProgressBar.style.width = '0%';
                
                const texts = [
                    "Trích xuất mã băm (Hash)...", 
                    "Kiểm tra Metadata & EXIF...", 
                    "Phân tích quang học bề mặt...",
                    "Chạy mô hình Diffusion Detection...",
                    "Tổng hợp kết quả..."
                ];

                // Giả lập tiến trình quét (tầm 3 giây)
                const interval = setInterval(() => {
                    progress += 5;
                    scanProgressBar.style.width = `${progress}%`;
                    
                    if(progress % 20 === 0 && progress < 100) {
                        scanStatusText.innerText = texts[(progress/20) - 1];
                    }

                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(showResults, 400); // Đợi bar đầy rồi show
                    }
                }, 120);
            }

            // --- 3. SHOW RESULTS ---

            function showResults() {
                scanningState.classList.add('hidden');
                resultState.classList.remove('hidden');
                resultState.classList.add('flex');
                scanBtn.disabled = false;

                // Chuẩn bị dữ liệu hiển thị
                fileNameDisplay.innerText = currentFile.name.length > 20 ? currentFile.name.substring(0,20) + '...' : currentFile.name;
                fileTypeDisplay.innerText = currentFile.type.split('/')[1];
                processTime.innerText = (Math.random() * (2.5 - 1.2) + 1.2).toFixed(2) + ' Giây'; // Random từ 1.2s - 2.5s

                // Đổ ảnh/video sang khung kết quả
                const fileURL = URL.createObjectURL(currentFile);
                if (currentFile.type.startsWith('image/')) {
                    resultImg.src = fileURL;
                    resultImg.classList.remove('hidden');
                    resultVideo.classList.add('hidden');
                } else {
                    resultVideo.src = fileURL;
                    resultVideo.classList.remove('hidden');
                    resultImg.classList.add('hidden');
                }

                resultScanLine.style.display = 'block';

                // --- Thuật toán giả lập kết quả (Simulate AI vs Real) ---
                // Trong thực tế, bạn sẽ lấy giá trị này từ API
                const isFake = Math.random() > 0.3; // 70% ra fake để test UI
                const score = isFake ? (Math.random() * (99.9 - 85) + 85).toFixed(1) : (Math.random() * (15 - 0.1) + 0.1).toFixed(1);

                aiPercentage.innerText = score + '%';
                
                if (isFake) {
                    // UI cho Cảnh báo AI
                    resultHeader.className = "p-5 flex justify-between items-start border-b bg-red-50 border-red-200";
                    resultTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-red-600"></i> <span class="text-red-700">CẢNH BÁO CAO: PHÁT HIỆN DẤU VẾT AI</span>`;
                    resultBadge.className = "bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm";
                    resultBadge.innerText = "NGUY CƠ LỪA ĐẢO";
                    
                    resultCircle.style.background = `conic-gradient(#dc2626 ${score}%, #fca5a5 0)`;
                    aiPercentage.className = "text-3xl font-extrabold tracking-tighter text-red-600";
                    
                    resultDescription.innerHTML = `Phân tích cho thấy tệp tin có dấu hiệu bị can thiệp bởi thuật toán Deepfake/Generative AI. Cấu trúc vi mô và siêu dữ liệu không khớp với thiết bị ghi hình vật lý thực tế.`;
                    aiOverlays.classList.remove('hidden'); // Hiển thị khung đỏ mô phỏng vết lỗi AI

                } else {
                    // UI cho Ảnh thật (Real)
                    resultHeader.className = "p-5 flex justify-between items-start border-b bg-green-50 border-green-200";
                    resultTitle.innerHTML = `<i class="fa-solid fa-check-circle text-green-600"></i> <span class="text-green-700">AN TOÀN: KHÔNG PHÁT HIỆN DẤU VẾT AI</span>`;
                    resultBadge.className = "bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm";
                    resultBadge.innerText = "XÁC THỰC TỰ NHIÊN";
                    
                    resultCircle.style.background = `conic-gradient(#16a34a ${score}%, #bbf7d0 0)`;
                    aiPercentage.className = "text-3xl font-extrabold tracking-tighter text-green-600";
                    
                    resultDescription.innerHTML = `Tệp tin giữ nguyên cấu trúc quang học tự nhiên. Metadata hợp lệ và không có dấu vết của các thuật toán khuếch tán hình ảnh (Diffusion Models).`;
                    aiOverlays.classList.add('hidden');
                }
            }

            resetBtn.addEventListener('click', () => {
                resetUpload();
            });
        });