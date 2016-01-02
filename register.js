(function registerElement(ROOT_ELEMENT) {

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
			stylesheet: {
				type: String,
				value: 'style.css',
				observer: '_onChangeStyleSheet'
			}
		},

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

	function onElementDetached() {

	}

}) (document.querySelector('html'));
