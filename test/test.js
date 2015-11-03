var iframe = document.getElementById("project");
var doc = iframe.contentWindow.document;


QUnit.test("Title match", function(assert) {
  	assert.equal(doc.title, "TicTacToe", "Title is TicTacToe.");
});

QUnit.test("Are there 9 game buttons on the page", function(assert) {
	var button = doc.getElementsByClassName("game-button");
  	assert.equal(button.length, 9, "There are 9 game buttons.");
});


QUnit.test("clearBoeard function works", function(assert) {
//    var replay = doc.getElementById("replay");
    
    var gameButton;
	function clearBoard() {
    for (var i = 1; i < 10; i++) {
        gameButton = document.getElementById(i).setAttribute("src", "");
    }
    return gameButton;
}
  	assert.equal(gameButton, doc.getElementById(1).getAttribute("src",""), "It works");
});
