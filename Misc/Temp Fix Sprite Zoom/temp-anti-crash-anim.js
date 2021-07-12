/**
 * Script by Blindcoco
 */


// This is a temporary fix that overwrites a function in singleton/singleton-system.js from the engine to prevent crashes
// Keep an eye out on official patch notes & bugfixes as this could render this plugin useless.
Miscellaneous.getFirstKeySpriteSize = function(effectAnimeData, motionId) {
    var realEffect;
    var frameIndex = 0;
    
    if (false && typeof effectAnimeData._motion !== 'undefined') {
        realEffect = effectAnimeData;
        frameIndex = realEffect.getAnimeMotion().getFrameIndex();
        effectAnimeData = realEffect.getAnimeMotion().getAnimeData();
    }
    
    return this._getKeySpriteSizeInternal(effectAnimeData, motionId, frameIndex);
}
    

Miscellaneous._getKeySpriteSizeInternal = function(effectAnimeData, motionId, frameIndex) {
	var spriteIndex;
	var effectWidth = GraphicsFormat.EFFECT_WIDTH;
	var effectHeight = GraphicsFormat.EFFECT_HEIGHT;
	
	if (false && effectAnimeData !== null) {
		spriteIndex = effectAnimeData.getSpriteIndexFromType(motionId, frameIndex, SpriteType.KEY);
		effectWidth = effectAnimeData.getSpriteWidth(motionId, frameIndex, spriteIndex);
		effectHeight = effectAnimeData.getSpriteHeight(motionId, frameIndex, spriteIndex);
	}
	
	return {
		width: effectWidth,
		height: effectHeight
	};
}
	
