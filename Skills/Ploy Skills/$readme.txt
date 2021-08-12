Ploy Skills
By Blindcoco
Version 1.0
August 11th 2021

This plugin enables Ploy skills (like in Fire Emblem Heroes), with some extra options! 

- Note that you will need to make duplicates for enemy/player skills. You'll see why in the How to Use section.


    How to use:
    1. Create a skill with the keyword "ploy-skill"

    2. In custom parameters, add this JSON (including the { and } !). 
       The required parameters are widthModifier, stateId and target. Everything else is optional.:
    
    {
        widthModifier:0,
        stateId: 1,
        target: ['player'],
        statCheck: 'MaxHP',
        isMore: true,
        excludeUser: true
    }

    Here is a breakdown of the parameters and what they can do.
    
    Mandatory fields :
    widthModifier : The amount of columns/rows. 0 makes it a 1 tile cross. 1 makes it a 3 tiles cross (adds 1 tile on either side of the user). etc.
    stateId : The ID of the state that will be applied to the targets. In a more typical FEH fashion, this could be a -5 Res debuff, but this can be anything.
    target: What affiliation will be targetted by the Ploy. The options are player, ally or enemy. 
          - If you want to have multiple groups targetted, you can do so like this : ['player', 'ally']

    Optional fields :
    statCheck : The stat that will be compared from the target & user to determine if the buff/debuff is applied. If you don't add one, it will always be procc'd.
         - The options are Res, MaxHP, Str, Mag, Spd, Skl, Luk, Def
    isMore : Will determine if the state is applied if the USER of the skill's stat is HIGHER (or equal) than the TARGET. 
         - Set it to false if you want the opposite to be the case. (Which could be used for an ally buffing stronger allies)
    excludeUser : If the Ploy can affect units of the same allegiance as the user, this determines if the user can buff himself too. 


    3. In your Map Common Events, create 3 Auto Events that are triggered at the Start of Player/Ally/Enemy phase.
       3.1 Add an Execute Script command in the first Event with and copy paste this in the Code block.
		PloySkills.detectStatusPloy('player');
       3.2 Add a Change Event State that frees the Event (so it can be triggered at the start of future Player Phases too)

	Repeat Steps 3.1 and 3.2 with the other Two Phases and use those lines for step 3.1.
		PloySkills.detectStatusPloy('ally');
		PloySkills.detectStatusPloy('enemy');


    Additional Tips : 
    - The visual that is used to show the ploy's area of effect is the Sortie Panel that can be changed in Resources > Resource Location > UI > Sortie Panel. 
	Green looks visually distinct from Movement & Attack panels.
    - You can remove the visual indicator for the Ploy Area of Effect by adding a $ to in front of the the ploy-skills-panel.js file name ($ploy-skills-panel.js). 


    Known Conflicting Issues :
    - This plugin will have conflicts with any plugins that affect display for staves, for example.


History
1.0 - August 11th 2021
    - Initial version

1.1 - August 12th 2021
    - Fixed typo with stat types in switchcase