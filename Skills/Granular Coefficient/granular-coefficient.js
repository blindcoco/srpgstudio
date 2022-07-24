
Probability.getInvocationProbabilityFromSkill = function(unit, skill) {
	var value = skill.getInvocationValue();
	if(skill.custom.granularCoefficient == true) {
		value = skill.custom.coefficient;
	}

	return this.getInvocationProbability(unit, skill.getInvocationType(), value);
}

SkillInfoWindow._drawInvocationValue = function(x, y, skill, length, color, font) {

	var text = InvocationRenderer.getInvocationText(skill.getInvocationValue(), skill.getInvocationType());

	if(skill.custom.granularCoefficient == true) {
		text = InvocationRenderer.getInvocationTextGranular(skill.custom.coefficient, skill.getInvocationType());
	}
	
	TextRenderer.drawKeywordText(x, y, StringTable.SkillWord_Invocation, length, ColorValue.KEYWORD, font);
	x += ItemInfoRenderer.getSpaceX();
	
	TextRenderer.drawKeywordText(x, y, text, -1, color, font);
}

InvocationRenderer.getInvocationTextGranular = function(value, type) {
	var text = '';
	if (type === InvocationType.HPDOWN) {
		text = ParamGroup.getParameterName(ParamGroup.getParameterIndexFromType(ParamType.MHP)) + value + StringTable.SkillWord_Less;
	}
	else if (type === InvocationType.ABSOLUTE) {
		text = value + StringTable.SignWord_Percent;
	}
	else {
		if (type === InvocationType.LV) {
			text = StringTable.Status_Level;
		}
		else {
			text = ParamGroup.getParameterName(ParamGroup.getParameterIndexFromType(type));
		}
	
		text = '(' + text;
		text += ' ' + StringTable.SignWord_Multiple + ' ' + value;
		text += ')' + StringTable.SignWord_Percent;
	}
	
	return text;
}
