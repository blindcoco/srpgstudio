/**
 * Script by Blindcoco

    This is a quick fix to Goinza's Combat Art Plugin for a rare edge case. 
    If a chapter ends with the defeat of a target while using a combat art, the session vars aren't properly cleared and 
    the player is unable to perform followup attacks until another combat art is used during the following chapter.

    HOW TO APPLY THE FIX: 
    In a Map Common Event (Opening), make an event that Executes Script > Execute Code with the following code:
    CombatArtReset.resetSessionVariables();
 */



var CombatArtReset = {
    resetSessionVariables: function() {
        root.getMetaSession().global.combatArt = null;
    }
}