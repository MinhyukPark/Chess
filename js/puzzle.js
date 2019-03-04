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
    fenTextBox.value = getRandomLine('./data/puzzle_db.txt');
    invisibleBox.value = fenTextBox.value;
    fenTextBox.style.width = ((fenTextBox.value.length + 1) * 8) + 'px';
    var textarea = document.getElementById("PgnTextBox");
    textarea.value = '';
    UIChangeFEN()
}

function ReloadPuzzle() {
    var fenTextBox = document.getElementById("FenTextBox");
    var invisibleBox = document.getElementById("hidden-current-puzzle");
    fenTextBox.value = invisibleBox.value;
    fenTextBox.style.width = ((fenTextBox.value.length + 1) * 8) + 'px';
    var textarea = document.getElementById("PgnTextBox");
    textarea.value = '';
    UIChangeFEN()
}

function SavePuzzle() {
    console.log("change puzzle");
    var fenTextBox = document.getElementById("FenTextBox");
    fenTextBox.style.width = ((fenTextBox.value.length + 1) * 8) + 'px';
    var invisibleBox = document.getElementById("hidden-current-puzzle");
    invisibleBox.value = fenTextBox.value;
    UIChangeFEN()
}

function Commit() {
    var data = {}
    var fenTextBox = document.getElementById("FenTextBox");
    var url = "https://api.minhyukpark.com/chess";
    data["FEN"] = fenTextBox.value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlHttp.send(JSON.stringify(data));
}

function Pull() {
    var xmlHttp = new XMLHttpRequest();
    var fenTextBox = document.getElementById("FenTextBox");
    var url = "https://api.minhyukpark.com/chess";
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    var remoteText = JSON.parse(xmlHttp.responseText)["FEN"];
    fenTextBox.value = remoteText;
    SavePuzzle();
}
