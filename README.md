Soundy
======

A simply library using the Audio API

Currently baked into an expres app to get play with the API and load files without XSS issues.

Actually implementation file in /public/javascripts/index.js

Include soundy
------------

Include soundy.js (my modular approach)
```html
<script type='text/javascript' src='/javascripts/modules/soundy/index.js'>
```

Define the options object to pass into Soundy
---------------------------------------------

Options (object)

- Sounds (array of 'sound' objects)

-- filename (name of the file)

-- name (your 'name' for the file)

- Path (the url path to your sounds folder)

```javascript

var options = {
  sounds: [
    {
        filename: 'YourSound1.wav',
        name: 'Sound1'
    }
  ],
  path: '/audio/' // Defaults to /audio/
}
```

Load your sounds & other options
--------------------------------

```javascript 
soundy.load(options, function (err, loaded) {
  if (err) {
    console.error(err)
  } else {
    console.log(loaded) // All the sounds have loaded, you're good to go
  }
})
```

Play a sound
------------

To play a sound, you pass the name into the play function, also provided as a sounds object.

NB. This needs to be done, after the ```soundy.load``` call back

Method 1: The object (available via the JavaScript console)
```javascript
soundy.play(soundy.sounds.Sound1)
```

Method 2: Pass a string name
```javascript
soundy.play('Sound1')
```

Get the Soundy Version No.
--------------------

You can get the soundy version no., by calling it in your code, or via a JavaScript console with

```javascript
soundy.version
```
