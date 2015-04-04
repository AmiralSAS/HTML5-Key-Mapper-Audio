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
		datas.key_list[actualFileInput.getAttribute("data-keylabel")] = {};
		datas.key_list[actualFileInput.getAttribute("data-keylabel")].name = encodeURIComponent(files[i].name);

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				datas.key_list[actualFileInput.getAttribute("data-keylabel")].source = e.target.result;
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
function playKey(theKeyPressed){
	if (datas.key_list[theKeyPressed]) {
		playMusic(theKeyPressed);
	}
}

function playMusic(theKeyToPlay){
	datas.music_player.src = datas.key_list[theKeyToPlay].source;
	datas.music_player.play();
	console.log(theKeyToPlay);
	console.log(decodeURIComponent(datas.key_list[theKeyToPlay].name));
}

function playSound(){

}


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

document.onkeydown = manageKeyPressure;