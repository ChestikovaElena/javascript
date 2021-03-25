/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

window.addEventListener('load', getCookies);

addButton.addEventListener('click', (e) => {
  e.preventDefault();

  const cookieName = addNameInput.value;
  const cookieValue = addValueInput.value;
  let date = new Date(Date.now() + 86400e3);
  date = date.toUTCString();

  if (cookieName && cookieValue) {
    createCookie(cookieName, cookieValue, date);
    displayElement(cookieName, cookieValue, true);
    filterTable();
  } else {
    alert('Заполните все поля');
  }
});

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const currentRow = e.target.closest('tr');
    const nameCookie = getValueFromRow(currentRow, 0);

    deleteCookieByName(nameCookie);
    deleteCookieFromTable(currentRow);
  }
});

filterNameInput.addEventListener('input', function (e) {
  e.preventDefault();

  filterTable();
});

function createCookie(name, value, date) {
  document.cookie =
    encodeURIComponent(name) +
    '=' +
    encodeURIComponent(value) +
    '; path=/; expires=' +
    date;
}

function displayElement() {
  const row = document.createElement('tr');

  for (const arg of arguments) {
    const cell = document.createElement('td');

    if (typeof arg === 'string') {
      cell.textContent = arg;
    } else if (typeof arg === 'boolean') {
      const deleteBtn = document.createElement('button');

      deleteBtn.classList.add('btn-delete');
      deleteBtn.textContent = 'удалить';
      deleteBtn.setAttribute('href', 'javascript: void(0);');
      cell.append(deleteBtn);
    }
    row.append(cell);
  }
  listTable.append(row);
}

function getCookies(displayAll = true, chunk) {
  const cookies = document.cookie.split(';');

  if (cookies.length) {
    for (const cookie of cookies) {
      const name = decodeURIComponent(cookie.split('=')[0]);
      const value = decodeURIComponent(cookie.split('=')[1]);

      if (displayAll) {
        displayElement(name, value, true);
      } else if (isMatching(name, chunk) || isMatching(value, chunk)) {
        displayElement(name, value, true);
      }
    }
  }
}

function deleteCookieByName(name) {
  const date = new Date(0);
  document.cookie = name + '=; path=/; expires=' + date.toUTCString();
}

function deleteCookieFromTable(row) {
  listTable.removeChild(row);
}

function getValueFromRow(row, column) {
  return row.cells[column].textContent;
}

function isMatching(full, chunk) {
  return full.toUpperCase().includes(chunk.toUpperCase());
}

function filterTable() {
  const chunk = filterNameInput.value;

  listTable.innerHTML = '';
  getCookies(false, chunk);
}
