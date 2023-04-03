/**
 * Script by Blindcoco
 */

(function() {

var alias0 = DamageCalculator.calculateAttackPower;
DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
    var power = alias0.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);

    var dx = Math.abs(active.getMapX() - passive.getMapX());
    var dy = Math.abs(active.getMapY() - passive.getMapY());
    var distance = dx + dy;
    
    var skillArrActive = SkillControl.getDirectSkillArray(active, SkillType.CUSTOM, "distance-modifiers");
    var skill = null;

    for (var i=0; i<skillArrActive.length; i++) {
        skill = skillArrActive[i].skill;

        if(skill != null) {
            if(!skill.custom.requiresSkill || SkillControl.getPossessionCustomSkill(active, skill.custom.requiresSkill)) {
                if(distance >= skill.custom.minRange && (distance <= skill.custom.maxRange || skill.custom.maxRange == -1)){
                    power += skill.custom.dealtMod;
                }
            }
        }
    }


    var skillArrPassive = SkillControl.getDirectSkillArray(passive, SkillType.CUSTOM, "distance-modifiers");
    var skill = null;

    for (var i=0; i<skillArrPassive.length; i++) {
        skill = skillArrPassive[i].skill;

        if(skill != null){
            if(!skill.custom.requiresSkill |! SkillControl.getPossessionCustomSkill(passive, skill.custom.requiresSkill)) {
                if(distance >= skill.custom.minRange && (distance <= skill.custom.maxRange || skill.custom.maxRange == -1)){
                    power += skill.custom.takenMod;
                }
            }
        }
    }

    // Protects the game against crashes if power < 0
    if (power < 0) {
      power = 0;
    }
    
    return power;
};

})();
