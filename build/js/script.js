'use strict';

var showActiveBlock = function () {
  var container = document.querySelector('.membership__wrapper');
  var options = document.querySelector('.options-show');
  var arrows = options.querySelectorAll('.options__item');
  var calc = Math.floor(arrows.length/3);

  if (document.documentElement.clientWidth >= 1200) {
    if (arrows.length < 4) {
      container.style.height = "448px";
    } else {
      for (var i = 0; i < arrows.length; i++) {
        arrows[i].style.marginBottom = "40px";
      }
      container.style.height = calc*488 + "px";
    }
  }
  if (document.documentElement.clientWidth >= 768 &&  document.documentElement.clientWidth < 1200) {
    if (arrows.length < 4) {
      container.style.height = "1424px";
    } else {
      container.style.height = calc*1424 + "px";
    }
  }
  if (document.documentElement.clientWidth >= 320 && document.documentElement.clientWidth < 768) {
    if (arrows.length < 4) {
      container.style.height = "1222px";
    } else {
      container.style.height = calc*1222 + "px";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {

  showActiveBlock();
});

document.addEventListener('DOMContentLoaded', function() {
  var active = 0, prev = 0;
  var slides = document.getElementsByClassName('options');
  var navs = document.getElementsByClassName('time__link');
  for(var i=0; i<navs.length; i++) {
    (function(i) {
      navs[i].addEventListener('click', function() {
        prev = active;
        active = i;
        changeActiveSlide(prev);
      });
    })
  (i);
 }

  var changeActiveSlide = function(prev) {

    slides[prev].classList.remove('options-show');
    slides[active].classList.add('options-show');

    showActiveBlock();

    navs[prev].classList.remove('time-active');
    navs[active].classList.add('time-active');
  }
});

var onToggleSlider = function(classNameSlide, classNameButton) {
  var active = 0, prev = 0;
  var slides = document.getElementsByClassName(classNameSlide);
  var arrows = document.getElementsByClassName(classNameButton);

  for(var i=0; i<arrows.length; i++) {
    arrows[i].addEventListener('click', function(e) {
      prev = active;
      if(!!~e.target.classList[1].indexOf('left')) {
        active-1 >= 0 ? --active : active = slides.length-1;
      } else {
        active+1 <= slides.length-1 ? ++active : active = 0;
      }
      changeActiveSlide(prev);
    });
  }
  var changeActiveSlide = function(prev) {
    slides[prev].classList.remove('show');
    slides[active].classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  onToggleSlider('trainers__slide-des', 'trainers__button');
});

document.addEventListener('DOMContentLoaded', function () {
  onToggleSlider('trainers__slide-tab', 'trainers__button');
});

document.addEventListener('DOMContentLoaded', function () {
  onToggleSlider('trainers__item', 'trainers__button');
});

document.addEventListener('DOMContentLoaded', function () {
  onToggleSlider('comment__block', 'comment__button');
});


var validationName = function (inputName) {
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    true;
  } else {
    inputName.oninput = function () {
      localStorage.setItem('inputName', inputName.value);
    }
  }
  inputName.addEventListener('invalid', function (evt) {
    if (inputName.validity.tooShort) {
      inputName.setCustomValidity('Имя должно быть не менее 3-х символов');
    } else if (inputName.validity.tooLong) {
      inputName.setCustomValidity('Имя не должно быть больше 20-ти символов');
    } else if (inputName.validity.valueMissing) {
      inputName.setCustomValidity('Поле обязательно для заполнения');
    } else {
      inputName.setCustomValidity('');
    }
  });
}

var removeMask = function (input) {
  if (input == null || input == '') {
    return '';
  }
  if (input.substring(0, 3) == '+7(') {
    input = input.substring(3);
  }
  var res = '';
  for (var i = 0; i < input.length; i++) {
    if (input[i] >= '0' && input[i] <= '9') {
      res += input[i];
    }
  }
  return res;
}


var addMask = function (input) {
  var mask = ['+', '7', '(', ' ', ' ', ' ', ')', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' '];
  var k = 0;
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < mask.length; j++) {
      if (mask[j] == ' ') {
        mask[j] = input[i];
        k = j;
        break;
      }
    }
  }
  return k == 0 ? '' : mask.join('').substring(0, k+1);
}

var validationPhone = function (inputPhone) {
  inputPhone.onfocus = function () {
    if (inputPhone.value == '') {
      inputPhone.value = '+7(';
    }
  }
  inputPhone.oninput = function () {
    inputPhone.value = addMask(removeMask(inputPhone.value));
    if (!!window.MSInputMethodContext && !!document.documentMode) {
      true;
    } else {
      localStorage.setItem('inputPhone', removeMask(inputPhone.value));
    }
  }
}

var form = document.querySelector('.form');
var inputName = document.querySelector('.form__input--name');
var inputPhone = document.querySelector('.form__input--phone');

if (!!window.MSInputMethodContext && !!document.documentMode) {
  true;
} else {
  inputName.value = localStorage.getItem('inputName');
  inputPhone.value = addMask(removeMask(localStorage.getItem('inputPhone')));
}

validationName(inputName);
validationPhone(inputPhone);

form.addEventListener('submit', function (evt) {
  if (inputPhone.value.length != 16) {
    evt.preventDefault();
    inputPhone.focus();
  }
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    form.reset();
  } else {
    localStorage.setItem('inputName', '');
    localStorage.setItem('inputPhone', '');
  }
});

var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
var animationTime = 500;
var framesCount = 75;
anchors.forEach(function(item) {
  item.addEventListener('click', function(evt) {
    evt.preventDefault();
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top;
    let scroller = setInterval(function() {
      let scrollBy = coordY / framesCount;
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  });
});
