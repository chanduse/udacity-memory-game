"use strict";
var overall = document.getElementById("deck");
/*
 * Create a list that holds all of your cards
 */
var son = document.getElementsByClassName("card");
var sonList = [...son];
var clockStatus = 0;
var sec = 0;
var min = 0;
var hour = 0;
var moves = 0;
var moveSection = document.getElementById("Moves");
var cardMemory = [];
var starSection = [...document.getElementsByClassName("fa-star")];
var starNoof = 3;
var clock;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// for refreshing the Game

function refresh() {
  location.reload(true);
}
overall.onload = beginGame();
// begining of the games
function beginGame() {
  var manipulatedCards = shuffle(sonList);
  for (var i = 0; i < manipulatedCards.length; i++) {
    overall.append(manipulatedCards[i]);
  }
}

// length is calculate and click event is occur using listener

for (var i = 0; i < sonList.length; i++) {
  sonList[i].addEventListener("click", openCard);
}
// if card is clicked then timer wiil start
function openCard() {
  if (clockStatus == 0) {
    beginTimer();
    clockStatus = clockStatus + 1;
  }

  this.classList.add("card");
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disable");
  cardMemory.push(this);
  if (cardMemory.length == 2) {
    moves = moves + 1;
    moveSection.innerHTML = moves;
    rating();
    if (cardMemory[0].children[0].classList.item(1) == cardMemory[1].children[0].classList.item(1)) {
      console.log("matched");
      cardMemory[0].classList.add("match", "disable");
      cardMemory[1].classList.add("match", "disable");
      // all cards are matched the automatically stop the time here
      if (colliedCards.length == 16) {
        clearInterval(clock);
        Swal.fire({
          title: "Completed",
          html: 'you won two stars <strong style="color:#ff9f33; test-shadow:3px 3px 3px #000">' + starNoof + '<i class="fa fa-star"></i> </strong><br>you completed this game with the time of <br>' + sec + 'Seconds' + min + 'minutes' + hour + 'hour:',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> PlayAgain',
        }).then(() => {
          document.location.reload();
        });
      }
      cardMemory = [];
    } else {
      console.log("notMatchd");
      cardMemory[0].classList.add("unmatch");
      cardMemory[1].classList.add("unmatch");
      cardMemory.map((son) => {
        setTimeout(() => {
          son.classList.remove("unmatch", "open", "show", "disable");
        }, 200)

        cardMemory = [];
      })
    }
  }
}

var colliedCards = document.getElementsByClassName("match");
// Timer functionality
function beginTimer() {

  clock = setInterval(() => {
    sec = sec + 1;
    if (sec == 59) {
      sec = 0;
      min = min + 1;
    }
    if (min == 60) {
      min = 0;
      hour = hour + 1;
    }
    time.innerHTML = sec + "::" + min + "::" + hour;
  }, 1000)

}
// star count functionality
function rating() {
  if (moves > 10 && moves < 16) {
    starNoof = 2;
    starSection[2].style.display = "none";
  } else if (moves == 10) {
    Swal.fire(
      'Loser',
      'you lose one stars !',
      'question'
    )
  } else if (moves > 16) {
    starNoof = 1;
    starSection[1].style.display = "none";
  } else if (moves == 16) {
    Swal.fire(
      'Loser',
      'you lose two stars !',
      'question'
    )
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
