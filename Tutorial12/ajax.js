/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 12
   Tutorial Case

   Author:   Logan Passi
   Date:     11/19/2018

   Filename: ajax.js



   Functions List:

   addEvent(object, evName, fnName, cap)
      Adds an event handler to object where object is the object 
      reference, evName is the name of the event, fnName is the
      reference to the function, and cap specifies the
      capture phase.

   XMLHttpRequest()
      Creates a custom XMLHttpRequest object for IE browsers that
      do not support the native XMLHttpRequest object (chiefly
      IE5 and IE6)

   function RSSFeed(xmlDoc)
      Constructor function to retrieve title, description, and link
      information from a RSS document


*/

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

/* Add new code below */

// XMLHttpRequest Constructor
if (typeof XMLHttpRequest == "undefined") {
	XMLHttpRequest = function() {
		
		// Array of MSXML PIDs
		var pids = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		
		// Test each PIDs
		for (var i = 0; i < pids.length; i++) {
			try {
				return new ActiveXObject(pids[i]);
			} catch (e) {}
		}
		
		// Halt if unable to create request object
		throw new Error ("Unable to create request object");
	}
}

/* Constructor function for RSS news feeds */
function RSSFeed(xmlDoc) {
	
	// Retrieve the news feed title, link, and description
	var channel = xmlDoc.getElementsByTagName("channel")[0];
	var title = channel.getElementsByTagName("title")[0];
	var link = channel.getElementsByTagName("link")[0];
	var description = channel.getElementsByTagName("description")[0];
	
	this.title = title.firstChild.nodeValue;
	this.link = title.firstChild.nodeValue;
	this.description = title.firstChild.nodeValue;
	
	/* Constructor function for an RSS news item */
	function RSSItem(item) {
		var title = item.getElementsByTagName("title")[0];
		var link = item.getElementsByTagName("link")[0];
		var description = item.getElementByTagName("description")[0];
		
		this.title = title.firstChild.nodeValue;
		this.link = link.firstChild.nodeValue;
		this.description = description.firstChild.nodeValue;
	}
	
	// Create an array of news feed items
	this.items = new Array();
	
	var feedItems = channel.getElementsByTagName("item");
	for (var i = 0; I < feedItems.length; i++){
		var feedItem = new RSSItem(feedItems[i]);
		this.items.push(feedItem);
	}
}

/* Method to write the RSSFeed document to an HTML fragment */
RSSFeed.prototype.parseToHTML = function(outputNode) {
	
	var fTitle = document.createElement("h1");
	fTitle.innerHTML = this.title;
	outputNode.appendChild(fTitle);
	
	for (var i = 0; i < this.items.length; i++) {
		var iTitle = document.createElement("h2");
		var iTitleLink = document.createElement("a");
		iTitleLink.innerHTML = this.items[i].title;
		iTitleLink.href = this.items[i].link;
		
		iTitle.appendChild(iTitleLink);
		outputNode.appendChild(iTitle);
		
		var iPara = document.createElement("p");
		iPara.innerHTML = this.items[i].description;
		outputNode.appendChild(iPara);
	}
}