// audiocontrol.js
// @author LeDucSAS

/*
function makeFullPath(filepath, filename):String
function playMusic(fullpath)
function playSound(fullpath)
function stopAll()
function stopMusic()
function stopSounds()
*/
;
var datas = {};
datas.music_player = document.createElement("audio");
datas.active_sounds = [];

 /*
 * Utilitary functions
 * filepath is encoded string "c:/folder/"
 * filename is encoded string "file.mp3"
 * filepath and filename must have been encoded with encodeURIComponent()
*/
function makeFullPath(filepath, filename){
    if (filepath.indexOf("http") == 0) {
        var fullpath = filepath + encodeURIComponent("/") + filename;
    } else {
        var fullpath = encodeURIComponent("file:///") + filepath + encodeURIComponent("/") + filename;
        console.log(fullpath);
    }
    return fullpath;
}
 /*
 * Lecture play functions
 * fullpath is encoded string "c:/folder/file.mp3"
 * fullpath must have been encoded with encodeURIComponent()
*/
function playMusic(fullpath){
    datas.music_player.src = decodeURIComponent(fullpath);
    datas.music_player.play();
}
function playSound(fullpath){
    var last_index = datas.active_sounds.length;
    var sound_player = document.createElement("audio");
    datas.active_sounds.push(sound_player);
    datas.active_sounds[last_index].src = decodeURIComponent(fullpath);
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
        // destroy the array containing the sounds elements to stop them from playing
        for (var i = datas.active_sounds.length - 1; i >= 0; i--) {
            datas.active_sounds[i].src = "";
            datas.active_sounds[i].load();
            datas.active_sounds.pop();
        };
    };
}

console.log("audiocontrol.js loaded");