/**
 * Script by Blindcoco
 */


Miscellaneous.isDurabilityChangeAllowed = function(item, targetItem) {
	var type, itemType;
	
	// Protects script against invalid item/targetItem
	if (item === null || targetItem === null) {
		return true;
	}

	// If targetItem is already at max durability, cannot repair
	if(targetItem.getLimit() == targetItem.getLimitMax() ){
		return false;
	}

	// Overwrites repairTypes or weaponTypes if repairLabel is true
	if( item.custom.repairLabels && item.custom.repairLabels.indexOf(targetItem.custom.repairLabel) != -1 ) {
		return true;
	}

	if (item.custom.excludeLabels && targetItem.custom.repairLabel && item.custom.excludeLabels.indexOf(targetItem.custom.repairLabel == -1)) {
		return false;
	}
	
	// Verifies weapons for repair
	if( targetItem.isWeapon() ) {
		// Repair Item can repair weapons
		if( item.custom.repairTypes && item.custom.repairTypes.indexOf("Weapon") != -1 ) {
			

			if( item.custom.weaponTypes ) {
				// Weapon type is repaired by item
				if( item.custom.weaponTypes && item.custom.weaponTypes.indexOf(targetItem.getWeaponType().getName()) != -1 ) { 
					return true;
				} else {
					// Weapon type is NOT repaired by item
					return false;
				}
			} else {
				// Repair item can repair any weapon
				return true;
			}

		} else {
			return false;
		}
	} else {
		itemType = targetItem.getItemType();

		// Repair item can never repair other repair items
		if ( itemType === ItemType.DURABILITY ) {
			return false;
		}

		// If repair item can repair staves
		if(targetItem.isWand() && item.custom.repairTypes && item.custom.repairTypes.indexOf("Staff") != -1) {
			return true;
		} else if (!targetItem.isWand() && item.custom.repairTypes.indexOf("Item") != -1) {
			return true;
		}

		return false;
	}

	// If targetItem somehow escapes all other conditions, cannot repair 
	return false;
}
