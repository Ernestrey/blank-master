// console.log('test');

let diagram_json = '{"data": [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],'+
    '"categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}';

const diagram = JSON.parse(diagram_json);

let densityCanvas = document.getElementById("densityChart");
let densityData = {
  label: 'Diagram',
  data: diagram.data,
  backgroundColor: [
    'rgba(250, 99, 132, 0.6)',
    'rgba(230, 99, 132, 0.6)',
    'rgba(210, 99, 132, 0.6)',
    'rgba(190, 99, 132, 0.6)',
    'rgba(170, 99, 132, 0.6)',
    'rgba(150, 99, 132, 0.6)',
    'rgba(130, 99, 132, 0.6)',
    'rgba(110, 99, 132, 0.6)',
    'rgba(90, 99, 132, 0.6)',
    'rgba(70, 99, 132, 0.6)',
    'rgba(50, 99, 132, 0.6)',
    'rgba(30, 99, 132, 0.6)',
  ],
  borderWidth: 2,
  hoverBorderWidth: 0
};

let chartOptions = {
  scales: {
    yAxes: [{
      barPercentage: 0.5
    }]
  },
  elements: {
    rectangle: {
      borderSkipped: 'left',
    }
  }
};

let barChart = new Chart(densityCanvas, {
  type: 'horizontalBar',
  data: {
    labels: diagram.categories,
    datasets: [densityData],
  },
  options: chartOptions,
});


let sliders_json = '{"slides": [{"img": "https://i0.wp.com/theverybesttop10.com/wp-content/uploads/2014/10/Top-10-Images-of-Angry-Wet-Cats-6.jpg?fit=586%2C404&ssl=1","info": "Новость","title": "Минобороны: ВКС России уничтожили крупный арсенал украинских войск в Кривом Роге"},'+
    '{"img": "https://www.boredpanda.com/blog/wp-content/uploads/2014/02/funny-wet-cats-1.jpg","info": "Новость","title": "Билл Гейтс спрогнозировал новую пандемию в следующие 20 лет с вероятностью 50%"},'+
    '{"img": "https://i.ytimg.com/vi/AsVQVKmI8pA/maxresdefault.jpg","info": "Новость","title": "Представитель МИД Захарова назвала заявления Шольца про многополярный мир плагиатом"},'+
    '{"img": "https://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2019-01-04_at_5.07.33_PM.png?v=1546639679","info": "Новость","title": "19FortyFive: НАТО столкнулось с трудностями при организации военных учений в Швеции"},'+
    '{"img": "https://i.ytimg.com/vi/317jz-PU7Mg/maxresdefault.jpg","info": "Новость","title": "Экс-командующий ВДВ генерал-полковник Шпак: США запретили Польше вводить войска на Украину"},'+
    '{"img": "https://i.ytimg.com/vi/YSHDBB6id4A/maxresdefault.jpg","info": "Новость","title": "Bloomberg: Еврокомиссия предложила отложить запрет на поставки нефти по «Дружбе»"},'+
    '{"img": "https://preview.redd.it/7aydec8cp6m41.jpg?width=640&crop=smart&auto=webp&s=22d2b330801f064094184eda733e2e6880c58809","info": "Новость","title": "Росавиация продлила ограничение полетов в южные аэропорты до 6 июня"}]}'

const sliders = JSON.parse(sliders_json).slides;

let sliderItems = document.querySelectorAll('.slider__item');

for (let i = 0; i < sliderItems.length; i++) {
  let sliderItem = sliderItems[i];
  let img = document.createElement('img');
  let info = document.createElement('p');
  info.classList.add('info');
  let title = document.createElement('h1');
  title.classList.add('title');

  img.src = sliders[i].img;
  info.innerHTML = sliders[i].info;
  title.innerHTML = sliders[i].title;

  sliderItem.appendChild(img);
  sliderItem.appendChild(info);
  sliderItem.appendChild(title);
}

var WRAPPER_SELECTOR = '.slider__wrapper';
var ITEMS_SELECTOR = '.slider__items';
var ITEM_SELECTOR = '.slider__item';
var CONTROL_CLASS = 'slider__control';  
var SELECTOR_PREV = '.slider__control[data-slide="prev"]';
var SELECTOR_NEXT = '.slider__control[data-slide="next"]';
var SELECTOR_INDICATOR = '.slider__indicators>li';
var CLASS_CONTROL_HIDE = 'slider__control_hide';
  
function ChiefSlider(selector, config) {
var $root = typeof selector === 'string' ?
    document.querySelector(selector) : selector;
this._$root = $root;
this._$wrapper = $root.querySelector(WRAPPER_SELECTOR);
this._$items = $root.querySelector(ITEMS_SELECTOR);
this._$itemList = $root.querySelectorAll(ITEM_SELECTOR);
this._$controlPrev = $root.querySelector(SELECTOR_PREV);
this._$controlNext = $root.querySelector(SELECTOR_NEXT);
this._transform = 0;
this._config = {
    loop: true,
    autoplay: false,
    interval: 5000,
    refresh: true,
    swipe: true,
};
for (var key in config) {
    if (this._config.hasOwnProperty(key)) {
    this._config[key] = config[key];
    }
}
var $itemList = this._$itemList;
var widthItem = $itemList[0].offsetWidth;
var widthWrapper = this._$wrapper.offsetWidth;
var itemsInVisibleArea = Math.round(widthWrapper / widthItem);
this._itemsInVisibleArea = itemsInVisibleArea;
this._transformStep = 100 / itemsInVisibleArea;
this._addEventListener();
}

ChiefSlider.prototype._addEventListener = function() {
var $root = this._$root;
function onClick(e) {
    var $target = e.target;
    if ($target.classList.contains(CONTROL_CLASS)) {
    e.preventDefault();
    this._direction = $target.dataset.slide;
    this._move();
    } else if ($target.dataset.slideTo) {
    var index = parseInt($target.dataset.slideTo);
    this._moveTo(index);
    }
}

$root.addEventListener('click', onClick.bind(this));
};

ChiefSlider.prototype._move = function() {
var step = this._direction ===
    'next' ? -this._transformStep : this._transformStep;
var transform = this._transform + step;
if (!this._config.loop) {
    var endTransformValue =
    this._transformStep * (this._$itemList.length - this._itemsInVisibleArea);
    transform = Math.round(transform * 10) / 10;
    if (transform < -endTransformValue || transform > 0) {
    return;
    }
}
this._transform = transform;
this._$items.style.transform = 'translateX(' + transform + '%)';
};

document.addEventListener('DOMContentLoaded', function () {
const slider = new ChiefSlider('.slider', {
    loop: false
});
});