var cardIDArray = ["firstCard", "secondCard", "thirdCard", "fourthCard", "fifthCard", "sixthCard"];
var cardArray = ["1clubs.png", "1hearts.png", "2clubs.png", "2hearts.png", "3clubs.png", "3hearts.png"];
var cardCounter = 0; //when this reaches 2, timer triggered, flips all back
var cardEventListener = document.getElementsByClassName("card");
var timerFlip = 0; //placeholder
var firstCard = 0;//placeholder
var secondCard = 0;//placeholder
var firstCardIdentifier = 0; //placeholder
var secondCardIdentifier = 0; //placeholder
var firstIDVariable = 0;
var secondIDVariable = 0;

window.addEventListener('load', resetAll, false) //assigns card srcs on load
document.getElementById("restartButton").addEventListener("click", resetAll, false);

function resetAll() {
    clearTimeout(timerFlip);  // reset button will stop timer before flip
    cardCounter = 0;
    cardArray = ["1clubs.png", "1hearts.png", "2clubs.png", "2hearts.png", "3clubs.png", "3hearts.png"];

    assignCards();
    for (var i = 0; i < cardArray.length; i++) {
        document.getElementById(cardIDArray[i]).src = "back.png";
    }
    for (var i = 0; i < cardEventListener.length; i++) {
        cardEventListener[i].addEventListener("click", flipCardToFace, false); // adds event listener to each card
    }
}

function flipCardsOver() {
    for (var i = 0; i < cardArray.length; i++) {
        if (cardArray[i] != "clear.png") {
            document.getElementById(cardIDArray[i]).src = "back.png";
        } else {
            document.getElementById(cardIDArray[i]).src = "clear.png";
        }
    }
    cardCounter = 0;
    //console.log(cardEventListener);
    for (var i = 0; i < cardEventListener.length; i++) {
        if (cardArray[i] != "clear.png") {
            cardEventListener[i].addEventListener("click", flipCardToFace, false); // adds event listener to each card
        }
    }
    // add event listener for certain images, if cardID in noEventListener array
}

function assignCards() {
    //console.log("assignCards called!");
    for (i = cardArray.length - 1; i > 0; i--) { // Fisher-Yates method from W3Schools (https://www.w3schools.com/js/js_array_sort.asp)
        var temp = Math.floor(Math.random() * i);   // and Durstenfeld's modern version
        var orgVal = cardArray[i];
        cardArray[i] = cardArray[temp];
        cardArray[temp] = orgVal;
        // Durstenfeld: "To shuffle an array a of n elements (indices 0..n-1):
        //for i from n−1 down to 1
        //j ← random integer such that 0 ≤ j ≤ i
        //exchange a[j] and a[i]""
        // In my code, n is the cardArray.length, j is temp as generated by the math.random method, and orgVal is the placeholder to switch
        // cardArray[j] and cardArray[i]. This results in a shuffled cardArray, and each item will be matched with a corresponding ID from cardIDArray
    }
}

function flipCardToFace() {
    var idVariable = event.target.id; //get id of card clicked
    //console.log("idVariable " + idVariable);
    var cardIdentifier = cardIDArray.indexOf(idVariable); //find position in array
    //console.log("idVariable " + cardIdentifier);
    //flip over
    document.getElementById(idVariable).src = cardArray[cardIdentifier];
    //remove eventlistener
    document.getElementById(idVariable).removeEventListener("click", flipCardToFace, false);

    if (cardCounter == 0) {
        //storing for future comparison
        firstCard = cardArray[cardIdentifier];
        firstIDVariable = idVariable;
        firstCardIdentifier = cardIdentifier;
    }
    else if (cardCounter == 1) {
        secondCard = cardArray[cardIdentifier];
        secondIDVariable = idVariable;
        secondCardIdentifier = cardIdentifier;
    }

    cardCounter++; //when this reaches 2, timer triggered, flips all back
    if (cardCounter >= 2) {
        // block any more clicks by removing event listeners, added back in flipCardsOver function
        for (var i = 0; i < cardEventListener.length; i++) {
            cardEventListener[i].removeEventListener("click", flipCardToFace, false); // adds event listener to each card
        }

        //would like to know if there's better way to do this comparison
        if (firstCard == "1clubs.png" && secondCard == "1hearts.png" || secondCard == "1clubs.png" && firstCard == "1hearts.png"
        || firstCard == "2clubs.png" && secondCard == "2hearts.png" || secondCard == "2clubs.png" && firstCard == "2hearts.png"
        || firstCard == "3clubs.png" && secondCard == "3hearts.png" || secondCard == "3clubs.png" && firstCard == "3hearts.png") {
            cardArray[firstCardIdentifier] = "clear.png";
            cardArray[secondCardIdentifier] = "clear.png";
            timerFlip = setTimeout(flipCardsOver, 1500); //timer and flip cards
        } else {
            timerFlip = setTimeout(flipCardsOver, 1500); //timer and flip cards
        }

        firstCard = 0; //reset the placeholders
        secondCard = 0;
        cardCounter = 0;
    }
}
