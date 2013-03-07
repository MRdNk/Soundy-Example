var soundy = (function () {

	var that = {}
	that.sounds = {}

	var context

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
				that.sounds[name] = name
				cb(null, 1)
			}, cb)
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

	function play (name) {
		playSound(animalList[name])
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

	window.addEventListener('load', init, false)

	function add (file, name) {
		console.log(file, name);	
	}

	that.done = loadLibrary
	that.add = add
	that.play = play

	return that

}())

soundy.done( function (err, done) {
	console.log(err, done)
	soundy.play(soundy.sounds.german)
})