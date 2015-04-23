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

  var moveViewTemplate = "<gaia-modal class=\"move\">\n  <gaia-header>\n    <button type=\"button\" data-action=\"cancel\">Cancel</button>\n    <h1>Move</h1>\n    <button type=\"button\" data-action=\"select\">Select</button>\n  </gaia-header>\n  <section>\n    <gaia-dom-tree></gaia-dom-tree>\n  </section>\n  <gaia-dialog>\n    <button type=\"button\" data-action=\"before\">Insert Before</button>\n    <button type=\"button\" data-action=\"after\">Insert After</button>\n    <button type=\"button\" data-action=\"prepend\">Prepend</button>\n    <button type=\"button\" data-action=\"append\">Append</button>\n  </gaia-dialog>\n</gaia-modal>";

  var MoveView = (function (View) {
    var MoveView = function MoveView(options) {
      View.call(this, options);

      this.el.className = "fxos-customizer-move-view";

      this.render();
    };

    _extends(MoveView, View);

    MoveView.prototype.init = function (controller) {
      View.prototype.init.call(this, controller);

      this.modal = this.$("gaia-modal");
      this.domTree = this.$("gaia-dom-tree");
      this.dialog = this.$("gaia-dialog");

      this.on("click", "button", this._handleClick.bind(this));
      this.on("contextmenu", "gaia-dom-tree", function (evt) {
        evt.stopPropagation();
      });
    };

    MoveView.prototype.template = function () {
      return moveViewTemplate;
    };

    MoveView.prototype._handleClick = function (evt) {
      var action = this.controller[evt.target.dataset.action];
      if (typeof action === "function") {
        action.call(this.controller, evt.target.dataset);
      }
    };

    return MoveView;
  })(View);

  exports["default"] = MoveView;
});