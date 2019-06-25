const inventory = document.querySelector('.js-inventory');
const submit = document.querySelector('.js-submit');

function renderList(data) {
  const list = document.createElement('ul');
  data.data.forEach(element => {
    const item = document.createElement('li');
    const name = document.createElement('p');
    const description = document.createElement('p');
    
    item.setAttribute('class', 'item');
    item.setAttribute('id', `${element.id}`);
    name.setAttribute('class', 'item__name');
    description.setAttribute('class', 'item__description');

    name.innerHTML = `${element.name}`;
    description.innerHTML = `${element.description}`;

    item.appendChild(name);

    if (element.year) { dataCars(item, element)}

    item.appendChild(description);
    list.appendChild(item);
  });
  inventory.appendChild(list);
}

function dataCars(item, element) {
  const year = document.createElement('p');
  const color = document.createElement('p');
  const date = document.createElement('p');

  year.innerHTML = `${element.year}`;
  color.innerHTML = `${element.color}`;
  date.innerHTML = `${element.date}`;

  year.setAttribute('class', 'item__year');
  color.setAttribute('class', 'item__color');
  date.setAttribute('class', 'item__date');

  item.appendChild(year);
  item.appendChild(color);
  item.appendChild(date);
}

function getJson(url, funct) {
  fetch(url)
    .then(data => {
      return data.json()
    })
    .then((data) => {
      console.log(data);
      if (typeof funct === 'function') {
        funct(data);
      }
    });
}

window.onload = function() {
  getJson('http://localhost:1234/api/v1/cars', renderList);
};