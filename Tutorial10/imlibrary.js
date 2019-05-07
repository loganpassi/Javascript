/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 10
   Tutorial Case

   Author:   Logan Passi
   Date:     11/1/2018

   Filename: imlibrary.js

   Functions List:

   addEvent(object, evName, fnName, cap)
      Adds an event handler to object where object is the object 
      reference, evName is the name of the event, fnName is the
      reference to the function, and cap specifies the
      capture phase.

   writeContent(windowObj, choice, guess)
      Writes a sample pop-up window to the windowObj window object
      using choice as the text of the user's quiz answer and
      guess as Boolean variable indicating whether the choice
      is correct.

   popWin(url)
      Opens a pop-up window displaying the page at url

   answer(choice, guess)
      Displays either a built-in dialog box or a custom dialog box
      with the user's choice and a Boolean variable guess indicating
      whether that choice is correct or not.

*/

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

function writeContent(windowObj, choice, guess) {
   content="<html><head><title>iMusicHistory Quiz</title>";
   content+="<link rel='stylesheet' href='quiz.css' type='text/css' />";
   content+="</head><body><p><img src='treble2.gif' alt='' />";
   if (guess) {
      content += choice + " is correct!";
   } else {
      content += choice + " is incorrect. Try again";
   }
   content+="<br /><input type='button' value='OK' onclick='self.close()' />";
   content+="</p></body></html>";
   windowObj.document.write(content);
   windowObj.document.close();
}

function popWin(url) {
	pop = window.open(url, "pop", "width=330,height=220,scrollbars=yes");
	testpop = (pop == null || typeof(pop) == "undefinded") ? true: false;
	return testpop;
}

function answer(choice, guess) {
	ansWin = window.open("","","width=250,height=100,left=250,screenX=250,top=250,screenY=250");
	nopop = (ansWin == null || typeof(ansWin) == "undefined") ? true : false;
	
	if (nopop) {
		if (guess) {
			alert(choice + " is correct!");
		}
	
		else {
			alert(choice + " is incorrect. Try again.");
		}
	}
	
	else {
		writeContent(ansWin, choice, guess);
	}
}

