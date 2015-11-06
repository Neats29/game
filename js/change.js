//refactor to make a person and computer constructor

//var person = {
//    positions: tenIndexArray,
//    pairs: tenIndexArray
//    
//}

var personsPositions = [2];
//var computersPositions = [4, 3, 5]; //example to test
var computersPositions = [];

var personsIcon = "/img/yellow.png";
var computersIcon = "/img/purple.png";

var occupiedPositions = [];
var allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var winningPositions = [[8, 1, 6], [3, 5, 7], [4, 9, 2], [8, 3, 4], [1, 5, 9], [6, 7, 2], [8, 5, 2], [6, 5 , 4]];

var personsWins = [];
var computersWins = [];
var ties = [];

//render image when clicked
function renderPlayerIcon(number) {
	renderPerson(number);
    determinOutcome();
    
    //create timed event to make the computer's move seem more realistic (otherwise the person's move and computer's would happen simultaneously)
//   window.setTimeout(renderComputer(number), 7000);
    renderComputer();
    determinOutcome();

	console.log("occupied positions",  occupiedPositions);
}

//Let the person go first
function renderPerson(number) {
	var personIcon = changeButtonToIcon(personsIcon, number);//set the image to that button
    personsPositions.push(number);
    occupiedPositions.push(number);
    console.log("persons positions", personsPositions);
	return personIcon;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderComputer() {
	var gameButton, PotentialButtonNum, freePositions;
	
	//first try offensive strategy
	if (computersPositions.length >= 2 ) {
        
         while (computersPositions.length > 2) {
            computersPositions.shift();
        }
        console.log("computersPositions", computersPositions);
        PotentialButtonNum = 15 - (computersPositions[0] + computersPositions[1]);
        return occupiedPositions.indexOf(PotentialButtonNum) === -1 ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
        //if true, the board needs to be disabled here as the computer would have won
           
        
    //offensive when computer has less than 2
    } else if (computersPositions.length < 2) {
      //go through array of array and find the number that matches persons move then remove one elemnt of that array so the array is 2 elemnts long
        // then take the one next to it and place pc there
        
        for (var i = 0; i < winningPositions.length; i++) {
            var innerLength = winningPositions[i].length;
            var innerIndex = winningPositions[i][j];
            for (var j = 0; j < innerLength; i++) {
                console.log(winningPositions[i]);
                if (winningPositions[i].indexOf(2) === 0) {
                    winningPositions[i].pop();
                    PotentialButtonNum = winningPositions[1];
                } else if (winningPositions[i].indexOf(2) === 1) {
                    winningPositions[i].pop();
                    PotentialButtonNum = winningPositions[0];
                }
            }
        }
        
        gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
        return gameButton;
        
        //defensive
    } else if (computersPositions.length === 1) {    
        console.log("DEFENSIVE **ONE** purple");
        freePositions = allPositions.difference(occupiedPositions);
        console.log("FREE POSITIONS:", freePositions);
        
//        for (var i = 0; i < 7; i++) {
//            
//            if (freePositions[i] + computersPositions[i] === 15) {
//                return freePositions[i];
//            } else {
//                
//            }
//        }

        PotentialButtonNum = randomise(freePositions);
        PotentialButtonNum = PotentialButtonNum[0];
        console.log("PotentialButtonNum:", PotentialButtonNum);
        gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
        console.log("occupied when offensive but only 1 purple:", occupiedPositions);
        
	} else {
        return true;
//		do {
//			PotentialButtonNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
//		} while (PotentialButtonNum == number);
//		
//		gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
//	}
//    
    }
    updatePositionsArrays(computersPositions, PotentialButtonNum);
    updatePositionsArrays(occupiedPositions, PotentialButtonNum);
    console.log("occupied positions when computer goes",  occupiedPositions);

    console.log("PC positions", computersPositions);
	return gameButton;
}

//////////////////////////////////////////////////////////////////////////////////////////




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
    personsPositions = [];
    computersPositions = [];
    occupiedPositions = [];
}




function changeButtonToIcon(player, buttonNumber) {
    document.getElementById(buttonNumber).setAttribute("src", player);
    return document.getElementById(buttonNumber).setAttribute("disabled", "disabled");
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
        var personsScores = document.getElementById("persons-scores").innerHTML = personsWins.length;
        var computersScores = document.getElementById("computers-scores").innerHTML = computersWins.length;
        var tieScores = document.getElementById("tie-scores").innerHTML = ties.length;
        return win(personsPositions, personsWins) ? personsScores : 
        win(computersPositions, computersWins) ? computersScores :
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
