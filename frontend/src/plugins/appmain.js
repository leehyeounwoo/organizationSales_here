'use strict';

import Vue from 'vue';
import appbus from './appbus';

class appmain {
	constructor() {
		//console.log(`appmain::constructor`);
		this._loading = {
			show: this.showloading.bind(this),
			hide: this.hideloading.bind(this),
		};

		this._bus = appbus;
	}

	get loading() {
		return this._loading;
	}

	showloading() {
		this._bus.$emit('loading::show');
	}
	hideloading() {
		this._bus.$emit('loading::hide');
	}
}

let _appmain = new appmain();

const Plugin = {};
Plugin.install = function(Vue, options) {
	console.log(options);
	Vue.appmain = _appmain;
	window.appmain = _appmain;
	Object.defineProperties(Vue.prototype, {
		appmain: {
			get() {
				return _appmain;
			},
		},
		$appmain: {
			get() {
				return _appmain;
			},
		},
	});
};

Vue.use(Plugin);

export default Plugin;
