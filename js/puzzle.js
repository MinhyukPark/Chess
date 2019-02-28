function getRandomLine(filename){
    var rawFile = new XMLHttpRequest();
    var randomLine;
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
	    if(rawFile.status === 200) {
	        var allText = rawFile.responseText;
		var split = allText.split('\n');
		var randomNum = Math.floor(Math.random() * split.length);
		randomLine = split[randomNum];
            }
        }
    }
    rawFile.send(null);
    return randomLine;
}


function GetPuzzle() {
    var fenTextBox = document.getElementById("FenTextBox");
    var invisibleBox = document.getElementById("hidden-current-puzzle");
    fenTextBox.value = getRandomLine('./data/m8n2.txt');
    invisibleBox.value = fenTextBox.value;
    var textarea = document.getElementById("PgnTextBox");
    textarea.value = '';
    UIChangeFEN()
}

function ReloadPuzzle() {
    var fenTextBox = document.getElementById("FenTextBox");
    var invisibleBox = document.getElementById("hidden-current-puzzle");
    fenTextBox.value = invisibleBox.value;
    var textarea = document.getElementById("PgnTextBox");
    textarea.value = '';
    UIChangeFEN()
}

function SavePuzzle() {
    console.log("change puzzle");
    var fenTextBox = document.getElementById("FenTextBox");
    var invisibleBox = document.getElementById("hidden-current-puzzle");
    invisibleBox.value = fenTextBox.value;
    UIChangeFEN()
}
