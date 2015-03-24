// main.js
// @author LeDucSAS
//

/*
function manageKeyPressure()
function checkKeyPressedAndExecuteAsset(targetedTableMapper)
*/

/*
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    console.log("HTML 5 File APIs supported");
} else {
    console.log('The File APIs are not fully supported in this browser.');
}
*/

function manageKeyPressure(){
    checkKeyPressedAndExecuteAsset('musicMapper');
    checkKeyPressedAndExecuteAsset('soundMapper');
}

function checkKeyPressedAndExecuteAsset(targetedTableMapper){
    // With the id specified in parameter, we get the table containing the user inputs
    var tableMapperOfTheInputs = document.getElementById(targetedTableMapper);

    // If the table exist
    if (tableMapperOfTheInputs != null) {
        // Make an array with all the <input> of the table
        var inputKeys = tableMapperOfTheInputs.getElementsByTagName('input');

        for (var i=0; i < inputKeys.length; i++) { // Look for each character in the inputs
            if (key.isPressed(inputKeys[i].value)) { // Search if one the inputs is actually pressed
                if (inputKeys[i].value.length == 1) { // Control to avoid inputs with more than one character
                    // We take the meta-type of the input, which is for differentiate music or sound
                    var typeOfTheAsset = inputKeys[i].getAttribute("meta-type");

                    if (typeOfTheAsset == "music") { // Just to be sure we'll play music
                        var fullPath = makeFullPath( encodeURIComponent(document.getElementById('music_directory_path').value), 
                            encodeURIComponent( inputKeys[i].getAttribute("meta-title") )
                        );
                        playMusic(fullPath);
                    }
                    if (typeOfTheAsset == "sound") { // Just to be sure we'll play sound
                        var fullPath = makeFullPath( encodeURIComponent(document.getElementById('sound_directory_path').value), 
                            encodeURIComponent( inputKeys[i].getAttribute("meta-title") )
                        );
                        playSound(fullPath);
                    }
                }
            }
        }
    }
}

document.onkeydown = manageKeyPressure;

key("space", stopAll);

console.log("main.js loaded");