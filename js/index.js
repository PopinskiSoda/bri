$('document').ready(function() {

  var BLOCKS = {
    popup: 'popup',
    popupBackground: 'popup-background',
    slideBlockPopup: 'slide-block-popup'
  };

  function bem() {
    var
      block, element, modifier,
      blockString, elementString, modifierString;

    if (arguments.length === 1 && typeof(arguments[0]) === 'object') {
      block = arguments[0].block;
      element = arguments[0].element;
      modifier = arguments[0].modifier;
    }
    else {
      block = arguments[0];
      element = arguments[1];
      modifier = arguments[2];
    }

    blockString = block || '';
    elementString = element ? '__' + element : '';
    modifierString = modifier ? '--' + modifier : '';

    return blockString + elementString + modifierString;
  }

  function bemSelector() {
    return '.' + bem.apply(null, arguments);
  }

  /**
   * [Popup description]
   * @param {[type]} $object [description]
   */
  function Popup($object) {
    this._$object = $object;
    this._$popupBackground = null;
  }

  Popup.prototype.open = function() {
    $(bemSelector(BLOCKS.popupBackground)).removeClass(bem({
      block: BLOCKS.popupBackground,
      modifier: 'hidden'
    }));

    this._$object.removeClass(bem({
      block: BLOCKS.popup,
      modifier: 'hidden'
    }));
  };

  Popup.prototype.close = function() {
    $(bemSelector(BLOCKS.popupBackground)).addClass(bem({
      block: BLOCKS.popupBackground,
      modifier: 'hidden'
    }));

    this._$object.addClass(bem({
      block: BLOCKS.popup,
      modifier: 'hidden'
    }));
  };

  Popup.prototype._handleSubmit = function() {
    console.log('No submit handler specified for this popup');
  };

  Popup.prototype.setSubmitHandler = function(handler) {
    this._handleSubmit = handler;
    this._$object.find('.popup__ok-button').unbind('click');
    this._$object.find('.popup__ok-button').click(this._handleSubmit.bind(this));
  };

  Popup.prototype.initialize = function() {
    this._$object.find('.popup__cross-button').unbind('click');
    this._$object.find('.popup__ok-button').unbind('click');
    this._$object.find('.popup__cross-button').click(this.close.bind(this));
    this._$object.find('.popup__ok-button').click(this._handleSubmit.bind(this));
    this._$popupBackground = $('.popup-background');
  };

  /**
   * [InputPopup description]
   * @param {[type]} $object [description]
   */
  function InputPopup($object) {
    Popup.apply(this, arguments);
    this._errorMessage = 'Неверный ввод';
    this._value = '';
  }

  InputPopup.prototype = Object.create(Popup.prototype);

  InputPopup.prototype.constructor = InputPopup;

  InputPopup.prototype.showError = function() {
    alert(this._errorMessage);
  };

  InputPopup.prototype.validateInput = function(callback) {
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

  InputPopup.prototype.getValue = function() {
    return this._value;
  };

  InputPopup.prototype.initialize = function() {
    Popup.prototype.initialize.apply(this, arguments);

    var self, $textarea;

    self = this;
    $textarea = this._$object.find('.popup__textarea');

    this._value = $textarea.val();
    $textarea.unbind('change');
    $textarea.change(function(event) {
      self._value = event.target.value;
    });
  };

  /**
   * [SlideBlock description]
   * @param {[type]} $parent [description]
   */
  function SlideBlock(imageURL) {
    this._$object = null;
    this._imageURL = imageURL;
    this._comment = '';
  }

  SlideBlock.prototype.appendTo = function($parent) {
    this._$object.appendTo($parent);
  };

  SlideBlock.prototype.getImageURL = function() {
    return this._imageURL;
  };

  SlideBlock.prototype.getComment = function() {
    return this._comment;
  };

  SlideBlock.prototype.initialize = function() {
    var self, block, $input;
    
    self = this;
    block = 'slide-block-popup';

    $input = $('<input/>')
      .addClass(bem(block, 'field-input'))
      .attr({type: 'text'});

    $input.unbind('change');
    $input.change(function(event) {
      self._comment = event.target.value;
    });

    this._$object = $('<div></div>')
      .addClass(bem(block, 'slide-block'))
      .append(
        $('<div></div>')
          .addClass(bem(block, 'slide-block-column'))
          .append(
            $('<img/>')
              .addClass(bem(block, 'image-preview'))
              .attr({src: this._imageURL})
          )
      )
      .append(
        $('<div></div>')
          .addClass(bem(block, 'slide-block-column'))
          .append(
            $('<div></div>')
              .addClass(bem(block, 'field'))
              .append(
                $('<div></div>')
                  .addClass(bem(block, 'field-label'))
                  .html('Комментарий')
              )
              .append($input)
              .append(
                $('<button></button>')
                  .addClass(bem(block, 'field-button'))
                  .html('Удалить')
              )
          )
      );
  };

  /**
   * [SlideBlockPopup description]
   * @param {[type]} $object [description]
   */
  function SlideBlockPopup($object) {
    Popup.apply(this, arguments);

    this._$contentWrapper = null;
    this._slideBlocks = [];
  }

  SlideBlockPopup.prototype = Object.create(Popup.prototype);

  SlideBlockPopup.prototype.constructor = SlideBlockPopup;

  SlideBlockPopup.prototype.addSlideBlock = function(imageURL) {
    var slideBlock = new SlideBlock(imageURL);

    slideBlock.initialize();
    slideBlock.appendTo(this._$contentWrapper);
    this._slideBlocks.push(slideBlock);
  };

  SlideBlockPopup.prototype.addSlideBlocks = function(imageURLs) {
    for (var i=0; i<imageURLs.length; i++) {
      this.addSlideBlock(imageURLs[i]);
    }
  };

  SlideBlockPopup.prototype.getSlideBlocks = function() {
    return this._slideBlocks;
  };

  SlideBlockPopup.prototype.initialize = function() {
    Popup.prototype.initialize.apply(this, arguments);

    this._$contentWrapper = this._$object.find(
      bemSelector(BLOCKS.slideBlockPopup, 'content-wrapper')
    );
  };

  function stringsArrayValidator(value) {
    var strings;

    try {
      strings = JSON.parse(value);
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

    if (!strings.every(function(item) {return typeof(item) === "string";})) {
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

  inputPopup.setValidator(stringsArrayValidator);

  inputPopup.open();

  inputPopup.setSubmitHandler(function() {
    inputPopup.validateInput(function() {
      var value, imageURLs;

      value = inputPopup.getValue();
      imageURLs = JSON.parse(value);

      inputPopup.close();

      slideBlockPopup.addSlideBlocks(imageURLs);
      slideBlockPopup.open();
    });
  });

  slideBlockPopup.setSubmitHandler(function() {
    var slideBlocks = slideBlockPopup.getSlideBlocks();

    for (var i=0; i<slideBlocks.length; i++) {
      console.log(slideBlocks[i].getImageURL(), slideBlocks[i].getComment());
    }

    slideBlockPopup.close();
  });

});