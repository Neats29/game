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
	
    //first offensive strategy: out of the avaible positions (6), create a row of 2: then randomise
    if (occupiedPositions.length >= 3) {
        
        freePositions = allPositions.difference(occupiedPositions);
        PotentialButtonNum = randomise(freePositions);
        gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
        console.log("occupied when offensive but only 1 purple:", occupiedPositions)
    
    
	//first try offensive strategy
	} else if (occupiedPositions.length > 3) {
		for (var i = 0; i < 10; i++) {
            console.log("computersPositions[i]",computersPositions[i])
            console.log("computersPositions[i+1]",computersPositions[i+1])
            PotentialButtonNum = 15 - (computersPositions[i] + computersPositions[i+1]); //only works when purple has 2 filled positions, no less no more
            console.log("offensive pair:", PotentialButtonNum)
            return PotentialButtonNum !== occupiedPositions[i] ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
            console.log("occupied when offensive:", occupiedPositions)
        }
       
    //defensive strategy
    } else if (occupiedPositions.length >= 3) {
        for (var i = 0; i < 10; i++) {
            console.log("personsPositions[i]",personsPositions[i])
            console.log("personsPositions[i+1]",personsPositions[i+1])
            PotentialButtonNum = 15 - (personsPositions[i] + personsPositions[i+1]);
            console.log("defensive pair:", PotentialButtonNum)
            return PotentialButtonNum !== occupiedPositions[i] ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
            console.log("occupied when defensive:", occupiedPositions)
        }
        
	//The first go
	} else {
		do {
			PotentialButtonNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		} while (PotentialButtonNum == number);
		
		gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum);
	}

    computersPositions.push(PotentialButtonNum);
    occupiedPositions.push(PotentialButtonNum);
    console.log("occupied positions when computer goes",  occupiedPositions);

    console.log("PC positions", computersPositions);
    
	return gameButton;
}




function changeButtonToIcon(player, buttonNumber) {
    return player == personsIcon ? document.getElementById(buttonNumber).setAttribute("src", "/img/yellow.png") :     document.getElementById(buttonNumber).setAttribute("src", "/img/purple.png")
}



//To find free spaces (compare allPositions against occupiedPositions)
Array.prototype.difference = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
        
    });
};


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
