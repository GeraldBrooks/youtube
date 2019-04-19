/*!
 * */(function(){var gettext = function(){};gettext("Youtube");gettext("Youtube.com is a world famous video hosting, which allows users to watch, upload and share videos with their friends.");})()
 * /*
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Main application entry point.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	var app    = __webpack_require__(/*! mag-app */ 1),
		keys    = __webpack_require__(/*! stb-keys */ 27),
		// router = require('./stb/router'),
	
		// stb = require('./modules/gstb.wrapper'),
	
		lang = __webpack_require__(/*! ../../config/lang */ 29),
		config = __webpack_require__(/*! ../../config/app */ 30),
	
		exitModal, lastFocusedComponent,
		loader;
	
	/*
	app.data.windowId = stbWebWindow.windowId();
	app.data.isPortal = app.data.windowId === 1;*/
	
	
	function initPages () {
		var metrics = __webpack_require__(/*! ./metrics */ 10),
			newControl = [
				'AuraHD2', 'AuraHD3', 'AuraHD8', 'MAG254', 'MAG275', 'MAG276', 'WR320'
			].indexOf(window.top.gSTB.GetDeviceModelExt()) !== -1,
			button;
	
	
		metrics.availHeight = metrics.height - (metrics.availTop + metrics.availBottom);
		metrics.availWidth  = metrics.width - (metrics.availLeft + metrics.availRight);
	
		// provide global access
		if ( !app.data ) {
			app.data = {};
		}
		app.data.metrics = metrics;
	
		if ( __webpack_require__(/*! ./modules/api/client */ 31).token ) {
			app.data.metrics.mainMenuSize -= 2;
		}
		app.pages = {
			// init: require('./pages/init'),
			// player: require('./pages/player'),
			main: __webpack_require__(/*! ./pages/main */ 35),
			search: __webpack_require__(/*! ./pages/search */ 71)//,
			// login: require('./pages/login')
		};
	
		// router.pages.forEach(function ( page ) {
		// 	page.emit('load');
		// });
	
		// router.pages.forEach(function ( page ) {
		// 	page.emit('load');
		// });
	
		exitModal = new (__webpack_require__(/*! ./modules/ui/modal.message */ 65))({
			$node: document.getElementById('exitMessage'),
			events: {
				keydown: function ( event ) {
					if ( event.code === keys.ok ) {
						app.quit();
					} else if ( event.code === keys.back || event.code === keys.exit ) {
						event.stop = true;
						exitModal.hide();
						// exitModal.$node.style.visibility = 'hidden';
						lastFocusedComponent.focus();
					}
				}
			}
		});
	
		exitModal.$body.classList.add('modalExit');
		// exitModal.$node.style.visibility = 'hidden';
		exitModal.$header.innerHTML  = gettext('Exit the app?');
		exitModal.$content.innerHTML = '';
		exitModal.$footer.innerHTML = '';
		exitModal.$footer.appendChild(button = document.createElement('div'));
		button.innerText = gettext('Ok');
		button.className = 'btn confirm' + (newControl ? '' : ' old');
		exitModal.$footer.appendChild(button = document.createElement('div'));
		button.className = 'btn back' + (newControl ? '' : ' old');
		button.innerText = gettext('Cancel');
		// exitModal.$footer.innerHTML  = '';
	
	
		if ( app.params.search ) {
			app.route(app.pages.search, {search: app.params.search});
		} else {
			if ( app.params.channelId ) {
				app.route(app.pages.main, {channel: {id: app.params.channelId, noBack: true}});
			} else {
				app.route(app.pages.main);
			}
	
		}
	
		app.ready();
		// router.navigate('pm');
		// window.volumeWidget.classList.add('ready');
	
		loader = __webpack_require__(/*! ./components/loader */ 41);
	}
	
	app.quit = function () {
		core.storage.setItem(config.settingsFile, JSON.stringify(app.settings));
		// if ( app.player ) {
		// 	app.player.stop();
		// }
		app.exit();
		//window.core.call('stop');
		// if ( window.parent !== window ) {
		// 	if ( router.current.id === 'pp' ) {
		// 		router.back();
		// 	}
		// 	app.hide();
		// } else {
		// 	window.location.href = require('stb-referrer')() || 'file:///home/web/services.html';
		// }
	};
	
	
	app.reload = function () {
		core.storage.setItem(config.settingsFile, JSON.stringify(app.settings));
		window.location.reload();
		app.emit('load');
	};
	
	
	if ( false ) {
		// enable colors in console
		require('tty-colors');
	
		window.dump = function ( data, title ) {
			//var type = Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	        //
			//// prepare
			//if ( data instanceof Object || Array.isArray(data) ) {
			//	// complex object
			//	data = data.nodeName ? data.outerHTML : JSON.stringify(data, null, 4);
			//}
			//// combine all together and print result
			//setTimeout(function () {
			//	gSTB.Debug((type === 'error' ? type.red : type.green) + '\t' + (title ? title.bold + ':\t'.green : '') + data);
			//}, 10000);
		};
	}
	
	
	if ( false ) {
		app.data.log = {
			'youtube-dl': []
		};
	
		app.sendLog = function () {
			//var xhr = new XMLHttpRequest();
	        //
			//xhr.open('POST', 'http://tubb.zz.mu/');
			//xhr.setRequestHeader('cache-control', 'no-cache');
	        //
			//xhr.send(JSON.stringify(app.data.log));
			//app.data.log = {
			//	'youtube-dl': []
			//};
			//window.logClient = xhr;
		};
	}
	
	
	app.addListeners({
		// all resources are loaded
		load: function load () {
			var l10n = __webpack_require__(/*! ./modules/util/l10n */ 56),
				lang = __webpack_require__(/*! ../../config/lang */ 29),
				prop, set;
	
			app.urlParser = core.plugins.youtubeDL;
	
			try {
				set = core.storage.getItem(config.settingsFile);
				if ( set ) {
					app.settings = JSON.parse(set);
				} else {
					for ( prop in config.defaultSettings ) {
						if ( app.settings[prop] ) {
							app.settings[prop] = config.defaultSettings[prop];
						}
					}
					app.settings = config.defaultSettings;
					core.storage.setItem(config.settingsFile, JSON.stringify(app.settings));
				}
	
			} catch ( e ) {
				app.settings = false;
			}
			if ( !app.settings ) {
				app.settings = config.defaultSettings;
				core.storage.setItem(config.settingsFile, JSON.stringify(app.settings));
			}
			for ( prop in config.defaultSettings ) {
				if ( app.settings[prop] === undefined ) {
					app.settings[prop] = config.defaultSettings[prop];
				}
			}
	
			if ( lang.languages.indexOf(app.settings.keyboardLanguage) === -1 ) {
				app.settings.keyboardLanguage = 0;
			}
	
			app.params = __webpack_require__(/*! ./modules/tools/parse.query */ 85)(location.search.substring(1));
	
			if ( app.params.language ) {
				app.settings.languageOverwrite = 1;
				app.settings.language = app.params.language;
			}
	
			__webpack_require__(/*! spa-gettext */ 57).load({
				name: app.settings.language || core.environment.language || 'en'
			}, function () {
				var left;
	
				app.languageIndex = l10n.languageIndex;
				app.settings.language = lang.languages[app.languageIndex];
				document.documentElement.dir = lang.directions[app.languageIndex];
				// set pages
				if ( document.documentElement.dir === 'rtl' ) {
					left = keys.left;
					keys.left = keys.right;
					keys.right = left;
				}
	
				initPages();
			});
	
			if ( app.settings.languageOverwrite ) {
				l10n.setLang(app.settings.language);
			} else {
				app.settings.language = core.environment.language || 'en';
			}
		},
	
		unload: function () {
			core.storage.setItem(config.settingsFile, JSON.stringify(app.settings));
			// if ( app.player ) {
			// 	app.player.stop();
			// }
		},
	
		keydown: function ( event ) {
			if ( event.stop ) {
				return;
			}
			if ( event.code === keys.back ) {
				if ( loader && !loader.visible ) {
					lastFocusedComponent = app.activePage.activeComponent;
					exitModal.show();
					exitModal.focus();
				} else {
					app.quit();
				}
			}
		}
	});
	
	
	
	
	// new way of string handling
	// all strings are in UTF-16
	// stb.setNativeStringMode(true);


/***/ }),
/* 1 */
/*!****************************!*\
  !*** ./~/mag-app/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	var app = __webpack_require__(/*! ./lib/main */ 2);
	
	
	module.exports = app;


/***/ }),
/* 2 */
/*!*******************************!*\
  !*** ./~/mag-app/lib/main.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var app    = __webpack_require__(/*! spa-app/lib/core */ 3),
	    events = __webpack_require__(/*! spa-app/lib/events */ 7);
	
	
	// get instance
	window.core = window.parent.getCoreInstance(window, app);
	
	// shims
	__webpack_require__(/*! stb-shim-classlist */ 8);
	
	// apply geometry
	__webpack_require__(/*! stb-app/lib/metrics */ 9);
	
	// load sdk css
	__webpack_require__(/*! stb-app/lib/css */ 11)('sdk');
	
	// load theme css
	__webpack_require__(/*! ./css */ 12);
	
	// load app css
	__webpack_require__(/*! stb-app/lib/css */ 11)('app');
	
	/**
	 * Specify platform name
	 *
	 * @type {string}
	 */
	app.platform = 'mag';
	
	/**
	 * Show app.
	 */
	app.ready = function () {
	    // if ( this.events['show'] ) {
	    //     this.emit('show');
	    // }
	    window.core.call('app:ready');
	};
	
	
	/**
	 * Exit from app.
	 * Destroy all application instance.
	 * If callback function provided, and callback returns boolean 'true', application will stay alive.
	 *
	 * @fires module:/stb/app#exit
	 */
	app.exit = function () {
	    if ( app.events['exit'] ) {
	        app.emit('exit');
	    }
	
	    core.call('exit');
	};
	
	
	events.load = function ( event ) {
	    //window.core = window.parent.getCoreInstanse(window, app);
	    document.body.setAttribute('platform', app.platform);
	
	    if ( core.ready ) {
	        if ( app.events['load'] ) {
	            // notify listeners
	            app.emit('load', {});
	        }
	    } else {
	        core.once('load', function () {
	            //core.ready = true;
	            if ( app.events[event.type] ) {
	                // notify listeners
	                app.emit(event.type, event);
	            }
	        });
	    }
	};
	
	
	// activate development mechanisms and tools
	if ( true ) {
	    //require('stb-develop');
	    __webpack_require__(/*! ./develop/main */ 13);
	} else {
	    // disable context menu
	    events.contextmenu = function ( event ) {
	        event.preventDefault();
	    };
	}
	
	
	//apply DOM events
	Object.keys(events).forEach(function ( name ) {
	    window.addEventListener(name, events[name]);
	});
	
	
	// new way of string handling
	// all strings are in UTF-16
	// since stbapp 2.18
	// if ( window.gSTB && gSTB.SetNativeStringMode ) {
	//     /* eslint new-cap: 0 */
	//     gSTB.SetNativeStringMode(true);
	// }
	
	// public
	module.exports = app;


/***/ }),
/* 3 */
/*!*******************************!*\
  !*** ./~/spa-app/lib/core.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Emitter = __webpack_require__(/*! cjs-emitter */ 4),
	    parse   = __webpack_require__(/*! cjs-query */ 5).parse,
	    app     = new Emitter();
	
	
	/**
	 * Make the given inactive/hidden page active/visible.
	 * Pass some data to the page and trigger the corresponding event.
	 *
	 * @param {Page} page item to show
	 * @param {*} [data] data to send to page
	 *
	 * @return {boolean} operation status
	 */
	function showPage ( page, data ) {
	    // page available and can be hidden
	    if ( page && !page.active ) {
	        // apply visibility
	        page.$node.classList.add('active');
	        page.active = true;
	        app.activePage = page;
	
	        debug.info('show component ' + page.name + '#' + page.id, null, {
	            tags: ['show', 'component', page.name, page.id]
	        });
	        //console.log('component ' + page.name + '.' + page.id + ' show', 'green');
	
	        // there are some listeners
	        if ( page.events['show'] ) {
	            // notify listeners
	            page.emit('show', {data: data});
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	}
	
	
	/**
	 * Make the given active/visible page inactive/hidden and trigger the corresponding event.
	 *
	 * @param {Page} page item to hide
	 *
	 * @return {boolean} operation status
	 */
	function hidePage ( page ) {
	    // page available and can be hidden
	    if ( page && page.active ) {
	        // apply visibility
	        page.$node.classList.remove('active');
	        page.active  = false;
	        app.activePage = null;
	
	        debug.info('hide component ' + page.name + '#' + page.id, null, {
	            tags: ['hide', 'component', page.name, page.id]
	        });
	        //console.log('component ' + page.name + '.' + page.id + ' hide', 'grey');
	
	        // there are some listeners
	        if ( page.events['hide'] ) {
	            // notify listeners
	            page.emit('hide');
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	}
	
	
	// url request params
	app.query = parse(document.location.search.substring(1));
	
	
	// global application configuration
	// in config.js file in js root
	app.config = __webpack_require__(/*! app:config */ 6);
	
	
	// the only visible page
	app.activePage = null;
	
	
	/**
	 * Browse to a given page.
	 * Do nothing if the link is invalid. Otherwise hide the current, show new and update the "previous" link.
	 *
	 * @param {Page} pageTo instance of the page to show
	 * @param {*} [data] options to pass to the page on show
	 *
	 * @return {boolean} operation status
	 */
	app.route = function ( pageTo, data ) {
	    var pageFrom = app.activePage;
	
	    if ( true ) {
	        //if ( router.pages.length > 0 ) {
	        if ( !pageTo || typeof pageTo !== 'object' ) {
	            throw new Error(__filename + ': wrong pageTo type');
	        }
	        if ( !('active' in pageTo) ) {
	            throw new Error(__filename + ': missing field "active" in pageTo');
	        }
	        //}
	    }
	
	    // valid not already active page
	    if ( pageTo && !pageTo.active ) {
	        //debug.log('router.navigate: ' + pageTo.id, pageTo === pageFrom ? 'grey' : 'green');
	        debug.info('app route: ' + pageTo.name + '#' + pageTo.id, null, {tags: ['route', pageTo.name, pageTo.id]});
	
	        // update url
	        //location.hash = this.stringify(name, data);
	
	        // apply visibility
	        hidePage(app.activePage);
	        showPage(pageTo, data);
	
	        // there are some listeners
	        if ( this.events['route'] ) {
	            // notify listeners
	            this.emit('route', {from: pageFrom, to: pageTo});
	        }
	
	        // store
	        //this.history.push(pageTo);
	
	        return true;
	    }
	
	    //debug.warn('invalid page to route: ' + pageTo.id, null, {tags: ['route', 'page', pageTo.id]});
	    console.warn('invalid page to route: ' + pageTo.id);
	
	    // nothing was done
	    return false;
	};
	
	
	// public
	module.exports = app;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-app/lib/core.js"))

/***/ }),
/* 4 */
/*!********************************!*\
  !*** ./~/cjs-emitter/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	
	/**
	 * Base Events Emitter implementation.
	 *
	 * @see http://nodejs.org/api/events.html
	 * @constructor
	 *
	 * @example
	 * var emitter = new Emitter();
	 */
	function Emitter () {
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    // if ( DEVELOP ) {
	    //     if ( typeof this !== 'object' ) { throw new Error(__filename + ': must be constructed via new'); }
	    // }
	
	    /**
	     * Inner hash table for event names and linked callbacks.
	     * Manual editing should be avoided.
	     *
	     * @member {Object.<string, function[]>}
	     *
	     * @example
	     * {
	     *     click: [
	     *         function click1 () { ... },
	     *         function click2 () { ... }
	     *     ],
	     *     keydown: [
	     *         function () { ... }
	     *     ]
	     * }
	     **/
	    this.events = {};
	}
	
	
	Emitter.prototype = {
	    /**
	     * Bind an event to the given callback function.
	     * The same callback function can be added multiple times for the same event name.
	     *
	     * @param {string} name event identifier
	     * @param {function} callback function to call on this event
	     *
	     * @example
	     * emitter.addListener('click', function ( data ) { ... });
	     * // one more click handler
	     * emitter.addListener('click', function ( data ) { ... });
	     */
	    addListener: function ( name, callback ) {
	        console.assert(arguments.length === 2, 'wrong arguments number');
	        console.assert(typeof name === 'string', 'wrong name type');
	        console.assert(name.length > 0, 'empty name');
	        console.assert(typeof callback === 'function', 'callback should be a function');
	
	        // if ( DEVELOP ) {
	        //     if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
	        //     if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
	        //     if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
	        // }
	
	        // initialization may be required
	        this.events[name] = this.events[name] || [];
	        // append this new event to the list
	        this.events[name].push(callback);
	    },
	
	
	    /**
	     * Add a one time listener for the event.
	     * This listener is invoked only the next time the event is fired, after which it is removed.
	     *
	     * @param {string} name event identifier
	     * @param {function} callback function to call on this event
	     *
	     * @example
	     * emitter.once('click', function ( data ) { ... });
	     */
	    once: function ( name, callback ) {
	        // current execution context
	        var self = this;
	
	        if ( true ) {
	            if ( arguments.length !== 2 ) {
	                throw new Error(__filename + ': wrong arguments number');
	            }
	            if ( typeof name !== 'string' || name.length === 0 ) {
	                throw new Error(__filename + ': wrong or empty name');
	            }
	            if ( typeof callback !== 'function' ) {
	                throw new Error(__filename + ': wrong callback type');
	            }
	        }
	
	        // initialization may be required
	        this.events[name] = this.events[name] || [];
	        // append this new event to the list
	        this.events[name].push(function onceWrapper () {
	            self.removeListener(name, onceWrapper);
	            callback.apply(self, arguments);
	        });
	    },
	
	
	    /**
	     * Apply multiple listeners at once.
	     *
	     * @param {Object} callbacks event names with callbacks
	     *
	     * @example
	     * emitter.addListeners({
	     *     click: function ( data ) {},
	     *     close: function ( data ) {}
	     * });
	     */
	    addListeners: function ( callbacks ) {
	        var name;
	
	        if ( true ) {
	            if ( arguments.length !== 1 ) {
	                throw new Error(__filename + ': wrong arguments number');
	            }
	            if ( typeof callbacks !== 'object' ) {
	                throw new Error(__filename + ': wrong callbacks type');
	            }
	            if ( Object.keys(callbacks).length === 0 ) {
	                throw new Error(__filename + ': no callbacks given');
	            }
	        }
	
	        for ( name in callbacks ) {
	            if ( callbacks.hasOwnProperty(name) ) {
	                this.addListener(name, callbacks[name]);
	            }
	        }
	    },
	
	
	    /**
	     * Remove all instances of the given callback.
	     *
	     * @param {string} name event identifier
	     * @param {function} callback function to remove
	     *
	     * @example
	     * emitter.removeListener('click', func1);
	     */
	    removeListener: function ( name, callback ) {
	        if ( true ) {
	            if ( arguments.length !== 2 ) {
	                throw new Error(__filename + ': wrong arguments number');
	            }
	            if ( typeof name !== 'string' || name.length === 0 ) {
	                throw new Error(__filename + ': wrong or empty name');
	            }
	            if ( typeof callback !== 'function' ) {
	                throw new Error(__filename + ': wrong callback type');
	            }
	            if ( this.events[name] && !Array.isArray(this.events[name]) ) {
	                throw new Error(__filename + ': corrupted inner data');
	            }
	        }
	
	        // the event exists and should have some callbacks
	        if ( this.events[name] ) {
	            // rework the callback list to exclude the given one
	            this.events[name] = this.events[name].filter(function callbacksFilter ( fn ) { return fn !== callback; });
	            // event has no more callbacks so clean it
	            if ( this.events[name].length === 0 ) {
	                // as if there were no listeners at all
	                this.events[name] = undefined;
	            }
	        }
	    },
	
	
	    /**
	     * Remove all callbacks for the given event name.
	     * Without event name clears all events.
	     *
	     * @param {string} [name] event identifier
	     *
	     * @example
	     * emitter.removeAllListeners('click');
	     * emitter.removeAllListeners();
	     *
	     * @deprecated
	     */
	    /*removeAllListeners: function ( name ) {
	        if ( DEVELOP ) {
	            if ( arguments.length !== 0 && (typeof name !== 'string' || name.length === 0) ) {
	                throw new Error(__filename + ': wrong or empty name');
	            }
	        }
	
	        // check input
	        if ( arguments.length === 0 ) {
	            // no arguments so remove everything
	            this.events = {};
	        } else if ( name ) {
	            if ( DEVELOP ) {
	                if ( this.events[name] ) { throw new Error(__filename + ': event is not removed'); }
	            }
	
	            // only name is given so remove all callbacks for the given event
	            // but object structure modification should be avoided
	            this.events[name] = undefined;
	        }
	    },*/
	
	
	    /**
	     * Execute each of the listeners in the given order with the supplied arguments.
	     *
	     * @param {string} name event identifier
	     *
	     * @example
	     * emitter.emit('init');
	     * emitter.emit('click', {src: panel1, dst: panel2});
	     * emitter.emit('load', error, data);
	     *
	     * // it's a good idea to emit event only when there are some listeners
	     * if ( this.events['click'] ) {
	     *     this.emit('click', {event: event});
	     * }
	     */
	    emit: function ( name ) {
	        var event = this.events[name],
	            index;
	
	        if ( true ) {
	            if ( arguments.length < 1 ) {
	                throw new Error(__filename + ': wrong arguments number');
	            }
	            if ( typeof name !== 'string' || name.length === 0 ) {
	                throw new Error(__filename + ': wrong or empty name');
	            }
	        }
	
	        // the event exists and should have some callbacks
	        if ( event ) {
	            if ( true ) {
	                if ( !Array.isArray(event) ) {
	                    throw new Error(__filename + ': wrong event type');
	                }
	            }
	
	            for ( index = 0; index < event.length; index++ ) {
	                if ( true ) {
	                    if ( typeof event[index] !== 'function' ) {
	                        throw new Error(__filename + ': wrong event callback type');
	                    }
	                }
	
	                // invoke the callback with parameters
	                event[index].apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	        }
	    }
	};
	
	
	// correct constructor name
	Emitter.prototype.constructor = Emitter;
	
	
	// public
	module.exports = Emitter;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/cjs-emitter/index.js"))

/***/ }),
/* 5 */
/*!******************************!*\
  !*** ./~/cjs-query/index.js ***!
  \******************************/
/***/ (function(module, exports) {

	/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	module.exports = {
	    /**
	     * Parse the given location search string into object.
	     *
	     * @param {string} query string to parse
	     *
	     * @return {Object.<string, string>} result data
	     */
	    parse: function ( query ) {
	        var data = {};
	
	        // parse and fill the data
	        query.split('&').forEach(function ( part ) {
	            part = part.split('=');
	            // valid number on params
	            if ( part.length === 2 ) {
	                data[part[0]] = decodeURIComponent(part[1]);
	            }
	        });
	
	        return data;
	    },
	
	
	    /**
	     * Make uri query part in a string form.
	     *
	     * @param {Object} params data to stringify
	     *
	     * @return {string} query string
	     */
	    stringify: function ( params ) {
	        var data = [];
	
	        Object.keys(params).forEach(function ( name ) {
	            data.push(name + '=' + encodeURIComponent(params[name]));
	        });
	
	        return data.join('&');
	    }
	};


/***/ }),
/* 6 */
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/***/ (function(module, exports) {

	/**
	 * Global application configuration.
	 * Can store run-time options, API urls, paths, execution flags and so on.
	 * Automatically loaded on application initialization and available as app.config.
	 */
	
	'use strict';
	
	// public
	module.exports = {};


/***/ }),
/* 7 */
/*!*********************************!*\
  !*** ./~/spa-app/lib/events.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var app = __webpack_require__(/*! ./core */ 3);
	
	
	// public
	module.exports = {
	    DOMContentLoaded: function ( event ) {
	        //debug.event(event);
	        //console.log(event);
	
	        //debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	        console.log('app event: ' + event.type, event);
	
	        // there are some listeners
	        if ( app.events['dom'] ) {
	            // notify listeners
	            app.emit('dom', event);
	            //console.log('DOMContentLoaded');
	        }
	    },
	
	    /**
	     * The load event is fired when a resource and its dependent resources have finished loading.
	     *
	     * Control flow:
	     *   1. Global handler.
	     *   2. Each page handler.
	     *   3. Application DONE event.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/load
	     *
	     * @param {Event} event generated object with event data
	     */
	    load: function ( event ) {
	        //var path;
	
	        //debug.event(event);
	        //console.log(event);
	
	        // time mark
	        //app.data.time.load = event.timeStamp;
	
	        //debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	        console.log('app event: ' + event.type, event);
	
	        // global handler
	        // there are some listeners
	        if ( app.events[event.type] ) {
	            // notify listeners
	            app.emit(event.type, event);
	        }
	
	        // local handler on each page
	        /*router.pages.forEach(function forEachPages ( page ) {
	         debug.log('component ' + page.constructor.name + '.' + page.id + ' load', 'green');
	
	         // there are some listeners
	         if ( page.events[event.type] ) {
	         // notify listeners
	         page.emit(event.type, event);
	         }
	         });*/
	
	        // time mark
	        //app.data.time.done = +new Date();
	
	        // everything is ready
	        // and there are some listeners
	        // if ( app.events['done'] ) {
	        //     // notify listeners
	        //     app.emit('done', event);
	        // }
	    },
	
	    /**
	     * The unload event is fired when the document or a child resource is being unloaded.
	     *
	     * Control flow:
	     *   1. Each page handler.
	     *   2. Global handler.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/unload
	     *
	     * @param {Event} event generated object with event data
	     */
	    unload: function ( event ) {
	        //debug.event(event);
	        //console.log(event);
	
	        //debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	        console.log('app event: ' + event.type, event);
	
	        // global handler
	        // there are some listeners
	        if ( app.events[event.type] ) {
	            // notify listeners
	            app.emit(event.type, event);
	        }
	
	        // local handler on each page
	        /*router.pages.forEach(function forEachPages ( page ) {
	         debug.log('component ' + page.constructor.name + '.' + page.id + ' unload', 'red');
	
	         // there are some listeners
	         if ( page.events[event.type] ) {
	         // notify listeners
	         page.emit(event.type, event);
	         }
	         });*/
	    },
	
	    /**
	     * The error event is fired when a resource failed to load.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/error
	     *
	     * @param {Event} event generated object with event data
	     */
	    error: function ( event ) {
	        //debug.event(event);
	        //console.log(event);
	        //debug.fail('app event: ' + event.message, event, {tags: [event.type, 'event']});
	        console.error('app event: ' + event.message, event);
	    },
	
	    /**
	     * The keydown event is fired when a key is pressed down.
	     * Set event.stop to true in order to prevent bubbling.
	     *
	     * Control flow:
	     *   1. Current active component on the active page.
	     *   2. Current active page itself.
	     *   3. Application.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keydown
	     *
	     * @param {Event} event generated object with event data
	     */
	    keydown: function ( event ) {
	        var page = app.activePage,
	            eventLocal = {
	                code: event.keyCode,
	                stop: false
	            },
	            activeComponent;
	
	        if ( true ) {
	            if ( !page ) {
	                throw new Error(__filename + ': app should have at least one page');
	            }
	        }
	
	        // filter phantoms
	        //if ( event.keyCode === 0 ) { return; }
	
	        // combined key code
	        //event.code = event.keyCode;
	
	        // apply key modifiers
	        if ( event.ctrlKey )  { eventLocal.code += 'c'; }
	        if ( event.altKey )   { eventLocal.code += 'a'; }
	        if ( event.shiftKey ) { eventLocal.code += 's'; }
	
	        //debug.event(event);
	        //console.log(event);
	        //debug.info('app event: ' + event.type + ' - ' + eventLocal.code, event, {tags: [event.type, 'event']});
	        console.log('app event: ' + event.type + ' - ' + eventLocal.code, event);
	
	        // page.activeComponent can be set to null in event handles
	        activeComponent = page.activeComponent;
	
	        // current component handler
	        if ( activeComponent && activeComponent !== page ) {
	            // component is available and not page itself
	            if ( activeComponent.events[event.type] ) {
	                // there are some listeners
	                activeComponent.emit(event.type, eventLocal, event);
	            }
	
	            // todo: bubble event recursively
	            // bubbling
	            if (
	                !eventLocal.stop &&
	                activeComponent.propagate &&
	                activeComponent.parent &&
	                activeComponent.parent.events[event.type]
	            ) {
	                activeComponent.parent.emit(event.type, eventLocal, event);
	            }
	        }
	
	        // page handler
	        if ( !eventLocal.stop ) {
	            // not prevented
	            if ( page.events[event.type] ) {
	                // there are some listeners
	                page.emit(event.type, eventLocal, event);
	            }
	
	            // global app handler
	            if ( !event.stop ) {
	                // not prevented
	                if ( app.events[event.type] ) {
	                    // there are some listeners
	                    app.emit(event.type, eventLocal, event);
	                }
	            }
	        }
	
	        //// suppress non-printable keys in stb device (not in your browser)
	        //if ( app.data.host && keyCodes[event.code] ) {
	        //    event.preventDefault();
	        //}
	    },
	
	    /**
	     * The keypress event is fired when press a printable character.
	     * Delivers the event only to activeComponent at active page.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keypress
	     *
	     * @param {Event} event generated object with event data
	     * @param {string} event.char entered character
	     */
	    keypress: function ( event ) {
	        var page = app.activePage;
	
	        if ( true ) {
	            if ( page === null || page === undefined ) {
	                throw new Error(__filename + ': app should have at least one page');
	            }
	        }
	
	        //debug.event(event);
	        //console.log(event);
	        //debug.info('app event: ' + event.type + ' - ' + event.key, event, {tags: [event.type, 'event']});
	        console.log('app event: ' + event.type + ' - ' + event.key, event);
	
	        // current component handler
	        if ( page.activeComponent && page.activeComponent !== page ) {
	            // component is available and not page itself
	            if ( page.activeComponent.events[event.type] ) {
	                // there are some listeners
	                page.activeComponent.emit(event.type, event);
	            }
	        }
	    },
	
	    /**
	     * The click event is fired when a pointing device button (usually a mouse button) is pressed and released on a single element.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
	     *
	     * @param {Event} event generated object with event data
	     */
	    /*click: function ( event ) {
	     //debug.event(event);
	     //console.log(event);
	     debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	     },*/
	
	    /**
	     * The contextmenu event is fired when the right button of the mouse is clicked (before the context menu is displayed),
	     * or when the context menu key is pressed (in which case the context menu is displayed at the bottom left of the focused
	     * element, unless the element is a tree, in which case the context menu is displayed at the bottom left of the current row).
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/contextmenu
	     *
	     * @param {Event} event generated object with event data
	     */
	    // contextmenu: function ( event ) {
	    //     debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	    //
	    //     if ( !DEVELOP ) {
	    //         // disable right click in release mode
	    //         event.preventDefault();
	    //     }
	    // },
	
	    /*contextmenu: function ( event ) {
	     //var kbEvent = {}; //Object.create(document.createEvent('KeyboardEvent'));
	
	     //debug.event(event);
	     //console.log(event);
	     debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	
	     //kbEvent.type    = 'keydown';
	     //kbEvent.keyCode = 8;
	
	     //debug.log(kbEvent.type);
	
	     //globalEventListenerKeydown(kbEvent);
	     //var event = document.createEvent('KeyboardEvent');
	     //event.initEvent('keydown', true, true);
	
	     //document.dispatchEvent(kbEvent);
	
	     if ( !DEVELOP ) {
	     // disable right click in release mode
	     event.preventDefault();
	     }
	     },*/
	
	    /**
	     * The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel
	     *
	     * @param {Event} event generated object with event data
	     */
	    mousewheel: function ( event ) {
	        var page = app.activePage;
	
	        if ( true ) {
	            if ( page === null || page === undefined ) {
	                throw new Error(__filename + ': app should have at least one page');
	            }
	        }
	
	        //debug.event(event);
	        //console.log(event);
	        //debug.info('app event: ' + event.type, event, {tags: [event.type, 'event']});
	        console.log('app event: ' + event.type, event);
	
	        // current component handler
	        if ( page.activeComponent && page.activeComponent !== page ) {
	            // component is available and not page itself
	            if ( page.activeComponent.events[event.type] ) {
	                // there are some listeners
	                page.activeComponent.emit(event.type, event);
	            }
	        }
	
	        // page handler
	        if ( !event.stop ) {
	            // not prevented
	            if ( page.events[event.type] ) {
	                // there are some listeners
	                page.emit(event.type, event);
	            }
	        }
	    }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-app/lib/events.js"))

/***/ }),
/* 8 */
/*!***************************************!*\
  !*** ./~/stb-shim-classlist/index.js ***!
  \***************************************/
/***/ (function(module, exports) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint-disable */
	
	'use strict';
	
	
	if ( !document.documentElement.classList ) {
	    var prototype = Array.prototype,
	        indexOf   = prototype.indexOf,
	        slice     = prototype.slice,
	        push      = prototype.push,
	        splice    = prototype.splice,
	        join      = prototype.join;
	
	    window.DOMTokenList = function ( el ) {
	        this._element = el;
	        if (el.className !== this._classCache) {
	            this._classCache = el.className;
	            if (!this._classCache) { return; }
	            var classes = this._classCache.replace(/^\s+|\s+$/g,'').split(/\s+/),
	                i;
	            for (i = 0; i < classes.length; i++) {
	                push.call(this, classes[i]);
	            }
	        }
	    };
	
	    window.DOMTokenList.prototype = {
	        add: function ( token ) {
	            if(this.contains(token)) { return; }
	            push.call(this, token);
	            this._element.className = slice.call(this, 0).join(' ');
	        },
	
	        contains: function ( token ) {
	            return indexOf.call(this, token) !== -1;
	        },
	
	        item: function ( index ) {
	            return this[index] || null;
	        },
	
	        remove: function ( token ) {
	            var i = indexOf.call(this, token);
	            if (i === -1) {
	                return;
	            }
	            splice.call(this, i, 1);
	            this._element.className = slice.call(this, 0).join(' ');
	        },
	
	        toString: function () {
	            return join.call(this, ' ');
	        },
	
	        toggle: function ( token ) {
	            if (!this.contains(token)) {
	                this.add(token);
	            } else {
	                this.remove(token);
	            }
	            return this.contains(token);
	        }
	    };
	
	    Object.defineProperty(Element.prototype, 'classList', {
	        get: function () {
	            return new window.DOMTokenList(this);
	        }
	    });
	}


/***/ }),
/* 9 */
/*!**********************************!*\
  !*** ./~/stb-app/lib/metrics.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var app     = __webpack_require__(/*! spa-app/lib/core */ 3),
	    metrics = __webpack_require__(/*! app:metrics */ 10);
	
	
	// global link
	app.metrics = metrics[app.query.screenHeight] || metrics[screen.height] || metrics[720];
	
	// calculate and extend
	app.metrics.availHeight = app.metrics.height - (app.metrics.availTop  + app.metrics.availBottom);
	app.metrics.availWidth  = app.metrics.width  - (app.metrics.availLeft + app.metrics.availRight);
	
	
	// public
	//module.exports = app;


/***/ }),
/* 10 */
/*!***************************!*\
  !*** ./src/js/metrics.js ***!
  \***************************/
/***/ (function(module, exports) {

	/**
	 * Application geometry options for js/less.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	// public export
	module.exports = {
		480 : {
			// screen base dimension
			height: 480,
			width : 720,
			// safe zone margins
			availTop   : 24,
			availBottom: 24,
			availRight : 32,
			availLeft  : 48,
			mainMenuSize: 8
		},
	
		576 : {
			// screen base dimension
			height: 576,
			width : 720,
			// safe zone margins
			availTop   : 24,
			availBottom: 24,
			availRight : 28,
			availLeft  : 54,
			mainMenuSize: 10
		},
	
		720 : {
			// screen base dimension
			height: 720,
			width : 1280,
			// safe zone margins
			availTop   : 10,
			availBottom: 10,
			availRight : 10,
			availLeft  : 10,
			mainMenuSize: 9
		},
	
		1080: {
			// screen base dimension
			height: 1080,
			width : 1920,
			// safe zone margins
			availTop   : 15,
			availBottom: 15,
			availRight : 15,
			availLeft  : 15,
			mainMenuSize: 9
		}
	};


/***/ }),
/* 11 */
/*!******************************!*\
  !*** ./~/stb-app/lib/css.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var app = __webpack_require__(/*! spa-app/lib/core */ 3);
	//    metrics = require('app:metrics'),
	//    linkCSS;
	
	
	// global link
	//app.metrics = metrics[app.query.screenHeight] || metrics[screen.height] || metrics[720];
	
	// calculate and extend
	//app.metrics.availHeight = app.metrics.height - (app.metrics.availTop  + app.metrics.availBottom);
	//app.metrics.availWidth  = app.metrics.width  - (app.metrics.availLeft + app.metrics.availRight);
	
	// // set max browser window size
	// window.moveTo(0, 0);
	// window.resizeTo(metrics.width, metrics.height);
	
	// load CSS file base on resolution
	/*linkCSS = document.createElement('link');
	linkCSS.rel  = 'stylesheet';
	linkCSS.href = 'css/' + (DEVELOP ? 'develop.' : 'release.') + app.metrics.height + '.css' + (DEVELOP ? '?' + Date.now() : '');
	document.head.appendChild(linkCSS);*/
	
	
	// public
	module.exports = function ( name ) {
	    var link = document.createElement('link');
	
	    link.rel  = 'stylesheet';
	    link.href = 'css/' + ( true ? 'develop.' : 'release.') + name + '.' + app.metrics.height + '.css' + ( true ? '?' + Date.now() : '');
	    document.head.appendChild(link);
	};


/***/ }),
/* 12 */
/*!******************************!*\
  !*** ./~/mag-app/lib/css.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var app = __webpack_require__(/*! spa-app/lib/core */ 3),
	    //metrics = require('app:metrics'),
	    linkCSS;
	
	
	//window.core = window.parent.getCoreInstance(window, app);
	
	
	linkCSS = document.createElement('link');
	linkCSS.rel  = 'stylesheet';
	linkCSS.href = window.core.theme.path + app.metrics.height + '.css' + ( true ? '?' + Date.now() : '');
	document.head.appendChild(linkCSS);
	
	
	// public
	module.exports = linkCSS;


/***/ }),
/* 13 */
/*!***************************************!*\
  !*** ./~/mag-app/lib/develop/main.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	var app = __webpack_require__(/*! spa-app/lib/core */ 3);
	
	
	// shims
	__webpack_require__(/*! stb-shim-bind */ 14);
	__webpack_require__(/*! stb-shim-classlist */ 8);
	__webpack_require__(/*! stb-shim-frame */ 15);
	
	// public app instance
	window.app = app;
	
	// all development tools placeholder
	app.develop = {
	    // use local storage from iframe or use stbStorage from top window
	    storage: window.localStorage || window.top.stbStorage
	};
	
	// execution environment
	// STB device or desktop browser
	app.host = !!(window.gSTB || (window.parent && window.parent.gSTB));
	
	// browser logging
	window.debug = __webpack_require__(/*! spa-app/lib/develop/debug */ 16);
	// STB logging
	//window.debug = app.host ? require('./debug') : require('spa-develop/debug');
	
	// universal storage
	//window.localStorage = window.localStorage || window.stbStorage;
	
	//window.localStorage = window.stbStorage || window.parent.stbStorage;
	
	// apply screen size, position, margins and styles
	// app.setScreen(
	//     app.metrics[localStorage.getItem('screen.height')] ||
	//     app.metrics[screen.height] ||
	//     app.metrics[720]
	// );
	
	// inherit SPA tools
	__webpack_require__(/*! spa-app/lib/develop/wamp */ 17);
	__webpack_require__(/*! spa-app/lib/develop/events */ 20);
	__webpack_require__(/*! spa-app/lib/develop/hooks */ 22);
	__webpack_require__(/*! spa-app/lib/develop/static */ 23);
	
	// STB tools
	if ( app.host ) {
	    // web inspector
	    //require('./weinre');
	}
	
	//require('./proxy');
	__webpack_require__(/*! stb-app/lib/develop/events */ 25);
	
	// the application itself
	// "js" directory is resolved by webpack to
	// path.join(process.env.PATH_ROOT, process.env.PATH_SRC, 'js')
	//require('js/main');


/***/ }),
/* 14 */
/*!**********************************!*\
  !*** ./~/stb-shim-bind/index.js ***!
  \**********************************/
/***/ (function(module, exports) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint-disable */
	
	'use strict';
	
	
	if ( !Function.prototype.bind ) {
	    Function.prototype.bind = function ( oThis ) {
	        if ( typeof this !== 'function' ) {
	            // closest thing possible to the ECMAScript 5
	            // internal IsCallable function
	            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	        }
	
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	            fToBind = this,
	            fNOP = function () {},
	            fBound = function () {
	                return fToBind.apply(this instanceof fNOP && oThis
	                        ? this
	                        : oThis,
	                    aArgs.concat(Array.prototype.slice.call(arguments)));
	            };
	
	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();
	
	        return fBound;
	    };
	}


/***/ }),
/* 15 */
/*!***********************************!*\
  !*** ./~/stb-shim-frame/index.js ***!
  \***********************************/
/***/ (function(module, exports) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint-disable */
	
	'use strict';
	
	
	if ( !window.requestAnimationFrame ) {
	    // shim layer with setTimeout fallback
	    window.requestAnimationFrame =
	        window.mozRequestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.msRequestAnimationFrame ||
	        function ( callback ) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	}
	


/***/ }),
/* 16 */
/*!****************************************!*\
  !*** ./~/spa-app/lib/develop/debug.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * Logger.
	 *
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	/* eslint new-cap: 0 */
	
	'use strict';
	
	var //host      = require('../app').data.host,
	    app       = __webpack_require__(/*! ../core */ 3),
	    //util      = require('util'),
	    timeMarks = {},  // storage for timers (debug.time, debug.timeEnd)
	    buffer    = [],
	    debug     = {},
	    links     = {},
	    linkId    = 0;
	
	
	// debug.config = {
	//     depth: 3
	// };
	
	
	/**
	 * Check condition and warn if not match.
	 *
	 * @param {boolean} condition should be true if okay
	 * @param {string} title description of the problem
	 */
	debug.assert = function ( condition, title ) {
	    if ( !condition ) {
	        console.assert(condition, title);
	    }
	};
	
	
	debug.links = links;
	
	
	function prepareConfig ( config ) {
	    config = config || {};
	
	    config.tags = config.tags || [];
	    config.tags.push('target');
	
	    return config;
	}
	
	
	function wrapData ( data ) {
	    var result = {
	        type: typeof data
	    };
	
	    if ( data && result.type === 'object' ) {
	        result.link = linkId++;
	        links[result.link] = data;
	
	        if ( data.constructor && data.constructor.name ) {
	            result.name = data.constructor.name;
	        }
	
	        if ( 'length' in data ) {
	            result.size = data.length;
	        }
	    } else {
	        result.value = data;
	    }
	
	    return result;
	}
	
	
	// todo: remove setTimeout hack
	setTimeout(function () {
	    if ( app.develop.wamp ) {
	        app.develop.wamp.addListener('getLinkData', function ( params, callback ) {
	            var link = links[params.id],
	                data = {};
	
	            console.log('incoming getLinkData', params);
	            //console.log(link);
	
	            if ( link ) {
	                Object.keys(link).forEach(function ( name ) {
	                    data[name] = wrapData(link[name]);
	                });
	            }
	
	            callback(null, data);
	        });
	    }
	}, 1000);
	
	
	/**
	 * Print a plain colored string.
	 *
	 * @param {*} message data to output
	 * @param {string} [color='black'] colour to set
	 */
	debug.log = function ( info, data, config ) {
	    // message = (message + '') || '(empty message)';
		//
	    // console.log('%c%s', 'color:' + (color || 'black'), message);
	
	    // sanitize
	    config = config || {};
	
	    config.info = info;
	    //config.data = data ? util.inspect(data, {depth: debug.config.depth}) : null;
	    config.data = data !== undefined ? wrapData(data) : undefined;
	    //config.data = wrapData(data);
	    config.time = Date.now();
	    config.targetId = app.query.wampTargetId;
	    //config.tags = config.tags.sort();
	
	    if ( app.develop.wamp && app.develop.wamp.open ) {
	        if ( buffer.length ) {
	            buffer.forEach(function ( bufItem ) {
	                if ( app.develop.wamp ) {
	                    app.develop.wamp.call('sendMessage', bufItem);
	                }
	            });
	            buffer = [];
	        }
	
	        if ( app.develop.wamp ) {
	            app.develop.wamp.call('sendMessage', config);
	        }
	    } else {
	        buffer.push(config);
	    }
	};
	
	
	/**
	 * Print the given var with caption.
	 *
	 * @param {*} data data to output
	 * @param {string} [title] optional caption
	 */
	debug.info = function ( info, data, config ) {
	    /*var type = Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase(),
	        args;
	
	    args = ['color:' + (type === 'error' ? 'red' : 'green'), type];
	    if ( title ) {
	        args.unshift('%c%s\t%c%s\t');
	        args.push('color:grey');
	        args.push(title);
	    } else {
	        args.unshift('%c%s\t');
	    }
	    args.push(data);
	    // output
	    console.log.apply(console, args);*/
	
	    config = prepareConfig(config);
	    //config.tags.push('info');
	    config.type = 'info';
	
	    debug.log(info, data, config);
	};
	
	
	debug.warn = function ( info, data, config ) {
	    config = prepareConfig(config);
	    //config.tags.push('warn');
	    config.type = 'warn';
	
	    debug.log(info, data, config);
	};
	
	
	debug.fail = function ( info, data, config ) {
	    config = prepareConfig(config);
	    //config.tags.push('fail');
	    config.type = 'fail';
	
	    debug.log(info, data, config);
	};
	
	
	/**
	 * Print the given complex var with level restriction.
	 *
	 * @param {*} data data to output
	 */
	debug.inspect = function ( data ) {
	    console.log(data);
	};
	
	
	/**
	 * Print the given event object in some special way.
	 *
	 * @param {Event} data event object
	 */
	debug.event = function ( data ) {
	    var type  = data.type.toUpperCase(),
	        color = type === 'ERROR' ? 'red' : 'green';
	
	    switch ( type ) {
	        case 'KEYDOWN':
	        case 'KEYPRESS':
	            console.log('%o\t%c%s %c%s %c%s %c%s %c%s\t%s\t%c%s', data, 'color:' + color + ';font-weight:bold', type,
	                'color:' + (data.ctrlKey  ? 'green' : 'lightgrey'), 'ctrl',
	                'color:' + (data.altKey   ? 'green' : 'lightgrey'), 'alt',
	                'color:' + (data.shiftKey ? 'green' : 'lightgrey'), 'shift',
	                'color:black', data.keyCode, data.code || '', 'color:green', data.keyIdentifier
	            );
	            break;
	        default:
	            console.log('%o\t%c%s', data, 'color:' + color + ';font-weight:bold', type);
	    }
	};
	
	
	/**
	 * Start specific timer.
	 * Use to calculate time of some actions.
	 *
	 * @param {string} [name=''] timer group name
	 * @param {string} [title=''] timer individual mark caption
	 *
	 * @example
	 * debug.time('request');
	 * // some processing...
	 * debug.time('request');
	 * // prints 'time: +20ms'
	 * // some processing...
	 * debug.time('request', 'ready');
	 * // prints 'time (ready): +40ms'
	 * // some processing...
	 * debug.time('request', 'done');
	 * // prints 'time (done): +60ms'
	 */
	debug.time = function ( name, title ) {
	    var time = Date.now();
	
	    // sanitize
	    name  = name  || '';
	    title = title || '';
	
	    // is this mark exist
	    if ( timeMarks[name] ) {
	        // already set
	        debug.log((name || 'time') + (title ? ' (' + title + ')' : '') + ': +' + (time - timeMarks[name].last) + 'ms', 'blue');
	    } else {
	        // create a new mark
	        timeMarks[name] = {init: time};
	    }
	
	    // update with the current value
	    timeMarks[name].last = time;
	};
	
	
	/**
	 * End specific timer.
	 * Use to calculate time of some actions.
	 *
	 * @param {string} [name=''] timer name
	 * @param {string} [title='total'] timer mark caption
	 *
	 * @example
	 * debug.time();
	 * // some processing...
	 * debug.timeEnd();
	 * // prints 'time (total): 934ms'
	 *
	 * @example
	 * debug.time('request');
	 * // some processing...
	 * debug.timeEnd('request', 'done');
	 * // prints 'request (done): 934ms'
	 */
	debug.timeEnd = function ( name, title ) {
	    var time = Date.now();
	
	    // sanitize
	    name  = name  || '';
	    title = title || 'total';
	
	    // is this mark exist
	    if ( timeMarks[name] ) {
	        debug.log((name || 'time') + ' (' + title + '): ' + (time - timeMarks[name].init) + 'ms', 'blue');
	
	        delete timeMarks[name];
	    } else {
	        throw new Error(__filename + ': no started timer for "' + name + '"');
	    }
	};
	
	
	// public
	module.exports = debug;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-app/lib/develop/debug.js"))

/***/ }),
/* 17 */
/*!***************************************!*\
  !*** ./~/spa-app/lib/develop/wamp.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	var app       = __webpack_require__(/*! ../core */ 3),
	    Wamp      = __webpack_require__(/*! spa-wamp */ 18),
	    stringify = __webpack_require__(/*! cjs-query */ 5).stringify;
	
	
	if ( app.query.wampPort ) {
	    // correct type
	    app.query.wampTargetId = parseInt(app.query.wampTargetId, 10);
	
	    app.develop.wamp = new Wamp(
	        'ws://' + (app.query.wampHost || location.hostname) + ':' + app.query.wampPort + '/target/' + (app.query.wampTargetId || '')
	    );
	
	    app.develop.wamp.onopen = function () {
	        //app.develop.wamp.addListener(app.develop.wamp.EVENT_OPEN, function () {
	        debug.info('wamp open ' + app.develop.wamp.socket.url, null, {tags: ['open', 'wamp']});
	
	        // get target connection id
	        app.develop.wamp.call('getConnectionInfo', {}, function ( error, data ) {
	            // check if already linked
	            if ( !error && app.query.wampTargetId !== data.id ) {
	                // disconnect
	                app.develop.wamp.socket.close();
	                // correct url
	                app.query.wampTargetId = data.id;
	                // bind to the target id
	                location.search = '?' + stringify(app.query);
	            }
	        });
	        //});
	    };
	
	    app.develop.wamp.onclose = function () {
	        debug.info('wamp close ' + app.develop.wamp.socket.url, null, {tags: ['close', 'wamp']});
	    };
	
	    app.develop.wamp.addListener('evalCode', function ( params, callback ) {
	        console.log('incoming evalCode', params);
	
	        /* eslint no-eval: 0 */
	        callback(null, {eval: eval(params.code)});
	    });
	}


/***/ }),
/* 18 */
/*!*****************************!*\
  !*** ./~/spa-wamp/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	var CjsWamp = __webpack_require__(/*! cjs-wamp */ 19);
	
	
	/**
	 * WAMP implementation wrapper.
	 *
	 * @param {string} uri socket address to connect
	 * @param {Object} [config={}] init parameters
	 * @param {number} [config.timeout] time between connection retries
	 *
	 * @constructor
	 */
	function Wamp ( uri, config ) {
	    var self = this;
	
	    function getSocket () {
	        var socket = new WebSocket(uri);
	
	        socket.onopen = function () {
	            if ( typeof self.onopen === 'function' ) {
	                self.onopen();
	            }
	
	            // set activity flag
	            self.open = true;
	        };
	
	        // reconnect
	        socket.onclose = function () {
	            if ( typeof self.onclose === 'function' && self.open ) {
	                self.onclose();
	            }
	
	            // mark as closed
	            self.open = false;
	
	            if ( self.timeout ) {
	                setTimeout(function () {
	                    // recreate connection
	                    self.socket = getSocket();
	                    // reroute messages
	                    self.socket.onmessage = function ( event ) {
	                        self.router(event.data);
	                    };
	                }, self.timeout);
	            }
	        };
	
	        return socket;
	    }
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    // sanitize
	    config = config || {};
	
	    // connection state
	    this.open = false;
	
	    // override prototype value
	    if ( config.timeout ) {
	        this.timeout = config.timeout;
	    }
	
	    // events
	    this.onopen  = null;
	    this.onclose = null;
	
	    // parent constructor call
	    CjsWamp.call(this, getSocket());
	}
	
	
	// inheritance
	Wamp.prototype = Object.create(CjsWamp.prototype);
	Wamp.prototype.constructor = Wamp;
	
	// configuration
	Wamp.prototype.timeout = 5000;
	
	
	// public
	module.exports = Wamp;


/***/ }),
/* 19 */
/*!*****************************!*\
  !*** ./~/cjs-wamp/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	/** @private */
	var Emitter   = __webpack_require__(/*! cjs-emitter */ 4),
	    messageId = 0,
	    callbacks = {};
	
	
	/**
	 * Lightweight WAMP implementation based on WebSockets.
	 *
	 * @param {WebSocket} socket link to socket connection to wrap
	 *
	 * @see http://wamp-proto.org/
	 * @constructor
	 */
	function Wamp ( socket ) {
	    var self = this;
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    // parent constructor call
	    Emitter.call(this);
	
	    this.socket = socket;
	
	    if ( 'on' in socket ) {
	        // server-side
	        socket.on('message', function ( message ) {
	            self.router(message);
	        });
	    } else if ( 'onmessage' in socket ) {
	        // desktop browser
	        socket.onmessage = function ( event ) {
	            self.router(event.data);
	        };
	    }
	}
	
	
	/**
	 * Send data through the given socket.
	 *
	 * @param {WebSocket} socket pipe to send through
	 * @param {Object} message data to send
	 */
	function send ( socket, message ) {
	    // connection is open
	    if ( socket.readyState === 1 ) {
	        // protocol version
	        message.jsonrpc = '2.0';
	
	        socket.send(JSON.stringify(message));
	    }
	}
	
	
	// inheritance
	Wamp.prototype = Object.create(Emitter.prototype);
	Wamp.prototype.constructor = Wamp;
	
	
	/**
	 * Internal method to handle messages.
	 *
	 * @param {string} message request JSON data
	 *
	 * @private
	 */
	Wamp.prototype.router = function ( message ) {
	    var self = this,
	        data;
	
	    try {
	        data = JSON.parse(message);
	    } catch ( error ) {
	        send(this.socket, {
	            error: {code: -32700, message: 'Parse error'},
	            id: null
	        });
	
	        return;
	    }
	
	    if ( 'id' in data && !('method' in data) ) {
	        // incoming answer for previous request
	        if ( data.id in callbacks ) {
	            callbacks[data.id](data.error, data.result);
	            delete callbacks[data.id];
	        } else {
	            // no callback registered for this id
	        }
	    } else if ( !('id' in data) && 'method' in data ) {
	        // incoming notification
	        if ( this.events[data.method] ) {
	            this.emit(data.method, data.params);
	        }
	    } else if ( 'id' in data && 'method' in data ) {
	        // execute incoming method and report to sender
	        if ( this.events[data.method] ) {
	            this.emit(data.method, data.params, function ( error, result ) {
	                send(self.socket, {
	                    error: error,
	                    result: result,
	                    id: data.id
	                });
	            });
	        } else {
	            // wrong method
	            send(this.socket, {
	                error: {code: -32601, message: 'Method not found'},
	                id: data.id
	            });
	        }
	    } else {
	        // wrong request
	        send(this.socket, {
	            error: {code: -32600, message: 'Invalid Request'},
	            id: null
	        });
	    }
	};
	
	
	/**
	 * Send message to execute remotely or notify (without `callback` argument).
	 *
	 * @param {string} method procedure or event name
	 * @param {*} [params] procedure associated data
	 * @param {function} [callback] remote call results handler
	 */
	Wamp.prototype.call = function ( method, params, callback ) {
	    var message = {
	        method: method,
	        params: params
	    };
	
	    // execution mode with callback
	    // notification mode otherwise
	    if ( typeof callback === 'function' ) {
	        message.id = ++messageId;
	        callbacks[messageId] = callback;
	    }
	
	    send(this.socket, message);
	};
	
	
	// public
	module.exports = Wamp;


/***/ }),
/* 20 */
/*!*****************************************!*\
  !*** ./~/spa-app/lib/develop/events.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Additional dev events.
	 *
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	/* eslint new-cap: 0 */
	
	var //util    = require('util'),
	    app      = __webpack_require__(/*! ../core */ 3),
	    //Wamp     = require('spa-wamp'),
	    //request  = require('spa-request'),
	    gremlins = __webpack_require__(/*! gremlins.js/gremlins.min.js */ 21),
	    events   = {};
	    //app;
	    //dom     = require('spa-dom'),
	    //grid    = require('./grid');
	
	
	events.load = function () {
	    // app instance
	    //window.app = app = require('spa-app');
	
	    /*if ( app.query.wampPort ) {
	        //console.log('connect to WAMP server');
	        app.develop.wamp = new Wamp(
	            //new WebSocket('ws://' + (app.query.wampHost || location.hostname) + ':' + app.query.wampPort + '/target')
	            'ws://' + (app.query.wampHost || location.hostname) + ':' + app.query.wampPort + '/target'
	        );
	
	        app.develop.wamp.addListener('connection:open', function () {
	            console.log('wamp open ' + app.develop.wamp.socket.url);
	        });
	
	        app.develop.wamp.addListener('connection:close', function () {
	            console.log('wamp close ' + app.develop.wamp.socket.url);
	        });
	
	        // ready
	        /!*window.app.wamp.socket.onopen = function () {
	            console.log('wamp is ready!');
	        };*!/
	    }*/
	
	    // export to globals div for develop HTML elements
	    /*window.$develop = document.body.appendChild(document.createElement('div'));
	    window.$develop.className = 'develop';/**/
	
	    // apply dev css
	    document.body.classList.add('develop');
	
	    //grid.init();
	
	    //if ( localStorage.getItem('grid.active') ) {
	    //    grid.show();
	    //}
	
	    // stress-testing
	    app.develop.horde = gremlins.createHorde();
	};
	
	
	events.keydown = function ( event ) {
	    switch ( event.keyCode ) {
	        // key b
	        /*case 66:
	            if ( event.altKey && app.develop.wamp ) {
	                app.develop.wamp.call('runTask', {id: 'build'}, function ( error, result ) {
	                    console.log('task build executed: ', error, result);
	                });
	            }
	            break;/**/
	
	        // numpad 0
	        case 96:
	            //debug.info('full app reload', null, {tags: ['reload']});
	            console.log('full app reload');
	            location.hash = '';
	            location.reload();
	            break;
	
	        // numpad 5
	        //case 101:
	        //    // debug grid
	        //    if ( grid.active ) {
	        //        grid.hide();
	        //    } else {
	        //        grid.show();
	        //    }
	        //    debug.log('show grid: ' + grid.active, 'red');
	        //    localStorage.setItem('grid.active', grid.active);
	        //    break;
	
	        // numpad 6
	        case 102:
	            // stress-testing
	            app.develop.horde.unleash({nb: 500});
	            break;
	
	        // numpad 7
	        /*case 103:
	            //if ( !app.data.host ) {
	            //    debug.log('SpyJS in this mode is available only on STB devices.', 'red');
	            //} else {
	            // SpyJS enable/disable
	            if ( localStorage.getItem('spyjs.active') ) {
	                //isSpyJs = false;
	                localStorage.setItem('spyjs.active', false);
	                gSTB.ResetWebProxy();
	                debug.log('SpyJS: disable', 'red');
	                location.reload();
	            } else {
	                // try to "ping" proxy server
	                request.ajax(document.location.protocol + '//' + location.hostname + ':3546', {
	                    method: 'get',
	                    onload: function () {
	                        // proxy seems ready
	                        //isSpyJs = true;
	                        localStorage.setItem('spyjs.active', true);
	                        debug.log('SpyJS: enable', 'red');
	                        debug.log('SpyJS: set proxy to ' + location.hostname + ':' + 3546);
	
	                        gSTB.SetWebProxy(location.hostname, 3546, '', '', '');
	                        location.reload();
	                    },
	                    onerror: function () {
	                        debug.log('SpyJS: no connection (check SpyJS is started on the server)', 'red');
	                    }
	                });
	            }
	            //}
	            break;*/
	
	        //// numpad 8
	        //case 104:
	        //    // FireBug Lite
	        //    debug.log('firebug-lite activation', 'red');
	        //    document.head.appendChild(dom.tag('script', {
	        //        type: 'text/javascript',
	        //        src: 'http://getfirebug.com/firebug-lite.js#startOpened',
	        //        onload: function () {
	        //            debug.log('firebug-lite ready ...', 'green');
	        //        },
	        //        onerror: function ( error ) {
	        //            debug.inspect(error);
	        //        }
	        //    }));
	        //    break;
	
	        // numpad 9
	        /*case 105:
	            // outline components and inner structures
	            //debug.info('toggle develop/release css layout', null, {tags: ['css', 'toggle']});
	            console.log('toggle develop/release css layout');
	            // get through all css links
	            Array.prototype.forEach.call(document.querySelectorAll('link[rel=stylesheet]'), function ( link ) {
	                if ( link.href.indexOf('/release.') === -1 ) {
	                    link.href = link.href.replace('/develop.', '/release.');
	                } else {
	                    link.href = link.href.replace('/release.', '/develop.');
	                }
	            });
	            break;/**/
	
	        // numpad .
	        case 110:
	            // CSS reload
	            //debug.info('CSS reload', null, {tags: ['css', 'reload']});
	            console.log('CSS reload');
	            // get through all css links
	            Array.prototype.forEach.call(document.querySelectorAll('link[rel=stylesheet]'), function ( link ) {
	                // get base name, modify and apply
	                link.href = link.href.split('?')[0] + '?' + Date.now();
	                console.log(link.href);
	            });
	            break;
	    }
	};
	
	
	// additional top-level key handlers
	window.addEventListener('load',    events.load);
	window.addEventListener('keydown', events.keydown);
	
	
	// public
	module.exports = events;


/***/ }),
/* 21 */
/*!***************************************!*\
  !*** ./~/gremlins.js/gremlins.min.js ***!
  \***************************************/
/***/ (function(module, exports) {

	!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define(n);else{var t=n();for(var a in t)("object"==typeof exports?exports:e)[a]=t[a]}}(this,function(){return function(e){function n(a){if(t[a])return t[a].exports;var r=t[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="http://localhost:8080/",n(0)}([function(e,n,t){e.exports=t(6)},function(e,n,t){var a;a=function(e){"use strict";function n(e,n){for(var t in n)!function(t){e[t]=function(a){return arguments.length?(n[t]=a,e):n[t]}}(t)}return n}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;!function(){function r(e,n){if(e||(e={}),!n)return e;for(var t in n)"undefined"==typeof e[t]&&(e[t]=n[t]);return e}function i(e,n){if(e)throw new RangeError(n)}var o=9007199254740992,s=-o,l="0123456789",u="abcdefghijklmnopqrstuvwxyz",c=u.toUpperCase(),m=l+"abcdef",h=function(e){void 0!==e&&("function"==typeof e?this.random=e:this.seed=e),"undefined"==typeof this.random&&(this.mt=this.mersenne_twister(e),this.random=function(){return this.mt.random(this.seed)})};h.prototype.bool=function(e){return e=r(e,{likelihood:50}),i(e.likelihood<0||e.likelihood>100,"Chance: Likelihood accepts values from 0 to 100."),100*this.random()<e.likelihood},h.prototype.character=function(e){e=r(e);var n,t,a="!@#$%^&*()[]";return i(e.alpha&&e.symbols,"Chance: Cannot specify both alpha and symbols."),n="lower"===e.casing?u:"upper"===e.casing?c:u+c,t=e.pool?e.pool:e.alpha?n:e.symbols?a:n+l+a,t.charAt(this.natural({max:t.length-1}))},h.prototype.floating=function(e){var n;e=r(e,{fixed:4});var t=Math.pow(10,e.fixed);i(e.fixed&&e.precision,"Chance: Cannot specify both fixed and precision.");var a=o/t,s=-a;i(e.min&&e.fixed&&e.min<s,"Chance: Min specified is out of range with fixed. Min should be, at least, "+s),i(e.max&&e.fixed&&e.max>a,"Chance: Max specified is out of range with fixed. Max should be, at most, "+a),e=r(e,{min:s,max:a}),n=this.integer({min:e.min*t,max:e.max*t});var l=(n/t).toFixed(e.fixed);return parseFloat(l)},h.prototype.integer=function(e){var n,t;e=r(e,{min:s,max:o}),t=Math.max(Math.abs(e.min),Math.abs(e.max));do n=this.natural({max:t}),n=this.bool()?n:-1*n;while(n<e.min||n>e.max);return n},h.prototype.natural=function(e){return e=r(e,{min:0,max:o}),i(e.min>e.max,"Chance: Min cannot be greater than Max."),Math.floor(this.random()*(e.max-e.min+1)+e.min)},h.prototype.normal=function(e){e=r(e,{mean:0,dev:1});var n,t,a,i,o=e.mean,s=e.dev;do t=2*this.random()-1,a=2*this.random()-1,n=t*t+a*a;while(n>=1);return i=t*Math.sqrt(-2*Math.log(n)/n),s*i+o},h.prototype.string=function(e){e=r(e);for(var n=e.length||this.natural({min:5,max:20}),t="",a=e.pool,i=0;n>i;i++)t+=this.character({pool:a});return t},h.prototype.capitalize=function(e){return e.charAt(0).toUpperCase()+e.substr(1)},h.prototype.mixin=function(e){for(var n in e)h.prototype[n]=e[n];return this},h.prototype.pick=function(e,n){return n&&1!==n?this.shuffle(e).slice(0,n):e[this.natural({max:e.length-1})]},h.prototype.shuffle=function(e){for(var n=e.slice(0),t=[],a=0,r=Number(n.length),i=0;r>i;i++)a=this.natural({max:n.length-1}),t[i]=n[a],n.splice(a,1);return t},h.prototype.paragraph=function(e){e=r(e);for(var n=e.sentences||this.natural({min:3,max:7}),t=[],a=0;n>a;a++)t.push(this.sentence());return t.join(" ")},h.prototype.sentence=function(e){e=r(e);for(var n,t=e.words||this.natural({min:12,max:18}),a=[],i=0;t>i;i++)a.push(this.word());return n=a.join(" "),n=this.capitalize(n)+"."},h.prototype.syllable=function(e){e=r(e);for(var n,t=e.length||this.natural({min:2,max:3}),a="bcdfghjklmnprstvwz",i="aeiou",o=a+i,s="",l=0;t>l;l++)n=this.character(0===l?{pool:o}:-1===a.indexOf(n)?{pool:a}:{pool:i}),s+=n;return s},h.prototype.word=function(e){e=r(e),i(e.syllables&&e.length,"Chance: Cannot specify both syllables AND length.");var n=e.syllables||this.natural({min:1,max:3}),t="";if(e.length){do t+=this.syllable();while(t.length<e.length);t=t.substring(0,e.length)}else for(var a=0;n>a;a++)t+=this.syllable();return t},h.prototype.age=function(e){e=r(e);var n;switch(e.type){case"child":n=this.natural({min:1,max:12});break;case"teen":n=this.natural({min:13,max:19});break;case"adult":n=this.natural({min:18,max:120});break;case"senior":n=this.natural({min:65,max:120});break;default:n=this.natural({min:1,max:120})}return n},h.prototype.birthday=function(e){return e=r(e,{year:(new Date).getFullYear()-this.age(e)}),this.date(e)};var d=["Sophia","Emma","Isabella","Jacob","Mason","Ethan","Noah","Olivia","William","Liam","Jayden","Michael","Ava","Alexander","Aiden","Daniel","Matthew","Elijah","Emily","James","Anthony","Benjamin","Abigail","Joshua","Andrew","David","Joseph","Logan","Jackson","Mia","Christopher","Gabriel","Madison","Samuel","Ryan","Lucas","John","Nathan","Isaac","Dylan","Caleb","Elizabeth","Chloe","Christian","Landon","Jonathan","Carter","Ella","Luke","Owen","Brayden","Avery","Gavin","Wyatt","Addison","Isaiah","Aubrey","Henry","Eli","Hunter","Lily","Jack","Natalie","Evan","Sofia","Jordan","Nicholas","Tyler","Aaron","Charlotte","Zoey","Jeremiah","Julian","Cameron","Grace","Hannah","Amelia","Harper","Levi","Lillian","Brandon","Angel","Austin","Connor","Adrian","Robert","Samantha","Charles","Evelyn","Victoria","Thomas","Brooklyn","Sebastian","Zoe","Colton","Jaxon","Layla","Kevin","Zachary","Ayden","Dominic","Blake","Jose","Hailey","Oliver","Justin","Bentley","Leah","Jason","Chase","Ian","Kaylee","Anna","Aaliyah","Gabriella","Josiah","Allison","Parker","Xavier","Nevaeh","Alexis","Adam","Audrey","Cooper","Savannah","Sarah","Alyssa","Claire","Taylor","Riley","Camila","Nathaniel","Arianna","Ashley","Grayson","Jace","Brianna","Carson","Sophie","Peyton","Nolan","Tristan","Luis","Brody","Bella","Khloe","Genesis","Alexa","Juan","Hudson","Serenity","Kylie","Aubree","Scarlett","Bryson","Carlos","Stella","Maya","Easton","Katherine","Julia","Damian","Alex","Kayden","Ryder","Lucy","Madelyn","Jesus","Cole","Autumn","Makayla","Kayla","Mackenzie","Micah","Vincent","Max","Lauren","Jaxson","Gianna","Eric","Ariana","Asher","Hayden","Faith","Alexandra","Melanie","Sydney","Bailey","Caroline","Naomi","Morgan","Kennedy","Ellie","Jasmine","Eva","Skylar","Diego","Kimberly","Violet","Molly","Miles","Steven","Aria","Ivan","Jocelyn","Trinity","Elias","Aidan","Maxwell","London","Bryce","Lydia","Madeline","Antonio","Giovanni","Reagan","Timothy","Bryan","Piper","Andrea","Santiago","Annabelle","Maria","Colin","Richard","Braxton","Kaleb","Brooke","Kyle","Kaden","Preston","Payton","Miguel","Jonah","Paisley","Paige","Lincoln","Ruby","Nora","Riley","Mariah","Leo","Victor","Brady","Jeremy","Mateo","Brian","Jaden","Ashton","Patrick","Rylee","Declan","Lilly","Brielle","Sean","Joel","Gael","Sawyer","Alejandro","Jade","Marcus","Destiny","Leonardo","Jesse","Caden","Jake","Kaiden","Nicole","Mila","Wesley","Kendall","Liliana","Camden","Kaitlyn","Natalia","Sadie","Edward","Brantley","Jordyn","Roman","Vanessa","Mary","Mya","Penelope","Isabelle","Alice","Axel","Silas","Jude","Grant","Reese","Gabrielle","Hadley","Katelyn","Angelina","Rachel","Isabel","Eleanor","Cayden","Emmanuel","George","Clara","Brooklynn","Jessica","Maddox","Malachi","Bradley","Alan","Weston","Elena","Gage","Aliyah","Vivian","Laila","Sara","Amy","Devin","Eliana","Greyson","Lyla","Juliana","Kenneth","Mark","Oscar","Tanner","Rylan","Valeria","Adriana","Nicolas","Makenzie","Harrison","Elise","Mckenzie","Derek","Quinn","Delilah","Peyton","Ezra","Cora","Kylee","Tucker","Emmett","Avery","Cody","Rebecca","Gracie","Izabella","Calvin","Andres","Jorge","Abel","Paul","Abraham","Kai","Josephine","Alaina","Michelle","Jennifer","Collin","Theodore","Ezekiel","Eden","Omar","Jayce","Valentina","Conner","Bennett","Aurora","Catherine","Stephanie","Trevor","Valerie","Eduardo","Peter","Maximus","Jayla","Jaiden","Willow","Jameson","Seth","Daisy","Alana","Melody","Hazel","Kingston","Summer","Melissa","Javier","Margaret","Travis","Kinsley","Kinley","Garrett","Everett","Ariel","Lila","Graham","Giselle","Ryleigh","Xander","Haley","Julianna","Ivy","Alivia","Cristian","Brynn","Damien","Ryker","Griffin","Keira","Daniela","Aniyah","Angela","Kate","Londyn","Corbin","Myles","Hayden","Harmony","Adalyn","Luca","Zane","Francisco","Ricardo","Alexis","Stephen","Zayden","Megan","Allie","Gabriela","Iker","Drake","Alayna","Lukas","Presley","Charlie","Spencer","Zion","Erick","Jenna","Josue","Alexandria","Ashlyn","Adrianna","Jada","Jeffrey","Trenton","Fiona","Chance","Norah","Paxton","Elliot","Emery","Fernando","Maci","Miranda","Keegan","Landen","Ximena","Amaya","Manuel","Amir","Shane","Cecilia","Raymond","Andre","Ana","Shelby","Katie","Hope","Callie","Jordan","Luna","Leilani","Eliza","Mckenna","Angel","Genevieve","Makenna","Isla","Lola","Danielle","Chelsea","Leila","Tessa","Adelyn","Camille","Mikayla","Adeline","Adalynn","Sienna","Esther","Jacqueline","Emerson","Arabella","Maggie","Athena","Lucia","Lexi","Ayla"];h.prototype.first=function(){return this.pick(d)},h.prototype.gender=function(){return this.pick(["Male","Female"])};var p=["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes","Myers","Ford","Hamilton","Graham","Sullivan","Wallace","Woods","Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald","Cruz","Marshall","Ortiz","Gomez","Murray","Freeman","Wells","Webb","Simpson","Stevens","Tucker","Porter","Hunter","Hicks","Crawford","Henry","Boyd","Mason","Morales","Kennedy","Warren","Dixon","Ramos","Reyes","Burns","Gordon","Shaw","Holmes","Rice","Robertson","Hunt","Black","Daniels","Palmer","Mills","Nichols","Grant","Knight","Ferguson","Rose","Stone","Hawkins","Dunn","Perkins","Hudson","Spencer","Gardner","Stephens","Payne","Pierce","Berry","Matthews","Arnold","Wagner","Willis","Ray","Watkins","Olson","Carroll","Duncan","Snyder","Hart","Cunningham","Bradley","Lane","Andrews","Ruiz","Harper","Fox","Riley","Armstrong","Carpenter","Weaver","Greene","Lawrence","Elliott","Chavez","Sims","Austin","Peters","Kelley","Franklin","Lawson","Fields","Gutierrez","Ryan","Schmidt","Carr","Vasquez","Castillo","Wheeler","Chapman","Oliver","Montgomery","Richards","Williamson","Johnston","Banks","Meyer","Bishop","McCoy","Howell","Alvarez","Morrison","Hansen","Fernandez","Garza","Harvey","Little","Burton","Stanley","Nguyen","George","Jacobs","Reid","Kim","Fuller","Lynch","Dean","Gilbert","Garrett","Romero","Welch","Larson","Frazier","Burke","Hanson","Day","Mendoza","Moreno","Bowman","Medina","Fowler","Brewer","Hoffman","Carlson","Silva","Pearson","Holland","Douglas","Fleming","Jensen","Vargas","Byrd","Davidson","Hopkins","May","Terry","Herrera","Wade","Soto","Walters","Curtis","Neal","Caldwell","Lowe","Jennings","Barnett","Graves","Jimenez","Horton","Shelton","Barrett","Obrien","Castro","Sutton","Gregory","McKinney","Lucas","Miles","Craig","Rodriquez","Chambers","Holt","Lambert","Fletcher","Watts","Bates","Hale","Rhodes","Pena","Beck","Newman","Haynes","McDaniel","Mendez","Bush","Vaughn","Parks","Dawson","Santiago","Norris","Hardy","Love","Steele","Curry","Powers","Schultz","Barker","Guzman","Page","Munoz","Ball","Keller","Chandler","Weber","Leonard","Walsh","Lyons","Ramsey","Wolfe","Schneider","Mullins","Benson","Sharp","Bowen","Daniel","Barber","Cummings","Hines","Baldwin","Griffith","Valdez","Hubbard","Salazar","Reeves","Warner","Stevenson","Burgess","Santos","Tate","Cross","Garner","Mann","Mack","Moss","Thornton","Dennis","McGee","Farmer","Delgado","Aguilar","Vega","Glover","Manning","Cohen","Harmon","Rodgers","Robbins","Newton","Todd","Blair","Higgins","Ingram","Reese","Cannon","Strickland","Townsend","Potter","Goodwin","Walton","Rowe","Hampton","Ortega","Patton","Swanson","Joseph","Francis","Goodman","Maldonado","Yates","Becker","Erickson","Hodges","Rios","Conner","Adkins","Webster","Norman","Malone","Hammond","Flowers","Cobb","Moody","Quinn","Blake","Maxwell","Pope","Floyd","Osborne","Paul","McCarthy","Guerrero","Lindsey","Estrada","Sandoval","Gibbs","Tyler","Gross","Fitzgerald","Stokes","Doyle","Sherman","Saunders","Wise","Colon","Gill","Alvarado","Greer","Padilla","Simon","Waters","Nunez","Ballard","Schwartz","McBride","Houston","Christensen","Klein","Pratt","Briggs","Parsons","McLaughlin","Zimmerman","French","Buchanan","Moran","Copeland","Roy","Pittman","Brady","McCormick","Holloway","Brock","Poole","Frank","Logan","Owen","Bass","Marsh","Drake","Wong","Jefferson","Park","Morton","Abbott","Sparks","Patrick","Norton","Huff","Clayton","Massey","Lloyd","Figueroa","Carson","Bowers","Roberson","Barton","Tran","Lamb","Harrington","Casey","Boone","Cortez","Clarke","Mathis","Singleton","Wilkins","Cain","Bryan","Underwood","Hogan","McKenzie","Collier","Luna","Phelps","McGuire","Allison","Bridges","Wilkerson","Nash","Summers","Atkins"];h.prototype.last=function(){return this.pick(p)},h.prototype.name=function(e){e=r(e);var n,t=this.first(),a=this.last();return n=e.middle?t+" "+this.first()+" "+a:e.middle_initial?t+" "+this.character({alpha:!0,casing:"upper"})+". "+a:t+" "+a,e.prefix&&(n=this.prefix()+" "+n),n},h.prototype.name_prefixes=function(){return[{name:"Doctor",abbreviation:"Dr."},{name:"Miss",abbreviation:"Miss"},{name:"Misses",abbreviation:"Mrs."},{name:"Mister",abbreviation:"Mr."}]},h.prototype.prefix=function(e){return this.name_prefix(e)},h.prototype.name_prefix=function(e){return e=r(e),e.full?this.pick(this.name_prefixes()).name:this.pick(this.name_prefixes()).abbreviation},h.prototype.color=function(e){function n(e,n){return[e,e,e].join(n||"")}e=r(e,{format:this.pick(["hex","shorthex","rgb"]),grayscale:!1});var t=e.grayscale;if("hex"===e.format)return"#"+(t?n(this.hash({length:2})):this.hash({length:6}));if("shorthex"===e.format)return"#"+(t?n(this.hash({length:1})):this.hash({length:3}));if("rgb"===e.format)return t?"rgb("+n(this.natural({max:255}),",")+")":"rgb("+this.natural({max:255})+","+this.natural({max:255})+","+this.natural({max:255})+")";throw new Error('Invalid format provided. Please provide one of "hex", "shorthex", or "rgb"')},h.prototype.domain=function(e){return e=r(e),this.word()+"."+(e.tld||this.tld())},h.prototype.email=function(e){return e=r(e),this.word()+"@"+(e.domain||this.domain())},h.prototype.fbid=function(){return parseInt("10000"+this.natural({max:1e11}),10)},h.prototype.hashtag=function(){return"#"+this.word()},h.prototype.ip=function(){return this.natural({max:255})+"."+this.natural({max:255})+"."+this.natural({max:255})+"."+this.natural({max:255})},h.prototype.ipv6=function(){for(var e="",n=0;8>n;n++)e+=this.hash({length:4})+":";return e.substr(0,e.length-1)},h.prototype.klout=function(){return this.natural({min:1,max:99})},h.prototype.tlds=function(){return["com","org","edu","gov","co.uk","net","io"]},h.prototype.tld=function(){return this.pick(this.tlds())},h.prototype.twitter=function(){return"@"+this.word()},h.prototype.address=function(e){return e=r(e),this.natural({min:5,max:2e3})+" "+this.street(e)},h.prototype.areacode=function(e){e=r(e,{parens:!0});var n=this.natural({min:2,max:9}).toString()+this.natural({min:0,max:8}).toString()+this.natural({min:0,max:9}).toString();return e.parens?"("+n+")":n},h.prototype.city=function(){return this.capitalize(this.word({syllables:3}))},h.prototype.coordinates=function(e){return e=r(e),this.latitude(e)+", "+this.longitude(e)},h.prototype.latitude=function(e){return e=r(e,{fixed:5}),this.floating({min:-90,max:90,fixed:e.fixed})},h.prototype.longitude=function(e){return e=r(e,{fixed:5}),this.floating({min:0,max:180,fixed:e.fixed})},h.prototype.phone=function(e){e=r(e,{formatted:!0}),e.formatted||(e.parens=!1);var n=this.areacode(e).toString(),t=this.natural({min:2,max:9}).toString()+this.natural({min:0,max:9}).toString()+this.natural({min:0,max:9}).toString(),a=this.natural({min:1e3,max:9999}).toString();return e.formatted?n+" "+t+"-"+a:n+t+a},h.prototype.postal=function(){var e=this.character({pool:"XVTSRPNKLMHJGECBA"}),n=e+this.natural({max:9})+this.character({alpha:!0,casing:"upper"}),t=this.natural({max:9})+this.character({alpha:!0,casing:"upper"})+this.natural({max:9});return n+" "+t},h.prototype.provinces=function(){return[{name:"Alberta",abbreviation:"AB"},{name:"British Columbia",abbreviation:"BC"},{name:"Manitoba",abbreviation:"MB"},{name:"New Brunswick",abbreviation:"NB"},{name:"Newfoundland and Labrador",abbreviation:"NL"},{name:"Nova Scotia",abbreviation:"NS"},{name:"Ontario",abbreviation:"ON"},{name:"Prince Edward Island",abbreviation:"PE"},{name:"Quebec",abbreviation:"QC"},{name:"Saskatchewan",abbreviation:"SK"},{name:"Northwest Territories",abbreviation:"NT"},{name:"Nunavut",abbreviation:"NU"},{name:"Yukon",abbreviation:"YT"}]},h.prototype.province=function(e){return e&&e.full?this.pick(this.provinces()).name:this.pick(this.provinces()).abbreviation},h.prototype.radio=function(e){e=r(e,{side:"?"});var n="";switch(e.side.toLowerCase()){case"east":case"e":n="W";break;case"west":case"w":n="K";break;default:n=this.character({pool:"KW"})}return n+this.character({alpha:!0,casing:"upper"})+this.character({alpha:!0,casing:"upper"})+this.character({alpha:!0,casing:"upper"})},h.prototype.state=function(e){return e&&e.full?this.pick(this.states()).name:this.pick(this.states()).abbreviation},h.prototype.states=function(){return[{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"American Samoa",abbreviation:"AS"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"Armed Forces Europe",abbreviation:"AE"},{name:"Armed Forces Pacific",abbreviation:"AP"},{name:"Armed Forces the Americas",abbreviation:"AA"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"District of Columbia",abbreviation:"DC"},{name:"Federated States of Micronesia",abbreviation:"FM"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Guam",abbreviation:"GU"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Marshall Islands",abbreviation:"MH"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Northern Mariana Islands",abbreviation:"MP"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Puerto Rico",abbreviation:"PR"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virgin Islands, U.S.",abbreviation:"VI"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}]},h.prototype.street=function(e){e=r(e);var n=this.word({syllables:2});return n=this.capitalize(n),n+=" ",n+=e.short_suffix?this.street_suffix().abbreviation:this.street_suffix().name},h.prototype.street_suffix=function(){return this.pick(this.street_suffixes())},h.prototype.street_suffixes=function(){return[{name:"Avenue",abbreviation:"Ave"},{name:"Boulevard",abbreviation:"Blvd"},{name:"Center",abbreviation:"Ctr"},{name:"Circle",abbreviation:"Cir"},{name:"Court",abbreviation:"Ct"},{name:"Drive",abbreviation:"Dr"},{name:"Extension",abbreviation:"Ext"},{name:"Glen",abbreviation:"Gln"},{name:"Grove",abbreviation:"Grv"},{name:"Heights",abbreviation:"Hts"},{name:"Highway",abbreviation:"Hwy"},{name:"Junction",abbreviation:"Jct"},{name:"Key",abbreviation:"Key"},{name:"Lane",abbreviation:"Ln"},{name:"Loop",abbreviation:"Loop"},{name:"Manor",abbreviation:"Mnr"},{name:"Mill",abbreviation:"Mill"},{name:"Park",abbreviation:"Park"},{name:"Parkway",abbreviation:"Pkwy"},{name:"Pass",abbreviation:"Pass"},{name:"Path",abbreviation:"Path"},{name:"Pike",abbreviation:"Pike"},{name:"Place",abbreviation:"Pl"},{name:"Plaza",abbreviation:"Plz"},{name:"Point",abbreviation:"Pt"},{name:"Ridge",abbreviation:"Rdg"},{name:"River",abbreviation:"Riv"},{name:"Road",abbreviation:"Rd"},{name:"Square",abbreviation:"Sq"},{name:"Street",abbreviation:"St"},{name:"Terrace",abbreviation:"Ter"},{name:"Trail",abbreviation:"Trl"},{name:"Turnpike",abbreviation:"Tpke"},{name:"View",abbreviation:"Vw"},{name:"Way",abbreviation:"Way"}]},h.prototype.tv=function(e){return this.radio(e)},h.prototype.zip=function(e){for(var n="",t=0;5>t;t++)n+=this.natural({max:9}).toString();if(e&&e.plusfour===!0)for(n+="-",t=0;4>t;t++)n+=this.natural({max:9}).toString();return n},h.prototype.ampm=function(){return this.bool()?"am":"pm"},h.prototype.date=function(e){var n,t=this.month({raw:!0});e=r(e,{year:parseInt(this.year(),10),month:t.numeric-1,day:this.natural({min:1,max:t.days}),hour:this.hour(),minute:this.minute(),second:this.second(),millisecond:this.millisecond(),american:!0,string:!1});var a=new Date(e.year,e.month,e.day,e.hour,e.minute,e.second,e.millisecond);return n=e.american?a.getMonth()+1+"/"+a.getDate()+"/"+a.getFullYear():a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear(),e.string?n:a},h.prototype.hammertime=function(e){return this.date(e).getTime()},h.prototype.hour=function(e){e=r(e);var n=e.twentyfour?24:12;return this.natural({min:1,max:n})},h.prototype.millisecond=function(){return this.natural({max:999})},h.prototype.minute=h.prototype.second=function(){return this.natural({max:59})},h.prototype.month=function(e){e=r(e);var n=this.pick(this.months());return e.raw?n:n.name},h.prototype.months=function(){return[{name:"January",short_name:"Jan",numeric:"01",days:31},{name:"February",short_name:"Feb",numeric:"02",days:28},{name:"March",short_name:"Mar",numeric:"03",days:31},{name:"April",short_name:"Apr",numeric:"04",days:30},{name:"May",short_name:"May",numeric:"05",days:31},{name:"June",short_name:"Jun",numeric:"06",days:30},{name:"July",short_name:"Jul",numeric:"07",days:31},{name:"August",short_name:"Aug",numeric:"08",days:31},{name:"September",short_name:"Sep",numeric:"09",days:30},{name:"October",short_name:"Oct",numeric:"10",days:31},{name:"November",short_name:"Nov",numeric:"11",days:30},{name:"December",short_name:"Dec",numeric:"12",days:31}]},h.prototype.second=function(){return this.natural({max:59})},h.prototype.timestamp=function(){return this.natural({min:1,max:parseInt((new Date).getTime()/1e3,10)})},h.prototype.year=function(e){return e=r(e,{min:(new Date).getFullYear()}),e.max="undefined"!=typeof e.max?e.max:e.min+100,this.natural(e).toString()},h.prototype.cc=function(e){e=r(e);var n,t,a;n=this.cc_type(e.type?{name:e.type,raw:!0}:{raw:!0}),t=n.prefix.split(""),a=n.length-n.prefix.length-1;for(var i=0;a>i;i++)t.push(this.integer({min:0,max:9}));return t.push(this.luhn_calculate(t.join(""))),t.join("")},h.prototype.cc_types=function(){return[{name:"American Express",short_name:"amex",prefix:"34",length:15},{name:"Bankcard",short_name:"bankcard",prefix:"5610",length:16},{name:"China UnionPay",short_name:"chinaunion",prefix:"62",length:16},{name:"Diners Club Carte Blanche",short_name:"dccarte",prefix:"300",length:14},{name:"Diners Club enRoute",short_name:"dcenroute",prefix:"2014",length:15},{name:"Diners Club International",short_name:"dcintl",prefix:"36",length:14},{name:"Diners Club United States & Canada",short_name:"dcusc",prefix:"54",length:16},{name:"Discover Card",short_name:"discover",prefix:"6011",length:16},{name:"InstaPayment",short_name:"instapay",prefix:"637",length:16},{name:"JCB",short_name:"jcb",prefix:"3528",length:16},{name:"Laser",short_name:"laser",prefix:"6304",length:16},{name:"Maestro",short_name:"maestro",prefix:"5018",length:16},{name:"Mastercard",short_name:"mc",prefix:"51",length:16},{name:"Solo",short_name:"solo",prefix:"6334",length:16},{name:"Switch",short_name:"switch",prefix:"4903",length:16},{name:"Visa",short_name:"visa",prefix:"4",length:16},{name:"Visa Electron",short_name:"electron",prefix:"4026",length:16}]},h.prototype.cc_type=function(e){e=r(e);var n=this.cc_types(),t=null;if(e.name){for(var a=0;a<n.length;a++)if(n[a].name===e.name||n[a].short_name===e.name){t=n[a];break}if(null===t)throw new Error("Credit card type '"+e.name+"'' is not suppoted")}else t=this.pick(n);return e.raw?t:t.name},h.prototype.dollar=function(e){e=r(e,{max:1e4,min:0});var n=this.floating({min:e.min,max:e.max,fixed:2}).toString(),t=n.split(".")[1];return void 0===t?n+=".00":t.length<2&&(n+="0"),0>n?"-$"+n.replace("-",""):"$"+n},h.prototype.exp=function(e){e=r(e);var n={};return n.year=this.exp_year(),n.year===(new Date).getFullYear()?n.month=this.exp_month({future:!0}):n.month=this.exp_month(),e.raw?n:n.month+"/"+n.year},h.prototype.exp_month=function(e){e=r(e);var n,t;if(e.future){do n=this.month({raw:!0}).numeric,t=parseInt(n,10);while(t<(new Date).getMonth())}else n=this.month({raw:!0}).numeric;return n},h.prototype.exp_year=function(){return this.year({max:(new Date).getFullYear()+10})},h.prototype.d4=function(){return this.natural({min:1,max:4})},h.prototype.d6=function(){return this.natural({min:1,max:6})},h.prototype.d8=function(){return this.natural({min:1,max:8})},h.prototype.d10=function(){return this.natural({min:1,max:10})},h.prototype.d12=function(){return this.natural({min:1,max:12})},h.prototype.d20=function(){return this.natural({min:1,max:20})},h.prototype.d30=function(){return this.natural({min:1,max:30})},h.prototype.d100=function(){return this.natural({min:1,max:100})},h.prototype.rpg=function(e,n){if(n=r(n),null===e)throw new Error("A type of die roll must be included");var t=e.toLowerCase().split("d"),a=[];if(2!==t.length||!parseInt(t[0],10)||!parseInt(t[1],10))throw new Error("Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");for(var i=t[0];i>0;i--)a[i-1]=this.natural({min:1,max:t[1]});return"undefined"!=typeof n.sum&&n.sum?a.reduce(function(e,n){return e+n}):a},h.prototype.guid=function(e){e=e||{version:5};var n="ABCDEF1234567890",t="AB89",a=this.string({pool:n,length:8})+"-"+this.string({pool:n,length:4})+"-"+e.version+this.string({pool:n,length:3})+"-"+this.string({pool:t,length:1})+this.string({pool:n,length:3})+"-"+this.string({pool:n,length:12});return a},h.prototype.hash=function(e){e=r(e,{length:40,casing:"lower"});var n="upper"===e.casing?m.toUpperCase():m;return this.string({pool:n,length:e.length})},h.prototype.luhn_check=function(e){var n=e.toString(),t=+n.substring(n.length-1);return t===this.luhn_calculate(+n.substring(0,n.length-1))},h.prototype.luhn_calculate=function(e){for(var n=e.toString().split("").reverse(),t=0,a=0,r=n.length;r>a;++a){var i=+n[a];a%2===0&&(i*=2,i>9&&(i-=9)),t+=i}return 9*t%10},h.prototype.mersenne_twister=function(e){return new f(e)},h.prototype.VERSION="0.5.4";var f=function(e){void 0===e&&(e=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,this.init_genrand(e)};f.prototype.init_genrand=function(e){for(this.mt[0]=e>>>0,this.mti=1;this.mti<this.N;this.mti++)e=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30,this.mt[this.mti]=(1812433253*((4294901760&e)>>>16)<<16)+1812433253*(65535&e)+this.mti,this.mt[this.mti]>>>=0},f.prototype.init_by_array=function(e,n){var t,a,r=1,i=0;for(this.init_genrand(19650218),t=this.N>n?this.N:n;t;t--)a=this.mt[r-1]^this.mt[r-1]>>>30,this.mt[r]=(this.mt[r]^(1664525*((4294901760&a)>>>16)<<16)+1664525*(65535&a))+e[i]+i,this.mt[r]>>>=0,r++,i++,r>=this.N&&(this.mt[0]=this.mt[this.N-1],r=1),i>=n&&(i=0);for(t=this.N-1;t;t--)a=this.mt[r-1]^this.mt[r-1]>>>30,this.mt[r]=(this.mt[r]^(1566083941*((4294901760&a)>>>16)<<16)+1566083941*(65535&a))-r,this.mt[r]>>>=0,r++,r>=this.N&&(this.mt[0]=this.mt[this.N-1],r=1);this.mt[0]=2147483648},f.prototype.genrand_int32=function(){var e,n=new Array(0,this.MATRIX_A);if(this.mti>=this.N){var t;for(this.mti===this.N+1&&this.init_genrand(5489),t=0;t<this.N-this.M;t++)e=this.mt[t]&this.UPPER_MASK|this.mt[t+1]&this.LOWER_MASK,this.mt[t]=this.mt[t+this.M]^e>>>1^n[1&e];for(;t<this.N-1;t++)e=this.mt[t]&this.UPPER_MASK|this.mt[t+1]&this.LOWER_MASK,this.mt[t]=this.mt[t+(this.M-this.N)]^e>>>1^n[1&e];e=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^e>>>1^n[1&e],this.mti=0}return e=this.mt[this.mti++],e^=e>>>11,e^=e<<7&2636928640,e^=e<<15&4022730752,e^=e>>>18,e>>>0},f.prototype.genrand_int31=function(){return this.genrand_int32()>>>1},f.prototype.genrand_real1=function(){return this.genrand_int32()*(1/4294967295)},f.prototype.random=function(){return this.genrand_int32()*(1/4294967296)},f.prototype.genrand_real3=function(){return(this.genrand_int32()+.5)*(1/4294967296)},f.prototype.genrand_res53=function(){var e=this.genrand_int32()>>>5,n=this.genrand_int32()>>>6;return(67108864*e+n)*(1/9007199254740992)},"undefined"!=typeof e&&e.exports&&(n=e.exports=h),n.Chance=h,a=function(){return h}.call(n,t,n,e),!(void 0!==a&&(e.exports=a)),"object"==typeof window&&"object"==typeof window.document&&(window.Chance=h,window.chance=new h)}()},function(e,n,t){var a;a=function(e){"use strict";function n(){this.message="This gremlin requires a randomizer to run. Please call randomizer(randomizerObject) before executing the gremlin",this.toString=function(){return this.message}}return n}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";function n(e,n,t,a){var r=n.length;e=e.slice(0);var i=function(e,n){if(!e.length)return"function"==typeof a?a():!0;var o=e.shift();o.apply(t,n),o.length===r&&i(e,n,a)};n.push(function(){i(e,n,a)}),i(e,n,a)}return n}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";function n(){this.message="This mogwai requires a logger to run. Please call logger(loggerObject) before executing the mogwai",this.toString=function(){return this.message}}return n}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";function n(e,n){for(var t=0,a=n.length;a>t;t++)for(var r in e)"function"!=typeof n[t][r]||n[t][r]()||n[t][r](e[r])}var a=t(2),r={species:{clicker:t(10),toucher:t(13),formFiller:t(11),scroller:t(12),typer:t(14)},mogwais:{alert:t(7),fps:t(8),gizmo:t(9)},strategies:{allTogether:t(15),bySpecies:t(16),distribution:t(17)}},i=t(4),o=function(){this._gremlins=[],
	this._mogwais=[],this._strategies=[],this._beforeCallbacks=[],this._afterCallbacks=[],this._logger=console,this._randomizer=new a};return o.prototype.gremlin=function(e){return this._gremlins.push(e),this},o.prototype.allGremlins=function(){for(var e in r.species)this.gremlin(r.species[e]());return this},o.prototype.mogwai=function(e){return this._mogwais.push(e),this},o.prototype.allMogwais=function(){for(var e in r.mogwais)this.mogwai(r.mogwais[e]());return this},o.prototype.strategy=function(e){return this._strategies.push(e),this},o.prototype.before=function(e){return this._beforeCallbacks.push(e),this},o.prototype.after=function(e){return this._afterCallbacks.push(e),this},o.prototype.logger=function(e){return arguments.length?(this._logger=e,this):this._logger},o.prototype.log=function(e){this._logger.log(e)},o.prototype.randomizer=function(e){return arguments.length?(this._randomizer=e,this):this._randomizer},o.prototype.seed=function(e){return this._randomizer=new a(e),this},o.prototype.unleash=function(e,t){0===this._gremlins.length&&this.allGremlins(),0===this._mogwais.length&&this.allMogwais(),0===this._strategies.length&&this.strategy(r.strategies.distribution());var a=[].concat(this._gremlins,this._mogwais),o=a.concat(this._strategies,this._beforeCallbacks,this._afterCallbacks);n({logger:this._logger,randomizer:this._randomizer},o);var s=this._beforeCallbacks;s=s.concat(this._mogwais);for(var l=this._afterCallbacks,u=0,c=a.length;c>u;u++)"function"==typeof a[u].cleanUp&&l.push(a[u].cleanUp);var m=this;i(s,[],m,function(){i(m._strategies,[m._gremlins,e],m,function(){i(l,[],m,function(){"function"==typeof t&&t()})})})},o.prototype.stop=function(){for(var e=this._strategies,n=0,t=e.length;t>n;n++)e[n].stop()},r.createHorde=function(){return new o},window&&(window.gremlins=r),r}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=(t(2),t(5));return function(){function e(){return o.randomizer.bool()}function t(){return o.randomizer.sentence()}function r(){if(!o.logger)throw new a;-1!==o.watchEvents.indexOf("alert")&&(window.alert=function(e){o.logger.warn("mogwai ","alert     ",e,"alert")}),-1!==o.watchEvents.indexOf("confirm")&&(window.confirm=function(e){o.confirmResponse(),o.logger.warn("mogwai ","alert     ",e,"confirm")}),-1!==o.watchEvents.indexOf("prompt")&&(window.prompt=function(e){o.promptResponse(),o.logger.warn("mogwai ","alert     ",e,"prompt")})}var i=["alert","confirm","prompt"],o={watchEvents:i,confirmResponse:e,promptResponse:t,logger:null,randomizer:null},s=window.alert,l=window.confirm,u=window.prompt;return r.cleanUp=function(){return window.alert=s,window.confirm=l,window.prompt=u,r},n(r,o),r}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=t(5);return function(){function e(e){return 10>e?"error":20>e?"warn":"log"}function t(e){e-l>s.delay&&(r(e),l=e),o&&window.requestAnimationFrame(t)}function r(){function e(e){t=e,window.requestAnimationFrame(n)}function n(e){var n=16>e-t?60:1e3/(e-t),a=s.levelSelector(n);s.logger[a]("mogwai ","fps       ",n)}var t;window.requestAnimationFrame(e)}function i(){if(!s.logger)throw new a;o=!0,window.requestAnimationFrame(t)}window.requestAnimationFrame||(window.requestAnimationFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)});var o,s={delay:500,levelSelector:e,logger:null},l=-(1/0);return i.cleanUp=function(){return o=!1,i},n(i,s),i}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1);return function(){function e(){function e(){if(n++,n==r.maxErrors){if(i.stop(),!r.logger)return;window.setTimeout(function(){r.logger.warn("mogwai ","gizmo     ","stopped test execution after ",r.maxErrors,"errors")},4)}}var n=0,i=this;t=window.onerror,window.onerror=function(n,a,r){return e(),t?t(n,a,r):!1},a=console.error,console.error=function(){e(),a.apply(console,arguments)}}var t,a,r={maxErrors:10,logger:null};return e.cleanUp=function(){return window.onerror=t,console.error=a.bind(console),e},n(e,r),e}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=(t(2),t(3));return function(){function e(){return[u.randomizer.natural({max:o.documentElement.clientWidth-1}),u.randomizer.natural({max:o.documentElement.clientHeight-1})]}function t(e,n){var t=o.createElement("div");t.style.zIndex=2e3,t.style.border="3px solid red",t.style["border-radius"]="50%",t.style.borderRadius="50%",t.style.width="40px",t.style.height="40px",t.style["box-sizing"]="border-box",t.style.position="absolute",t.style.webkitTransition="opacity 1s ease-out",t.style.mozTransition="opacity 1s ease-out",t.style.transition="opacity 1s ease-out",t.style.left=e-20+"px",t.style.top=n-20+"px";var a=s.appendChild(t);setTimeout(function(){s.removeChild(a)},1e3),setTimeout(function(){a.style.opacity=0},50)}function r(){return!0}function i(){if(!u.randomizer)throw new a;var e,n,t,r,i=0;do if(e=u.positionSelector(),n=e[0],t=e[1],r=o.elementFromPoint(n,t),i++,i>u.maxNbTries)return!1;while(!r||!u.canClick(r));var s=o.createEvent("MouseEvents"),l=u.randomizer.pick(u.clickTypes);s.initMouseEvent(l,!0,!0,window,0,0,0,n,t,!1,!1,!1,!1,0,null),r.dispatchEvent(s),"function"==typeof u.showAction&&u.showAction(n,t,l),u.logger&&"function"==typeof u.logger.log&&u.logger.log("gremlin","clicker   ",l,"at",n,t)}var o=window.document,s=o.body,l=["click","click","click","click","click","click","dblclick","dblclick","mousedown","mouseup","mouseover","mouseover","mouseover","mousemove","mouseout"],u={clickTypes:l,positionSelector:e,showAction:t,canClick:r,maxNbTries:10,logger:null,randomizer:null};return n(i,u),i}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=(t(2),t(3));return function(){function e(e){"undefined"==typeof e.attributes["data-old-border"]&&(e.attributes["data-old-border"]=e.style.border);var n=e.attributes["data-old-border"];e.style.border="1px solid red",setTimeout(function(){e.style.border=n},500)}function t(){return!0}function r(){if(!p.randomizer)throw new a;var e=[];for(var n in p.elementMapTypes)p.elementMapTypes.hasOwnProperty(n)&&e.push(n);var t,r=0;do{var i=h.querySelectorAll(e.join(","));if(0===i.length)return!1;if(t=p.randomizer.pick(i),r++,r>p.maxNbTries)return!1}while(!t||!p.canFillElement(t));var o=null;for(var s in p.elementMapTypes)if(m(t,s)){o=s;break}var l=p.elementMapTypes[o](t);"function"==typeof p.showAction&&p.showAction(t),p.logger&&"function"==typeof p.logger.log&&p.logger.log("gremlin","formFiller","input",l,"in",t)}function i(e){var n=p.randomizer.character();return e.value+=n,n}function o(e){var n=p.randomizer.character({pool:"0123456789"});return e.value+=n,n}function s(e){var n=e.querySelectorAll("option");if(0!==n.length){for(var t=p.randomizer.pick(n),a=0,r=n.length;r>a;a++){var i=n[a];i.selected=i.value==t.value}return t.value}}function l(e){var n=h.createEvent("MouseEvents");return n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(n),e.value}function u(e){var n=h.createEvent("MouseEvents");return n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(n),e.value}function c(e){var n=p.randomizer.email();return e.value=n,n}function m(e,n){if(e.webkitMatchesSelector)m=function(e,n){return e.webkitMatchesSelector(n)};else if(e.mozMatchesSelector)m=function(e,n){return e.mozMatchesSelector(n)};else if(e.msMatchesSelector)m=function(e,n){return e.msMatchesSelector(n)};else{if(!e.oMatchesSelector)throw new Error("Unsupported browser");m=function(e,n){return e.oMatchesSelector(n)}}return m(e,n)}var h=window.document,d={textarea:i,'input[type="text"]':i,'input[type="password"]':i,'input[type="number"]':o,select:s,'input[type="radio"]':l,'input[type="checkbox"]':u,'input[type="email"]':c,"input:not([type])":i},p={elementMapTypes:d,showAction:e,canFillElement:t,maxNbTries:10,logger:null,randomizer:null};return n(r,p),r}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=(t(2),t(3));return function(){function e(){var e=Math.max(s.scrollWidth,s.offsetWidth,o.scrollWidth,o.offsetWidth,o.clientWidth),n=Math.max(s.scrollHeight,s.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return[l.randomizer.natural({max:e-o.clientWidth}),l.randomizer.natural({max:n-o.clientHeight})]}function t(e,n){var t=i.createElement("div");t.style.zIndex=2e3,t.style.border="3px solid red",t.style.width=o.clientWidth-25+"px",t.style.height=o.clientHeight-25+"px",t.style.position="absolute",t.style.webkitTransition="opacity 1s ease-out",t.style.mozTransition="opacity 1s ease-out",t.style.transition="opacity 1s ease-out",t.style.left=e+10+"px",t.style.top=n+10+"px";var a=s.appendChild(t);setTimeout(function(){s.removeChild(a)},1e3),setTimeout(function(){a.style.opacity=0},50)}function r(){if(!l.randomizer)throw new a;var e=l.positionSelector(),n=e[0],t=e[1];window.scrollTo(n,t),"function"==typeof l.showAction&&l.showAction(n,t),"function"==typeof l.logger.log&&l.logger.log("gremlin","scroller  ","scroll to",n,t)}var i=window.document,o=i.documentElement,s=i.body,l={positionSelector:e,showAction:t,logger:null,randomizer:null};return n(r,l),r}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=(t(2),t(3));return function(){function e(){return[h.randomizer.natural({max:u.documentElement.clientWidth-1}),h.randomizer.natural({max:u.documentElement.clientHeight-1})]}function t(e){var n=u.createDocumentFragment();e.forEach(function(e){var t=u.createElement("div");t.style.zIndex=2e3,t.style.background="red",t.style["border-radius"]="50%",t.style.borderRadius="50%",t.style.width="20px",t.style.height="20px",t.style.position="absolute",t.style.webkitTransition="opacity .5s ease-out",t.style.mozTransition="opacity .5s ease-out",t.style.transition="opacity .5s ease-out",t.style.left=e.x-10+"px",t.style.top=e.y-10+"px";var a=n.appendChild(t);setTimeout(function(){c.removeChild(a)},500),setTimeout(function(){a.style.opacity=0},50)}),u.body.appendChild(n)}function r(){return!0}function i(e,n,t,a){var r,i,o,s=e[0],l=e[1],u=[];if(1===n)return[{x:s,y:l}];for(t=t||100,a=null!==a?a*Math.PI/180:0,r=2*Math.PI/n,i=0;n>i;i++)o=r*i+a,u.push({x:s+t*Math.cos(o),y:l+t*Math.sin(o)});return u}function o(e,n,t){var a=[],r=u.createEvent("Event");r.initEvent("touch"+t,!0,!0),a.identifiedTouch=a.item=function(e){return this[e]||{}},e.forEach(function(e,t){var r=Math.round(e.x),i=Math.round(e.y);a.push({pageX:r,pageY:i,clientX:r,clientY:i,screenX:r,screenY:i,target:n,identifier:t})}),r.touches="end"==t?[]:a,r.targetTouches="end"==t?[]:a,r.changedTouches=a,n.dispatchEvent(r),h.showAction(e)}function s(e,n,t,a,r){function s(){var m=a.radius;1!==a.scale&&(m=a.radius-a.radius*(1-a.scale)*(1/u)*c);var h=n[0]+a.distanceX/u*c,d=n[1]+a.distanceY/u*c,p="number"==typeof a.rotation?a.rotation/u*c:null,f=i([h,d],t.length,m,p),y=1==c,b=c==u;if(y)o(f,e,"start");else{if(b)return o(f,e,"end"),r(f);o(f,e,"move")}setTimeout(s,l),c++}var l=10,u=Math.ceil(a.duration/l),c=1;s()}function l(e){function n(n,t){"function"==typeof h.showAction&&h.showAction(n),h.logger&&"function"==typeof h.logger.log&&h.logger.log("gremlin","toucher   ",l,"at",r,i,t),e()}if(!h.randomizer)throw new a;var t,r,i,o,s=0;do if(t=h.positionSelector(),r=t[0],i=t[1],o=u.elementFromPoint(r,i),s++,s>h.maxNbTries)return;while(!o||!h.canTouch(o));var l=h.randomizer.pick(h.touchTypes);d[l](t,o,n)}var u=window.document,c=u.body,m=["tap","tap","tap","doubletap","gesture","gesture","gesture","multitouch","multitouch"],h={touchTypes:m,positionSelector:e,showAction:t,canTouch:r,maxNbTries:10,logger:null,randomizer:null,maxTouches:2},d={tap:function(e,n,t){var a=i(e,1),r={duration:h.randomizer.integer({min:20,max:700})};o(a,n,"start"),setTimeout(function(){o(a,n,"end"),t(a,r)},r.duration)},doubletap:function(e,n,t){d.tap(e,n,function(){setTimeout(function(){d.tap(e,n,t)},30)})},gesture:function p(e,n,t){var p={distanceX:h.randomizer.integer({min:-100,max:200}),distanceY:h.randomizer.integer({min:-100,max:200}),duration:h.randomizer.integer({min:20,max:500})},a=i(e,1,p.radius);s(n,e,a,p,function(e){t(e,p)})},multitouch:function(e,n,t){var a=h.randomizer.integer({min:2,max:h.maxTouches}),r={scale:h.randomizer.floating({min:0,max:2}),rotation:h.randomizer.natural({min:-100,max:100}),radius:h.randomizer.integer({min:50,max:200}),distanceX:h.randomizer.integer({min:-20,max:20}),distanceY:h.randomizer.integer({min:-20,max:20}),duration:h.randomizer.integer({min:100,max:1500})},o=i(e,a,r.radius);s(n,e,o,r,function(e){t(e,r)})}};return n(l,h),l}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(1),a=(t(2),t(3));return function(){function e(){return c.randomizer.natural({min:3,max:254})}function t(e,n){return o.elementFromPoint(e,n)}function r(e,n,t,a){var r=o.createElement("div");r.style.zIndex=2e3,r.style.border="3px solid orange",r.style["border-radius"]="50%",r.style.borderRadius="50%",r.style.width="40px",r.style.height="40px",r.style["box-sizing"]="border-box",r.style.position="absolute",r.style.webkitTransition="opacity 1s ease-out",r.style.mozTransition="opacity 1s ease-out",r.style.transition="opacity 1s ease-out",r.style.left=n+"px",r.style.top=t+"px",r.style.textAlign="center",r.style.paddingTop="7px",r.innerHTML=String.fromCharCode(a);var i=l.appendChild(r);setTimeout(function(){l.removeChild(i)},1e3),setTimeout(function(){i.style.opacity=0},50)}function i(){if(!c.randomizer)throw new a;var e=o.createEventObject?o.createEventObject():o.createEvent("Events"),n=c.randomizer.pick(c.eventTypes),t=c.keyGenerator(),r=c.randomizer.natural({max:s.clientWidth-1}),i=c.randomizer.natural({max:s.clientHeight-1}),l=c.targetElement(r,i);e.initEvent&&e.initEvent(n,!0,!0),e.keyCode=t,e.which=t,e.keyCodeVal=t,l.dispatchEvent?l.dispatchEvent(e):l.fireEvent("on"+n,e),"function"==typeof c.showAction&&c.showAction(l,r,i,t),c.logger&&"function"==typeof c.logger.log&&c.logger.log("gremlin","typer       type",String.fromCharCode(t),"at",r,i)}var o=window.document,s=o.documentElement,l=o.body,u=["keypress","keyup","keydown"],c={eventTypes:u,showAction:r,keyGenerator:e,targetElement:t,logger:null,randomizer:null};return n(i,c),i}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(4),a=t(1);return function(){function e(e,a,s){function l(t){n(e,[],m,t)}function u(e){return r?void 0:e>=c?t():void l(function(){setTimeout(function(){u(++e)},o.delay)})}var c=a&&a.nb?a.nb:o.nb,m=this;r=!1,i=s,u(0)}function t(){"function"==typeof i&&i(),i=null}var r,i,o={delay:10,nb:100};return e.stop=function(){r=!0,setTimeout(t,4)},a(e,o),e}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(4),a=t(1);return function(){function e(e,a,s){function l(e,t,a){return r?void 0:t>=c?a():void n([e],[],m,function(){setTimeout(function(){l(e,++t,a)},o.delay)})}function u(){return r?void 0:0===e.length?t():void l(e.shift(),0,u)}var c=a&&a.nb?a.nb:o.nb,e=e.slice(0),m=this;r=!1,i=s,u()}function t(){"function"==typeof i&&i(),i=null}var r,i,o={delay:10,nb:200};return e.stop=function(){r=!0,setTimeout(t,4)},a(e,o),e}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))},function(e,n,t){var a;a=function(e){"use strict";var n=t(4),a=t(1),r=t(2);return function(){function e(e,a,r){function c(t,a,r){return s?void 0:a>=m?o():void n([t],[],d,function(){setTimeout(function(){c(i(e,h),++a,r)},u.delay)})}var m=a&&a.nb?a.nb:u.nb,e=e.slice(0),h=0===u.distribution.length?t(e):u.distribution,d=this;return 0===m?r():(s=!1,l=r,void c(i(e,h),0,c))}function t(e){var n=e.length;if(0===n)return[];for(var t=[],a=1/n,r=0;n>r;r++)t.push(a);return t}function i(e,n){for(var t=0,a=u.randomizer.floating({min:0,max:1}),r=0,i=e.length;i>r;r++)if(t+=n[r],t>=a)return e[r];return function(){}}function o(){"function"==typeof l&&l(),l=null}var s,l,u={distribution:[],delay:10,nb:1e3,randomizer:new r};return e.stop=function(){s=!0,setTimeout(o,4)},a(e,u),e}}.call(n,t,n,e),!(void 0!==a&&(e.exports=a))}])});

/***/ }),
/* 22 */
/*!****************************************!*\
  !*** ./~/spa-app/lib/develop/hooks.js ***!
  \****************************************/
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var getElementById = document.getElementById,
	    querySelector  = document.querySelector;
	
	
	document.getElementById = function ( id ) {
	    var el = getElementById.call(document, id);
	
	    if ( !el ) {
	        throw new Error(__filename + ': no element with id ' + id);
	    }
	
	    return el;
	};
	
	
	document.querySelector = function ( selector ) {
	    var el = querySelector.call(document, selector);
	
	    if ( !el ) {
	        throw new Error(__filename + ': no element with selector: ' + selector);
	    }
	
	    return el;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-app/lib/develop/hooks.js"))

/***/ }),
/* 23 */
/*!*****************************************!*\
  !*** ./~/spa-app/lib/develop/static.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Static files reload on change.
	 *
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	//var tag = require('spa-dom').tag;
	
	
	//window.LiveReloadOptions = {port: LIVERELOAD.port};
	window.LiveReloadOptions = {
	    host: location.hostname,
	    port: (0) || 35729
	};
	//console.log(require('spa-gulp-livereload/config').default.tinylr);
	//console.log(LIVERELOAD);
	
	__webpack_require__(/*! livereload-js/dist/livereload.js */ 24);
	
	// livereload activation
	//if ( config.livereload ) {
	// load external script
	//document.head.appendChild(tag('script', {
	//    type: 'text/javascript',
	//    src: '/node_modules/livereload-js/dist/livereload.js?host=' + location.hostname + '&port=' + LIVERELOAD.port
	//}));
	//}


/***/ }),
/* 24 */
/*!********************************************!*\
  !*** ./~/livereload-js/dist/livereload.js ***!
  \********************************************/
/***/ (function(module, exports) {

	(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
	(function() {
	  var Connector, PROTOCOL_6, PROTOCOL_7, Parser, Version, ref;
	
	  ref = require('./protocol'), Parser = ref.Parser, PROTOCOL_6 = ref.PROTOCOL_6, PROTOCOL_7 = ref.PROTOCOL_7;
	
	  Version = "2.4.0";
	
	  exports.Connector = Connector = (function() {
	    function Connector(options, WebSocket, Timer, handlers) {
	      var path;
	      this.options = options;
	      this.WebSocket = WebSocket;
	      this.Timer = Timer;
	      this.handlers = handlers;
	      path = this.options.path ? "" + this.options.path : "livereload";
	      this._uri = "ws" + (this.options.https ? "s" : "") + "://" + this.options.host + ":" + this.options.port + "/" + path;
	      this._nextDelay = this.options.mindelay;
	      this._connectionDesired = false;
	      this.protocol = 0;
	      this.protocolParser = new Parser({
	        connected: (function(_this) {
	          return function(protocol) {
	            _this.protocol = protocol;
	            _this._handshakeTimeout.stop();
	            _this._nextDelay = _this.options.mindelay;
	            _this._disconnectionReason = 'broken';
	            return _this.handlers.connected(_this.protocol);
	          };
	        })(this),
	        error: (function(_this) {
	          return function(e) {
	            _this.handlers.error(e);
	            return _this._closeOnError();
	          };
	        })(this),
	        message: (function(_this) {
	          return function(message) {
	            return _this.handlers.message(message);
	          };
	        })(this)
	      });
	      this._handshakeTimeout = new this.Timer((function(_this) {
	        return function() {
	          if (!_this._isSocketConnected()) {
	            return;
	          }
	          _this._disconnectionReason = 'handshake-timeout';
	          return _this.socket.close();
	        };
	      })(this));
	      this._reconnectTimer = new this.Timer((function(_this) {
	        return function() {
	          if (!_this._connectionDesired) {
	            return;
	          }
	          return _this.connect();
	        };
	      })(this));
	      this.connect();
	    }
	
	    Connector.prototype._isSocketConnected = function() {
	      return this.socket && this.socket.readyState === this.WebSocket.OPEN;
	    };
	
	    Connector.prototype.connect = function() {
	      this._connectionDesired = true;
	      if (this._isSocketConnected()) {
	        return;
	      }
	      this._reconnectTimer.stop();
	      this._disconnectionReason = 'cannot-connect';
	      this.protocolParser.reset();
	      this.handlers.connecting();
	      this.socket = new this.WebSocket(this._uri);
	      this.socket.onopen = (function(_this) {
	        return function(e) {
	          return _this._onopen(e);
	        };
	      })(this);
	      this.socket.onclose = (function(_this) {
	        return function(e) {
	          return _this._onclose(e);
	        };
	      })(this);
	      this.socket.onmessage = (function(_this) {
	        return function(e) {
	          return _this._onmessage(e);
	        };
	      })(this);
	      return this.socket.onerror = (function(_this) {
	        return function(e) {
	          return _this._onerror(e);
	        };
	      })(this);
	    };
	
	    Connector.prototype.disconnect = function() {
	      this._connectionDesired = false;
	      this._reconnectTimer.stop();
	      if (!this._isSocketConnected()) {
	        return;
	      }
	      this._disconnectionReason = 'manual';
	      return this.socket.close();
	    };
	
	    Connector.prototype._scheduleReconnection = function() {
	      if (!this._connectionDesired) {
	        return;
	      }
	      if (!this._reconnectTimer.running) {
	        this._reconnectTimer.start(this._nextDelay);
	        return this._nextDelay = Math.min(this.options.maxdelay, this._nextDelay * 2);
	      }
	    };
	
	    Connector.prototype.sendCommand = function(command) {
	      if (this.protocol == null) {
	        return;
	      }
	      return this._sendCommand(command);
	    };
	
	    Connector.prototype._sendCommand = function(command) {
	      return this.socket.send(JSON.stringify(command));
	    };
	
	    Connector.prototype._closeOnError = function() {
	      this._handshakeTimeout.stop();
	      this._disconnectionReason = 'error';
	      return this.socket.close();
	    };
	
	    Connector.prototype._onopen = function(e) {
	      var hello;
	      this.handlers.socketConnected();
	      this._disconnectionReason = 'handshake-failed';
	      hello = {
	        command: 'hello',
	        protocols: [PROTOCOL_6, PROTOCOL_7]
	      };
	      hello.ver = Version;
	      if (this.options.ext) {
	        hello.ext = this.options.ext;
	      }
	      if (this.options.extver) {
	        hello.extver = this.options.extver;
	      }
	      if (this.options.snipver) {
	        hello.snipver = this.options.snipver;
	      }
	      this._sendCommand(hello);
	      return this._handshakeTimeout.start(this.options.handshake_timeout);
	    };
	
	    Connector.prototype._onclose = function(e) {
	      this.protocol = 0;
	      this.handlers.disconnected(this._disconnectionReason, this._nextDelay);
	      return this._scheduleReconnection();
	    };
	
	    Connector.prototype._onerror = function(e) {};
	
	    Connector.prototype._onmessage = function(e) {
	      return this.protocolParser.process(e.data);
	    };
	
	    return Connector;
	
	  })();
	
	}).call(this);
	
	},{"./protocol":6}],2:[function(require,module,exports){
	(function() {
	  var CustomEvents;
	
	  CustomEvents = {
	    bind: function(element, eventName, handler) {
	      if (element.addEventListener) {
	        return element.addEventListener(eventName, handler, false);
	      } else if (element.attachEvent) {
	        element[eventName] = 1;
	        return element.attachEvent('onpropertychange', function(event) {
	          if (event.propertyName === eventName) {
	            return handler();
	          }
	        });
	      } else {
	        throw new Error("Attempt to attach custom event " + eventName + " to something which isn't a DOMElement");
	      }
	    },
	    fire: function(element, eventName) {
	      var event;
	      if (element.addEventListener) {
	        event = document.createEvent('HTMLEvents');
	        event.initEvent(eventName, true, true);
	        return document.dispatchEvent(event);
	      } else if (element.attachEvent) {
	        if (element[eventName]) {
	          return element[eventName]++;
	        }
	      } else {
	        throw new Error("Attempt to fire custom event " + eventName + " on something which isn't a DOMElement");
	      }
	    }
	  };
	
	  exports.bind = CustomEvents.bind;
	
	  exports.fire = CustomEvents.fire;
	
	}).call(this);
	
	},{}],3:[function(require,module,exports){
	(function() {
	  var LessPlugin;
	
	  module.exports = LessPlugin = (function() {
	    LessPlugin.identifier = 'less';
	
	    LessPlugin.version = '1.0';
	
	    function LessPlugin(window, host) {
	      this.window = window;
	      this.host = host;
	    }
	
	    LessPlugin.prototype.reload = function(path, options) {
	      if (this.window.less && this.window.less.refresh) {
	        if (path.match(/\.less$/i)) {
	          return this.reloadLess(path);
	        }
	        if (options.originalPath.match(/\.less$/i)) {
	          return this.reloadLess(options.originalPath);
	        }
	      }
	      return false;
	    };
	
	    LessPlugin.prototype.reloadLess = function(path) {
	      var i, len, link, links;
	      links = (function() {
	        var i, len, ref, results;
	        ref = document.getElementsByTagName('link');
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          link = ref[i];
	          if (link.href && link.rel.match(/^stylesheet\/less$/i) || (link.rel.match(/stylesheet/i) && link.type.match(/^text\/(x-)?less$/i))) {
	            results.push(link);
	          }
	        }
	        return results;
	      })();
	      if (links.length === 0) {
	        return false;
	      }
	      for (i = 0, len = links.length; i < len; i++) {
	        link = links[i];
	        link.href = this.host.generateCacheBustUrl(link.href);
	      }
	      this.host.console.log("LiveReload is asking LESS to recompile all stylesheets");
	      this.window.less.refresh(true);
	      return true;
	    };
	
	    LessPlugin.prototype.analyze = function() {
	      return {
	        disable: !!(this.window.less && this.window.less.refresh)
	      };
	    };
	
	    return LessPlugin;
	
	  })();
	
	}).call(this);
	
	},{}],4:[function(require,module,exports){
	(function() {
	  var Connector, LiveReload, Options, ProtocolError, Reloader, Timer,
	    hasProp = {}.hasOwnProperty;
	
	  Connector = require('./connector').Connector;
	
	  Timer = require('./timer').Timer;
	
	  Options = require('./options').Options;
	
	  Reloader = require('./reloader').Reloader;
	
	  ProtocolError = require('./protocol').ProtocolError;
	
	  exports.LiveReload = LiveReload = (function() {
	    function LiveReload(window1) {
	      var k, ref, v;
	      this.window = window1;
	      this.listeners = {};
	      this.plugins = [];
	      this.pluginIdentifiers = {};
	      this.console = this.window.console && this.window.console.log && this.window.console.error ? this.window.location.href.match(/LR-verbose/) ? this.window.console : {
	        log: function() {},
	        error: this.window.console.error.bind(this.window.console)
	      } : {
	        log: function() {},
	        error: function() {}
	      };
	      if (!(this.WebSocket = this.window.WebSocket || this.window.MozWebSocket)) {
	        this.console.error("LiveReload disabled because the browser does not seem to support web sockets");
	        return;
	      }
	      if ('LiveReloadOptions' in window) {
	        this.options = new Options();
	        ref = window['LiveReloadOptions'];
	        for (k in ref) {
	          if (!hasProp.call(ref, k)) continue;
	          v = ref[k];
	          this.options.set(k, v);
	        }
	      } else {
	        this.options = Options.extract(this.window.document);
	        if (!this.options) {
	          this.console.error("LiveReload disabled because it could not find its own <SCRIPT> tag");
	          return;
	        }
	      }
	      this.reloader = new Reloader(this.window, this.console, Timer);
	      this.connector = new Connector(this.options, this.WebSocket, Timer, {
	        connecting: (function(_this) {
	          return function() {};
	        })(this),
	        socketConnected: (function(_this) {
	          return function() {};
	        })(this),
	        connected: (function(_this) {
	          return function(protocol) {
	            var base;
	            if (typeof (base = _this.listeners).connect === "function") {
	              base.connect();
	            }
	            _this.log("LiveReload is connected to " + _this.options.host + ":" + _this.options.port + " (protocol v" + protocol + ").");
	            return _this.analyze();
	          };
	        })(this),
	        error: (function(_this) {
	          return function(e) {
	            if (e instanceof ProtocolError) {
	              if (typeof console !== "undefined" && console !== null) {
	                return console.log(e.message + ".");
	              }
	            } else {
	              if (typeof console !== "undefined" && console !== null) {
	                return console.log("LiveReload internal error: " + e.message);
	              }
	            }
	          };
	        })(this),
	        disconnected: (function(_this) {
	          return function(reason, nextDelay) {
	            var base;
	            if (typeof (base = _this.listeners).disconnect === "function") {
	              base.disconnect();
	            }
	            switch (reason) {
	              case 'cannot-connect':
	                return _this.log("LiveReload cannot connect to " + _this.options.host + ":" + _this.options.port + ", will retry in " + nextDelay + " sec.");
	              case 'broken':
	                return _this.log("LiveReload disconnected from " + _this.options.host + ":" + _this.options.port + ", reconnecting in " + nextDelay + " sec.");
	              case 'handshake-timeout':
	                return _this.log("LiveReload cannot connect to " + _this.options.host + ":" + _this.options.port + " (handshake timeout), will retry in " + nextDelay + " sec.");
	              case 'handshake-failed':
	                return _this.log("LiveReload cannot connect to " + _this.options.host + ":" + _this.options.port + " (handshake failed), will retry in " + nextDelay + " sec.");
	              case 'manual':
	                break;
	              case 'error':
	                break;
	              default:
	                return _this.log("LiveReload disconnected from " + _this.options.host + ":" + _this.options.port + " (" + reason + "), reconnecting in " + nextDelay + " sec.");
	            }
	          };
	        })(this),
	        message: (function(_this) {
	          return function(message) {
	            switch (message.command) {
	              case 'reload':
	                return _this.performReload(message);
	              case 'alert':
	                return _this.performAlert(message);
	            }
	          };
	        })(this)
	      });
	      this.initialized = true;
	    }
	
	    LiveReload.prototype.on = function(eventName, handler) {
	      return this.listeners[eventName] = handler;
	    };
	
	    LiveReload.prototype.log = function(message) {
	      return this.console.log("" + message);
	    };
	
	    LiveReload.prototype.performReload = function(message) {
	      var ref, ref1, ref2;
	      this.log("LiveReload received reload request: " + (JSON.stringify(message, null, 2)));
	      return this.reloader.reload(message.path, {
	        liveCSS: (ref = message.liveCSS) != null ? ref : true,
	        liveImg: (ref1 = message.liveImg) != null ? ref1 : true,
	        reloadMissingCSS: (ref2 = message.reloadMissingCSS) != null ? ref2 : true,
	        originalPath: message.originalPath || '',
	        overrideURL: message.overrideURL || '',
	        serverURL: "http://" + this.options.host + ":" + this.options.port
	      });
	    };
	
	    LiveReload.prototype.performAlert = function(message) {
	      return alert(message.message);
	    };
	
	    LiveReload.prototype.shutDown = function() {
	      var base;
	      if (!this.initialized) {
	        return;
	      }
	      this.connector.disconnect();
	      this.log("LiveReload disconnected.");
	      return typeof (base = this.listeners).shutdown === "function" ? base.shutdown() : void 0;
	    };
	
	    LiveReload.prototype.hasPlugin = function(identifier) {
	      return !!this.pluginIdentifiers[identifier];
	    };
	
	    LiveReload.prototype.addPlugin = function(pluginClass) {
	      var plugin;
	      if (!this.initialized) {
	        return;
	      }
	      if (this.hasPlugin(pluginClass.identifier)) {
	        return;
	      }
	      this.pluginIdentifiers[pluginClass.identifier] = true;
	      plugin = new pluginClass(this.window, {
	        _livereload: this,
	        _reloader: this.reloader,
	        _connector: this.connector,
	        console: this.console,
	        Timer: Timer,
	        generateCacheBustUrl: (function(_this) {
	          return function(url) {
	            return _this.reloader.generateCacheBustUrl(url);
	          };
	        })(this)
	      });
	      this.plugins.push(plugin);
	      this.reloader.addPlugin(plugin);
	    };
	
	    LiveReload.prototype.analyze = function() {
	      var i, len, plugin, pluginData, pluginsData, ref;
	      if (!this.initialized) {
	        return;
	      }
	      if (!(this.connector.protocol >= 7)) {
	        return;
	      }
	      pluginsData = {};
	      ref = this.plugins;
	      for (i = 0, len = ref.length; i < len; i++) {
	        plugin = ref[i];
	        pluginsData[plugin.constructor.identifier] = pluginData = (typeof plugin.analyze === "function" ? plugin.analyze() : void 0) || {};
	        pluginData.version = plugin.constructor.version;
	      }
	      this.connector.sendCommand({
	        command: 'info',
	        plugins: pluginsData,
	        url: this.window.location.href
	      });
	    };
	
	    return LiveReload;
	
	  })();
	
	}).call(this);
	
	},{"./connector":1,"./options":5,"./protocol":6,"./reloader":7,"./timer":9}],5:[function(require,module,exports){
	(function() {
	  var Options;
	
	  exports.Options = Options = (function() {
	    function Options() {
	      this.https = false;
	      this.host = null;
	      this.port = 35729;
	      this.snipver = null;
	      this.ext = null;
	      this.extver = null;
	      this.mindelay = 1000;
	      this.maxdelay = 60000;
	      this.handshake_timeout = 5000;
	    }
	
	    Options.prototype.set = function(name, value) {
	      if (typeof value === 'undefined') {
	        return;
	      }
	      if (!isNaN(+value)) {
	        value = +value;
	      }
	      return this[name] = value;
	    };
	
	    return Options;
	
	  })();
	
	  Options.extract = function(document) {
	    var element, i, j, keyAndValue, len, len1, m, mm, options, pair, ref, ref1, src;
	    ref = document.getElementsByTagName('script');
	    for (i = 0, len = ref.length; i < len; i++) {
	      element = ref[i];
	      if ((src = element.src) && (m = src.match(/^[^:]+:\/\/(.*)\/z?livereload\.js(?:\?(.*))?$/))) {
	        options = new Options();
	        options.https = src.indexOf("https") === 0;
	        if (mm = m[1].match(/^([^\/:]+)(?::(\d+))?(\/+.*)?$/)) {
	          options.host = mm[1];
	          if (mm[2]) {
	            options.port = parseInt(mm[2], 10);
	          }
	        }
	        if (m[2]) {
	          ref1 = m[2].split('&');
	          for (j = 0, len1 = ref1.length; j < len1; j++) {
	            pair = ref1[j];
	            if ((keyAndValue = pair.split('=')).length > 1) {
	              options.set(keyAndValue[0].replace(/-/g, '_'), keyAndValue.slice(1).join('='));
	            }
	          }
	        }
	        return options;
	      }
	    }
	    return null;
	  };
	
	}).call(this);
	
	},{}],6:[function(require,module,exports){
	(function() {
	  var PROTOCOL_6, PROTOCOL_7, Parser, ProtocolError,
	    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
	
	  exports.PROTOCOL_6 = PROTOCOL_6 = 'http://livereload.com/protocols/official-6';
	
	  exports.PROTOCOL_7 = PROTOCOL_7 = 'http://livereload.com/protocols/official-7';
	
	  exports.ProtocolError = ProtocolError = (function() {
	    function ProtocolError(reason, data) {
	      this.message = "LiveReload protocol error (" + reason + ") after receiving data: \"" + data + "\".";
	    }
	
	    return ProtocolError;
	
	  })();
	
	  exports.Parser = Parser = (function() {
	    function Parser(handlers) {
	      this.handlers = handlers;
	      this.reset();
	    }
	
	    Parser.prototype.reset = function() {
	      return this.protocol = null;
	    };
	
	    Parser.prototype.process = function(data) {
	      var command, e, error, message, options, ref;
	      try {
	        if (this.protocol == null) {
	          if (data.match(/^!!ver:([\d.]+)$/)) {
	            this.protocol = 6;
	          } else if (message = this._parseMessage(data, ['hello'])) {
	            if (!message.protocols.length) {
	              throw new ProtocolError("no protocols specified in handshake message");
	            } else if (indexOf.call(message.protocols, PROTOCOL_7) >= 0) {
	              this.protocol = 7;
	            } else if (indexOf.call(message.protocols, PROTOCOL_6) >= 0) {
	              this.protocol = 6;
	            } else {
	              throw new ProtocolError("no supported protocols found");
	            }
	          }
	          return this.handlers.connected(this.protocol);
	        } else if (this.protocol === 6) {
	          message = JSON.parse(data);
	          if (!message.length) {
	            throw new ProtocolError("protocol 6 messages must be arrays");
	          }
	          command = message[0], options = message[1];
	          if (command !== 'refresh') {
	            throw new ProtocolError("unknown protocol 6 command");
	          }
	          return this.handlers.message({
	            command: 'reload',
	            path: options.path,
	            liveCSS: (ref = options.apply_css_live) != null ? ref : true
	          });
	        } else {
	          message = this._parseMessage(data, ['reload', 'alert']);
	          return this.handlers.message(message);
	        }
	      } catch (error) {
	        e = error;
	        if (e instanceof ProtocolError) {
	          return this.handlers.error(e);
	        } else {
	          throw e;
	        }
	      }
	    };
	
	    Parser.prototype._parseMessage = function(data, validCommands) {
	      var e, error, message, ref;
	      try {
	        message = JSON.parse(data);
	      } catch (error) {
	        e = error;
	        throw new ProtocolError('unparsable JSON', data);
	      }
	      if (!message.command) {
	        throw new ProtocolError('missing "command" key', data);
	      }
	      if (ref = message.command, indexOf.call(validCommands, ref) < 0) {
	        throw new ProtocolError("invalid command '" + message.command + "', only valid commands are: " + (validCommands.join(', ')) + ")", data);
	      }
	      return message;
	    };
	
	    return Parser;
	
	  })();
	
	}).call(this);
	
	},{}],7:[function(require,module,exports){
	(function() {
	  var IMAGE_STYLES, Reloader, numberOfMatchingSegments, pathFromUrl, pathsMatch, pickBestMatch, splitUrl;
	
	  splitUrl = function(url) {
	    var comboSign, hash, index, params;
	    if ((index = url.indexOf('#')) >= 0) {
	      hash = url.slice(index);
	      url = url.slice(0, index);
	    } else {
	      hash = '';
	    }
	    comboSign = url.indexOf('??');
	    if (comboSign >= 0) {
	      if (comboSign + 1 !== url.lastIndexOf('?')) {
	        index = url.lastIndexOf('?');
	      }
	    } else {
	      index = url.indexOf('?');
	    }
	    if (index >= 0) {
	      params = url.slice(index);
	      url = url.slice(0, index);
	    } else {
	      params = '';
	    }
	    return {
	      url: url,
	      params: params,
	      hash: hash
	    };
	  };
	
	  pathFromUrl = function(url) {
	    var path;
	    url = splitUrl(url).url;
	    if (url.indexOf('file://') === 0) {
	      path = url.replace(/^file:\/\/(localhost)?/, '');
	    } else {
	      path = url.replace(/^([^:]+:)?\/\/([^:\/]+)(:\d*)?\//, '/');
	    }
	    return decodeURIComponent(path);
	  };
	
	  pickBestMatch = function(path, objects, pathFunc) {
	    var bestMatch, i, len1, object, score;
	    bestMatch = {
	      score: 0
	    };
	    for (i = 0, len1 = objects.length; i < len1; i++) {
	      object = objects[i];
	      score = numberOfMatchingSegments(path, pathFunc(object));
	      if (score > bestMatch.score) {
	        bestMatch = {
	          object: object,
	          score: score
	        };
	      }
	    }
	    if (bestMatch.score > 0) {
	      return bestMatch;
	    } else {
	      return null;
	    }
	  };
	
	  numberOfMatchingSegments = function(path1, path2) {
	    var comps1, comps2, eqCount, len;
	    path1 = path1.replace(/^\/+/, '').toLowerCase();
	    path2 = path2.replace(/^\/+/, '').toLowerCase();
	    if (path1 === path2) {
	      return 10000;
	    }
	    comps1 = path1.split('/').reverse();
	    comps2 = path2.split('/').reverse();
	    len = Math.min(comps1.length, comps2.length);
	    eqCount = 0;
	    while (eqCount < len && comps1[eqCount] === comps2[eqCount]) {
	      ++eqCount;
	    }
	    return eqCount;
	  };
	
	  pathsMatch = function(path1, path2) {
	    return numberOfMatchingSegments(path1, path2) > 0;
	  };
	
	  IMAGE_STYLES = [
	    {
	      selector: 'background',
	      styleNames: ['backgroundImage']
	    }, {
	      selector: 'border',
	      styleNames: ['borderImage', 'webkitBorderImage', 'MozBorderImage']
	    }
	  ];
	
	  exports.Reloader = Reloader = (function() {
	    function Reloader(window, console, Timer) {
	      this.window = window;
	      this.console = console;
	      this.Timer = Timer;
	      this.document = this.window.document;
	      this.importCacheWaitPeriod = 200;
	      this.plugins = [];
	    }
	
	    Reloader.prototype.addPlugin = function(plugin) {
	      return this.plugins.push(plugin);
	    };
	
	    Reloader.prototype.analyze = function(callback) {
	      return results;
	    };
	
	    Reloader.prototype.reload = function(path, options) {
	      var base, i, len1, plugin, ref;
	      this.options = options;
	      if ((base = this.options).stylesheetReloadTimeout == null) {
	        base.stylesheetReloadTimeout = 15000;
	      }
	      ref = this.plugins;
	      for (i = 0, len1 = ref.length; i < len1; i++) {
	        plugin = ref[i];
	        if (plugin.reload && plugin.reload(path, options)) {
	          return;
	        }
	      }
	      if (options.liveCSS && path.match(/\.css(?:\.map)?$/i)) {
	        if (this.reloadStylesheet(path)) {
	          return;
	        }
	      }
	      if (options.liveImg && path.match(/\.(jpe?g|png|gif)$/i)) {
	        this.reloadImages(path);
	        return;
	      }
	      if (options.isChromeExtension) {
	        this.reloadChromeExtension();
	        return;
	      }
	      return this.reloadPage();
	    };
	
	    Reloader.prototype.reloadPage = function() {
	      return this.window.document.location.reload();
	    };
	
	    Reloader.prototype.reloadChromeExtension = function() {
	      return this.window.chrome.runtime.reload();
	    };
	
	    Reloader.prototype.reloadImages = function(path) {
	      var expando, i, img, j, k, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, results1, selector, styleNames, styleSheet;
	      expando = this.generateUniqueString();
	      ref = this.document.images;
	      for (i = 0, len1 = ref.length; i < len1; i++) {
	        img = ref[i];
	        if (pathsMatch(path, pathFromUrl(img.src))) {
	          img.src = this.generateCacheBustUrl(img.src, expando);
	        }
	      }
	      if (this.document.querySelectorAll) {
	        for (j = 0, len2 = IMAGE_STYLES.length; j < len2; j++) {
	          ref1 = IMAGE_STYLES[j], selector = ref1.selector, styleNames = ref1.styleNames;
	          ref2 = this.document.querySelectorAll("[style*=" + selector + "]");
	          for (k = 0, len3 = ref2.length; k < len3; k++) {
	            img = ref2[k];
	            this.reloadStyleImages(img.style, styleNames, path, expando);
	          }
	        }
	      }
	      if (this.document.styleSheets) {
	        ref3 = this.document.styleSheets;
	        results1 = [];
	        for (m = 0, len4 = ref3.length; m < len4; m++) {
	          styleSheet = ref3[m];
	          results1.push(this.reloadStylesheetImages(styleSheet, path, expando));
	        }
	        return results1;
	      }
	    };
	
	    Reloader.prototype.reloadStylesheetImages = function(styleSheet, path, expando) {
	      var e, error, i, j, len1, len2, rule, rules, styleNames;
	      try {
	        rules = styleSheet != null ? styleSheet.cssRules : void 0;
	      } catch (error) {
	        e = error;
	      }
	      if (!rules) {
	        return;
	      }
	      for (i = 0, len1 = rules.length; i < len1; i++) {
	        rule = rules[i];
	        switch (rule.type) {
	          case CSSRule.IMPORT_RULE:
	            this.reloadStylesheetImages(rule.styleSheet, path, expando);
	            break;
	          case CSSRule.STYLE_RULE:
	            for (j = 0, len2 = IMAGE_STYLES.length; j < len2; j++) {
	              styleNames = IMAGE_STYLES[j].styleNames;
	              this.reloadStyleImages(rule.style, styleNames, path, expando);
	            }
	            break;
	          case CSSRule.MEDIA_RULE:
	            this.reloadStylesheetImages(rule, path, expando);
	        }
	      }
	    };
	
	    Reloader.prototype.reloadStyleImages = function(style, styleNames, path, expando) {
	      var i, len1, newValue, styleName, value;
	      for (i = 0, len1 = styleNames.length; i < len1; i++) {
	        styleName = styleNames[i];
	        value = style[styleName];
	        if (typeof value === 'string') {
	          newValue = value.replace(/\burl\s*\(([^)]*)\)/, (function(_this) {
	            return function(match, src) {
	              if (pathsMatch(path, pathFromUrl(src))) {
	                return "url(" + (_this.generateCacheBustUrl(src, expando)) + ")";
	              } else {
	                return match;
	              }
	            };
	          })(this));
	          if (newValue !== value) {
	            style[styleName] = newValue;
	          }
	        }
	      }
	    };
	
	    Reloader.prototype.reloadStylesheet = function(path) {
	      var i, imported, j, k, len1, len2, len3, len4, link, links, m, match, ref, ref1, style;
	      links = (function() {
	        var i, len1, ref, results1;
	        ref = this.document.getElementsByTagName('link');
	        results1 = [];
	        for (i = 0, len1 = ref.length; i < len1; i++) {
	          link = ref[i];
	          if (link.rel.match(/^stylesheet$/i) && !link.__LiveReload_pendingRemoval) {
	            results1.push(link);
	          }
	        }
	        return results1;
	      }).call(this);
	      imported = [];
	      ref = this.document.getElementsByTagName('style');
	      for (i = 0, len1 = ref.length; i < len1; i++) {
	        style = ref[i];
	        if (style.sheet) {
	          this.collectImportedStylesheets(style, style.sheet, imported);
	        }
	      }
	      for (j = 0, len2 = links.length; j < len2; j++) {
	        link = links[j];
	        this.collectImportedStylesheets(link, link.sheet, imported);
	      }
	      if (this.window.StyleFix && this.document.querySelectorAll) {
	        ref1 = this.document.querySelectorAll('style[data-href]');
	        for (k = 0, len3 = ref1.length; k < len3; k++) {
	          style = ref1[k];
	          links.push(style);
	        }
	      }
	      this.console.log("LiveReload found " + links.length + " LINKed stylesheets, " + imported.length + " @imported stylesheets");
	      match = pickBestMatch(path, links.concat(imported), (function(_this) {
	        return function(l) {
	          return pathFromUrl(_this.linkHref(l));
	        };
	      })(this));
	      if (match) {
	        if (match.object.rule) {
	          this.console.log("LiveReload is reloading imported stylesheet: " + match.object.href);
	          this.reattachImportedRule(match.object);
	        } else {
	          this.console.log("LiveReload is reloading stylesheet: " + (this.linkHref(match.object)));
	          this.reattachStylesheetLink(match.object);
	        }
	      } else {
	        if (this.options.reloadMissingCSS) {
	          this.console.log("LiveReload will reload all stylesheets because path '" + path + "' did not match any specific one. To disable this behavior, set 'options.reloadMissingCSS' to 'false'.");
	          for (m = 0, len4 = links.length; m < len4; m++) {
	            link = links[m];
	            this.reattachStylesheetLink(link);
	          }
	        } else {
	          this.console.log("LiveReload will not reload path '" + path + "' because the stylesheet was not found on the page and 'options.reloadMissingCSS' was set to 'false'.");
	        }
	      }
	      return true;
	    };
	
	    Reloader.prototype.collectImportedStylesheets = function(link, styleSheet, result) {
	      var e, error, i, index, len1, rule, rules;
	      try {
	        rules = styleSheet != null ? styleSheet.cssRules : void 0;
	      } catch (error) {
	        e = error;
	      }
	      if (rules && rules.length) {
	        for (index = i = 0, len1 = rules.length; i < len1; index = ++i) {
	          rule = rules[index];
	          switch (rule.type) {
	            case CSSRule.CHARSET_RULE:
	              continue;
	            case CSSRule.IMPORT_RULE:
	              result.push({
	                link: link,
	                rule: rule,
	                index: index,
	                href: rule.href
	              });
	              this.collectImportedStylesheets(link, rule.styleSheet, result);
	              break;
	            default:
	              break;
	          }
	        }
	      }
	    };
	
	    Reloader.prototype.waitUntilCssLoads = function(clone, func) {
	      var callbackExecuted, executeCallback, poll;
	      callbackExecuted = false;
	      executeCallback = (function(_this) {
	        return function() {
	          if (callbackExecuted) {
	            return;
	          }
	          callbackExecuted = true;
	          return func();
	        };
	      })(this);
	      clone.onload = (function(_this) {
	        return function() {
	          _this.console.log("LiveReload: the new stylesheet has finished loading");
	          _this.knownToSupportCssOnLoad = true;
	          return executeCallback();
	        };
	      })(this);
	      if (!this.knownToSupportCssOnLoad) {
	        (poll = (function(_this) {
	          return function() {
	            if (clone.sheet) {
	              _this.console.log("LiveReload is polling until the new CSS finishes loading...");
	              return executeCallback();
	            } else {
	              return _this.Timer.start(50, poll);
	            }
	          };
	        })(this))();
	      }
	      return this.Timer.start(this.options.stylesheetReloadTimeout, executeCallback);
	    };
	
	    Reloader.prototype.linkHref = function(link) {
	      return link.href || link.getAttribute('data-href');
	    };
	
	    Reloader.prototype.reattachStylesheetLink = function(link) {
	      var clone, parent;
	      if (link.__LiveReload_pendingRemoval) {
	        return;
	      }
	      link.__LiveReload_pendingRemoval = true;
	      if (link.tagName === 'STYLE') {
	        clone = this.document.createElement('link');
	        clone.rel = 'stylesheet';
	        clone.media = link.media;
	        clone.disabled = link.disabled;
	      } else {
	        clone = link.cloneNode(false);
	      }
	      clone.href = this.generateCacheBustUrl(this.linkHref(link));
	      parent = link.parentNode;
	      if (parent.lastChild === link) {
	        parent.appendChild(clone);
	      } else {
	        parent.insertBefore(clone, link.nextSibling);
	      }
	      return this.waitUntilCssLoads(clone, (function(_this) {
	        return function() {
	          var additionalWaitingTime;
	          if (/AppleWebKit/.test(navigator.userAgent)) {
	            additionalWaitingTime = 5;
	          } else {
	            additionalWaitingTime = 200;
	          }
	          return _this.Timer.start(additionalWaitingTime, function() {
	            var ref;
	            if (!link.parentNode) {
	              return;
	            }
	            link.parentNode.removeChild(link);
	            clone.onreadystatechange = null;
	            return (ref = _this.window.StyleFix) != null ? ref.link(clone) : void 0;
	          });
	        };
	      })(this));
	    };
	
	    Reloader.prototype.reattachImportedRule = function(arg) {
	      var href, index, link, media, newRule, parent, rule, tempLink;
	      rule = arg.rule, index = arg.index, link = arg.link;
	      parent = rule.parentStyleSheet;
	      href = this.generateCacheBustUrl(rule.href);
	      media = rule.media.length ? [].join.call(rule.media, ', ') : '';
	      newRule = "@import url(\"" + href + "\") " + media + ";";
	      rule.__LiveReload_newHref = href;
	      tempLink = this.document.createElement("link");
	      tempLink.rel = 'stylesheet';
	      tempLink.href = href;
	      tempLink.__LiveReload_pendingRemoval = true;
	      if (link.parentNode) {
	        link.parentNode.insertBefore(tempLink, link);
	      }
	      return this.Timer.start(this.importCacheWaitPeriod, (function(_this) {
	        return function() {
	          if (tempLink.parentNode) {
	            tempLink.parentNode.removeChild(tempLink);
	          }
	          if (rule.__LiveReload_newHref !== href) {
	            return;
	          }
	          parent.insertRule(newRule, index);
	          parent.deleteRule(index + 1);
	          rule = parent.cssRules[index];
	          rule.__LiveReload_newHref = href;
	          return _this.Timer.start(_this.importCacheWaitPeriod, function() {
	            if (rule.__LiveReload_newHref !== href) {
	              return;
	            }
	            parent.insertRule(newRule, index);
	            return parent.deleteRule(index + 1);
	          });
	        };
	      })(this));
	    };
	
	    Reloader.prototype.generateUniqueString = function() {
	      return 'livereload=' + Date.now();
	    };
	
	    Reloader.prototype.generateCacheBustUrl = function(url, expando) {
	      var hash, oldParams, originalUrl, params, ref;
	      if (expando == null) {
	        expando = this.generateUniqueString();
	      }
	      ref = splitUrl(url), url = ref.url, hash = ref.hash, oldParams = ref.params;
	      if (this.options.overrideURL) {
	        if (url.indexOf(this.options.serverURL) < 0) {
	          originalUrl = url;
	          url = this.options.serverURL + this.options.overrideURL + "?url=" + encodeURIComponent(url);
	          this.console.log("LiveReload is overriding source URL " + originalUrl + " with " + url);
	        }
	      }
	      params = oldParams.replace(/(\?|&)livereload=(\d+)/, function(match, sep) {
	        return "" + sep + expando;
	      });
	      if (params === oldParams) {
	        if (oldParams.length === 0) {
	          params = "?" + expando;
	        } else {
	          params = oldParams + "&" + expando;
	        }
	      }
	      return url + params + hash;
	    };
	
	    return Reloader;
	
	  })();
	
	}).call(this);
	
	},{}],8:[function(require,module,exports){
	(function() {
	  var CustomEvents, LiveReload, k;
	
	  CustomEvents = require('./customevents');
	
	  LiveReload = window.LiveReload = new (require('./livereload').LiveReload)(window);
	
	  for (k in window) {
	    if (k.match(/^LiveReloadPlugin/)) {
	      LiveReload.addPlugin(window[k]);
	    }
	  }
	
	  LiveReload.addPlugin(require('./less'));
	
	  LiveReload.on('shutdown', function() {
	    return delete window.LiveReload;
	  });
	
	  LiveReload.on('connect', function() {
	    return CustomEvents.fire(document, 'LiveReloadConnect');
	  });
	
	  LiveReload.on('disconnect', function() {
	    return CustomEvents.fire(document, 'LiveReloadDisconnect');
	  });
	
	  CustomEvents.bind(document, 'LiveReloadShutDown', function() {
	    return LiveReload.shutDown();
	  });
	
	}).call(this);
	
	},{"./customevents":2,"./less":3,"./livereload":4}],9:[function(require,module,exports){
	(function() {
	  var Timer;
	
	  exports.Timer = Timer = (function() {
	    function Timer(func1) {
	      this.func = func1;
	      this.running = false;
	      this.id = null;
	      this._handler = (function(_this) {
	        return function() {
	          _this.running = false;
	          _this.id = null;
	          return _this.func();
	        };
	      })(this);
	    }
	
	    Timer.prototype.start = function(timeout) {
	      if (this.running) {
	        clearTimeout(this.id);
	      }
	      this.id = setTimeout(this._handler, timeout);
	      return this.running = true;
	    };
	
	    Timer.prototype.stop = function() {
	      if (this.running) {
	        clearTimeout(this.id);
	        this.running = false;
	        return this.id = null;
	      }
	    };
	
	    return Timer;
	
	  })();
	
	  Timer.start = function(timeout, func) {
	    return setTimeout(func, timeout);
	  };
	
	}).call(this);
	
	},{}]},{},[8]);


/***/ }),
/* 25 */
/*!*****************************************!*\
  !*** ./~/stb-app/lib/develop/events.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Additional dev events.
	 *
	 * @module stb/develop/events
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	/* eslint new-cap: 0 */
	
	var //util    = require('util'),
	    app       = __webpack_require__(/*! spa-app/lib/core */ 3),
	    stringify = __webpack_require__(/*! cjs-query */ 5).stringify,
	    //request = require('spa-request'),
	    //dom     = require('spa-dom'),
	    //storage = require('./storage'),
	    grid      = __webpack_require__(/*! ./grid */ 26),
	    events    = {};
	
	
	/**
	 * Apply the given screen geometry and reload the page.
	 *
	 * @param {number} width screen param
	 * @param {number} height screen param
	 */
	function changeScreenDimension ( width, height ) {
	    app.query.screenHeight = height;
	    location.search = '?' + stringify(app.query);
	
	    // check if it's necessary
	    /*if ( Number(localStorage.getItem('screen.height')) === height ) {
	        // not really
	        debug.log('no resolution change: new and current values are identical', 'red');
	    } else {
	        // yes
	        debug.log(util.format('switch to %sx%s', width, height), 'red');
	
	        // save in case of document reload
	        localStorage.setItem('screen.height', height);
	        localStorage.setItem('screen.width',  width);
	
	        // hide content to avoid raw HTML blinking
	        document.body.style.display = 'none';
	
	        // apply new metrics
	        app.setScreen(require('app:metrics')[height]);
	
	        // restore visibility
	        document.body.style.display = '';
	    }*/
	}
	
	
	// inherit SPA tools
	//require('spa-develop/events');
	
	
	events.load = function () {
	    // export to globals div for develop HTML elements
	    //window.$develop = document.body.appendChild(document.createElement('div'));
	    // window.$develop.className = 'develop';
	
	    // apply dev css
	    //document.body.classList.add('develop');
	
	    grid.init();
	
	    if ( app.develop.storage.getItem('grid.active') === 'true' ) {
	        grid.show();
	    }
	
	    // stress-testing
	    //window.gremlins = require('gremlins.js/gremlins.min.js');
	    //window.horde    = window.gremlins.createHorde();
	};
	
	
	events.keydown = function ( event ) {
	    var xhr, gSTB;
	
	    switch ( event.keyCode ) {
	        //// numpad 0
	        //case 96:
	        //    debug.log('full document reload', 'red');
	        //    location.hash = '';
	        //    location.reload();
	        //    break;
	
	        // numpad 1
	        case 97:
	            // NTSC
	            changeScreenDimension(720, 480);
	            break;
	
	        // numpad 2
	        case 98:
	            // PAL
	            changeScreenDimension(720, 576);
	            break;
	
	        // numpad 3
	        case 99:
	            // 720p
	            changeScreenDimension(1280, 720);
	            break;
	
	        // numpad 4
	        case 100:
	            // 1080p
	            changeScreenDimension(1920, 1080);
	            break;
	
	        // numpad 5
	        case 101:
	            // debug grid
	            if ( grid.active ) {
	                grid.hide();
	            } else {
	                grid.show();
	            }
	            debug.log('show grid: ' + grid.active, 'red');
	            app.develop.storage.setItem('grid.active', grid.active.toString());
	            break;
	
	        // numpad 6
	        //case 102:
	        //    // stress-testing for emulation
	        //    window.horde.unleash({nb: 500});
	        //    break;
	
	        // numpad 7
	        case 103:
	            gSTB = window.gSTB || window.parent.gSTB || window.top.gSTB;
	
	            // SpyJS enable/disable
	            if ( app.develop.storage.getItem('spyjs.active') ) {
	                //isSpyJs = false;
	                app.develop.storage.setItem('spyjs.active', false);
	                gSTB.ResetWebProxy();
	                debug.log('SpyJS: disable', 'red');
	                location.reload();
	            } else {
	                // try to "ping" proxy server
	                xhr = new XMLHttpRequest();
	                xhr.open('GET', document.location.protocol + '//' + location.hostname + ':3546');
	
	                xhr.onload = function () {
	                    // proxy seems ready
	                    //isSpyJs = true;
	                    app.develop.storage.setItem('spyjs.active', true);
	                    debug.log('SpyJS: enable', 'red');
	                    debug.log('SpyJS: set proxy to ' + location.hostname + ':' + 3546);
	
	                    gSTB.SetWebProxy(location.hostname, 3546, '', '', '');
	                    location.reload();
	                };
	
	                xhr.onerror = function () {
	                    debug.log('SpyJS: no connection (check SpyJS is started on the server)', 'red');
	                };
	
	                xhr.send();
	            }
	            break;
	
	        // numpad 8
	        //case 104:
	        //    // FireBug Lite
	        //    debug.log('firebug-lite activation', 'red');
	        //    document.head.appendChild(dom.tag('script', {
	        //        type: 'text/javascript',
	        //        src: 'http://getfirebug.com/firebug-lite.js#startOpened',
	        //        onload: function () {
	        //            debug.log('firebug-lite ready ...', 'green');
	        //        },
	        //        onerror: function ( error ) {
	        //            debug.inspect(error);
	        //        }
	        //    }));
	        //    break;
	
	        // numpad 9
	        //case 105:
	        //    // outline components and inner structures
	        //    debug.log('toggle develop css layout', 'red');
	        //    document.body.classList.toggle('develop');
	        //    break;
	
	        // numpad .
	        //case 110:
	        //    // CSS reload
	        //    debug.log('CSS reload', 'red');
	        //    // get through all css links
	        //    Array.prototype.slice.call(document.head.getElementsByTagName('link')).forEach(function forEachLink ( tag ) {
	        //        // get base name, modify and apply
	        //        tag.href = tag.href.split('?')[0] + '?' + (+new Date());
	        //    });
	        //    break;
	    }
	};
	
	
	// additional top-level key handlers
	window.addEventListener('load',    events.load);
	window.addEventListener('keydown', events.keydown);
	
	
	// public
	module.exports = events;


/***/ }),
/* 26 */
/*!***************************************!*\
  !*** ./~/stb-app/lib/develop/grid.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Visual grid with cursor.
	 *
	 * @module stb/develop/grid
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	var app     = __webpack_require__(/*! spa-app/lib/core */ 3),
	    metrics = app.metrics;
	    //storage = require('./storage');
	
	// public
	module.exports = window.grid = {
	
	    /** @type {HTMLElement} */
	    $canvas: null,
	
	    /** @type {CanvasRenderingContext2D} */
	    ctx: null,
	
	    lineWidth: 1,
	
	    // content middle point
	    centerX: 0,
	    centerY: 0,
	
	    // last click point
	    lastX: 0,
	    lastY: 0,
	
	    // mouse pointer
	    cursorX: 0,
	    cursorY: 0,
	
	    // list of click points
	    points: JSON.parse(app.develop.storage.getItem('grid.points') || '[]'),
	
	    // points to snap
	    snaps: [],
	
	    // visible or not
	    active: false,
	
	
	    init: function () {
	        // current execution context
	        var self = this;
	
	        this.$canvas = document.body.appendChild(document.createElement('canvas'));
	        this.ctx = this.$canvas.getContext('2d');
	
	        // apply size
	        this.ctx.canvas.width  = metrics.width;
	        this.ctx.canvas.height = metrics.height;
	
	        // safe zone center
	        this.centerX = metrics.availWidth  / 2 + metrics.availLeft;
	        this.centerY = metrics.availHeight / 2 + metrics.availTop;
	
	        this.snaps.push({x: metrics.availLeft,  y: metrics.availTop});
	        this.snaps.push({x: metrics.width - metrics.availRight, y: metrics.height - metrics.availBottom});
	        this.snaps.push({x: this.centerX, y: this.centerY});
	
	        this.ctx.lineWidth = this.lineWidth;
	        this.ctx.font = '14px Ubuntu';
	
	        this.$canvas.addEventListener('contextmenu', function ( event ) {
	            event.preventDefault();
	        });
	
	        this.$canvas.addEventListener('mousedown', function ( event ) {
	            self.mousedown(event);
	        });
	
	        this.$canvas.addEventListener('mousemove', function ( event ) {
	            self.mousemove(event);
	        });
	    },
	
	
	    mousemove: function ( event ) {
	        // current execution context
	        var self = this;
	
	        this.cursorX = event.x;
	        this.cursorY = event.y;
	
	        this.repaint();
	
	        if ( event.shiftKey ) {
	            // snap to the point divisible by 10
	            this.cursorX = Math.round(event.x / 10) * 10;
	            this.cursorY = Math.round(event.y / 10) * 10;
	        } else if ( !event.ctrlKey ) {
	            // snap to the nearest line
	            this.points.concat(this.snaps).forEach(function ( point ) {
	                if ( Math.abs(point.x - self.cursorX) <= 10 ) {
	                    self.cursorX = point.x;
	                }
	                if ( Math.abs(point.y - self.cursorY) <= 10 ) {
	                    self.cursorY = point.y;
	                }
	            });
	        }
	
	        this.drawPointer();
	    },
	
	
	    mousedown: function ( event ) {
	        var matchPoint = null,
	            self       = this,  // current execution context
	            point;
	
	        // all clicked crosses
	        this.points.forEach(function ( point ) {
	            if ( self.cursorX === point.x && self.cursorY === point.y ) {
	                matchPoint = point;
	            }
	        });
	
	        if ( event.button === 0 ) {
	            // left mouse button
	            if ( matchPoint === null ) {
	                this.points.push({x: this.cursorX, y: this.cursorY});
	            }
	            this.lastX = this.cursorX;
	            this.lastY = this.cursorY;
	        } else if ( event.button === 1 ) {
	            // middle mouse button
	            this.points.pop();
	            point = this.points[this.points.length - 1];
	            if ( point ) {
	                this.lastX = point.x;
	                this.lastY = point.y;
	            } else {
	                this.lastX = 0;
	                this.lastY = 0;
	            }
	        } else if ( event.button === 2 ) {
	            // right mouse button
	            if ( matchPoint === null ) {
	                this.lastX = 0;
	                this.lastY = 0;
	            } else {
	                this.points.splice(this.points.indexOf(matchPoint), 1);
	                point = this.points[this.points.length - 1];
	                if ( point ) {
	                    this.lastX = point.x;
	                    this.lastY = point.y;
	                } else {
	                    this.lastX = 0;
	                    this.lastY = 0;
	                }
	            }
	        }
	        this.repaint();
	        this.drawPointer();
	        app.develop.storage.setItem('grid.points', JSON.stringify(this.points));
	    },
	
	
	    show: function () {
	        this.active = true;
	        this.$canvas.classList.add('active');
	        this.repaint();
	    },
	
	
	    hide: function () {
	        this.active = false;
	        this.$canvas.classList.remove('active');
	    },
	
	
	    repaint: function () {
	        var ctx  = this.ctx,
	            self = this;  // current execution context
	
	        // remove all
	        ctx.clearRect(0, 0, metrics.width, metrics.height);
	
	        // safe zone center
	        this.drawCross({x: this.centerX, y: this.centerY}, {color: 'grey'});
	
	        // draw safe zone borders
	        ctx.strokeStyle = 'red';
	        ctx.strokeRect(metrics.availLeft + 0.5, metrics.availTop + 0.5, metrics.availWidth, metrics.availHeight);
	
	        // all clicked crosses
	        this.points.forEach(function ( point ) {
	            self.drawCross(point, {color: 'green', mark: 3});
	        });
	    },
	
	
	    drawPointer: function () {
	        var ctx    = this.ctx,
	            height = 16,
	            width, dx, dy, angle, title;
	
	        title = this.cursorX + ' : ' + this.cursorY;
	
	        // there were some clicks
	        if ( this.lastX || this.lastY ) {
	            // distance by X and Y from last point
	            dx = this.cursorX - this.lastX;
	            dy = this.cursorY - this.lastY;
	            title = title + ' [' + (dx > 0 ? '+' : '') + dx + ', ' + (dy > 0 ? '+' : '') + dy + ']';
	
	            // angle of the line connecting the cursor and the last point
	            angle = Math.atan2(dy, dx) * 180 / Math.PI;
	            title = title + ' ' + angle.toFixed(2) + '°';
	
	            // not perpendicular
	            if ( dx && dy ) {
	                // distance between the cursor and the last point
	                title = title + ' len: ' + Math.sqrt(Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2)).toFixed(2);
	            }
	
	            // angle line
	            ctx.beginPath();
	            // show by color if 45°
	            ctx.strokeStyle = [-135, 135, -45, 45].indexOf(angle) === -1 ? 'grey' : 'yellow';
	            ctx.moveTo(this.lastX, this.lastY);
	            ctx.lineTo(this.cursorX, this.cursorY);
	            ctx.stroke();
	        }
	
	        // pointer itself
	        this.drawCross({x: this.cursorX, y: this.cursorY});
	
	        title = ' ' + title + ' ';
	        width = ctx.measureText(title).width;
	
	        // title background
	        ctx.fillStyle = 'yellow';
	        ctx.fillRect(
	            this.cursorX > this.centerX ? this.cursorX - width  : this.cursorX,
	            this.cursorY > this.centerY ? this.cursorY - height : this.cursorY,
	            width, height
	        );
	
	        // title itself
	        ctx.fillStyle    = 'black';
	        ctx.textBaseline = this.cursorY > this.centerY ? 'bottom' : 'top';
	        ctx.textAlign    = this.cursorX > this.centerX ? 'right'  : 'left';
	        ctx.fillText(title, this.cursorX, this.cursorY);
	    },
	
	
	    drawCross: function ( point, options ) {
	        var ctx = this.ctx;
	
	        // defaults
	        options = options || {};
	
	        // apply style options
	        ctx.lineWidth   = options.width || this.lineWidth;
	        ctx.strokeStyle = options.color || 'yellow';
	
	        ctx.beginPath();
	        // horizontal line
	        ctx.moveTo(0, point.y + 0.5);
	        ctx.lineTo(metrics.width, point.y + 0.5);
	        // vertical line
	        ctx.moveTo(point.x + 0.5, 0);
	        ctx.lineTo(point.x + 0.5, metrics.height);
	        // draw
	        ctx.stroke();
	
	        // center mark
	        if ( options.mark ) {
	            ctx.lineWidth = 3;
	            ctx.beginPath();
	            // horizontal line
	            ctx.moveTo(point.x - options.mark + 0.5, point.y + 0.5);
	            ctx.lineTo(point.x + options.mark + 0.5, point.y + 0.5);
	            // vertical line
	            ctx.moveTo(point.x + 0.5, point.y - options.mark + 0.5);
	            ctx.lineTo(point.x + 0.5, point.y + options.mark + 0.5);
	            // draw
	            ctx.stroke();
	            ctx.lineWidth = this.lineWidth;
	        }
	    }
	
	};


/***/ }),
/* 27 */
/*!*****************************!*\
  !*** ./~/stb-keys/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Global list of non-printable control key codes.
	 *
	 * At the moment `keypress` and `keydown` events are emitted for the same keys (for both printable and non-printable characters).
	 *
	 * WARNING!!! All codes in this file (except 'volumeUp' and 'volumeDown')
	 * are used in window 'keydown' handler to prevent wrong 'keypress' firings.
	 * If you add new code to this file 'keypress' event with this code will never fire.
	 *
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	var keys = __webpack_require__(/*! spa-keys */ 28);
	
	
	// extend with additional codes
	keys.back         = keys.backspace;
	keys.channelNext  = keys.tab;        // Tab
	keys.channelPrev  = keys.tab + 's';  // Shift+Tab
	keys.ok           = keys.enter;      // Enter
	keys.exit         = keys.escape;     // Esc
	keys.volumeUp     = 107;             // NUMPAD +
	keys.volumeDown   = 109;             // NUMPAD -
	keys.f1           = 112 + 'c';       // Ctrl+F1
	keys.f2           = 113 + 'c';       // Ctrl+F2
	keys.f3           = 114 + 'c';       // Ctrl+F3
	keys.f4           = 115 + 'c';       // Ctrl+F4
	keys.refresh      = 116 + 'c';       // Ctrl+F5
	keys.frame        = 117 + 'c';       // Ctrl+F6
	keys.phone        = 119 + 'c';       // Ctrl+F8
	keys.set          = 120 + 'c';       // Ctrl+F9
	keys.tv           = 121 + 'c';       // Ctrl+F10
	keys.menu         = 122 + 'c';       // Ctrl+F11
	keys.app          = 123 + 'c';       // Ctrl+F12
	keys.rewind       = 66  + 'a';       // Alt+B
	keys.forward      = 70  + 'a';       // Alt+F
	keys.audio        = 71  + 'a';       // Alt+G
	keys.standby      = 74  + 'a';       // Alt+J
	keys.keyboard     = 76  + 'a';       // Alt+L
	keys.usbMounted   = 80  + 'a';       // Alt+P
	keys.usbUnmounted = 81  + 'a';       // Alt+Q
	keys.playPause    = 82  + 'a';       // Alt+R
	keys.play         = -1;              // should be redefined on some platforms
	keys.pause        = -1;              // should be redefined on some platforms
	keys.stop         = 83  + 'a';       // Alt+S
	keys.power        = 85  + 'a';       // Alt+U
	keys.record       = 87  + 'a';       // Alt+W
	keys.info         = 89  + 'a';       // Alt+Y
	keys.mute         = 192 + 'a';
	keys.digit0       = 48;
	keys.digit1       = 49;
	keys.digit2       = 50;
	keys.digit3       = 51;
	keys.digit4       = 52;
	keys.digit5       = 53;
	keys.digit6       = 54;
	keys.digit7       = 55;
	keys.digit8       = 56;
	keys.digit9       = 57;
	
	
	// public
	module.exports = keys;
	
	// public
	// module.exports = {
	//     getCode: function ( event ) {
	//         var code = event.keyCode;
	//
	//         // apply key modifiers
	//         if ( event.shiftKey ) { code += 1000; }
	//         if ( event.altKey )   { code += 2000; }
	//
	//         return code;
	//     },
	//
	//     codes: {
	//         back:         8,    // Backspace
	//         channelPrev:  1009, // Shift+Tab
	//         channelNext:  9,    // Tab
	//         ok:           13,   // Enter
	//         exit:         27,   // Esc
	//         pageUp:       33,
	//         pageDown:     34,
	//         end:          35,
	//         home:         36,
	//         left:         37,
	//         up:           38,
	//         right:        39,
	//         down:         40,
	//         'delete':     46,
	//         volumeUp:     107,  // NUMPAD +
	//         volumeDown:   109,  // NUMPAD -
	//         f1:           112,  // F1
	//         f2:           113,  // F2
	//         f3:           114,  // F3
	//         f4:           115,  // F4
	//         refresh:      116,  // F5
	//         frame:        117,  // F6
	//         phone:        119,  // F8
	//         set:          120,  // F9
	//         tv:           121,  // F10
	//         menu:         122,  // F11
	//         app:          123,  // F12
	//         rewind:       2066, // Alt+B
	//         forward:      2070, // Alt+F
	//         audio:        2071, // Alt+G
	//         standby:      2074, // Alt+J
	//         keyboard:     2076, // Alt+L
	//         usbMounted:   2080, // Alt+P
	//         usbUnmounted: 2081, // Alt+Q
	//         playPause:    2082, // Alt+R
	//         stop:         2083, // Alt+S
	//         power:        2085, // Alt+U
	//         record:       2087, // Alt+W
	//         info:         2089, // Alt+Y
	//         mute:         2192
	//     }
	// };


/***/ }),
/* 28 */
/*!*****************************!*\
  !*** ./~/spa-keys/index.js ***!
  \*****************************/
/***/ (function(module, exports) {

	/**
	 * Global list of non-printable control key codes.
	 *
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	// public
	module.exports = {
	    backspace: 8,
	    tab:       9,
	    enter:     13,
	    escape:    27,
	    space:     32,
	    pageUp:    33,
	    pageDown:  34,
	    end:       35,
	    home:      36,
	    left:      37,
	    up:        38,
	    right:     39,
	    down:      40,
	    insert:    45,
	    // not "delete" because of old browsers issue
	    del:       46
	};


/***/ }),
/* 29 */
/*!************************!*\
  !*** ./config/lang.js ***!
  \************************/
/***/ (function(module, exports) {

	/**
	 * Gettext localization configuration.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	// public
	module.exports = {
		// turn on/off localization support
		active: true,
	
		// list of languages to generate localization files for
		languages: [
			'en',
			'ru',
			'uk',
			'de',
			'ar'
		],
	
		// list of languages to generate localization files for
		languagesCodeLocalized: [
			'EN',
			'РУ',
			'УКР',
			'DE',
			'AR'
		],
	
		languagesLocalized: [
			'English',
			'Русский',
			'Українська',
			'Deutch',
			'Arabian'
		],
	
		locales: [
			'en-US',
			'ru-RU',
			'uk-UA',
			'de-DE',
			'ar-EG'
		],
	
		regions: [
			'US',
			'RU',
			'UA',
			'DE',
			'EG'
		],
	
		directions: [
			'ltr',
			'ltr',
			'ltr',
			'ltr',
			'rtl'
		],
	
		// Specifies the encoding of the input files.
		// This option is needed only if some untranslated message strings or their corresponding comments
		// contain non-ASCII characters.
		// @flag --from-code=name
		fromCode: 'UTF-8',
	
		// Place comment blocks starting with tag and preceding keyword lines in the output file.
		// Without a tag, the option means to put all comment blocks preceding keyword lines in the output file.
		// Note that comment blocks supposed to be extracted must be adjacent to keyword lines.
		// @flag --add-comments[=tag]
		addComments: 'gettext',
	
		// Write the .po file using indented style.
		// @flag --indent
		indent: false,
	
		// Write "#: filename:line" lines.
		// @flag --no-location
		noLocation: true,
	
		// Do not break long message lines.
		// Message lines whose width exceeds the output page width will not be split into several lines.
		// Only file reference lines which are wider than the output page width will be split.
		// @flag --no-wrap
		noWrap: true,
	
		// Generate sorted output.
		// Note that using this option makes it much harder for the translator to understand each message’s context.
		// @flag --sort-output
		sortOutput: true,
	
		// Sort output by file location.
		// @flag --sort-by-file
		sortByFile: false,
	
		// Increase verbosity level.
		// @flag --verbose
		verbose: false
	};


/***/ }),
/* 30 */
/*!***********************!*\
  !*** ./config/app.js ***!
  \***********************/
/***/ (function(module, exports) {

	/**
	 * Global application configuration.
	 * Should store run-time options, paths, flags and so on.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	// public export
	module.exports = {
		defaultSettings: {
			safeSearch: 0,
			quality: 0,
			language: 'en',
			languageOverwrite: 0,
			keyboardLanguage: 0,
			credentialsIndex: -1,
			refreshToken: null,
			sessionToken: null
		},
		settingsFile: 'youtube.json',
		logging: false,
		ajaxDebug: false
	};


/***/ }),
/* 31 */
/*!**************************************!*\
  !*** ./src/js/modules/api/client.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var app = __webpack_require__(/*! mag-app */ 1),
		Promise = __webpack_require__(/*! ../promise */ 32),
	
		fetch = __webpack_require__(/*! ../util/fetch */ 33),
	
		lang = __webpack_require__(/*! ../../../../config/lang */ 29),
	
		channelsIcons = __webpack_require__(/*! ./category.icons.js */ 34),
		api = {
			credentials: [],
			categories: [],
			subscriptions: [],
			playlists: [],
			BASE_URL: 'https://www.googleapis.com/youtube/v3/',
			APP_DOMAIN: 'https://mathiasbynens.be/demo/css-without-html',
			AUTH_URL: '',
			credentialsIndex: 0,
			token: false,
			refreshToken: false,
			activeKey: '',
			staticUrl: '',
			regionCode: '',
	
			/**
			 * Base api request function.
			 *
			 * @param {string} method http request method
			 * @param {string} url control part of the url
			 * @param {string} [body] option post params
			 * @return {Promise} promised action
			 */
			request: function ( method, url, body ) {
				var self = this;
	
				//console.log('AJAX ' + method + ' to ' + self.BASE_URL + url + self.staticUrl);
				// if ( AJAX_DEBUG ) {
				// 	//debug.log('AJAX ' + method + ' to ' + self.BASE_URL + url + self.staticUrl);
				// }
	
				// Creating a promise
				return new Promise( function ( resolve, reject ) {
					// Instantiates the XMLHttpRequest
					var client = new XMLHttpRequest();
	
					client.open(method, self.BASE_URL + url + self.staticUrl + '&qq=123');
	
					client.setRequestHeader('Accept', 'application/json');
					client.setRequestHeader('Content-Type', 'application/json');
	
					if ( self.token ) {
						client.setRequestHeader('Authorization', 'Bearer ' + self.token);
					}
	
					client.onload = function () {
						var data;
	
						// if ( AJAX_DEBUG ) {
						// 	debug.log(this.status);
						// }
						if ( this.status === 200 ) {
							// Performs the function "resolve" when this.status is equal to 200
							// if ( AJAX_DEBUG ) {
							// 	window.dump(self.BASE_URL + url + self.staticUrl, 'LOADED');
							// 	window.dump(this.responseText, 'response');
							// }
							//debug.info(this.responseText)
							resolve( this.responseText );
						} else if ( this.status === 401 ) {
							// if ( AJAX_DEBUG ) {
							// 	window.dump(self.BASE_URL + url + self.staticUrl, 'LOADED with code 401');
							// 	window.dump(this.responseText, 'response');
							// }
							api.token = false;
							app.settings.sessionToken = false;
							refreshToken(app.settings).then(function () {
								return menuInit();
							}, function () {
								client.request(method, url, body).then(function ( data ) {
									resolve(data);
								});
							})['catch'](function ( e ) {
								reject( e );
							});
						} else if ( this.status === 403 ) {
							// if ( AJAX_DEBUG ) {
							// 	window.dump(self.BASE_URL + url + self.staticUrl, 'LOADED with code 401');
							// 	window.dump(this.responseText, 'response');
							// }
							reject( this.status );
						} else {
							// if ( AJAX_DEBUG ) {
							// 	window.dump(self.BASE_URL + url + self.staticUrl, 'LOADED with code ' + this.status);
							// 	window.dump(this.responseText, 'response');
							// }
							// Performs the function "reject" when this.status is different than 200
							reject( this.status );
						}
					};
					client.onerror = function () {
						// if ( AJAX_DEBUG ) {
						// 	window.dump(self.BASE_URL + url + self.staticUrl, 'ERRORRED with code ' + this.status);
						// }
						reject();
					};
					client.send(body);
				});
			}
		};
	
	
	function getRandomInt ( min, max ) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	
	function resolveCredentials ( index, callback ) {
		var credentials = api.credentials[index],
			xhr, baseUrl;
	
		xhr = new XMLHttpRequest();
		baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=id&hl=ru-RU&regionCode=UA&q=sad&key=';
	
		xhr.onload = function () {
			if ( this.status === 200 ) {
				api.activeKey = api.credentials[index].key;
				api.staticUrl = '&key=' + api.activeKey + '&hl=' + lang.locales[app.languageIndex] + '&regionCode=' + api.regionCode;
				callback();
			} else {
				resolveCredentials(getRandomInt(0, api.credentials.length - 1), callback);
			}
		};
	
		xhr.open('GET', baseUrl + credentials.key);
	
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setRequestHeader('Content-Type', 'application/json');
	
		xhr.send();
	}
	
	
	function x (a, b) {
		var i = 0, size = a.length,
			d = [],
			k;
	
		d.length = size;
	
		while (i < size) {
			k = i % b.length;
			d[i] = (String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(k)))
			++i;
		}
	
		return d.join('');
	}
	
	
	function setupConfig ( configRaw ) {
		var config;
	
		try {
			config = JSON.parse(configRaw);
			if ( config.keys ) {
				api.credentials = config.keys;
			}
		} catch ( e ) {
			//debug.info(e);
			config = {menu: {}}
		}
	
		return new Promise(function ( resolve ) {
			var xhr;
	
			if ( !(config.keys && config.keys[0].key !== 'AIzaSyCFtsKHmupT42nYB2HO_xiwMIrkWe4CD3c' ) ) {
				// decode public keys
				xhr = new XMLHttpRequest();
				xhr.open('GET', '1.cab', false);
				xhr.send();
				xhr = x(atob(xhr.responseText), kol('googleshallnotpass', 'magiscool'));
	
				api.credentials = JSON.parse(xhr).map(function ( item ) {
					return {
						key: item.k,
						clientId: item.c,
						secret: item.s
					};
				});
			}
	
			resolveCredentials(getRandomInt(0, api.credentials.length - 1), function () {
				if ( config.menu && config.menu.categories ) {
					Object.keys(config.menu.categories).forEach(function ( categoryId ) {
						api.categories.push({
							id: categoryId,
							value: config.menu.categories[categoryId],
							title: config.menu.categories[categoryId],
							icon: channelsIcons[categoryId]
						});
					});
	
					//if ( config.menu.playlists ) {
					//	Object.keys(config.menu.playlists).forEach(function ( playlistId ) {
					//		api.playlists.push({
					//			id: playlistId,
					//			value: config.menu.playlists[playlistId],
					//			title: config.menu.playlists[playlistId],
					//			icon: channelsIcons['GCQmVzdCBvZiBZb3VUdWJl']
					//		});
					//	});
					//}
					if ( config.menu.channels ) {
						Object.keys(config.menu.channels).forEach(function ( channelId ) {
							api.subscriptions.push({
								id: channelId,
								value: config.menu.channels[channelId],
								title: config.menu.channels[channelId],
								icon: channelsIcons['GCVG9wIEJsb2dz']
							});
						});
					}
					resolve();
	
				} else {
					api.request('GET', 'guideCategories?part=snippet').then(function ( data ) {
						if ( data && data.items ) {
							data.items.forEach(function ( item ) {
								api.categories.push({
									id: item.id,
									title: item.snippet.title,
									value: item.snippet.title,
									icon: channelsIcons[item.id]
								});
							});
						}
	
						if ( config.menu ) {
							//if ( config.menu.playlists ) {
							//	Object.keys(config.menu.playlists).forEach(function ( playlistId ) {
							//		api.subscriptions.push({
							//			id: playlistId,
							//			value: playlistId,
							//			title: config.menu.playlists[playlistId],
							//			icon: channelsIcons['GCVG9wIEJsb2dz']
							//		});
							//	});
							//}
							if ( config.menu.channels ) {
								Object.keys(config.menu.channels).forEach(function ( channelId ) {
									api.subscriptions.push({
										id: channelId,
										value: channelId,
										title: config.menu.channels[channelId],
										icon: channelsIcons['GCVG9wIEJsb2dz']
									});
								});
							}
						}
	
						resolve();
					}, function ( error ) {
						if ( error === 403 && api.credentials.length > 0 ) {
	
						} else {
							resolve();
						}
					});
				}
				//var i, size, categoriesIds, playlistsIds, channelsIds;
				//
				//if ( config.menu.categories ) {
				//	categoriesIds = Object.keys(config.menu.categories);
				//	size = categoriesIds.length;
				//	i = 0;
				//	while ( i < size ) {
				//
				//	}
				//}
	
			})
		})
	
		//if ( useRandomCredentials ) {
		//	if ( configRaw.credentials ) {
		//		api.credentials = config.credentials;
		//	}
		//	api.credentialsIndex = getRandomInt(0, api.credentials.key.length - 1);
		//	api.activeKey = api.credentials.key[self.credentialsIndex];
		//	api.AUTH_URL = 'https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/youtube.force-ssl&access_type=offline&redirect_uri=' + api.APP_DOMAIN + '&client_id=' + api.credentials.clientId[api.credentialsIndex];
		//}
	
		//guideCategories = JSON.parse(guideCategories).items;
		//guideCategories.forEach(function ( item ) {
		//	categories[item.id] = {
		//		id: item.id,
		//		title: item.snippet.title,
		//		value: item.snippet.title,
		//		icon: channelsIcons[item.id]
		//	};
		//});
	    //
		//if ( categoriesKeys.length > 0 ) {
		//	config.forEach(function ( id ) {
		//		if ( categories[id] ) {
		//			api.categories.push(categories[id]);
		//		}
		//	});
		//} else {
		//	guideCategories.forEach(function ( item ) {
		//		api.categories.push({
		//			id: item.id,
		//			title: item.snippet.title,
		//			value: item.snippet.title,
		//			icon: channelsIcons[item.id]
		//		});
		//	});
		//}
	    //
		//if ( api.token ) {
		//	return api.request('GET', 'subscriptions?part=snippet&mine=true&maxResults=50').then(function ( data ) {
		//		data = JSON.parse(data).items;
		//		data.forEach(function ( item ) {
		//			api.subscriptions.push({
		//				id: item.snippet.resourceId.channelId,
		//				value: item.snippet.title,
		//				title: item.snippet.title,
		//				icon: item.snippet.thumbnails['default'].url
		//			});
		//		});
		//	}, function (  ) {
	    //
		//	});
		//}
	}
	
	
	function menuInit () {
		//return api.request('GET', 'guideCategories?part=snippet').then(function ( data ) {
			var xhr = new XMLHttpRequest(),
				configUrl = 'https://raw.githubusercontent.com/GeraldBrooks/youtube/master/config.json';
	
			if ( app.params.config ) {
				configUrl = app.params.config;
			}
	
			xhr.open('GET', configUrl);
	
			// if ( AJAX_DEBUG ) {
			// 	window.dump(configUrl, 'CONFIG URL');
			// }
	
			return fetch(xhr).then(function ( config ) {
				return setupConfig(config);
			})['catch'](function (err) {
				xhr.open('GET', 'config.json');
	
				fetch(xhr).then(function ( config ) {
					return setupConfig(config);
				})['catch'](function (  ) {
					setupConfig();
					//data = JSON.parse(data).items;
					//data.splice(1, 1);
					//data.forEach(function ( item ) {
					//	api.categories.push({
					//		id: item.id,
					//		title: item.snippet.title,
					//		value: item.snippet.title,
					//		icon: channelsIcons[item.id]
					//	});
					//});
					//if ( api.token ) {
					//	return api.request('GET', 'subscriptions?part=snippet&mine=true&maxResults=50').then(function ( data ) {
					//		data = JSON.parse(data).items;
					//		data.forEach(function ( item ) {
					//			api.subscriptions.push({
					//				id: item.snippet.resourceId.channelId,
					//				value: item.snippet.title,
					//				title: item.snippet.title,
					//				icon: item.snippet.thumbnails['default'].url
					//			});
					//		});
					//	}, function (  ) {
	                //
					//	});
					//}
				})
			});
		//})['catch'](function (error, url) {
		//	//debug.info([error, url], 'catch API LOAD ERROR');
		//});
	}
	
	
	function refreshToken ( settings ) {
		//return new Promise( function ( resolve, reject )
			//var client = new XMLHttpRequest();
	        //
			////debug.info(settings, 'SETTINGS');
			//if ( settings.refreshToken ) {
			//	client.open('POST', 'https://accounts.google.com/o/oauth2/token');
			//	client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        //
			//	client.onload = function () {
			//		if ( this.status === 200 ) {
			//			// Performs the function "resolve" when this.status is equal to 200
			//			api.token = JSON.parse(this.responseText).access_token;
			//			api.refreshToken = refreshToken;
			//			resolve();
			//		} else {
			//			api.token = false;
			//			api.refreshToken = false;
			//			// Performs the function "reject" when this.status is different than 200
			//			reject(this.status);
			//		}
			//	};
			//	client.onerror = function () {
			//		api.token = false;
			//		api.refreshToken = false;
			//		reject(this.status);
			//	};
			//	if ( AJAX_DEBUG ) {
			//		//debug.info('client_id=' + api.credentials.clientId[api.credentialsIndex] + '&client_secret=' + api.credentials.secret[api.credentialsIndex] + '&grant_type=refresh_token&refresh_token=' + settings.refreshToken, 'refreshToken');
			//	}
			//	client.send('client_id=' + api.credentials.clientId[api.credentialsIndex] + '&client_secret=' + api.credentials.secret[api.credentialsIndex] + '&grant_type=refresh_token&refresh_token=' + settings.refreshToken);
			//	return;
			//} else if ( settings.sessionToken ) {
			//	api.token = settings.sessionToken;
			//	resolve();
			//	return;
			//}
			//reject();
		//});
	}
	
	
	/**
	 *
	 * @param {Object} settings user settings
	 * @return {Promise} result promise
	 */
	api.init = function ( settings ) {
		//if ( settings.customCredenitals ) {
		//	this.credentials = settings.customCredenitals;
		//	this.credentialsIndex = getRandomInt(0, this.credentials.key.length - 1);
		//} else {
		//	if ( settings.refreshToken && typeof settings.credentialsIndex === 'number' && settings.credentialsIndex !== -1 ) {
		//		this.credentialsIndex = settings.credentialsIndex;
		//	} else {
		//		this.credentialsIndex = getRandomInt(0, this.credentials.keys.length - 1);
		//	}
		//}
	
		//this.activeKey = this.credentials.key[this.credentialsIndex];
	    //
		//this.AUTH_URL = 'https://accounts.google.com/o/oauth2/auth?approval_prompt=force&response_type=code&scope=https://www.googleapis.com/auth/youtube.force-ssl&access_type=offline&redirect_uri=' + this.APP_DOMAIN + '&client_id=' + this.credentials.clientId[this.credentialsIndex];
	    //
		if ( app.params.regionCode ) {
			api.regionCode = app.params.regionCode;
		} else {
			api.regionCode = lang.regions[app.languageIndex];
		}
		//	this.staticUrl = '&key=' + this.activeKey + '&hl=' + lang.locales[app.languageIndex] + '&regionCode=' + lang.regions[app.languageIndex];
		//}
	
		//return refreshToken(app.settings).then(function () {
			return menuInit();
		//}, function () {
		//	return menuInit(true);
		//})['catch'](function ( e ) {
		//	//debug.info(e);
		//});
	};
	
	
	api.postAuth = function ( code ) {
		//var self = this;
	    //
		////debug.info(code, 'postAuth');
		//return new Promise( function ( resolve, reject ) {
		//	// Instantiates the XMLHttpRequest
		//	var client = new XMLHttpRequest();
	    //
		//	if ( !code ) {
		//		//debug.log('postAuth reject');
		//		reject();
		//	}
	    //
		//	client.open('POST', 'https://www.googleapis.com/oauth2/v4/token');
		//	client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    //
		//	client.onload = function () {
		//		//debug.log('postAuth onload');
		//		//debug.info(this.responseText)
		//		if ( this.status === 200 ) {
		//			// Performs the function "resolve" when this.status is equal to 200
		//			self.token = JSON.parse(this.responseText);
		//			self.refreshToken = self.token.refresh_token;
		//			self.token = self.token.access_token;
		//			resolve({
		//				refreshToken: self.refreshToken,
		//				sessionToken: self.token
		//			});
		//		} else {
		//			self.token = false;
		//			self.refreshToken = false;
		//			// Performs the function "reject" when this.status is different than 200
		//			reject(this.status);
		//		}
		//	};
		//	client.onerror = function () {
		//		//debug.log('postAuth onerror');
		//		self.token = false;
		//		self.refreshToken = false;
		//		reject(this.status);
		//	};
		//	debug.info('code=' + code + '&client_id=' +
		//		self.credentials.clientId[self.credentialsIndex] + '&client_secret=' +
		//		self.credentials.secret[self.credentialsIndex] + '&grant_type=authorization_code&redirect_uri=' +
		//		self.APP_DOMAIN, 'POST AUTH');
	    //
		//	client.send('code=' + code + '&client_id=' +
		//		self.credentials.clientId[self.credentialsIndex] + '&client_secret=' +
		//		self.credentials.secret[self.credentialsIndex] + '&grant_type=authorization_code&redirect_uri='
		//		+ self.APP_DOMAIN);
		//});
	};
	
	
	/**
	 * Convert time in seconds for better human readability.
	 *
	 * @param {string} timeStr time in ISO-8601 standart, like 'PT2M7S' = 2min 7 sec
	 * @return {string} readable seconds
	 */
	api.normalizeVideoDuration = function ( timeStr ) {
		var time = new Date(0),
			hours, minutes, seconds;
	
		timeStr = timeStr.replace('PT', '').replace('S', '').split('M');
		if ( timeStr.length > 1 ) {
			timeStr[0] = timeStr[0].split('H');
			if ( timeStr[0].length > 1 ) {
				time.setUTCHours(timeStr[0][0]);
				time.setUTCMinutes(timeStr[0][1]);
			} else {
				time.setUTCMinutes(timeStr[0]);
			}
			time.setUTCSeconds(timeStr[1]);
			seconds = timeStr[1];
		} else {
			time.setUTCSeconds(timeStr[0]);
			seconds = timeStr[0];
		}
	
		hours = time.getUTCHours();
		minutes = time.getUTCMinutes();
		if ( seconds < 10 ) {
			if ( !seconds ) {
				seconds = '0';
			}
			seconds = '0' + seconds;
		}
		if ( hours > 1 && minutes < 10 ) {
			minutes = '0' + minutes;
		}
		if ( hours < 1 ) {
			hours = '';
		} else if ( hours < 10 ) {
			hours = '0' + hours + ':';
		}
		return hours + minutes + ':' + seconds;
	};
	
	module.exports = api;


/***/ }),
/* 32 */
/*!***********************************!*\
  !*** ./src/js/modules/promise.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * https://github.com/taylorhakes/promise-polyfill
	 *
	 * @module stb/promise
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	/* eslint-disable */
	
	/**
	 * Base Promise implementation.
	 *
	 * @param {function} fn function executor with two arguments resolve and reject
	 *
	 * @constructor
	 *
	 * @example
	 * var p = new Promise(function ( resolve, reject ) {
	 *     // do a thing, possibly async, then ...
	 *     if ( everything_turned_out_fine ) {
	 *         resolve('ok');
	 *     } else {
	 *         reject(new Error('failure'));
	 *     }
	 * });
	 */
	function Promise ( fn ) {
	    if ( false ) {
	        if ( typeof this !== 'object' ) { throw new Error(__filename + ': must be constructed via new'); }
	        if ( typeof fn !== 'function' ) { throw new Error(__filename + ': argument should be a function'); }
	    }
	
	    this.state = null;
	    this.value = null;
	    this.deferreds = [];
	    //this.executor  = fn;
	
	    doResolve(fn, bind(resolve, this), bind(reject, this));
	}
	
	
	/*Promise.prototype = {
	    then: function ( onFulfilled, onRejected ) {
	        var self = this;
	
	        return new Promise(function ( resolve, reject ) {
	            handle.call(self, new Handler(onFulfilled, onRejected, resolve, reject));
	        });
	    }
	};*/
	
	
	// Polyfill for Function.prototype.bind
	function bind ( fn, thisArg ) {
	    return function () {
	        fn.apply(thisArg, arguments);
	    };
	}
	
	
	function handle ( deferred ) {
	    var self = this;
	
	    if ( this.state === null ) {
	        this.deferreds.push(deferred);
	        return;
	    }
	    setTimeout(function () {
	        var cb = self.state ? deferred.onFulfilled : deferred.onRejected,
	            ret;
	
	        if ( cb === null ) {
	            (self.state ? deferred.resolve : deferred.reject)(self.value);
	            return;
	        }
	
	        try {
	            ret = cb(self.value);
	        } catch ( e ) {
	            deferred.reject(e);
	            return;
	        }
	
	        deferred.resolve(ret);
	    });
	}
	
	
	function resolve ( newValue ) {
	    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	        if ( newValue === this ) { throw new TypeError('A promise cannot be resolved with itself.'); }
	        if ( newValue && (typeof newValue === 'object' || typeof newValue === 'function') ) {
	            var then = newValue.then;
	
	            if ( typeof then === 'function' ) {
	                doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
	                return;
	            }
	        }
	        this.state = true;
	        this.value = newValue;
	        finale.call(this);
	    } catch ( e ) {
	        reject.call(this, e);
	    }
	}
	
	
	function reject ( newValue ) {
	    this.state = false;
	    this.value = newValue;
	    finale.call(this);
	}
	
	
	function finale () {
	    var i, len;
	
	    for ( i = 0, len = this.deferreds.length; i < len; i++ ) {
	        handle.call(this, this.deferreds[i]);
	    }
	    this.deferreds = null;
	}
	
	
	function Handler ( onFulfilled, onRejected, resolve, reject ) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.resolve = resolve;
	    this.reject = reject;
	}
	
	
	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve ( fn, onFulfilled, onRejected ) {
	    var done = false;
	
	    try {
	        fn(function ( value ) {
	            if ( done ) { return; }
	            done = true;
	            onFulfilled(value);
	        }, function ( reason ) {
	            if ( done ) { return; }
	            done = true;
	            onRejected(reason);
	        });
	    } catch ( ex ) {
	        if ( done ) { return; }
	        done = true;
	        onRejected(ex);
	    }
	}
	
	
	Promise.prototype['catch'] = function ( onRejected ) {
	    return this.then(null, onRejected);
	};
	
	
	Promise.prototype.then = function ( onFulfilled, onRejected ) {
	    var self = this;
	
	    return new Promise(function ( resolve, reject ) {
	        handle.call(self, new Handler(onFulfilled, onRejected, resolve, reject));
	    });
	};
	
	
	Promise.all = function () {
	    var args = Array.prototype.slice.call(arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments);
	
	    return new Promise(function ( resolve, reject ) {
	        var remaining = args.length,
	            i;
	
	        if ( args.length === 0 ) { return resolve([]); }
	
	        function res ( i, val ) {
	            try {
	                if ( val && (typeof val === 'object' || typeof val === 'function') ) {
	                    var then = val.then;
	
	                    if ( typeof then === 'function' ) {
	                        then.call(val, function ( val ) {
	                            res(i, val);
	                        }, reject);
	                        return;
	                    }
	                }
	                args[i] = val;
	                if ( --remaining === 0 ) {
	                    resolve(args);
	                }
	            } catch ( ex ) {
	                reject(ex);
	            }
	        }
	
	        for ( i = 0; i < args.length; i++ ) {
	            res(i, args[i]);
	        }
	    });
	};
	
	
	Promise.resolve = function ( value ) {
	    if ( value && typeof value === 'object' && value.constructor === Promise ) {
	        return value;
	    }
	
	    return new Promise(function ( resolve ) {
	        resolve(value);
	    });
	};
	
	
	Promise.reject = function ( value ) {
	    return new Promise(function ( resolve, reject ) {
	        reject(value);
	    });
	};
	
	
	Promise.race = function ( values ) {
	    return new Promise(function ( resolve, reject ) {
	        for ( var i = 0, len = values.length; i < len; i++ ) {
	            values[i].then(resolve, reject);
	        }
	    });
	};
	
	
	// public
	module.exports = window.Promise || Promise;


/***/ }),
/* 33 */
/*!**************************************!*\
  !*** ./src/js/modules/util/fetch.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(/*! ../promise */ 32);
	
	
	/**
	 * Fetch a xhr.
	 *
	 * @param {XMLHttpRequest} client  opened xhr
	 * @param {string} [body] request body
	 * @return {Promise} resulted promise
	 */
	function fetch ( client, body ) {
		// Creating a promise
		return new Promise( function ( resolve, reject ) {
			client.onload = function () {
				if ( this.status === 200 ) {
					// if ( AJAX_DEBUG ) {
					// 	window.dump('CONFIG LOADED');
					// 	window.dump(this.responseText, 'CONFIG CONTENT');
					// }
					resolve( this.responseText );
				} else {
					// if ( AJAX_DEBUG ) {
					// 	window.dump('CONFIG LOADED WITH STATUS ' + this.status);
					// 	window.dump(this.responseText, 'CONFIG CONTENT');
					// }
					reject( this.statusText );
				}
			};
			client.onerror = function () {
				// if ( AJAX_DEBUG ) {
				// 	window.dump('CONFIG LOADING ERROR ' + this.status);
				// 	window.dump(this.responseText, 'CONFIG CONTENT');
				// }
				reject();
			};
			client.send(body);
		});
	}
	
	module.exports = fetch;


/***/ }),
/* 34 */
/*!**********************************************!*\
  !*** ./src/js/modules/api/category.icons.js ***!
  \**********************************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
		GCQmVzdCBvZiBZb3VUdWJl           : 'icon popular',
		GCUGFpZCBDaGFubmVscw             : 'icon purchases', // Paid channles
		GCTXVzaWM                        : 'icon music',
		GCQ29tZWR5                       : 'icon humor',
		GCRmlsbSAmIEVudGVydGFpbm1lbnQ    : 'icon entertainment',
		GCR2FtaW5n                       : 'icon games',
		GCQmVhdXR5ICYgRmFzaGlvbg         : 'icon social', // Beauty & Fashion
		GCRnJvbSBUVg                     : 'fa fa-youtube-play', // from tv
		GCQXV0b21vdGl2ZQ                 : 'fa fa-car', // Automotive
		GCQW5pbWF0aW9u                   : 'fa fa-picture-o', // Animation
		GCVG9wIFlvdVR1YmUgQ29sbGVjdGlvbnM: 'icon popular', // Top YouTube Collections
		GCVG9wIEJsb2dz                   : 'icon social', // Top Blogs
		GCU3BvcnRz                       : 'icon sport', // Sports
		GCSG93LXRvICYgRElZ               : 'fa fa-wrench', // How-to & DIY
		GCVGVjaA                         : 'icon hobbie', // Tech
		GCU2NpZW5jZSAmIEVkdWNhdGlvbg     : 'fa fa-book', // Science & Education
		GCQ29va2luZyAmIEhlYWx0aA         : 'fa fa-spoon', // Cooking & Health
		GCQ2F1c2VzICYgTm9uLXByb2ZpdHM    : 'fa fa-users', // Causes & Non-profits
		GCTmV3cyAmIFBvbGl0aWNz           : 'icon news', // News & Politics
		GCTGlmZXN0eWxl                   : 'fa fa-leaf' // Lifestyle
	};


/***/ }),
/* 35 */
/*!******************************!*\
  !*** ./src/js/pages/main.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Main page implementation.
	 *
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 * @license Commercial
	 */
	
	'use strict';
	
	var	keys   = __webpack_require__(/*! stb-keys */ 27),
		app    = __webpack_require__(/*! mag-app */ 1),
	
		Page = __webpack_require__(/*! stb-component-page */ 36),
	
		id   = 'pm',
	
		widgetHelp = __webpack_require__(/*! ../components/widget.help */ 39),
	
		page = new Page({$node: document.getElementById(id)}),
		backTo = null,
	
		menuList, menu, lastActiveTab;
	
	page.addListener('keydown', function ( event ) {
		if ( event.code === keys.info ) {
			// if ( menuList.visible ) {
			// 	menu.content.tabs[menu.activeTab].activate();
			// } else {
			menuList.focus();
			// }
		} else if ( event.code === keys.f3 ) {
			app.route(app.pages.search);
		} else if ( event.code === keys.back && backTo ) {
			app.route(backTo);
			event.stop = true;
		}
	});
	
	
	page.once('show', function () {
		menu.content.tabs[menu.activeTab].activate();
	});
	
	page.addListener('show', function ( event ) {
		// menu = require('../modules/api/model/menu');
	
		backTo = null;
		window.page = event.page;
		widgetHelp.updateView({
			SEARCH: {
				icon: 'search',
				visible: true,
				text: gettext('Search')
			},
			MORE: {
				icon: 'more',
				visible: false,
				text: ''
			},
			GUIDE: {
				icon: 'info',
				visible: true,
				text: gettext('Guide')
			},
			BACK: {
				icon: 'back',
				visible: true,
				text: gettext('Exit')
			}
		}, 'pageMain');
	
		if ( event.data && event.data.channel ) {
			lastActiveTab = menu.activeTab;
			menu.content.tabs[menu.activeTab].hide();
			menu.activeTab = 1;
			if ( !event.data.channel.noBack ) {
				backTo = app.pages.search;
			}
			//channel
			menu.content.tabs[menu.activeTab].activate(event.data.channel);
		} else if ( menu.content.tabs.length > 0 ) {
			//debug.info(lastActiveTab, 'lastActiveTab');
			if ( !lastActiveTab ) {
				lastActiveTab = 3;
			}
			menu.content.tabs[menu.activeTab].hide();
			menu.activeTab = lastActiveTab;
			//debug.info(menu.activeTab, 'menu.activeTab');
			menu.content.tabs[menu.activeTab].activate();
		}
	});
	
	page.addListener('hide', function () {
		__webpack_require__(/*! ../components/loader */ 41).hide();
	});
	
	menu = __webpack_require__(/*! ../modules/api/model/menu */ 42);
	
	page.add(menuList = __webpack_require__(/*! ../components/page.main/list.menu */ 43));
	
	menuList.addListener('show', function () {
		widgetHelp.updateView({
			SEARCH: {
				icon: 'search',
				visible: false,
				text: gettext('Search')
			},
			GUIDE: {
				icon: 'info',
				visible: true,
				text: gettext('Close guide')
			}
		}, 'pageMain');
	});
	
	menuList.addListener('hide', function () {
		widgetHelp.updateView({
			SEARCH: {
				icon: 'search',
				visible: true,
				text: gettext('Search')
			},
			GUIDE: {
				icon: 'info',
				visible: true,
				text: gettext('Guide')
			}
		}, 'pageMain');
	});
	
	menu.content.tabs.push(__webpack_require__(/*! ../components/page.main/tabs/category.content */ 46));
	menu.content.tabs.push(__webpack_require__(/*! ../components/page.main/tabs/channel.content */ 61));
	menu.content.tabs.push(__webpack_require__(/*! ../components/page.main/tabs/settings */ 64));
	menu.content.tabs.push(__webpack_require__(/*! ../components/page.main/tabs/main.content */ 69));
	
	menu.content.tabs.forEach(function ( item ) {
		page.add(item);
	});
	
	if ( __webpack_require__(/*! ../modules/api/client */ 31).token ) {
		__webpack_require__(/*! ../modules/api/model/channels */ 60).getMine().then(function ( channel ) {
			window.pmUserInfo.data = {disabled: true};
			window.pmUserInfo.appendChild(document.createElement('div'));
			window.pmUserInfo.firstChild.style.backgroundImage = 'url(' + channel.icon + ')';
			window.pmUserInfo.firstChild.classList.add('userImage');
			window.pmUserInfo.appendChild(document.createElement('div'));
			window.pmUserInfo.children[1].innerHTML = channel.title;
			window.pmUserInfo.children[1].classList.add('userName');
		})['catch'](function ( e ) {
			//debug.info(e);
		});
	} else {
		window.pmUserInfo.style.display = 'none';
	}
	
	if ( true ) {
		window.menu = menu;
	}
	
	// public export
	module.exports = page;


/***/ }),
/* 36 */
/*!***************************************!*\
  !*** ./~/stb-component-page/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	// public
	module.exports = __webpack_require__(/*! spa-component-page */ 37);
	
	// correct component name
	module.exports.prototype.name = 'stb-component-page';


/***/ }),
/* 37 */
/*!***************************************!*\
  !*** ./~/spa-component-page/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! spa-component */ 38);
	
	
	/**
	 * Base page implementation.
	 *
	 * A full-screen top-level layer that can operate as an independent separate entity.
	 * It is added to the document body on creation if not already linked.
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 *
	 * @example
	 * var Page = require('stb/ui/page'),
	 *     page = new Page({
	 *         $node: document.getElementById(id)
	 *     });
	 *
	 * page.addListener('show', function show () {
	 *     // page is visible now
	 * });
	 */
	function Page ( config ) {
	    // sanitize
	    config = config || {};
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        // init parameters checks
	        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
	            throw new Error(__filename + ': wrong or empty config.className');
	        }
	    }
	
	    /**
	     * Page visibility/active state flag.
	     *
	     * @readonly
	     * @type {boolean}
	     */
	    this.active = false;
	
	    /**
	     * Link to the currently active component with focus.
	     *
	     * @readonly
	     * @type {Component}
	     */
	    this.activeComponent = null;
	
	    // set default className if classList property empty or undefined
	    //config.className = 'page ' + (config.className || '');
	
	    // parent constructor call
	    Component.call(this, config);
	
	    // state flag
	    this.active = this.$node.classList.contains('active');
	
	    // correct DOM parent/child connection if necessary
	    if ( this.$node.parentNode === null ) {
	        document.body.appendChild(this.$node);
	    }
	
	    // always itself
	    this.page = this;
	}
	
	
	// inheritance
	Page.prototype = Object.create(Component.prototype);
	Page.prototype.constructor = Page;
	
	// set component name
	Page.prototype.name = 'spa-component-page';
	
	
	// public
	module.exports = Page;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-component-page/index.js"))

/***/ }),
/* 38 */
/*!**********************************!*\
  !*** ./~/spa-component/index.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var app     = __webpack_require__(/*! spa-app/lib/core */ 3),
	    Emitter = __webpack_require__(/*! cjs-emitter */ 4),
	    counter = 0;
	
	
	/**
	 * Base component implementation.
	 *
	 * Visual element that can handle sub-components.
	 * Each component has a DOM element container $node with a set of classes:
	 * "component" and some specific component class names depending on the hierarchy, for example "page".
	 * Each component has a unique ID given either from $node.id or from data.id. If not given will generate automatically.
	 *
	 * @constructor
	 * @extends Emitter
	 *
	 * @param {Object} [config={}] init parameters
	 * @param {Element} [config.id] component unique identifier (generated if not set)
	 * @param {string} [config.className] space-separated list of classes for "className" property of this.$node
	 * @param {Element} [config.$node] DOM element/fragment to be a component outer container
	 * @param {Element} [config.$body] DOM element/fragment to be a component inner container (by default is the same as $node)
	 * @param {Component} [config.parent] link to the parent component which has this component as a child
	 * @param {Array.<Component>} [config.children=[]] list of components in this component
	 * @param {Object.<string, function>} [config.events={}] list of event callbacks
	 * @param {boolean} [config.visible=true] component initial visibility state flag
	 * @param {boolean} [config.focusable=true] component can accept focus or not
	 * @param {boolean} [config.propagate=false] allow to emit events to the parent component
	 *
	 * @fires module:stb/component~Component#click
	 *
	 * @example
	 * var component = new Component({
	 *     $node: document.getElementById(id),
	 *     className: 'bootstrap responsive',
	 *     events: {
	 *         click: function () { ... }
	 *     }
	 * });
	 * component.add( ... );
	 * component.focus();
	 */
	function Component ( config ) {
	    // current execution context
	    var self = this,
	        name;
	
	    // sanitize
	    config = config || {};
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        // init parameters checks
	        if ( config.id && typeof config.id !== 'string' ) {
	            throw new Error(__filename + ': wrong or empty config.id');
	        }
	        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
	            throw new Error(__filename + ': wrong or empty config.className');
	        }
	        if ( config.$node && !(config.$node instanceof Element) ) {
	            throw new Error(__filename + ': wrong config.$node type');
	        }
	        if ( config.$body && !(config.$body instanceof Element) ) {
	            throw new Error(__filename + ': wrong config.$body type');
	        }
	        if ( config.parent && !(config.parent instanceof Component) ) {
	            throw new Error(__filename + ': wrong config.parent type');
	        }
	        if ( config.children && !Array.isArray(config.children) ) {
	            throw new Error(__filename + ': wrong config.children type');
	        }
	    }
	
	    /**
	     * Component visibility state flag.
	     *
	     * @readonly
	     * @type {boolean}
	     */
	    this.visible = true;
	
	    /**
	     * Component can accept focus or not.
	     *
	     * @type {boolean}
	     */
	    this.focusable = true;
	
	    /**
	     * DOM outer handle.
	     *
	     * @type {Element}
	     */
	    this.$node = null;
	
	    /**
	     * DOM inner handle.
	     * In simple cases is the same as $node.
	     *
	     * @type {Element}
	     */
	    this.$body = null;
	
	    /**
	     * Link to the parent component which has this component as a child.
	     *
	     * @type {Component}
	     */
	    this.parent = null;
	
	    /**
	     * List of all children components.
	     *
	     * @type {Component[]}
	     */
	    this.children = [];
	
	    /**
	     * allow to emit events to the parent component
	     *
	     * @readonly
	     * @type {boolean}
	     */
	    this.propagate = !!config.propagate;
	
	    // parent constructor call
	    Emitter.call(this);
	
	    // outer handle - empty div in case nothing is given
	    this.$node = config.$node || document.createElement('div');
	
	    // inner handle - the same as outer handler in case nothing is given
	    this.$body = config.$body || this.$node;
	
	    // set CSS class names
	    //this.$node.className += ' component ' + (config.className || '');
	    // previous approach is not good as it mess with components hierarchy
	    this.$node.className = this.name + ' ' + (config.className || '');
	
	    // apply component id if given, generate otherwise
	    this.id = config.id || this.$node.id || 'cid' + counter++;
	
	    // apply hierarchy
	    if ( config.parent ) {
	        // add to parent component
	        config.parent.add(this);
	    }
	
	    // apply given visibility
	    if ( config.visible === false ) {
	        // default state is visible
	        this.hide();
	    }
	
	    // apply focus handling method
	    if ( config.focusable === false ) {
	        // can't accept focus
	        this.focusable = false;
	    }
	
	    // a descendant defined own events
	    if ( this.defaultEvents ) {
	        // sanitize
	        config.events = config.events || {};
	
	        if ( true ) {
	            if ( typeof config.events !== 'object' ) {
	                throw new Error(__filename + ': wrong config.events type');
	            }
	            if ( typeof this.defaultEvents !== 'object' ) {
	                throw new Error(__filename + ': wrong this.defaultEvents type');
	            }
	        }
	
	        for ( name in this.defaultEvents ) {
	            // overwrite default events with user-defined
	            config.events[name] = config.events[name] || this.defaultEvents[name];
	        }
	    }
	
	    if ( config.events ) {
	        // apply all given events
	        Object.keys(config.events).forEach(function ( eventName ) {
	            self.addListener(eventName, config.events[eventName]);
	        });
	    }
	
	    // apply the given children components
	    if ( config.children ) {
	        // apply
	        this.add.apply(this, config.children);
	    }
	
	    // component activation by mouse
	    this.$node.addEventListener('click', function ( event ) {
	        // left mouse button
	        //if ( event.button === 0 ) {
	        // activate if possible
	        self.focus();
	
	        // there are some listeners
	        if ( self.events['click'] ) {
	            /**
	             * Mouse click event.
	             *
	             * @event module:stb/component~Component#click
	             *
	             * @type {Object}
	             * @property {Event} event click event data
	             */
	            self.emit('click', event);
	        }
	        //}
	
	        if ( true ) {
	            // middle mouse button
	            if ( event.button === 1 ) {
	                //debug.inspect(self, 0);
	                debug.info('"window.link" or "' + self.id + '.component"', 'this component is now available in global scope');
	                window.link = self;
	                self.$node.classList.toggle('wired');
	            }
	        }
	
	        event.stopPropagation();
	    });
	
	    if ( true ) {
	        // expose inner ID to global scope
	        window[self.id] = self.$node;
	
	        // expose a link
	        this.$node.component = this.$body.component = this;
	        this.$node.title = this.name + '#' + this.id + ' (outer)';
	        this.$body.title = this.name + '#' + this.id + ' (inner)';
	    }
	
	    debug.info('create component ' + this.name + '#' + this.id, null, {
	        tags: ['create', 'component', this.name, this.id]
	    });
	}
	
	
	// inheritance
	Component.prototype = Object.create(Emitter.prototype);
	Component.prototype.constructor = Component;
	
	
	/**
	 * List of all default event callbacks.
	 *
	 * @type {Object.<string, function>}
	 */
	Component.prototype.defaultEvents = null;
	
	
	/**
	 * Add a new component as a child.
	 *
	 * @param {...Component} [child] variable number of elements to append
	 *
	 * @files Component#add
	 *
	 * @example
	 * panel.add(
	 *     new Button( ... ),
	 *     new Button( ... )
	 * );
	 */
	Component.prototype.add = function ( child ) {
	    var index;
	
	    // walk through all the given elements
	    for ( index = 0; index < arguments.length; index++ ) {
	        child = arguments[index];
	
	        if ( true ) {
	            if ( !(child instanceof Component) ) {
	                throw new Error(__filename + ': wrong child type');
	            }
	        }
	
	        // apply
	        this.children.push(child);
	        child.parent = this;
	
	        // correct DOM parent/child connection if necessary
	        if ( child.$node && child.$node.parentNode === null ) {
	            this.$body.appendChild(child.$node);
	        }
	
	        debug.info('add component ' + child.name + '#' + child.id + ' to ' + this.name + '#' + this.id, null, {
	            tags: ['add', 'component', this.name, this.id, child.name, child.id]
	        });
	
	        // there are some listeners
	        if ( this.events['add'] ) {
	            /**
	             * A child component is added.
	             *
	             * @event module:stb/component~Component#add
	             *
	             * @type {Object}
	             * @property {Component} item new component added
	             */
	            this.emit('add', {item: child});
	        }
	
	        //debug.log('component ' + this.name + '#' + this.id + ' new child: ' + child.name + '#' + child.id);
	    }
	};
	
	
	/* @todo: consider activation in future */
	///**
	// * Insert component into the specific position.
	// *
	// * @param {Component} child component instance to insert
	// * @param {number} index insertion position
	// */
	//Component.prototype.insert = function ( child, index ) {
	//    var prevIndex = this.children.indexOf(child);
	//
	//    if ( DEVELOP ) {
	//        if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
	//        if ( !(child instanceof Component) ) { throw new Error(__filename + ': wrong child type'); }
	//    }
	//
	//    if ( prevIndex !== -1 ) {
	//        this.children.splice(prevIndex, 1);
	//        this.$body.removeChild(child.$node);
	//    }
	//
	//    if ( index === this.children.length ) {
	//        this.$body.appendChild(child.$node);
	//    } else {
	//        this.$body.insertBefore(child.$node, this.$body.children[index]);
	//    }
	//    this.children.splice(index, 0, child);
	//
	//    if ( !child.parent ) {
	//        child.parent = this;
	//    }
	//};
	
	
	/**
	 * Delete this component and clear all associated events.
	 *
	 * @fires module:stb/component~Component#remove
	 */
	Component.prototype.remove = function () {
	    // really inserted somewhere
	    if ( this.parent ) {
	        if ( true ) {
	            if ( !(this.parent instanceof Component) ) {
	                throw new Error(__filename + ': wrong this.parent type');
	            }
	        }
	
	        // active at the moment
	        if ( app.activePage.activeComponent === this ) {
	            this.blur();
	            this.parent.focus();
	        }
	        this.parent.children.splice(this.parent.children.indexOf(this), 1);
	    }
	
	    // remove all children
	    this.children.forEach(function ( child ) {
	        if ( true ) {
	            if ( !(child instanceof Component) ) {
	                throw new Error(__filename + ': wrong child type');
	            }
	        }
	
	        child.remove();
	    });
	
	    this.$node.parentNode.removeChild(this.$node);
	
	    // there are some listeners
	    if ( this.events['remove'] ) {
	        /**
	         * Delete this component.
	         *
	         * @event module:stb/component~Component#remove
	         */
	        this.emit('remove');
	    }
	
	    // remove all listeners
	    this.events = {};
	
	    //debug.log('component ' + this.name + '#' + this.id + ' remove', 'red');
	    debug.info('remove component ' + this.name + '#' + this.id, null, {
	        tags: ['remove', 'component', this.name, this.id]
	    });
	};
	
	
	/**
	 * Activate the component.
	 * Notify the owner-page and apply CSS class.
	 *
	 * @param {Object} [data] custom data which passed into handlers
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/component~Component#focus
	 */
	Component.prototype.focus = function ( data ) {
	    var activePage = app.activePage,
	        activeItem = activePage.activeComponent;
	
	    // this is a visual component on a page
	    // not already focused and can accept focus
	    if ( this.focusable && this !== activeItem ) {
	        // notify the current active component
	        if ( activeItem ) { activeItem.blur(); }
	
	        /* eslint consistent-this: 0 */
	
	        // apply
	        activePage.activeComponent = activeItem = this;
	        activeItem.$node.classList.add('focus');
	
	        //debug.log('component ' + this.name + '#' + this.id + ' focus');
	        debug.info('focus component ' + this.name + '#' + this.id, null, {
	            tags: ['focus', 'component', this.name, this.id]
	        });
	
	        // there are some listeners
	        if ( activeItem.events['focus'] ) {
	            /**
	             * Make this component focused.
	             *
	             * @event module:stb/component~Component#focus
	             */
	            activeItem.emit('focus', data);
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	
	/**
	 * Remove focus.
	 * Change page.activeComponent and notify subscribers.
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/component~Component#blur
	 */
	Component.prototype.blur = function () {
	    var activePage = app.activePage,
	        activeItem = activePage.activeComponent;
	
	    // apply visuals anyway
	    this.$node.classList.remove('focus');
	
	    // this is the active component
	    if ( this === activeItem ) {
	        activePage.activeComponent = null;
	
	        //debug.log('component ' + this.name + '#' + this.id + ' blur', 'grey');
	        debug.info('blur component ' + this.name + '#' + this.id, null, {
	            tags: ['blur', 'component', this.name, this.id]
	        });
	
	        // there are some listeners
	        if ( this.events['blur'] ) {
	            /**
	             * Remove focus from this component.
	             *
	             * @event module:stb/component~Component#blur
	             */
	            this.emit('blur');
	        }
	
	        return true;
	    }
	
	    debug.warn('component ' + this.name + '#' + this.id + ' attempt to blur without link to a page', null, {
	        tags: ['blur', 'component', this.name, this.id]
	    });
	
	    // nothing was done
	    return false;
	};
	
	
	/*function show ( self, data ) {
	    // correct style
	    self.$node.classList.remove('hidden');
	    // flag
	    self.visible = true;
	
	    debug.info('show component ' + self.name + '#' + self.id, null, {
	        tags: ['show', 'component', self.name, self.id]
	    });
	
	    // there are some listeners
	    if ( self.events['show'] ) {
	        /!**
	         * Make the component visible.
	         *
	         * @event module:stb/component~Component#show
	         *!/
	        self.emit('show', data);
	    }
	}*/
	
	/**
	 * Make the component visible and notify subscribers.
	 *
	 * @param {Object} [data] custom data which passed into handlers
	 * @param {function} [callback] user callback
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/component~Component#show
	 */
	Component.prototype.show = function ( data, callback ) {
	    //var self = this;
	
	    // is it hidden
	    if ( !this.visible ) {
	        /*if ( typeof callback === 'function' ) {
	            // async call
	            setTimeout(function () {
	                show(self, data);
	                callback();
	            });
	        } else {
	            // sync call
	            show(this, data);
	        }*/
	
	        // correct style
	        this.$node.classList.remove('hidden');
	        // flag
	        this.visible = true;
	
	        debug.info('show component ' + this.name + '#' + this.id, null, {
	            tags: ['show', 'component', this.name, this.id]
	        });
	
	        // there are some listeners
	        if ( this.events['show'] ) {
	            /**
	             * Make the component visible.
	             *
	             * @event module:stb/component~Component#show
	             */
	            this.emit('show', data);
	        }
	
	        // async call
	        if ( typeof callback === 'function' ) {
	            // async call
	            setTimeout(callback);
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	
	/**
	 * Make the component hidden and notify subscribers.
	 *
	 * @param {function} [callback] user callback
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/component~Component#hide
	 */
	Component.prototype.hide = function ( callback ) {
	    // is it visible
	    if ( this.visible ) {
	        // correct style
	        this.$node.classList.add('hidden');
	        // flag
	        this.visible = false;
	
	        debug.info('hide component ' + this.name + '#' + this.id, null, {
	            tags: ['hide', 'component', this.name, this.id]
	        });
	
	        // there are some listeners
	        if ( this.events['hide'] ) {
	            /**
	             * Make the component hidden.
	             *
	             * @event module:stb/component~Component#hide
	             */
	            this.emit('hide');
	        }
	
	        // async call
	        if ( typeof callback === 'function' ) {
	            // async call
	            setTimeout(callback);
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	
	// public
	module.exports = Component;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-component/index.js"))

/***/ }),
/* 39 */
/*!******************************************!*\
  !*** ./src/js/components/widget.help.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Widget = __webpack_require__(/*! spa-component-widget */ 40),
		hints = new Widget({$node: document.getElementById('widgetHintButtons'), visible: false}),
		buttons = {
			BACK: document.getElementById('hintBack'),
			SEARCH: document.getElementById('hintSearch'),
			MORE: document.getElementById('hintMore'),
			GUIDE: document.getElementById('hintGuide')
		},
		name;
	
	for ( name in buttons ) {
		buttons[name].$icon = buttons[name].appendChild(document.createElement('div'));
		buttons[name].$label = buttons[name].appendChild(document.createElement('div'));
		buttons[name].$label.className = 'hintText';
	}
	
	hints.updateView = function ( data, className ) {
		var prop;
	
		this.show();
		for ( prop in data ) {
			if ( data.hasOwnProperty(prop) ) {
				if ( data[prop].visible ) {
					buttons[prop].$icon.className = 'ico ' + data[prop].icon;
					buttons[prop].style.display = '';
					buttons[prop].$label.innerHTML = data[prop].text;
				} else {
					buttons[prop].style.display = 'none';
				}
			}
		}
		if ( className ) {
			hints.$node.className = 'component widget ' + className;
		} else {
			hints.$node.className = 'component widget';
		}
	};
	
	module.exports = hints;


/***/ }),
/* 40 */
/*!*****************************************!*\
  !*** ./~/spa-component-widget/index.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! spa-component */ 38);
	
	
	/**
	 * Base widget implementation.
	 *
	 * A part-screen top-level layer that can operate as an independent separate entity.
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 * @param {boolean} [config.visible=false] component initial visibility state flag
	 * @param {boolean} [config.focusable=false] component can accept focus or not
	 */
	function Widget ( config ) {
	    // sanitize
	    config = config || {};
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        // init parameters checks
	        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
	            throw new Error(__filename + ': wrong or empty config.className');
	        }
	    }
	
	    // can't accept focus
	    config.focusable = config.focusable || false;
	
	    // hidden
	    config.visible = config.visible || false;
	
	    // set default className if classList property empty or undefined
	    //config.className = 'widget ' + (config.className || '');
	
	    // parent constructor call
	    Component.call(this, config);
	}
	
	
	// inheritance
	Widget.prototype = Object.create(Component.prototype);
	Widget.prototype.constructor = Widget;
	
	// set component name
	Widget.prototype.name = 'spa-component-widget';
	
	
	// public
	module.exports = Widget;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-component-widget/index.js"))

/***/ }),
/* 41 */
/*!*************************************!*\
  !*** ./src/js/components/loader.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Widget = __webpack_require__(/*! spa-component-widget */ 40),
		loader = new Widget({
			$node: document.getElementById('loaderWidget'),
			visible: false
		}),
	
		iterationTimeout = -1,
		currentIndex = 0,
		ready = false,
	
		imgs = [];
	
	(function ( ) {
		var total = 4;
	
		[
			'img/loader/1.png',
			'img/loader/2.png',
			'img/loader/3.png',
			'img/loader/4.png'
		].forEach(function ( item ) {
			var img = new Image();
	
			img.src = item;
			img.onload = function () {
				--total;
				if ( total === 0 ) {
					ready = true;
				}
			};
			imgs.push(img);
		});
	})();
	
	function imageLoop () {
		if ( ready ) {
			loader.$node.style.backgroundImage = 'url(' + imgs[currentIndex].src + ')';
			++currentIndex;
			if ( currentIndex === 4 ) {
				currentIndex = 0;
			}
		}
		iterationTimeout = setTimeout(imageLoop, 200);
	}
	
	
	loader.show = function ( data ) {
		// is it hidden
		if ( !this.visible ) {
			// correct style
			this.$node.classList.remove('hidden');
			// flag
			this.visible = true;
	
			// there are some listeners
			if ( this.events['show'] !== undefined ) {
				/**
				 * Make the component visible.
				 *
				 * @event module:stb/component~Component#show
				 */
				this.emit('show', data);
			}
			iterationTimeout = setTimeout(imageLoop, 200);
	
			return true;
		}
	
		// nothing was done
		return true;
	};
	
	loader.hide = function () {
		currentIndex = 1;
		clearTimeout(iterationTimeout);
		// is it visible
		if ( this.visible ) {
			// correct style
			this.$node.classList.add('hidden');
			// stop iteration
			// flag
			this.visible = false;
	
			// there are some listeners
			if ( this.events['hide'] !== undefined ) {
				/**
				 * Make the component hidden.
				 *
				 * @event module:stb/component~Component#hide
				 */
				this.emit('hide');
			}
	
			return true;
		}
	
		// nothing was done
		return true;
	};
	
	module.exports = loader;


/***/ }),
/* 42 */
/*!******************************************!*\
  !*** ./src/js/modules/api/model/menu.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! mag-app */ 1),
		// api = require('../client'),
		menu = {
			types: {
				CATEGORY_HEADER: 1,
				CATEGORY_ITEM: 2
			},
			content: {
				data: [],
				focusIndex: 1,
				tabs: []
			},
			activeTab: 3
		},
	
		category, playlist, subscription, i, size;
	
	
	//if ( !api.token ) {
	//	menu.content.focusIndex = 2;
	//	menu.content.data.push({
	//		disabled: false,
	//		onclick: function () {
	//			// page login
	//			router.navigate('pl');
	//		},
	//		type: menu.types.CATEGORY_ITEM,
	//		value: gettext('Sign in'),
	//		id: -1,
	//		className: 'icon people'
	//	});
	//}
	
	menu.content.data.push({
		disabled: false,
		onclick: function () {
			// page search
			app.route(app.pages.search);
			// router.navigate('ps');
		},
		type: menu.types.CATEGORY_ITEM,
		value: gettext('Search'),
		id: -2,
		className: 'icon search'
	});
	
	menu.content.data.push({
		disabled: false,
		tabIndex: 3,
		type: menu.types.CATEGORY_ITEM,
		value: gettext('Main'),
		id: -2,
		className: 'icon what-to-watch'
	});
	
	// authorized user
	//if ( api.token ) {
	//	//menu.content.data.push({
	//	//	disabled: false,
	//	//	onclick: function () {
	//	//		menu.content.tabs[menu.activeTab].hide();
	//	//		menu.activeTab = 3;
	//	//		menu.content.tabs[3].activate(require('./subscriptions'));
	//	//	},
	//	//	type: menu.types.CATEGORY_ITEM,
	//	//	value: gettext('My subscriptions'),
	//	//	id: -2,
	//	//	className: 'icon my-subs'
	//	//});
	//	menu.content.data.push({
	//		disabled: false,
	//		onclick: function () {
	//			return require('./channels').getMine().then(function ( channel ) {
	//				router.current.hide();
	//				router.current.show({data: {channel: channel}});
	//			});
	//		},
	//		type: menu.types.CATEGORY_ITEM,
	//		value: gettext('My playlists'),
	//		id: -2,
	//		className: 'icon upload'
	//	});
	//	//menu.content.data.push({
	//	//	disabled: false,
	//	//	onclick: function () {
	//	//		menu.content.data.tabs[menu.activeTab].hide();
	//	//		menu.content.data.tabs[3].activate(this.model);
	//	//	},
	//	//	model: 'asdasd',
	//	//	type: menu.types.CATEGORY_ITEM,
	//	//	value: gettext('History'),
	//	//	id: -2,
	//	//	className: 'icon history'
	//	//});
	//	//menu.content.data.push({
	//	//	disabled: false,
	//	//	onclick: function () {
	//	//		menu.content.data.tabs[menu.activeTab].hide();
	//	//		menu.content.data.tabs[3].activate(this.model);
	//	//	},
	//	//	model: 'asdasd',
	//	//	type: menu.types.CATEGORY_ITEM,
	//	//	value: gettext('See later'),
	//	//	id: -2,
	//	//	className: 'icon watch-later'
	//	//});
	//}
	
	menu.content.data.push({disabled: false, tabIndex: 2, type: menu.types.CATEGORY_ITEM, value: gettext('Settings'), id: -2, className: 'icon player-settings'});
	
	// if ( api.playlists.length ) {
	// 	menu.content.data.push({disabled: true, type: menu.types.CATEGORY_HEADER, value: gettext('Playlists')});
	// 	for ( i = 0, size = api.playlists.length; i < size; ++i ) {
	// 		playlist = api.playlists[i];
	// 		menu.content.data.push({
	// 			disabled: false,
	// 			type: menu.types.CATEGORY_ITEM,
	// 			value: playlist.value,
	// 			playlist: playlist.channel,
	// 			id: playlist.id,
	// 			className: playlist.icon,
	// 			onclick: function () {
	// 				var PlayList = require('./playlist');
	
	// 				new PlayList({
	// 					playlist: {
	// 						id: playlist.id
	// 					}
	// 				}).getPage({}).then(function ( data ) {
	// 					console.log(JSON.stringify(data));
	// 					router.current.hide();
	// 					router.current.show({data: {plalist: channel}});
	// 				});
	// 			}
	// 		});
	
	// 	}
	// }
	
	// if ( api.subscriptions.length ) {
	// 	menu.content.data.push({disabled: true, type: menu.types.CATEGORY_HEADER, value: gettext('Subscriptions')});
	// 	for ( i = 0, size = api.subscriptions.length; i < size; ++i ) {
	// 		subscription = api.subscriptions[i];
	// 		menu.content.data.push({disabled: false, tabIndex: 1, type: menu.types.CATEGORY_ITEM, value: subscription.value, id: subscription.id, title: subscription.title, className: subscription.icon});
	// 	}
	// }
	
	// if ( api.categories.length ) {
	// 	menu.content.data.push({disabled: true, type: menu.types.CATEGORY_HEADER, value: gettext('Categories')});
	// 	for ( i = 0, size = api.categories.length; i < size; ++i ) {
	// 		category = api.categories[i];
	// 		menu.content.data.push({disabled: false, tabIndex: 0, type: menu.types.CATEGORY_ITEM, value: category.value, channel: category.channel, id: category.id, className: category.icon});
	// 	}
	// }
	
	//if ( api.searchQueries.length ) {
	//	menu.content.data.push({disabled: true, type: menu.types.CATEGORY_HEADER, value: gettext('Search results')});
	//	for ( i = 0, size = api.categories.length; i < size; ++i ) {
	//		category = api.categories[i];
	//		menu.content.data.push({disabled: false, tabIndex: 0, type: menu.types.CATEGORY_ITEM, value: category.value, channel: category.channel, id: category.id, className: category.icon});
	//	}
	//}
	
	module.exports = menu;


/***/ }),
/* 43 */
/*!**************************************************!*\
  !*** ./src/js/components/page.main/list.menu.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	
	var keys = __webpack_require__(/*! stb-keys */ 27),
		app  = __webpack_require__(/*! mag-app */ 1),
	
		List = __webpack_require__(/*! mag-component-list */ 44),
	
		menu = __webpack_require__(/*! ../../modules/api/model/menu */ 42),
	
		menuList;
	
	
	menuList = new List({
		$node: window.pmListMainMenu,
		$body: window.pmListMainMenuBody,
		className: 'hidden',
		data: menu.content.data,
		size: app.data.metrics.mainMenuSize,
		focusIndex: menu.content.focusIndex,
		render: function ( $item, data ) {
			if ( !$item.ready ) {
				$item.$icon = document.createElement('span');
				$item.appendChild($item.$icon);
				$item.$label = document.createElement('span');
				$item.appendChild($item.$label);
				$item.ready = true;
			}
	
			if ( data.type === menu.types.CATEGORY_ITEM ) {
				$item.$icon.className = data.className || 'image';
				$item.$icon.style.backgroundImage = data.icon ? 'url(' + data.icon + ')' : 'none';
				$item.$label.className = 'itemLabel';
				$item.$label.innerHTML = data.value;
			} else if ( data.type === menu.types.CATEGORY_HEADER ) {
				$item.$icon.className = '';
				$item.$label.className = 'categorylabel';
				$item.$label.innerHTML = data.value;
			}
		},
		visible: false,
		events: {
			keydown: function ( event ) {
				switch ( event.code ) {
					case keys.back:
					case keys.right:
					case keys.info:
						this.hide();
						menu.content.tabs[menu.activeTab].activate();
						event.stop = true;
						break;
					case keys.up:
					case keys.down:
					case keys.pageUp:
					case keys.pageDown:
					case keys.home:
					case keys.end:
						// cursor move only on arrow keys
						this.move(event.code);
						break;
					case keys.ok:
						// notify listeners
						this.emit('click:item', {$item: this.$focusItem, event: event});
						break;
				}
			},
			'click:item': function ( event ) {
				this.hide();
				if ( typeof event.$item.data.onclick === 'function' ) {
					menu.content.tabs[menu.activeTab].activate(event.$item.data);
					event.$item.data.onclick();
				} else {
					menu.content.tabs[menu.activeTab].hide();
					menu.activeTab = event.$item.data.tabIndex;
					menu.content.tabs[menu.activeTab].activate(event.$item.data);
				}
			},
			focus: function () {
				this.show();
			}
			// ,
			// blur: function () {
			// 	this.hide();
			// 	menu.content.tabs[menu.activeTab].activate();
			// 	lastFocusedComponent.focus();
			// }
		}
	});
	
	
	/**
	 * Move focus to the given direction.
	 *
	 * @param {number} direction arrow key code
	 *
	 * @fires module:stb/ui/list~List#cycle
	 * @fires module:stb/ui/list~List#overflow
	 */
	menuList.move = function ( direction ) {
		var $focusTarget = null,
			viewIndex = null;
	
		if ( false ) {
			if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
			if ( Number(direction) !== direction ) { throw 'direction must be a number'; }
		}
	
		if ( direction === keys.up ) {
			// still can go backward
			if ( this.$focusItem && this.$focusItem.index > 0 ) {
				if ( this.$focusItem === this.$body.firstChild ) {
					viewIndex = this.viewIndex - 1;
				} else {
					$focusTarget = this.$focusItem.previousSibling;
				}
			}
		}
	
		if ( direction === keys.down ) {
			// still can go forward
			if ( this.$focusItem && this.$focusItem.index < this.data.length - 1 ) {
				if ( this.$focusItem === this.$body.lastChild ) {
					viewIndex = this.viewIndex + 1;
				} else {
					$focusTarget = this.$focusItem.nextSibling;
				}
			}
		}
	
		if ( direction === keys.pageUp ) {
			// determine jump size
			if ( this.viewIndex < this.size ) {
				// first page
				viewIndex = 0;
			} else {
				// second page and further
				viewIndex = this.viewIndex - this.size + 1;
			}
	
			$focusTarget = this.$body.firstChild;
		}
	
		if ( direction === keys.pageDown ) {
			// data is bigger then one page
			if ( this.data.length > this.size ) {
				// determine jump size
				if ( this.viewIndex > this.data.length - this.size * 2 ) {
					// last page
					viewIndex = this.data.length - this.size;
				} else {
					// before the last page
					viewIndex = this.viewIndex + this.size - 1;
				}
				$focusTarget = this.$body.lastChild;
			} else {
				// not the last item on the page
				$focusTarget = this.$body.children[this.data.length - 1];
			}
		}
	
		if ( direction === keys.home ) {
			viewIndex = 0;
			$focusTarget = this.$body.firstChild;
		}
	
		if ( direction === keys.end ) {
			// data is bigger then one page
			if ( this.data.length > this.size ) {
				viewIndex = this.data.length - this.size;
				$focusTarget = this.$body.lastChild;
			} else {
				// not the last item on the page
				$focusTarget = this.$body.children[this.data.length - 1];
			}
		}
	
		if ( viewIndex !== null ) {
			this.renderView(viewIndex);
		}
	
		if ( $focusTarget !== null ) {
			this.focusItem($focusTarget);
		}
		if ( this.$focusItem.data.disabled ) {
			if ( this.$focusItem.index > 0 ) {
				this.move(direction);
			} else if ( direction === keys.up ) {
				this.move(keys.down);
			}
		}
	};
	
	module.exports = menuList;


/***/ }),
/* 44 */
/*!***************************************!*\
  !*** ./~/mag-component-list/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	/* eslint complexity: [error, 37] */
	/* eslint max-lines-per-function: 1 */
	/* eslint no-fallthrough: 1 */
	/* eslint complexity: 1 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! stb-component */ 45),
	    keys      = __webpack_require__(/*! stb-keys */ 27);
	
	
	/**
	 * Mouse click event.
	 *
	 * @event module:stb/ui/list~List#click:item
	 *
	 * @type {Object}
	 * @property {Element} $item clicked HTML item
	 * @property {Event} event click event data
	 */
	
	
	/**
	 * Base list implementation.
	 *
	 * Each data item can be either a primitive value or an object with these fields:
	 *
	 *  Name    | Description
	 * ---------|-------------
	 *  value   | actual cell value to render
	 *  mark    | is it necessary or not to render this cell as marked
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object}   [config={}]          init parameters (all inherited from the parent)
	 * @param {Array}    [config.data=[]]     component data to visualize
	 * @param {function} [config.render]      method to build each grid cell content
	 * @param {function} [config.navigate]    method to move focus according to pressed keys
	 * @param {number}   [config.size=5]      amount of visible items on a page
	 * @param {number}   [config.viewIndex=0] move view window to this position on init
	 * @param {number}   [config.focusIndex]  list item index to make item focused (move view window to this position)
	 * @param {boolean}  [config.cycle=true]  allow or not to jump to the opposite side of a list when there is nowhere to go next
	 * @param {boolean}  [config.scroll=null] associated ScrollBar component link
	 * @param {Object}   [config.provider]    data provider
	 *
	 * @fires module:stb/ui/list~List#click:item
	 */
	function List ( config ) {
	    // current execution context
	    //var self = this;
	
	    // sanitize
	    config = config || {};
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        if ( config.type && Number(config.type) !== config.type ) {
	            throw new Error(__filename + ': config.type must be a number');
	        }
	    }
	
	    /**
	     * Link to the currently focused DOM element.
	     *
	     * @type {Element}
	     */
	    this.$focusItem = null;
	
	    /**
	     * Position of the visible window to render.
	     *
	     * @type {number}
	     */
	    this.viewIndex = null;
	
	    /**
	     * Component data to visualize.
	     *
	     * @type {Array}
	     */
	    this.data = [];
	
	    /**
	     * Component orientation.
	     *
	     * @type {number}
	     */
	    this.type = this.TYPE_VERTICAL;
	
	    /**
	     * Amount of visible items on a page.
	     *
	     * @type {number}
	     */
	    this.size = 5;
	
	    /**
	     * Allow or not to jump to the opposite side of a list when there is nowhere to go next.
	     *
	     * @type {boolean}
	     */
	    this.cycle = false;
	
	    /**
	     * Associated ScrollBar component link.
	     *
	     * @type {ScrollBar}
	     */
	    this.scroll = null;
	
	    // horizontal or vertical
	    if ( config.type ) {
	        // apply
	        this.type = config.type;
	    }
	
	    /**
	     * Associated data provider
	     *
	     * @type {Provider}
	     */
	    this.provider = null;
	
	    if ( this.type === this.TYPE_HORIZONTAL ) {
	        config.className += ' horizontal';
	    }
	
	    //config.className += ' theme-main';
	
	    // parent constructor call
	    Component.call(this, config);
	
	    // component setup
	    this.init(config);
	
	    // custom navigation method
	    //if ( config.navigate ) {
	    //    if ( DEVELOP ) {
	    //        if ( typeof config.navigate !== 'function' ) { throw new Error(__filename + ': wrong config.navigate type'); }
	    //    }
	    //    // apply
	    //    this.navigate = config.navigate;
	    //}
	
	    // navigation by keyboard
	    //this.addListener('keydown', this.navigate);
	
	    // navigation by mouse
	    //this.$body.addEventListener('mousewheel', function ( event ) {
	    //    // scrolling by Y axis
	    //    if ( self.type === self.TYPE_VERTICAL && event.wheelDeltaY ) {
	    //        self.move(event.wheelDeltaY > 0 ? 38 : keys.down);
	    //    }
	    //
	    //    // scrolling by X axis
	    //    if ( self.type === self.TYPE_HORIZONTAL && event.wheelDeltaX ) {
	    //        self.move(event.wheelDeltaX > 0 ? 37 : 39);
	    //    }
	    //});
	}
	
	
	// inheritance
	List.prototype = Object.create(Component.prototype);
	List.prototype.constructor = List;
	
	// set component name
	List.prototype.name = 'mag-component-list';
	
	List.prototype.TYPE_VERTICAL   = 1;
	List.prototype.TYPE_HORIZONTAL = 2;
	
	
	/**
	 * Fill the given item with data.
	 *
	 * @param {Element} $item item DOM link
	 * @param {*} data associated with this item data
	 */
	List.prototype.renderItemDefault = function ( $item, data ) {
	    $item.innerText = data.value;
	};
	
	
	/**
	 * Method to build each list item content.
	 * Can be redefined to provide custom rendering.
	 *
	 * @type {function}
	 */
	List.prototype.renderItem = List.prototype.renderItemDefault;
	
	
	/**
	 * List of all default event callbacks.
	 *
	 * @type {Object.<string, function>}
	 */
	List.prototype.defaultEvents = {
	    /**
	     * Default method to handle mouse wheel events.
	     *
	     * @param {Event} event generated event
	     */
	    mousewheel: function ( event ) {
	        // scrolling by Y axis
	        if ( this.type === this.TYPE_VERTICAL && event.wheelDeltaY ) {
	            this.move(event.wheelDeltaY > 0 ? keys.up : keys.down);
	        }
	
	        // scrolling by X axis
	        if ( this.type === this.TYPE_HORIZONTAL && event.wheelDeltaX ) {
	            this.move(event.wheelDeltaX > 0 ? keys.left : keys.right);
	        }
	    },
	
	    /**
	     * Default method to handle keyboard keydown events.
	     *
	     * @param {Object} event generated event
	     */
	    keydown: function ( event ) {
	        switch ( event.code ) {
	            case keys.up:
	            case keys.down:
	            case keys.right:
	            case keys.left:
	            case keys.pageUp:
	            case keys.pageDown:
	            case keys.home:
	            case keys.end:
	                // cursor move only on arrow keys
	                this.move(event.code);
	                break;
	            case keys.enter:
	                // there are some listeners
	                if ( this.events['click:item'] && this.$focusItem ) {
	                    // notify listeners
	                    this.emit('click:item', {$item: this.$focusItem, event: event});
	                }
	                break;
	        }
	    }
	};
	
	
	/**
	 * Default method to move focus according to pressed keys.
	 *
	 * @param {Object} event generated event source of movement
	 */
	//List.prototype.navigateDefault = function ( event ) {
	//    switch ( event.code ) {
	//        case 38:
	//        case 40:
	//        case 39:
	//        case 37:
	//        case 33:
	//        case 34:
	//        case 36:
	//        case 35:
	//            // cursor move only on arrow keys
	//            this.move(event.code);
	//            break;
	//        case 13:
	//            // there are some listeners
	//            if ( this.events['click:item'] ) {
	//                // notify listeners
	//                this.emit('click:item', {$item: this.$focusItem, event: event});
	//            }
	//            break;
	//    }
	//};
	
	
	/**
	 * Current active method to move focus according to pressed keys.
	 * Can be redefined to provide custom navigation.
	 *
	 * @type {function}
	 */
	//List.prototype.navigate = List.prototype.navigateDefault;
	
	
	/**
	 * Make all the data items identical.
	 * Wrap to objects if necessary.
	 *
	 * @param {Array} data incoming array
	 * @return {Array} reworked incoming data
	 */
	function normalize ( data ) {
	    var idx, item;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !Array.isArray(data) ) {
	            throw new Error(__filename + ': wrong data type');
	        }
	    }
	
	    // rows
	    for ( idx = 0; idx < data.length; idx++ ) {
	        // cell value
	        item = data[idx];
	        // primitive value
	        if ( typeof item !== 'object' ) {
	            // wrap with defaults
	            item = data[idx] = {
	                value: data[idx]
	            };
	        }
	
	        if ( true ) {
	            //if ( !('value' in item) ) { throw new Error(__filename + ': field "value" is missing'); }
	            if ( ('mark' in item) && Boolean(item.mark) !== item.mark ) {
	                throw new Error(__filename + ': item.mark must be boolean');
	            }
	        }
	    }
	
	    return data;
	}
	
	
	/**
	 * Init or re-init of the component inner structures and HTML.
	 *
	 * @param {Object} config init parameters (subset of constructor config params)
	 */
	List.prototype.init = function ( config ) {
	    var self     = this,
	        currSize = this.$body.children.length,
	        /**
	         * Item mouse click handler.
	         *
	         * @param {Event} event click event data
	         *
	         * @this Element
	         *
	         * @fires module:stb/ui/list~List#click:item
	         */
	        onClick = function ( event ) {
	            if ( this.data ) {
	                self.focusItem(this);
	
	                // there are some listeners
	                if ( self.events['click:item'] ) {
	                    // notify listeners
	                    self.emit('click:item', {$item: this, event: event});
	                }
	            }
	        },
	        item, idx;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	    }
	
	    // apply cycle behaviour
	    if ( config.cycle !== undefined ) { this.cycle = config.cycle; }
	
	    // apply ScrollBar link
	    if ( config.scroll ) { this.scroll = config.scroll; }
	
	    // apply data provider
	    if ( config.provider ) { this.provider = config.provider; }
	
	
	    // custom render method
	    if ( config.render ) {
	        if ( true ) {
	            if ( typeof config.render !== 'function' ) {
	                throw new Error(__filename + ': wrong config.render type');
	            }
	        }
	
	        // apply
	        this.renderItem = config.render;
	    }
	
	    // list items amount on page
	    if ( config.size ) {
	        if ( true ) {
	            if ( Number(config.size) !== config.size ) {
	                throw new Error(__filename + ': config.size must be a number');
	            }
	            if ( config.size <= 0 ) {
	                throw new Error(__filename + ': config.size should be positive');
	            }
	        }
	
	        // apply
	        this.size = config.size;
	    }
	
	    if ( config.events ) {
	        // apply all given events
	        Object.keys(config.events).forEach(function ( name ) {
	            self.events[name] = null;
	            self.addListener(name, config.events[name]);
	        });
	    }
	
	    // geometry has changed or initial draw
	    if ( this.size !== currSize ) {
	        // non-empty list
	        if ( currSize > 0 ) {
	            // clear old items
	            this.$body.innerText = null;
	        }
	
	        // create new items
	        for ( idx = 0; idx < this.size; idx++ ) {
	            item = document.createElement('div');
	            item.index = idx;
	            //item.className = 'item theme-list-item';
	            item.className = 'item';
	
	            item.addEventListener('click', onClick);
	            this.$body.appendChild(item);
	        }
	    }
	
	    if ( this.provider ) {
	        if ( this.provider.blocked ) {
	            return;
	        }
	
	        this.provider.get( null, function ( error, data ) {
	            if ( error ) {
	                if ( self.events['data:error'] ) {
	                    /**
	                     * Provider get error while take new data
	                     *
	                     * @event module:stb/ui/list~List#data:error
	                     */
	                    self.emit('data:error', error);
	                }
	            } else {
	                if ( data ) {
	                    config.data = data;
	                    self.setData(config);
	                    if ( self.scroll ) {
	                        self.scroll.init({
	                            realSize: self.provider.maxCount,
	                            viewSize: self.provider.size,
	                            value: self.provider.head + self.provider.pos
	                        });
	                    }
	                }
	                if ( self.events['data:get'] ) {
	                    /**
	                     * Provider request new data
	                     *
	                     * @event module:stb/ui/list~List#data:get
	                     *
	                     * @type {Object}
	                     */
	                    self.emit('data:get');
	                }
	            }
	        });
	    } else if ( config.data ) {
	        this.setData(config);
	    }
	};
	
	/**
	 * Set data and render inner structures and HTML.
	 *
	 * @param {Object} config init parameters (subset of constructor config params)
	 */
	List.prototype.setData = function ( config ) {
	    // apply list of items
	
	    if ( config.data ) {
	        if ( true ) {
	            if ( !Array.isArray(config.data) ) { throw new Error(__filename + ': wrong config.data type'); }
	        }
	        // prepare user data
	        this.data = normalize(config.data);
	    }
	
	    // view window position
	    if ( true ) {
	        if ( config.viewIndex !== undefined ) {
	            if ( Number(config.viewIndex) !== config.viewIndex ) {
	                throw new Error(__filename + ': config.viewIndex must be a number');
	            }
	            if ( config.viewIndex < 0 ) {
	                throw new Error(__filename + ': config.viewIndex should be positive');
	            }
	        }
	    }
	
	    // reset current view window position
	    this.viewIndex = null;
	
	    if ( this.$focusItem ) {
	        this.blurItem(this.$focusItem);
	    }
	
	    if ( this.scroll ) {
	        if ( this.provider ) {
	            if ( this.scroll.realSize !== this.provider.maxCount ) {
	                this.scroll.init({
	                    realSize: this.provider.maxCount,
	                    viewSize: this.provider.size,
	                    value: this.provider.head + this.provider.pos
	                });
	            }
	        } else {
	            this.scroll.init({
	                realSize: this.data.length,
	                viewSize: this.size,
	                value: config.viewIndex || 0
	            });
	        }
	    }
	
	    // set focus item
	    if ( config.focusIndex !== undefined && this.data.length ) {
	        if ( true ) {
	            if ( Number(config.focusIndex) !== config.focusIndex ) {
	                throw new Error(__filename + ': config.focusIndex must be a number');
	            }
	            if ( config.focusIndex < 0 ) {
	                throw new Error(__filename + ': config.focusIndex should be positive');
	            }
	            // if ( config.focusIndex > this.data.length - 1 ) {
	            //     throw new Error(__filename + ': config.focusIndex should be less than data size');
	            // }
	        }
	
	        // jump to the necessary item
	        this.focusIndex(config.focusIndex);
	    } else {
	        // go to the first page
	        this.renderView(config.viewIndex || 0);
	    }
	};
	
	
	/**
	 * Shift the visible view window event.
	 *
	 * @event module:stb/ui/list~List#move:view
	 *
	 * @type {Object}
	 * @property {number} prevIndex previous view window position
	 * @property {number} currIndex current view window position
	 */
	
	
	/**
	 * Draw the visible window.
	 *
	 * @param {number} index start position to render
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/ui/list~List#move:view
	 */
	List.prototype.renderView = function ( index ) {
	    var $item, idx, itemData, prevIndex, currIndex;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( Number(index) !== index ) {
	            throw new Error(__filename + ': index must be a number');
	        }
	        if ( index < 0 ) {
	            throw new Error(__filename + ': index should be more than zero');
	        }
	        // if ( index >= this.data.length ) {
	        //     throw new Error(__filename + ': index should be less than data size');
	        // }
	    }
	
	    // has the view window position changed
	    if ( this.viewIndex !== index ) {
	        // save for emit
	        prevIndex = this.viewIndex;
	        // sync global pointer
	        this.viewIndex = currIndex = index;
	
	        // rebuild all visible items
	        for ( idx = 0; idx < this.size; idx++ ) {
	            // shortcuts
	            $item    = this.$body.children[idx];
	            itemData = this.data[index];
	
	            // real item or stub
	            if ( itemData ) {
	                // correct inner data/index and render
	                $item.data  = itemData;
	                $item.index = index;
	                this.renderItem($item, itemData);
	
	                // apply CSS
	                if ( itemData.mark ) {
	                    $item.classList.add('mark');
	                } else {
	                    $item.classList.remove('mark');
	                }
	            } else {
	                // nothing to render
	                $item.data = $item.index = undefined;
	                $item.innerHTML = '&nbsp;';
	                $item.ready = false;
	            }
	            index++;
	        }
	
	        // there are some listeners
	        if ( this.events['move:view'] ) {
	            // notify listeners
	            this.emit('move:view', {prevIndex: prevIndex, currIndex: currIndex});
	        }
	
	        // there are some listeners
	        if ( this.events['select:item'] ) {
	            this.emit('select:item', {$item: $item});
	        }
	
	        // update a linked scroll component
	        if ( this.scroll ) {
	            this.scroll.scrollTo(this.provider ? this.provider.head + this.provider.pos : this.viewIndex);
	        }
	
	        // full rebuild
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	
	/**
	 * Move focus to the given direction.
	 *
	 * @param {number} direction arrow key code
	 *
	 * @fires module:stb/ui/list~List#cycle
	 * @fires module:stb/ui/list~List#overflow
	 */
	List.prototype.move = function ( direction ) {
	    var self = this,
	        force = false;
	
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( Number(direction) !== direction ) {
	            throw new Error(__filename + ': direction must be a number');
	        }
	    }
	
	    // empty list
	    if ( !this.data.length ) {
	        return;
	    }
	
	    switch ( direction ) {
	        case keys.left:
	            if ( this.type === this.TYPE_HORIZONTAL ) {
	                force = true;
	            } else {
	                break;
	            }
	        case keys.up:
	            if ( force || this.type === this.TYPE_VERTICAL ) {
	                if ( this.$focusItem && this.$focusItem.index > 0 ) {
	                    if ( this.$focusItem === this.$body.firstChild ) {
	                        this.renderView(this.viewIndex - 1);
	                    } else {
	                        this.focusItem(this.$focusItem.previousSibling);
	                    }
	                } else if ( this.provider ) {
	                    if ( this.provider.blocked ) {
	                        return;
	                    }
	
	                    this.provider.get(direction, function ( error, data, pos ) {
	                        if ( error ) {
	                            if ( self.events['data:error'] ) {
	                                /**
	                                     * Provider get error while take new data
	                                     *
	                                     * @event module:stb/ui/list~List#data:error
	                                     */
	                                self.emit('data:error', error);
	                            }
	                        } else if ( data ) {
	                            self.setData({data: data, focusIndex: pos || pos === 0 ? pos : self.$focusItem.index});
	                        }
	                    });
	                } else {
	                    // already at the beginning
	                    if ( this.cycle ) {
	                        // jump to the end of the list
	                        this.move(keys.end);
	                    }
	                    if ( this.events['overflow'] ) {
	                        // notify listeners
	                        this.emit('overflow', {direction: direction, cycle: this.cycle});
	                    }
	                }
	            }
	            break;
	        case keys.right:
	            if ( this.type === this.TYPE_HORIZONTAL ) {
	                force = true;
	            } else {
	                break;
	            }
	        case keys.down:
	            if ( force || this.type === this.TYPE_VERTICAL ) {
	                if ( this.$focusItem && this.$focusItem.index < this.data.length - 1 ) {
	                    if ( this.$focusItem === this.$body.lastChild ) {
	                        this.renderView(this.viewIndex + 1);
	                    } else {
	                        this.focusItem(this.$focusItem.nextSibling);
	                    }
	                } else if ( this.provider ) {
	                    if ( this.provider.blocked ) {
	                        return;
	                    }
	
	                    this.provider.get(direction, function ( error, data, pos ) {
	                        if ( error ) {
	                            if ( self.events['data:error'] ) {
	                                /**
	                                     * Provider get error while take new data
	                                     *
	                                     * @event module:stb/ui/list~List#data:error
	                                     */
	                                self.emit('data:error', error);
	                            }
	                        } else if ( data ) {
	                            self.setData({data: data, focusIndex: pos || pos === 0 ? pos : self.$focusItem.index});
	                        }
	                    });
	                } else {
	                    // already at the beginning
	                    if ( this.cycle ) {
	                        // jump to the beginning of the list
	                        this.move(keys.home);
	                    }
	                    if ( this.events['overflow'] ) {
	                        // notify listeners
	                        this.emit('overflow', {direction: direction, cycle: this.cycle});
	                    }
	                }
	            }
	            break;
	        case keys.pageUp:
	            if ( this.provider ) {
	                if ( this.provider.blocked ) {
	                    return;
	                }
	
	                this.provider.get(direction, function ( error, data, pos ) {
	                    if ( error ) {
	                        if ( self.events['data:error'] ) {
	                            /**
	                             * Provider get error while take new data
	                             *
	                             * @event module:stb/ui/list~List#data:error
	                             */
	                            self.emit('data:error', error);
	                        }
	                    } else if ( data ) {
	                        self.setData({data: data, focusIndex: pos ? pos : 0});
	                    }
	                });
	
	                return;
	            }
	            if ( this.viewIndex < this.size ) {
	                // first page
	                this.renderView(0);
	            } else {
	                // second page and further
	                this.renderView(this.viewIndex - this.size + 1);
	            }
	
	            this.focusItem(this.$body.firstChild);
	            break;
	        case keys.pageDown:
	            if ( this.provider ) {
	                if ( this.provider.blocked ) {
	                    return;
	                }
	
	                this.provider.get(direction, function ( error, data, pos ) {
	                    var focusIndex;
	
	                    if ( error ) {
	                        if ( self.events['data:error'] ) {
	                            /**
	                             * Provider get error while take new data
	                             *
	                             * @event module:stb/ui/list~List#data:error
	                             */
	                            self.emit('data:error', error);
	                        }
	                    } else if ( data ) {
	                        if ( pos || pos === 0 ) {
	                            focusIndex = pos;
	                        } else {
	                            focusIndex = data.length < self.size ?  data.length - 1 : self.size - 1;
	                        }
	
	                        self.setData({data: data, focusIndex: focusIndex});
	                    }
	                });
	                break;
	            }
	            // data is bigger then one page
	            if ( this.data.length > this.size ) {
	                // determine jump size
	                if ( this.viewIndex > this.data.length - this.size * 2 ) {
	                    // last page
	                    this.renderView(this.data.length - this.size);
	                } else {
	                    // before the last page
	                    this.renderView(this.viewIndex + this.size - 1);
	                }
	                this.focusItem(this.$body.lastChild);
	            } else {
	                // not the last item on the page
	                this.focusItem(this.$body.children[this.data.length - 1]);
	            }
	            break;
	        case keys.home:
	            if ( this.provider ) {
	                if ( this.provider.blocked ) {
	                    return;
	                }
	
	                this.provider.get(direction, function ( error, data, pos ) {
	                    if ( error ) {
	                        if ( self.events['data:error'] ) {
	                            /**
	                             * Provider get error while take new data
	                             *
	                             * @event module:stb/ui/list~List#data:error
	                             */
	                            self.emit('data:error', error);
	                        }
	                    } else if ( data ) {
	                        self.setData({data: data, focusIndex: pos ? pos : 0});
	                    }
	                });
	                break;
	            }
	            this.renderView(0);
	            this.focusItem(this.$body.firstChild);
	            break;
	        case keys.end:
	            if ( this.provider ) {
	                if ( this.provider.blocked ) {
	                    return;
	                }
	
	                this.provider.get(direction, function ( error, data, pos ) {
	                    var focusIndex;
	
	                    if ( error ) {
	                        if ( self.events['data:error'] ) {
	                            /**
	                             * Provider get error while take new data
	                             *
	                             * @event module:stb/ui/list~List#data:error
	                             */
	                            self.emit('data:error', error);
	                        }
	                    } else if ( data ) {
	                        if ( pos || pos === 0 ) {
	                            focusIndex = pos;
	                        } else {
	                            focusIndex = data.length < self.size ?  data.length - 1 : self.size - 1;
	                        }
	
	                        self.setData({data: data, focusIndex: focusIndex});
	                    }
	                });
	                break;
	            }
	            if ( this.data.length > this.size ) {
	                this.renderView(this.data.length - this.size);
	                this.focusItem(this.$body.lastChild);
	            } else {
	                // not the last item on the page
	                this.focusItem(this.$body.children[this.data.length - 1]);
	            }
	            break;
	    }
	};
	
	
	/**
	 * Highlight the given DOM element as focused.
	 * Remove focus from the previously focused item and generate associated event.
	 *
	 * @param {Node|Element} $item element to focus
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/ui/list~List#focus:item
	 * @fires module:stb/ui/list~List#blur:item
	 */
	List.prototype.focusItem = function ( $item ) {
	    var $prev = this.$focusItem;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	    }
	
	    // different element
	    if ( $item && $prev !== $item ) {
	        if ( true ) {
	            if ( !($item instanceof Element) ) {
	                throw new Error(__filename + ': wrong $item type');
	            }
	            if ( $item.parentNode !== this.$body ) {
	                throw new Error(__filename + ': wrong $item parent element');
	            }
	        }
	
	        // some item is focused already
	        if ( $prev !== null ) {
	            if ( true ) {
	                if ( !($prev instanceof Element) ) {
	                    throw new Error(__filename + ': wrong $prev type');
	                }
	            }
	
	            // style
	            $prev.classList.remove('focus');
	            //$prev.classList.remove('theme-focus');
	
	            // there are some listeners
	            if ( this.events['blur:item'] ) {
	                /**
	                 * Remove focus from an element.
	                 *
	                 * @event module:stb/ui/list~List#blur:item
	                 *
	                 * @type {Object}
	                 * @property {Element} $item previously focused HTML element
	                 */
	                this.emit('blur:item', {$item: $prev});
	            }
	        }
	        // reassign
	        this.$focusItem = $item;
	
	        this.$focusItem.data = this.data[this.$focusItem.index];
	
	        // correct CSS
	        $item.classList.add('focus');
	        //$item.classList.add('theme-focus');
	
	        // there are some listeners
	        if ( this.events['focus:item'] ) {
	            /**
	             * Set focus to a DOM element.
	             *
	             * @event module:stb/ui/list~List#focus:item
	             *
	             * @type {Object}
	             * @property {Element} $prev old/previous focused HTML element
	             * @property {Element} $curr new/current focused HTML element
	             */
	            this.emit('focus:item', {$prev: $prev, $curr: $item});
	        }
	
	        // there are some listeners
	        if ( this.events['select:item'] ) {
	            /**
	             * Set focus to a list item.
	             *
	             * @event module:stb/ui/list~List#select:item
	             *
	             * @type {Object}
	             * @property {Element} $item new/current focused item
	             */
	            this.emit('select:item', {$item: $item});
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	/**
	 * Highlight the given DOM element as blur.
	 * Remove focus from the item and generate associated event.
	 *
	 * @param {Node|Element} $item element to focus
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/ui/list~List#focus:item
	 * @fires module:stb/ui/list~List#blur:item
	 */
	List.prototype.blurItem = function ( $item ) {
	    if ( true ) {
	        if ( arguments.length !== 1 ) { throw new Error(__filename + ': wrong arguments number'); }
	    }
	
	    // different element
	    if ( $item ) {
	        if ( $item === this.$focusItem ) {
	            this.$focusItem = null;
	        }
	
	        $item.classList.remove('focus');
	        //$item.classList.remove('theme-focus');
	
	        // there are some listeners
	        if ( this.events['blur:item'] ) {
	            /**
	             * Remove focus from an element.
	             *
	             * @event module:stb/ui/list~List#blur:item
	             *
	             * @type {Object}
	             * @property {Element} $item previously focused HTML element
	             */
	            this.emit('blur:item', {$item: $item});
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	/**
	 * Set the given item focused by item index.
	 *
	 * @param {number} index item data index
	 */
	List.prototype.focusIndex = function ( index ) {
	    var viewIndex = this.viewIndex || 0;
	
	    if ( true ) {
	        if ( Number(index) !== index ) {
	            throw new Error(__filename + ': index must be a number');
	        }
	        if ( index < 0 ) {
	            throw new Error(__filename + ': index should be positive');
	        }
	        // if ( index > this.data.length - 1 ) {
	        //     throw new Error(__filename + ': index should be less than data size');
	        // }
	    }
	
	    // determine direction
	    if ( index >= viewIndex + this.size ) {
	        // check range
	        index = index < this.data.length - 1 ? index : this.data.length - 1;
	        // move down
	        this.renderView(index - this.size + 1);
	        this.focusItem(this.$body.lastChild);
	    } else if ( index < viewIndex ) {
	        // check range
	        index = index > 0 ? index : 0;
	        // move up
	        this.renderView(index);
	        this.focusItem(this.$body.firstChild);
	    } else {
	        // no move
	        if ( this.viewIndex === null ) {
	            // first attempt
	            this.renderView(0);
	        }
	        this.focusItem(this.$body.children[index - viewIndex]);
	    }
	};
	
	
	/**
	 * Set item state and appearance as marked.
	 *
	 * @param {Node|Element} $item element to focus
	 * @param {boolean} state true - marked, false - not marked
	 */
	List.prototype.markItem = function ( $item, state ) {
	    if ( true ) {
	        if ( arguments.length !== 2 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !($item instanceof Element) ) {
	            throw new Error(__filename + ': wrong $item type');
	        }
	        if ( $item.parentNode !== this.$body ) {
	            throw new Error(__filename + ': wrong $item parent element');
	        }
	        if ( Boolean(state) !== state ) {
	            throw new Error(__filename + ': state must be boolean');
	        }
	    }
	
	    // correct CSS
	    if ( state ) {
	        $item.classList.add('mark');
	    } else {
	        $item.classList.remove('mark');
	    }
	
	    // apply flag
	    $item.data.mark = state;
	};
	
	
	// public
	module.exports = List;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/mag-component-list/index.js"))

/***/ }),
/* 45 */
/*!**********************************!*\
  !*** ./~/stb-component/index.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	// public
	module.exports = __webpack_require__(/*! spa-component */ 38);


/***/ }),
/* 46 */
/*!**************************************************************!*\
  !*** ./src/js/components/page.main/tabs/category.content.js ***!
  \**************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys   	= __webpack_require__(/*! stb-keys */ 27),
		app		= __webpack_require__(/*! mag-app */ 1),
	
		Panel 	= __webpack_require__(/*! stb-component-panel */ 47),
		List  	= __webpack_require__(/*! mag-component-list */ 44),
		Input 	= __webpack_require__(/*! ../../../modules/ui/input */ 49),
	
		player 	= __webpack_require__(/*! ../../../modules/player */ 50),
	
		ListMovies  = __webpack_require__(/*! ./../../list.videos.js */ 51),
	
		SearchModel  = __webpack_require__(/*! ../../../modules/api/model/search */ 52),
		channelsModel = __webpack_require__(/*! ../../../modules/api/model/channels */ 60),
	
		listMenu = __webpack_require__(/*! ../list.menu */ 43),
	
		lists = [],
	
		$page = document.getElementById('pm'),
	
		activeList = 0,
	
		panel = new Panel({
			$node: document.getElementById('pmTabCategoryContent'),
			className: 'tab hidden',
			visible: false,
			events: {
				focus: function () {
					lists[activeList].focus();
				},
				show: function () {
					$page.style.backgroundImage = '';
				}
			}
		}),
	
		inputSearch = new Input({
			$node: document.getElementById('pmCategorySearch'),
			$body: document.getElementById('pmCategorySearchBody'),
			className: 'component input tabInputSearch',
			events: {
				focus : function () {
					this.setValue('');
					app.route(app.pages.search);
				}
			}
		}),
	
		loader = __webpack_require__(/*! ../../loader */ 41),
	
		bottomListTopValue = 0,
		topListTopValue    = 0,
	
		topList = 0,
		bottomList = 1,
	
		topPageNumber = 0,
		bottomPageNumber = 1,
	
		loadTimeout = -1,
		blockMove = true;
	
	function moveLists ( sourceListNumber, isGoingUp ) {
		var targetList = sourceListNumber ^ 1;
	
		//debug.log(blockMove, 'blockMove');
		if ( blockMove ) {
			if ( false ) {
				if ( isGoingUp ) {
					//debug.log(topPageNumber - 1, 'topPageNumber');
				} else {
					//debug.log(bottomPageNumber - 1, 'bottomPageNumber');
				}
			}
			return;
		}
		if ( isGoingUp ) {
			////debug.log('TRY TO LOAD UP PAGE ' + (topPageNumber - 1));
			blockMove = true;
			channelsModel.getPage({page: (topPageNumber - 1), count: 1}).then(function ( response ) {
				--topPageNumber;
				--bottomPageNumber;
	
				lists[targetList].model.init({channel: response[0]});
				topList = targetList;
				bottomList = sourceListNumber;
				activeList = targetList;
			}, function ( error ) {
				//debug.log(error);
			});
		} else {
			//debug.log('TRY TO LOAD DOWN PAGE ' + (bottomPageNumber + 1));
			if ( lists[bottomList].data.length === 0 ) {
				lists[sourceListNumber].emit('view:ready');
				return;
			}
			blockMove = true;
			channelsModel.getPage({page: (bottomPageNumber + 1), count: 1}).then(function ( response ) {
				++topPageNumber;
				++bottomPageNumber;
	
				lists[sourceListNumber].model.init({channel: response[0]});
				topList = targetList;
				bottomList = sourceListNumber;
				activeList = targetList;
				//debug.log(activeList, 'activeList')
			}, function ( error ) {
				blockMove = false;
				if ( error === 'overflow' ) {
					++topPageNumber;
					++bottomPageNumber;
					lists[sourceListNumber].model.init({channel: {id: '!', title: ''}});
					lists[sourceListNumber].data = [];
					lists[sourceListNumber].viewIndex = null;
					lists[sourceListNumber].renderView(0);
					lists[sourceListNumber].focusIndex(0);
					lists[sourceListNumber].$title.innerHTML = '';
					topList = targetList;
					bottomList = sourceListNumber;
					activeList = targetList;
					lists[topList].$node.style.top = topListTopValue;
					lists[bottomList].$node.style.top = bottomListTopValue;
					lists[activeList].focus();
				}
			});
		}
	}
	
	
	channelsModel.addListener('category:changed', function () {
		clearTimeout(loadTimeout);
		loadTimeout = setTimeout(function () {
			loader.hide();
		}, 10000);
		if ( lists.length === 0 ) {
			lists.push(new ListMovies({
				$node:document.getElementById('pmListCategoryVideos0Node'),
				$body:document.getElementById('pmListCategoryVideos0Body'),
				$title:document.getElementById('pmCategoryChannelTitle0'),
				className: 'listMovie0Node',
				model: new SearchModel({
					type: 'video'
				}),
				size: 5,
				viewIndex: 0,
				focusIndex: 0,
				type: List.prototype.TYPE_HORIZONTAL,
				events: {
					overflow: function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
						}
					},
					'view:ready': function () {
						lists[topList].$node.style.top = topListTopValue;
						if ( lists[bottomList] ) {
							lists[bottomList].$node.style.top = bottomListTopValue;
						}
						this.$title.innerHTML = this.model.channel.title;
						this.show();
						loader.hide();
						clearTimeout(loadTimeout);
						lists[activeList].focus();
						blockMove = false;
					},
					'view:error': function ( error ) {
						blockMove = false;
						if ( error === 'empty' ) {
							this.data = [{
								id:'',
								value: '',
								publishedAt: '',
								icon: 'img/no.image.png',
								duration: '',
								title: gettext('No videos'),
								channelTitle: '',
								viewCount: '',
								locale: {
									publishedAt: '',
									viewCount: '',
									channelTitle: ''
								}
							}];
							this.viewIndex = null;
							this.renderView(0);
							this.focusIndex(0);
							panel.focusEntry = lists[activeList];
							lists[topList].$node.style.top = topListTopValue;
							if ( lists[bottomList] ) {
								lists[bottomList].$node.style.top = bottomListTopValue;
							}
							this.$title.innerHTML = this.model.channel.title;
							this.show();
							loader.hide();
							clearTimeout(loadTimeout);
							lists[activeList].focus();
						} else if ( topPageNumber === 0 ) {
							moveLists(0, false);
						}
					},
					'click:item': function ( event ) {
						if ( event.$item.data.id ) {
							player.setContent({
								channel: this.model.channel,
								video: event.$item.data,
								playlist: this.data,
								position: event.$item.index
							});
	
							// router.navigate('pp', {
							// 	channel: this.model.channel,
							// 	video: event.$item.data,
							// 	playlist: this.data,
							// 	position: event.$item.index
							// });
						}
					}
				}
			}));
			lists.push(new ListMovies({
				$node:document.getElementById('pmListCategoryVideos1Node'),
				$body:document.getElementById('pmListCategoryVideos1Body'),
				$title:document.getElementById('pmCategoryChannelTitle1'),
				className: 'listMovie1Node',
				model: new SearchModel({
					type: 'video'
				}),
				size: 5,
				viewIndex: 0,
				focusIndex: 0,
				type: List.prototype.TYPE_HORIZONTAL,
				events: {
					overflow: function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
							panel.focusEntry = this;
						}
					},
					'view:ready': function () {
						lists[topList].$node.style.top = topListTopValue;
						lists[bottomList].$node.style.top = bottomListTopValue;
						this.$title.innerHTML = this.model.channel.title;
						this.show();
						loader.hide();
						clearTimeout(loadTimeout);
						lists[activeList].focus();
						blockMove = false;
					},
					'view:error': function ( error ) {
						blockMove = false;
						if ( error === 'empty' ) {
							this.data = [{
								id:'',
								value: '',
								publishedAt: '',
								icon: 'img/no.image.png',
								duration: '',
								title: gettext('No videos'),
								channelTitle: '',
								viewCount: '',
								locale: {
									publishedAt: '',
									viewCount: '',
									channelTitle: ''
								}
							}];
							this.viewIndex = null;
							this.renderView(0);
							this.focusIndex(0);
							panel.focusEntry = lists[activeList];
							lists[topList].$node.style.top = topListTopValue;
							if ( lists[bottomList] ) {
								lists[bottomList].$node.style.top = bottomListTopValue;
							}
							this.$title.innerHTML = this.model.channel.title;
							this.show();
							loader.hide();
							clearTimeout(loadTimeout);
							lists[activeList].focus();
						}
					},
					'click:item': function ( event ) {
						if ( event.$item.data.id ) {
							player.setContent({
								channel: this.model.channel,
								video: event.$item.data,
								playlist: this.data,
								position: event.$item.index
							});
						}
					}
				}
			}));
	
			//topListTopValue = window.getComputedStyle(lists[0].$node).getPropertyValue('top');
			panel.add(lists[0]);
			panel.add(lists[1]);
			lists[0].focus();
			lists[0].addListener('keydown', function ( event ) {
				if ( event.code === keys.down ) {
					moveLists(0, false);
				} else if ( event.code === keys.up ) {
					if ( topPageNumber > 0 ) {
						moveLists(0, true);
					} else {
						inputSearch.focus();
					}
				} else if ( event.code === keys.playPause ) {
					player.setContent({
						channel: this.model.channel,
						video: this.$focusItem.data,
						playlist: this.data,
						position: this.$focusItem.index
					});
				}
				//debug.log(event.stop);
			});
			lists[1].addListener('keydown', function ( event ) {
				if ( event.code === keys.down ) {
					moveLists(1, false);
				} else if ( event.code === keys.up ) {
					if ( topPageNumber > 0 ) {
						moveLists(1, true);
					} else {
						inputSearch.focus();
					}
				} else if ( event.code === keys.playPause ) {
					player.setContent({
						channel: this.model.channel,
						video: this.$focusItem.data,
						playlist: this.data,
						position: this.$focusItem.index
					});
				}
			});
			bottomListTopValue = window.getComputedStyle(lists[1].$node).getPropertyValue('top');
		}
		channelsModel.getPage({page: 0, count: 1}).then(function ( data ) {
			topPageNumber = 0;
			topList = 0;
			bottomList = 1;
			bottomPageNumber = 1;
			activeList = 0;
			lists[topList].model.filter({channel: data[0]});
			channelsModel.getPage({page: 1, count: 1}).then(function ( data ) {
				lists[bottomList].model.filter({channel: data[0]});
				lists[activeList].focus();
			});
		})['catch'](function ( e ) {
			//debug.log(e);
		});
	});
	
	
	panel.activate = function ( data ) {
		this.show();
		//debug.log(activeList, 'activeList')
		if ( channelsModel.setActiveCategory(data) ) {
			loader.show();
		} else {
			lists[activeList].focus();
		}
	};
	
	panel.add(inputSearch);
	
	module.exports = panel;


/***/ }),
/* 47 */
/*!****************************************!*\
  !*** ./~/stb-component-panel/index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	// public
	module.exports = __webpack_require__(/*! spa-component-panel */ 48);
	
	// correct component name
	module.exports.prototype.name = 'stb-component-panel';


/***/ }),
/* 48 */
/*!****************************************!*\
  !*** ./~/spa-component-panel/index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! spa-component */ 38);
	
	
	/**
	 * Base panel implementation.
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 *
	 * @example
	 * var Panel = require('stb/ui/panel'),
	 *     panel = new Panel({
	 *         $node: document.getElementById('someId'),
	 *         children: [
	 *             new Panel({
	 *                 $node: document.getElementById('anotherId')
	 *             })
	 *         ]
	 *     });
	 *
	 * panel.add(
	 *     new Button(),
	 *     new Button(),
	 *     new Button()
	 * );
	 *
	 * page.add(panel);
	 */
	function Panel ( config ) {
	    // sanitize
	    config = config || {};
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        // init parameters checks
	        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
	            throw new Error(__filename + ': wrong or empty config.className');
	        }
	    }
	
	    // can't accept focus
	    config.focusable = config.focusable || false;
	
	    // set default className if classList property empty or undefined
	    //config.className = 'panel ' + (config.className || '');
	
	    // parent constructor call
	    Component.call(this, config);
	}
	
	
	// inheritance
	Panel.prototype = Object.create(Component.prototype);
	Panel.prototype.constructor = Panel;
	
	// set component name
	Panel.prototype.name = 'spa-component-panel';
	
	
	// public
	module.exports = Panel;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-component-panel/index.js"))

/***/ }),
/* 49 */
/*!************************************!*\
  !*** ./src/js/modules/ui/input.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @module stb/ui/input
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! stb-component */ 45),
	    keys      = __webpack_require__(/*! stb-keys */ 27);
	
	
	/**
	 * Base input field implementation.
	 * Has two types: text and password.
	 * Password - replace real text with '*', but real text presents in the own property 'value'.
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 * @param {string} [config.value='text'] input text value
	 * @param {string} [config.placeholder='password'] placeholder text value
	 * @param {string} [config.type=Input.TYPE_TEXT] input type
	 * @param {string} [config.direction='ltr'] symbol direction ('rtl' - right to left, 'ltr' - left to right)
	 *
	 * @example
	 * var Input = require('stb/ui/input'),
	 *     input = new Input({
	 *         placeholder: 'input password'
	 *         events: {
	 *             input: function ( event ) {
	 *                 debug.log(event.value);
	 *             }
	 *         }
	 *     });
	 */
	function Input ( config ) {
	    // sanitize
	    config = config || {};
	
	    if ( false ) {
	        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
	        // init parameters checks
	        if ( config.className && typeof config.className !== 'string'   ) { throw new Error(__filename + ': wrong or empty config.className'); }
	    }
	
	    this.name = 'component';
	    /**
	     * Text value of input.
	     *
	     * @type {string}
	     */
	    this.value = '';
	
	    /**
	     * Input type, now available only text and password.
	     * Different logic with different types.
	     * TYPE_TEXT - normal input.
	     * TYPE_PASSWORD - hidden input, all chars replaced with '*', but real value is located in 'this.value'.
	     *
	     * @type {number}
	     */
	    this.type = this.TYPE_TEXT;
	
	    // set default className if classList property empty or undefined
	    config.className = 'input ' + (config.className || '');
	
	    // parent constructor call
	    Component.call(this, config);
	
	    // insert text line
	    this.$line = this.$body.appendChild(document.createElement('div'));
	    // correct class
	    this.$line.className = 'line';
	
	    // element to show current cursor position
	    this.$caret = this.$line.appendChild(document.createElement('div'));
	    // correct class
	    this.$caret.className = 'caret';
	
	    // hint element with placeholder text
	    this.$placeholder = this.$line.appendChild(document.createElement('div'));
	    // correct class
	    this.$placeholder.className = 'placeholder';
	
	    // setup caret index
	    this.$caret.index = 0;
	
	    // component setup
	    this.init(config);
	}
	
	
	// inheritance
	Input.prototype = Object.create(Component.prototype);
	Input.prototype.constructor = Input;
	
	// input types
	Input.prototype.TYPE_TEXT     = 0;
	Input.prototype.TYPE_PASSWORD = 1;
	
	
	/**
	 * List of all default event callbacks.
	 *
	 * @type {Object.<string, function>}
	 */
	Input.prototype.defaultEvents = {
	    /**
	     * Default method to handle keyboard keypress events.
	     *
	     * @param {Event} event generated event
	     */
	    keypress: function ( event ) {
	        this.addChar(String.fromCharCode(event.keyCode), this.$caret.index);
	    },
	
	    /**
	     * Default method to handle keyboard keydown events.
	     *
	     * @param {Event} event generated event
	     */
	    keydown: function ( event ) {
	        switch ( event.code ) {
	            case keys['delete']:
	                this.removeChar(this.$caret.index);
	                break;
	
	            case keys.back:
	                this.removeChar(this.$caret.index - 1);
	                break;
	
	            case keys.left:
	                this.setCaretPosition(this.$caret.index - 1);
	                break;
	
	            case keys.right:
	                this.setCaretPosition(this.$caret.index + 1);
	                break;
	
	            case keys.end:
	            case keys.down:
	                this.setCaretPosition(this.value.length);
	                break;
	
	            case keys.home:
	            case keys.up:
	                this.setCaretPosition(0);
	                break;
	
	            default:
	                break;
	        }
	    }
	};
	
	
	/**
	 * Init or re-init of the component inner structures and HTML.
	 *
	 * @param {Object} config init parameters (subset of constructor config params)
	 */
	Input.prototype.init = function ( config ) {
	    if ( false ) {
	        if ( config.type && Number(config.type) !== config.type ) { throw new Error(__filename + ': config.type must be a number'); }
	        if ( config.type && config.type !== this.TYPE_TEXT && config.type !== this.TYPE_PASSWORD ) { throw new Error(__filename + ': config.type must be one of the TYPE_* constant'); }
	        if ( config.value && typeof config.value !== 'string' ) { throw new Error(__filename + ': config.value must be a string'); }
	        if ( config.placeholder && typeof config.placeholder !== 'string' ) { throw new Error(__filename + ': config.placeholder must be a string'); }
	        if ( config.direction && typeof config.direction !== 'string' ) { throw new Error(__filename + ': config.direction must be a string'); }
	        if ( config.direction && config.direction !== 'ltr' && config.direction !== 'rtl' ) { throw new Error(__filename + ': config.direction wrong value'); }
	    }
	
	    // type passed
	    if ( config.type ) {
	        // apply
	        this.type = config.type;
	    }
	
	    // default value passed
	    if ( config.value ) {
	        // apply
	        this.setValue(config.value);
	    }
	
	    // hint
	    if ( config.placeholder ) {
	        // apply
	        this.$placeholder.innerText = config.placeholder;
	    }
	
	    // char direction
	    this.$line.dir = config.direction || 'ltr';
	};
	
	
	/**
	 * Add given char to given position.
	 * Also moving caret in every action.
	 * Do nothing if position is < 0, or if index more or equals to length add char to the end.
	 *
	 * @param {string} char symbol to add
	 * @param {number} [index=this.value.length] given position
	 *
	 * @fires module:stb/ui/input~Input#input
	 */
	Input.prototype.addChar = function ( char, index ) {
	    var $char = document.createElement('div');
	
	    index = (index === undefined) ? this.$caret.index : index;
	
	    if ( false ) {
	        if ( index < 0 ) { throw new Error(__filename + ': index must be more than 0 or equal to 0'); }
	        if ( typeof char !== 'string' ) { throw new Error(__filename + ': char must be a string'); }
	        if ( char.length !== 1 ) { throw new Error(__filename + ': char must be a string with length = 1'); }
	    }
	
	    // remove hint
	    if ( this.value.length === 0 ) {
	        this.$line.removeChild(this.$placeholder);
	    }
	
	    // settings class name for span which presents one symbol in virtual input
	    $char.className = 'char';
	
	    // insert char into value
	    this.value = this.value.substring(0, index) + char + this.value.substring(index, this.value.length);
	
	    // move caret
	    ++this.$caret.index;
	
	    if ( this.type === this.TYPE_PASSWORD ) {
	        $char.innerText = '*';
	    } else if ( char === ' ' ) {
	        $char.innerHTML = '&nbsp;';
	    } else {
	        $char.innerText = char;
	    }
	
	    if ( index >= this.value.length ) { // add char to the end, move caret to the end
	        this.$line.appendChild($char);
	        this.$line.appendChild(this.$caret);
	    } else { // move caret before index, append span before caret
	        this.$line.insertBefore(this.$caret, this.$line.children[index]);
	        this.$line.insertBefore($char, this.$caret);
	    }
	
	    // there are some listeners
	    if ( this.events['input'] ) {
	        // notify listeners
	        this.emit('input', {value: this.value});
	    }
	};
	
	
	/**
	 * Remove char from given position.
	 * Do nothing if index is out of the range (0, length).
	 *
	 * @param {number} [index=this.$caret.index - 1] index given position
	 *
	 * @fires module:stb/ui/input~Input#input
	 */
	Input.prototype.removeChar = function ( index ) {
	    var prevValue = this.value;
	
	    index = (index === undefined) ? this.$caret.index - 1 : index;
	    // non-empty string
	    if ( this.value.length > 0 ) {
	        if ( false ) {
	            if ( index < 0 ) { throw new Error(__filename + ': index must be a positive value'); }
	            if ( index > this.value.length ) { throw new Error(__filename + ': index must be a less than or equal to total length'); }
	        }
	
	        if ( this.$caret.index === index && index < this.value.length ) {
	            // remove char after caret
	            this.$line.removeChild(this.$line.children[index + 1]);
	        } else if ( this.$caret.index > index ) {
	            // remove char before caret
	            --this.$caret.index;
	            this.$line.removeChild(this.$line.children[index]);
	        }
	
	        // cut one char from the value
	        this.value = this.value.substring(0, index) + this.value.substring(index + 1, this.value.length);
	
	        // there are some listeners and value was changed
	        if ( this.events['input'] && prevValue !== this.value ) {
	            // notify listeners
	            this.emit('input', {value: this.value});
	        }
	    }
	
	    // only hint
	    if ( this.value.length === 0 ) {
	        this.$line.appendChild(this.$placeholder);
	    }
	};
	
	
	/**
	 * Move caret to the given position.
	 * Do nothing if index is out of the range (0, this.value.length).
	 *
	 * @param {number} index given position
	 */
	Input.prototype.setCaretPosition = function ( index ) {
	    // check boundaries and current position
	    if ( index >= 0 && index <= this.value.length && this.$caret.index !== index ) {
	        // extract caret
	        this.$line.removeChild(this.$caret);
	
	        // apply
	        if ( index === this.value.length ) {
	            // add to the end
	            this.$line.appendChild(this.$caret);
	        } else {
	            this.$line.insertBefore(this.$caret, this.$line.children[index]);
	        }
	
	        this.$caret.index = index;
	    }
	};
	
	
	/**
	 * Setting new text value of the input field.
	 *
	 * @param {string} value given string value
	 */
	Input.prototype.setValue = function ( value ) {
	    var oldLength = this.value.length,
	        newLength = value.length,
	        i = 0,
	        $char, diff;
	
	    if ( false ) {
	        if ( typeof value !== 'string' ) { throw new Error(__filename + ': value must be a string'); }
	    }
	
	    // return if no changes
	    if ( value === this.value ) {
	        return;
	    }
	
	    // non-empty string
	    if ( newLength > 0 ) {
	        // no hint
	        if ( this.$placeholder.parentNode === this.$line ) {
	            this.$line.removeChild(this.$placeholder);
	        }
	
	        // no cursor
	        this.$line.removeChild(this.$caret);
	
	        // value length has changed
	        if ( newLength !== oldLength ) {
	            diff = newLength - oldLength;
	
	            // need to correct char divs amount
	            if ( diff > 0 ) {
	                // add missing chars
	                for ( i = 0; i < diff; i++ ) {
	                    $char = this.$line.appendChild(document.createElement('div'));
	                    $char.className = 'char';
	                }
	            } else {
	                // remove unnecessary chars
	                for ( i = 0; i > diff; i-- ) {
	                    this.$line.removeChild(this.$line.lastChild);
	                }
	            }
	        }
	
	        // apply value
	        for ( i = 0; i < newLength; i++ ) {
	            $char = this.$line.children[i];
	
	            if ( this.type === this.TYPE_PASSWORD ) {
	                $char.innerHTML = '*';
	            } else if ( value[i] === ' ' ) {
	                $char.innerHTML = '&nbsp;';
	            } else {
	                $char.innerText = value[i];
	            }
	        }
	
	        this.value = value;
	        this.$caret.index = newLength;
	        this.$line.appendChild(this.$caret);
	    } else {
	        // empty string
	        this.value = '';
	        this.$line.innerText = '';
	        this.$line.appendChild(this.$caret);
	        this.$line.appendChild(this.$placeholder);
	    }
	
	    // there are some listeners
	    if ( this.events['input'] ) {
	        // notify listeners
	        this.emit('input', {value: this.value});
	    }
	};
	
	
	if ( false ) {
	    // expose to the global scope
	    window.ComponentInput = Input;
	}
	
	
	// public
	module.exports = Input;


/***/ }),
/* 50 */
/*!**********************************!*\
  !*** ./src/js/modules/player.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

	var parser,
		app = __webpack_require__(/*! mag-app */ 1),
		stopExit = false,
	
		loader = __webpack_require__(/*! ../components/loader */ 41),
		player;
	
	parser = app.urlParser;
	
	player = {
		intent: null,
		movie: {},
		channel: {},
		playlist: null,
		setContent: function ( content ) {
			stopExit = true;
			if ( !content.urlParseErrorCount ) {
				content.urlParseErrorCount = 0;
			}
			if ( content.channel !== undefined ) {
				this.channel = content.channel;
			} else {
				// icon = content.video.channelId === activeContent.channel.id ? activeContent.channel.icon : false;
				this.channel = {
					title: content.video.channelTitle,
					id: content.video.channelId
				};
			}
			this.playlist = content.playlist;
			this.listPosition = content.position;
			this.context = null;
	
			this.prepare(content);
		},
		prepare: function ( content, context ) {
			var self = this;
	
			this.movie.title = content.video.title;
			if ( content.video.duration === '' ) {
	
				window.core.notify({
					title: gettext('Live broadcasting is not supported'), // текст нотификации
					icon: 'alert',
					type: 'warning',
					timeout: 5000
				});
				stopExit = false;
				return;
			}
			this.movie.id = content.video.id;
			loader.show();
			// document.cookie = '';
			parser.getInfo('https://www.youtube.com/watch?v=' + content.video.id, function ( error, information ) {
				var bestFormat, i, size;
				loader.hide();
				if ( false ) {
					//debug.info(information);
				}
				if ( error ) {
					if ( false ) {
						app.data.log['youtube-dl'].push({
							error: error,
							tryCount: content.urlParseErrorCount,
							id: content.video.id
						});
						app.sendLog();
					}
	
					if ( content.video.duration === '0:00' ) {
						// live stream
						window.core.notify({
							title: gettext('Live broadcasting is not supported'), // текст нотификации
							icon: 'alert',
							type: 'warning',
							timeout: 5000
						});
					} else {
						window.core.notify({
							title: gettext('Video is not available'), // текст нотификации
							icon: 'alert',
							type: 'warning',
							timeout: 5000
						});
					}
					stopExit = false;
					//debug.info(error);
					return;
				} else if ( information.formats.length === 0 ) {
					if ( content.video.duration === '0:00' ) {
						// live stream
						if ( false ) {
							app.data.log[content.video.id + '-youtube-dl-try-' +
							content.urlParseErrorCount +
							'-live'] = JSON.stringify(information);
						}
						window.core.notify({
							title: gettext('Live broadcasting is not supported'),
							icon: 'alert',
							type: 'warning',
							timeout: 5000
						});
					} else {
						if ( false ) {
							app.data.log[content.video.id + '-youtube-dl-try-' +
							content.urlParseErrorCount +
							'-empty'] = JSON.stringify(information);
						}
						window.core.notify({
							title: gettext('Video is not available'),
							icon: 'alert',
							type: 'warning',
							timeout: 5000
						});
					}
					stopExit = false;
					return;
				}
				for ( i = 0, size = information.formats.length; i < size; ++i ) {
					////debug.log('height ' + information.urlMap[i].format.height);
					information.formats[i].resolution = information.formats[i].resolution || '';
					if ( information.formats[i].container === 'mp4' && information.formats[i].audioBitrate ) {
						if ( bestFormat ) {
							if ( bestFormat.resolution < information.formats[i].resolution && information.formats[i].type.indexOf('video') !== -1 ) {
								bestFormat = information.formats[i];
							}
						} else if ( information.formats[i].type.indexOf('video') !== -1 ) {
							bestFormat = information.formats[i];
						}
					}
					//if ( information.formats[i].resolution.indexOf(height) !== -1 ) {
					//	bestFormat = information.formats[i];
					//	break;
					//}
				}
	
				if ( !bestFormat ) {
					bestFormat = information.formats[0];
				}
				self.movie.url = bestFormat.url;
				self.play(context);
			});
		},
		play: function ( context ) {
			var self = this,
				prev, next;
	
			if ( self.playlist.length && self.playlist.length > self.listPosition ) {
				next = function () {
					self.next(context);
				}
			}
	
			if ( self.playlist.length && self.listPosition > 0 ) {
				prev = function () {
					self.prev(context);
				}
			}
	
			this.intent = core.intent({
				action: 'play',
				mime: 'content/video',
				data: {
					title: self.movie.title,
					uri: self.movie.url,
					movie: self.movie.id,
					proxy: app.params.proxy
				},
				events: {
					end: function () {
						if ( self.playlist.length ) {
							self.next(context);
						} else {
							self.intent.close();
						}
					},
					error: function () {
						self.intent.close();
					},
					close: function () {
						context = null;
					},
					next: next,
					prev: prev
				},
				context: context
			}, function ( error, playerContext ) {
				debug.fail('Playing error', error);
				context = playerContext;
			});
		},
		next: function ( context ) {
			if ( this.playlist.length > this.listPosition + 1 ) {
				this.listPosition++;
				this.prepare({video: this.playlist[this.listPosition]}, context);
			}
		},
		prev: function ( context ) {
			if ( this.listPosition > 0 ) {
				this.listPosition--;
				this.prepare({video: this.playlist[this.listPosition]}, context);
			}
		}
	};
	
	function onGetUrl ( e, data ) {
		if ( e ) {
			if ( false ) {
				//debug.info(e, 'onGetUrl LOGGING');
				app.data.log['youtube-dl'].push({
					error: e,
					tryCount: activeContent.urlParseErrorCount,
					content: activeContent
				});
				app.sendLog();
			}
			//debug.info(e, 'onGetUrl');
			window.core.notify({
				title: gettext('Video is not available'),
				icon: 'alert',
				type: 'warning',
				timeout: 5000
			});
			stopExit = false;
			return;
		}
		activeContent.url = data.url;
		if  ( false ) {
			console.log('proxy: ' + app.params.proxy);
		}
		player.play(data.url, {proxy: app.params.proxy});
	}
	
	module.exports = player;


/***/ }),
/* 51 */
/*!******************************************!*\
  !*** ./src/js/components/list.videos.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys   = __webpack_require__(/*! stb-keys */ 27),
	
		List = __webpack_require__(/*! mag-component-list */ 44);
	
	
	function ListMovies (config) {
		var self = this;
	
		this.model = null;
		this.activePage = 0;
		this.$title = null;
		this.loading = false;
	
		config.visible = false;
	
		config.data = [{
			id:'',
			value: '',
			publishedAt: '',
			icon: '',
			duration: '',
			title: '',
			channelTitle: '',
			viewCount: '',
			locale: {
				publishedAt: '',
				viewCount: '',
				channelTitle: ''
			}
		}];
		config.type = List.prototype.TYPE_HORIZONTAL;
	
		// parent init
		List.call(self, config);
		// this.type === this.TYPE_HORIZONTAL;
	
		this.$node.classList.add('movieList');
		this.$body.classList.add('movieListBody');
	
		if ( config.$title !== undefined ) {
			this.$title = config.$title;
			this.$title.classList.add('movieListHeader');
		}
	
		if ( config.model !== undefined ) {
			this.model = config.model;
	
			this.model.addListener('content:changed', function () {
				//debug.log('content:changed');
				self.model.getPage({page: 0, count: 50}, /*).then( */function ( error, data ) {
					self.activePage = 0;
					self.data = data;
					self.viewIndex = null;
					self.renderView(0);
					self.focusIndex(0);
					self.emit('view:ready');
				});
				// function ( error ) {
				// 	self.emit('view:error', error);
				// 	//debug.log(error, 'list.videos reject content:changed getPage');
				// })['catch'](function ( e ) {
				// 	//debug.log(e);
				// });
			});
	
			//this.model.getPage({page: 0, count: self.size}).then(function ( data ) {
			//	//debug.log(data);
			//	try {
			//		self.activePage = 0;
			//		self.$title.innerHTML = self.model.channel.title;
			//		self.data = data;
			//		self.viewIndex = null;
			//		self.renderView(0);
			//		self.focusIndex(0);
			//		self.emit('view:ready');
			//	} catch ( e ) {
			//		//debug.log(e, 'list.videos catch getPage');
			//	}
			//}, function ( error ) {
			//	//debug.log(error, 'list.videos reject getPage');
			//});
		}
	}
	
	// inheritance
	ListMovies.prototype = Object.create(List.prototype);
	ListMovies.prototype.constructor = ListMovies;
	
	
	/**
	 * Draw the visible window.
	 *
	 * @param {number} index start position to render
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/ui/list~List#move:view
	 */
	ListMovies.prototype.renderView = function ( index ) {
		var $item, i, itemData, prevIndex, currIndex;
	
		if ( false ) {
			if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
			if ( Number(index) !== index ) { throw 'index must be a number'; }
			if ( index < 0 ) { throw 'index should be more than zero'; }
			if ( index >= this.data.length ) { throw 'index should be less than data size'; }
		}
	
		// has the view window position changed
		if ( this.viewIndex !== index ) {
			// save for emit
			prevIndex = this.viewIndex;
			// sync global pointer
			this.viewIndex = currIndex = index;
	
			// rebuild all visible items
			for ( i = 0; i < this.size; i++ ) {
				// shortcuts
				$item    = this.$body.children[i];
				if ( this.data.length > index ) {
					$item.classList.remove('hidden');
					itemData = this.data[index];
					// real item or stub
					if ( itemData !== undefined ) {
						// correct inner data/index and render
						$item.data  = itemData;
						$item.index = index;
						this.renderItem($item, itemData);
	
						// apply CSS
						if ( itemData.mark ) {
							$item.classList.add('mark');
						} else {
							$item.classList.remove('mark');
						}
					} else {
						// nothing to render
						$item.data = $item.index = undefined;
						$item.innerHTML = '';
						$item.ready = false;
					}
					index++;
				} else {
					$item.classList.add('hidden');
				}
	
			}
	
			// there are some listeners
			if ( this.events['move:view'] !== undefined ) {
				// notify listeners
				this.emit('move:view', {prevIndex: prevIndex, currIndex: currIndex});
			}
	
			// full rebuild
			return true;
		}
	
		// nothing was done
		return false;
	};
	
	
	/**
	 * Fill the given item with data.
	 *
	 * @param {Element} $item item DOM link
	 * @param {*} data associated with this item data
	 */
	ListMovies.prototype.renderItem = function ( $item, data ) {
		var $container, $tileTop, $tileBottom;
	
		if ( data.duration.length > 10 ) {
			data.duration = data.duration.substring(0, 10);
		}
	
		if ( $item.ready ) {
			$item.$videoThumb.style.backgroundImage = 'url(' + data.icon + ')';
			$item.$videoDuration.innerText = data.duration;
			$item.$videoTitle.innerText = data.title;
			$item.$videoAthour.innerText = data.locale.channelTitle;
			$item.$viewCounter.innerText = data.locale.viewCount;
			$item.$dateAdded.innerText = data.locale.publishedAt;
		} else {
			$container = document.createElement('div');
			$container.className = 'container';
			$item.appendChild($container);
	
			$tileTop = document.createElement('div');
			$tileTop.className = 'tileTop';
			$container.appendChild($tileTop);
	
			$tileBottom = document.createElement('div');
			$tileBottom.className = 'tileBottom';
			$container.appendChild($tileBottom);
	
			$item.$videoThumb = document.createElement('div');
			$item.$videoThumb.className = 'thumb';
			$item.$videoThumb.style.backgroundImage = 'url(' + data.icon + ')';
			$tileTop.appendChild($item.$videoThumb);
	
			$item.$videoDuration = document.createElement('div');
			$item.$videoDuration.className = 'duration';
			$item.$videoDuration.innerText = data.duration;
			$tileTop.appendChild($item.$videoDuration);
	
			$item.$videoTitle = document.createElement('div');
			$item.$videoTitle.className = 'title';
			$item.$videoTitle.innerText = data.title;
			$tileBottom.appendChild($item.$videoTitle);
	
			$item.$videoAthour = document.createElement('div');
			$item.$videoAthour.className = 'uploader';
			if ( data.channelTitle ) {
				$item.$videoAthour.innerText = data.locale.channelTitle;
			}
			$tileBottom.appendChild($item.$videoAthour);
	
			$item.$viewCounter = document.createElement('div');
			$item.$viewCounter.className = 'viewCount';
			if ( data.viewCount ) {
				$item.$viewCounter.innerText = data.locale.viewCount;
			}
			$tileBottom.appendChild($item.$viewCounter);
	
			$item.$dateAdded = document.createElement('div');
			$item.$dateAdded.className = 'uploaded';
			$item.$dateAdded.innerText = data.locale.publishedAt;
			$tileBottom.appendChild($item.$dateAdded);
	
			$item.ready = true;
		}
	};
	
	
	/**
	 * Current active method to move focus according to pressed keys.
	 * Can be redefined to provide custom navigation.
	 *
	 * @param {Object} event keydown event
	 *
	 * @type {function}
	 */
	ListMovies.prototype.defaultEvents.keydown = function ( event ) {
		//var self = this;
		if ( this.loading || !this.data ) {
			return;
		}
	
		switch ( event.code ) {
			case keys.right:
				if ( this.$focusItem.index < this.data.length - 1 ) {
					if ( this.$focusItem.index > 0 ) {
						this.activePage++;
						//if ( this.data.length - this.size === this.activePage ) {
						//	self.loading = true;
						//	this.model.getPage({page: this.activePage, count: 1}).then(function ( data ) {
						//		self.data.push(data[0]);
						//		self.renderView(self.activePage);
						//		self.loading = false;
						//	}, function ( error ) {
						//		self.loading = false;
						//	})['catch'](function ( e ) {
						//		self.loading = false;
						//	});
						//} else {
						this.renderView(this.activePage);
						//}
					} else {
						this.focusIndex(1);
					}
				}
				break;
			case keys.left:
			//case keys.pageUp:
			//case keys.pageDown:
			//case keys.home:
			//case keys.end:
				// cursor move only on arrow keys
				if ( this.activePage > 0 ) {
					this.activePage--;
					this.renderView(this.activePage);
				} else {
					this.move(event.code);
				}
				break;
			case keys.ok:
				// there are some listeners
				if ( this.events['click:item'] !== undefined ) {
					// notify listeners
					this.emit('click:item', {$item: this.$focusItem, event: event});
				}
				break;
		}
	};
	
	ListMovies.prototype.focusIndex = function ( index ) {
		List.prototype.focusIndex.call(this, index);
	
		this.activePage = this.viewIndex;
	};
	
	
	module.exports = ListMovies;


/***/ }),
/* 52 */
/*!********************************************!*\
  !*** ./src/js/modules/api/model/search.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Base video data provider base model.
	 *
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 */
	
	'use strict';
	
	var Promise = __webpack_require__(/*! ../../promise */ 32),
		app = __webpack_require__(/*! mag-app */ 1),
	
		api   = __webpack_require__(/*! ./../client.js */ 31),
	
		ChannelModel     = __webpack_require__(/*! ./channel */ 53),
		l10n,
		l10nAuthor,
		timeDiff;
	
	
	/**
	 * Search model implementation.
	 *
	 * @constructor
	 * @extends ChannelModel
	 *
	 * @param {Object} [config={}] filter parameters
	 * @param {Object} [config.channel] channel object with id and name
	 * @param {string} [config.searchQuery] search query
	 * @param {number} [config.relatedToVideoId] pass this param add video relation option
	 *
	 * @fires SearchModel#content:changed
	 */
	function SearchModel ( config ) {
		this.pages = {};
	
		this.searchQuery = '';
	
		this.relatedToVideoId = '';
	
		this.channelId = '';
	
		this.order = '';
	
		this.type = '';
	
		ChannelModel.call(this);
	
		config = config || {};
	
		this.filter(config);
	}
	
	// inheritance
	SearchModel.prototype = Object.create(ChannelModel.prototype);
	SearchModel.prototype.constructor = SearchModel;
	
	
	SearchModel.prototype.getPage = function ( params ) {
		var self = this,
			url;
	
		if ( !l10n ) {
			l10n = __webpack_require__(/*! ../../util/l10n */ 56);
			timeDiff = __webpack_require__(/*! ../../util/time.diff */ 59);
			l10nAuthor = gettext('Author');
		}
	
		return new Promise(function ( resolve, reject ) {
			params.channel = params.channel || self.channel;
			params.type = self.type;
			params.searchQuery = params.searchQuery || self.searchQuery;
			params.page = +params.page || 0;
			params.relatedToVideoId = params.relatedToVideoId || self.relatedToVideoId;
	
			url = 'search?part=id&maxResults=' + (params.count || 6);
			if ( params.page ) {
				if ( !self.pages[params.page] ) {
					reject();
					return;
				}
				url += '&pageToken=' + self.pages[params.page];
			}
			if ( params.channel && params.channel.id ) {
				url += '&channelId=' + params.channel.id;
			}
			if ( self.order ) {
				url += '&order=' + self.order;
			}
			if ( params.relatedToVideoId ) {
				url += '&type=video&relatedToVideoId=' + params.relatedToVideoId;
			} else if ( params.type ) {
				url += '&type=video';
			}
			if ( params.searchQuery ) {
				url += '&q=' + encodeURIComponent(params.searchQuery);
			}
			if ( app.settings.safeSearch ) {
				url += '&safeSearch=strict';
			}
			api.request('GET', url).then(function ( data ) {
				var result = [],
					totalSize = 0,
					channels = {},
					playlists = {},
					videoIds = '',
					channelIds = '',
					playlistIds = '',
					i;
	
				data = JSON.parse(data);
				if ( data.nextPageToken ) {
					self.pages[params.page + 1] = data.nextPageToken;
				}
				if ( data.prevPageToken ) {
					self.pages[params.page - 1] = data.prevPageToken;
				}
	
				data = data.items;
				if ( data.length === 0 ) {
					reject('empty');
				} else {
					totalSize = data.length;
					for ( i = 0; i < totalSize; ++i ) {
						if ( data[i].id.kind === 'youtube#video' ) {
							videoIds += data[i].id.videoId + ',';
						} else if ( data[i].id.kind === 'youtube#channel' ) {
							channelIds += data[i].id.channelId + ',';
							channels[i] = 1;
						} else if ( data[i].id.kind === 'youtube#playlist' ) {
							playlistIds += data[i].id.playlistId + ',';
							playlists[i] = 1;
						}
					}
	//				//debug.info([
	//					videoIds,
	//					channelIds,
	//					playlistIds
	//				], '!!!!!!!!!!!!!!!!!!');
					Promise.all([
						self.getMovies(videoIds.substr(0, videoIds.length - 1)),
						self.getChannelsInfo(channelIds.substr(0, channelIds.length - 1)),
						self.getTotalInfoPlaylists({id: playlistIds.substr(0, playlistIds.length - 1), channel: false})
					]).then(function ( data ) {
						var currentDate = +new Date(),
							videoIndex = 0,
							channelIndex = 0,
							playlistIndex = 0;
	
						for ( i = 0; i < totalSize; ++i ) {
							if ( channels[i] && data[1][channelIndex] ) {
								result.push({
									value: 1,
									id: data[1][channelIndex].id,
									title: data[1][channelIndex].snippet.localized.title,
									icon: data[1][channelIndex].snippet.thumbnails['high'].url,
									type: 'channel',
									viewCount: data[1][channelIndex].statistics.viewCount,
									commentCount: data[1][channelIndex].statistics.commentCount,
									subscriberCount: data[1][channelIndex].statistics.subscriberCount,
									hiddenSubscriberCount: data[1][channelIndex].statistics.hiddenSubscriberCount,
									videoCount: data[1][channelIndex].statistics.videoCount,
									locale: {
										subscriberCount: data[1][channelIndex].statistics.subscriberCount + ' ' + ngettext('subscriber', 'subscribers', +data[1][channelIndex].statistics.subscriberCount)
									}
								});
								++channelIndex;
							} else if ( playlists[i] && data[2][playlistIndex] ) {
								result.push({
									value: 1,
									playlistId: data[2][playlistIndex].id,
									channel: {
										title: data[2][playlistIndex].snippet.channelTitle,
										id: data[2][playlistIndex].snippet.channelId
									},
									title: data[2][playlistIndex].snippet.title,
									icon: data[2][playlistIndex].snippet.thumbnails['high'].url,
									type: 'playlist',
									channelTitle: data[2][playlistIndex].snippet.channelTitle,
									viewCount: ' ',
									duration: ' ',
									publishedAt: data[2][playlistIndex].snippet.publishedAt,
									locale: {
										publishedAt: timeDiff(data[2][playlistIndex].snippet.publishedAt, currentDate),
										viewCount: ' ',
										channelTitle:data[2][playlistIndex].snippet.channelTitle ? l10nAuthor + ': ' + data[2][playlistIndex].snippet.channelTitle : ' '
									}
								});
								++playlistIndex;
							} else if ( data[0][videoIndex] ) {
								result.push({
									value: 1,
									id: data[0][videoIndex].id,
									channelTitle: data[0][videoIndex].snippet.channelTitle,
									duration: api.normalizeVideoDuration(data[0][videoIndex].contentDetails.duration),
									realDuration: data[0][videoIndex].contentDetails.duration,
									viewCount: data[0][videoIndex].statistics.viewCount,
									publishedAt: data[0][videoIndex].snippet.publishedAt,
									dimension: data[0][videoIndex].contentDetails.dimension,
									definition: data[0][videoIndex].contentDetails.definition,
									title: data[0][videoIndex].snippet.localized.title,
									icon: data[0][videoIndex].snippet.thumbnails['high'].url,
									channelId: data[0][videoIndex].snippet.channelId,
									type: 'video',
									locale: {
										publishedAt: timeDiff(data[0][videoIndex].snippet.publishedAt, currentDate),
										viewCount: ngettext('view', 'views', +data[0][videoIndex].statistics.viewCount) + ' ' + data[0][videoIndex].statistics.viewCount,
										channelTitle: l10nAuthor + ': ' + data[0][videoIndex].snippet.channelTitle
									}
								});
								++videoIndex;
							}
						}
						resolve(result);
					}, function ( e ) {
						//debug.info(e, 'reject');
					})['catch'](function ( e ) {
						//debug.info(e, 'catch');
					});
				}
			})['catch'](function ( e ) {
				//debug.info(e);
			});
		});
	};
	
	
	SearchModel.prototype.getChannelsInfo = function ( id ) {
		if ( !id ) {
			return Promise.resolve([]);
		}
		return api.request('GET', 'channels?part=snippet,statistics&id=' + id).then(function ( data ) {
			return JSON.parse(data).items;
		});
	};
	
	
	/**
	 *
	 * @param {Object} [params={}] filter parameters
	 * @param {Object} [params.channel] channel object with id and name
	 * @param {string} [params.searchQuery] search query
	 * @param {number} [params.relatedToVideoId] pass this param add video relation option
	 *
	 * @fires SearchModel#content:changed
	 *
	 * @return {boolean} applied filter
	 */
	SearchModel.prototype.filter = function ( params ) {
		var changed = false;
	
		if ( params.channel !== undefined ) {
			this.init({channel: params.channel});
		}
		if ( params.searchQuery !== undefined && this.searchQuery !== params.searchQuery ) {
			changed = true;
			this.searchQuery = params.searchQuery;
		}
		if ( params.relatedToVideoId !== undefined && this.relatedToVideoId !== params.relatedToVideoId ) {
			changed = true;
			this.relatedToVideoId = params.relatedToVideoId;
		}
		if ( params.order !== undefined && this.order !== params.order ) {
			changed = true;
			this.order = params.order;
		}
		if ( params.type !== undefined && this.type !== params.type ) {
			changed = true;
			this.type = params.type;
		}
		if ( changed ) {
			this.pages = {};
			this.emit('content:changed', params);
			return true;
		}
		return false;
	};
	
	// public export
	module.exports = SearchModel;


/***/ }),
/* 53 */
/*!*********************************************!*\
  !*** ./src/js/modules/api/model/channel.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Base video data provider base model.
	 *
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 */
	
	'use strict';
	
	var Promise = __webpack_require__(/*! ../../promise */ 32),
	
		PlaylistModel = __webpack_require__(/*! ./playlist */ 54),
	
		api   = __webpack_require__(/*! ./../client.js */ 31),
	
		timeDiff,
		l10nAuthor;
	
	
	function cacheKey ( params ) {
		if ( params && params.channel ) {
			return 'cid:' + params.channel.id + ';p:' + params.page;
		}
		return 'CHANNEL';
	}
	
	
	/**
	 *
	 * @constructor
	 *
	 * @param {Object} config init config
	 */
	function ChannelModel ( config ) {
		this.pages = {};
	
		this.channel = null;
	
		PlaylistModel.call(this);
	
		config = config || {};
	
		if ( config.events !== undefined ) {
			this.addListeners(config.events);
		}
	
		this.init(config);
	}
	
	// inheritance
	ChannelModel.prototype = Object.create(PlaylistModel.prototype);
	ChannelModel.prototype.constructor = ChannelModel;
	
	ChannelModel.prototype.getPage = function ( params ) {
		var self = this;
	
		if ( !l10nAuthor ) {
			timeDiff = __webpack_require__(/*! ../../util/time.diff */ 59);
			l10nAuthor = gettext('Author');
		}
		params.channel = params.channel || this.channel;
		params.count = params.count || 6;
		params.page = +params.page || 0;
	
		return new Promise(function ( resolve, reject ) {
			//var fromCache = cache.get(cacheKey(params));
	
			//if ( fromCache ) {
			//	resolve(fromCache);
			//} else {
			if ( !params.channel ) {
				reject(params);
				return;
			}
			self.getPlaylists({count: 1, channel: params.channel, page: params.page})
			.then(function ( data ) {
				params.playlist = data[0];
				self.getPlayListItems(params).then(resolve, reject);
			});
			//}
		});
	};
	
	
	/**
	 *
	 * @param params
	 * @return {Promise} promised action
	 */
	ChannelModel.prototype.getPlaylists = function ( params ) {
		var self = this,
			url = 'playlists?part=id';
	
		params.channel = params.channel || this.channel;
		if ( !params.channel ) {
			return;
		} else if ( params.page ) {
			if ( !self.pages[params.page] ) {
				return Promise.reject('no page');
			}
			url += '&pageToken=' + self.pages[params.page];
		}
		url += '&channelId=' + params.channel.id + '&maxResults=' + params.count;
	
		return api.request('GET', url).then(function ( data ) {
			data = JSON.parse(data);
			if ( data.nextPageToken ) {
				self.pages[params.page + 1] = data.nextPageToken;
			}
			if ( data.prevPageToken ) {
				self.pages[params.page - 1] = data.prevPageToken;
			}
			return data.items;
		});
	};
	
	
	ChannelModel.prototype.getTotalInfoPlaylists = function ( params ) {
		var self = this,
			url = 'playlists?part=snippet';
	
		params.channel = params.channel === undefined ? this.channel : params.channel;
	
		if ( params.page ) {
			if ( !self.pages[params.page] ) {
				return Promise.reject('no page');
			}
			url += '&pageToken=' + self.pages[params.page];
		}
		if ( params.channel ) {
			url += '&channelId=' + params.channel.id;
		} else if ( params.id !== undefined && params.id.length > 0 ) {
			url += '&id=' + params.id;
		} else {
			return Promise.resolve([]);
		}
		if ( params.count !== undefined ) {
			url += '&maxResults=' + params.count;
		}
	
		return api.request('GET', url).then(function ( data ) {
			data = JSON.parse(data);
			if ( data.nextPageToken ) {
				self.pages[params.page + 1] = data.nextPageToken;
			}
			if ( data.prevPageToken ) {
				self.pages[params.page - 1] = data.prevPageToken;
			}
			//debug.info(self.pages, 'PAGES');
			return data.items;
		});
	};
	
	
	ChannelModel.prototype.getChannelBackground = function ( channel ) {
		channel = channel || this.channel;
	
		return api.request('GET', 'channels?part=brandingSettings&id=' + channel.id).then(function ( data ) {
			data = JSON.parse(data);
			return data.items[0].brandingSettings.image.bannerTvImageUrl;
		});
	};
	
	
	//ChannelModel.prototype.countPlaylistItems = function ( playlistId ) {
	//	return api.request('GET', 'playlistItems?part=id&playlistId=' + playlistId).then(function ( data ) {
	//		data = JSON.parse(data);
	//		return data.pageInfo.totalResults;
	//	});
	//};
	
	
	//ChannelModel.prototype.getPlayListItems = function ( params ) {
	//	var self = this,
	//		videos = [],
	//		map = {},
	//		ids = '';
	//
	//	return api.request('GET', 'playlistItems?part=snippet&playlistId=' + params.playlistId + '&maxResults=30')
	//		.then(function (data) {
	//			try {
	//				data = JSON.parse(data);
	//				data.items.forEach(function ( item ) {
	//					ids += item.snippet.resourceId.videoId + ',';
	//					map[item.snippet.resourceId.videoId] = videos.length;
	//					videos.push({
	//						value: 1,
	//						id: item.snippet.resourceId.videoId,
	//						channelTitle: params.channel.title,
	//						duration: '',
	//						viewCount: 0,
	//						publishedAt: item.snippet.publishedAt,
	//						dimension: '',
	//						definition: '',
	//						title: '',
	//						icon: item.snippet.thumbnails['high'].url,
	//						channelId: item.snippet.channelId,
	//						locale: {
	//							publishedAt: '',
	//							viewCount: '',
	//							channelTitle: l10nAuthor + ': ' + params.channel.title
	//						}
	//					});
	//				});
	//			} catch ( e ) {
	//				//debug.log(e);
	//			}
	//			return self.getMovies(ids.substr(0, ids.length - 1)).then(function ( response ) {
	//				var currentDate = +new Date(),
	//					video, size, i;
	//
	//				size = response.length;
	//				for ( i = 0; i < size; ++i ) {
	//					video = videos[map[response[i].id]];
	//					video.viewCount = response[i].statistics.viewCount;
	//					video.dimension = response[i].contentDetails.dimension;
	//					video.definition = response[i].contentDetails.definition;
	//					video.title = response[i].snippet.localized.title;
	//					video.duration = api.normalizeVideoDuration(response[i].contentDetails.duration);
	//					video.locale.publishedAt = timeDiff(video.publishedAt, currentDate);
	//					video.locale.viewCount = gettext('views', {smart_count: video.viewCount}) + ' ' + video.viewCount;
	//				}
	//				cache.set(cacheKey(params), videos, 60 * 1000 * 5);
	//				return videos;
	//			});
	//		});
	//};
	//
	//ChannelModel.prototype.getMovies = function ( id ) {
	//	if ( DEBUG ) {
	//		if ( !id ) { throw 'no id field'; }
	//		if ( id.length === 0 ) { throw 'empty id field'; }
	//	}
	//	return api.request('GET', 'videos?part=statistics,contentDetails,snippet&id=' + id).then(function ( data ) {
	//		return JSON.parse(data).items;
	//	});
	//};
	
	
	ChannelModel.prototype.init = function ( params ) {
		var changed = false;
	
		if ( params.channel !== undefined ) {
			if ( !this.channel ) {
				changed = true;
				this.channel = params.channel;
			} else if ( this.channel && this.channel.id !== params.channel.id ) {
				changed = true;
				this.channel = params.channel;
			}
		}
		if ( params.mode && this.mode !== params.mode ) {
			this.mode = params.mode;
		}
	
		if ( changed ) {
			this.pages = {};
			this.emit('content:changed', params);
			return true;
		}
		return false;
	};
	
	// public export
	module.exports = ChannelModel;


/***/ }),
/* 54 */
/*!**********************************************!*\
  !*** ./src/js/modules/api/model/playlist.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Base video data provider base model.
	 *
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 */
	
	'use strict';
	
	var Promise = __webpack_require__(/*! ../../promise */ 32),
	
		Emitter = __webpack_require__(/*! cjs-emitter */ 4),
	
		api   = __webpack_require__(/*! ./../client.js */ 31),
	
		l10n = false,
		timeDiff,
		l10nAuthor,
	
		cache          = __webpack_require__(/*! ../../util/cache */ 55);
	
	
	function cacheKey ( params ) {
		if ( params && params.playlist ) {
			return 'pid:' + params.playlist.id + ';p:' + params.page;
		}
		return 'PLAYLIST';
	}
	
	
	/**
	 *
	 * @constructor
	 *
	 * @param {Object} config init config
	 */
	function PlaylistModel ( config ) {
		this.pages = {};
	
		this.playlist = null;
	
		Emitter.call(this);
	
		config = config || {};
	
		if ( config.events !== undefined ) {
			this.addListeners(config.events);
		}
	
		this.init(config);
	}
	
	// inheritance
	PlaylistModel.prototype = Object.create(Emitter.prototype);
	PlaylistModel.prototype.constructor = PlaylistModel;
	
	PlaylistModel.prototype.getPage = function ( params ) {
		var self = this,
			fromCache;
	
		params.playlist = params.playlist || this.playlist;
		params.page = +params.page || 0;
		params.count = params.count || 20;
	
		return new Promise(function ( resolve, reject ) {
			fromCache = cache.get(cacheKey(params));
			if ( fromCache ) {
				resolve(fromCache);
			} else {
				if ( !params.playlist.id ) {
					reject(params);
					return;
				}
				self.getPlayListItems(params).then(resolve, reject);
			}
		});
	};
	
	
	//PlaylistModel.prototype.countPlaylistItems = function ( playlistId ) {
	//	return api.request('GET', 'playlistItems?part=id&playlistId=' + playlistId).then(function ( data ) {
	//		data = JSON.parse(data);
	//		return data.pageInfo.totalResults;
	//	});
	//};
	
	
	PlaylistModel.prototype.getPlayListItems = function ( params ) {
		var self = this,
			videos = [],
			ids = '',
			url = 'playlistItems?part=snippet&playlistId=' + params.playlist.id + '&maxResults=' + (params.count || 30);
	
		params.page = +params.page || 0;
	
		if ( !l10n ) {
			l10n = __webpack_require__(/*! ../../util/l10n */ 56);
			timeDiff = __webpack_require__(/*! ../../util/time.diff */ 59);
			l10nAuthor = gettext('Author');
		}
	
		if ( params.page ) {
			if ( !self.pages[params.page] ) {
				return Promise.reject();
			}
			url += '&pageToken=' + self.pages[params.page];
		}
	
		return api.request('GET', url)
			.then(function (data) {
				try {
					data = JSON.parse(data);
					if ( data.nextPageToken ) {
						self.pages[params.page + 1] = data.nextPageToken;
					}
					if ( data.prevPageToken ) {
						self.pages[params.page - 1] = data.prevPageToken;
					}
					data.items.forEach(function ( item ) {
						ids += item.snippet.resourceId.videoId + ',';
					});
				} catch ( e ) {
					//debug.log(e);
				}
				//debug.info(data, 'QQQQQQQQQQQQQQQ');
				return self.getMovies(ids.substr(0, ids.length - 1)).then(function ( data ) {
					var currentDate = +new Date(),
						size, i;
	
					size = data.length;
					for ( i = 0; i < size; ++i ) {
						videos.push({
							value: 1,
							id: data[i].id,
							channelTitle: data[i].snippet.channelTitle,
							duration: api.normalizeVideoDuration(data[i].contentDetails.duration),
							realDuration: data[i].contentDetails.duration,
							viewCount: data[i].statistics.viewCount,
							publishedAt: data[i].snippet.publishedAt,
							dimension: data[i].contentDetails.dimension,
							definition: data[i].contentDetails.definition,
							title: data[i].snippet.localized.title,
							icon: data[i].snippet.thumbnails['high'].url,
							channelId: data[i].snippet.channelId,
							type: 'video',
							locale: {
								publishedAt: timeDiff(data[i].snippet.publishedAt, currentDate),
								viewCount: data[i].statistics.viewCount + ' ' + ngettext('view', 'views', +data[i].statistics.viewCount),
								channelTitle: l10nAuthor + ': ' + data[i].snippet.channelTitle
							}
						});
					}
					cache.set(cacheKey(params), videos, 60 * 1000 * 5);
					return videos;
				});
			});
	};
	
	PlaylistModel.prototype.getMovies = function ( id ) {
		var result = [],
			video, ids, i, size;
	
	//	if ( DEBUG ) {
	//		if ( !id ) { throw 'no id field ' + id; }
	//		if ( id.length === 0 ) { throw 'empty id field'; }
	//	}
		ids = id.split(',');
		for ( i = 0, size = ids.length; i < size; ++i ) {
			if ( video = cache.get('vid:' + ids[i]) ) {
				result.push(video);
			}
		}
	
		return api.request('GET', 'videos?part=statistics,contentDetails,snippet&id=' + id).then(function ( data ) {
			data = JSON.parse(data).items;
	
			for ( i = 0, size = data.length; i < size; ++i ) {
				cache.set('vid:' + data[i].id, data[i], 1000 * 60);
			}
			return data;
		});
	};
	
	
	PlaylistModel.prototype.init = function ( params ) {
		if ( params.playlist !== undefined ) {
			if ( !this.playlist ) {
				this.playlist = params.playlist;
			} else if ( this.playlist && this.playlist.id !== params.playlist.id ) {
				this.playlist = params.playlist;
			}
			this.pages = {};
			this.emit('content:changed', params);
			return true;
		}
		return false;
	};
	
	// public export
	module.exports = PlaylistModel;


/***/ }),
/* 55 */
/*!**************************************!*\
  !*** ./src/js/modules/util/cache.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	///**
	// * Cache class
	// * @constructor
	// */
	//function Cache () {
	//	this.store = {};
	//	this.size = 0;
	//}
	//
	///**
	// * Insert or overwrite data
	// *
	// * @param {string} key
	// * @param {mixed} value
	// * @param {number} ttl   Time to live in milliseconds (optional)
	// */
	//Cache.prototype.set = function ( key, value, ttl ) {
	//	var self = this, record, oldRecord;
	//
	//	if ( DEBUG ) {
	//		if ( typeof key === 'undefined' ) throw 'required argument key is undefined';
	//		if ( typeof value === 'undefined' ) throw 'required argument value is undefined';
	//		debug.log('set ' + key + ' to cache');
	//	}
	//
	//	// Clear timeout on existing record
	//	oldRecord = this.store[key] ? this.store[key] : undefined;
	//	if ( oldRecord && oldRecord.timeout ) {
	//		clearTimeout(oldRecord.timeout);
	//	}
	//
	//	// Set value + timeout on new record
	//	record = {value: value, timeout: -1};
	//	if ( typeof ttl === 'number' ) {
	//		record.timeout = setTimeout(function () {
	//			self.remove(key);
	//		}, ttl);
	//	}
	//	this.store[key] = record;
	//	++this.size;
	//};
	//
	//
	///**
	// * Get cached data
	// *
	// * @param {string} key
	// * @param {function} callback  Return value in callback if records exists locally or on external resource (optional)
	// * @return {mixed} value Only returned if callback is undefined
	// */
	//Cache.prototype.get = function ( key, callback ) {
	//	if ( DEBUG ) {
	//		if ( typeof key === 'undefined' ) throw 'Required argument key is undefined';
	//	}
	//	if ( this.store[key] ) {
	//		if ( DEBUG ) {
	//			debug.log('key ' + key + ' is in cache');
	//		}
	//		if ( typeof callback === 'function' ) {
	//			callback(this.store[key].value);
	//		} else {
	//			return this.store[key].value;
	//		}
	//	} else {
	//		if ( DEBUG ) {
	//			debug.log('key ' + key + ' is not in cache');
	//		}
	//		return false;
	//	}
	//};
	//
	//
	///**
	// * Delete cached data
	// *
	// * @param {string} key
	// * @return {boolean} Returns true if record existed
	// */
	//Cache.prototype.remove = function ( key ) {
	//	if ( DEBUG ) {
	//		if ( typeof key === 'undefined' ) throw 'Required argument key is undefined';
	//		debug.log('remove ' + key + ' from cache');
	//	}
	//
	//	--this.size;
	//	this.store[key] = null;
	//};
	//
	//
	///**
	// * Clear cached data
	// *
	// * @return {number} Returns number of cleared records
	// */
	//Cache.prototype.clear = function () {
	//	var size = this.size;
	//	this.store = {};
	//	return size;
	//};
	//
	//
	//if ( DEBUG ) {
	//	/**
	//	 * Retrieve internal store
	//	 *
	//	 * @return {object}
	//	 */
	//	Cache.prototype.debug = function () {
	//		return this.store;
	//	};
	//}
	
	
	/**
	* Cache singleton.
	*
	* @constructor
	*/
	var cache = {
		store: {},
		size: 0,
	
		/**
		 * Insert or overwrite data
		 *
		 * @param {string} key item key
		 * @param {*} value item value
		 * @param {number} ttl   Time to live in milliseconds (optional)
		 */
		set: function ( key, value, ttl ) {
			var self = this, record, oldRecord;
	
			if ( false ) {
				if ( typeof key === 'undefined' ) { throw 'required argument key is undefined'; }
				if ( typeof value === 'undefined' ) { throw 'required argument value is undefined'; }
			}
	
			// Clear timeout on existing record
			oldRecord = this.store[key] ? this.store[key] : undefined;
			if ( oldRecord && oldRecord.timeout ) {
				clearTimeout(oldRecord.timeout);
			}
	
			// Set value + timeout on new record
			record = {value: value, timeout: -1};
			if ( typeof ttl === 'number' ) {
				record.timeout = setTimeout(function () {
					self.remove(key);
				}, ttl);
			}
			this.store[key] = record;
			++this.size;
		},
	
		/**
		 * Get cached data
		 *
		 * @param {string} key item key
		 * @param {function=null} callback  Return value in callback if records exists locally or on external resource (optional)
		 *
		 * @return {*} value Only returned if callback is undefined
		 */
		get: function ( key, callback ) {
			if ( false ) {
				if ( typeof key === 'undefined' ) { throw 'Required argument key is undefined'; }
			}
			if ( this.store[key] ) {
				if ( false ) {
					//debug.log('key ' + key + ' is in cache');
				}
				if ( typeof callback === 'function' ) {
					callback(this.store[key].value);
				} else {
					return this.store[key].value;
				}
			} else {
				if ( false ) {
					//debug.log('key ' + key + ' is not in cache');
				}
				return false;
			}
		},
	
		/**
		 * Delete cached data
		 *
		 * @param {string} key item key
		 * @return {boolean} Returns true if record existed
		 */
		remove: function ( key ) {
			if ( false ) {
				if ( typeof key === 'undefined' ) { throw 'Required argument key is undefined'; }
				//debug.log('remove ' + key + ' from cache');
			}
	
			--this.size;
			this.store[key] = null;
		},
	
		/**
		 * Clear cached data
		 *
		 * @return {number} Returns number of cleared records
		 */
		clear: function () {
			var size = this.size;
	
			this.store = {};
			return size;
		}
	};
	
	if ( false ) {
		/**
		 * Retrieve internal store
		 *
		 * @return {object} all cached data
		 */
		cache.debug = function () {
			return this.store;
		};
	}
	
	module.exports = cache;


/***/ }),
/* 56 */
/*!*************************************!*\
  !*** ./src/js/modules/util/l10n.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var lang = __webpack_require__(/*! ../../../../config/lang */ 29),
		config = __webpack_require__(/*! ../../../../config/app */ 30);
	
	module.exports = {
		languageIndex: 0,
		nextLang: function ( language ) {
			if ( false ) {
				if ( typeof language !== 'number' ) { throw 'language is not a number'; }
				if ( typeof language < 0 ) { throw 'language is wrong value'; }
			}
			if ( language === lang.languages.length - 1 ) {
				return 0;
			}
			return ++language;
		},
		setLang: function ( language ) {
			var self = this;
	
			__webpack_require__(/*! spa-gettext */ 57).load({name: language}, function ( error ) {
				if ( error ) {
					debug.inspect(error, 'gettext load error');
					self.languageIndex = -1;
				} else {
					self.languageIndex = lang.languages.indexOf(language);
				}
				if ( self.languageIndex === -1 ) {
					self.languageIndex = lang.languages.indexOf(config.defaultSettings.language);
				}
			});
		}
	};


/***/ }),
/* 57 */
/*!********************************!*\
  !*** ./~/spa-gettext/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Emitter = __webpack_require__(/*! cjs-emitter */ 4),
	    Gettext = __webpack_require__(/*! cjs-gettext */ 58),
	    loader  = new Emitter();
	
	
	/**
	 * Wrap the given data with gettext instance
	 * and export methods to the global scope.
	 *
	 * @param {Object} [data] localization data
	 *
	 * @return {Gettext} gettext instance
	 */
	function prepare ( data ) {
	    var gettext = new Gettext(data);
	
	    // make it global
	    window.gettext  = window._ = gettext.gettext;
	    window.pgettext = gettext.pgettext;
	    window.ngettext = gettext.ngettext;
	
	    return gettext;
	}
	
	
	/**
	 * Main application language
	 */
	loader.defaultLanguage = 'en';
	
	
	/**
	 * Simple gettext implementation.
	 *
	 * @param {Object} config options
	 * @param {string} [config.path=lang] relative path to project root
	 * @param {string} config.name language name
	 * @param {string} [config.ext=json] language file extension
	 * @param {function} callback hook on ready
	 *
	 * @return {boolean} flag is ajax request was made
	 */
	loader.load = function ( config, callback ) {
	    var xhr;
	
	    if ( true ) {
	        if ( !config.name || typeof config.name !== 'string' ) {
	            throw new Error(__filename + ': config.name must be a nonempty string');
	        }
	        if ( typeof callback !== 'function' ) {
	            throw new Error(__filename + ': wrong callback type');
	        }
	    }
	
	    // defaults
	    config.ext  = config.ext  || 'json';
	    config.path = config.path || 'lang';
	
	    // is it necessary to request a localization file?
	    if ( config.name === loader.defaultLanguage ) {
	        // no
	        prepare();
	        callback(null);
	
	        return false;
	    }
	
	    // yes
	    xhr = new XMLHttpRequest();
	
	    xhr.onload = function () {
	        var json;
	
	        try {
	            json = JSON.parse(xhr.responseText);
	
	            prepare(json);
	            callback(null);
	
	            // there are some listeners
	            if ( loader.events['load'] ) {
	                // notify listeners
	                loader.emit('load');
	            }
	        } catch ( error ) {
	            xhr.onerror(error);
	        }
	    };
	
	    xhr.ontimeout = xhr.onerror = function ( error ) {
	        prepare();
	        callback(error);
	
	        // there are some listeners
	        if ( loader.events['error'] ) {
	            // notify listeners
	            loader.emit('error', error);
	        }
	    };
	
	    xhr.open('GET', config.path + '/' + config.name + '.' + config.ext, true);
	    xhr.send(null);
	
	    return true;
	};
	
	
	// public
	module.exports = loader;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-gettext/index.js"))

/***/ }),
/* 58 */
/*!********************************!*\
  !*** ./~/cjs-gettext/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	
	/**
	 * Translations handler.
	 *
	 * @constructor
	 *
	 * @param {Object} config init parameters
	 */
	function Gettext ( config ) {
	    var data, meta;
	
	    // sanitize
	    config   = config || {};
	    data     = config.data || {};
	    data[''] = data[''] || {};
	
	    // shortcut
	    meta = config.meta;
	
	    /**
	     * Display the native language translation of a textual message.
	     *
	     * @param {string} msgId textual message
	     *
	     * @return {string} translated text
	     */
	    this.gettext = function ( msgId ) {
	        return data[''][msgId] || msgId;
	    };
	
	
	    /**
	     * The "p" in "pgettext" stands for "particular": fetches a particular translation of the textual message.
	     *
	     * @param {string} context message context
	     * @param {string} msgId textual message
	     *
	     * @return {string} translated text
	     */
	    this.pgettext = function ( context, msgId ) {
	        return data[context] && data[context][msgId] || msgId;
	    };
	
	
	    /**
	     * Display the native language translation of a textual message whose grammatical form depends on a number.
	     *
	     * @param {string} msgId textual message in a singular form
	     * @param {string} plural textual message in a plural form
	     * @param {number} value message number
	     *
	     * @return {string} translated text
	     */
	    this.ngettext = function ( msgId, plural, value ) {
	        /* eslint no-unused-vars: 0 */
	        /* eslint no-eval: 0 */
	        /* eslint id-length: 0 */
	        var n, evalResult;
	
	        if ( true ) {
	            if ( Number(value) !== value ) {
	                throw new Error(__filename + ': value must be a number');
	            }
	        }
	
	        if ( data && meta && data[''][msgId] ) {
	            evalResult = eval('n = ' + value + '; ' + meta.plural);
	
	            if ( typeof evalResult === 'boolean' ) {
	                evalResult = +evalResult;
	            }
	
	            // translation
	            return data[''][msgId][evalResult];
	        }
	
	        // english
	        return value === 1 ? msgId : plural;
	    };
	}
	
	
	// correct constructor name
	Gettext.prototype.constructor = Gettext;
	
	
	// public
	module.exports = Gettext;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/cjs-gettext/index.js"))

/***/ }),
/* 59 */
/*!******************************************!*\
  !*** ./src/js/modules/util/time.diff.js ***!
  \******************************************/
/***/ (function(module, exports) {

	/**
	 * Convert time in seconds for better human readability.
	 *
	 */
	
	'use strict';
	
	module.exports = function ( dateStr, to  ) {
		var date, parts, number;
	
		if ( !dateStr ) {
			return dateStr;
		}
		parts = dateStr.match(/(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d\d\d)Z/);
		parts.shift(); // remove full string
		parts.pop(); // remove 000 in the end
		date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
		date.setTime(to - date.getTime());
		dateStr = date.getTime();
		if ( date.getFullYear() > 1970 ) {
			number = date.getFullYear() - 1970;
			dateStr = number + ' ' + ngettext('year', 'years', +number) + ' ' + gettext('ago');
		} else if ( date.getMonth() > 0 ) {
			number = date.getMonth() + 1;
			dateStr = number + ' ' + ngettext('month', 'months', +number) + ' ' + gettext('ago');
		} else if ( date.getDate() > 1 ) {
			number = date.getDate();
			dateStr = number + ' ' + ngettext('day', 'days', +number) + ' ' + gettext('ago');
		} else if ( date.getHours() > 0 )  {
			number = date.getHours();
			dateStr = number + ' ' + ngettext('hour', 'hours', +number) + ' ' + gettext('ago');
		} else if ( date.getMinutes() > 0 ) {
			number = date.getMinutes();
			dateStr = number + ' ' + ngettext('minute', 'minutes', +number) + ' ' + gettext('ago');
		} else {
			number = date.getSeconds();
			dateStr = number + ' ' + ngettext('second', 'seconds', +number) + ' ' + gettext('ago');
		}
		return dateStr;
	};


/***/ }),
/* 60 */
/*!**********************************************!*\
  !*** ./src/js/modules/api/model/channels.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Base video data provider base model.
	 *
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 */
	
	'use strict';
	
	var Promise = __webpack_require__(/*! ../../promise */ 32),
	
		Emitter = __webpack_require__(/*! cjs-emitter */ 4),
	
		api   = __webpack_require__(/*! ./../client.js */ 31),
	
		cache = __webpack_require__(/*! ../../util/cache */ 55),
	
		provider = new Emitter();
	
	
	provider.activeCategory = {};
	provider.pages = {};
	provider.ownChannel = null;
	
	/**
	* Try to get data from cache.
	*
	* @param {object} params data range info
	* @param {number} params.category data range offset
	* @param {number} params.page data range count
	*
	* @return {string} cache key
	*/
	provider.cacheKey = function ( params ) {
		return 'c:' + params.category.id + ';p:' + params.page;
	};
	
	
	provider.getPage = function ( params ) {
		var self = this,
			fromCache, url;
	
		params.page = +params.page || 0;
		params.category = params.category || this.activeCategory;
	
		return new Promise(function ( resolve, reject ) {
			fromCache = cache.get(self.cacheKey(params));
			if ( fromCache ) {
				resolve(fromCache);
			} else {
				url = 'channels?part=snippet&categoryId=' + params.category.id + '&maxResults=' + params.count;
	
				if ( params.page ) {
					////debug.log('getPage ' + params.page);
					if ( self.pages[params.page] ) {
						url += '&pageToken=' + self.pages[params.page];
					} else if ( self.activeCategory.totalResults === params.page) {
						reject('overflow');
						return;
					} else {
						//debug.log('no page ' + params.page);
						reject('no page');
						return;
					}
				}
				api.request('GET', url).then(function ( data ) {
					var channels = [],
						i, size;
	
					data = JSON.parse(data);
					if ( data.pageInfo.totalResults ) {
						self.activeCategory.totalResults = data.pageInfo.totalResults;
					}
					if ( data.nextPageToken ) {
						self.pages[params.page + 1] = data.nextPageToken;
					}
					if ( data.prevPageToken ) {
						self.pages[params.page - 1] = data.prevPageToken;
					}
	
					data = data.items;
					size = data.length;
					for ( i = 0; i < size; ++i ) {
						channels.push({
							value: data[i].id,
							id: data[i].id,
							title: data[i].snippet.localized.title,
							icon: data[i].snippet.thumbnails['high'].url
						});
					}
					cache.set(self.cacheKey(params), channels, 5 * 60 * 1000);
					resolve(channels);
				})['catch'](function ( e ) {
					//debug.info(e);
				});
			}
		});
	};
	
	
	provider.getInfo = function ( id ) {
		return new Promise(function ( resolve, reject ) {
			api.request('GET', 'channels?part=snippet&id=' + id).then(function ( data ) {
				resolve(JSON.parse(data).items);
			}, reject);
		});
	};
	
	
	provider.getMine = function () {
		return new Promise(function ( resolve, reject ) {
			if ( provider.ownChannel !== null ) {
				resolve(provider.ownChannel);
			} else {
				api.request('GET', 'channels?part=snippet&mine=true').then(function ( data ) {
					provider.ownChannel = JSON.parse(data).items[0];
					provider.ownChannel.title = provider.ownChannel.snippet.title;
					provider.ownChannel.icon = provider.ownChannel.snippet.thumbnails['default'].url;
					api.ownChannel = provider.ownChannel;
					resolve(provider.ownChannel);
				}, reject);
			}
		});
	};
	
	
	provider.setActiveCategory = function ( category ) {
		if ( category && this.activeCategory.id !== category.id ) {
			this.activeCategory = category;
			this.pages = {};
			if ( this.events['category:changed'] !== undefined ) {
				this.emit('category:changed', category);
			}
			return true;
		}
		return false;
	};
	
	// public export
	module.exports = provider;


/***/ }),
/* 61 */
/*!*************************************************************!*\
  !*** ./src/js/components/page.main/tabs/channel.content.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys   = __webpack_require__(/*! stb-keys */ 27),
		app		= __webpack_require__(/*! mag-app */ 1),
		// router = require('../../../temp/router'),
	
		Panel = __webpack_require__(/*! stb-component-panel */ 47),
		List  = __webpack_require__(/*! mag-component-list */ 44),
	
		ListMovies  = __webpack_require__(/*! ./../../list.videos.js */ 51),
	
		ChannelModel  = __webpack_require__(/*! ../../../modules/parser/models/channel */ 62),
	
		player 	= __webpack_require__(/*! ../../../modules/player */ 50),
		// PlaylistModel  = require('../../../modules/api/model/playlist'),
	
		l10n = __webpack_require__(/*! ../../../modules/util/l10n */ 56),
	
		listMenu = __webpack_require__(/*! ../list.menu */ 43),
	
		lists = [],
	
		panel = new Panel({
			$node: document.getElementById('pmTabChannelContent'),
			className: 'tab hidden',
			visible: false,
			events: {
				focus: function () {
					lists[activeList].focus();
				}
			}
		}),
	
		loader = __webpack_require__(/*! ../../loader */ 41),
	
		$page = document.getElementById('pm'),
		$channelTitle = document.getElementById('pmChannelTitle'),
		$channelIcon = document.getElementById('pmChannelIcon'),
	
		bottomListTopValue = 0,
		topListTopValue    = 0,
	
		topList = 0,
		bottomList = 1,
	
		activeList = 0,
	
		topPageNumber = 0,
		bottomPageNumber = 1,
	
		loadTimeout = -1,
		blockMove = true,
	
		channelModel = new ChannelModel(),
		channel = {id: null, title: null};
	
	
	function moveLists ( sourceListNumber, isGoingUp ) {
		var targetList = sourceListNumber ^ 1;
	
		//debug.info(blockMove, 'blockMove');
		if ( blockMove ) {
			if ( false ) {
				if ( isGoingUp ) {
					//debug.log(topPageNumber - 1, 'topPageNumber');
				} else {
					//debug.log(bottomPageNumber - 1, 'bottomPageNumber');
				}
			}
			return;
		}
		if ( isGoingUp ) {
			////debug.log('TRY TO LOAD UP PAGE ' + (topPageNumber - 1));
			blockMove = true;
			channelModel.getPage({page: (topPageNumber - 1), count: 1},/*).then(*/function ( error, data ) {
				--topPageNumber;
				--bottomPageNumber;
	
				// lists[targetList].model.filter({channel: response[0]});
				topList = targetList;
				bottomList = sourceListNumber;
				activeList = targetList;
	
				lists[targetList].data = data;
				lists[targetList].viewIndex = null;
				lists[targetList].renderView(0);
				// lists[targetList].focusIndex(0);
				lists[targetList].emit('view:ready');
			}/*, function ( error ) {
				//debug.log(error);
			}*/);
		} else {
			if ( lists[bottomList].data.length === 0 ) {
				lists[sourceListNumber].emit('view:ready');
				return;
			}
			blockMove = true;
			channelModel.getPage({page: (bottomPageNumber + 1), count: 1}/* ).then */, function ( error, data ) {
	
				if ( !data ) {
					lists[sourceListNumber].emit('view:ready');
					return;
				}
				if ( error || data.length === 0 ) {
					++topPageNumber;
					++bottomPageNumber;
					// lists[sourceListNumber].model.filter({channel: {id: '!', title: ''}});
					lists[sourceListNumber].data = [];
					lists[sourceListNumber].viewIndex = null;
					lists[sourceListNumber].renderView(0);
					// lists[sourceListNumber].focusIndex(0);
					lists[sourceListNumber].$title.innerHTML = '';
					topList = targetList;
					bottomList = sourceListNumber;
					activeList = targetList;
					lists[topList].$node.style.top = topListTopValue;
					lists[bottomList].$node.style.top = bottomListTopValue;
					lists[activeList].focus();
					lists[sourceListNumber].emit('view:ready');
				} else {
					++topPageNumber;
					++bottomPageNumber;
	
					// lists[sourceListNumber].model.filter({channel: response[0]});
	
					topList = targetList;
					bottomList = sourceListNumber;
					activeList = targetList;
					lists[sourceListNumber].data = data;
					lists[sourceListNumber].viewIndex = null;
					lists[sourceListNumber].renderView(0);
					// lists[sourceListNumber].focusIndex(0);
					lists[sourceListNumber].emit('view:ready');
					lists[activeList].focus();
				}
			});
		}
	}
	
	
	channelModel.addListener('content:changed', function () {
		clearTimeout(loadTimeout);
		loadTimeout = setTimeout(function () {
			loader.hide();
		}, 10000);
		if ( lists.length === 0 ) {
			lists.push(new ListMovies({
				$node:document.getElementById('pmListChannelVideos0Node'),
				$body:document.getElementById('pmListChannelVideos0Body'),
				$title:document.getElementById('pmChannelTitle0'),
				// model: new PlaylistModel(),
				className: 'listMovie0Node',
				size: 5,
				viewIndex: 0,
				focusIndex: 0,
				type: List.prototype.TYPE_HORIZONTAL,
				events: {
					overflow: function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
						}
					},
					'view:ready': function () {
						panel.focusEntry = lists[activeList];
						lists[topList].$node.style.top = topListTopValue;
						if ( lists[bottomList] ) {
							lists[bottomList].$node.style.top = bottomListTopValue;
						}
						// this.$title.innerHTML = this.model.channel.title;
						this.$title.innerHTML = '';
						if ( lists[activeList] && lists[activeList].data.length > 0 && lists[activeList].data[0].value ) {
							loader.hide();
							clearTimeout(loadTimeout);
						}
						this.show();
						lists[activeList].focus();
						blockMove = false;
	
						// panel.focusEntry = lists[activeList];
						// lists[topList].$node.style.top = topListTopValue;
						// if ( lists[bottomList] ) {
						// 	lists[bottomList].$node.style.top = bottomListTopValue;
						// }
						// // this.$title.innerHTML = this.model.playlist.title;
						// this.show();
						// loader.hide();
						// clearTimeout(loadTimeout);
						// lists[activeList].focus();
						// blockMove = false;
					},
					'view:error': function ( error ) {
						blockMove = false;
						if ( error === 'empty' ) {
							this.data = [{
								id:'',
								value: '',
								publishedAt: '',
								icon: 'img/no.image.png',
								duration: '',
								title: gettext('No videos'),
								channelTitle: '',
								viewCount: '',
								locale: {
									publishedAt: '',
									viewCount: '',
									channelTitle: ''
								}
							}];
							this.viewIndex = null;
							this.renderView(0);
							// this.focusIndex(0);
							panel.focusEntry = lists[activeList];
							lists[topList].$node.style.top = topListTopValue;
							if ( lists[bottomList] ) {
								lists[bottomList].$node.style.top = bottomListTopValue;
							}
							// this.$title.innerHTML = this.model.playlist.title;
							this.show();
							loader.hide();
							clearTimeout(loadTimeout);
							lists[activeList].focus();
						} else if ( topPageNumber === 0 ) {
							moveLists(0, false);
						}
					},
					'click:item': function ( event ) {
						if ( event.$item.data.id ) {
							player.setContent({
								channel: channel,
								video: event.$item.data,
								playlist: this.data,
								position: event.$item.index
							});
						}
					}
				}
			}));
			lists.push(new ListMovies({
				$node:document.getElementById('pmListChannelVideos1Node'),
				$body:document.getElementById('pmListChannelVideos1Body'),
				$title:document.getElementById('pmChannelTitle1'),
				// model: new PlaylistModel(),
				className: 'listMovie1Node',
				size: 5,
				viewIndex: 0,
				focusIndex: 0,
				type: List.prototype.TYPE_HORIZONTAL,
				events: {
					overflow: function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
						}
					},
					'view:ready': function () {
						panel.focusEntry = lists[activeList];
						lists[topList].$node.style.top = topListTopValue;
						if ( lists[bottomList] ) {
							lists[bottomList].$node.style.top = bottomListTopValue;
						}
						// this.$title.innerHTML = this.model.channel.title;
						this.$title.innerHTML = '';
						if ( lists[activeList] && lists[activeList].data.length > 0 && lists[activeList].data[0].value ) {
							loader.hide();
							clearTimeout(loadTimeout);
						}
						this.show();
						lists[activeList].focus();
						blockMove = false;
						// panel.focusEntry = lists[activeList];
						// lists[topList].$node.style.top = topListTopValue;
						// lists[bottomList].$node.style.top = bottomListTopValue;
						// // this.$title.innerHTML = this.model.playlist.title;
						// this.show();
						// loader.hide();
						// clearTimeout(loadTimeout);
						// lists[activeList].focus();
						// blockMove = false;
					},
					'view:error': function ( error ) {
						blockMove = false;
						if ( error === 'empty' ) {
							this.data = [{
								id:'',
								value: '',
								publishedAt: '',
								icon: ' ',
								duration: '',
								title: ' ',
								channelTitle: '',
								viewCount: '',
								locale: {
									publishedAt: '',
									viewCount: '',
									channelTitle: ''
								}
							}];
							this.viewIndex = null;
							this.renderView(0);
							this.focusIndex(0);
							panel.focusEntry = lists[activeList];
							lists[topList].$node.style.top = topListTopValue;
							if ( lists[bottomList] ) {
								lists[bottomList].$node.style.top = bottomListTopValue;
							}
							this.$title.innerHTML = this.model.channel.title ? this.model.channel.title : '&nbsp;';
							this.show();
							loader.hide();
							clearTimeout(loadTimeout);
							lists[activeList].focus();
						}
					},
					'click:item': function ( event ) {
						if ( event.$item.data.id ) {
							player.setContent({
								channel: channel,
								video: event.$item.data,
								playlist: this.data,
								position: event.$item.index
							});
						}
					}
				}
			}));
	
			//topListTopValue = window.getComputedStyle(lists[0].$node).getPropertyValue('top');
			panel.add(lists[0]);
			panel.add(lists[1]);
			lists[0].focus();
			lists[0].addListener('keydown', function ( event ) {
				if ( event.code === keys.down ) {
					moveLists(0, false);
				} else if ( event.code === keys.up ) {
					if ( topPageNumber > 0 ) {
						moveLists(0, true);
					}
				} else if ( event.code === keys.playPause ) {
					player.setContent({
						channel: this.model.channel,
						video: this.$focusItem.data,
						playlist: this.data,
						position: this.$focusItem.index
					});
				}
				//debug.log(event.stop);
			});
			lists[1].addListener('keydown', function ( event ) {
				if ( event.code === keys.down ) {
					moveLists(1, false);
				} else if ( event.code === keys.up ) {
					if ( topPageNumber > 0 ) {
						moveLists(1, true);
					}
				} else if ( event.code === keys.playPause ) {
					player.setContent({
						channel: this.model.channel,
						video: this.$focusItem.data,
						playlist: this.data,
						position: this.$focusItem.index
					});
				}
			});
			bottomListTopValue = window.getComputedStyle(lists[1].$node).getPropertyValue('top');
		}
		channelModel.getPage({page: 0, count: 1},/*).then(*/function ( error, data ) {
			topPageNumber = 0;
			topList = 0;
			bottomList = 1;
			bottomPageNumber = 1;
			activeList = 0;
			//debug.log(data[0].id, 'data[0].id')
			// lists[topList].model.init({
			// 	playlist: {
			// 		value: data[0].id,
			// 		id: data[0].id,
			// 		title: data[0].snippet.title,
			// 		icon: data[0].snippet.thumbnails['default'].url
			// 	}
			// });
			lists[topList].data = data;
			lists[topList].viewIndex = null;
			lists[topList].renderView(0);
			// lists[topList].focusIndex(0);
			lists[topList].emit('view:ready');
			lists[activeList].focus();
	
			channelModel.getPage({page: 1, count: 1},/*).then(*/function ( error, data ) {
				//debug.log(data[0].id, 'data[0].id')
				// lists[bottomList].model.init({
				// 	playlist: {
				// 		value: data[0].id,
				// 		id: data[0].id,
				// 		title: data[0].snippet.title,
				// 		icon: data[0].snippet.thumbnails['default'].url
				// 	}
				// });
				lists[bottomList].data = data;
				lists[bottomList].viewIndex = null;
				lists[bottomList].renderView(0);
				// lists[bottomList].focusIndex(0);
				lists[bottomList].emit('view:ready');
	
				lists[activeList].focus();
			}/*, function () {
				lists[1].hide();
			}*/);
		});
	});
	
	
	panel.activate = function ( newChannel ) {
		if ( !newChannel ) {
			return;
		}
		this.show();
		if ( lists.length ) {
			lists[activeList].focus();
		}
		// if ( channelModel.init({channel: channel}) ) {
		// 	lists[0].hide();
		// 	lists[1].hide();
		// 	$channelIcon.style.backgroundImage = 'url(' + channel.icon + ')';
		// 	$channelTitle.innerHTML = channel.title;
		// 	loader.show();
		// }
		channelModel.channelId = channel.id = newChannel.id;
		channelModel.getInfo({}, function ( error, info ) {
			if ( error ) {
	
				return;
			}
			info.background = info.background.split('=')[0] + '=w1920-fcrop64=1,00000000ffffffff-nd-c0xffffffff-rj-k-no';
			$page.style.backgroundImage = 'url(' + info.background + ')';
			$channelIcon.style.backgroundImage = 'url(' + info.icon + ')';
			channel.title = $channelTitle.innerHTML = info.title;
			channel.icon = info.icon;
			channelModel.emit('content:changed');
		});
	};
	
	module.exports = panel;


/***/ }),
/* 62 */
/*!*************************************************!*\
  !*** ./src/js/modules/parser/models/channel.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * youtube parser for main page
	 * @author bas
	 */
	
	'use strict';
	
	var tools   = __webpack_require__(/*! ./tools */ 63),
	    ajax    = tools.ajax,
	    Emitter = __webpack_require__(/*! cjs-emitter */ 4);
	
	/**
	 * Main page parser
	 *
	 * @param {string} textForParse html with video data
	 * @param {Object} channelInfo channel info
	 * @param {string} channelInfo.title channel title
	 * @param {string} channelInfo.id channel id
	 *
	 * @return {Array} videos
	 */
	function parserForChannelPage ( textForParse, channelInfo ) {
	    var items = [],
	        id, duration, viewCount, publishedAt, title, icon,
	        tmp, startIndex, endIndex, text, index;
	
	    // split by items
	    tmp = textForParse.split('channels-content-item');
	    // check each piece of html for video data
	    for ( index = 0; index < tmp.length; index++ ) {
	        text = tmp[index];
	
	        if ( text.indexOf('yt-lockup-video') === -1 ) {
	            continue; // this part of text don't have video block
	        }
	
	        // video/playlist thumbnail, example: "https://i.ytimg.com/vi/ktiONWfSL48/hqdefault.jpg?custom=true&w=196&jpgq=90&sp=68&sigh=e_W4dPkywvlYwi8av9yYdwHQi8Y"
	        startIndex = text.indexOf('="https://i.ytimg') + 2;
	        endIndex = text.indexOf('"', startIndex);
	        icon = text.substring(startIndex, endIndex);
	        // video id, example: "ktiONWfSL48"
	        startIndex = text.indexOf('data-context-item-id="') + 22;
	        endIndex = text.indexOf('"', startIndex);
	        id = text.substring(startIndex, endIndex);
	        // video duration, example: "11:59:59"
	        startIndex = text.indexOf('<span class="video-time" aria-hidden="true">') + 44;
	        startIndex = text.indexOf('>', startIndex) + 1;
	        endIndex = text.indexOf('</span>', startIndex);
	        duration = text.substring(startIndex, endIndex);
	        // views count, example: "10,000,002"
	        startIndex = text.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
	        endIndex = text.indexOf(' ', startIndex);
	        viewCount = text.substring(startIndex, endIndex);
	        // time passed since publishing, example: "1 month ago"
	        startIndex = text.indexOf('</li><li>', startIndex) + 9; // text not unique: need to use viewCount position
	        endIndex = text.indexOf('</li>', startIndex);
	        publishedAt = text.substring(startIndex, endIndex);
	        // video title, example: "Nasa LIVE stream - Earth From Space LIVE"
	        startIndex = text.indexOf('" href="/watch?v=') + 17;
	        startIndex = text.indexOf('>', startIndex) + 1;
	        endIndex = text.indexOf('</a><span', startIndex);
	        title = text.substring(startIndex, endIndex);
	
	        items.push({
	            value: 1,           // always 1, stb hack
	            id: id,
	            channelTitle: channelInfo.title,
	            duration: duration,
	            realDuration: duration,
	            viewCount: viewCount,
	            publishedAt: publishedAt,
	            dimension: '',      // not used by application
	            definition: '',     // not used by application
	            title: title,
	            icon: icon,
	            channelId: channelInfo.id,
	            type: 'video',
	            locale: {
	                publishedAt: publishedAt,
	                viewCount: viewCount,
	                channelTitle: channelInfo.title
	            }
	        });
	    }
	
	    return items;
	}
	
	/**
	 * @constructor
	 */
	function ChannelModel () {
	    Emitter.call(this);
	
	    this.channelId = null;
	
	    this.pages = {};
	}
	
	ChannelModel.prototype = Object.create(Emitter.prototype);
	ChannelModel.prototype.constructor = ChannelModel;
	
	/**
	 *
	 * @param {Object} params params
	 * @param {string} params.channelId channel id
	 * @param {function} callback callback
	 */
	ChannelModel.prototype.getInfo = function ( params, callback ) {
	    params = params || {};
	
	    if ( !params.channelId && this.channelId ) {
	        params.channelId = this.channelId;
	    }
	
	    if ( !params.channelId ) {
	        if ( true ) { console.log('error: field arguments[0].channelId is empty'); }
	        callback({message: 'error: field arguments[0].channelId is empty'}, {});
	        return; // eslint-disable-line
	    }
	
	    ajax('get', 'https://www.youtube.com/' + params.channelId + '/about', function ( data, status ) {
	        var startIndex, endIndex,
	            icon, subscribers, title, description, background;
	
	        if ( status !== 200 ) {
	            callback({message: 'request got bad http status (' + status + ')'}, {});
	            return; // eslint-disable-line
	        }
	
	        // get channel icon
	        startIndex = data.indexOf('img class="channel-header-profile-image" src="') + 46;
	        endIndex = data.indexOf('"', startIndex);
	        icon = data.substring(startIndex, endIndex);
	        // get channel subscribers count, example: "13,232"
	        startIndex = data.indexOf('yt-subscription-button-subscriber-count-branded-horizontal');
	        startIndex = data.indexOf('title="', startIndex) + 7;
	        endIndex = data.indexOf('"', startIndex);
	        subscribers = data.substring(startIndex, endIndex);
	        // get channel title
	        startIndex = data.indexOf('class="qualified-channel-title-text"');
	        startIndex = data.indexOf('title="', startIndex) + 7;
	        endIndex = data.indexOf('"', startIndex);
	        title = data.substring(startIndex, endIndex);
	        // get channel description
	        startIndex = data.indexOf('<div class="about-description');
	        endIndex = data.indexOf('<div class="about-metadata-label', startIndex);
	        description = data.substring(startIndex, endIndex);
	        // get channel background
	        startIndex = data.indexOf('.hd-banner-image {');
	        startIndex = data.indexOf('background-image: url(', startIndex) + 22;
	        endIndex = data.indexOf(');', startIndex);
	        background = 'http:' + data.substring(startIndex, endIndex);
	
	        callback(null, {
	            icon: icon,
	            subscribers: subscribers,
	            background: background,
	            title: title,
	            id: params.channelId,
	            description: description
	        });
	    });
	};
	
	/**
	 * Get parsed page data
	 *
	 * @param {Object} params filters
	 * @param {number} [params.page = 0] page number
	 * @param {function} callback callback
	 */
	ChannelModel.prototype.getPage = function ( params, callback ) {
	    var self = this;
	
	    params = params || {};
	
	    if ( !params.channelId && this.channelId ) {
	        params.channelId = this.channelId;
	    }
	
	    params.page = +params.page || 0;
	
	    if ( !params.channelId ) {
	        callback({message: 'error: field arguments[0].channelId is empty'}, []);
	        return; // eslint-disable-line
	    }
	
	    if ( this.pages[params.page] && this.pages[params.page].parseId ) {
	        if ( this.pages[params.page].cached ) {
	            callback(null, this.pages[params.page].data);
	        } else {
	            ajax('get', 'https://www.youtube.com' + this.pages[params.page].parseId, function ( data, status ) {
	                var config, errorText, startIndex, endIndex, parseId, channelTitle;
	
	                if ( status !== 200 ) {
	                    callback({message: 'request got bad http status (' + status + ')'}, []);
	                    return; // eslint-disable-line
	                }
	
	                try {
	                    config = JSON.parse(data);
	                } catch ( error ) {
	                    errorText = error;
	                    config = '';
	                }
	
	                if ( !config ) {
	                    callback(
	                        {
	                            message: 'parse error for page id ' + self.pages[params.page].parseId,
	                            code: errorText
	                        },
	                        []
	                    );
	                    return; // eslint-disable-line
	                }
	                // check if this is last page
	                if ( (config.load_more_widget_html.trim()).length > 10 ) {
	                    // add next page parse id to pages hash
	                    startIndex = config.load_more_widget_html.indexOf('data-uix-load-more-href="/browse_ajax') + 25;
	                    endIndex = config.load_more_widget_html.indexOf('"', startIndex);
	                    parseId = config.load_more_widget_html.substring(startIndex, endIndex).replace(/&amp;/g, '&');
	                } else {
	                    parseId = '';
	                }
	                self.pages[params.page + 1] = {
	                    parseId: parseId,
	                    cached: false
	                };
	                // get channel title
	                if ( data.indexOf('class="qualified-channel-title-text"') === -1 ) {
	                    // get it from first page (next pages don't have channel title inside it's html)
	                    if (
	                        self.pages[0] && self.pages[0].data && self.pages[0].data[0] &&
	                        self.pages[0].data[0] && self.pages[0].data[0].channelTitle
	                    ) {
	                        channelTitle = self.pages[0].data[0].channelTitle;
	                    } else {
	                        channelTitle = '';
	                    }
	                } else {
	                    startIndex = data.indexOf('class="qualified-channel-title-text"');
	                    startIndex = data.indexOf('title="', startIndex) + 7;
	                    endIndex = data.indexOf('"', startIndex);
	                    channelTitle = data.substring(startIndex, endIndex);
	                }
	                // add page to cache
	                self.pages[params.page].cached = true;
	                self.pages[params.page].data = parserForChannelPage(
	                    config.content_html,
	                    {id: params.channelId, title: channelTitle}
	                );
	
	                callback(null, self.pages[params.page].data);
	            });
	        }
	    } else if ( !params.page ) {
	        ajax('get', 'https://www.youtube.com/' + params.channelId + '/videos', function ( data, status ) {
	            var html, startIndex, endIndex, channelTitle;
	
	            if ( status !== 200 ) {
	                callback({message: 'request got bad http status (' + status + ')'}, []);
	                return; // eslint-disable-line
	            }
	
	            // get channel title
	            startIndex = data.indexOf('class="qualified-channel-title-text"');
	            startIndex = data.indexOf('title="', startIndex) + 7;
	            endIndex = data.indexOf('"', startIndex);
	            channelTitle = data.substring(startIndex, endIndex);
	            // add next page parse id to pages hash
	            startIndex = data.indexOf('data-uix-load-more-href="/browse_ajax') + 25;
	            endIndex = data.indexOf('"', startIndex);
	            self.pages[params.page + 1] = {parseId: data.substring(startIndex, endIndex).replace(/&amp;/g, '&'), cached: false};
	            // remove useless footer and header parts
	            html = data.slice(data.indexOf('id="channels-browse-content-grid"'), data.indexOf('browse-items-load-more-button'));
	            // add first page to cache
	            self.pages[0] = {
	                cached: true,
	                parseId: '   ',
	                data: parserForChannelPage(html, {id: params.channelId, title: channelTitle})
	            };
	            callback(null, self.pages[0].data);
	        });
	    } else if ( this.pages[params.page] && !this.pages[params.page].parseId ) {
	        callback(null, []); // last page
	    } else {
	        callback({message: 'wrong page number (page id not found in cache)'}, []);
	    }
	};
	
	
	ChannelModel.prototype.filter = function () {
	    return false;
	};
	
	// public export
	module.exports = ChannelModel;


/***/ }),
/* 63 */
/*!***********************************************!*\
  !*** ./src/js/modules/parser/models/tools.js ***!
  \***********************************************/
/***/ (function(module, exports) {

	
	/**
	 * URL parsing tool
	 * (c) Steven Levithan <stevenlevithan.com>
	 * MIT License
	 *
	 * @param {string} str url
	 *
	 * @return {Object} config with parsed parameters
	 */
	function parseUri ( str ) {
		var base = {
			    strictMode: false,
			    key: [
				    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port',
				    'relative', 'path', 'directory', 'file', 'query', 'anchor'
			    ],
			    q: {
				    name: 'queryKey',
				    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			    },
			    parser: {
				    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			    }
		    },
		    item = base.parser[base.strictMode ? 'strict' : 'loose'].exec(str),
		    uri  = {},
		    ind  = 14;
	
		while ( ind-- ) { uri[base.key[ind]] = item[ind] || ''; }
	
		uri[base.q.name] = {};
		uri[base.key[12]].replace(base.q.parser, function ( $0, $1, $2 ) {
			if ( $1 ) { uri[base.q.name][$1] = $2; }
		});
	
		return uri;
	}
	
	/**
	 * Ajax request
	 *
	 * @param {string} method "post", "get" or "head"
	 * @param {string} url address
	 * @param {function} callback on
	 * @param {Object} [headers] list of optional headers like "charset", "Content-Type" and so on
	 * @param {string} [type=text] data parsing mode: plain text (default), xml, json
	 * @param {boolean} [async=true] send asynchronous request
	 *
	 * @return {XMLHttpRequest} request object in case response headers are necessary
	 *
	 * @example
	 *   ajax('get', 'https://google.com/', function(data, status){console.info(data, status);}, {charset:'utf-8'})
	 */
	function ajax ( method, url, callback, headers, type, async ) {
		var hname,
		    jdata   = null,
		    timeout = null,
		    xhr     = new XMLHttpRequest(),
		    title   = 'AJAX ' + method.toUpperCase() + ' ' + url;
	
		async = async !== false;
		xhr.onreadystatechange = function () {
			var result;
	
			if ( xhr.readyState === 4 ) {
				clearTimeout(timeout);
				//console.log(xhr.responseText, title);
				if ( type === 'json' && xhr.status === 200 ) {
					try {
						jdata = JSON.parse(xhr.responseText);
					} catch ( error ) {
						jdata = null;
					}
				}
				if ( typeof callback === 'function' ) {
					if ( type === 'xml' ) {
						result = xhr.responseXML;
					} else if ( type === 'json' ) {
						result = jdata;
					} else {
						result = xhr.responseText;
					}
	
					callback(result, xhr.status, xhr);
				}
			}
		};
		xhr.open(method, url, async);
		// set headers if present
		if ( headers ) {
			for ( hname in headers ) {
				if ( headers.hasOwnProperty(hname) ) {
					xhr.setRequestHeader(hname, headers[hname]);
				}
			}
		}
		xhr.send();
		// abort after some time (60s)
		timeout = setTimeout(function () {
			xhr.abort();
			if ( typeof callback === 'function' ) {
				callback(null, 0);
			}
		}, 60000);
	
		return xhr;
	}
	
	window.ajax = ajax;
	
	
	// public export
	module.exports = {
		ajax: ajax,
		parseUri: parseUri
	};


/***/ }),
/* 64 */
/*!******************************************************!*\
  !*** ./src/js/components/page.main/tabs/settings.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var	keys   = __webpack_require__(/*! stb-keys */ 27),
		app    = __webpack_require__(/*! mag-app */ 1),
		// router = require('../../../temp/router'),
	
		List  = __webpack_require__(/*! mag-component-list */ 44),
		Panel = __webpack_require__(/*! stb-component-panel */ 47),
		ModalMessage = __webpack_require__(/*! ../../../modules/ui/modal.message */ 65),
	
		api = __webpack_require__(/*! ../../../modules/api/client */ 31),
		stb = __webpack_require__(/*! ../../../modules/gstb.wrapper */ 67),
	
		lang = __webpack_require__(/*! ../../../../../config/lang */ 29),
	
		$page = document.getElementById('pm'),
	
		panel = new Panel({
			$node: document.getElementById('pmTabSettings'),
			className: 'tab',
			visible: false,
			events: {
				show: function () {
					$page.style.backgroundImage = '';
				}
			}
		}),
		listMenu = __webpack_require__(/*! ../list.menu */ 43),
		widgetHelp = __webpack_require__(/*! ../../widget.help */ 39),
	
		newControl = [
			'AuraHD2', 'AuraHD3', 'AuraHD8', 'MAG254', 'MAG275', 'MAG276', 'WR320'
		].indexOf(stb.deviceModel()) !== -1,
	
		currentLanguageIndex = app.languageIndex,
	
		settingsList, modal, button, prevFocused;
	
	
	function applyNewLocaleDialog () {
		//debug.info(app.languageIndex !== currentLanguageIndex, 'currentLanguageIndex');
		//console.log(JSON.stringify([app.languageIndex, currentLanguageIndex]))
		if ( app.languageIndex !== currentLanguageIndex ) {
			if ( !modal ) {
				modal = new ModalMessage({
					visible: false,
					events: {
						keydown: function ( event ) {
							var focusIndex, viewIndex;
	
							if ( event.code === keys.ok ) {
								app.settings.language = lang.languages[currentLanguageIndex];
								currentLanguageIndex = -1;
								app.settings.languageOverwrite = 1;
								app.settings.keyboardLanguage = currentLanguageIndex;
								app.reload();
							} else if ( event.code === keys.back ) {
								settingsList.data[settingsList.size -1].value = currentLanguageIndex = app.languageIndex;
								event.stop = true;
								modal.hide();
								widgetHelp.show();
								prevFocused.focus();
								focusIndex = settingsList.$focusItem.index;
								viewIndex = settingsList.viewIndex;
								settingsList.viewIndex = null;
								settingsList.renderView(viewIndex);
								settingsList.focusIndex(focusIndex);
							}
						}
					}
				});
				modal.$body.classList.add('modalExit');
				modal.$header.innerHTML  = gettext('To apply a new language, you should restart the application');
				modal.$content.innerHTML = '';
				modal.$content.appendChild(button = document.createElement('div'));
				button.innerText = gettext('Ok');
				button.className = 'btn confirm' + (newControl ? ' old' : '');
				modal.$content.appendChild(button = document.createElement('div'));
				button.className = 'btn back' + (newControl ? ' old' : '');
				button.innerText = gettext('Cancel');
				modal.$footer.innerHTML  = '';
				app.activePage.add(modal);
				// router.current.add(modal);
				widgetHelp.hide();
				modal.show();
				prevFocused = app.activePage.activeComponent;
				modal.focus();
			} else {
				modal.show();
				prevFocused = app.activePage.activeComponent;
				modal.focus();
			}
	
			return true;
		}
		return false;
	}
	
	
	listMenu.addListener('focus', function () {
		applyNewLocaleDialog();
	});
	
	
	panel.activate = function () {
		var settings, l10n;
	
		if ( !settingsList ) {
			l10n = __webpack_require__(/*! ../../../modules/util/l10n */ 56);
			settings = __webpack_require__(/*! ../../../modules/api/model/settings */ 68);
			settingsList = new List({
				$node: document.getElementById('pmSettingsList'),
				type: List.prototype.TYPE_HORIZONTAL,
				size: 1,
				data: [
					// {
					// 	title: api.token ? gettext('Logout') : gettext('Login'),
					// 	value: 0,
					// 	values: ['&nbsp;'],
					// 	description: ' ',
					// 	icon: 'icon people',
					// 	onclick: function () {
					// 		var modal = new ModalMessage({
					// 				hidden: true,
					// 				events: {
					// 					keydown: function ( event ) {
					// 						if ( event.code === keys.ok ) {
					// 							if ( api.token ) {
					// 								app.settings.sessionToken = null;
					// 								app.settings.refreshToken = null;
					// 								app.reload();
					// 							} else {
					// 								router.navigate('pl');
					// 							}
					// 						} else if ( event.code === keys.back ) {
					// 							event.stop = true;
					// 							modal.hide();
					// 							widgetHelp.show();
					// 							modal.$node.parentNode.removeChild(modal.$node);
					// 							settingsList.focus();
					// 						}
					// 					}
					// 				}
					// 			}),
					// 			button;
	
					// 		modal.$body.classList.add('modalExit');
					// 		modal.$header.innerHTML  = api.token ? gettext('Logout from application?') : gettext('You want to login into app?');
					// 		modal.$content.innerHTML = '';
					// 		modal.$content.appendChild(button = document.createElement('div'));
					// 		button.innerText = gettext('Ok');
					// 		button.className = 'btn confirm' + (newControl ? ' old' : '');
					// 		modal.$content.appendChild(button = document.createElement('div'));
					// 		button.className = 'btn back' + (newControl ? ' old' : '');
					// 		button.innerText = gettext('Cancel');
					// 		modal.$footer.innerHTML  = '';
					// 		router.current.add(modal);
					// 		widgetHelp.hide();
					// 		modal.show();
					// 		modal.focus();
					// 	}
					// },
					// {
					// 	title: gettext('Safe mode'),
					// 	value: app.settings.safeSearch,
					// 	values: settings.data.safeSearch,
					// 	description: gettext('Hide unwanted content'),
					// 	icon: app.settings.safeSearch === 0 ? 'icon settings-uncheck' : 'icon settings-check',
					// 	onclick: function ( $item ) {
					// 		var data = settings.getNext('safeSearch', app.settings.safeSearch);
	
					// 		$item.$value.innerText = data.value;
					// 		this.value = data.index;
					// 		app.settings.safeSearch = data.index;
					// 		if ( data.index === 0 ) {
					// 			this.icon = $item.$icon.className = 'icon settings-uncheck';
					// 		} else {
					// 			this.icon = $item.$icon.className = 'icon settings-check';
					// 		}
					// 	}
					// },
					// {
					// 	title: gettext('Default extension'),
					// 	value: app.settings.quality,
					// 	values: settings.data.quality,
					// 	description: gettext('Choose default video quality'),
					// 	icon: app.settings.quality < 2 ? 'icon player-HD' : 'icon player-SD',
					// 	onclick: function ( $item ) {
					// 		var data = settings.getNext('quality', app.settings.quality);
	
					// 		$item.$value.innerText = data.value;
					// 		this.value = data.index;
					// 		app.settings.quality = data.index;
					// 		if ( app.settings.quality < 2 ) {
					// 			this.icon = $item.$icon.className = 'icon player-HD';
					// 		} else {
					// 			this.icon = $item.$icon.className = 'icon player-SD';
					// 		}
					// 	}
					// },
					{
						title: gettext('Language'),
						value: app.languageIndex,
						values: lang.languagesLocalized,
						description: gettext('Interface language'),
						icon: 'icon flag',
						onclick: function ( $item ) {
							var index = l10n.nextLang(this.value);
	
							this.value = index;
	
							currentLanguageIndex = index;
							$item.$value.innerText = lang.languagesLocalized[index];
						}
					}
				],
				render: function ( $item, data ) {
					if ( !$item.ready ) {
						$item.$container = $item.appendChild(document.createElement('div'));
						$item.$container.className = 'container';
						$item.$title = $item.$container.appendChild(document.createElement('div'));
						$item.$title.className = 'title';
						$item.$value = $item.$container.appendChild(document.createElement('div'));
						$item.$value.className = 'value';
						$item.$icon = $item.$container.appendChild(document.createElement('div'));
						$item.$description = $item.appendChild(document.createElement('div'));
						$item.$description.className = 'description';
						$item.ready = true;
					}
					$item.$title.innerText = data.title;
					$item.$value.innerHTML = data.values[data.value];
					$item.$icon.className = data.icon;
					$item.$description.innerText = data.description;
				},
				events: {
					keydown: function ( event ) {
						switch ( event.code ) {
							case keys.right:
								// if ( this.$focusItem.index < this.data.length - 1 ) {
								// 	if ( this.$focusItem.index > 0 ) {
								// 		this.renderView(this.viewIndex + 1);
								// 	} else {
								// 		this.focusIndex(1);
								// 	}
								// }
								break;
							case keys.left:
								// cursor move only on arrow keys
								if ( this.viewIndex > 0 && this.viewIndex < this.data.length - this.size ) {
									this.renderView(this.viewIndex + 1);
								} else {
									this.move(event.code);
								}
								break;
							case keys.ok:
								// there are some listeners
								if ( this.events['click:item'] !== undefined ) {
									// notify listeners
									this.emit('click:item', {$item: this.$focusItem, event: event});
								}
								break;
	
							case keys.back:
							// case keys.exit:
								if ( applyNewLocaleDialog() ) {
									event.stop = true;
								}
								break;
						}
					},
					'click:item': function ( event ) {
						event.$item.data.onclick(event.$item);
					},
					overflow: function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
						}
					}
				}
			});
	
			panel.add(settingsList);
	
			settingsList.renderView = function ( index ) {
				var $item, i, itemData, prevIndex, currIndex;
	
				if ( false ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( Number(index) !== index ) { throw 'index must be a number'; }
					if ( index < 0 ) { throw 'index should be more than zero'; }
					if ( index >= this.data.length ) { throw 'index should be less than data size'; }
				}
	
				// has the view window position changed
				if ( this.viewIndex !== index ) {
					//debug.log('renderView ' + index);
					// save for emit
					prevIndex = this.viewIndex;
					// sync global pointer
					this.viewIndex = currIndex = index;
	
					// rebuild all visible items
					for ( i = 0; i < this.size; i++ ) {
						// shortcuts
						$item    = this.$body.children[i];
						itemData = this.data[index];
						// real item or stub
						if ( itemData !== undefined ) {
							// correct inner data/index and render
							$item.data  = itemData;
							$item.index = index;
							this.renderItem($item, itemData);
	
							// apply CSS
							if ( itemData.mark ) {
								$item.classList.add('mark');
							} else {
								$item.classList.remove('mark');
							}
						} else {
							// nothing to render
							$item.data = $item.index = undefined;
							$item.innerHTML = '';
							$item.ready = false;
						}
						index++;
					}
	
					// there are some listeners
					if ( this.events['move:view'] !== undefined ) {
						// notify listeners
						this.emit('move:view', {prevIndex: prevIndex, currIndex: currIndex});
					}
	
					// full rebuild
					return true;
				}
	
				// nothing was done
				return false;
			};
		}
		this.show();
		settingsList.focus();
		settingsList.focusIndex(0);
		panel.focusEntry = settingsList;
	};
	
	module.exports = panel;


/***/ }),
/* 65 */
/*!********************************************!*\
  !*** ./src/js/modules/ui/modal.message.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @module stb/ui/modal.message
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	var ModalBox = __webpack_require__(/*! spa-component-modal */ 66);
	
	
	/**
	 * Base modal window implementation.
	 *
	 * @constructor
	 * @extends ModalBox
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 */
	function ModalMessage ( config ) {
	    // sanitize
	    config = config || {};
	
	    if ( false ) {
	        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
	        // init parameters checks
	        if ( config.className && typeof config.className !== 'string' ) { throw new Error(__filename + ': wrong or empty config.className'); }
	    }
	
	    // set default className if classList property empty or undefined
	    config.className = 'modalMessage' + (config.className || '');
	
	    // parent constructor call
	    ModalBox.call(this, config);
	
	    this.$header  = this.$body.appendChild(document.createElement('div'));
	    this.$content = this.$body.appendChild(document.createElement('div'));
	    this.$footer  = this.$body.appendChild(document.createElement('div'));
	
	    this.$header.className  = 'header';
	    this.$content.className = 'content';
	    this.$footer.className  = 'footer';
	
	    this.$header.innerText  = 'header';
	    this.$content.innerText = 'content';
	    this.$footer.innerText  = 'footer';
	
	    this.hide();
	}
	
	
	// inheritance
	ModalMessage.prototype = Object.create(ModalBox.prototype);
	ModalMessage.prototype.constructor = ModalMessage;
	
	
	
	// public
	module.exports = ModalMessage;


/***/ }),
/* 66 */
/*!****************************************!*\
  !*** ./~/spa-component-modal/index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! spa-component */ 38);
	
	
	/**
	 * Base modal window implementation.
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 */
	function Modal ( config ) {
	    // sanitize
	    config = config || {};
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        // init parameters checks
	        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
	            throw new Error(__filename + ': wrong or empty config.className');
	        }
	        if ( config.$body ) {
	            throw new Error(__filename + ': config.$body should not be provided manually');
	        }
	    }
	
	    // create centered div
	    config.$body = document.createElement('div');
	    config.$body.className = 'body';
	
	    // parent constructor call
	    Component.call(this, config);
	
	    // add table-cell wrapper
	    this.$node.appendChild(document.createElement('div').appendChild(this.$body).parentNode);
	}
	
	
	// inheritance
	Modal.prototype = Object.create(Component.prototype);
	Modal.prototype.constructor = Modal;
	
	// set component name
	Modal.prototype.name = 'spa-component-modal';
	
	
	// public
	module.exports = Modal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-component-modal/index.js"))

/***/ }),
/* 67 */
/*!****************************************!*\
  !*** ./src/js/modules/gstb.wrapper.js ***!
  \****************************************/
/***/ (function(module, exports) {

	/**
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 */
	
	'use strict';
	
	
	module.exports = {
		initPlayer           : window.top.gSTB.InitPlayer,
		saveUserData         : window.top.gSTB.SaveUserData,
		loadUserData         : window.top.gSTB.LoadUserData,
		setPosTime           : window.top.gSTB.SetPosTime,
		getPosTime           : window.top.gSTB.GetPosTime,
		play                 : window.top.gSTB.Play,
		pause                : window.top.gSTB.Pause,
		continuePlay         : window.top.gSTB.Continue,
		getVolume            : window.top.gSTB.GetVolume,
		setVolume            : window.top.gSTB.SetVolume,
		setNativeStringMode  : window.top.gSTB && window.top.gSTB.SetNativeStringMode ? window.top.gSTB.SetNativeStringMode : function () {},
		setServiceButtonState: window.top.gSTB.EnableServiceButton,
		setVKButtonState     : window.top.gSTB.EnableVKButton,
		setTvButtonState     : window.top.gSTB.EnableTvButton,
		setAppButtonState    : window.top.gSTB.EnableAppButton,
		hideVK               : window.top.gSTB.HideVirtualKeyboard,
		showVK               : window.top.gSTB.ShowVirtualKeyboard,
		getStandByStatus     : window.top.gSTB.GetStandByStatus,
		setStandByStatus     : window.top.gSTB.StandBy,
		getEnv               : window.top.gSTB.GetEnv,
		isMuted              : window.top.gSTB.GetMute,
		setMute              : window.top.gSTB.SetMute,
		deviceModel          : window.top.gSTB.GetDeviceModelExt
	};


/***/ }),
/* 68 */
/*!**********************************************!*\
  !*** ./src/js/modules/api/model/settings.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Emitter = __webpack_require__(/*! cjs-emitter */ 4),
		settings = new Emitter();
	
	settings.data = {
		quality: [gettext('Best'), '720p', '480p', '360p', '240p'],
		safeSearch: [gettext('Off'), gettext('On')]
	};
	
	settings.getNext = function ( key, index ) {
		if ( false ) {
			if ( !settings.data[key] ) { throw 'no key ' + key + ' in settings'; }
			if ( !settings.data[key][index])  { throw 'no index ' + index + ' in key ' + key + ' in settings'; }
		}
		if ( settings.data[key] && settings.data[key][index] ) {
			++index;
			if ( settings.data[key].length === index ) {
				index = 0;
			}
			this.emit('changed', {key: key, value: settings.data[key][index], index: index});
			return {value: settings.data[key][index], index: index};
		}
	};
	
	module.exports = settings;


/***/ }),
/* 69 */
/*!**********************************************************!*\
  !*** ./src/js/components/page.main/tabs/main.content.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys   = __webpack_require__(/*! stb-keys */ 27),
		app 	= __webpack_require__(/*! mag-app */ 1),
		// router = require('../../../temp/router'),
	
		Panel = __webpack_require__(/*! stb-component-panel */ 47),
		List  = __webpack_require__(/*! mag-component-list */ 44),
		Input = __webpack_require__(/*! ../../../modules/ui/input */ 49),
	
		ListMovies  = __webpack_require__(/*! ./../../list.videos.js */ 51),
		player 	= __webpack_require__(/*! ../../../modules/player */ 50),
	
		// SearchModel  = require('../../../modules/api/model/search'),
		SearchModel  = __webpack_require__(/*! ../../../modules/parser/models/main */ 70),
		// recommedationsModel = require('../../../modules/api/model/recommedations'),
		recommedationsModel = new SearchModel(),
	
		listMenu = __webpack_require__(/*! ../list.menu */ 43),
		loader = __webpack_require__(/*! ../../loader */ 41),
	
		lists = [],
	
		$page = document.getElementById('pm'),
	
		activeList = 0,
	
		panel = new Panel({
			$node: document.getElementById('pmTabMainContent'),
			visible: false,
			className: 'tab hidden',
			events: {
				focus: function () {
					lists[activeList].focus();
				},
				show: function () {
					$page.style.backgroundImage = '';
				}
			}
		}),
	
		inputSearch = new Input({
			$node: document.getElementById('pmMainSearch'),
			$body: document.getElementById('pmMainSearchBody'),
			className: 'tabInputSearch',
			events: {
				focus : function () {
					this.setValue('');
					app.route(app.pages.search);
					// router.navigate('ps');
				}
			}
		}),
	
		bottomListTopValue = 0,
		topListTopValue    = 0,
	
		topList = 0,
		bottomList = 1,
	
		topPageNumber = 0,
		bottomPageNumber = 1,
	
		loadTimeout = -1,
		blockMove = true;
	
	function moveLists ( sourceListNumber, isGoingUp ) {
		var targetList = sourceListNumber ^ 1;
	
		console.log('moveLists: ' + targetList + ' ' + bottomList);
		//debug.info(blockMove, 'blockMove');
		if ( blockMove ) {
			if ( false ) {
				if ( isGoingUp ) {
					//debug.info(topPageNumber - 1, 'topPageNumber');
				} else {
					//debug.info(bottomPageNumber - 1, 'bottomPageNumber');
				}
			}
			return;
		}
		if ( isGoingUp ) {
			blockMove = true;
			recommedationsModel.getPage({page: (topPageNumber - 1), count: 1}/* ).then */, function ( error, data ) {
				--topPageNumber;
				--bottomPageNumber;
	
				// lists[targetList].model.filter({channel: response[0]});
				topList = targetList;
				bottomList = sourceListNumber;
				activeList = targetList;
	
				lists[targetList].data = data;
				lists[targetList].viewIndex = null;
				lists[targetList].focusIndex(0);
				// lists[targetList].renderView(0);
				lists[targetList].emit('view:ready');
				// lists[targetList].focus();
				// topList = targetList;
			});
		} else {
			if ( lists[bottomList].data.length === 0 ) {
				lists[sourceListNumber].emit('view:ready');
				return;
			}
			blockMove = true;
			recommedationsModel.getPage({page: (bottomPageNumber + 1), count: 1}/* ).then */, function ( error, data ) {
				if ( !data ) {
					lists[sourceListNumber].emit('view:ready');
					return;
				}
				if ( error || data.length === 0 ) {
					++topPageNumber;
					++bottomPageNumber;
					// lists[sourceListNumber].model.filter({channel: {id: '!', title: ''}});
					lists[sourceListNumber].data = [];
					lists[sourceListNumber].viewIndex = null;
					// lists[sourceListNumber].renderView(0);
					lists[sourceListNumber].focusIndex(0);
					lists[sourceListNumber].$title.innerHTML = '';
					topList = targetList;
					bottomList = sourceListNumber;
					activeList = targetList;
					lists[topList].$node.style.top = topListTopValue;
					lists[bottomList].$node.style.top = bottomListTopValue;
					lists[activeList].focus();
					lists[sourceListNumber].emit('view:ready');
				} else {
					++topPageNumber;
					++bottomPageNumber;
	
					// lists[sourceListNumber].model.filter({channel: response[0]});
	
					topList = targetList;
					bottomList = sourceListNumber;
					activeList = targetList;
					lists[sourceListNumber].data = data;
					lists[sourceListNumber].viewIndex = null;
					lists[sourceListNumber].renderView(0);
					lists[sourceListNumber].focusIndex(0);
					lists[sourceListNumber].emit('view:ready');
					// lists[topList].focus();
				}
			});
		}
	}
	
	panel.activate = function () {
		this.show();
		clearTimeout(loadTimeout);
		loadTimeout = setTimeout(function () {
			loader.hide();
		}, 10000);
	
		if ( lists.length === 0 ) {
			loader.show();
			lists.push(new ListMovies({
				$node     : document.getElementById('pmListMainVideos0Node'),
				$body     : document.getElementById('pmListMainVideos0Body'),
				$title    : document.getElementById('pmMainChannelTitle0'),
				className : 'listMovie0Node',
				model     : new SearchModel({
					type: 'video'
				}),
				size      : 5,
				viewIndex : 0,
				focusIndex: 0,
				type      : List.prototype.TYPE_HORIZONTAL,
				events    : {
					overflow : function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
						}
					},
					'view:ready': function () {
						panel.focusEntry = lists[activeList];
						lists[topList].$node.style.top = topListTopValue;
						if ( lists[bottomList] ) {
							lists[bottomList].$node.style.top = bottomListTopValue;
						}
						// this.$title.innerHTML = this.model.channel.title;
						this.$title.innerHTML = '';
						if ( lists[activeList] && lists[activeList].data.length > 0 && lists[activeList].data[0].value ) {
							loader.hide();
							clearTimeout(loadTimeout);
						}
						this.show();
						lists[activeList].focus();
						blockMove = false;
					},
					'view:error': function ( error ) {
						blockMove = false;
						if ( error === 'empty' ) {
							this.data = [];
							this.viewIndex = null;
							this.renderView(0);
							this.focusIndex(0);
							panel.focusEntry = lists[activeList];
							lists[topList].$node.style.top = topListTopValue;
							if ( lists[bottomList] ) {
								lists[bottomList].$node.style.top = bottomListTopValue;
							}
							this.$title.innerHTML = this.model.channel.title;
							loader.hide();
							this.show();
							clearTimeout(loadTimeout);
							lists[activeList].focus();
						} else if ( topPageNumber === 0 ) {
							moveLists(0, false);
						}
					},
					'click:item': function ( event ) {
						if ( event.$item.data.id ) {
							player.setContent({
								channel : this.model.channel,
								video   : event.$item.data,
								playlist: this.data,
								position: event.$item.index
							});
						}
					},
					focus: function () {
						panel.focusEntry = this;
					}
				}
			}));
			lists.push(new ListMovies({
				$node     : document.getElementById('pmListMainVideos1Node'),
				$body     : document.getElementById('pmListMainVideos1Body'),
				$title    : document.getElementById('pmMainChannelTitle1'),
				className : 'listMovie1Node',
				model     : new SearchModel({
					type: 'video'
				}),
				size      : 5,
				viewIndex : 0,
				focusIndex: 0,
				type      : List.prototype.TYPE_HORIZONTAL,
				events    : {
					overflow: function ( event ) {
						if ( event.direction === keys.left ) {
							listMenu.focus();
						}
					},
					'view:ready': function () {
						panel.focusEntry = lists[activeList];
						lists[topList].$node.style.top = topListTopValue;
						lists[bottomList].$node.style.top = bottomListTopValue;
						this.$title.innerHTML = ''; //this.model.channel.title;
						if ( lists[activeList] && lists[activeList].data.length > 0 && lists[activeList].data[0].value ) {
							loader.hide();
							clearTimeout(loadTimeout);
						}
						this.show();
						clearTimeout(loadTimeout);
						lists[activeList].focus();
						blockMove = false;
					},
					'view:error': function ( error ) {
						blockMove = false;
						if ( error === 'empty' ) {
							this.data = [{
								id          : '',
								value       : '',
								publishedAt : '',
								icon        : 'img/no.image.png',
								duration    : '',
								title       : gettext('No videos'),
								channelTitle: '',
								viewCount   : '',
								locale      : {
									publishedAt: '', viewCount: '', channelTitle: ''
								}
							}];
							this.viewIndex = null;
							this.renderView(0);
							this.focusIndex(0);
							panel.focusEntry = lists[activeList];
							lists[topList].$node.style.top = topListTopValue;
							if ( lists[bottomList] ) {
								lists[bottomList].$node.style.top = bottomListTopValue;
							}
							this.$title.innerHTML = this.model.channel.title;
							this.show();
							loader.hide();
							clearTimeout(loadTimeout);
							lists[activeList].focus();
						}
					},
					'click:item': function ( event ) {
						if ( event.$item.data.id ) {
							player.setContent({
								channel : this.model.channel,
								video   : event.$item.data,
								playlist: this.data,
								position: event.$item.index
							});
						}
					},
					focus: function () {
						panel.focusEntry = this;
					}
				}
			}));
	
			//topListTopValue = window.getComputedStyle(lists[0].$node).getPropertyValue('top');
			panel.add(lists[0]);
			panel.add(lists[1]);
			lists[0].addListener('keydown', function ( event ) {
				if ( event.code === keys.down ) {
					moveLists(0, false);
				} else if ( event.code === keys.up ) {
					if ( topPageNumber > 0 ) {
						moveLists(0, true);
					} else {
						inputSearch.focus();
					}
				} else if ( event.code === keys.playPause ) {
					player.setContent({
						channel : this.model.channel,
						video   : this.$focusItem.data,
						playlist: this.data,
						position: this.$focusItem.index
					});
				}
				//debug.log(event.stop);
			});
			lists[1].addListener('keydown', function ( event ) {
				if ( event.code === keys.down ) {
					moveLists(1, false);
				} else if ( event.code === keys.up ) {
					if ( topPageNumber > 0 ) {
						moveLists(1, true);
					} else {
						inputSearch.focus();
					}
				} else if ( event.code === keys.playPause ) {
					player.setContent({
						channel : this.model.channel,
						video   : this.$focusItem.data,
						playlist: this.data,
						position: this.$focusItem.index
					});
				}
			});
			bottomListTopValue = window.getComputedStyle(lists[1].$node).getPropertyValue('top');
			recommedationsModel.getPage({page: 0, count: 1}/* ).then */, function (error, data ) {
				if ( error ) {
					data = [];
				}
				topPageNumber = 0;
				topList = 0;
				bottomList = 1;
				bottomPageNumber = 1;
				activeList = 0;
				lists[topList].data = data;
				lists[topList].viewIndex = null;
				lists[topList].renderView(0);
				lists[topList].focusIndex(0);
				lists[topList].emit('view:ready');
				lists[activeList].focus();
				// .filter({channel: data[0]});
				recommedationsModel.getPage({page: 1, count: 1}/* ).then */, function ( error, data ) {
					// lists[bottomList].model.filter({channel: data[0]});
					if ( error ) {
						data = [];
					}
					lists[bottomList].data = data;
					lists[bottomList].viewIndex = null;
					lists[bottomList].renderView(0);
					lists[bottomList].focusIndex(0);
					lists[bottomList].emit('view:ready');
					// lists[activeList].focus();
				});
			});
			// })['catch'](function ( e ) {
			// 	//debug.log(e);
			// });
		} else {
			if ( lists[activeList].data.length ) {
				lists[activeList].focus();
			}
		}
		window.lists = lists;
	};
	
	panel.add(inputSearch);
	
	module.exports = panel;


/***/ }),
/* 70 */
/*!**********************************************!*\
  !*** ./src/js/modules/parser/models/main.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * youtube parser for main page
	 * @author bas
	 */
	
	'use strict';
	
	var tools   = __webpack_require__(/*! ./tools */ 63),
	    ajax    = tools.ajax,
	    Emitter = __webpack_require__(/*! cjs-emitter */ 4);
	
	/**
	 * Main page parser
	 *
	 * @param {string} textForParse html with video data
	 *
	 * @return {Array} items videos
	 */
	function parserForMainPage ( textForParse ) {
	    var items = [],
	        id, channelTitle, duration, viewCount, publishedAt, title, icon, channelId,
	        tmp, startIndex, endIndex, text, index, type, playlistId, isLive;
	
	    // split by items
	    tmp = textForParse.split('<li class="yt-shelf-grid-item');
	    // check each piece of html for video data
	    for ( index = 0; index < tmp.length; index++ ) {
	        text = tmp[index];
	
	        if ( text.indexOf('yt-lockup-content') === -1 ) {
	            continue; // this part of text don't have video block
	        }
	
	        if ( text.indexOf('yt-lockup-playlist') !== -1 ) {     // playlist
	            type = 'playlist';
	        } else if ( text.indexOf('yt-lockup-video') !== -1 &&  // video
	            text.indexOf('branded-page-module') === -1 &&      // not branded (add parser for them?)
	            text.indexOf('data-set-reminder-text') === -1 ) {  // not a video but an ad. We don't need fake videos.
	            type = 'video';
	            isLive = text.indexOf('yt-badge-live') !== -1;
	        } else {
	            continue;
	        }
	
	        // video/playlist thumbnail, example: "https://i.ytimg.com/vi/ktiONWfSL48/hqdefault.jpg?custom=true&w=196&jpgq=90&sp=68&sigh=e_W4dPkywvlYwi8av9yYdwHQi8Y"
	        startIndex = text.indexOf('//i.ytimg');
	        endIndex = text.indexOf('"', startIndex);
	        icon = 'https:' + text.substring(startIndex, endIndex).replace(/&amp;/g, '&');
	        // video/playlist/channel channel id, example: "UCY0C6A3t3RTUN3BB65rWAgQ"
	        if ( text.indexOf('<a href="/channel/') === -1 ) {
	            if ( text.indexOf('data-channel-external-id=') === -1 ) {
	                if ( text.indexOf('<a href="/user/') === -1 ) {
	                    channelId = '';
	                } else {
	                    startIndex = text.indexOf('<a href="/user/') + 10;
	                    endIndex = text.indexOf('"', startIndex);
	                    channelId = text.substring(startIndex, endIndex);
	                }
	            } else {
	                startIndex = text.indexOf('data-channel-external-id="') + 26;
	                endIndex = text.indexOf('"', startIndex);
	                channelId = 'channel/' + text.substring(startIndex, endIndex);
	            }
	        } else {
	            startIndex = text.indexOf('<a href="/channel/') + 10;
	            endIndex = text.indexOf('"', startIndex);
	            channelId = text.substring(startIndex, endIndex);
	        }
	
	        if ( type === 'playlist' ) {
	            // playlist title, example: "Nasa LIVE stream - Earth From Space LIVE"
	            startIndex = text.indexOf('" dir="ltr">') + 12;
	            endIndex = text.indexOf('</a><span', startIndex);
	            title = text.substring(startIndex, endIndex);
	            if ( text.indexOf('<div class="yt-lockup-byline ">YouTube</div>') !== -1 ) {
	                channelId = ''; // this channel don't have owner - it was created by youtube automatically
	            }
	            // playlist id, example: "/watch?v=5Fn8-hoyLVg&list=LLpmD3iT-8TQzRuygIiS9bAw"
	            startIndex = text.indexOf('<a href="/watch?v=') + 9;
	            endIndex = text.indexOf('"', startIndex);
	            playlistId = text.substring(startIndex, endIndex).replace('&amp;', '&');
	            // channel title, example: "Conor Maynard Covers | 2016"
	            startIndex = text.indexOf('" dir="ltr">') + 12;
	            endIndex = text.indexOf('<', startIndex);
	            channelTitle = text.substring(startIndex, endIndex);
	
	            items.push({
	                value: 1,           // always 1, stb hack
	                playlistId: playlistId,
	                channel: {
	                    title: channelTitle.substr(0, 100),
	                    id: channelId
	                },
	                title: title.substr(0, 100),
	                icon: icon,
	                type: 'playlist',
	                channelTitle: channelTitle.substr(0, 100),
	                viewCount: ' ',      // not used by application
	                duration: ' ',       // not used by application
	                publishedAt: ' ',    // parser can't get this information
	                locale: {
	                    publishedAt: ' ',
	                    viewCount: ' ',  // not used by application
	                    channelTitle: channelTitle.substr(0, 100)
	                }
	            });
	        }
	
	        if ( type === 'video' ) {
	            // video id, example: "ktiONWfSL48"
	            startIndex = text.indexOf('data-context-item-id="') + 22;
	            endIndex = text.indexOf('"', startIndex);
	            id = text.substring(startIndex, endIndex);
	            // video duration, example: "11:59:59"
	            startIndex = text.indexOf('<span class="video-time" aria-hidden="true">') + 44;
	            endIndex = text.indexOf('</span>', startIndex);
	            duration = text.substring(startIndex, endIndex);
	            // views count, example: "10,000,002"
	            startIndex = text.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
	            endIndex = text.indexOf(' ', startIndex);
	            viewCount = text.substring(startIndex, endIndex);
	            // time passed since publishing, example: "1 month ago"
	            startIndex = text.indexOf('</li><li>', startIndex) + 9; // text not unique: need to use viewCount position
	            endIndex = text.indexOf('</li></ul></div>', startIndex);
	            publishedAt = text.substring(startIndex, endIndex);
	            // video title, example: "Nasa LIVE stream - Earth From Space LIVE"
	            startIndex = text.indexOf('" dir="ltr">') + 12;
	            if ( startIndex === (-1 + 12) ) { // strange title, try again
	                startIndex = text.indexOf(' dir="ltr">') + 11;
	                if ( startIndex === ( -1 + 11) ) { // what if this is Arabic or another right-to-left text?
	                    startIndex = text.indexOf('" dir="rtl">') + 12;
	                }
	            }
	            endIndex = text.indexOf('</', startIndex);
	            title = text.substring(startIndex, endIndex);
	            // channel title, example: "Ленинград | Leningrad"
	            startIndex = text.indexOf('<a href="', endIndex);
	            startIndex = text.indexOf('>', startIndex) + 1; // text not unique: need to use title position
	            endIndex = text.indexOf('</a>', startIndex);
	            channelTitle = text.substring(startIndex, endIndex);
	
	            items.push({
	                value: 1,           // always 1, stb hack
	                id: id,
	                channelTitle: channelTitle.substr(0, 100),
	                duration: isLive ? '' : duration.substr(0, 100),
	                realDuration: isLive ? '' : duration.substr(0, 100),
	                viewCount: viewCount.substr(0, 100),
	                publishedAt: isLive ? '' : publishedAt.substr(0, 100),
	                dimension: '',      // not used by application
	                definition: '',     // not used by application
	                title: title.substr(0, 100),
	                icon: icon,
	                channelId: channelId,
	                type: 'video',
	                locale: {
	                    publishedAt: isLive ? '' : publishedAt.substr(0, 100),
	                    viewCount: viewCount.substr(0, 100),
	                    channelTitle: channelTitle.substr(0, 100)
	                }
	            });
	        }
	    }
	
	    return items;
	}
	
	/**
	 * @constructor
	 */
	function MainModel () {
	    Emitter.call(this);
	
	    this.pages = {};
	}
	
	MainModel.prototype = Object.create(Emitter.prototype);
	MainModel.prototype.constructor = MainModel;
	
	
	/**
	 * Get parsed page data
	 *
	 * @param {Object} params filters
	 * @param {number} [params.page = 0] page number
	 * @param {function} callback callback
	 */
	MainModel.prototype.getPage = function ( params, callback ) {
	    var self = this;
	
	    params.page = +params.page || 0;
	
	    if ( this.pages[params.page] && this.pages[params.page].parseId ) {
	        if ( this.pages[params.page].cached ) {
	            callback(null, this.pages[params.page].data);
	        } else {
	            ajax('get', 'https://www.youtube.com' + this.pages[params.page].parseId, function ( data, status ) {
	                var config, errorText, startIndex, endIndex, parseId;
	
	                if ( status !== 200 ) {
	                    callback({message: 'request got bad http status (' + status + ')'}, []);
	                    return; // eslint-disable-line
	                }
	
	                try {
	                    config = JSON.parse(data);
	                } catch ( error ) {
	                    errorText = error;
	                    config = '';
	                }
	
	                if ( !config ) {
	                    callback(
	                        {
	                            message: 'parse error for page id ' + self.pages[params.page].parseId,
	                            code: errorText
	                        },
	                        []
	                    );
	                    return; // eslint-disable-line
	                }
	                // check if this is last page
	                if ( (config.load_more_widget_html.trim()).length > 10 ) {
	                    // add next page parse id to pages hash
	                    startIndex = config.load_more_widget_html.indexOf('data-uix-load-more-href="') + 25;
	                    endIndex = config.load_more_widget_html.indexOf('"', startIndex);
	                    parseId = config.load_more_widget_html.substring(startIndex, endIndex).replace(/&amp;/g, '&');
	                } else {
	                    parseId = '';
	                }
	                self.pages[params.page + 1] = {
	                    parseId: parseId,
	                    cached: false
	                };
	                // add page to cache
	                self.pages[params.page].cached = true;
	                self.pages[params.page].data = parserForMainPage(config.content_html);
	
	                callback(null, self.pages[params.page].data);
	            });
	        }
	    } else if ( !params.page ) {
	        ajax('get', 'https://www.youtube.com/', function ( data, status ) {
	            var html, startIndex, endIndex;
	
	            if ( status !== 200 ) {
	                callback({message: 'request got bad http status (' + status + ')'}, []);
	                return; // eslint-disable-line
	            }
	
	            // add next page parse id to pages hash
	            startIndex = data.indexOf('data-uix-load-more-href="') + 25;
	            endIndex = data.indexOf('"', startIndex);
	            self.pages[params.page + 1] = {parseId: data.substring(startIndex, endIndex).replace(/&amp;/g, '&'), cached: false};
	            // remove useless footer and header parts
	            html = data.slice(data.indexOf('id="feed-main-'), data.indexOf('id="feed-error"'));
	            // add first page to cache
	            self.pages[0] = {
	                cached: true,
	                parseId: '   ',
	                data: parserForMainPage(html)
	            };
	
	            callback(null, self.pages[0].data);
	        });
	    } else if ( this.pages[params.page] && !this.pages[params.page].parseId ) {
	        callback(null, []); // last page
	    } else {
	        callback({message: 'wrong page number (page id not found in cache)'}, []);
	    }
	};
	
	
	MainModel.prototype.filter = function () {
	    if ( true ) {
	        console.log('filter at MainModel not available');
	    }
	
	    return false;
	};
	
	
	// public export
	module.exports = MainModel;


/***/ }),
/* 71 */
/*!********************************!*\
  !*** ./src/js/pages/search.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Loading page implementation.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	var id = 'ps',
		keys = __webpack_require__(/*! stb-keys */ 27),
		app = __webpack_require__(/*! mag-app */ 1),
		// router = require('../temp/router'),
	
		Page = __webpack_require__(/*! stb-component-page */ 36),
		Input = __webpack_require__(/*! ../components/input.native */ 72),
	
		MovieList = __webpack_require__(/*! ../components/list.videos */ 51),
	
		SearchModel = __webpack_require__(/*! ../modules/parser/models/search */ 73),
		player = __webpack_require__(/*! ../modules/player */ 50),
	
		playlistModel = new (__webpack_require__(/*! ../modules/parser/models/playlist */ 74))(),
		debounce = __webpack_require__(/*! ../modules/util/debounce */ 75),
	
		keyboard,
		widgetHelp = __webpack_require__(/*! ../components/widget.help */ 39),
	
		lang = __webpack_require__(/*! ../../../config/lang */ 29),
		//listSuggestions   = require('../components/page.search/list.suggestions'),
	
		page = new Page({$node: document.getElementById(id)}),
		searchInput = new Input({
			$node: document.getElementById('psSearch'),
			$body: document.getElementById('psSearchInput')
		}),
	
		loader = __webpack_require__(/*! ../components/loader */ 41),
	
		needRedraw = true,// parseInt(gSTB.GetDeviceModel().replace('MAG', ''), 10) <= 254,
	
		searchQuery = ' ',
	
		movies = null, loadTimeout = -1, lazyLoad, caretLastPosition;
	
	page.addListener('keydown', function ( event ) {
		if ( event.code === keys.back ) {
			app.route(app.pages.main);
			event.stop = true;
			//router.back();
		}
	});
	
	page.addListener('hide', function () {
		loader.hide();
	});
	
	lazyLoad = debounce(function ( event ) {
		searchQuery = event.value;
		movies.model.filter({searchQuery: event.value});
		clearTimeout(loadTimeout);
		loadTimeout = setTimeout(function () {
			loader.hide();
		}, 5000);
	}, 1000);
	
	page.addListener('show', function ( data ) {
		data = data.data || {};
		widgetHelp.updateView({
			SEARCH: {
				icon: 'search',
				visible: false,
				text: ''
			},
			MORE: {
				icon: 'more',
				visible: false,
				text: ''
			},
			GUIDE: {
				icon: 'info',
				visible: false,
				text: ''
			},
			BACK: {
				icon: 'back',
				visible: true,
				text: gettext('Back')
			}
		});
		loader.hide();
		if ( !page.activeComponent ) {
			if ( needRedraw ) {
				window.psSearchIcon.style.display = 'block';
				setTimeout(function () {
					window.psSearchIcon.style.display = 'inline-table';
				}, 0);
			}
			if ( page.activeComponent === null || page.activeComponent === searchInput ) {
				setTimeout(function () {
					searchInput.focus();
					window.searchInput = searchInput;
					if ( data.search ) {
						searchInput.setValue(data.search);
					}
				}, 0);
			}
		}
	});
	
	(function () {
		keyboard = __webpack_require__(/*! ../components/page.search/keyboard.js */ 76);
		searchInput.addListener('keydown', function ( event ) {
			if ( event.code === keys.down ) {
				caretLastPosition = searchInput.getCaretPosition();
				//debug.info(caretLastPosition, 'caretLastPosition');
				keyboard.focus();
			} else if ( event.code === keys.up && movies.visible ) {
				movies.focus();
				if ( !movies.$focusItem ) {
					movies.focusIndex(0);
				}
			} else if ( event.code === keys.back && this.$body.value.length === 0 ) {
				app.route(app.pages.main);
				event.stop = true;
				// router.back();
			}
		});
		searchInput.addListener('input', function ( event ) {
			movies.hide();
			loader.show();
			lazyLoad(event);
		});
	
		keyboard.addListener('overflow', function ( event ) {
			if ( event.direction === keys.up ) {
				searchInput.focus();
			}
		});
	
		keyboard.addListener('click:item', function ( event ) {
			//debug.log(event.$item.data.className);
			if ( event.$item.data.className === 'symbol' ) {
				searchInput.addChar(event.$item.data.value, caretLastPosition);
				++caretLastPosition;
			} else if ( event.$item.data.className.indexOf('keySpace') !== -1 ) {
				searchInput.addChar(' ', caretLastPosition);
				caretLastPosition = searchInput.getCaretPosition();
			} else if ( event.$item.data.className.indexOf('keyDelete') !== -1 ) {
				searchInput.removeChar();
				caretLastPosition = searchInput.getCaretPosition();
			} else if ( event.$item.data.className.indexOf('delete') !== -1 ) {
				searchInput.setValue('');
				caretLastPosition = searchInput.getCaretPosition();
			}
		});
		keyboard.addListener('keydown', function () {
			lazyLoad({value: searchInput.value});
		});
		movies = new MovieList({
			$node: document.getElementById('psListVideos'),
			model: new SearchModel({order: 'relevance'}),
			className: 'movieList',
			size: 5,
			events: {
				keydown: function ( event ) {
					switch ( event.code ) {
						case keys.down:
							searchInput.focus();
							break;
						case keys.right:
							if ( this.$focusItem.index < this.data.length - 1 ) {
								if ( this.$focusItem.index > 0 ) {
									this.activePage++;
									this.renderView(this.activePage);
								} else {
									this.focusIndex(1);
								}
							}
							break;
						case keys.left:
							// cursor move only on arrow keys
							if ( this.activePage > 0 ) {
								this.activePage--;
								this.renderView(this.activePage);
							} else if ( this.$focusItem.index === 1 ) {
								this.focusIndex(0);
							} else {
								this.move(event.code);
							}
							break;
						case keys.ok:
							// notify listeners
							this.emit('click:item', {$item: this.$focusItem, event: event});
							break;
					}
				},
				'click:item': function ( event ) {
					if ( event.$item.data.type === 'video' ) {
						player.setContent({
							video: event.$item.data,
							playlist: this.data,
							position: event.$item.index
						});
					} else if ( event.$item.data.type === 'playlist' ) {
						//debug.info(event.$item.data, 'event.$item.data');
						playlistModel.getPage({
							playlistId: event.$item.data.playlistId
						},/*).then(*/function ( error, items ) {
							//debug.info(items[0]);
							player.setContent({
								channel: event.$item.data.channel,
								video: items[0],
								playlist: items,
								position: 0
							});
						});
					} else if ( event.$item.data.type === 'channel' ) {
						app.route(app.pages.main, {channel: event.$item.data});
						// router.navigate('pm', {
						// 	channel: event.$item.data
						// });
					}
				},
				'view:ready': function () {
					clearTimeout(loadTimeout);
					loader.hide();
					this.show();
					this.focusIndex(0);
				}
			},
			render: function ( $item, data ) {
				var $container, $tileTop, $tileBottom;
	
				//debug.info($item.ready);
				if ( $item.ready ) {
					$item.$videoThumb.className = 'thumb ' + data.type;
					$item.$videoThumb.style.backgroundImage = 'url(' + data.icon + ')';
					$item.$videoTitle.innerText = data.title;
					$item.$videoTitle.className = 'title ' + data.type;
					$item.$videoAthour.className = 'uploader ' + data.type;
					if ( data.type === 'video' ) {
						$item.$videoAthour.innerText = data.locale.channelTitle;
						$item.$viewCounter.innerText = data.locale.viewCount;
						$item.$dateAdded.innerText = data.locale.publishedAt;
						$item.$videoDuration.innerText = data.duration;
					} else if ( data.type === 'channel' ) {
						$item.$videoAthour.innerText = data.locale.subscriberCount;
						$item.$viewCounter.innerText = '';
						$item.$dateAdded.innerText = '';
						$item.$videoDuration.innerText = '';
					} else {
						$item.$videoAthour.innerText = data.locale.channelTitle;
						$item.$viewCounter.innerText = '';
						$item.$dateAdded.innerText = '';
						$item.$videoDuration.innerText = '';
					}
					if ( data.type === 'playlist' ) {
						$item.$videoDuration.className = 'icon playlist';
					} else {
						$item.$videoDuration.className = 'duration';
					}
				} else {
					$container = document.createElement('div');
					$container.className = 'container';
					$item.appendChild($container);
	
					$tileTop = document.createElement('div');
					$tileTop.className = 'tileTop';
					$container.appendChild($tileTop);
	
					$tileBottom = document.createElement('div');
					$tileBottom.className = 'tileBottom';
					$container.appendChild($tileBottom);
	
					$item.$videoThumb = document.createElement('div');
					$item.$videoThumb.className = 'thumb ' + data.type;
					$item.$videoThumb.style.backgroundImage = 'url(' + data.icon + ')';
					$tileTop.appendChild($item.$videoThumb);
	
					$item.$videoDuration = document.createElement('div');
					if ( data.type === 'playlist' ) {
						$item.$videoDuration.className = 'icon playlist';
					} else {
						$item.$videoDuration.className = 'duration';
					}
					if ( data.duration ) {
						$item.$videoDuration.innerText = data.duration;
					} else {
						$item.$videoDuration.innerText = '';
					}
					$tileTop.appendChild($item.$videoDuration);
	
					$item.$videoTitle = document.createElement('div');
					$item.$videoTitle.className = 'title ' + data.type;
					$item.$videoTitle.innerText = data.title;
					$tileBottom.appendChild($item.$videoTitle);
	
					$item.$videoAthour = document.createElement('div');
					$item.$videoAthour.className = 'uploader ' + data.type;
					if ( data.channelTitle ) {
						$item.$videoAthour.innerText = data.locale.channelTitle;
					} else if ( data.type === 'channel' ) {
						$item.$videoAthour.innerText = data.locale.subscriberCount;
					} else {
						$item.$videoAthour.innerText = '';
					}
					$tileBottom.appendChild($item.$videoAthour);
	
					$item.$viewCounter = document.createElement('div');
					$item.$viewCounter.className = 'viewCount';
					if ( data.type === 'video' ) {
						$item.$viewCounter.innerText = data.locale.viewCount;
					} else {
						$item.$viewCounter.innerText = '';
					}
					$tileBottom.appendChild($item.$viewCounter);
	
					$item.$dateAdded = document.createElement('div');
					$item.$dateAdded.className = 'uploaded';
					if ( data.type === 'video' ) {
						$item.$dateAdded.innerText = data.locale.publishedAt;
					} else {
						$item.$dateAdded.innerText = '';
					}
					$tileBottom.appendChild($item.$dateAdded);
	
					$item.ready = true;
				}
			}
		});
	})();
	
	// public export
	module.exports = page;


/***/ }),
/* 72 */
/*!*******************************************!*\
  !*** ./src/js/components/input.native.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @module stb/ui/input
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! stb-component */ 45),
		keys      = __webpack_require__(/*! stb-keys */ 27);
	
	
	/**
	 * Base input field implementation.
	 * Has two types: text and password.
	 * Password - replace real text with '*', but real text presents in the own property 'value'.
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object} [config={}] init parameters (all inherited from the parent)
	 * @param {Element} [config.$caret] DOM element/fragment to be a input caret element
	 * @param {Element} [config.$placeholder] DOM element/fragment to be a element for input placeholder
	 * @param {string} [config.value='text'] input text value
	 * @param {string} [config.placeholder='password'] placeholder text value
	 * @param {string} [config.type=InputNative.TYPE_TEXT] input type
	 * @param {string} [config.direction='ltr'] symbol direction ('rtl' - right to left, 'ltr' - left to right)
	 *
	 * @example
	 * var InputNative = require('stb/ui/input'),
	 *     input = new InputNative({
	 *         placeholder: 'input password'
	 *         events: {
	 *             input: function ( event ) {
	 *                 //debug.log(event.value);
	 *             }
	 *         }
	 *     });
	 */
	function InputNative ( config ) {
		// current execution context
		var self = this;
	
		/**
		 * Text value of input.
		 *
		 * @type {string}
		 */
		this.value = '';
	
		/**
		 * InputNative type, now available only text and password.
		 * Different logic with different types.
		 * TYPE_TEXT - normal input.
		 * TYPE_PASSWORD - hidden input, all chars replaced with '*', but real value is located in 'this.value'.
		 *
		 * @type {number}
		 */
		this.type = this.TYPE_TEXT;
	
		/**
		 * InputNative type, now available only text and password.
		 * Different logic with different types.
		 * TYPE_TEXT - normal input.
		 * TYPE_PASSWORD - hidden input, all chars replaced with '*', but real value is located in 'this.value'.
		 *
		 * @type {number}
		 */
		this.type = this.TYPE_TEXT;
	
		/**
		 * Direction of the symbols in input.
		 *
		 * @type {string}
		 */
		this.direction = 'ltr';
	
	
		this.noprevent = true;
	
		//this.$shadowInputNative = document.createElement('input');
	
	
		// sanitize
		config = config || {};
	
		// set default className if classList property empty or undefined
		config.className = 'inputNative ' + (config.className || '');
	
		// parent init
		Component.call(this, config);
	
		// component setup
		this.init(config);
	
		this.addListener('keydown', function ( event ) {
			if ( event.code === keys.back ) {
				event.stop = true;
			}
		});
	
		// navigation by keyboard
		this.$body.addEventListener('input', function ( e ) {
			//debug.log(e.charCode, 'INPUT NATIVE');
			self.value = self.$body.value;
			// there are some listeners
			if ( self.events['input'] !== undefined ) {
				// notify listeners
				self.emit('input', {value: self.$body.value});
			}
		});
		this.addListener('focus', function () {
			self.$body.focus();
		});
		this.addListener('blur', function () {
			//debug.log('native input blur');
			self.$body.blur();
		});
	}
	
	
	// inheritance
	InputNative.prototype = Object.create(Component.prototype);
	InputNative.prototype.constructor = InputNative;
	
	
	/**
	 * Init or re-init of the component inner structures and HTML.
	 *
	 * @param {Object} config init parameters (subset of constructor config params)
	 */
	InputNative.prototype.init = function ( config ) {
		// type passed
		if ( config.type !== undefined ) {
			if ( false ) {
				if ( typeof config.type !== 'string' ) { throw 'config.type must be a string'; }
				if ( config.type !== 'password' && config.type !== 'number' ) { throw 'config.type wrong value'; }
			}
			// apply
			this.$body.type = this.type = config.type;
		}
	
		// default value passed
		if ( config.value !== undefined ) {
			if ( false ) {
				if ( typeof config.value !== 'string' ) { throw 'config.value must be a string'; }
			}
			// apply
			this.$body.value = this.value = config.value;
		}
	
		// hint
		if ( config.placeholder !== undefined ) {
			if ( false ) {
				if ( typeof config.placeholder !== 'string' ) { throw 'config.placeholder must be a string'; }
				if ( config.placeholder.length === 0 ) { throw 'config.placeholder must be not an empty string'; }
			}
			// apply
			this.$body.placeholder = config.placeholder;
		}
	
		// char direction
		if ( config.direction !== undefined ) {
			// apply
			if ( false ) {
				if ( typeof config.direction !== 'string' ) { throw 'config.direction must be a string'; }
				if ( config.direction !== 'ltr' && config.direction !== 'rtl' ) { throw 'config.direction wrong value'; }
			}
			this.$node.dir = this.direction = config.direction;
		}
	};
	
	
	/**
	 * Add given char to given position.
	 * Also moving caret in every action.
	 * Do nothing if position is < 0, or if index more or equals to length add char to the end.
	 *
	 * @param {string} char symbol to add
	 * @param {number} [index=this.value.length] given position
	 *
	 * @fires module:stb/ui/input~InputNative#input
	 */
	InputNative.prototype.addChar = function ( char, index ) {
		//var $char = document.createElement('div');
	
		index = (index === undefined) ? this.value.length : index;
	
		if ( false ) {
			if ( index < 0 ) { throw 'index must be more than 0 or equal to 0'; }
			if ( typeof char !== 'string' ) { throw 'char must be a string'; }
			if ( char.length !== 1 ) { throw 'char must be a string with length = 1'; }
		}
	
		// insert char into value
		this.value = this.value.substring(0, index) + char + this.value.substring(index, this.value.length);
	
		this.$body.value = this.value;
	
		// there are some listeners
		if ( this.events['input'] !== undefined ) {
			// notify listeners
			this.emit('input', {value: this.value});
		}
	};
	
	
	/**
	 * Remove char from given position.
	 * Do nothing if index is out of the range (0, length).
	 *
	 * @param {number} [index=this.$caret.index - 1] index given position
	 *
	 * @fires module:stb/ui/input~InputNative#input
	 */
	InputNative.prototype.removeChar = function ( index ) {
		index = (index === undefined) ? this.value.length - 1 : index;
	
		// non-empty string
		if ( this.value.length > 0 ) {
			if ( false ) {
				if ( index < 0 ) { throw 'index must be a positive value'; }
				if ( index > this.value.length ) { throw 'index must be a less than or equal to total length'; }
			}
	
			// cut one char from the value
			this.value = this.value.substring(0, index) + this.value.substring(index + 1, this.value.length);
	
			this.$body.value = this.value;
	
			//there are some listeners
			if ( this.events['input'] !== undefined ) {
				// notify listeners
				this.emit('input', {value: this.value});
			}
		}
		this.$body.value = this.value;
	};
	
	
	/**
	 * Move caret to the given position.
	 * Do nothing if index is out of the range (0, this.value.length).
	 *
	 * @param {number} index given position
	 */
	InputNative.prototype.setCaretPosition = function ( index ) {
		this.$body.setSelectionRange(index, index);
	};
	
	/**
	 * Move caret to the given position.
	 * Do nothing if index is out of the range (0, this.value.length).
	 *
	 * @param {number} index given position
	 */
	InputNative.prototype.getCaretPosition = function () {
		return this.$body.selectionStart;
	};
	
	
	/**
	 * Setting new text value of the input field.
	 *
	 * @param {string} value given string value
	 */
	InputNative.prototype.setValue = function ( value ) {
		if ( false ) {
			if ( typeof value !== 'string' ) { throw 'value must be a string'; }
		}
	
		if ( this.value !== value ) {
			this.value = value;
			this.$body.value = this.value;
	
			// there are some listeners
			if ( this.events['input'] !== undefined ) {
				// notify listeners
				this.emit('input', {value: this.value});
			}
		}
	};
	
	
	// public
	module.exports = InputNative;


/***/ }),
/* 73 */
/*!************************************************!*\
  !*** ./src/js/modules/parser/models/search.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * youtube parser for search page
	 * @author bas
	 */
	
	'use strict';
	
	var tools   = __webpack_require__(/*! ./tools */ 63),
	    ajax    = tools.ajax,
	    Emitter = __webpack_require__(/*! cjs-emitter */ 4);
	
	
	/**
	 * Main page parser
	 *
	 * @param {string} textForParse html with video data
	 *
	 * @return {Array} videos
	 */
	function parserForSearchPage ( textForParse ) {
	    var items = [],
	        type, id, channelTitle, duration, viewCount, publishedAt, title, icon, channelId,
	        playlistId, videoCount, subscriberCount, startIndex, endIndex, tmp, index, text, isLive;
	
	
	    // split by items
	    tmp = textForParse.split('<div class="yt-lockup yt-lockup-tile ');
	    // check each piece of html for video data
	    for ( index = 0; index < tmp.length; index++ ) {
	        text = tmp[index];
	
	        if ( text.indexOf('yt-lockup-content') === -1 ) {
	            continue; // this part of text don't have video block
	        }
	
	        if ( text.indexOf('yt-lockup-playlist') !== -1 ) {
	            type = 'playlist';
	        } else if ( text.indexOf('yt-lockup-channel') !== -1 ) {
	            type = 'channel';
	        } else if ( text.indexOf('yt-lockup-video') !== -1 &&
	            text.indexOf('branded-page-module') === -1 &&      // not branded (add parser for them?)
	            text.indexOf('data-set-reminder-text') === -1 ) {  // not a video but an ad. We don't need fake videos.
	            isLive = text.indexOf('yt-badge-live') !== -1;
	            type = 'video';
	        } else {
	            continue;
	        }
	
	        // video/playlist thumbnail, example: "https://i.ytimg.com/vi/ktiONWfSL48/hqdefault.jpg?custom=true&w=196&jpgq=90&sp=68&sigh=e_W4dPkywvlYwi8av9yYdwHQi8Y"
	        startIndex = text.indexOf('//i.ytimg');
	        endIndex = text.indexOf('"', startIndex);
	        icon = 'https:' + text.substring(startIndex, endIndex).replace(/&amp;/g, '&');
	        // playlist title, example: "Nasa LIVE stream - Earth From Space LIVE"
	        startIndex = text.indexOf('" dir="ltr">') + 12;
	        if ( startIndex === (-1 + 12) ) { // strange title, try again
	            startIndex = text.indexOf(' dir="ltr">') + 11;
	            if ( startIndex === ( -1 + 11) ) { // what if this is Arabic or another right-to-left text?
	                startIndex = text.indexOf('" dir="rtl">') + 12;
	            }
	        }
	        endIndex = text.indexOf('</', startIndex);
	        title = text.substring(startIndex, endIndex);
	        // video/playlist/channel channel id, example: "UCY0C6A3t3RTUN3BB65rWAgQ"
	        if ( text.indexOf('<a href="/channel/') === -1 ) {
	            if ( text.indexOf('data-channel-external-id=') === -1 ) {
	                if ( text.indexOf('<a href="/user/') === -1 ) {
	                    channelId = '';
	                } else {
	                    startIndex = text.indexOf('<a href="/user/') + 10;
	                    endIndex = text.indexOf('"', startIndex);
	                    channelId = text.substring(startIndex, endIndex);
	                }
	            } else {
	                startIndex = text.indexOf('data-channel-external-id="') + 26;
	                endIndex = text.indexOf('"', startIndex);
	                channelId = 'channel/' + text.substring(startIndex, endIndex);
	            }
	        } else {
	            startIndex = text.indexOf('<a href="/channel/') + 10;
	            endIndex = text.indexOf('"', startIndex);
	            channelId = text.substring(startIndex, endIndex);
	        }
	
	        if ( type === 'playlist' ) {
	            // playlist id, example: "/watch?v=5Fn8-hoyLVg&list=LLpmD3iT-8TQzRuygIiS9bAw"
	            if ( text.indexOf('<div class="yt-lockup-byline ">YouTube</div>') !== -1 ) {
	                channelId = ''; // this channel don't have owner - it was created by youtube automatically
	            }
	            // playlist id, example: "/watch?v=5Fn8-hoyLVg&list=LLpmD3iT-8TQzRuygIiS9bAw"
	            startIndex = text.indexOf('<a href="/watch?v=') + 9;
	            endIndex = text.indexOf('"', startIndex);
	            playlistId = text.substring(startIndex, endIndex).replace('&amp;', '&');
	            // channel title, example: "Conor Maynard Covers | 2016"
	            startIndex = text.indexOf('" dir="ltr">', endIndex) + 12;
	            endIndex = text.indexOf('<', startIndex);
	            channelTitle = text.substring(startIndex, endIndex);
	
	            items.push({
	                value: 1,           // always 1, stb hack
	                playlistId: playlistId,
	                channel: {
	                    title: channelTitle.substr(0, 100),
	                    id: channelId
	                },
	                title: title.substr(0, 100),
	                icon: icon,
	                type: 'playlist',
	                channelTitle: channelTitle.substr(0, 100),
	                viewCount: ' ',      // not used by application
	                duration: ' ',       // not used by application
	                publishedAt: ' ',    // parser can't get this information
	                locale: {
	                    publishedAt: ' ',
	                    viewCount: ' ',  // not used by application
	                    channelTitle: channelTitle.substr(0, 100)
	                }
	            });
	        }
	
	        if ( type === 'video' ) {
	            // video title, example: "Nasa LIVE stream - Earth From Space LIVE"
	            startIndex = text.indexOf('" dir="ltr">') + 12;
	            startIndex = text.indexOf('>', startIndex + 1) + 1;
	            if ( startIndex === (-1 + 12) ) { // strange title, try again
	                startIndex = text.indexOf(' dir="ltr">') + 11;
	                if ( startIndex === ( -1 + 11) ) { // what if this is Arabic or another right-to-left text?
	                    startIndex = text.indexOf('" dir="rtl">') + 12;
	                }
	            }
	            endIndex = text.indexOf('</', startIndex);
	            title = text.substring(startIndex, endIndex);
	            // video id, example: "ktiONWfSL48"
	            startIndex = text.indexOf('href="/watch?v=') + 15;
	            endIndex = text.indexOf('"', startIndex);
	            id = text.substring(startIndex, endIndex);
	            // channel title, example: "Ленинград | Leningrad"
	            startIndex = text.indexOf('<a href="', startIndex);
	            startIndex = text.indexOf('>', startIndex) + 1;
	            startIndex = text.indexOf('>', startIndex) + 1;
	            endIndex = text.indexOf('</', startIndex);
	            channelTitle = text.substring(startIndex, endIndex);
	            // video duration, example: "11:59:59"
	            startIndex = text.indexOf('<span class="video-time" aria-hidden="true">') + 44;
	            if ( startIndex === (-1 + 44) ) { // video was streamed so now have strange duration format
	                startIndex = text.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
	            }
	            endIndex = text.indexOf('</', startIndex);
	            duration = text.substring(startIndex, endIndex);
	            // time passed since publishing, example: "1 month ago"
	            startIndex = text.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
	            endIndex = text.indexOf('</', startIndex);
	            publishedAt = text.substring(startIndex, endIndex);
	            // views count, example: "10,000,002"
	            if ( isLive ) {
	                startIndex = text.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
	                endIndex = text.indexOf('<', startIndex);
	            } else {
	                startIndex = text.indexOf('</li><li>', startIndex) + 9; // text not unique: need to use viewCount position
	                endIndex = text.indexOf(' ', startIndex);
	            }
	            viewCount = text.substring(startIndex, endIndex);
	
	            items.push({
	                value: 1,           // always 1, stb hack
	                id: id,
	                channelTitle: channelTitle.substr(0, 100),
	                duration: isLive ? '' : duration.substr(0, 100),
	                realDuration: isLive ? '' : duration.substr(0, 100),
	                viewCount: viewCount.substr(0, 100),
	                publishedAt: isLive ? '' : publishedAt.substr(0, 100),
	                dimension: '',      // not used by application
	                definition: '',     // not used by application
	                title: title.substr(0, 100),
	                icon: icon,
	                channelId: channelId,
	                type: 'video',
	                locale: {
	                    publishedAt: isLive ? '' : publishedAt.substr(0, 100),
	                    viewCount: viewCount.substr(0, 100),
	                    channelTitle: channelTitle.substr(0, 100)
	                }
	            });
	        }
	
	        if ( type === 'channel' ) {
	            // video/playlist/channel thumbnail, example: "https://i.ytimg.com/vi/ktiONWfSL48/hqdefault.jpg?custom=true&w=196&jpgq=90&sp=68&sigh=e_W4dPkywvlYwi8av9yYdwHQi8Y"
	            startIndex = text.indexOf('//yt');
	            endIndex = text.indexOf('"', startIndex);
	            icon = 'https:' + text.substring(startIndex, endIndex);
	            // video/playlist/channel title, example: "Nasa LIVE stream - Earth From Space LIVE"
	            startIndex = text.indexOf('" dir="ltr">') + 12;
	            endIndex = text.indexOf('<', startIndex);
	            title = text.substring(startIndex, endIndex);
	            // number of published videos, example: "191"
	            if ( text.indexOf('yt-channel-title-autogenerated') === -1 ) {
	                startIndex = text.indexOf('"yt-lockup-meta-info"><li>') + 26;
	                endIndex = text.indexOf(' ', startIndex);
	                videoCount = text.substring(startIndex, endIndex);
	            } else {
	                videoCount = ''; // channel created by youtube and have no information about video count
	            }
	            // number of subscribers, example: "4,511,758"
	            startIndex = text.indexOf('yt-subscriber-count" title="') + 28;
	            endIndex = text.indexOf('"', startIndex);
	            subscriberCount = text.substring(startIndex, endIndex);
	
	            items.push({
	                value: 1,           // always 1, stb hack
	                id: channelId,
	                title: title.substr(0, 100),
	                icon: icon,
	                type: 'channel',
	                viewCount: '',                // parser can't get this information
	                commentCount: '',             // parser can't get this information
	                subscriberCount: subscriberCount.substr(0, 100),
	                hiddenSubscriberCount: '',    // parser can't get this information
	                videoCount: videoCount.substr(0, 100),
	                locale: {
	                    subscriberCount: subscriberCount.substr(0, 100)
	                }
	            });
	        }
	    }
	
	    return items;
	}
	
	/**
	 *
	 * @constructor
	 *
	 * @param {Object} config init config
	 */
	function SearchModel ( config ) {
	    Emitter.call(this);
	
	    // example:
	    // this.pages = {
	    //    0: {parseId: '/results?sp=13qAfwy%2346&q=hello', cached: true, data: [{id:'45', title:'text at title', icon:'http...', ...},...]},
	    //    1: {parseId: '/results?sp=SCjqAwA%253D&q=hello', cached: false}
	    // }
	    this.pages = {};
	    this.searchQuery = '';
	
	    //	this.relatedToVideoId = '';
	    //	this.channelId = '';
	    //	this.order = '';
	    //	this.type = '';
	
	    this.filter(config);
	}
	
	SearchModel.prototype = Object.create(Emitter.prototype);
	SearchModel.prototype.constructor = SearchModel;
	
	
	/**
	 * Get parsed page data
	 *
	 * @param {Object} params filters
	 * @param {string} [params.searchQuery = ''] search text
	 * @param {number} [params.page = 0] page number
	 * @param {function} callback callback
	 */
	SearchModel.prototype.getPage = function ( params, callback ) {
	    var self = this;
	
	    params.page = +params.page || 0;
	
	    console.log('getPage');
	    console.log(params);
	
	    if ( this.pages[params.page] && this.pages[params.page].parseId ) {
	        if ( this.pages[params.page].cached ) {
	            callback(null, this.pages[params.page].data);
	        } else {
	        	console.log('https://www.youtube.com' + this.pages[params.page].parseId);
	            ajax('get', 'https://www.youtube.com' + this.pages[params.page].parseId, function ( data, status ) {
	                var html, startIndex, endIndex, parseId;
	
	                if ( status !== 200 ) {
	                    callback({message: 'request got bad http status (' + status + ')'}, []);
	                    return; // eslint-disable-line
	                }
	
	                // find all pages urls
	                startIndex = data.indexOf('class="branded-page-box search-pager');
	                endIndex = data.indexOf('class="branded-page-v2-secondary-col', startIndex);
	                html = data.substring(startIndex, endIndex);
	                html = html.split('<a href="');
	                // check if this is last page
	                if ( html[html.length - 1] && html[html.length - 1].indexOf('»') !== -1 ) {
	                    // find next page url position
	                    startIndex = html[html.length - 1].indexOf('href="/results?') + 6;
	                    endIndex = html[html.length - 1].indexOf('"', startIndex);
	                    parseId = (html[html.length - 1].substring(startIndex, endIndex)).replace('&amp;', '&');
	                } else {
	                    parseId = '';
	                }
	                // add next page parse id to pages hash
	                self.pages[params.page + 1] = {
	                    parseId: parseId,
	                    cached: false
	                };
	                // remove useless footer and header parts
	                html = data.slice(data.indexOf('id="item-section-'), data.indexOf('class="branded-page-box search-pager'));
	                // add first page to cache
	                self.pages[params.page] = {cached: true, data: parserForSearchPage(html)};
	
	                callback(null, self.pages[params.page].data);
	            });
	        }
	    } else if ( !params.page ) {
	    	console.log('https://www.youtube.com/results?search_query=' + this.searchQuery);
	        ajax('get', 'https://www.youtube.com/results?search_query=' + this.searchQuery, function ( data, status ) {
	            var html, startIndex, endIndex, parseId;
	
	            if ( status !== 200 ) {
	                callback({message: 'request got bad http status (' + status + ')'}, []);
	                return; // eslint-disable-line
	            }
	
	            // find all pages urls
	            startIndex = data.indexOf('class="branded-page-box search-pager');
	            endIndex = data.indexOf('class="branded-page-v2-secondary-col', startIndex);
	            html = data.substring(startIndex, endIndex);
	            html = html.split('<a href="');
	            // check if this is last page
	            if ( html[html.length - 1] && html[html.length - 1].indexOf('»') !== -1 ) {
	                // find next page url position
	                startIndex = html[html.length - 1].indexOf('href="/results?') + 6;
	                endIndex = html[html.length - 1].indexOf('"', startIndex);
	                parseId = (html[html.length - 1].substring(startIndex, endIndex)).replace('&amp;', '&');
	            } else {
	                parseId = '';
	            }
	            // add next page parse id to pages hash
	            self.pages[params.page + 1] = {
	                parseId: parseId,
	                cached: false
	            };
	            // remove useless footer and header parts
	            html = data.slice(data.indexOf('id="item-section-'), data.indexOf('class="branded-page-box search-pager'));
	            // add first page to cache
	            self.pages[0] = {
	                cached: true,
	                parseId: '/results?search_query=' + self.searchQuery,
	                data: parserForSearchPage(html)
	            };
	
	            callback(null, self.pages[0].data);
	        });
	    } else if ( this.pages[params.page] && !this.pages[params.page].parseId ) {
	        callback(null, []); // last page
	    } else {
	        callback({message: 'wrong page number (page id not found in cache)'}, []);
	    }
	};
	
	/**
	 *
	 * @param {Object} [params={}] filter parameters
	 * @param {Object} [params.channel] channel object with id and name
	 * @param {string} [params.searchQuery] search query
	 *
	 * @fires SearchModel#content:changed
	 *
	 * @return {boolean} applied filter
	 */
	SearchModel.prototype.filter = function ( params ) {
	    var changed = false;
	
	    // here will be other params
	    if ( params.searchQuery !== undefined && this.searchQuery !== params.searchQuery ) {
	        changed = true;
	        this.searchQuery = params.searchQuery;
	    }
	
	    if ( changed ) {
	        this.pages = {};
	        console.log('content:changed');
	        this.emit('content:changed', params);
	
	        return true;
	    }
	
	    return false;
	};
	
	
	// public export
	module.exports = SearchModel;


/***/ }),
/* 74 */
/*!**************************************************!*\
  !*** ./src/js/modules/parser/models/playlist.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * youtube parser for main page
	 * @author bas
	 */
	
	'use strict';
	
	var tools   = __webpack_require__(/*! ./tools */ 63),
	    ajax    = tools.ajax,
	    Emitter = __webpack_require__(/*! cjs-emitter */ 4);
	
	/**
	 * Main page parser
	 *
	 * @param {string} textForParse html with video data
	 * @param {string} channelId channel id
	 *
	 * @return {Array} videos
	 */
	function parserForPlaylistPage ( textForParse, channelId ) {
	    var items = [],
	        id, channelTitle, title, icon, tmp, startIndex, endIndex, text, index;
	
	    // split by items
	    tmp = textForParse.split('<li class="yt-uix-scroller-scroll-unit');
	    // check each piece of html for video data
	    for ( index = 0; index < tmp.length; index++ ) {
	        text = tmp[index];
	
	        if ( text.indexOf('<div class="playlist-video-description">') === -1 ) {
	            continue; // this part of text don't have video block
	        }
	
	        startIndex = text.indexOf('<span class="video-uploader-byline">') + 36;
	        endIndex = text.indexOf('</span>', startIndex);
	        if ( !((text.substring(startIndex, endIndex)).trim() ) ) {
	            continue; // this video was removed or banned
	        }
	
	        // video id, example: "ktiONWfSL48"
	        startIndex = text.indexOf('data-video-id="') + 15;
	        endIndex = text.indexOf('"', startIndex);
	        id = text.substring(startIndex, endIndex);
	        // video title, example: "Nasa LIVE stream - Earth From Space LIVE"
	        startIndex = text.indexOf('data-video-title="') + 18;
	        endIndex = text.indexOf('"', startIndex);
	        title = text.substring(startIndex, endIndex);
	        // video thumbnail, example: "https://i.ytimg.com/vi/ktiONWfSL48/hqdefault.jpg?custom=true&w=196&jpgq=90&sp=68&sigh=e_W4dPkywvlYwi8av9yYdwHQi8Y"
	        startIndex = text.indexOf('="https://i.ytimg') + 2;
	        endIndex = text.indexOf('"', startIndex);
	        icon = text.substring(startIndex, endIndex).replace(/&amp;/g, '&');
	        // channel title, example: "Ленинград | Leningrad"
	        startIndex = text.indexOf('data-video-username="') + 21;
	        endIndex = text.indexOf('"', startIndex);
	        channelTitle = text.substring(startIndex, endIndex);
	
	        items.push({
	            value: 1,                   // always 1, stb hack
	            id: id,
	            channelTitle: channelTitle,
	            duration: ' ',              // parser can't get this info
	            realDuration: ' ',          // parser can't get this info
	            viewCount: ' ',             // parser can't get this info
	            publishedAt: ' ',           // parser can't get this info
	            dimension: '',              // not used by application
	            definition: '',             // not used by application
	            title: title,
	            icon: icon,
	            channelId: channelId,
	            type: 'video',
	            locale: {
	                publishedAt: ' ',       // parser can't get this info
	                viewCount: ' ',         // parser can't get this info
	                channelTitle: channelTitle
	            }
	        });
	    }
	
	    return items;
	}
	
	/**
	 * @constructor
	 */
	function PlaylistModel () {
	    Emitter.call(this);
	
	    this.pages = {};
	
	    this.playlistId = null;
	}
	
	PlaylistModel.prototype = Object.create(Emitter.prototype);
	PlaylistModel.prototype.constructor = PlaylistModel;
	
	
	/**
	 * Get parsed page data
	 *
	 * @param {Object} params filters
	 * @param {number} [params.page = 0] page number
	 * @param {function} callback callback
	 */
	PlaylistModel.prototype.getPage = function ( params, callback ) {
	    var self = this;
	
	    params.page = params.page || 0;
	
	    if ( !params.playlistId ) {
	        callback({message: 'error: field arguments[0].playlistId is empty'}, []);
	
	        return;
	    }
	    if ( params.playlistId !== this.playlistId ) {
	        this.playlistId = params.playlistId;
	        this.pages = {};
	    }
	    // PlaylistModel always return only one (first) page containing all available videos for this playlist
	    if ( params.page ) {
	        callback(null, []);
	
	        return;
	    }
	
	    if ( this.pages[0] ) {
	        callback(null, this.pages[0].data);
	    } else {
	        ajax('get', 'https://www.youtube.com' + params.playlistId, function ( data, status ) {
	            var html, startIndex, endIndex, channelId;
	
	            if ( status !== 200 ) {
	                callback({message: 'request got bad http status (' + status + ')'}, []);
	                return; // eslint-disable-line
	            }
	
	            // get channel id, example: "channel/UCY0C6A3t3RTUN3BB65rWAgQ"
	            startIndex = data.indexOf('<a href="/channel/') + 10;
	            endIndex = data.indexOf('"', startIndex);
	            channelId = data.substring(startIndex, endIndex);
	            // remove useless footer and header parts
	            startIndex = data.indexOf('id="playlist-autoscroll-list"');
	            endIndex = data.indexOf('id="placeholder-player"', startIndex);
	            html = data.slice(startIndex, endIndex);
	            // add first page to cache
	            self.pages[0] = {
	                cached: true,
	                parseId: params.playlistId.replace(/&amp;/g, '&'),
	                data: parserForPlaylistPage(html, channelId)
	            };
	
	            callback(null, self.pages[0].data);
	        });
	    }
	};
	
	
	PlaylistModel.prototype.filter = function () {
	    if ( true ) {
	        console.log('filter at PlaylistModel not available');
	    }
	
	    return false;
	};
	
	
	// public export
	module.exports = PlaylistModel;


/***/ }),
/* 75 */
/*!*****************************************!*\
  !*** ./src/js/modules/util/debounce.js ***!
  \*****************************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function (func, wait) {
		var timeout;
		return function() {
			var self = this,
				args = arguments;
	
			clearTimeout(timeout);
	
			// Set the new timeout
			timeout = setTimeout(function() {
				timeout = null;
				func.apply(self, args);
			}, wait);
		};
	};


/***/ }),
/* 76 */
/*!***************************************************!*\
  !*** ./src/js/components/page.search/keyboard.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! mag-app */ 1),
	
		Grid = __webpack_require__(/*! stb-component-grid */ 77),
	
		l10n = __webpack_require__(/*! ../../modules/util/l10n */ 56),
	
		lang = __webpack_require__(/*! ../../../../config/lang */ 29),
	
		keyboard = new Grid({
			$node:document.getElementById('psKeyboard'),
			className: 'keyList',
			cycleY: false,
			events: {
				'click:item': function ( event ) {
					if ( event.$item.data.className.indexOf('keyGlobe') !== -1 ) {
						app.settings.keyboardLanguage = l10n.nextLang(app.settings.keyboardLanguage);
						this.viewIndex = null;
						this.init({
							data: __webpack_require__(/*! ../../../../config/keyboards */ 79)("./" + lang.languages[app.settings.keyboardLanguage])
						});
						this.focusItem($langItem);
						window.top.gSTB.SetInputLang(lang.languages[app.settings.keyboardLanguage]);
					} else if ( event.$item.data.className.indexOf('nums') !== -1 ) {
						this.init({data: [
							[
								{value:'1', className:'symbol'},
								{value:'2', className:'symbol'},
								{value:'3', className:'symbol'},
								{value:'^', className:'symbol'},
								{value:'`', className:'symbol'},
								{value:'!', className:'symbol'},
								{value:'#', className:'symbol'},
								{value:'$', className:'symbol'},
								{value:'%', className:'symbol'},
							],
							[
								{value:'4', className:'symbol'},
								{value:'5', className:'symbol'},
								{value:'6', className:'symbol'},
								{value:'&', className:'symbol'},
								{value:'(', className:'symbol'},
								{value:')', className:'symbol'},
								{value:'*', className:'symbol'},
								{value:';', className:'symbol'},
								{value:':', className:'symbol'},
							],
							[
								{value:'7', className:'symbol'},
								{value:'8', className:'symbol'},
								{value:'9', className:'symbol'},
								{value:'~', className:'symbol'},
								{value:'/', className:'symbol'},
								{value:'|', className:'symbol'},
								{value:'%', className:'symbol'},
								{value:':', className:'symbol'},
								{value:'?', className:'symbol'}
							],
							[
								{value:'№', className:'symbol'},
								{value:'0', className:'symbol'},
								{value:'[', className:'symbol'},
								{value:']', className:'symbol'},
								{value:'"', className:'symbol'},
								{value:'\'', className:'symbol'},
								{value:'{', className:'symbol'},
								{value:'}', className:'symbol'},
								{value:'ABC', className:'symbol letters'}
							]
						]});
					} else if ( event.$item.data.className.indexOf('letters') !== -1 ) {
						this.init({
							data: __webpack_require__(/*! ../../../../config/keyboards */ 79)("./" + lang.languages[app.settings.keyboardLanguage])
						});
					}
				}
			},
			render: function ( $item, data ) {
				if ( data.className === 'keyGlobe' ) {
					$item.innerHTML = lang.languagesCodeLocalized[app.settings.keyboardLanguage];
					$langItem = $item;
				} else {
					$item.innerHTML = data.value;
				}
				if ( data.className ) {
					$item.className = 'item ' + data.className;
				}
			},
			data: __webpack_require__(/*! ../../../../config/keyboards */ 79)("./" + lang.languages[app.settings.keyboardLanguage])
		}),
	
		$langItem;
	
	
	window.top.gSTB.SetInputLang(lang.languages[app.settings.keyboardLanguage]);
	
	module.exports = keyboard;


/***/ }),
/* 77 */
/*!***************************************!*\
  !*** ./~/stb-component-grid/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license The MIT License (MIT)
	 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	'use strict';
	
	// public
	module.exports = __webpack_require__(/*! spa-component-grid */ 78);
	
	// correct component name
	module.exports.prototype.name = 'stb-component-grid';


/***/ }),
/* 78 */
/*!***************************************!*\
  !*** ./~/spa-component-grid/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @license The MIT License (MIT)
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 */
	
	/* eslint no-path-concat: 0 */
	
	'use strict';
	
	var Component = __webpack_require__(/*! spa-component */ 38),
	    keys      = __webpack_require__(/*! spa-keys */ 28);
	
	
	/**
	 * Mouse click event.
	 *
	 * @event module:stb/ui/grid~Grid#click:item
	 *
	 * @type {Object}
	 * @property {Element} $item clicked HTML item
	 * @property {Event} event click event data
	 */
	
	
	/**
	 * Base grid/table implementation.
	 *
	 * For navigation map implementation and tests see {@link https://gist.github.com/DarkPark/8c0c2926bfa234043ed1}.
	 *
	 * Each data cell can be either a primitive value or an object with these fields:
	 *
	 *  Name    | Description
	 * ---------|-------------
	 *  value   | actual cell value to render
	 *  colSpan | amount of cells to merge horizontally
	 *  rowSpan | amount of cells to merge vertically
	 *  mark    | is it necessary or not to render this cell as marked
	 *  focus   | is it necessary or not to render this cell as focused
	 *  disable | is it necessary or not to set this cell as disabled
	 *
	 * @constructor
	 * @extends Component
	 *
	 * @param {Object}   [config={}] init parameters (all inherited from the parent)
	 * @param {Array[]}  [config.data=[]] component data to visualize
	 * @param {function} [config.render] method to build each grid cell content
	 * @param {function} [config.navigate] method to move focus according to pressed keys
	 * @param {boolean}  [config.cycleX=true] allow or not to jump to the opposite side of line when there is nowhere to go next
	 * @param {boolean}  [config.cycleY=true] allow or not to jump to the opposite side of column when there is nowhere to go next
	 * @param {Object}   [config.provider] data provider
	 * @param {number}   [config.sizeX] grid columns count
	 * @param {number}   [config.sizeX] grid rows count
	 *
	 * @fires module:stb/ui/grid~Grid#click:item
	 *
	 * @example
	 * var Grid = require('stb/ui/grid'),
	 *     grid = new Grid({
	 *         data: [
	 *             [1,   2,  3, {value: '4;8;12;16', focus: true, rowSpan: 4}],
	 *             [5,   6,  7],
	 *             [9,  10, 11],
	 *             [13, 14, {value: 15, disable: true}]
	 *         ],
	 *         render: function ( $item, data ) {
	 *             $item.innerHTML = '<div>' + (data.value) + '</div>';
	 *         },
	 *         cycleX: false
	 *     });
	 */
	function Grid ( config ) {
	    // current execution context
	    //var self = this;
	
	    console.assert(typeof this === 'object', 'must be constructed via new');
	
	    // sanitize
	    config = config || {};
	
	    if ( true ) {
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        // init parameters checks
	        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
	            throw new Error(__filename + ': wrong or empty config.className');
	        }
	        // if ( config.navigate && typeof config.navigate !== 'function' ) {
	        //     throw new Error(__filename + ': wrong config.navigate type');
	        // }
	    }
	
	    /**
	     * List of DOM elements representing the component cells.
	     * Necessary for navigation calculations.
	     *
	     * @type {Element[][]}
	     */
	    this.map = [];
	
	    /**
	     * Link to the currently focused DOM element.
	     *
	     * @type {Element}
	     */
	    this.$focusItem = null;
	
	    /**
	     * Component data to visualize.
	     *
	     * @type {Array[]}
	     */
	    this.data = [];
	
	    /**
	     * Allow or not to jump to the opposite side of line when there is nowhere to go next.
	     *
	     * @type {boolean}
	     */
	    this.cycleX = true;
	
	    /**
	     * Allow or not to jump to the opposite side of column when there is nowhere to go next.
	     *
	     * @type {boolean}
	     */
	    this.cycleY = true;
	
	    /**
	     * Current navigation map horizontal position.
	     *
	     * @type {number}
	     */
	    this.focusX = 0;
	
	    /**
	     * Current navigation map vertical position.
	     *
	     * @type {number}
	     */
	    this.focusY = 0;
	
	    // set default className if classList property empty or undefined
	    //config.className = 'grid ' + (config.className || '');
	
	    // parent constructor call
	    Component.call(this, config);
	
	    // component setup
	    this.init(config);
	
	    // custom navigation method
	    //if ( config.navigate ) {
	    //    // apply
	    //    this.navigate = config.navigate;
	    //}
	
	    // navigation by keyboard
	    //this.addListener('keydown', this.navigate);
	
	    // navigation by mouse
	    //this.$body.addEventListener('mousewheel', function ( event ) {
	    //    // scrolling by Y axis
	    //    if ( event.wheelDeltaY ) {
	    //        self.move(event.wheelDeltaY > 0 ? keys.up : keys.down);
	    //    }
	    //
	    //    // scrolling by X axis
	    //    if ( event.wheelDeltaX ) {
	    //        self.move(event.wheelDeltaX > 0 ? keys.left : keys.right);
	    //    }
	    //});
	}
	
	
	// inheritance
	Grid.prototype = Object.create(Component.prototype);
	Grid.prototype.constructor = Grid;
	
	// set component name
	Grid.prototype.name = 'spa-component-grid';
	
	
	/**
	 * Fill the given cell with data.
	 * $item.data can contain the old data (from the previous render).
	 *
	 * @param {Element} $item item DOM link
	 * @param {*} data associated with this item data
	 */
	Grid.prototype.renderItemDefault = function ( $item, data ) {
	    if ( true ) {
	        if ( arguments.length !== 2 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !($item instanceof Element) ) {
	            throw new Error(__filename + ': wrong $item type');
	        }
	    }
	
	    $item.innerText = data.value;
	};
	
	
	/**
	 * Method to build each grid cell content.
	 * Can be redefined to provide custom rendering.
	 *
	 * @type {function}
	 */
	Grid.prototype.renderItem = Grid.prototype.renderItemDefault;
	
	
	/**
	 * List of all default event callbacks.
	 *
	 * @type {Object.<string, function>}
	 */
	Grid.prototype.defaultEvents = {
	    /**
	     * Default method to handle mouse wheel events.
	     *
	     * @param {Event} event generated event
	     */
	    mousewheel: function ( event ) {
	        // scrolling by Y axis
	        if ( event.wheelDeltaY ) {
	            this.move(event.wheelDeltaY > 0 ? keys.up : keys.down);
	        }
	
	        // scrolling by X axis
	        if ( event.wheelDeltaX ) {
	            this.move(event.wheelDeltaX > 0 ? keys.left : keys.right);
	        }
	    },
	
	    /**
	     * Default method to handle keyboard keydown events.
	     *
	     * @param {Object} event generated event
	     */
	    keydown: function ( event ) {
	        switch ( event.code ) {
	            case keys.up:
	            case keys.down:
	            case keys.right:
	            case keys.left:
	                // cursor move only on arrow keys
	                this.move(event.code);
	                break;
	            case keys.enter:
	                // there are some listeners
	                if ( this.events['click:item'] ) {
	                    // notify listeners
	                    this.emit('click:item', {$item: this.$focusItem, event: event});
	                }
	                break;
	        }
	    }
	};
	
	
	/**
	 * Default method to move focus according to pressed keys.
	 *
	 * @param {Object} event generated event source of movement
	 */
	//Grid.prototype.navigateDefault = function ( event ) {
	//    switch ( event.code ) {
	//        case keys.up:
	//        case keys.down:
	//        case keys.right:
	//        case keys.left:
	//            // cursor move only on arrow keys
	//            this.move(event.code);
	//            break;
	//        case keys.ok:
	//            // there are some listeners
	//            if ( this.events['click:item'] ) {
	//                // notify listeners
	//                this.emit('click:item', {$item: this.$focusItem, event: event});
	//            }
	//            break;
	//    }
	//};
	
	
	/**
	 * Current active method to move focus according to pressed keys.
	 * Can be redefined to provide custom navigation.
	 *
	 * @type {function}
	 */
	//Grid.prototype.navigate = Grid.prototype.navigateDefault;
	
	
	/**
	 * Make all the data items identical.
	 * Wrap to objects if necessary and add missing properties.
	 *
	 * @param {Array[]} data user 2-dimensional array
	 * @return {Array[]} reworked incoming data
	 */
	function normalize ( data ) {
	    var idxY, idxX, item;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !Array.isArray(data) ) {
	            throw new Error(__filename + ': wrong data type');
	        }
	    }
	
	    // rows
	    for ( idxY = 0; idxY < data.length; idxY++ ) {
	        // cols
	        for ( idxX = 0; idxX < data[idxY].length; idxX++ ) {
	            // cell value
	            item = data[idxY][idxX];
	
	            // primitive value
	            if ( typeof item === 'object' ) {
	                // always at least one row/col
	                item.colSpan = item.colSpan || 1;
	                item.rowSpan = item.rowSpan || 1;
	            } else {
	                // wrap with defaults
	                item = data[idxY][idxX] = {
	                    value: data[idxY][idxX],
	                    colSpan: 1,
	                    rowSpan: 1
	                };
	            }
	
	            if ( true ) {
	                // if ( !('value' in item) ) {
	                //     throw new Error(__filename + ': field "value" is missing');
	                // }
	                if ( Number(item.colSpan) !== item.colSpan ) {
	                    throw new Error(__filename + ': item.colSpan must be a number');
	                }
	                if ( Number(item.rowSpan) !== item.rowSpan ) {
	                    throw new Error(__filename + ': item.rowSpan must be a number');
	                }
	                if ( item.colSpan <= 0 ) {
	                    throw new Error(__filename + ': item.colSpan should be positive');
	                }
	                if ( item.rowSpan <= 0 ) {
	                    throw new Error(__filename + ': item.rowSpan should be positive');
	                }
	                if ( ('focus' in item) && Boolean(item.focus) !== item.focus ) {
	                    throw new Error(__filename + ': item.focus must be boolean');
	                }
	                if ( ('disable' in item) && Boolean(item.disable) !== item.disable ) {
	                    throw new Error(__filename + ': item.disable must be boolean');
	                }
	            }
	        }
	    }
	
	    return data;
	}
	
	
	/**
	 * Fill the given rectangle area with value.
	 *
	 * @param {Array[]} map link to navigation map
	 * @param {number} posX current horizontal position
	 * @param {number} posY current vertical position
	 * @param {number} dX amount of horizontal cell to fill
	 * @param {number} dY amount of vertical cell to fill
	 * @param {*} value filling data
	 */
	function fill ( map, posX, posY, dX, dY, value ) {
	    var idxY, idxX;
	
	    if ( true ) {
	        if ( arguments.length !== 6 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !Array.isArray(map) ) {
	            throw new Error(__filename + ': wrong map type');
	        }
	    }
	
	    // rows
	    for ( idxY = posY; idxY < posY + dY; idxY++ ) {
	        // expand map rows
	        if ( map.length < idxY + 1 ) { map.push([]); }
	
	        // compensate long columns from previous rows
	        while ( map[idxY][posX] !== undefined ) {
	            posX++;
	        }
	
	        // cols
	        for ( idxX = posX; idxX < posX + dX; idxX++ ) {
	            // expand map row cols
	            if ( map[idxY].length < idxX + 1 ) { map[idxY].push(); }
	            // fill
	            map[idxY][idxX] = value;
	            // apply coordinates for future mouse clicks
	            if ( value.x === undefined ) { value.x = idxX; }
	            if ( value.y === undefined ) { value.y = idxY; }
	        }
	    }
	}
	
	
	/**
	 * Create a navigation map from incoming data.
	 *
	 * @param {Array[]} data user 2-dimensional array of objects
	 * @return {Array[]} navigation map
	 */
	function map ( data ) {
	    var result = [],
	        idxY, idxX, item;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !Array.isArray(data) ) {
	            throw new Error(__filename + ': wrong data type');
	        }
	    }
	
	    // rows
	    for ( idxY = 0; idxY < data.length; idxY++ ) {
	        // cols
	        for ( idxX = 0; idxX < data[idxY].length; idxX++ ) {
	            // cell value
	            item = data[idxY][idxX];
	            // process a cell
	            fill(result, idxX, idxY, item.colSpan, item.rowSpan, item.$item);
	            // clear redundant info
	            delete item.$item;
	        }
	    }
	
	    return result;
	}
	
	
	/**
	 * Init or re-init of the component inner structures and HTML.
	 *
	 * @param {Object} config init parameters (subset of constructor config params)
	 */
	Grid.prototype.init = function ( config ) {
	    var self = this,
	        draw = false,
	        idxY, idxX,
	        $row, $item, $tbody, $focusItem,
	        itemData, newData,
	        /**
	         * Cell mouse click handler.
	         *
	         * @param {Event} event click event data
	         *
	         * @this Element
	         *
	         * @fires module:stb/ui/grid~Grid#click:item
	         */
	        onItemClick = function ( event ) {
	            // allow to accept focus
	            if ( this.data.disable !== true ) {
	                // visualize
	                self.focusItem(this);
	
	                // there are some listeners
	                if ( self.events['click:item'] ) {
	                    // notify listeners
	                    self.emit('click:item', {$item: this, event: event});
	                }
	            }
	        },
	        /**
	         * Construct grid when receive new data
	         *
	         * @param {Array} data to render
	         */
	        construct = function ( data ) {
	
	            // apply data
	            if ( data ) {
	                // new data is different
	                if ( self.data !== data ) {
	                    // apply
	                    self.data = data;
	                    // need to redraw table
	                    draw = true;
	                }
	            }
	
	            // custom render method
	            if ( config.render ) {
	                // new render is different
	                if ( self.renderItem !== config.render ) {
	                    // apply
	                    self.renderItem = config.render;
	                    // need to redraw table
	                    draw = true;
	                }
	            }
	
	            if ( !draw ) {
	                // do not redraw table
	                return;
	            }
	
	            // export pointer to inner table
	            self.$table = document.createElement('table');
	            $tbody = document.createElement('tbody');
	
	            // prepare user data
	            self.data = normalize(self.data);
	
	            // rows
	            for ( idxY = 0; idxY < self.data.length; idxY++ ) {
	                // dom
	                $row = $tbody.insertRow();
	
	                // cols
	                for ( idxX = 0; idxX < self.data[idxY].length; idxX++ ) {
	                    // dom
	                    $item = $row.insertCell(-1);
	                    // additional params
	                    $item.className = 'item';
	
	                    // shortcut
	                    itemData = self.data[idxY][idxX];
	
	                    // for map
	                    itemData.$item = $item;
	
	                    // merge columns
	                    $item.colSpan = itemData.colSpan;
	
	                    // merge rows
	                    $item.rowSpan = itemData.rowSpan;
	
	                    // active cell
	                    if ( itemData.focus ) {
	                        // store and clean
	                        $focusItem = $item;
	                    }
	
	                    // disabled cell
	                    if ( itemData.disable ) {
	                        // apply CSS
	                        $item.classList.add('disable');
	                    }
	
	                    // marked cell
	                    if ( itemData.mark ) {
	                        // apply CSS
	                        $item.classList.add('mark');
	                    }
	
	                    // visualize
	                    self.renderItem($item, itemData);
	
	                    // save data link
	                    $item.data = itemData;
	
	                    // manual focusing
	                    $item.addEventListener('click', onItemClick);
	                }
	                // row is ready
	                $tbody.appendChild($row);
	            }
	
	            // navigation map filling
	            self.map = map(self.data);
	
	            // clear all table
	            self.$body.innerText = null;
	
	            // everything is ready
	            self.$table.appendChild($tbody);
	            self.$body.appendChild(self.$table);
	
	            // apply focus
	            if ( $focusItem ) {
	                // focus item was given in data
	                self.focusItem($focusItem);
	            } else {
	                // just the first cell
	                self.focusItem(self.map[0][0]);
	            }
	        };
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( typeof config !== 'object' ) {
	            throw new Error(__filename + ': wrong config type');
	        }
	        if ( config.data && (!Array.isArray(config.data) || !Array.isArray(config.data[0])) ) {
	            throw new Error(__filename + ': wrong config.data type');
	        }
	        if ( config.render && typeof config.render !== 'function' ) {
	            throw new Error(__filename + ': wrong config.render type');
	        }
	    }
	
	    // apply cycle behaviour
	    if ( config.cycleX !== undefined ) {
	        this.cycleX = config.cycleX;
	    }
	    if ( config.cycleY !== undefined ) {
	        this.cycleY = config.cycleY;
	    }
	
	
	    if ( config.provider ) {
	        if ( true ) {
	            if ( !config.sizeX || !config.sizeY ) {
	                throw new Error(__filename + ': wrong grid data size');
	            }
	        }
	
	        this.provider = config.provider;
	        this.sizeX = config.sizeX;
	        this.sizeY = config.sizeY;
	    }
	
	    if ( config.translate ) {
	        this.translate = config.translate;
	    }
	
	    if ( config.provider ) {
	        newData = this.provider.get(null, function ( error, data ) {
	            if ( error ) {
	                if ( self.events['data:error'] ) {
	                    /**
	                     * Provider get error while take new data
	                     *
	                     * @event module:stb/ui/grid~Grid#data:error
	                     */
	                    self.emit('data:error', error);
	                }
	            }
	            construct(self.translate(data));
	
	            if ( self.events['data:ready'] ) {
	                /**
	                 * Provider get new data and reinit grid
	                 *
	                 * @event module:stb/ui/grid~Grid#data:ready
	                 */
	                self.emit('data:ready');
	            }
	        });
	
	        if ( this.events['data:get'] ) {
	            /**
	             * Provider request new data
	             *
	             * @event module:stb/ui/grid~Grid#data:get
	             *
	             * @type {Object}
	             * @property {boolean} fresh status of data to response
	             */
	            this.emit('data:get', {fresh: newData});
	        }
	    } else {
	        construct(config.data);
	    }
	
	
	};
	
	/**
	 * Default translate function
	 *
	 * @param {Array} data to translate
	 * @return {Array} data to use as grid data
	 */
	Grid.prototype.defaultTranslate = function ( data ) {
	    var result = [],
	        idxY, idxX, arr;
	
	    for ( idxY = 0; idxY < this.sizeY; idxY++ ) {
	        arr = [];
	        for ( idxX = 0; idxX < this.sizeX; idxX++ ) {
	            arr[idxX] = data[idxY * this.sizeX + idxX];
	        }
	        result[idxY] = arr;
	    }
	
	    return result;
	};
	
	
	/**
	 * Method to translate given array to array adapted to use as grid data
	 * Can be redefined to provide custom translate.
	 *
	 * @type {function}
	 */
	Grid.prototype.translate = Grid.prototype.defaultTranslate;
	
	
	/**
	 * Move focus to the given direction.
	 *
	 * @param {number} direction arrow key code
	 *
	 * @fires module:stb/ui/grid~Grid#cycle
	 * @fires module:stb/ui/grid~Grid#overflow
	 * @fires module:stb/ui/grid~Grid#data:get
	 * @fires module:stb/ui/grid~Grid#data:ready
	 * @fires module:stb/ui/grid~Grid#data:error
	 */
	Grid.prototype.move = function ( direction ) {
	    var focusX   = this.focusX,
	        focusY   = this.focusY,
	        move     = true,
	        overflow = false,
	        cycle    = false,
	        newData;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( Number(direction) !== direction ) {
	            throw new Error(__filename + ': direction must be a number');
	        }
	    }
	
	    // shift till full stop
	    while ( move ) {
	        // arrow keys
	        switch ( direction ) {
	            case keys.up:
	                if ( focusY > 0 ) {
	                    // can go one step up
	                    focusY--;
	                } else {
	                    if ( this.cycleY ) {
	                        // jump to the last row
	                        focusY = this.map.length - 1;
	                        cycle = true;
	                    }
	                    // grid edge
	                    overflow = true;
	                }
	                break;
	
	            case keys.down:
	                if ( focusY < this.map.length - 1 ) {
	                    // can go one step down
	                    focusY++;
	                } else {
	                    if ( this.cycleY ) {
	                        // jump to the first row
	                        focusY = 0;
	                        cycle = true;
	                    }
	                    // grid edge
	                    overflow = true;
	                }
	                break;
	
	            case keys.right:
	                if ( focusX < this.map[focusY].length - 1 ) {
	                    // can go one step right
	                    focusX++;
	                } else {
	                    if ( this.cycleX ) {
	                        // jump to the first column
	                        focusX = 0;
	                        cycle = true;
	                    }
	                    // grid edge
	                    overflow = true;
	                }
	                break;
	
	            case keys.left:
	                if ( focusX > 0 ) {
	                    // can go one step left
	                    focusX--;
	                } else {
	                    if ( this.cycleX ) {
	                        // jump to the last column
	                        focusX = this.map[focusY].length - 1;
	                        cycle = true;
	                    }
	                    // grid edge
	                    overflow = true;
	
	                }
	                break;
	        }
	
	        // full cycle - has come to the start point
	        if ( focusX === this.focusX && focusY === this.focusY ) {
	            // full stop
	            move = false;
	        }
	
	        // focus item has changed and it's not disabled
	        if ( this.map[focusY][focusX] !== this.map[this.focusY][this.focusX] && this.map[focusY][focusX].data.disable !== true ) {
	            // full stop
	            move = false;
	        }
	
	        // the last cell in a row/col
	        if ( overflow ) {
	            // full stop
	            move = false;
	            // but it's disabled so need to go back
	            if ( this.map[focusY][focusX].data.disable === true ) {
	                // return to the start point
	                focusX = this.focusX;
	                focusY = this.focusY;
	            }
	        }
	    }
	
	    this.focusItem(this.map[focusY][focusX]);
	
	    // correct coordinates
	    // focusItem set approximate values
	    this.focusX = focusX;
	    this.focusY = focusY;
	
	    if ( overflow ) {
	        //
	        if ( this.provider ) {
	            newData = this.provider.get(direction, function ( error, data ) {
	                var  idxY, idxX;
	
	                if ( error ) {
	
	                    if ( self.events['data:error'] ) {
	                        /**
	                         * Provider get error while take new data
	                         *
	                         * @event module:stb/ui/grid~Grid#data:error
	                         */
	                        self.emit('data:error', error);
	
	                        return;
	                    }
	                }
	
	                if ( data ) {
	                    self.data = self.translate(data);
	                    for ( idxY = 0; idxY < self.sizeY - 1; idxY++ ) {
	                        for ( idxX = 0; idxX < self.sizeX; idxX++ ) {
	                            self.renderItem(self.map[idxY][idxX], self.data[idxY][idxX]);
	                        }
	                    }
	
	                    if ( self.events['data:ready'] ) {
	                        /**
	                         * Provider get new data and reinit grid
	                         *
	                         * @event module:stb/ui/grid~Grid#data:ready
	                         */
	                        self.emit('data:ready');
	                    }
	                }
	
	            });
	
	            if ( this.events['data:get'] ) {
	                /**
	                 * Provider request new data
	                 *
	                 * @event module:stb/ui/grid~Grid#data:get
	                 *
	                 * @type {Object}
	                 * @property {boolean} fresh status of data to response
	                 */
	                this.emit('data:get', {fresh: newData});
	            }
	        }
	
	        // there are some listeners
	        if ( this.events['overflow'] ) {
	            /**
	             * Attempt to go beyond the edge of the grid.
	             *
	             * @event module:stb/ui/grid~Grid#overflow
	             *
	             * @type {Object}
	             * @property {number} direction key code initiator of movement
	             * @property {number} cycle ...
	             */
	            this.emit('overflow', {direction: direction, cycle: cycle});
	        }
	    }
	
	    // report
	    debug.info(this.focusX + ' : ' + focusX, 'X old/new');
	    debug.info(this.focusY + ' : ' + focusY, 'Y old/new');
	    debug.info(cycle, 'cycle');
	    debug.info(overflow, 'overflow');
	
	
	};
	
	
	/**
	 * Highlight the given DOM element as focused.
	 * Remove focus from the previously focused item.
	 *
	 * @param {Node|Element} $item element to focus
	 * @param {number} $item.x the item horizontal position
	 * @param {number} $item.y the item vertical position
	 *
	 * @return {boolean} operation status
	 *
	 * @fires module:stb/ui/grid~Grid#focus:item
	 * @fires module:stb/ui/grid~Grid#blur:item
	 */
	Grid.prototype.focusItem = function ( $item ) {
	    var $prev = this.$focusItem;
	
	    if ( true ) {
	        if ( arguments.length !== 1 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	    }
	
	    // different element
	    if ( $item && $prev !== $item && $item.data.disable !== true ) {
	        if ( true ) {
	            if ( !($item instanceof Element) ) {
	                throw new Error(__filename + ': wrong $item type');
	            }
	            if ( $item.parentNode.parentNode.parentNode.parentNode !== this.$body ) {
	                throw new Error(__filename + ': wrong $item parent element');
	            }
	        }
	
	        // some item is focused already
	        if ( $prev !== null ) {
	            if ( true ) {
	                if ( !($prev instanceof Element) ) {
	                    throw new Error(__filename + ': wrong $prev type');
	                }
	            }
	
	            // style
	            $prev.classList.remove('focus');
	
	            // there are some listeners
	            if ( this.events['blur:item'] ) {
	                /**
	                 * Remove focus from an element.
	                 *
	                 * @event module:stb/ui/grid~Grid#blur:item
	                 *
	                 * @type {Object}
	                 * @property {Element} $item previously focused HTML element
	                 */
	                this.emit('blur:item', {$item: $prev});
	            }
	        }
	
	        // draft coordinates
	        this.focusX = $item.x;
	        this.focusY = $item.y;
	
	        // reassign
	        this.$focusItem = $item;
	
	        // correct CSS
	        $item.classList.add('focus');
	
	        // there are some listeners
	        if ( this.events['focus:item'] ) {
	            /**
	             * Set focus to an element.
	             *
	             * @event module:stb/ui/grid~Grid#focus:item
	             *
	             * @type {Object}
	             * @property {Element} $prev old/previous focused HTML element
	             * @property {Element} $curr new/current focused HTML element
	             */
	            this.emit('focus:item', {$prev: $prev, $curr: $item});
	        }
	
	        return true;
	    }
	
	    // nothing was done
	    return false;
	};
	
	
	/**
	 * Set item state and appearance as marked.
	 *
	 * @param {Node|Element} $item element to focus
	 * @param {boolean} state true - marked, false - not marked
	 */
	Grid.prototype.markItem = function ( $item, state ) {
	    if ( true ) {
	        if ( arguments.length !== 2 ) {
	            throw new Error(__filename + ': wrong arguments number');
	        }
	        if ( !($item instanceof Element) ) {
	            throw new Error(__filename + ': wrong $item type');
	        }
	        if ( $item.parentNode.parentNode.parentNode.parentNode !== this.$body ) {
	            throw new Error(__filename + ': wrong $item parent element');
	        }
	        if ( Boolean(state) !== state ) {
	            throw new Error(__filename + ': state must be boolean');
	        }
	    }
	
	    // correct CSS
	    if ( state ) {
	        $item.classList.add('mark');
	    } else {
	        $item.classList.remove('mark');
	    }
	
	    // apply flag
	    $item.data.mark = state;
	};
	
	
	// public
	module.exports = Grid;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/spa-component-grid/index.js"))

/***/ }),
/* 79 */
/*!***********************************!*\
  !*** ./config/keyboards ^\.\/.*$ ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./ar": 80,
		"./ar.js": 80,
		"./de": 81,
		"./de.js": 81,
		"./en": 82,
		"./en.js": 82,
		"./ru": 83,
		"./ru.js": 83,
		"./uk": 84,
		"./uk.js": 84
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 79;


/***/ }),
/* 80 */
/*!********************************!*\
  !*** ./config/keyboards/ar.js ***!
  \********************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = [
		[
			{value:'ض', className:'symbol'},
			{value:'ص', className:'symbol'},
			{value:'ث', className:'symbol'},
			{value:'ق', className:'symbol'},
			{value:'ف', className:'symbol'},
			{value:'غ', className:'symbol'},
			{value:'ع', className:'symbol'},
			{value:'ه', className:'symbol'},
			{value:'خ', className:'symbol'},
			{value:'ح', className:'symbol'},
			{value:'ج', className:'symbol'},
			{value:'Delete', className:'symbol delete wide', colSpan: 2},
			{value:'&nbsp;', className:'icon keyDelete'}
		],
		[
			{value:'د', className:'symbol'},
			{value:'ش', className:'symbol'},
			{value:'س', className:'symbol'},
			{value:'ي', className:'symbol'},
			{value:'ب', className:'symbol'},
			{value:'ل', className:'symbol'},
			{value:'ا', className:'symbol'},
			{value:'ت', className:'symbol'},
			{value:'ن', className:'symbol'},
			{value:'ذ', className:'symbol'},
			{value:'م', className:'symbol'},
			{value:'ك', className:'symbol'},
			{value:'123', className:'symbol nums wide'},
			{value:'&nbsp;', className:'keyGlobe'}
		],
		[
			{value:'ط', className:'symbol'},
			{value:'ئ', className:'symbol'},
			{value:'ء', className:'symbol'},
			{value:'ؤ', className:'symbol'},
			{value:'ر', className:'symbol'},
			{value:'لا', className:'symbol'},
			{value:'ى', className:'symbol'},
			{value:'ة', className:'symbol'},
			{value:'و', className:'symbol'},
			{value:'ز', className:'symbol'},
			{value:'ظ', className:'symbol'},
			{value:'&nbsp;', className:'icon keySpace', colSpan: 3}
		]
	];


/***/ }),
/* 81 */
/*!********************************!*\
  !*** ./config/keyboards/de.js ***!
  \********************************/
/***/ (function(module, exports) {

	'use strict';
	
	
	module.exports = [
		[
			{value:'q', className:'symbol'},
			{value:'w', className:'symbol'},
			{value:'e', className:'symbol'},
			{value:'r', className:'symbol'},
			{value:'t', className:'symbol'},
			{value:'z', className:'symbol'},
			{value:'u', className:'symbol'},
			{value:'i', className:'symbol'},
			{value:'o', className:'symbol'},
			{value:'p', className:'symbol'},
			{value:'ü', className:'symbol'},
			{value:'&nbsp;', className:'icon keyDelete', colSpan: 2}
		],
		[
			{value:'a', className:'symbol'},
			{value:'s', className:'symbol'},
			{value:'d', className:'symbol'},
			{value:'f', className:'symbol'},
			{value:'g', className:'symbol'},
			{value:'h', className:'symbol'},
			{value:'j', className:'symbol'},
			{value:'k', className:'symbol'},
			{value:'l', className:'symbol'},
			{value:'ö', className:'symbol'},
			{value:'ä', className:'symbol'},
			{value:'Delete', className:'symbol delete', colSpan: 2}
		],
		[
			{value:'y', className:'symbol'},
			{value:'x', className:'symbol'},
			{value:'c', className:'symbol'},
			{value:'v', className:'symbol'},
			{value:'b', className:'symbol'},
			{value:'n', className:'symbol'},
			{value:'m', className:'symbol'},
			{value:'.', className:'symbol'},
			{value:',', className:'symbol'},
			{value:'/', className:'symbol'},
			{value:'@', className:'symbol'},
			{value:'123', className:'symbol nums'},
			{value:'&nbsp;', className:'keyGlobe'}
		],
		[
			{value:'&nbsp;', className:'icon keySpace', colSpan: 13},
		]
	];


/***/ }),
/* 82 */
/*!********************************!*\
  !*** ./config/keyboards/en.js ***!
  \********************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = [
		[
			{value:'q', className:'symbol'},
			{value:'w', className:'symbol'},
			{value:'e', className:'symbol'},
			{value:'r', className:'symbol'},
			{value:'t', className:'symbol'},
			{value:'y', className:'symbol'},
			{value:'u', className:'symbol'},
			{value:'i', className:'symbol'},
			{value:'o', className:'symbol'},
			{value:'p', className:'symbol'},
			{value:'&nbsp;', className:'icon keyDelete', colSpan: 2}
		],
		[
			{value:'a', className:'symbol'},
			{value:'s', className:'symbol'},
			{value:'d', className:'symbol'},
			{value:'f', className:'symbol'},
			{value:'g', className:'symbol'},
			{value:'h', className:'symbol'},
			{value:'j', className:'symbol'},
			{value:'k', className:'symbol'},
			{value:'l', className:'symbol'},
			{value:'-', className:'symbol'},
			{value:'Delete', className:'symbol delete', colSpan: 2}
		],
		[
			{value:'z', className:'symbol'},
			{value:'x', className:'symbol'},
			{value:'c', className:'symbol'},
			{value:'v', className:'symbol'},
			{value:'b', className:'symbol'},
			{value:'n', className:'symbol'},
			{value:'m', className:'symbol'},
			{value:',', className:'symbol'},
			{value:'.', className:'symbol'},
			{value:'/', className:'symbol'},
			{value:'123', className:'symbol nums'},
			{value:'&nbsp;', className:'keyGlobe'}
		],
		[
			{value:'&nbsp;', className:'icon keySpace', colSpan: 12},
		]
	];


/***/ }),
/* 83 */
/*!********************************!*\
  !*** ./config/keyboards/ru.js ***!
  \********************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = [
		[
			{value:'й', className:'symbol'},
			{value:'ц', className:'symbol'},
			{value:'у', className:'symbol'},
			{value:'к', className:'symbol'},
			{value:'е', className:'symbol'},
			{value:'н', className:'symbol'},
			{value:'г', className:'symbol'},
			{value:'ш', className:'symbol'},
			{value:'щ', className:'symbol'},
			{value:'з', className:'symbol'},
			{value:'х', className:'symbol'},
			{value:'ъ', className:'symbol'},
			{value:'&nbsp;', className:'icon keyDelete', colSpan: 2}
		],
		[
			{value:'ф', className:'symbol'},
			{value:'ы', className:'symbol'},
			{value:'в', className:'symbol'},
			{value:'а', className:'symbol'},
			{value:'п', className:'symbol'},
			{value:'р', className:'symbol'},
			{value:'о', className:'symbol'},
			{value:'л', className:'symbol'},
			{value:'д', className:'symbol'},
			{value:'ж', className:'symbol'},
			{value:'э', className:'symbol'},
			{value:'/', className:'symbol'},
			{value:'Удалить', className:'symbol delete', colSpan: 2}
		],
		[
			{value:'я', className:'symbol'},
			{value:'ч', className:'symbol'},
			{value:'с', className:'symbol'},
			{value:'м', className:'symbol'},
			{value:'и', className:'symbol'},
			{value:'т', className:'symbol'},
			{value:'ь', className:'symbol'},
			{value:'б', className:'symbol'},
			{value:'ю', className:'symbol'},
			{value:'ё', className:'symbol'},
			{value:'.', className:'symbol'},
			{value:',', className:'symbol'},
			{value:'123', className:'symbol nums'},
			{value:'&nbsp;', className:'keyGlobe'}
		],
		[
			{value:'&nbsp;', className:'icon keySpace', colSpan: 14}
		]
	];


/***/ }),
/* 84 */
/*!********************************!*\
  !*** ./config/keyboards/uk.js ***!
  \********************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = [
		[
			{value:'й', className:'symbol'},
			{value:'ц', className:'symbol'},
			{value:'у', className:'symbol'},
			{value:'к', className:'symbol'},
			{value:'е', className:'symbol'},
			{value:'н', className:'symbol'},
			{value:'г', className:'symbol'},
			{value:'ш', className:'symbol'},
			{value:'щ', className:'symbol'},
			{value:'з', className:'symbol'},
			{value:'х', className:'symbol'},
			{value:'ї', className:'symbol'},
			{value:'&nbsp;', className:'icon keyDelete', colSpan: 2}
		],
		[
			{value:'ф', className:'symbol'},
			{value:'і', className:'symbol'},
			{value:'в', className:'symbol'},
			{value:'а', className:'symbol'},
			{value:'п', className:'symbol'},
			{value:'р', className:'symbol'},
			{value:'о', className:'symbol'},
			{value:'л', className:'symbol'},
			{value:'д', className:'symbol'},
			{value:'ж', className:'symbol'},
			{value:'є', className:'symbol'},
			{value:'/', className:'symbol'},
			{value:'Удалить', className:'symbol delete', colSpan: 2}
		],
		[
			{value:'ґ', className:'symbol'},
			{value:'я', className:'symbol'},
			{value:'ч', className:'symbol'},
			{value:'с', className:'symbol'},
			{value:'м', className:'symbol'},
			{value:'и', className:'symbol'},
			{value:'т', className:'symbol'},
			{value:'ь', className:'symbol'},
			{value:'б', className:'symbol'},
			{value:'ю', className:'symbol'},
			{value:'.', className:'symbol'},
			{value:',', className:'symbol'},
			{value:'123', className:'symbol nums'},
			{value:'&nbsp;', className:'keyGlobe'}
		],
		[
			{value:'&nbsp;', className:'icon keySpace', colSpan: 14}
		]
	];


/***/ }),
/* 85 */
/*!*********************************************!*\
  !*** ./src/js/modules/tools/parse.query.js ***!
  \*********************************************/
/***/ (function(module, exports) {

	/**
	 * @module stb/tools
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
	
	'use strict';
	
	
	/**
	 * Parse the given location search string into object.
	 *
	 * @param {string} query string to parse
	 *
	 * @return {Object.<string, string>} result data
	 *
	 * @example
	 * console.log(parseQuery(document.location.search.substring(1)));
	 * console.log(parseQuery('param=value&another_param=another_value'));
	 */
	module.exports = function ( query ) {
	    var data = {};
	
	    // parse and fill the data
	    query.split('&').forEach(function ( part ) {
	        part = part.split('=');
	        // valid number on params
	        if ( part.length === 2 ) {
	            data[part[0]] = decodeURIComponent(part[1]);
	        }
	    });
	
	    return data;
	};


/***/ })
/******/ ]);
//# sourceMappingURL=develop.map