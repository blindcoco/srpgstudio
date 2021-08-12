/**
 * Script made by Blindcoco (using a script by Goinza as a base).
 * 
 * This plugin will clash with other plugins impacting display ranges.
 */

MapLayer.prepareMapLayer = function() {
    this._counter = createObject(UnitCounter);
    this._unitRangePanel = createObject(CustomUnitRangePanel);
    
    this._mapChipLight = createObject(MapChipLight);
    this._mapChipLight.setLightType(MapLightType.NORMAL);
    
    this._markingPanel = createObject(MarkingPanel);
};

var MapLightType = {
	NORMAL: 0,
	MOVE: 1,
	RANGE: 2,
	PLOY: 3
};

MapChipLight.drawLight = function() {
    if (this._type === MapLightType.NORMAL) {
        root.drawFadeLight(this._indexArray, this._getColor(), this._getAlpha());
    }
    else if (this._type === MapLightType.MOVE) {
        root.drawWavePanel(this._indexArray, this._getMoveImage(), this._wavePanel.getScrollCount());
    }
    else if (this._type === MapLightType.RANGE) {
        root.drawWavePanel(this._indexArray, this._getRangeImage(), this._wavePanel.getScrollCount());
    }
    else if (this._type === MapLightType.PLOY) {
        root.drawWavePanel(this._indexArray, this._getPloyImage(), this._wavePanel.getScrollCount());
    }
},

MapChipLight._getPloyImage = function() {
    return root.queryUI('sortie_panel');
}

