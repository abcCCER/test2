const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('month-year');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');
const selectedDateEl = document.getElementById('selected-date');
const memoInput = document.getElementById('memo');
const saveBtn = document.getElementById('save');
const deleteBtn = document.getElementById('delete');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();
let memos = {};

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarDays.innerHTML = '';
  monthYear.textContent = `${year}년 ${month + 1}월`;

  // 빈칸 만들기
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendarDays.appendChild(empty);
  }

  // 날짜 채우기
  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('div');
    cell.className = 'day';
    const dateKey = `${year}-${month + 1}-${day}`;
    cell.dataset.date = dateKey;

    cell.innerHTML = `
      <div class="date">${day}</div>
      <div class="memo-preview">${memos[dateKey] || ''}</div>
    `;

    cell.addEventListener('click', () => openModal(dateKey));
    calendarDays.appendChild(cell);
  }
}

function openModal(dateKey) {
  selectedDateEl.textContent = dateKey;
  memoInput.value = memos[dateKey] || '';
  modal.classList.remove('hidden');
}

function closeModalWindow() {
  modal.classList.add('hidden');
}

function saveMemo() {
  const date = selectedDateEl.textContent;
  const text = memoInput.value.trim();
  if (text) {
    memos[date] = text;
  } else {
    delete memos[date];
  }
  renderCalendar(currentDate);
  closeModalWindow();
}

function deleteMemo() {
  const date = selectedDateEl.textContent;
  delete memos[date];
  renderCalendar(currentDate);
  closeModalWindow();
}

// 이벤트 바인딩
closeModal.addEventListener('click', closeModalWindow);
saveBtn.addEventListener('click', saveMemo);
deleteBtn.addEventListener('click', deleteMemo);

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// 최초 실행
renderCalendar(currentDate);