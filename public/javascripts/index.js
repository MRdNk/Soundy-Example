var context
window.addEventListener('load', init, false)
function init () {
	try {
		context = new webkitAudioContext() || new mozAudioContext() || new AudioContext()
	}
	catch (e) {
		alert('Web Audio API is not supported in your browser')
	}
}

var animalList = {}

function loadSound (url, name, cb) {
	var request = new XMLHttpRequest ()
	request.open ('GET', url, true)
	request.responseType = 'arraybuffer'

	// Decode asynchronously
	request.onload = function () {
		context.decodeAudioData (request.response, function (buffer) {
			animalList[name] = buffer
			cb(null, 1)
		}, onError)
	}
	request.send ();
}

function onError (e) {
	console.error(e)
}

function playSound (buffer) {
	var source = context.createBufferSource ()
	source.buffer = buffer
	source.connect (context.destination)
	source.noteOn(0)
}

function loadLibrary (cb) {
	var sounds = [
		{
				file: 'German-Reject1.wav'
			,	name: 'german'
		}
		,	{
				file: 'Moo-Panicked.wav'
			,	name: 'moo'
		}
		,	{
				file: 'Baa1.wav'
			,	name: 'baa'
		}
		, {
				file: 'Dog1.wav'
			,	name: 'dog'
		}
		,	{
				file: 'Dog2.wav'
			,	name: 'dog2'
		}
	];

	var loadedCount = 0

	for(var i=0; i<sounds.length; i++) {
		loadSound('/audio/' + sounds[i].file, sounds[i].name, function (err, done) {
			loadedCount ++
			if (sounds.length === loadedCount) 
				cb(null, 'loaded')
		});
	}
}

loadLibrary( function (err, loaded) {
	if(loaded) {
		console.log('sounds loaded')
		//playSound(animalList.german)
		//playSound(animalList.dog)
		//playSound(animalList.baa)
		playSound(animalList.dog2)
	}

});

