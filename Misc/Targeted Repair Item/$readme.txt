Unit Command Placement
By Blindcoco
Version 1.0
August 7th 2021

This plugin enables targeted repair items.

To use plugin, create an item with the Item Type "Repair" and add the following custom parameter

	{
		repairTypes: ["Weapon", "Staff", "Item"],
		weaponTypes : ["Sword", "Axe", "Lance", "Bow", "Magic"]
	}

repairTypes -> Can only be Weapon, Staff or Item (or any combo, just make sure to keep the nomenclature above)
	- If your repairTypes include Weapon, but no weaponTypes are specified, the item can repair any weapon type

weaponTypes -> These have to be the Name (with the proper upper/lower cases) of the weapon type that you specified in the Config tab.
	- This allows for you to make some kind of physical/magical repair items, or potentially a means of simulating the crafting of arrows by only targeting bows

Note: This plugin will clash with other plugins that affect the function Miscellaneous.isDurabilityChangeAllowed
Note 2: There is a hardcoded lock on repairing repair items to prevent infinite repairs
Note 3: Removed the default behavior allowing repairs of undamaged item to limit misclicks
Note 4: Repair Items without custom parameters will not work anymore once plugin is installed. If you want to make a general repair item, use { repairTypes: ["Weapon", "Staff", "Item"] } 

History
1.0 - April 23rd 2022
    - Initial version