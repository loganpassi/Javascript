/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 12
   Tutorial Case

   Author:   Logan Passi
   Date:     11/19/2018

   Filename: newsfeed.js



   Functions List:

   getCommentary()
      Retrieves the HTML code stored in the commentary.txt file,
      displaying it in the main section of the document

   getHeadlines()

      Retrieves the RSS feed stored in the headlines.xml file,
      displaying it in the news section of the document

   setupSearch()

      Sets up the Web page to allow for searches of archived articles
      using the sbarchives.cgi script on the server

*/

addEvent (window, "load", getCommentary, false);

function getCommentary() {
	var main = document.getElementById("main");
	
	// Request object for the commentary.txt file
	var reqCom = new XMLHttpRequest();
	reqCom.open("GET", "commentary.txt");
	reqCom.send(null);
	
	reqCom.onreadystatechange = function() {
		// Proces the data when the response is completed without error
		if (this.readyState == 4) {
			if (this.status == 200) {
				// Retrieve the daily commentary and display it within the main section
				main.innerHTML = this.responseText;
			}
		}
	}
}

addEvent(window, "load", getHeadlines, false);

function getHeadlines() {
	var news = document.getElementById("news");
	
	// Request object for the headlines feed
	var reqHead = new XMLHttpRequest();
	reqHead.open("GET", "headlines.xml");
	reqHead.setRequestHeader("Cache-Control", "no-cache");
	reqHead.send(null);
	
	reqHead.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				// Retrieve the headlines feed
				var newsDoc = this.responseXML;
				var rssDoc = new RSSFeed(newsDoc);
				rssDoc.parseToHTML(news);
			}
		}
	}
}
addEvent(window, "load, setupSearch, false);

function setupSearch() {
	var main = document.getElementById("main");
	var sInput = document.getElementById("sInput");
	var sButton = document.getElementById("sButton");
	
	var suggestBox = document.getElementById("suggestBox");
	suggestBox.timeID = null; // time ID for delayed request
	
	// Retrieve search suggestions after keys are typed
	sInput.onkeyup = function() {
		if (suggestBox.timeID)
			clearTimeout(suggestBox.timeID);
		suggestBox.timeID = setTimeout(function() {
			// Submit a suggestion request after 0.3 seconds
			
			if (sInput.value == "")
				suggestBox.style.display = "none";
			
			else {
				var reqSuggest = new XMLHttpRequest();
				var suggestURL = "/cgi-bin/sbkeywords.cgi?suggest=" + escape(sInput.value);
				reqSuggest.open("GET", suggestURL);
				reqSuggest.send(null);
				
				reqSuggest.onreadystatechange = function() {
					if (this.readyState == 4) {
						if (this.status == 200) {
							
							// Process the request response
							var json = eval("(" + this.responseText + ")");
							
							if (json.searchResults.length == 0) {
								suggestBox.style.display = "none";
							}
							
							else {
								suggestBox.innerHTML = "";
								suggestBox.style.display = "block";
								
								for (var i = 0; i < json.searchResults.length; i++) {
									var suggestion = document.createElement("div");
									suggestion.className = "suggestion";
									suggestion.innerHTML = json.searchResults[i];
									
									suggestion.onclick = function() {
										sInput.value = this.innerHTML;
										suggestBox.style.display = "none";
									}
									
									suggestion.onmouseover = function() {
										this.className = "activeSuggestion";
									}
									
									suggestion.onmouseout = function() {
										this.className = "suggestion";
									}
									
									suggestBox.appendChild(suggestion);
							}
						}
					}
				}
			}
			
		}, 300);
	}
	
	// Retrieve articles when the search icon is clicked
	sButton.onclick = function() {
		
		// Search key entered in the sInput box
		var key = escape(sInput.value);
		
		// Hide the suggestion box
		var suggestBox = document.getElementById("suggestBox");
		suggestBox.style.display = "none";
		
		// Request object to access the archived articles
		var reqSearch = new XMLHttpRequest();
		var searchURL = "/cgi-bin/sbarchives.cgi?skey=" + key;
		reqSearch.open("GET", searchURL);
		reqSearch.send(null);
		
		reqSearch.onreadystatechange = function() {
			if (this.readyState == 4) {
				// Retrieve the archived columns
				main.innerHTML = this.responseText;
			}
		}
	}
}