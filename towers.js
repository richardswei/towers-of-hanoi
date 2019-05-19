function solveTowersOfHanoi(numberDiscs) { // takes a number that expresses the first pegs number of discs
	var smallDiscDirection = numberDiscs%2 ? 'left' : 'right';
	var towerConfig = [Array.from(Array(numberDiscs), (e,i)=>i+1),[],[]];
	doNextMove(towerConfig, 0, smallDiscDirection);
} 

function doNextMove(towerPegs, moveNumber, smallDiscDirection) {
	if (towerPegs[0].length==0 && towerPegs[1].length==0) return moveNumber;
	var firstPegTopDisc = towerPegs[0][0];
	var secondPegTopDisc = towerPegs[1][0];
	var thirdPegTopDisc = towerPegs[2][0];
	var topDiscs = [towerPegs[0][0],towerPegs[1][0],towerPegs[2][0]];
	if (moveNumber%2===0) { // moving smallest disc
		moveNumber+=1;
		var locationFrom = topDiscs.indexOf(1);	
		var locationTo;
		switch (1) {
			case firstPegTopDisc:
				locationTo=smallDiscDirection=='left' ? 2 : 1;
				break;
			case secondPegTopDisc:
				locationTo=smallDiscDirection=='left' ? 0 : 2;
				break;
			case thirdPegTopDisc:
				locationTo=smallDiscDirection=='left' ? 1 : 0;
				break;
			default: locationTo=0;
		}
		printToLog(towerPegs,moveNumber,locationFrom,locationTo);
		towerPegs[locationTo].unshift(towerPegs[locationFrom].shift());
	} else { // moving any non small disc
		moveNumber+=1;
		// find the next eligible non small disc to be moved
		var visibleNonSmallDiscs = topDiscs.filter( // filters out empty pegs and smallest disc
			function(discSize) {return discSize>1;}
		);
		var secondSmallestVisible = Math.min.apply(Math, visibleNonSmallDiscs);
		var secondSmallestVisibleIsLargest = visibleNonSmallDiscs.length===1;
		var locationFrom = topDiscs.indexOf(secondSmallestVisible);
		var locationTo = secondSmallestVisibleIsLargest? 
			topDiscs.indexOf(undefined) : topDiscs.indexOf(Math.max.apply(Math, visibleNonSmallDiscs));
		printToLog(towerPegs,moveNumber,locationFrom,locationTo);
		towerPegs[locationTo].unshift(towerPegs[locationFrom].shift());
	}
	doNextMove([towerPegs[0],towerPegs[1],towerPegs[2]],moveNumber,smallDiscDirection);
}

function submitDiscsEntry(){
	var numberDiscs = parseFloat(document.getElementById('discsEntry').value);
	solveTowersOfHanoi(numberDiscs);
}

function printToLog(towerPegs,moveNumber,src,dst) {
	var theLog = document.getElementById('log');
	var movementText = document.createElement('div');
	movementText.style.clear = 'left';
	var movementTextNode = document.createTextNode(moveNumber+": Move disc of size"+
		towerPegs[src][0]+" from peg "+(src+1)+" to peg "+(dst+1));
		movementText.style.clear = "both";
	movementText.appendChild(movementTextNode);
	theLog.insertBefore(movementText, theLog.childNodes[0]);
}