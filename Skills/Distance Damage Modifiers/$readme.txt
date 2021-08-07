Distance Damage Modifiers
By Blindcoco
Version 1.0
August 7th 2021

This plugin allows the use of damage modifiers based on the distance between two opponents.


    How to use:
    1. Create a skill with the keyword "distance-modifiers"

    2. In custom parameters, add this JSON (including the { and } !) :

    {
        minRange:1,
        maxRange:1,
        takenMod:-5,
        dealtMod:5
    }

    This will make it so when minRange & maxRange = 1 (so at Melee Range), you will deal 5 more damage and you will take 5 less damage. 

    Extra Tips: 
    - If you wish to have no maximum range, you can put -1 instead of defining a max range.
    - This can be equipped on weapons (making bows that have 2-3 range, but deal less damage at 3 range, for example).
    - You can equip multiple distance-modifiers at once, so it's possible to make a character who takes more damage at melee range, but deals more damage at a distance, for example.
    - You can make a single skill that describes multiple modifiers that are spread in multiple skills, but check the Hide on the Menu box to avoid clutter.


History
1.0 - August 7th 2021
    - Initial version