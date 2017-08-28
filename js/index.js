$('document').ready(function() {

  var
    IMAGE_WIDTH = 500,
    AUTO_SLIDING_DELAY = 7000;

  var BLOCKS = {
    popup: 'popup',
    popupBackground: 'popup-background',
    slideBlockPopup: 'slide-block-popup',
    inputPopup: 'input-popup',
    carousel: 'carousel'
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

  SlideBlock.prototype._handleDelete = function() {
    console.log("No delete handler specified for this slideBlock")
  }

  SlideBlock.prototype.setDeleteHandler = function(handler) {
    this._handleDelete = handler;
  }

  SlideBlock.prototype.initialize = function() {
    var self, block, $input, $deleteButton;
    
    self = this;
    block = 'slide-block-popup';

    $input = $('<input/>')
      .addClass(bem(block, 'field-input'))
      .attr({type: 'text'});

    $input.unbind('change');
    $input.change(function(event) {
      self._comment = event.target.value;
    });

    $deleteButton = $('<button></button>')
      .addClass(bem(block, 'field-button'))
      .html('Удалить');

    $deleteButton.unbind('click');
    $deleteButton.click(this._handleDelete);

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
              .append($deleteButton)
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
    slideBlock.setDeleteHandler(function(){
      this.deleteSlideBlock(this._slideBlocks.length)
    }.bind(this));
    slideBlock.appendTo(this._$contentWrapper);

    this._slideBlocks.push(slideBlock);
  };

  SlideBlockPopup.prototype.addSlideBlocks = function(imageURLs) {
    for (var i=0; i<imageURLs.length; i++) {
      this.addSlideBlock(imageURLs[i]);
    }
  };

  SlideBlockPopup.prototype.initSlideBlocks = function(imageURLs) {
    this._slideBlocks = [];
    this.addSlideBlocks(imageURLs);
  }

  SlideBlockPopup.prototype.getSlideBlocks = function() {
    return this._slideBlocks;
  };

  SlideBlockPopup.prototype.deleteSlideBlock = function(id) {
    console.log('deleted');
    this._slideBlocks.splice(id, 1);
    this._$object
      .find(bemSelector(BLOCKS.slideBlockPopup, 'content-wrapper'))
      .children()
      .eq(id, 1)
      .remove()
  }

  SlideBlockPopup.prototype.initialize = function() {
    Popup.prototype.initialize.apply(this, arguments);

    this._$contentWrapper = this._$object.find(
      bemSelector(BLOCKS.slideBlockPopup, 'content-wrapper')
    );
  };

  function Carousel($object, slideBlocks) {
    this._slideBlocks = slideBlocks || [];
    this._$object = $object;
    this._currentSlideIndex = 0;
  }

  Carousel.prototype.getPreviousSlideIndex = function() {
    return (this._slideBlocks.length + this._currentSlideIndex - 1) % this._slideBlocks.length;
  }

  Carousel.prototype.getNextSlideIndex = function() {
    return (this._currentSlideIndex + 1) % this._slideBlocks.length;
  }

  Carousel.prototype.setSlideBlocks = function(slideBlocks) {
    this._slideBlocks = slideBlocks;

    if(slideBlocks.length > 0) {
      this._$object
        .find(bemSelector(BLOCKS.carousel, 'current-slide') + ' ' + bemSelector(BLOCKS.carousel, 'image-wrapper'))
        .replaceWith(this.renderContent(0));
    }
  }

  Carousel.prototype.slideLeft = function() {
    var $content;

    if ($(':animated').length) {
      return false;
    }

    $content = this.renderContent(this.getPreviousSlideIndex());

    this._$object
      .find(bemSelector(BLOCKS.carousel, 'new-slide'))
      .css({'left': -IMAGE_WIDTH})
      .find(bemSelector(BLOCKS.carousel, 'image-wrapper'))
      .replaceWith($content);

    this._$object
      .find(bemSelector(BLOCKS.carousel, 'slide'))
      .animate({left: '+='+IMAGE_WIDTH})
      .toggleClass(
        bem(BLOCKS.carousel, 'current-slide') + ' '+ bem(BLOCKS.carousel, 'new-slide')
      );

    this._currentSlideIndex = this.getPreviousSlideIndex();
  }

  Carousel.prototype.slideRight = function() {
    var $content;

    if ($(':animated').length) {
      return false;
    }

    $content = this.renderContent(this.getNextSlideIndex());

    this._$object
      .find(bemSelector(BLOCKS.carousel, 'new-slide'))
      .css({'left': IMAGE_WIDTH})
      .find(bemSelector(BLOCKS.carousel, 'image-wrapper'))
      .replaceWith($content);

    this._$object
      .find(bemSelector(BLOCKS.carousel, 'slide'))
      .animate({left: '-='+IMAGE_WIDTH})
      .toggleClass(
        bem(BLOCKS.carousel, 'current-slide') + ' '+ bem(BLOCKS.carousel, 'new-slide')
      );

    this._currentSlideIndex = this.getNextSlideIndex();
  }

  Carousel.prototype.renderContent = function(slideIndex) {
    var $content, slideBlock;

    slideBlock = this._slideBlocks[slideIndex];
    
    $content = $('<div></div>')
      .addClass(bem(BLOCKS.carousel, 'image-wrapper'))
      .append(
        $('<img/>')
          .addClass(bem(BLOCKS.carousel, 'image'))
          .prop({'src': slideBlock.getImageURL()})
      )
      .append(
        $('<div></div>')
          .addClass(bem(BLOCKS.carousel, 'caption'))
          .html(slideBlock.getComment())
      );

    return $content;
  }

  Carousel.prototype.initialize = function() {
    if (this._slideBlocks && this._slideBlocks.length > 0) {
      this._$object
        .find(bemSelector(BLOCKS.carousel, 'current-slide')+bemSelector(BLOCKS.carousel, 'image-wrapper'))
        .replaceWith(this.renderContent(0));
    }

    this._$object.find(bemSelector(BLOCKS.carousel, 'left-arrow')).unbind('click');
    this._$object.find(bemSelector(BLOCKS.carousel, 'right-arrow')).unbind('click');
    this._$object.find(bemSelector(BLOCKS.carousel, 'left-arrow')).click(this.slideLeft.bind(this));
    this._$object.find(bemSelector(BLOCKS.carousel, 'right-arrow')).click(this.slideRight.bind(this));

    this._interval = setInterval(function() {
      if (this._slideBlocks.length > 1) {
        this.slideRight();
      }
    }.bind(this), AUTO_SLIDING_DELAY);
  }

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

  inputPopup = new InputPopup($(bemSelector(BLOCKS.inputPopup)));
  inputPopup.initialize();

  slideBlockPopup = new SlideBlockPopup($(bemSelector(BLOCKS.slideBlockPopup)));
  slideBlockPopup.initialize();

  carousel = new Carousel($(bemSelector(BLOCKS.carousel)));
  carousel.initialize();

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

    slideBlockPopup.close();
    carousel.setSlideBlocks(slideBlocks);
  });

});