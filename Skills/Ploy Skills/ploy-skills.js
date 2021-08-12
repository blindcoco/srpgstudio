/**
 * Script by Blindcoco
 */



var PloySkills = {
    detectStatusPloy: function( pCurrentUnitType ) {
	    var playerList = PlayerList.getSortieList();
	    var enemyList = EnemyList.getAliveList();
	    var allyList = AllyList.getAliveList();


        var unitX = 0;
        var unitY = 0;

        var currentPlayer = null;

        var sourceList = playerList;
        if(pCurrentUnitType == "enemy"){
			sourceList = enemyList;
        } else if(pCurrentUnitType == "ally"){
        	sourceList = allyList;
        }

        // find source of Ploy
	    for (i = 0; i < sourceList.getCount(); i++) {
	        currentPlayer = sourceList.getData(i);

    		var skillArrPloys = SkillControl.getDirectSkillArray(currentPlayer, SkillType.CUSTOM, "ploy-skill");

	        unitX = currentPlayer.getMapX();
	        unitY = currentPlayer.getMapY();

	        var sourcePlayer = currentPlayer;



			var skill = null;

		    for (var k=0; k<skillArrPloys.length; k++) {
		        skill = skillArrPloys[k].skill;

		        if(skill != null){
		            
					if(skill.custom.target.indexOf("enemy") != -1){
					    for (j = 0; j < enemyList.getCount(); j++) {
					        currentPlayer = enemyList.getData(j);

					        // if unit is aligned vertically or horizontally to target
				        	if((currentPlayer.getMapX() >= unitX - skill.custom.widthModifier && currentPlayer.getMapX() <= unitX + skill.custom.widthModifier) || 
				        		(currentPlayer.getMapY() >= unitY - skill.custom.widthModifier && currentPlayer.getMapY() <= unitY + skill.custom.widthModifier)){
								PloySkills.inflictStatusPloy(sourcePlayer, currentPlayer, skill);
				        	}
					    }
					}

					if(skill.custom.target.indexOf("player") != -1){
					    for (j = 0; j < playerList.getCount(); j++) {
					        currentPlayer = playerList.getData(j);

					        // if unit is aligned vertically or horizontally to target
				        	if((currentPlayer.getMapX() >= unitX - skill.custom.widthModifier && currentPlayer.getMapX() <= unitX + skill.custom.widthModifier) || 
				        		(currentPlayer.getMapY() >= unitY - skill.custom.widthModifier && currentPlayer.getMapY() <= unitY + skill.custom.widthModifier)){
								PloySkills.inflictStatusPloy(sourcePlayer, currentPlayer, skill);
				        	}
					    }
					}

					if(skill.custom.target.indexOf("ally") != -1){
					    for (j = 0; j < allyList.getCount(); j++) {
					        currentPlayer = allyList.getData(j);

					        // if unit is aligned vertically or horizontally to target
				        	if((currentPlayer.getMapX() >= unitX - skill.custom.widthModifier && currentPlayer.getMapX() <= unitX + skill.custom.widthModifier) || 
				        		(currentPlayer.getMapY() >= unitY - skill.custom.widthModifier && currentPlayer.getMapY() <= unitY + skill.custom.widthModifier)){
								PloySkills.inflictStatusPloy(sourcePlayer, currentPlayer, skill);
				        	}
					    }
					}




		        }

        	}
	    }


	    
    },

    inflictStatusPloy: function(pSource, pTarget, pSkill) {
		var ployState = root.getBaseData().getStateList().getDataFromId(pSkill.custom.stateId);
		
		var canPloy = false;
		if(pSkill.custom.statCheck != null){
			var sourceValue;
			var targetValue;

			switch(pSkill.custom.statCheck) {
			  case "Res":
			    	sourceValue = RealBonus.getMdf(pSource);
			    	targetValue = RealBonus.getMdf(pTarget);
			    break;
			  case "MaxHP":
			    	sourceValue = RealBonus.getMhp(pSource);
			    	targetValue = RealBonus.getMhp(pTarget);
			    break;
			  case "Str":
			    	sourceValue = RealBonus.getStr(pSource);
			    	targetValue = RealBonus.getStr(pTarget);
			  case "Mag":
			    	sourceValue = RealBonus.getMag(pSource);
			    	targetValue = RealBonus.getMag(pTarget);
			  case "Spd":
			    	sourceValue = RealBonus.getSpd(pSource);
			    	targetValue = RealBonus.getSpd(pTarget);
			  case "Skl":
			    	sourceValue = RealBonus.getSkl(pSource);
			    	targetValue = RealBonus.getSkl(pTarget);
			  case "Luk":
			    	sourceValue = RealBonus.getLuk(pSource);
			    	targetValue = RealBonus.getLuk(pTarget);
			  case "Def":
			    	sourceValue = RealBonus.getDef(pSource);
			    	targetValue = RealBonus.getDef(pTarget);
			    break;
			}


			if(pSkill.custom.isMore == true){
				if(sourceValue >= targetValue){
					canPloy = true;
				}
			}else{
				if(sourceValue <= targetValue){
					canPloy = true;
				}
			}
		} else {
			canPloy = true;
		}

		if(pSource.getId() == pTarget.getId()){

			if(pSkill.custom.excludeUser == true){
				canPloy = false;
			}
		}

		if(canPloy){
	        StateControl.arrangeState(pTarget, ployState, IncreaseType.INCREASE);
		}
    }
}