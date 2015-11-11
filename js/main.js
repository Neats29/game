var occupiedPositions = [];
var allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var winningPositions = [[8, 1, 6], [3, 5, 7], [4, 9, 2], [8, 3, 4], [1, 5, 9], [6, 7, 2], [8, 5, 2], [6, 5, 4]];

var ties = [];
var turn = 'PLAYER 1';


var player1 = {
    positions : [],
    icon : "/img/yellow.png",
    wins : [],
    render : function(buttonNumber) {
        var personIcon = changeButtonToIcon(player1.icon, buttonNumber);//set the image to that button
        this.positions.push(buttonNumber);
        occupiedPositions.push(buttonNumber);
        turn = 'PLAYER 2';
        return personIcon;
    },
    goesFirst : true
};


var player2 = {
    positions : [],
    icon : "/img/purple.png",
    wins : [],
    render : function(buttonNumber) {
        var personIcon = changeButtonToIcon(player2.icon, buttonNumber);//set the image to that button
        this.positions.push(buttonNumber);
        occupiedPositions.push(buttonNumber);
        turn = 'PLAYER 1';
        return personIcon;
    },
    goesFirst : false
};



//render image when clicked
function renderPlayerIcon(buttonNumber) {
    if (turn === 'PLAYER 1' && player1.goesFirst) {
        player1.render(buttonNumber);
        console.log("p1 click, p1 goes first ");
    } else if (turn === 'PLAYER 2' && player1.goesFirst) {
        player2.render(buttonNumber);
        console.log("p2 click, p1 goes first ");
    } else if (turn === 'PLAYER 1' && !player1.goesFirst) {
        player2.render(buttonNumber);
        console.log("p1 click, p2 goes first ");
    } else {
        player1.render(buttonNumber);
        console.log("p2 click, p2 goes first ");
    }
    return winTieOrContinue();
}



function playerGoesFirst(p) {
    var change, keep;
    if (p === 2) {
        change = document.getElementById("purple").style.color = "white";
        keep = document.getElementById("yellow").style.color = "black";
        player2.goesFirst = true;
        player1.goesFirst = false;
    } else {
        change = document.getElementById("yellow").style.color = "white";
        keep = document.getElementById("purple").style.color = "black";
        player2.goesFirst = false;
        player1.goesFirst = true;
    }
    return change;
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
	var person1Scores = document.getElementById("player1-scores").innerHTML = player1.wins.length;
	var person2Scores = document.getElementById("player2-scores").innerHTML = player2.wins.length;
	var tieScores     = document.getElementById("tie-scores").innerHTML = ties.length;

	return win(player1.positions, player1.wins) ? person1Scores : 
		win(player2.positions, player2.wins) ? person2Scores :
		tie() ? tieScores :
		false;
}



//To find free spaces (compare allPositions against occupiedPositions)
Array.prototype.difference = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
        
    });
};