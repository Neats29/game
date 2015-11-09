//refactor to make a person and computer constructor

//var person = {
//    positions: tenIndexArray,
//    pairs: tenIndexArray
//    
//}

var person1Positions = [];
//var person2Positions = [4, 3, 5]; //example to test
var person2Positions = [];

var person1Icon = "/img/yellow.png";
var person2Icon = "/img/purple.png";

var occupiedPositions = [];
var allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var winningPositions = [[8, 1, 6], [3, 5, 7], [4, 9, 2], [8, 3, 4], [1, 5, 9], [6, 7, 2], [8, 5, 2], [6, 5 , 4]];

var person1Wins = [];
var person2Wins = [];
var ties = [];

var turn = null;

//render image when clicked
function renderPlayerIcon(buttonNumber) {
    if (turn === null || 'PLAYER 1') {
        renderPerson1(buttonNumber);
        determinOutcome();
        console.log(turn);
    } else {
        console.log("is it player 2?", turn);
        renderPerson2(buttonNumber);
        determinOutcome();
    }

	console.log("occupied positions",  occupiedPositions);
}

//Let the person go first
function renderPerson1(buttonNumber) {
	var personIcon = changeButtonToIcon(person1Icon, buttonNumber);//set the image to that button
    person1Positions.push(buttonNumber);
    occupiedPositions.push(buttonNumber);
    console.log("person1 positions", person1Positions);
    turn = 'PLAYER 2';
	return personIcon;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderPerson2(buttonNumber) {
	var personIcon = changeButtonToIcon(person2Icon, buttonNumber);//set the image to that button
    person2Positions.push(buttonNumber);
    occupiedPositions.push(buttonNumber);
    console.log("person2 positions", person2Positions);
    turn = 'PLAYER 1';
	return personIcon;
	
}

//////////////////////////////////////////////////////////////////////////////////////////

function changeButtonToIcon(player, buttonNumber) {
    document.getElementById(buttonNumber).setAttribute("src", player);
    return document.getElementById(buttonNumber).setAttribute("disabled", "disabled");
}


//set all buttons to no image
function clearBoard() {
    var gameButton;

    for (var i = 1; i < 10; i++) {
        gameButton = document.getElementById(i).removeAttribute("src");
        gameButton = document.getElementById(i).removeAttribute("disabled");
        console.log(gameButton);
    }
    return gameButton;
}



function disableAllButtons() {
    var gameButton;
    for (var i = 1; i < 10; i++) {
        gameButton = document.getElementById(i).setAttribute("disabled", "disabled");
        console.log(gameButton);
    }
    return gameButton;
}


//clear the board and empty the arrays
function replay() {
    clearBoard();
    person1Positions = [];
    person2Positions = [];
    occupiedPositions = [];
}






function updatePositionsArrays(arr, value) {
    arr.push(value);
}


// to check for win calculate last 2 in computerpositions,
// then 15 - (last 2 in computer) check if this n is in computerpositions
function win(playersPositions, playersWins) {
    
   while (playersPositions.length > 2) {
    playersPositions.shift();
    }
    var thirdOfaRow = 15 - (playersPositions[0] + playersPositions[1]);
    if (playersPositions.indexOf(thirdOfaRow) >= 0) {
        playersWins.push(true);
        return true;
    }
    else {
        return false;
    }
}



function tie() {
    //this should be called after win() is called
   return occupiedPositions.length === 9 ? ties.push(true) : false;
}


function determinOutcome() {
    //if true, need to make buttons unclickable (not done yet)
        var person1Scores = document.getElementById("person1-scores").innerHTML = person1Wins.length;
        var person2Scores = document.getElementById("person2-scores").innerHTML = person2Wins.length;
        var tieScores = document.getElementById("tie-scores").innerHTML = ties.length;
        return win(person1Positions, person1Wins) ? person1Scores : 
        win(person2Positions, person2Wins) ? person2Scores :
        tie() ? tieScores : 
        false;
}




//To find free spaces (compare allPositions against occupiedPositions)
Array.prototype.difference = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
        
    });
};



//probably wont use this anymore 
//when computer is being offensive but only has 1 position, needs to pick a random number of 6 choices
function randomise(arr) {
  var currentIndex = arr.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}
