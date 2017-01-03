'use strict'


function Element(selector) {
	this._selector = selector;
	this.element = document.querySelector(this._selector);
}

Element.prototype.addClass = function(cssClass) {
    this.element.classList.add(cssClass);
}

Element.prototype.removeClass = function(cssClass) {
    this.element.classList.remove(cssClass);
}

Element.prototype.hide = function() {
    this.element.classList.add('hide');
}

Element.prototype.show = function() {
    this.element.classList.remove('hide');
}

InputElement.prototype = Object.create(Element.prototype);
InputElement.prototype.constructor = InputElement;

function InputElement(selector) {
    Element.apply(this, arguments);
}

InputElement.prototype.focus = function() {
    this.element.focus();
}

var form = new Element('.login-form');
var bg = new Element('.background');
var loginInput = new InputElement('.login-form__input_user');
var passwordInput = new InputElement('.login-form__input_password');
var storage = localStorage.getItem("login");

document.addEventListener("click", function(event) {
	var target = event.target;
    //console.log(target);


	if (target.classList.contains('user-block') || target.classList.contains('user-block__link')) {
        event.preventDefault()
        bg.show();
        form.show();

        if (storage) {
            loginInput.element.value = storage;
            passwordInput.focus();
        } else {
            loginInput.focus();
        }
	}

	if (target.classList.contains('background')) {
        bg.hide();
        form.hide();
    }

    if (target.classList.contains('login-form__cross')) {
        bg.hide();
        form.hide();
    }
});


form.element.addEventListener("submit", function (event) {
    if (!loginInput.element.value || !passwordInput.element.value) {
        console.log("Нужно ввести логин и пароль");

        form.addClass('login-form_error');
        event.preventDefault();

        setTimeout(function() {
            form.removeClass('login-form_error')
        }, 2000);

    } else {
        localStorage.setItem("login", loginInput.element.value);
    }


});

window.addEventListener("keydown", function(event){
    if(event.keyCode === 27) {
        bg.hide();
        form.hide();
    }
});