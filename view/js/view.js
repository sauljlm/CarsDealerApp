const inventory = document.querySelector('.js-inventory');
const inventoryBrands = document.querySelector('.js-all-brands'); 
const nav = document.querySelector('.js-nav');
const popUpCar = document.querySelector('.form-car');
const popUpBrand = document.querySelector('.form-brand');
const btnAddBrand = document.querySelector('.add-brand');

const submitCars = document.querySelector('#btn-submit-car');
const submitBrands = document.querySelector('#btn-submit-brand');
let dataCar = document.querySelectorAll('.imput-car');
let dataBrand = document.querySelectorAll('.imput-brand');

function sendForm(data, url) {
  let params = new URLSearchParams();
  data.forEach((element, index) => {
    params.append(element.name, data[index].value);
  });
  
  fetch(`${url}`, {
    method: 'POST',
    body: params.toString()
  })
}

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
  deleteCar = list;
  data.data.forEach((element, index) => {
    const item = document.createElement('li');
    const name = document.createElement('p');
    const description = document.createElement('p');
    const btnDelete = document.createElement('button');
    
    item.setAttribute('class', 'item');
    item.setAttribute('id', `${index + 1}`);
    name.setAttribute('class', 'item__name');
    description.setAttribute('class', 'item__description');
    btnDelete.setAttribute('class', 'delete-car');
    
    name.innerHTML = `${element.name}`;
    description.innerHTML = `${element.description}`;
    btnDelete.innerHTML = 'Delete';

    btnDelete.addEventListener('click' , () => {
      fetch(`http://localhost:1234/api/v1/cars/${index+1}`, {
        method: 'DELETE'
      })
      document.location.reload();
    });
    
    item.appendChild(name);
    
    dataCars(item, element);
    
    item.appendChild(description);
    item.appendChild(btnDelete);
    list.appendChild(item);
  });
  inventory.appendChild(list);
}

function renderListBrands(data) {
  const list = document.createElement('ul');
  list.setAttribute('class', 'list-brands');
  deleteBrand = list;
  data.data.forEach((element, index) => {
    const item = document.createElement('li');
    const name = document.createElement('p');
    const description = document.createElement('p');
    
    item.setAttribute('class', 'item');
    item.setAttribute('id', `${index + 1}`);
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

submitCars.addEventListener('click', (e)=> {
  e.preventDefault();
  sendForm(dataCar, 'http://localhost:1234/api/v1/cars');
});
submitBrands.addEventListener('click', (e)=> {
  e.preventDefault();
  sendForm(dataBrand, 'http://localhost:1234/api/v1/brands')
});

window.onload = function() {
  getJson('http://localhost:1234/api/v1/cars', renderList);
  getJson('http://localhost:1234/api/v1/brands', renderListBrands);
  renderNav();
};

btnAddBrand.addEventListener('click', () => {
  popUpBrand.classList.toggle('popUp-active');
});
