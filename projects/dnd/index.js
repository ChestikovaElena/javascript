/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');
let currentDrop,
  zIndex = 1,
  deltaX = 0,
  deltaY = 0;
const MINWIDTH = 50,
  MAXWIDTH = 300,
  MINHEIGHT = 20,
  MAXHEIGHT = 200;

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

export function createDiv() {
  const newDiv = document.createElement('div');

  const width = random(MAXWIDTH, MINWIDTH);
  newDiv.style.width = width + 'px';
  const height = random(MAXHEIGHT, MINHEIGHT);
  newDiv.style.height = height + 'px';
  newDiv.style.backgroundColor =
    '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();

  newDiv.style.left = random(window.innerWidth - width) + 'px';
  newDiv.style.top = random(window.innerHeight - height, MINHEIGHT) + 'px';
  newDiv.draggable = true;
  newDiv.classList.add('draggable-div');

  return newDiv;
}

function random(max, min = 1) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

document.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'DIV') {
    currentDrop = e.target;
    zIndex++;
    currentDrop.style.zIndex = zIndex;
    deltaX = e.pageX - currentDrop.getBoundingClientRect().left;
    deltaY = e.pageY - currentDrop.getBoundingClientRect().top;
  }
});

document.addEventListener('mouseup', (e) => {
  e.preventDefault();

  currentDrop = '';
});

document.addEventListener('mousemove', (e) => {
  e.preventDefault();

  if (currentDrop) {
    currentDrop.style.top = e.pageY - deltaY + 'px';
    currentDrop.style.left = e.pageX - deltaX + 'px';
  }
});
