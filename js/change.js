//refactor to make a person and computer constructor

//var person = {
//    positions: tenIndexArray,
//    pairs: tenIndexArray
//    
//}

var personsPositions = [];
var computersPositions = [];

var personsIcon = "/img/yellow.png";
var computersIcon = "/img/purple.png";

var occupiedPositions = [];
var allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var personsWins = [];
var computersWins = [];
var ties = [];

//render image when clicked
function renderPlayerIcon(number) {
	renderPerson(number);
    
    //create timed event to make the computer's move seem more realistic (otherwise the person's move and computer's would happen simultaneously)
//   window.setTimeout(renderComputer(number), 7000);
    renderComputer(number)
	console.log("occupied positions",  occupiedPositions);
}

//Let the person go first
function renderPerson(number) {
	var personIcon = changeButtonToIcon(personsIcon, number)//set the image to that button
    personsPositions.push(number);
    occupiedPositions.push(number);
    console.log("persons positions", personsPositions);
	return personIcon;
}




function renderComputer(number) {
	var gameButton, PotentialButtonNum, freePositions;
	
	//first try offensive strategy
	if (occupiedPositions.length > 3 ) {
        console.log("OFFENSIVE AFTER 2 purples")
		for (var i = 0; i < 10; i++) {
            console.log("computersPositions[i]",computersPositions[i])
            console.log("computersPositions[i+1]",computersPositions[i+1])
            PotentialButtonNum = 15 - (computersPositions[i] + computersPositions[i+1]); //only works when purple has 2 filled positions, no less no more
            console.log("offensive pair:", PotentialButtonNum)
            return PotentialButtonNum !== occupiedPositions[i] ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
            console.log("occupied when offensive:", occupiedPositions)
        }
           
        
    //defensive strategy
    } else if (occupiedPositions.length > 2 && computersPositions.length > 1) {
        console.log("DEFENSIVE AFTER 2 purples")
        for (var i = 0; i < 10; i++) {
            console.log("personsPositions[i]",personsPositions[i])
            console.log("personsPositions[i+1]",personsPositions[i+1])
            PotentialButtonNum = 15 - (personsPositions[i] + personsPositions[i+1]);
            console.log("defensive pair:", PotentialButtonNum)
            return PotentialButtonNum !== occupiedPositions[i] ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
            console.log("occupied when defensive:", occupiedPositions)
        }
        
    //first offensive strategy: out of the avaible positions (6), create a row of 2: 
        //from free positions, add, the first number with the computers position and check if total is 15, if not carry on with loop
        
    } else if (computersPositions.length === 1) {    
        console.log("DEFENSIVE **ONE** purple")
        freePositions = allPositions.difference(occupiedPositions);
        console.log("FREE POSITIONS:", freePositions)
        
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
        console.log("PotentialButtonNum:", PotentialButtonNum)
        gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
        console.log("occupied when offensive but only 1 purple:", occupiedPositions)
        
	//The first go
	} else {
		do {
			PotentialButtonNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		} while (PotentialButtonNum == number);
		
		gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
	}
    
    updatePositionsArrays(computersPositions, PotentialButtonNum);
    updatePositionsArrays(occupiedPositions, PotentialButtonNum);
    console.log("occupied positions when computer goes",  occupiedPositions);

    console.log("PC positions", computersPositions);
	return gameButton;
}


//set all buttons to no image
function clearBoard() {
    for (var i = 1; i < 10; i++) {
        var gameButton = document.getElementById(i).setAttribute("src", "");
    }
    return gameButton;
}

//clear the board and empty the arrays
function replay() {
    clearBoard()
    personsPositions = [];
    computersPositions = [];
    occupiedPositions = [];
}


//need a function to determin the status of the game
//look at the computer positions and person positions arrays 


function changeButtonToIcon(player, buttonNumber) {
    return player == personsIcon ? document.getElementById(buttonNumber).setAttribute("src", "/img/yellow.png") :     document.getElementById(buttonNumber).setAttribute("src", "/img/purple.png")
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
        playersWins.push(true)
        return true;
    }
    else {
        return false;
    }
}


//function tie() {
//    example, I start: 5, 7, 6, 4, 2, 8, 3, 9, 1
//}

function determinOutcome() {
    //if true, need to make buttons unclickable (not done yet)
    var personsScores = document.getElementById("persons-scores").innerHTML = personsWins.length;
    var computersScores = document.getElementById("computers-scores").innerHTML = computersWins.length;
    var tieScores = document.getElementById("tie-scores").innerHTML = ties.length;
    return 
    win(personsPositions, personsWins) ? personsScores : 
    win(computersPositions, computersWins) ? computersScores :
    "ties" ? tieScores : false;
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
