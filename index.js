var context;
window.addEventListener('load', init, false);
function init () {
	try {
		context = new webkitAudioContext();
	}
	catch (e) {
		alert('Web Audio API is not supported in your browser');
	}
}

var animalList = {};

function loadSound (url, name) {
	var request = new XMLHttpRequest ();
	request.open ('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function () {
		context.decodeAudioData (request.response, function (buffer) {
			animalList[name] = buffer;
		}, onError);
	}
	request.send ();
}

function playSound (buffer) {
	var source = context.createBufferSource ():
	source.buffer = buffer;
	source.connect (context.destination);
	source.noteOn(0);
}

loadSound('localhost:3000/public/Moo-Panicked.wav', 'moo');
playSound(animalList.moo);
