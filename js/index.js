$('document').ready(function() {

  function Popup(domObject) {
    this.close = function() {
      $(domObject).addClass('popup--hidden');
    };

    this.open = function() {
      $(domObject).removeClass('popup--hidden');
    };

    this._handleSubmit = function() {
      console.log('No submit handler specified for this popup');
    };

    this.setSubmitHandler = function(handler) {
      this._handleSubmit = handler;
      $(domObject).find('.popup__ok-button').unbind('click');
      $(domObject).find('.popup__ok-button').click(this._handleSubmit);
    };

    this.initialize = function() {
      $(domObject).find('.popup__cross-button').click(this.close);
      $(domObject).find('.popup__ok-button').click(this._handleSubmit);
    };
  }

  function InputPopup(domObject) {
    Popup.call(this, domObject);

    this._errorMessage = 'Неверный ввод';

    this.showError = function() {
      alert(this._errorMessage);
    }

    this.validate = function(callback) {
      if (!this._validator(this._value)) {
        this.showError();
        return;
      }
      callback();
    };

    this._validator = function(value) {
      console.log('No validator specified for this popup');
      return true;
    };

    this.setValidator = function(validator) {
      this._validator = validator;
    };

    this.initialize = function() {
      alert(Popup.initialize);
    }
  }

  function SlideBlockPopup(domObject) {
    Popup.call(this, domObject);

  }

  var inputPopup, slideBlockPopup;

  inputPopup = $('.input-popup');
  $.extend(inputPopup, new InputPopup(inputPopup));
  inputPopup.initialize();

  slideBlockPopup = $('.slide-block-popup');
  $.extend(slideBlockPopup, new SlideBlockPopup(slideBlockPopup));
  slideBlockPopup.initialize();

  inputPopup.setSubmitHandler(function() {
    inputPopup.validate(function() {
      inputPopup.close();
      slideBlockPopup.open();
    });
  });

  inputPopup.setValidator(function(value) {
    try {
      JSON.parse(value);
    }
    catch(e) {
      if (e.name === 'SyntaxError') {
        return false;
      }
      throw e;
    }
    return true;
  });

  inputPopup.open();
  inputPopup.initialize();

});