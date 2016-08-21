/**
* @fileoverview Functions that access and interact with the
* text inputted in the "textContainer" div
* @author Luke Roberts
**/

/**
* getText() function
* Used to retrieve the contents of the "textContainer".
* @return A string containing the contents of the text container
**/
function getText(){
	var text = $('#textBody').html();
	text = text.replace(/<div>/gi,"\n");
	text = text.replace(/<\/div>/gi,"");
	text = text.replace(/&lt;div&gt;/gi,"<div>");
	text = text.replace(/&nbsp;/gi,"");
	text = text.replace(/&lt;/gi,"<");
	var list = getLines(text);
	var cleanText = '';
	for(var i in list){
		if(list[i] == '<br>'){
			list[i] = '\n';
		}
		if(i > 0){
		cleanText = cleanText.concat("\n");
		}
		cleanText = cleanText.concat(list[i]);
	}
	return cleanText;
}

/**
* getLines() function
* Makes an array of lines from a string that allows for the movement
* of text.
* @arg A string containing the text.
* @return An array containing the different lines of the text.
**/
function getLines(text){
	var list = text.split('\n');
	return list;
}

/**
* clearText() function
* Empties the text area.
**/
function clearText(){
	$('#textBody').empty();
}

/**
* checkKey() function
* Checks what key has just been pressed and take actions if needed.
* @arg The event object of the keypress.
**/
function checkKey(event){
	 if (event.keyCode == 9) {
			insertAtLocation("    ");
			prune();
			passTab()
            event.preventDefault();
	}
	else if (event.ctrlKey){
		if(event.which == 83 || event.keyCode == 83){
			event.preventDefault();
			saveFile();
		}
	}
}

/**
* insertAtLocation() function
* Inserts new text at the current cursor position.
* @arg The text to be inserted.
**/
function insertAtLocation(text) {
    var place;
	var span;
    if (window.getSelection) {
        place = window.getSelection();
        if (place.getRangeAt && place.rangeCount) {
            span = place.getRangeAt(0);
            span.deleteContents();
            span.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}

/**
* prune() function
* Removes any uneeded <br> items added after adding a tab. this
* function cycles through all the div elements in the main 'textBody'
* and removes children but the inner html.
**/
function prune(){
	$('#textBody').children().each(function () {
		//If the line is empty and has a <br> element it's length is 2,
		//if any text is on the line the length is 3 and no <br> will be made.
		if(this.childNodes.length == 2){
			this.removeChild(this.lastChild);
		}
	});
}

/**
* moveCursor() function
* Moves the typing cursor on it's present line.
* @arg the character index on the line where you wish to move the cursor.
**/
function moveCursor(spaces, area){
	var page = window.getSelection();
	if(moveCursor.arguments.length == 1){
		var textNode = page.baseNode;
	}
	else{
		var textNode = area;
	}
	var caret = spaces;
	var range = document.createRange();
	range.setStart(textNode, caret);
	range.setEnd(textNode, caret);
	page.removeAllRanges();
	page.addRange(range);
}

function passTab(){
	//Get the list of current divs
	var list = document.getElementById("textBody").childNodes;
	//Get the currently selected div
	var selected = window.getSelection().baseNode;
	//Find the div's index
	var index = 0;
	var counter = 0;
	//Move through the lines
	for(var i in list){
		var subList = list[i].childNodes;
		try{
			var listLen = Object.keys(subList).length;
		}
		catch(err){
			return
		}
		if(listLen > 1){
			for(var j = 0; j < Object.keys(subList).length; j++){
				if(subList[j] == selected){
					j= j+2;
					//alert(subList[j].data);
					while(subList[j].data == '    '){
						j++;
					}
					moveCursor(0,subList[j]);
				}
			}
	}
	}
}