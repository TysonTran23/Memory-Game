const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let firstCard = null;
let secondCard = null;
let matchCounter = 0;
let awaitingEndofMove = false;
let activeTile = null;
let tileCount = COLORS.length;


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

let startButton = document.createElement('button');
startButton.innerText = "Start Game";
document.body.append(startButton)

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("data-revealed", "false");
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  //Do not let user click on other tiles after getting first selection wrong
  awaitingEndofMove = false;

  //Reveal Color
  const clickedCard = event.target
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  const revealed = clickedCard.getAttribute("data-revealed"); //Making sure that we can only compare tiles that have a "data-revealed" === false 

  if (awaitingEndofMove
    || revealed === "true" 
    || clickedCard === activeTile) {
    return;
  }

  //Checking to see if we have a tile already clicked
  if (!activeTile) {
    activeTile = clickedCard;
    return; //Now need to choose a second tile
  }

  let colorToMatch = activeTile.classList[0];

  //Runs if the two tiles clicked are a match
  if (colorToMatch === clickedCard.classList[0]) {
    activeTile.setAttribute("data-revealed", "true")
    clickedCard.setAttribute("data-revealed", "true")
    awaitingEndofMove = false; //Resets
    activeTile = null; //Resets
    matchCounter += 2; //Will use this later to check if all tiles have been revealed 

    if (matchCounter === tileCount) {
      alert("You win! Refresh to play again.");
    }
    return;
  }

  //This block of code is resetting after 2 tiles have been picked
  awaitingEndofMove = true; //Don't let user choose another tile after end of turn
  setTimeout(function () {
    clickedCard.style.backgroundColor = null; //Second Card
    activeTile.style.backgroundColor = null; //First Card

    awaitingEndofMove = false; //Resets
    activeTile = null; //Resets
  }, 1000);

  // console.log("you just clicked", event.target);
}



// when the DOM loads
createDivsForColors(shuffledColors);
