$('document').ready(function() {

  /**
   * [Popup description]
   * @param {[type]} $domObject [description]
   */
  function Popup($domObject) {
    this._$domObject = $domObject;
  }

  Popup.prototype.close = function() {
    this._$domObject.addClass('popup--hidden');
  };

  Popup.prototype.open = function() {
    this._$domObject.removeClass('popup--hidden');
  };

  Popup.prototype._handleSubmit = function() {
    console.log('No submit handler specified for this popup');
  };

  Popup.prototype.setSubmitHandler = function(handler) {
    this._handleSubmit = handler;
    this._$domObject.find('.popup__ok-button').unbind('click');
    this._$domObject.find('.popup__ok-button').click(this._handleSubmit.bind(this));
  };

  Popup.prototype.initialize = function() {
    this._$domObject.find('.popup__cross-button').unbind('click');
    this._$domObject.find('.popup__ok-button').unbind('click');
    this._$domObject.find('.popup__cross-button').click(this.close.bind(this));
    this._$domObject.find('.popup__ok-button').click(this._handleSubmit.bind(this));
  };

  /**
   * [InputPopup description]
   * @param {[type]} $domObject [description]
   */
  function InputPopup($domObject) {
    Popup.apply(this, arguments);
    this._errorMessage = 'Неверный ввод';
    this._value = '';
  }

  InputPopup.prototype = Object.create(Popup.prototype);

  InputPopup.prototype.constructor = InputPopup;

  InputPopup.prototype.showError = function() {
    alert(this._errorMessage);
  };

  InputPopup.prototype.validate = function(callback) {
    if (!this._validator(this._value)) {
      this.showError();
      return;
    }
    callback();
  };

  InputPopup.prototype._validator = function(value) {
    console.log('No validator specified for this popup');
    return true;
  };

  InputPopup.prototype.setValidator = function(validator) {
    this._validator = validator;
  };

  InputPopup.prototype.initialize = function() {
    Popup.prototype.initialize.apply(this, arguments);
    var self, $textarea;

    self = this;
    $textarea = this._$domObject.find('.popup__textarea');

    this._value = $textarea.val();
    $textarea.unbind('change');
    $textarea.change(function(event) {
      self._value = event.target.value;
      console.log(self);
    });
  };

  /**
   * [SlideBlockPopup description]
   * @param {[type]} $domObject [description]
   */
  function SlideBlockPopup($domObject) {
    Popup.apply(this, arguments);
  }

  SlideBlockPopup.prototype = Object.create(Popup.prototype);

  SlideBlockPopup.prototype.constructor = SlideBlockPopup;

  function stringsArrayValidator(value) {
    try {
      var strings = JSON.parse(value);
    }
    catch(e) {
      if (e.name === 'SyntaxError') {
        return false;
      }
      throw e;
    }

    if (!Array.isArray(strings)) {
      return false;
    }

    if (!strings.every(function(item) {return typeof(item) === "string"})) {
      return false;
    }

    return true;
  }

  /**
   * 
   */
  var inputPopup, slideBlockPopup;

  inputPopup = new InputPopup($('.input-popup'));
  inputPopup.initialize();

  slideBlockPopup = new SlideBlockPopup($('.slide-block-popup'));
  slideBlockPopup.initialize();

  inputPopup.setSubmitHandler(function() {
    inputPopup.validate(function() {
      inputPopup.close();
      slideBlockPopup.open();
    });
  });

  inputPopup.setValidator(stringsArrayValidator);

  inputPopup.open();
  inputPopup.initialize();

});