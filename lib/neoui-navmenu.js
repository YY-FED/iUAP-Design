/**
 * Module : neoui-navmenu
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 08:45:49
 */

import { extend } from 'tinper-sparrow/src/extend';
import { addClass, wrap, css, hasClass, removeClass, closest } from 'tinper-sparrow/src/dom';
import { on, trigger } from 'tinper-sparrow/src/event';
import { Ripple } from 'tinper-sparrow/src/util/ripple';

var NavMenu = u.BaseComponent.extend({
    _Constant: {},
    _CssClasses: {
        NAV: 'u-navmenu',
        NAV_LINK: 'u-navmenu-link',
        NAV_LINK_CURRENT: 'u-navmenu-link-current',
        NAV_LINK_OPEN: 'u-navmenu-link-open',
        NAV_SUB: 'u-navmenu-sub'
    },
    init: function init() {

        if (hasClass(this.element, 'u-navmenu-horizontal')) {
            on(this.element, 'click', this._horNavlinkClickHander.bind(this));
        } else {
            on(this.element, 'click', this._navlinkClickHander.bind(this));
        }

        var items = this.element.querySelectorAll('.' + this._CssClasses.NAV_LINK);
        for (var i = 0; i < items.length; i++) {
            new Ripple(items[i]);
        }
    },
    _horNavlinkClickHander: function _horNavlinkClickHander(e) {
        var item = closest(e.target, this._CssClasses.NAV_LINK);

        if (item) {
            var curlink = this.element.querySelector('.' + this._CssClasses.NAV_LINK_CURRENT);
            curlink && removeClass(curlink, this._CssClasses.NAV_LINK_CURRENT);
            addClass(item, this._CssClasses.NAV_LINK_CURRENT);
        }
    },
    _navlinkClickHander: function _navlinkClickHander(e) {
        //var _target = e.currentTarget || e.target || e.srcElement;
        var curlink = this.element.querySelector('.' + this._CssClasses.NAV_LINK_CURRENT);
        curlink && removeClass(curlink, this._CssClasses.NAV_LINK_CURRENT);
        // if (curlink && isIE8){
        // 	var sub = curlink.parentNode.querySelector('.'+this._CssClasses.NAV_SUB);
        // 	if (sub){
        // 		sub.style.maxHeight = '0';
        // 	}
        // }

        var item = closest(e.target, this._CssClasses.NAV_LINK);

        if (item) {
            addClass(item, this._CssClasses.NAV_LINK_CURRENT);
            var sub = item.parentNode.querySelector('.' + this._CssClasses.NAV_SUB),
                open = hasClass(item, this._CssClasses.NAV_LINK_OPEN);
            if (sub && open) {
                removeClass(item, this._CssClasses.NAV_LINK_OPEN);
                if (env.isIE8) sub.style.maxHeight = 0;
            }
            if (sub && !open) {
                addClass(item, this._CssClasses.NAV_LINK_OPEN);
                if (env.isIE8) sub.style.maxHeight = '999px';
            }
            // sub && open && removeClass(item, this._CssClasses.NAV_LINK_OPEN);
            // sub && !open && addClass(item, this._CssClasses.NAV_LINK_OPEN);
        }
    }
});

if (u.compMgr) u.compMgr.regComp({
    comp: NavMenu,
    compAsString: 'u.NavMenu',
    css: 'u-navmenu'
});

export { NavMenu };