const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('monthYear');

const modal = document.getElementById('modal');
const modalDateElem = document.getElementById('modal-date');
const memoInput = document.getElementById('memo-input');
const dueDateInput = document.getElementById('due-date');
const saveBtn = document.getElementById('save-btn');
const deleteBtn = document.getElementById('delete-btn');
const closeBtn = document.getElementById('close-btn');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();
let memos = JSON.parse(localStorage.getItem('memos') || '{}');
let selectedDateKey = null;

function saveToStorage() {
  localStorage.setItem('memos', JSON.stringify(memos));
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDDay(dueDateStr) {
  if (!dueDateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dueDateStr);
  dueDate.setHours(0, 0, 0, 0);
  const diff = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'D-day';
  else if (diff > 0) return `D-${diff}`;
  else return `D+${-diff}`;
}

function renderCalendar(date) {
  calendarDays.innerHTML = ''; // 초기화

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${year}년 ${month + 1}월`;

  // 빈 칸 채우기
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('inactive');
    calendarDays.appendChild(emptyCell);
  }

  // 날짜 채우기
  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('div');
    cell.classList.add('active-day');

    const dateKey = formatDateKey(new Date(year, month, day));
    cell.dataset.date = dateKey;

    cell.innerHTML = `
      <div class="date-number">${day}</div>
      <div class="memo-text">${memos[dateKey]?.text || ''}</div>
    `;

    if (memos[dateKey]?.dueDate) {
      const dday = getDDay(memos[dateKey].dueDate);
      if (dday) {
        const ddaySpan = document.createElement('span');
        ddaySpan.className = 'dday';
        ddaySpan.textContent = dday;
        cell.appendChild(ddaySpan);
      }
    }

    cell.addEventListener('click', () => openModal(dateKey));
    calendarDays.appendChild(cell);
  }
}

function openModal(dateKey) {
  selectedDateKey = dateKey;
  modalDateElem.textContent = `${dateKey} 메모`;
  memoInput.value = memos[dateKey]?.text || '';
  dueDateInput.value = memos[dateKey]?.dueDate || '';
  modal.classList.add('active');
  memoInput.focus();
}

function closeModal() {
  modal.classList.remove('active');
}

function saveMemo() {
  const text = memoInput.value.trim();
  const dueDateVal = dueDateInput.value;

  if (text) {
    memos[selectedDateKey] = { text, dueDate: dueDateVal };
  } else {
    delete memos[selectedDateKey];
  }
  saveToStorage();
  renderCalendar(currentDate);
  closeModal();
}

function deleteMemo() {
  delete memos[selectedDateKey];
  saveToStorage();
  renderCalendar(currentDate);
  closeModal();
}

saveBtn.addEventListener('click', saveMemo);
deleteBtn.addEventListener('click', deleteMemo);
closeBtn.addEventListener('click', closeModal);

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
