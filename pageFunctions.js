/**
* Copyright 2016 Luke Roberts
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/**
* @fileoverview Functions that control the layout of the page
* @author Luke Roberts
**/

/**
* JQuery event listeners that control the sizing of the page
* elements on ready and resizing.
**/
$(window).ready(function(){fitToPage();});
$(window).resize(function(){fitToPage();});

/**
* JQuery event listener that checks for keydown events,
* this calls a function with the event
**/
$('#textBody').keydown(function(event){checkKey(event);});

/**
* fitToPage() function
* Changes the size of the 'textContainer' div to be slightly
* smaller than the page.
**/
function fitToPage(){
	$('#textContainer').height($(window).height() - ($('#toolBar').height()*2) - 20);
}

/**
* saveFile() function
* Saves the current text file
**/
function saveFile(){
	var name = prompt("What is the file name?");
	var type = prompt("Please type the extension(no full stop)");
	var file = document.createElement("a");
	document.body.appendChild(file);
	file.style = "display: none";
	var text = getText();
	text = text.replace(/([^\r])\n/g, "$1\r\n");
	blob = new Blob([text], {type: "text"});
	url = URL.createObjectURL(blob);
	file.href = url;
	file.download = name+"."+type;
	file.click();
	URL.revokeObjectURL(url);
}

/**
* loadFile() function
* Load a file into the editor
**/
function loadFile(){
		source = document.getElementById("textFile");
		file = source.files[0];
		reader = new FileReader();
		reader.onload = function() {
			var text = reader.result;
			text = text.replace(/\r/gi, '');
			text = text.replace(/\n\n/gi, '\n');
			clearText();
			var lines = getLines(text);
			for(var i in lines){
				if(lines[i] == ''){
					lines[i] = '<br>';
				} 
				if(i==0){
					$('#textBody').html(lines[i]);
				}
				else{
					var newLine = document.createElement('div')
					newLine.innerHTML = lines[i];
					document.getElementById("textBody").appendChild(newLine);
				}
			}
		}
	reader.readAsText(file);
}

/**
* showAbout() function
* Calls an alert that describes the editor and give license
* infomation.
**/
function showAbout(){
	alert("Niven is a browser based text editor.\n\nUse and modification of this tool are covered by the APACHE 2 license\nviewable at http://www.apache.org/licenses/LICENSE-2.0");
} 