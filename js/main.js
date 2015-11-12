//var allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//var winningPositions = [[8, 1, 6], [3, 5, 7], [4, 9, 2], [8, 3, 4], [1, 5, 9], [6, 7, 2], [8, 5, 2], [6, 5, 4]];

var occupiedPositions = [];
var ties = [];
var nextPlayer = null;
	
var player = function(icon) {
	return {
		positions : [],
		wins : [],
		opponent : null,
        name: null,
		render : function(buttonNumber) {
			var personIcon = changeButtonToIcon(icon, buttonNumber);//set the image to that button
			this.positions.push(buttonNumber);
			occupiedPositions.push(buttonNumber);
			nextPlayer = this.opponent;
			return personIcon;
		}
		
	};
};

var player1 = player("/img/yellow.png");
var player2 = player("/img/purple.png");

player1.opponent = player2;
player2.opponent = player1;
nextPlayer = player1;


function renderPlayerIcon(buttonNumber) {
    nextPlayer.render(buttonNumber);
    return winTieOrContinue();
}



function playerGoesFirst(p) {
    var user;
    function changeColor(firstPlayer, secondPlayer) {
        document.getElementById(firstPlayer).style.color = "white";
        document.getElementById(secondPlayer).style.color = "black";
    }
    
    if (p === 2) {
        changeColor("purple", "yellow");
		user = player2;
    } else {
        changeColor("yellow", "purple");
		user = player1;
    }
	nextPlayer = user;
    return nextPlayer;
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



// to check for win calculate last 2 in computerpositions,
// then 15 - (last 2 in computer) check if this n is in computerpositions
function win(playersPositions, playersWins) {
    var playersPositionsClone = playersPositions.slice(0);
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
		win(player2.positions, player2.wins) ? scores("player2-scores", player2.wins) :
		tie() ? scores("tie-scores", ties) :
		false;
}



//To find free spaces (compare allPositions against occupiedPositions)
Array.prototype.difference = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
        
    });
};