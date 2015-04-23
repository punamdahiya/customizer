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

  /* global View */

  /* global html_beautify */

  var editViewTemplate = "<gaia-modal>\n  <style scoped>\n    gaia-tabs {\n      position: absolute !important;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n    }\n    .gaia-modal {\n      background: var(--background, #fff);\n      display: none;\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n    }\n    .gaia-modal.active {\n      display: block;\n    }\n    .tab-pane {\n      box-sizing: padding-box;\n      display: none;\n      position: absolute;\n      padding: 10px;\n      top: 50px;\n      bottom: 46px;\n      left: 0;\n      width: 100%;\n      height: auto;\n    }\n    .tab-pane.active {\n      display: block;\n    }\n    textarea {\n      font-family: Consolas,Monaco,\"Andale Mono\",monospace;\n      width: 100%;\n      height: 100%;\n    }\n    textarea,\n    input {\n      -moz-user-select: text !important;\n    }\n  </style>\n  <gaia-header>\n    <button data-action=\"cancel\">Cancel</button>\n    <h1>Edit</h1>\n    <button data-action=\"save\">Save</button>\n  </gaia-header>\n  <section class=\"tab-pane active\" data-id=\"html\">\n    <textarea></textarea>\n  </section>\n  <section class=\"tab-pane\" data-id=\"attributes\">\n    <h3>Attributes</h3>\n    <gaia-property-inspector root-property=\"attributes\" data-textarea=\"textarea\"></gaia-property-inspector>\n  </section>\n  <section class=\"tab-pane\" data-id=\"properties\">\n    <h3>Properties</h3>\n    <gaia-property-inspector data-textarea=\"textarea\"></gaia-property-inspector>\n  </section>\n  <section class=\"tab-pane\" data-id=\"events\">\n    <h3>Events</h3>\n  </section>\n  <gaia-tabs selected=\"0\">\n    <a href=\"#\">HTML</a>\n    <a href=\"#\">Attributes</a>\n    <a href=\"#\">Properties</a>\n    <a href=\"#\">Events</a>\n  </gaia-tabs>\n</gaia-modal>";

  var EditView = (function (View) {
    var EditView = function EditView(options) {
      View.call(this, options);

      this.el.className = "fxos-customizer-edit-view";

      this.render();
    };

    _extends(EditView, View);

    EditView.prototype.init = function (controller) {
      var _this = this;
      View.prototype.init.call(this, controller);

      this.modal = this.$("gaia-modal");
      this.header = this.$("gaia-header");
      this.tabs = this.$("gaia-tabs");

      this.htmlTextarea = this.$("section[data-id=\"html\"] > textarea");
      this.attributeInspector = this.$("section[data-id=\"attributes\"] > gaia-property-inspector");
      this.propertyInspector = this.$("section[data-id=\"properties\"] > gaia-property-inspector");

      this.tabPanes = [].slice.apply(this.$$(".tab-pane"));

      this.on("click", "button[data-action=\"cancel\"]", function (evt) {
        _this.controller.close();
      });

      this.on("click", "button[data-action=\"save\"]", function (evt) {
        _this.controller.save();
      });

      this.tabs.addEventListener("change", function (evt) {
        _this.tabPanes.forEach(function (tabPane, index) {
          if (index === _this.tabs.selected) {
            tabPane.classList.add("active");
          } else {
            tabPane.classList.remove("active");
          }
        });
      });

      this.htmlTextarea.addEventListener("keyup", function (evt) {
        _this.controller.changes.innerHTML = _this.htmlTextarea.value;
      });

      this.on("save", "gaia-property-inspector", function (evt) {
        var keyPath = [];
        var parts = evt.detail.path.substr(1).split("/");
        parts.forEach(function (part) {
          return keyPath.push(part);
        });
        keyPath = keyPath.join(".");

        _this.controller.changes.properties = _this.controller.changes.properties || {};
        _this.controller.changes.properties[keyPath] = evt.detail.newValue;
      });

      this.el.addEventListener("contextmenu", function (evt) {
        evt.stopPropagation();
      });
    };

    EditView.prototype.template = function () {
      return editViewTemplate;
    };

    EditView.prototype.open = function () {
      this.modal.open();
    };

    EditView.prototype.close = function () {
      this.modal.close();
    };

    EditView.prototype.setTarget = function (target) {
      var clonedTarget = target.cloneNode(true);
      var html = html_beautify(clonedTarget.innerHTML.trim(), {
        indent_size: 2
      });

      this.htmlTextarea.value = html;

      this.attributeInspector.set(clonedTarget);
      this.propertyInspector.set(clonedTarget);
    };

    return EditView;
  })(View);

  exports["default"] = EditView;
});