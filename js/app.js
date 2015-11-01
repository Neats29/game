//9 clickable boxes
//have two playes, person and computer

var person = [];
var computer = [];

var personScore = [];
var computerScore = [];

var winningRows = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ];


////counting score
//function countScore() {
//	
//}
//





//render image when clicked
function renderPlayerIcon(number) {
	renderPerson(number);
	renderComputer(number);
	console.log("end")
}

//When the user clicks on a button, the game starts. insert button number into an array for person
function renderPerson(number) {
	var gameButton = document.getElementById(number); //find out which button was clicked
	var personIcon = gameButton.src="./img/yellow.png"; //set the image to that button
	person.push(number); //save number in array
	return personIcon;
}

//imdediately after, the computer player renders a position. insert button number into an array for computer
function renderComputer(number) {
	var gameButton, randomButtonNumber, generatedButtonNumber, computerIcon;
	
	//first try defensive stretegy
	if (person.length >= 2 && loopThroughWinningRows(person) > 0) {
		generatedButtonNumber = loopThroughWinningRows(person);
		gameButton = document.getElementById(generatedButtonNumber);
		computerIcon = gameButton.src="./img/purple.png";
		computer.push(generatedButtonNumber);
		
	// then try offensive strategy (return all 4 posible offensive positions and randomise them)
	} else if (person.length >= 2 && loopThroughWinningRows(person) === false) {
		return false;
	
	//The first go
	} else {
		do {
			randomButtonNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		} while (randomButtonNumber == number);
		
		gameButton = document.getElementById(randomButtonNumber);
		computerIcon = gameButton.src="./img/purple.png";
	}

	computer.push(randomButtonNumber);
	return computerIcon;
}






//loop through the winning arrays to find out if person is in two positions of winning three row, if get back a number, place computer there, if not, then return false 
function loopThroughWinningRows(arr) {
	var i, j;
	arr = arr.sort();
	
	function loop() {
    	for (i = 0; i < winningRows.length; i+=1) {
    	    var winingRowsSub = winningRows[i];
    		for (j = 0; j < winingRowsSub.length; i+=1) {
    		    console.log(winingRowsSub[j]);
    		
    	if (arr.indexOf(winingRowsSub[j]) > -1 && arr.indexOf(winingRowsSub[j+1]) > -1){
    		return winingRowsSub[j+2];
    		} else if (i+1 < winningRows.length){
    		      winningRows.shift();
    			  return loop();
    		} else {
    		    return false;
    		}
    		}
    	}
	}
	return loop();
}




//if not, check if computer has 2 next to eachother, computer should fill in the third box
//if not check where there is a row without any of the persons and place there
//reply button should empty all buttons
//could do 2 player game later