CustomUnitRangePanel = defineObject(UnitRangePanel, {
    _mapChipLightWand: null,
    _indexWeapon: null,
    _indexPloy: null,

    initialize: function() {
		this._mapChipLight = createObject(MapChipLight);
		this._mapChipLightWeapon = createObject(MapChipLight);
		this._mapChipLightPloy = createObject(MapChipLight);
		
		this._simulator = root.getCurrentSession().createMapSimulator();
		// Ignore "Passable Terrains" at the panel display on the map.
		this._simulator.disableRestrictedPass();
    },
    
    moveRangePanel: function() {
		if (this._unit === null) {
			return MoveResult.CONTINUE;
		}
		
		this._mapChipLight.moveLight();
		this._mapChipLightWeapon.moveLight();
		this._mapChipLightPloy.moveLight();
		
		return MoveResult.CONTINUE;
    },
    
    drawRangePanel: function() {
		if (this._unit === null) {
			return;
		}
		
		if (PosChecker.getUnitFromPos(this._x, this._y) !== this._unit) {
			return;
		}
		
		if (this._unit.isWait()) {
			return;
		}
		
		this._mapChipLight.drawLight();
		this._mapChipLightWeapon.drawLight();
		this._mapChipLightPloy.drawLight();
    },
    
    getUnitAttackRange: function(unit) {
		var i, item, count, rangeMetrics;
		var startRange = 99;
		var endRange = 0;
		var obj = {};
		count = UnitItemControl.getPossessionItemCount(unit);
		for (i = 0; i < count; i++) {
			item = UnitItemControl.getItem(unit, i);
			rangeMetrics = this._getRangeMetricsFromItem(unit, item);
			if (rangeMetrics !== null && item.isWeapon()) {
				if (rangeMetrics.startRange < startRange) {
					startRange = rangeMetrics.startRange;
				}
				if (rangeMetrics.endRange > endRange) {
					endRange = rangeMetrics.endRange;
				}
			}
		}
		
		obj.startRange = startRange;
		obj.endRange = endRange;
		obj.mov = this._getRangeMov(unit);
		
		return obj;
    },
    
    _getUnitPloyRange: function(unit) {
		var i, item, count, rangeMetrics;
		var startRange = 99;
		var endRange = 0;
		var obj = {};	
			
		count = UnitItemControl.getPossessionItemCount(unit);
		for (i = 0; i < count; i++) {
			item = UnitItemControl.getItem(unit, i);
			rangeMetrics = this._getRangeMetricsFromItem(unit, item);
			if (rangeMetrics !== null && item.isWand()) {
				if (rangeMetrics.startRange < startRange) {
					startRange = rangeMetrics.startRange;
				}
				if (rangeMetrics.endRange > endRange) {
					endRange = rangeMetrics.endRange;
				}
			}
		}
		
		obj.startRange = startRange;
		obj.endRange = endRange;
		obj.mov = this._getRangeMov(unit);
		
		return obj;
    },
    
    _setRangeData: function() {
		var attackRange = this.getUnitAttackRange(this._unit);
		var isWeapon = attackRange.endRange !== 0;
		this._indexPloy = null;
		if (isWeapon) {
			this._simulator.startSimulationWeapon(this._unit, attackRange.mov, attackRange.startRange, attackRange.endRange);
			this._indexWeapon = this._simulator.getSimulationWeaponIndexArray();
		}
		else {
			this._simulator.startSimulation(this._unit, attackRange.mov);
		}
		
		this._setLight(isWeapon);
		
		var skillArrPloys = SkillControl.getDirectSkillArray(this._unit, SkillType.CUSTOM, "ploy-skill");
		this._setLightPloy(skillArrPloys);
    },
    
    _setLight: function(isWeapon) {
		this._mapChipLight.setLightType(MapLightType.MOVE);
		this._mapChipLight.setIndexArray(this._simulator.getSimulationIndexArray());

		if (isWeapon) {
			this._mapChipLightWeapon.setLightType(MapLightType.RANGE);
			this._mapChipLightWeapon.setIndexArray(this._indexWeapon);
		}
		else{
			this._mapChipLightWeapon.endLight();
		}
	},

	_setLightPloy: function(pSkillArrPloys) {

		this._indexPloy = null;
		if (pSkillArrPloys.length > 0) {

			var biggestPloyMod = 0;

			for (var k=0; k<pSkillArrPloys.length; k++) {
		        skill = pSkillArrPloys[k].skill;

		        biggestPloyMod = Math.max(skill.custom.widthModifier, biggestPloyMod);
		    }

			this._mapChipLightPloy.setLightType(MapLightType.PLOY);

			var unitX = this._unit.getMapX();
			var unitY = this._unit.getMapY();


			var mapInfo = root.getCurrentSession().getCurrentMapInfo();
	
			var mapWidth = mapInfo.getMapWidth();
			var mapHeight = mapInfo.getMapHeight();


			this._indexPloy = [unitX];

			for(var i=0; i < mapHeight; i++){

				if(biggestPloyMod > 0){
					for(var j = -biggestPloyMod; j <= biggestPloyMod; j++){
						if(this._indexPloy.indexOf(unitX+(mapWidth * i ) + j) == -1) {
							this._indexPloy.push(unitX+(mapWidth * i ) + j);
						}
					}

				}

				if(this._indexPloy.indexOf(unitX+(mapWidth * i )) == -1) {
					this._indexPloy.push(unitX+(mapWidth * i ));
				}
			}



			for(var i=0; i < mapWidth; i++){

				if(biggestPloyMod > 0){
					for(var j = -biggestPloyMod; j <= biggestPloyMod; j++){
						if(this._indexPloy.indexOf((unitY * mapWidth) + i + (j * mapWidth)) == -1) {
							this._indexPloy.push((unitY * mapWidth) + i + (j * mapWidth));
						}
					}

				}


				if(this._indexPloy.indexOf((unitY * mapWidth) + i) == -1) {
					this._indexPloy.push((unitY * mapWidth) + i);
				}


			}

			this._mapChipLightPloy.setIndexArray(this._indexPloy);
		}
		else{

			this._indexPloy = null;
			this._mapChipLightPloy.setIndexArray(this._indexPloy);
			this._mapChipLightPloy.endLight();			
		}
	}
});