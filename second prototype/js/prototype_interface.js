 /*
 * Prototype 2 - Interface
*/
var datas = {};
datas.key_list = [];
datas.music_player = document.createElement("audio");
datas.sound_list = {};
datas.sound_active = [];

function handleFileSelect(evt) {
	var files = evt.target.files;
	var actualFileInput = this;

	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('audio.*')) {
			continue;
		}

		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				datas.key_list[actualFileInput.getAttribute("data-keylabel")] = {
					source : e.target.result
				};
			};
		})(f);

		reader.readAsDataURL(f);
	}
}

 /***********************
 * Listening to keyboard
*/
var classname = document.getElementsByClassName("key_fileinput");

for(var i=0;i<classname.length;i++){
	classname[i].addEventListener('change', handleFileSelect, false);
}

 /****************
 * Some functions
*/
function addKey(){
	/*
	var last_index = datas.sound_active.length;
	var sound_player = document.createElement("audio");
	datas.active_sounds.push(sound_player);
	datas.active_sounds[last_index].src = decodeURIComponent(fullpath);
	*/
}



function playMusic(theKeyToPlay){
	datas.music_player.src = datas.key_list[theKeyToPlay].source;
	datas.music_player.play();
}



function manageKeyPressure(){
	var inputKeys = document.getElementsByClassName('key_fileinput');

	for (var i=0; i < inputKeys.length; i++) {
		if (key.isPressed( inputKeys[i].getAttribute("data-keylabel") )) {
			console.log( inputKeys[i].getAttribute("data-keylabel") );
			// Animate function

			// play music function
			
		}

	}
}

document.onkeydown = manageKeyPressure;