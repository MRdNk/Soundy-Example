var soundy = (function (opts) {

	var that = {}
	var opts = opts || {};
	that.sounds = {}
	that.version = 'v0.1.2'

	var context

	function init (cb) {
		try {
			context = new webkitAudioContext() || new mozAudioContext() || new AudioContext()
			cb(null, 1)
		}
		catch (e) {
			alert('Web Audio API is not supported in your browser')
			cb(e)
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
	
	function playSound (buffer) {
		var source = context.createBufferSource ()
		source.buffer = buffer
		source.connect (context.destination)
		source.noteOn(0)
	}

	function play (name) {
		playSound(animalList[name])
	}

	function loadLibrary (opts, cb) {
		var opts = opts || {}
		// console.log(typeof opts.sounds, typeof opts.sounds === 'undefined')
		if (typeof opts.sounds === 'undefined') {
			opts.sounds = [
	      {
	          file: 'German-Reject1.wav'
	        , name: 'german'
	      }
	      , {
	          file: 'Moo-Panicked2.wav'
	        , name: 'moo'
	      }
	      , {
	          file: 'Baa1.wav'
	        , name: 'baa'
	      }
	      , {
	          file: 'Dog1.wav'
	        , name: 'dog'
	      }
	      , {
	          file: 'Dog2.wav'
	        , name: 'dog2'
	      }
	      , {
	          file: 'Dolphin1.wav'
	        , name: 'dolphin'
	      }
	      , {
	          file: 'Horse1.wav'
	        , name: 'horse'
	      }
	      , {
	          file: 'Pig1.wav'
	        , name: 'pig'
	      }
	      , {
	          file: 'Quack-Donald.wav'
	        , name: 'duck'
	      }
	      , {
	          file: 'Swan1.wav'
	        , name: 'swan'
	      }
	    ];
		}

		init(function (err, ready) {

			if (err) {console.error(err)}
			if (ready) {
				var sounds = opts.sounds
				var loadedCount = 0
				var path = opts.path || '/audio/'

				for(var i=0; i <sounds.length; i++) {
					loadSound(path + sounds[i].file, sounds[i].name, function (err, done) {
						loadedCount ++
						if (sounds.length === loadedCount) 
							cb(null, 'loaded')
					});
				}
			}
		})
	}

	// window.addEventListener('load', init, false)

	function add (file, name) {
		console.log(file, name);	
	}


	that.done = that.load = loadLibrary
	// that.add = add
	that.play = play

	return that

}())

var options = {};
options.sounds = [
  {
      file: 'German-Reject1.wav'
    , name: 'german'
  }
  , {
      file: 'Moo-Panicked.wav'
    , name: 'moo'
  }
];

soundy.load(options, function (err, done) {
	console.log(err, done)
	// soundy.play(soundy.sounds.german)
})