function handleSingleFile(evt) {
	var files = evt.target.files; // FileList object
	var filenames = [];
	var audiofiles = [];
	for (var i = 0, f; f = files[i]; i++) {
		filenames.push( encodeURIComponent(f.name) );
		audiofiles.push( f.name );
		console.log("eee", f.mozFullPath);
	}
	var afilereader = new FileReader();
	afilereader.onload = function(e) {
    	music_player = document.createElement("audio");
    	music_player.src = e.target.result;
    	music_player.play();
	}
	afilereader.readAsDataURL(audiofiles[0]);

	console.log(evt.target);
	console.log(evt.target.files[0].name);
}
document.getElementById('key_a').addEventListener('change', handleSingleFile, false);






console.log("prototype_interface.js loaded");