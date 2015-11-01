var iframe = document.getElementById("project");
var doc = iframe.contentWindow.document;


QUnit.test("Title match", function(assert) {
  	assert.equal(doc.title, "TicTacToe", "Title is TicTacToe.");
});

QUnit.test("Are there 9 game buttons on the page", function(assert) {
	var button = doc.getElementsByClassName("game-button");
  	assert.equal(button.length, 9, "There are 9 game buttons.");
});

QUnit.test("function returns the 3rd number when person is in 2 positions of 3 winning row", function(assert) {
	var winningRows = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
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
	} return loop(); }

  	assert.equal(loopThroughWinningRows([5,4]), 6, "We get the correct number back");
});
