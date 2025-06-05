body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 720px;
    margin: auto;
    padding: 20px;
    background: #fafafa;
    color: #222;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 15px;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  button {
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  #monthYear {
    font-weight: bold;
    font-size: 1.3em;
  }
  
  .day-names, #calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-bottom: 12px;
  }
  
  .day-names div {
    background: #ddd;
    padding: 6px 0;
    font-weight: bold;
    border-radius: 4px;
    user-select: none;
    text-align: center;
    font-size: 0.9em;
  }
  
  #calendar-days div {
    background: white;
    min-height: 60px;       /* 작게 조정 */
    border-radius: 6px;
    border: 1px solid #ccc;
    padding: 4px 6px;       /* 패딩 줄임 */
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 0.85em;
  }
  
  #calendar-days div.inactive {
    background: #f0f0f0;
    color: #aaa;
    cursor: default;
  }
  
  .date-number {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 1em;
  }
  
  .memo-text {
    font-size: 0.75em;
    color: #444;
    flex-grow: 1;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .dday {
    position: absolute;
    bottom: 6px;
    right: 6px;
    background: #e74c3c;
    color: white;
    font-weight: bold;
    font-size: 0.75em;
    padding: 2px 6px;
    border-radius: 5px;
  }
  
  .modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal.active {
    display: flex;
  }
  
  #modal-content {
    background: white;
    padding: 20px 20px 15px;
    width: 320px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.25);
  }
  
  #modal-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
  }
  
  #memo-input {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    resize: vertical;
    padding: 6px 8px;
    font-size: 1em;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  #due-date {
    width: 100%;
    margin-bottom: 15px;
    padding: 6px 8px;
    font-size: 1em;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .modal-buttons button {
    flex: 1;
    margin: 0 3px;
  }
