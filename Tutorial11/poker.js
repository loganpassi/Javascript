/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 11
   Tutorial Case

   Author: Logan Passi
   Date:   11/15/2018

   Filename: poker.js

   
   Functions and Nested Functions

   playDrawPoker()
      Initializes and plays the video poker game

   disableButton(button)
      Disables and fades-out the form button

   enableButton(button)
      Enables and fades-in the form button

   evaluateHand()
      Evaluates the current poker hand and updates
      the pot value
	
*/

addEvent(window, "load", playDrawPoker, false);

function playDrawPoker() {
	
	//Test the pokerCard error code
	var testCard = new pokerCard("Heart", 10);

   var dealButton = document.getElementById("dealB");
   var drawButton = document.getElementById("drawB");
   var standButton = document.getElementById("standB");
   var resetButton = document.getElementById("resetB");
   var handValueText = document.getElementById("handValue");
   var betSelection = document.getElementById("bet");
   var potValue = document.getElementById("pot");
   
   //Reference the collection of card images
   var cardImages = new Array();
   var allImages = document.getElementsByTagName("img");
   for (var i = 0; i < allImages.length; i++){
	   if (allImages[i].className == "pokerCard")
		   cardImages.push(allImages[i]);
   }
   //Set the initial values for the pot and player's bet
   pokerGame.currentPot = 500;
   pokerGame.currentBet = 25;
   
   //Display the initial pot value in the game table
   potValue.value = pokerGame.currentPot;
   
   //Create a new deck of cards and shuffle it
   var myDeck = new pokerDeck();
   myDeck.shuffle();
   
   //Define a poker hand for the game
   var myHand = new pokerHand(0, 5);
   
   /*alert("The number of cards in my deck is " + myDeck.cards.length + ".\n" + "The first card is a " + myDeck.cards[0].rank + " of " + myDeck.cards[0].suit + "s.");*/
   
   //Change the bet value from the selection listStyleType
   betSelection.onchange = function() {
	   pokerGame.currentBet = parseInt(this.options[this.selectedIndex].value);
   }
   
   //Function to disable and gray out a form button
   function disableButton(button) {
	   button.disabled = true;
	   setOpacity(button, 25);
   }
   
   //Function to enable and display a form button
   function enableButton(button) {
	   button.disabled = false;
	   setOpacity(button, 100);
   }
   
   //Actions when a card image is clicked
   for (var i = 0; i < cardImages.length; i++){
	   
	   cardImages[i].index = i;
	   
	   cardImages[i].onclick = function() {
		   if (myHand.cards[this.index].discard) {
			   myHand.cards[this.index].discard = false;
			   this.src = myHand.cards[this.index].imageSrc();
		   }
		   
		   else {
			   myHand.cards[this.index].discard = true;
			   this.src = "cardback.png";
		   }
	   }
   }
   
   //Actions when the Deal button is clicked
   dealButton.onclick = function() {
	   
	   if (pokerGame.currentBet <= pokerGame.currentPot) {
			//Enable or disable other buttons
			disableButton(dealButton);
			enableButton(drawButton);
			enableButton(standButton);
			betSelection.disabled = true;
			
			//Subtract the bet from the pot
			pokerGame.placeBet();
			potValue.value = pokerGame.currentPot;
			
			//Reset handValueText and set the card image opacity to %100
			handValueText.innerHTML = "";
			for (var i = 0; i < cardImages.length; i++) {
				setOpacity(cardImages[i], 100);
			}
			
			//Get a new deck if there are less than 10 cards in the current deck
			if (myDeck.cards.length < 10) {
				myDeck = new pokerDeck();
				myDeck.shuffle();
			}
			
			//Deal the cards from my deck to my hand
			myDeck.dealTo(myHand);
			
			//Display the images for each card in the hand
			for (var i = 0; i < cardImages.length; i++) {
				cardImages[i].src = myHand.cards[i].imageSrc();
			}
	   }
	   
	   else {
		   alert("Reduce the size of your bet");
	   }
   }
   
   //Actions when the Draw button is clicked
   drawButton.onclick = function() {
	   
	   //Enable or disable other buttons
	   enableButton(dealButton);
	   disableButton(drawButton);
	   disableButton(standButton);
	   betSelection.disabled = false;
	   
	   //Replace cards marked to be discarded with cards from myDeck
	   for (var i = 0; i < myHand.cards.length; i++) {
		   if (myHand.cards[i].discard) {
			   myHand.cards[i].replaceFromDeck(myDeck);
			   myHand.cards[i].discard = false;
			   cardImages[i].src = myHand.cards[i].imageSrc();
		   }
	   }
	   evaluateHand();
   }
   
   //Actions when the Stand button is clicked
   standButton.onclick = function() {
	   
	   //Enable or disable other buttons
	   enableButton(dealButton);
	   disableButton(drawButton);
	   disableButton(standButton);
	   betSelection.disabled = false;
	   
	   evaluateHand();
   }
   
   // Function to evaluate the player's hand and update the pot
   function evaluateHand() {
	   
	   handValueText.innerHTML = myHand.handValue();
	   
	   for (var i = 0; i < cardImages.length; i++) {
		   setOpacity(cardImages[i], 25);
	   }
	   
	   //Change the pot value based on the results of the hand
	   var payoutValue = myHand.handOdds();
	   pokerGame.payout(payoutValue);
	   potValue.value = pokerGame.currentPot;
	   
	   //Quit the game if pot is empty
	   if (pokerGame.currentPot == 0){
		   alert("Game Over");
		   disableButton(dealButton);
	   }
   }
   
   //Reload the Web page when the Reset button is clicked
   resetButton.onclick = function() {
	   
	   window.location.reload(true);
   }

}

