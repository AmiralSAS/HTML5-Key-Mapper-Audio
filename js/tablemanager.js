// tablemanager.js
// @author LeDucSAS
//

function createTable(datas){
    /*
        containerId: "tableContainer",
        tableId: "musicMapper",
        type: "music",
        filenames: ["test.mp3", "bob.wav", "superbob.ogg"]
    */

    var tableContainer = document.getElementById(datas.containerId);
    tableContainer.innerHTML = "";
    var table = document.createElement("table");
    table.setAttribute("id", datas.tableId);
    var tbody = document.createElement("tbody");

    for (var i = 0; i < datas.filenames.length; i++) { // Lines
        var newLine = tbody.insertRow(-1);
        newLine.setAttribute("id", i);

        var cell_input = newLine.insertCell(0);
        cell_input.innerHTML += "<input type='text' class='keyCell' meta-title='"+datas.filenames[i]+"' meta-type='"+datas.type+"' placeholder='Editer' id='input"+datas.type+i+"' />";
        var cell_name = newLine.insertCell(1);
        cell_name.innerHTML += decodeURIComponent(datas.filenames[i]);
        // var cell_tools = newLine.insertCell(2);
        // cell_tools.innerHTML += "outils supplémentaires";
    };

    table.appendChild(tbody);
    table.setAttribute("border", "1");
    tableContainer.appendChild(table);
}

/*
createTable({
    containerId: "tableContainer",
    tableId: "musicMapper",
    type: "music",
    filenames: ["test", "bob", "superbob"]
});
*/
console.log("tablemanager.js loaded");