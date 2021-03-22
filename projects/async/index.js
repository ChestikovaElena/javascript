/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');
/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

function loadTowns() {
  onLoad();
  return new Promise(function (resolve, reject) {
    fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json') //
      .then((response) => {
        return response.json();
      })
      .then((towns) => {
        const sortTowns = towns.sort((a, b) => (a.name > b.name ? 1 : -1));
        resolve(sortTowns);
        onLoadSuccess();
      })
      .catch(() => {
        reject();
        onLoadError();
      });
  });
}

function isMatching(full, chunk) {
  return full.toUpperCase().includes(chunk.toUpperCase());
}

function onLoad() {
  loadingBlock.style.display = 'block';
  filterBlock.style.display = 'none';
  loadingFailedBlock.style.display = 'none';
}

function onLoadSuccess() {
  loadingBlock.style.display = 'none';
  filterBlock.style.display = 'block';
  loadingFailedBlock.style.display = 'none';
}

function onLoadError() {
  loadingBlock.style.display = 'none';
  filterBlock.style.display = 'none';
  loadingFailedBlock.style.display = 'block';

  retryButton.addEventListener('click', () => {
    loadTowns();
  });
}

loadTowns().then((towns) => {
  filterInput.addEventListener('input', function (event) {
    // const currentList = filterResult.querySelectorAll('div');

    // for (let item of currentList) {
    //   item.remove();
    // }

    const targetValue = event.target.value;
    filterResult.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < towns.length; i++) {
      if (isMatching(towns[i].name, targetValue)) {
        const div = document.createElement('div');
        div.textContent = towns[i].name;
        fragment.append(div);
      }
    }
    filterResult.append(fragment);
    if (targetValue === '') {
      filterResult.innerHTML = '';
    }
  });
});

export { loadTowns, isMatching };
