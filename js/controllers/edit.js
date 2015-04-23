define(["exports"], function (exports) {
  "use strict";

  var _extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    child.__proto__ = parent;
  };

  var EditController = (function (Controller) {
    var EditController = function EditController(options) {
      Controller.call(this, options);
    };

    _extends(EditController, Controller);

    EditController.prototype.open = function (target) {
      this.target = target;

      this.changes = {};

      this.view.setTarget(target);
      this.view.open();
    };

    EditController.prototype.close = function () {
      this.view.close();
    };

    EditController.prototype.save = function () {
      var _this = this;
      AddonService.generate(this.target, function (generator) {
        if (_this.changes.innerHTML) {
          generator.innerHTML(_this.changes.innerHTML);
        }

        if (_this.changes.properties) {
          generator.setProperties(_this.changes.properties);
        }

        _this.close();
      });
    };

    return EditController;
  })(Controller);

  exports["default"] = EditController;
});