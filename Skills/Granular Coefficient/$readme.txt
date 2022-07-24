Granular Skill Coefficient
By BlindCoco
Version 1.0
July 23rd, 2022

What does it do ?

    It allows to use a coefficient that has decimals.
    For instance, you could have a skill that triggers with a (Skl x 0.25)% or (Skl x 1.5)% activation rate. 

How to use it ?

    In your skill's Custom Parameters field, add this following text (including the brackets)
    { 
        granularCoefficient: true,
        coefficient: 0.25
    }
    
    This coefficient will be applied to the appropriate stat you have chosen and the in-engine coefficient will be ignored.