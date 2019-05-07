/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 9
   Tutorial Case

   Author:   Logan Passi
   Date:     10/23/2018

   Filename: register.js

   Functions List:

   initPage()
      Adds an event handler to the registration form submit button
      when the page is opened.

   saveMemberInfo()
      Saves the values in the member registration form to fields in
      the memberInfo multi-valued cookie

*/

addEvent(window, "load", initPage, false);

function initPage() {
	
	//add event handler to the submit button
	document.getElementById("sbutton").onclick = saveMemberInfo;
	
	if (retrieveMCookie("memberInfo", "lastName")) {
		
		var allInputs = document.getElementsByTagName("input");
		for (var i = 0; i < allInputs.length; i++) {
			if (allInputs[i].type == "text") {
				if (retrieveMCookie("memberInfo", allInputs[i].id)) {
					allInputs[i].value = retrieveMCookie("memberInfo", allInputs[i].id);
				}
			}
		}
		
		document.getElementById("state").selectedIndex = retrieveMCookie("memberInfo", "state");
		
		if (retrieveMCookie("memberInfo", "member1") == "true")
			document.getElementById("member1").checked = true;
		else if (retrieveMCookie("memberInfo", "member2") == "true")
			document.getElementById("member2").checked = true;
	}
}

function saveMemberInfo() {
	
	//set the cookie expiration date one year hence
	var expire = new Date();
	expire.setFullYear(expire.getFullYear() + 1);
	
	//loop through all the elements in the form
	var allFields = document.registerForm.elements;
	for (var i = 0; i < allFields.length; i++) {
		
		if (allFields[i].type == "text") {
			//write input box value to a cookie
			writeMCookie("memberInfo", allFields[i].id, allFields[i].value, expire);
		}
		
		if (allFields[i].nodeName == "SELECT") {
			//write the index number of the selected options
			writeMCookie("memberInfo", allFields[i].id, allFields[i].selectedIndex, expire);
		}
		
		if (allFields[i].type == "radio" || allFields[i].type == "checkbox") {
			//write whether the button or checkbox was checked
			writeMCookie("memberInfo", allFields[i].id, allFields[i].checked, expire);
		}
	}
	
	alert("Registration data saved");
}

