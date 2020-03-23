'use strict';
var ESC_KEYCODE = 27;

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

var validationMessage = function (inputMessage) {
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    true;
  } else {
    inputMessage.oninput = function () {
      localStorage.setItem('inputMessage', inputMessage.value);
    }
  }

  inputMessage.addEventListener('invalid', function (evt) {
    if (inputMessage.validity.valueMissing) {
      inputMessage.setCustomValidity('Задайте Ваш вопрос');
    } else {
      inputMessage.setCustomValidity('');
    }
  });
}

var form = document.querySelector('.form');
var inputName = document.querySelector('.form__name');
var inputPhone = document.querySelector('.form__phone');
var inputMessage = document.querySelector('.form__text');

if (!!window.MSInputMethodContext && !!document.documentMode) {
  true;
} else {
  inputName.value = localStorage.getItem('inputName');
  inputPhone.value = addMask(removeMask(localStorage.getItem('inputPhone')));
  inputMessage.value = localStorage.getItem('inputMessage');
}

validationName(inputName);
validationPhone(inputPhone);
validationMessage(inputMessage);

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
    localStorage.setItem('inputMessage', '');
  }
});

var renderModal = function () {
  var overflow = document.querySelector('body');
  var modal = document.querySelector('.modal');
  if (modal.classList.contains('modal__closed')) {
    modal.classList.remove('modal__closed');
    modal.classList.add('modal__open');
    overflow.classList.add('scroll-hidden');
  } else {
    modal.classList.add('modal__closed');
    modal.classList.remove('modal__open');
    overflow.classList.remove('scroll-hidden');
  }
  var closedModal = modal.querySelector('.modal__toggle');
  closedModal.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal__open');
    overflow.classList.remove('scroll-hidden');
    modal.classList.add('modal__closed');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      modal.classList.remove('modal__open');
      overflow.classList.remove('scroll-hidden');
      modal.classList.add('modal__closed');
    }
  });
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    true;
  } else {
    document.addEventListener('click', function (evt) {
      if (evt.target.matches('.modal__overlay')) {
        modal.classList.remove('modal__open');
        overflow.classList.remove('scroll-hidden');
        modal.classList.add('modal__closed');
      }
    });
  }
}

var openModal = document.querySelector('.page-header__toggle');
openModal.addEventListener('click', function (evt) {
  evt.preventDefault();
  renderModal();
  document.querySelector('.modal__name').focus();
  var form = document.querySelector('.modal__form');
  var inputName = document.querySelector('.modal__name');
  var inputPhone = document.querySelector('.modal__phone');
  var inputMessage = document.querySelector('.modal__text');

  if (!!window.MSInputMethodContext && !!document.documentMode) {
    true;
  } else {
    inputName.value = localStorage.getItem('inputName');
    inputPhone.value = addMask(removeMask(localStorage.getItem('inputPhone')));
    inputMessage.value = localStorage.getItem('inputMessage');
  }

  validationName(inputName);
  validationPhone(inputPhone);
  validationMessage(inputMessage);

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
      localStorage.setItem('inputMessage', '');
    }
  });
});

var accordions = document.getElementsByClassName("accordion");
var open = document.getElementsByClassName('accordion-open');
for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    if (open.length > 0 && open[0] !== this)
      open[0].classList.remove('accordion-open');
      this.classList.toggle('accordion-open');
  }
}

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
