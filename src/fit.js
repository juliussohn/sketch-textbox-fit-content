var Group = require('sketch/dom').Group
var Rectangle = require('sketch/dom').Rectangle
var Text = require('sketch/dom').Text
var UI = require('sketch/ui')
var Settings = require('sketch/settings')
var Document = require('sketch/dom').Document
var document = Document.getSelectedDocument()
var trim = true;

export function runWithTrim() {
	trim = true;
	run();
}
export function runWithoutTrim() {
	trim = false;
	run();
}

export function onTextChanged() {
	var autoResize = Settings.settingForKey('auto-resize')
	if(autoResize){
		runWithoutTrim()
	}
}

export function toggleAutoResizing() {
	var autoResize = Settings.settingForKey('auto-resize')

	if(!autoResize){
		Settings.setSettingForKey('auto-resize', true);
		UI.message('✅ Text box auto-fit enabled ');
		runWithoutTrim();
	}else{
		Settings.setSettingForKey('auto-resize', false)
		UI.message('❌ Text box auto-fit disabled');
	}
}

export function run() {
	var selectedLayers = document.selectedLayers
	var selectedCount = selectedLayers.length;

	if (selectedCount === 0) {
		UI.message('No layers selected.')
	} else {
		selectedLayers.forEach(layer => checkLayer(layer));
	}
}

function checkLayer(layer) {
	if (layer.type === "Text") {
		fitLayer(layer)
	} else if (layer.type === "Group") {
		var layers = layer.layers();
		for (var i = 0; i < layers.count(); i++) {
			checkLayer(layers[i]);
		}
		Group.fromNative(layer).adjustToFit()

	}
}

function fitLayer(textLayer) {
	if (trim) {
		var content = textLayer.sketchObject.stringValue();
		textLayer.sketchObject.setStringValue(content.replace(/^\s+|\s+$/g, '').trim())
	}

	var lineCount = textLayer.fragments.length
	var baseHeight = textLayer.fragments[lineCount - 1].rect.y + textLayer.fragments[lineCount - 1].rect.height
	textLayer.sketchObject.frame().height = baseHeight

}