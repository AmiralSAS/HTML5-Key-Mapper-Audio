 /*
 * Prototype 2 - Interface
*/

var datas = {};
datas.key_list = [];
datas.music_player = document.createElement("audio");
datas.active_sounds = [];

    /*****************
   ******************
  ** Drag and drop manager
 ******************
*****************/ 
function handleFileSelect(evt) {
	console.log(evt);
	var files = evt.target.files;
	var actualFileInput = this;
	var this_key = actualFileInput.getAttribute("data-keylabel");

	for (var i = 0, f; f = files[i]; i++) {
		console.log(f.type);
		/*if (!f.type.match('audio.*')) {
			continue;
		}*/

		var reader = new FileReader();
		datas.key_list[this_key] = {};
		datas.key_list[this_key].name = encodeURIComponent(files[i].name); // safely stock the filename
		datas.key_list[this_key].key = this_key;

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				datas.key_list[actualFileInput.getAttribute("data-keylabel")].source = e.target.result;
			};
		})(f);

		updateKeymap();

		reader.readAsDataURL(f);
	}
}

    /*****************
   ******************
  ** Keyboard listening
 ******************
*****************/ 
// This for listening for every change of each input files
var classname = document.getElementsByClassName("key_fileinput");
for(var i=0;i<classname.length;i++){
	classname[i].addEventListener('change', handleFileSelect, false);
}

// This for listenening the key pressed and what to do with
document.onkeydown = manageKeyPressure;

// This for listening to spacebar wich will stop all sounds
key("space", stopAll);

    /*****************
   ******************
  ** Keymap
 ******************
*****************/ 
function manageKeyPressure(){
	var inputKeys = document.getElementsByClassName('key_fileinput');

	for (var i=0; i < inputKeys.length; i++) {
		if (key.isPressed( inputKeys[i].getAttribute("data-keylabel") )) {
			// Animate function

			// play music function
			playKey( inputKeys[i].getAttribute("data-keylabel") );
		}

	}
}

function playKey(theKeyPressed){
	if (datas.key_list[theKeyPressed]) {
		if (isNaN(datas.key_list[theKeyPressed].key)) {
			playSound(theKeyPressed);
		} else {
			playMusic(theKeyPressed);
		}
	}
}

function updateKeymap(){
	var ul = document.getElementById("keymap");
	ul.innerHTML = "";

	for (var key in datas.key_list) {
		if (typeof(datas.key_list[key]) == "object") {
			var li = document.createElement("li");
			var text = datas.key_list[key].key;
			text += " - ";
			text += decodeURIComponent(datas.key_list[key].name);
			li.appendChild(document.createTextNode(text));
			ul.appendChild(li);
		}
	};
}


    /*****************
   ******************
  ** Sound scripts
 ******************
*****************/ 
 /*
 * Lecture play functions
*/
function playMusic(theKeyToPlay){
	datas.music_player.src = datas.key_list[theKeyToPlay].source;
	datas.music_player.play();
}

function playSound(theKeyToPlay){
    var last_index = datas.active_sounds.length;
    var sound_player = document.createElement("audio");
    datas.active_sounds.push(sound_player);
    datas.active_sounds[last_index].src = datas.key_list[theKeyToPlay].source;
    datas.active_sounds[last_index].play();
}

 /*
 * Lecture stop functions
*/
function stopAll(){
    stopMusic();
    stopSounds();
}
function stopMusic(){
    if (datas.music_player.src) {
        datas.music_player.src = "";
        datas.music_player.load();
    };
}
function stopSounds(){
    if (datas.active_sounds.length > 0) {
        // destroy the array containing the sounds elements to stop them from playing and be sure we free memory
        for (var i = datas.active_sounds.length - 1; i >= 0; i--) {
            datas.active_sounds[i].src = "";
            datas.active_sounds[i].load();
            datas.active_sounds.pop();
        };
    };
}