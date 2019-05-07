/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 9
   Tutorial Case

   Author:   Logan Passi
   Date:     3/1/2012

   Filename: cyclo.js


   Functions List:


*/

addEvent(window, "load", initPage, false);

function initPage() {

   if (cookiesEnabled() == false)
      alert("You must enable cookies to save and view member information");

   // Retrieve date of last visit
   if (retrieveCookie("lastVisit") == null) lastVisit = "First time"
   else lastVisit = retrieveCookie("lastVisit");

   // Set date of current visit
   var today = new Date();
   var currentVisit = writeDateString(today);

   // Write current visit to lastVisit cookie
   expire = new Date();
   expire.setMonth(expire.getMonth() + 6);
   writeCookie("lastVisit", currentVisit, expire);

   if (retrieveMCookie("memberInfo", "lastName") != null) {

      var firstName = retrieveMCookie("memberInfo", "firstName");

      var lastModified = new Date(document.lastModified);
      var pageUpdate = writeDateString(lastModified);

      var welcome = document.createElement("div");
      welcome.id = "welcome";

      htmlString = "Welcome back " + firstName;
      htmlString += "<br />";
      htmlString += "Last visit: <span>" + lastVisit + "</span>";
      htmlString += "<br />";
      htmlString += "Last update: <span>" + pageUpdate + "</span>";

      welcome.innerHTML = htmlString;
      document.body.appendChild(welcome);
 
   }

}

addEvent (window, "load", initPage, false);

function initPage() {
	
	if (cookiesEnabled() == false)
		alert("You must enable cookies to save and view member information");
	
	//retrieve date of last visit
	if (retrieveCookie("lastVisit") == null)
		lastVisit = "First Time";
	else
		lastVisit = retrieveCookie("lastVisit");
	
	//set date of current visit
	var today = new Date();
	var currentVisit = writeDateString(today);
	
	//write current visit to lastVisit cookie
	expire = new Date();
	expire.setMonth(expire.getMonth() + 6);
	writeCookie("lastVisit", currentVisit, expire);
	
	if  (retrieveMCookie("memberInfo", "lastName") != null) {
		
		var firstName = retrieveMCookie("memberInfo", "firstName");
	
		var lastModified = new Date(document.lastModified);
		var pageUpdate = writeDateString(lastModified);
		
		var welcome = document.createElement("div");
		welcome.id = "welcome";
		
		htmlString = "Welcome back " + firstName;
		htmlString += "<br />";
		htmlString += "Last visit: <span>" + lastVisit + "</span>";
		htmlString += "<br />";
		htmlString += "Last Update: <span>" + pageUpdate + "</span>";
		
		welcome.innerHTML = htmlString;
		document.body.appendChild(welcome);
	}
}





