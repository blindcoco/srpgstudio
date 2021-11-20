/*

Script by Blindcoco

Statuses will now decrease their timer on unit's turn instead of always on Player Phase Start.
*/


StateTurnFlowEntry._checkStateTurn = function() {
	var turnType = root.getCurrentSession().getTurnType();
	
	if (turnType === TurnType.PLAYER) {
		StateControl.decreaseTurn(this._getPlayerList());
	}

	if (turnType === TurnType.ALLY) {
		StateControl.decreaseTurn(AllyList.getAliveList());
	}

	if (turnType === TurnType.ENEMY) {
		StateControl.decreaseTurn(EnemyList.getAliveList());
	}
}