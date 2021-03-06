/**
 * Module : neoui-button
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 13:01:05
 */

import { addClass } from 'tinper-sparrow/src/dom';
import { env } from 'tinper-sparrow/src/env';
import { on } from 'tinper-sparrow/src/event';
import { Ripple } from 'tinper-sparrow/src/util/ripple';

var Button = u.BaseComponent.extend({
    init: function init() {
        try {
            var rippleContainer = document.createElement('span');
            addClass(rippleContainer, 'u-button-container');
            this._rippleElement = document.createElement('span');
            addClass(this._rippleElement, 'u-ripple');
            if (env.isIE8) addClass(this._rippleElement, 'oldIE');
            rippleContainer.appendChild(this._rippleElement);
            on(this._rippleElement, 'mouseup', this.element.blur);
            this.element.appendChild(rippleContainer);
        } catch (e) {}

        // 增加disabled效果
        var disableAttr = this.element.getAttribute('disabled');
        if (disableAttr != null && disableAttr != '') {
            this.element.className += " disable";
        }

        on(this.element, 'mouseup', this.element.blur);
        on(this.element, 'mouseleave', this.element.blur);
        this.ripple = new Ripple(this.element);
    }

});

if (u.compMgr) u.compMgr.regComp({
    comp: Button,
    compAsString: 'u.Button',
    css: 'u-button'
});

export { Button };