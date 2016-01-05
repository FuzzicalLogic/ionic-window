(function registerElement(ROOT_ELEMENT) {

	var REMOTE = require('electron').remote;

	var DEFAULT_HTML_RULES = {
			'position': 'fixed',
			'width': '100%',
			'height': '100%',
			'display': 'flex',
			'flex-flow': 'column nowrap',
			'align-items': 'stretch',
		},
		DEFAULT_BODY_RULES = {
			'flex': '1 1',
			'display': 'flex',
			'flex-flow': 'row nowrap',
			'align-items': 'stretch',
			'margin': '0',
		};

	Polymer({
		is: 'native-window',

		created: onElementCreated,
		attached: onElementAttached,
		ready: onElementReady,
		detached: onElementDetached,

		properties: {
			window: {
				type: Object,
				value: function() {
					return REMOTE.getCurrentWindow();
				},
				observer: '_onChangeWindow'
			},
			focused: {
				type: Boolean,
				value: REMOTE.getCurrentWindow().isFocused(),
				reflectToAttribute: true,
			},
			stylesheet: {
				type: String,
				value: 'style.css',
				observer: '_onChangeStyleSheet'
			},
			platform: {
				type: String,
				value: process.platform,
				notify: true,
				reflectToAttribute: true
			},
			design: {
				type: String,
				value: "",
				notify: true,
			},
			debuggable: {
				type: Boolean,
				value: false,
				notify: true,
				reflectToAttribute: true
			}
		},

		_onChangeWindow: onWindowChanged,
		_onChangeStyleSheet: onStyleSheetChanged,
	});

	function onElementCreated() {

	}

	function onElementAttached() {

	}

	function onElementReady() {

	}

	function onStyleSheetChanged(newValue, oldValue) {
		var l = document.createElement('link');
		l.setAttribute('rel', 'stylesheet');
		l.setAttribute('href', newValue);
		l.addEventListener('load', onStyleSheetLoaded);
		document.head.appendChild(l);
	}

	function onStyleSheetLoaded() {
		var sheet = this.sheet,
			html_rule = findSelector(sheet, 'html'),
			body_rule = findSelector(sheet, 'body');

		if (!!!html_rule)
			html_rule = sheet.rules[sheet.insertRule('html {  }', 0)];
		addStylesToRule(html_rule, DEFAULT_HTML_RULES);

		if (!!!body_rule)
			body_rule = sheet.rules[sheet.insertRule('body {  }', 1)];
		addStylesToRule(body_rule, DEFAULT_BODY_RULES);
	}

	function findSelector(sheet, selector) {
		var i, result;
		for (i = 0; i < sheet.rules.length; i++) {
			if (sheet.rules[i].selector === selector)
				result = sheet.rules[i];
		}
		return result;
	}

	function addStylesToRule(rule, styles) {
		Object.getOwnPropertyNames(styles).forEach(function(v,k,a) {
			rule.style.setProperty(v, styles[v])
		});
	}

	function onWindowChanged(newValue, oldValue) {
		if (typeof oldValue === "object" && typeof oldValue.on === "function") {

		}
		if (typeof newValue === "object" && typeof newValue.on === "function") {
			newValue.on('blur', onWindowBlurred.bind(this));
			newValue.on('focus', onWindowFocused.bind(this));
		}
	}

	function onWindowFocused(event) {
		this.focused = true;
	}

	function onWindowBlurred(event) {
		this.focused = false;
	}

	function onElementDetached() {

	}

}) (document.querySelector('html'));
