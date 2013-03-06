var context;
window.addEventListener('load', init, false);
function init () {
	try {
		context = new webkitAudioContext() || AudioContext();
	}
	catch (e) {
		alert('Web Audio API is not supported in your browser');
	}
}

var animalList = {};

function loadSound (url, name, cb) {
	var request = new XMLHttpRequest ();
	request.open ('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function () {
		context.decodeAudioData (request.response, function (buffer) {
			animalList[name] = buffer;
			cb(null, 1);
		}, onError);
	}
	request.send ();
}

function onError (e) {
	console.error(e);
}

function playSound (buffer, note) {
	var source = context.createBufferSource ();
	source.buffer = buffer;
	source.connect (context.destination);
	source.noteOn(note);
}

loadSound('/German-Reject1.wav', 'german', function (err, done) {
	//playSound(animalList.german);
	for(var i = 0; i< 5; i++) {
		//setTimeout(function () {playSound(animalList.german);}, 200 * i);
		//playSound(animalList.german);
	}
});

loadSound('/Moo-Panicked.wav', 'moo', function (err, done) {
	for(var i=0; i< 5; i++) {	
		setTimeout(function () { playSound(animalList.moo, i); }, 500 * i);
	}
});
