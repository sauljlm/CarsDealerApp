const inventory = document.querySelector('.js-inventory');
const inventoryBrands = document.querySelector('.js-all-brands'); 
const submit = document.querySelector('.js-submit');
const nav = document.querySelector('.js-nav');
const popUpCar = document.querySelector('.form-car');
const popUpBrand = document.querySelector('.form-brand');
const btnAddBrand = document.querySelector('.add-brand');

function renderNav() {
  const button = document.createElement('button');
  const addCars = document.createElement('button');

  button.setAttribute('class', 'btn-inventory');
  addCars.setAttribute('class', 'btn-add');

  button.innerHTML = 'Brands';
  addCars.innerHTML = 'addCar';

  button.addEventListener('click', () => {
    inventoryBrands.classList.toggle('active');
  });

  addCars.addEventListener('click', ()=> {
    popUpCar.classList.toggle('popUp-active');
  });

  nav.appendChild(button);
  nav.appendChild(addCars);
} 

function renderList(data) {
  const list = document.createElement('ul');
  list.setAttribute('class', 'list-cars');
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

function renderListBrands(data) {
  const list = document.createElement('ul');
  list.setAttribute('class', 'list-brands');
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
    item.appendChild(description);
    list.appendChild(item);
  });
  inventoryBrands.appendChild(list);
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
      if (typeof funct === 'function') {
        funct(data);
      } 
    });
}

window.onload = function() {
  getJson('http://localhost:1234/api/v1/cars', renderList);
  getJson('http://localhost:1234/api/v1/brands', renderListBrands);
  renderNav();
};

btnAddBrand.addEventListener('click', () => {
  popUpBrand.classList.toggle('popUp-active');
});
