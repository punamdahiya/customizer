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

  var MoveController = (function (Controller) {
    var MoveController = function MoveController(options) {
      Controller.call(this, options);
    };

    _extends(MoveController, Controller);

    MoveController.prototype.open = function (target) {
      this.target = target;

      this.view.domTree.filter = "#" + this.mainController.view.el.id;
      this.view.domTree.setRoot(document.documentElement);
      this.view.domTree.render();

      this.view.modal.open();
    };

    MoveController.prototype.cancel = function () {
      this.view.modal.close();
    };

    MoveController.prototype.select = function () {
      this.destination = this.view.domTree.selectedNode;
      this.view.dialog.open();
    };

    MoveController.prototype.before = function () {
      var _this = this;
      AddonService.generate(this.target, function (generator) {
        generator.moveBefore(_this.destination);

        _this.view.modal.close();
      });
    };

    MoveController.prototype.after = function () {
      var _this2 = this;
      AddonService.generate(this.target, function (generator) {
        generator.moveAfter(_this2.destination);

        _this2.view.modal.close();
      });
    };

    MoveController.prototype.prepend = function () {
      var _this3 = this;
      AddonService.generate(this.target, function (generator) {
        generator.movePrepend(_this3.destination);

        _this3.view.modal.close();
      });
    };

    MoveController.prototype.append = function () {
      var _this4 = this;
      AddonService.generate(this.target, function (generator) {
        generator.moveAppend(_this4.destination);

        _this4.view.modal.close();
      });
    };

    return MoveController;
  })(Controller);

  exports["default"] = MoveController;
});