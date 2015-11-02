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
var freePositions = [true, true, true, true, true, true, true, true, true, true];



//render image when clicked
function renderPlayerIcon(number) {
	renderPerson(number);
    
    //create timed event to make the computer's move seem more realistic (otherwise the person's move and computer's would happen simultaneously)
//    window.setTimeout(renderComputer(number), 7000);
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
	var gameButton, PotentialButtonNum;
	
	//first try offensive stretegy
	if (occupiedPositions.length > 3) {
		for (var i = 0; i < 10; i++) {
            console.log("computersPositions[i]",computersPositions[i])
            console.log("computersPositions[i+1]",computersPositions[i+1])
            PotentialButtonNum = 15 - (computersPositions[i] + computersPositions[i+1]); //only works when purple has 2 filled positions, no less no more
            console.log("offensive pair:", PotentialButtonNum)
            var n = PotentialButtonNum !== occupiedPositions[i] ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
//            computersPositions.push(PotentialButtonNum);
            occupiedPositions.push(PotentialButtonNum);
            console.log("occupied when offensive:", occupiedPositions)
            return n;
        }
       
    //defensive
    } else if (occupiedPositions.length >= 3) {
        for (var i = 0; i < 10; i++) {
            console.log("personsPositions[i]",personsPositions[i])
            console.log("personsPositions[i+1]",personsPositions[i+1])
            PotentialButtonNum = 15 - (personsPositions[i] + personsPositions[i+1]);
            console.log("defensive pair:", PotentialButtonNum)
            var n = PotentialButtonNum !== occupiedPositions[i] ? gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum) : false;
            occupiedPositions.push(PotentialButtonNum);
            console.log("occupied when defensive:", occupiedPositions)
            return n;
        }
        
	//The first go
	} else {
		do {
			PotentialButtonNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		} while (PotentialButtonNum == number);
		
		gameButton = changeButtonToIcon(computersIcon, PotentialButtonNum); //turn these two lines into a fucntion
		
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


//when computer is deciding to make a move:
//check if 
