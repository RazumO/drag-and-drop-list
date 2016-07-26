
(function () {
  var ITEM_CLASS = 'draggable-item-js',
    HORIZONTAL_DIRECTION_TYPE = 'horizontal',
    VERTICAL_DIRECTION_TYPE = 'vertical';

  function DragAndDropList() {
    this.calculationParametres = {};
    this.calculationParametres[VERTICAL_DIRECTION_TYPE] = 'offsetTop';
    this.calculationParametres[HORIZONTAL_DIRECTION_TYPE] = 'offsetLeft';
  };

  DragAndDropList.prototype._addClassToElement = function (element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else if (!this.elementHasClass(element, className)) {
      element.className += ' ' + className;
    }
    return element;
  }

  DragAndDropList.prototype._removeClassFromElement = function (element, className) {
    var regExp;
    if (element.classList) {
      element.classList.remove(className);
    } else if (this.elementHasClass(element, className)) {
      regExp = new RegExp('(\\s|^)' + className + '(\\s|$)');
      element.className = element.className.replace(regExp, ' ');
    }
    return element;
  }


  DragAndDropList.prototype._elementHasClass = function (element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }

  DragAndDropList.prototype._getClosestElement = function (element, className) {
    do {
      if (this._elementHasClass(element, className)) {
        return element;
      }
      element = element.parentNode;
    } while (element.tagName !== 'HTML');
    return null;
  };

  DragAndDropList.prototype._forEach = function (items, cb) {
    for (var i = 0; i < items.length; i++) {
      cb(items[i]);
    }
  }

  DragAndDropList.prototype._filter = function (items, checker) {
    var newArr = [];
    this._forEach(items, function (item) {
      if (checker(item)) {
        newArr.push(item);
      }
    });
    return newArr;
  }

  DragAndDropList.prototype._makeItmesDraggable = function (items) {
    this._forEach(items, function (item) {
      item.setAttribute("draggable", "true");
    });
  }

  DragAndDropList.prototype.init = function (options) {
    var that = this;
    if (!options.element) {
      console.error('You should ser element as parameter.');
    }
    this.element = options.element;
    this.direction = options.direction || VERTICAL_DIRECTION_TYPE;
    this.cssClassForDruggingElement = options.cssClassForDruggingElement;
    this.calculationParameter = this.calculationParametres[this.direction];
    this.items = this.element.children;
    this._makeItmesDraggable(this.items);
    this._forEach(this.items, function (item) {
      that._addClassToElement(item, ITEM_CLASS);
    });
    this._addEventListeners();
  }

  DragAndDropList.prototype._addEventListeners = function (options) {
    this.element.addEventListener("dragstart", (function (event) {
       event.dataTransfer.effectAllowed = 'move';
       this._draggingElement = this._getClosestElement(event.target, ITEM_CLASS);
       if (this.cssClassForDruggingElement) {
          this._addClassToElement(this._draggingElement, this.cssClassForDruggingElement);
       }
       return true;
    }).bind(this), false);

    this.element.addEventListener("dragend", (function (event) {
       var target = this._getClosestElement(event.target, ITEM_CLASS);
       if (this.cssClassForDruggingElement) {
          this._removeClassFromElement(target, this.cssClassForDruggingElement);
       }
       return true;
    }.bind(this)), false);

    this.element.addEventListener("dragover", function (event) {
      event.preventDefault();
    }, false);

    this.element.addEventListener("dragenter", (function (event) {
      event.preventDefault();
      var oldChild = this._draggingElement,
        newChild = this._getClosestElement(event.target, ITEM_CLASS);
        temp = oldChild.cloneNode(true);

      if (!newChild || oldChild === newChild) return false;
      if (newChild && newChild[this.calculationParameter] - oldChild[this.calculationParameter] > 0) {
        this.element.insertBefore(oldChild, newChild.nextSibling);
      } else {
        this.element.insertBefore(oldChild, newChild);
      }
      return true;
    }).bind(this), false);



    this.element.addEventListener("drop", function (event) {
       event.stopPropagation();
       return false;
    }, false);

  }

  window.DragAndDropList = DragAndDropList;
})();