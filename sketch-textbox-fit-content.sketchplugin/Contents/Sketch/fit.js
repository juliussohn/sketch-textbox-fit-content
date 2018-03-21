var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.runWithTrim = runWithTrim;
exports.runWithoutTrim = runWithoutTrim;
exports.onTextChanged = onTextChanged;
exports.toggleAutoResizing = toggleAutoResizing;
exports.run = run;
var Group = __webpack_require__(0).Group;
var Rectangle = __webpack_require__(0).Rectangle;
var Text = __webpack_require__(0).Text;
var UI = __webpack_require__(2);
var Settings = __webpack_require__(3);
var Document = __webpack_require__(0).Document;
var document = Document.getSelectedDocument();
var trim = true;

function runWithTrim() {
	trim = true;
	run();
}
function runWithoutTrim() {
	trim = false;
	run();
}

function onTextChanged() {
	var autoResize = Settings.settingForKey('auto-resize');
	if (autoResize) {
		runWithoutTrim();
	}
}

function toggleAutoResizing() {
	var autoResize = Settings.settingForKey('auto-resize');

	if (!autoResize) {
		Settings.setSettingForKey('auto-resize', true);
		UI.message('✅ Text box auto-fit enabled ');
		runWithoutTrim();
	} else {
		Settings.setSettingForKey('auto-resize', false);
		UI.message('❌ Text box auto-fit disabled');
	}
}

function run() {
	var selectedLayers = document.selectedLayers;
	var selectedCount = selectedLayers.length;

	if (selectedCount === 0) {
		UI.message('No layers selected.');
	} else {
		selectedLayers.forEach(function (layer) {
			return checkLayer(layer);
		});
	}
}

function checkLayer(layer) {
	if (layer.type === "Text") {
		fitLayer(layer);
	} else if (layer.type === "Group") {
		var layers = layer.layers();
		for (var i = 0; i < layers.count(); i++) {
			checkLayer(layers[i]);
		}
		Group.fromNative(layer).adjustToFit();
	}
}

function fitLayer(textLayer) {
	if (trim) {
		var content = textLayer.sketchObject.stringValue();
		textLayer.sketchObject.setStringValue(content.replace(/^\s+|\s+$/g, '').trim());
	}

	var lineCount = textLayer.fragments.length;
	var baseHeight = textLayer.fragments[lineCount - 1].rect.y + textLayer.fragments[lineCount - 1].rect.height;
	textLayer.sketchObject.frame().height = baseHeight;
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['runWithTrim'] = __skpm_run.bind(this, 'runWithTrim');
that['onRun'] = __skpm_run.bind(this, 'default');
that['runWithoutTrim'] = __skpm_run.bind(this, 'runWithoutTrim');
that['toggleAutoResizing'] = __skpm_run.bind(this, 'toggleAutoResizing');
that['onTextChanged'] = __skpm_run.bind(this, 'onTextChanged')
