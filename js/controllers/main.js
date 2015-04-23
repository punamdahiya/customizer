define(["exports"], function (exports) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

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

  var MainController = (function (Controller) {
    var MainController = function MainController(options) {
      Controller.call(this, options);

      this._waitToBeOpened();
    };

    _extends(MainController, Controller);

    MainController.prototype._lazyLoadModules = function () {
      var _this = this;
      this._loadedModules = this._loadedModules || new Promise(function (resolve, reject) {
        /*jshint evil:true*/
        var source = window.localStorage.getItem("__CUSTOMIZER__componentsSource");
        if (!source) {
          reject();
          return;
        }

        eval.call(window, source);

        var editView = new EditView();
        var actionMenuView = new ActionMenuView();
        var settingsView = new SettingsView();
        var viewSourceView = new ViewSourceView();
        var appendChildView = new AppendChildView();
        var moveView = new MoveView();
        var mainView = new MainView({
          editView: editView,
          actionMenuView: actionMenuView,
          settingsView: settingsView,
          viewSourceView: viewSourceView,
          appendChildView: appendChildView,
          moveView: moveView
        });

        var editController = new EditController({
          view: editView
        });

        var viewSourceController = new ViewSourceController({
          view: viewSourceView
        });

        var appendChildController = new AppendChildController({
          view: appendChildView
        });

        var moveController = new MoveController({
          view: moveView
        });

        var actionMenuController = new ActionMenuController({
          view: actionMenuView,
          editController: editController,
          viewSourceController: viewSourceController,
          appendChildController: appendChildController,
          moveController: moveController
        });

        var settingsController = new SettingsController({
          view: settingsView
        });

        _this.view = mainView;
        mainView.init(_this);

        _this.actionMenuController = actionMenuController;
        _this.settingsController = settingsController;

        editController.mainController = _this;
        viewSourceController.mainController = _this;
        actionMenuController.mainController = _this;
        settingsController.mainController = _this;
        appendChildController.mainController = _this;
        moveController.mainController = _this;

        console.log("Lazy-initialized modules");
        resolve();
      });

      return this._loadedModules;
    };

    MainController.prototype._waitToBeOpened = function () {
      var _this2 = this;
      Gesture.detect(this.openGesture).then(function () {
        return _this2._lazyLoadModules();
      }).then(function () {
        return _this2.view.open();
      }).then(function () {
        _this2.view.customizer.setRootNode(document.documentElement);
        _this2._waitToBeClosed();
      });
    };

    MainController.prototype._waitToBeClosed = function () {
      var _this3 = this;
      Gesture.detect(this.closeGesture).then(function () {
        return _this3.view.close();
      }).then(function () {
        return _this3._waitToBeOpened();
      });
    };

    _classProps(MainController, null, {
      openGesture: {
        get: function () {
          return {
            type: "swipe", // Swipe:
            numFingers: 2, // with two fingers,
            startRegion: { // from bottom 20% of the screen,
              x0: 0, y0: 0.8, x1: 1, y1: 1
            },
            endRegion: { // up into the top 75% of the screen,
              x0: 0, y0: 0, x1: 1, y1: 0.75
            },
            maxTime: 1000 };
        }
      },
      closeGesture: {
        get: function () {
          return {
            type: "swipe", // Swipe:
            numFingers: 2, // with two fingers,
            startRegion: { // from the middle ~half of the screen
              x0: 0, y0: 0.3, x1: 1, y1: 0.7
            },
            endRegion: { // down into the bottom quarter of the screen
              x0: 0, y0: 0.75, x1: 1, y1: 1
            },
            maxTime: 1000 };
        }
      }
    });

    return MainController;
  })(Controller);

  exports["default"] = MainController;
});