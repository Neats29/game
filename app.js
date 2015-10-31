//9 clickable boxes
//have two playes, person and computer
var person, computer;

var playersPosition = {
	person: [], 
	computer: []
};


//render image when clicked
function renderPlayerIcon(number) {
	renderPerson(number);
	rednerComputer(number);
	console.log("end")
}

function renderPerson(number) {
	var gameButton = document.getElementById(number); //find out which button was clicked
	var personIcon = gameButton.src="yellow.png"; //set the image to that button
	playersPosition.person.push(number); //save number in array
	return personIcon;
}


function rednerComputer(number) {
	var gameButton;
	var randomButtonNumber;
	randomButtonNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
	gameButton = document.getElementById(randomButtonNumber);
	var computerIcon = gameButton.src="purple.png";
	return computerIcon;
}





//When the user clicks on a button, the game starts. insert button number into an array for person
//imdediately after the computer player renders a random position. insert button number into an array for computer
//the user clicks again (if number matches that of person array, then do random again)
//check if two persons next to each other, computer should fill in the third box
//if not, check if computer has 2 next to eachother, computer should fill in the third box
//if not check where there is a row without any of the persons and place there



