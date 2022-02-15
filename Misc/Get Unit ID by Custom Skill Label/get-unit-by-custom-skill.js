/**
 * Script by Blindcoco
 * Returns the ID of a unit with the skill you asked for. 
 * This is useful if you create a State with a Skill attached to it to attach Events to.
 *
 *
 * To use script, create an Execute Script Event > Execute Code
 * Then copy the following code : UnitSkillFinder.getUnitWithSkill("custom-skill");
 * Replace custom-skill with the custom skill label of your choice
 *
 * Check 'Save return value as Variable' and select your variable
 * You can then use that ID to target the specific unit for events.
 * 
 * If you have multiple units per turn who can be targetted this way,
 * Remove the status/skill from target and refresh the Event. It will trigger until all
 * affected units are processed.
 */


var UnitSkillFinder = {
    getUnitWithSkill: function( pSkillName ) {
	    var playerList = PlayerList.getSortieList();
	    var enemyList = EnemyList.getAliveList();
	    var allyList = AllyList.getAliveList();

        var currentPlayer = null;


	    for (i = 0; i < playerList.getCount(); i++) {
	        currentPlayer = playerList.getData(i);

    		if (SkillControl.getPossessionCustomSkill(currentPlayer, pSkillName) !== null) {
	            return currentPlayer.getId();
        	}
	    }

	    for (i = 0; i < enemyList.getCount(); i++) {
	        currentPlayer = enemyList.getData(i);

    		if (SkillControl.getPossessionCustomSkill(currentPlayer, pSkillName) !== null) {
	            return currentPlayer.getId();
        	}
	    }
	    
	    for (i = 0; i < playerList.getCount(); i++) {
	        allyList = playerList.getData(i);

    		if (SkillControl.getPossessionCustomSkill(currentPlayer, pSkillName) !== null) {
	            return allyList.getId();
        	}
	    }
    }
}
