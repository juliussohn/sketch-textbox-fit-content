function onRun( context ) {
	var selectedLayers = context.selection;
	var selectedCount = selectedLayers.count();

	if ( selectedCount === 0 ) {
		context.document.showMessage('No layers selected.');
	} else {
		for ( var i = 0; i < selectedCount; i++ ) {
			var layer = selectedLayers[ i ];
			checkLayer(layer);
		}
	}
}

function checkLayer( layer ) {
	if([layer isMemberOfClass:[MSTextLayer class]] === 1){
		fitLayer(layer)
	} else if ( [layer isMemberOfClass:[MSLayerGroup class]] === 1 ) {
		var layers = [layer layers];
		for(var i= 0; i<[layers count]; i++){
			checkLayer(layers[i]);
		}
	}
}

function fitLayer( textLayer ) {
	var fontSize = textLayer.fontSize();
	var baselineOffsets = textLayer.baselineOffsets();
	var textHeight = baselineOffsets[ baselineOffsets.length - 1 ] + fontSize / 4;
	textLayer.frame().height = textHeight;
}