//var allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//var winningPositions = [[8, 1, 6], [3, 5, 7], [4, 9, 2], [8, 3, 4], [1, 5, 9], [6, 7, 2], [8, 5, 2], [6, 5, 4]];

var occupiedPositions = [];
var ties = [];
var nextPlayer = null;
	
var isComputer = false;

var player = function(icon, isAI) {
	return {
		positions : [],
		wins : [],
		opponent : null,
		render : function(buttonNumber) {
			if (isAI){
				buttonNumber = calculateMove();
			} else {
				this.positions.push(buttonNumber);
				occupiedPositions.push(buttonNumber);
				nextPlayer = this.opponent;
			}
			var personIcon = changeButtonToIcon(icon, buttonNumber);//set the image to that button
			return personIcon;
		}
	};
};

var player1 = player("/img/yellow.png");
var player2 = player("/img/purple.png");
var computer = player("/img/purple.png", true);
player1.opponent = player2;
player2.opponent = player1;
nextPlayer = player1;

function renderPlayerIcon(buttonNumber) {
	console.log(computer)
	if (isComputer) {
		player1.render(buttonNumber);
		computer.render(buttonNumber);
	} else {
    nextPlayer.render(buttonNumber);
	}
    return winTieOrContinue();
}



function playerGoesFirst(p) {
    var user;
    function changeColor(firstPlayer, secondPlayer) {
        document.getElementById(firstPlayer).style.color = "white";
        document.getElementById(secondPlayer).style.color = "black";
    }
    
    if (p.innerHTML === 'Purple') {
        changeColor("purple", "yellow");
		user = player2;
    } else {
        changeColor("yellow", "purple");
		user = player1;
    }
	nextPlayer = user;
    return nextPlayer;
}


function changePlayerType(button) {
	console.log(button)
	if ( button.value === 'Human Vs Human') {
		button.value = 'Human Vs Computer';
		isComputer = true;
	} else {
		button.value = 'Human Vs Human';
		isComputer = false;
	}
	
}


function winTieOrContinue() {
    return determinOutcome() !== false ? disableAllButtons() : false;
    
}



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
    }
    return gameButton;
}


//clear the board and empty the arrays
function replay() {
    clearBoard();
    player1.positions = [];
    player2.positions = [];
    occupiedPositions = [];
}

function cloneArray(arr) {
	//because array.sort() method is mutable so have to copy the array 1st instead
	return arr.slice(0);
}

// to check for win calculate last 2 in computerpositions,
// then 15 - (last 2 in computer) check if this n is in computerpositions
function win(playersPositions, playersWins) {
    var playersPositionsClone = cloneArray(playersPositions);
    while (playersPositionsClone.length > 2) {
    playersPositionsClone.shift();
    }
    var thirdOfaRow = 15 - (playersPositionsClone[0] + playersPositionsClone[1]);
    if (thirdOfaRow !== playersPositionsClone[0] && thirdOfaRow !== playersPositionsClone[1] && playersPositions.indexOf(thirdOfaRow) >= 0) {
        playersWins.push(true);
		console.log("playerwins at win():", playersWins)
        return true;
    }
}



function tie() {
	//will be checked AFTER win
   return occupiedPositions.length === 9 ? ties.push(true) : false;
}


function determinOutcome() {
	var scores = function(id, array) { 
		document.getElementById(id).innerHTML = array.length;
	}
	
	return win(player1.positions, player1.wins) ? scores("player1-scores", player1.wins) : 
		win(player2.positions, player2.wins) ? scores("player2-scores", player2.wins) : win(computer.positions, computer.wins) ? scores("player2-scores", computer.wins) : 
		tie() ? scores("tie-scores", ties) :
		false;
}

var twoInARow = [
      {t:'1,8',m:6},{t:'6,8',m:1},{t:'1,6',m:8}, // first row
      {t:'3,5',m:7},{t:'3,7',m:5},{t:'5,7',m:3}, // second row
      {t:'4,9',m:2},{t:'2,4',m:9},{t:'2,9',m:4}, // third row
      {t:'3,8',m:4},{t:'4,8',m:3},{t:'3,4',m:8}, // first column
      {t:'1,9',m:5},{t:'1,5',m:9},{t:'5,9',m:1}, // second column
      {t:'6,7',m:2},{t:'2,6',m:7},{t:'2,7',m:6}, // third column
      {t:'5,8',m:2},{t:'2,8',m:5},{t:'2,5',m:8}, // first diagonal
      {t:'5,6',m:4},{t:'4,6',m:5},{t:'4,5',m:6}, // second diagonal    
    ];

function last2Positions(arr) {
	return arr.slice(-2).sort();
}

function randomise() {
	var num;
	do {
		num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
	} while (num === player1.positions[0]);
	return num;
}

function calculateMove() {
	var btnNum;
	if (player1.positions.length < 2) {
		btnNum = randomise()
		
	} else {
		last2Positions(player1.positions);
		last2Positions(computer.positions);
		var computerPosi = cloneArray(computer.positions);
		var player1Posi = cloneArray(player1.positions);
		computerPosi.sort();
		player1Posi.sort();
		
		console.log("hit")
		
		for (var i = 0; i < twoInARow.length; i++){
			for (var j = 0; j < twoInARow.length; j++) {
				if (computerPosi.toString() === twoInARow[i].t) {
					btnNum = twoInARow[i].m;
				} else if (player1Posi.toString() === twoInARow[i].t){
					btnNum = twoInARow[i].m;
				} //need a case for when neither player is 2 in a row
			}
		}
	}
	return btnNum;
}


	


//To find free spaces (compare allPositions against occupiedPositions)
Array.prototype.difference = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
        
    });
};