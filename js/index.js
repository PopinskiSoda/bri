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

  /**
   * BEM Helper. Could also take object with keys-values as argument
   *
   * @param {string} block
   * @param {string} element
   * @param {string} modifier
   *
   * [@param {object} object that contains block, element and modifier properties]
   * 
   * @return {string} BEM className
   */
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
   * Base popup class
   * @param {[type]} $object
   */
  function Popup($object) {
    this._$object = $object;
    this._$popupBackground = null;
    this._$okButton = null;
    this._$crossButton = null;
  }

  Popup.prototype.open = function() {
    this._$popupBackground.removeClass(bem({
      block: BLOCKS.popupBackground,
      modifier: 'hidden'
    }));

    this._$object.removeClass(bem({
      block: BLOCKS.popup,
      modifier: 'hidden'
    }));
  };

  Popup.prototype.close = function() {
    this._$popupBackground.addClass(bem({
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
    this._$okButton.unbind('click');
    this._$okButton.click(this._handleSubmit.bind(this));
  };

  Popup.prototype.initialize = function() {
    this._$okButton = this._$object.find(bemSelector(BLOCKS.popup, 'ok-button'));
    this._$crossButton = this._$object.find(bemSelector(BLOCKS.popup, 'cross-button'));
    this._$popupBackground = $(bemSelector(BLOCKS.popupBackground));

    this._$crossButton.unbind('click');
    this._$crossButton.click(this.close.bind(this));

    this._$okButton.unbind('click');
    this._$okButton.click(this._handleSubmit.bind(this));
  };

  /**
   * Popup for reading an array of strings 
   * @param {jQuery object} $object
   */
  function InputPopup($object) {
    Popup.apply(this, arguments);
    this._errorMessage = 'Неверный ввод';
    this._value = '';
    this._$textarea = null;
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

    var self = this;
    
    this._$textarea = this._$object.find(bemSelector(BLOCKS.popup, 'textarea'));

    this._value = this._$textarea.val();
    this._$textarea.unbind('change');
    this._$textarea.change(function(event) {
      self._value = event.target.value;
    });
  };

  /**
   * Contains information about specific slide
   * @param {string} imageURL   URL of slide image
   * @param {string} id         id of item in list
   */
  function SlideBlock(imageURL, id) {
    this._$object = null;
    this._$input = null;
    this._$deleteButton = null;
    this._imageURL = imageURL;
    this._id = id;
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

    this._$deleteButton.unbind('click');
    this._$deleteButton.click(this._handleDelete);
  }

  SlideBlock.prototype.initialize = function() {
    var self, block;
    
    self = this;
    block = BLOCKS.slideBlockPopup;

    this._$input = $('<input/>')
      .addClass(bem(block, 'field-input'))
      .attr({type: 'text'});

    this._$input.unbind('change');
    this._$input.change(function(event) {
      self._comment = event.target.value;
    });

    this._$deleteButton = $('<button></button>')
      .addClass(bem(block, 'field-button'))
      .html('Удалить');

    this._$deleteButton.unbind('click');
    this._$deleteButton.click(this._handleDelete);

    this._$object = $('<div></div>')
      .addClass(bem(block, 'slide-block') + ' ' + this._id)
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
              .append(this._$input)
              .append(this._$deleteButton)
          )
      );
  };

  /**
   * Popup for editing and deletion of slideBlocks
   * @param {jQuery object} $object
   */
  function SlideBlockPopup($object) {
    Popup.apply(this, arguments);

    this._$contentWrapper = null;
    this._slideBlocks = [];
  }

  SlideBlockPopup.prototype = Object.create(Popup.prototype);

  SlideBlockPopup.prototype.constructor = SlideBlockPopup;

  SlideBlockPopup.prototype.addSlideBlock = function(imageURL) {
    var slideBlock, id

    id = this._slideBlocks.length

    slideBlock = new SlideBlock(imageURL, id);
    slideBlock.initialize();

    slideBlock.setDeleteHandler(function(){
      this.deleteSlideBlock(id);
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
    delete this._slideBlocks[id];
    
    this._$contentWrapper
      .find('.'+id)
      .remove();
  }

  SlideBlockPopup.prototype.initialize = function() {
    Popup.prototype.initialize.apply(this, arguments);

    this._$contentWrapper = this._$object.find(
      bemSelector(BLOCKS.slideBlockPopup, 'content-wrapper')
    );
  };

  /**
   * Simple jQuery carousel
   * @param {jQuery object} $object  jQuery carousel object
   * @param {array} slideBlocks      array of slideBlock objects
   */
  function Carousel($object, slideBlocks) {
    this._$object = $object;
    this._$slides = null;
    this._slideBlocks = slideBlocks ? slideBlocks.filter(function(item) { return item !== undefined; }) : [];
    this._currentSlideIndex = 0;
    this._interval = null;
  }

  Carousel.prototype.getPreviousSlideIndex = function() {
    return (this._slideBlocks.length + this._currentSlideIndex - 1) % this._slideBlocks.length;
  }

  Carousel.prototype.getNextSlideIndex = function() {
    return (this._currentSlideIndex + 1) % this._slideBlocks.length;
  }

  Carousel.prototype.setSlideBlocks = function(slideBlocks) {
    this._slideBlocks = slideBlocks.filter(function(item) { return item !== undefined; });

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

    clearInterval(this._interval);
    this._interval = setInterval(this._handleInterval.bind(this), AUTO_SLIDING_DELAY);

    $content = this.renderContent(this.getPreviousSlideIndex());

    this._$object
      .find(bemSelector(BLOCKS.carousel, 'new-slide'))
      .css({'left': -IMAGE_WIDTH})
      .find(bemSelector(BLOCKS.carousel, 'image-wrapper'))
      .replaceWith($content);

    this._$slides
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

    clearInterval(this._interval);
    this._interval = setInterval(this._handleInterval.bind(this), AUTO_SLIDING_DELAY);

    $content = this.renderContent(this.getNextSlideIndex());

    this._$object
      .find(bemSelector(BLOCKS.carousel, 'new-slide'))
      .css({'left': IMAGE_WIDTH})
      .find(bemSelector(BLOCKS.carousel, 'image-wrapper'))
      .replaceWith($content);

    this._$slides
      .animate({left: '-='+IMAGE_WIDTH})
      .toggleClass(
        bem(BLOCKS.carousel, 'current-slide') + ' '+ bem(BLOCKS.carousel, 'new-slide')
      );

    this._currentSlideIndex = this.getNextSlideIndex();
  }

  Carousel.prototype.renderContent = function(slideIndex) {
    var $content, slideBlock, comment;

    slideBlock = this._slideBlocks[slideIndex];
    comment = slideBlock.getComment();
    
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
          .addClass(comment ? '' : bem(BLOCKS.carousel, 'caption', 'hidden'))
          .html(comment)
      );

    return $content;
  }

  Carousel.prototype._handleInterval = function() {
    if (this._slideBlocks.length > 1) {
      this.slideRight();
    }
  }

  Carousel.prototype.initialize = function() {
    if (this._slideBlocks && this._slideBlocks.length > 0) {
      this._$object
        .find(bemSelector(BLOCKS.carousel, 'current-slide')+bemSelector(BLOCKS.carousel, 'image-wrapper'))
        .replaceWith(this.renderContent(0));
    }

    this._$slides = this._$object.find(bemSelector(BLOCKS.carousel, 'slide'));
    this._$leftArrow = this._$object.find(bemSelector(BLOCKS.carousel, 'left-arrow'));
    this._$rightArrow = this._$object.find(bemSelector(BLOCKS.carousel, 'right-arrow'))

    this._$leftArrow.unbind('click');
    this._$leftArrow.click(this.slideLeft.bind(this));

    this._$rightArrow.unbind('click');
    this._$rightArrow.click(this.slideRight.bind(this));

    this._interval = setInterval(this._handleInterval.bind(this), AUTO_SLIDING_DELAY);
  }

  /**
   * Validates string to array of strings
   * @param  {string} value [description]
   * @return {boolean}
   */
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
   * Simple jQuery carousel
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