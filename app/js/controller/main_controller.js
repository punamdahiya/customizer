/* global EditController */
/* global MainView */

/* global Controller */

export default class MainController extends Controller {
  constructor() {
    this.view = new MainView({el: document.body});
    this.controllers = {
      'edit': new EditController()
    };
    this.activeController = null;
  }

  main() {
    window.addEventListener('contextmenu', this._handleContextmenu.bind(this));
  }

  _handleContextmenu(e) {
    if (!this._customizer) {
      this._customizer = document.createElement('fxos-customizer');
      document.body.appendChild(this._customizer);
    }
  }
}