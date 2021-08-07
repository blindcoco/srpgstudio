/**
 * Script by Blindcoco
 */

UnitCommand.configureCommands = function(groupArray) {
    this._appendTalkEvent(groupArray);
    groupArray.appendObject(UnitCommand.Attack);
    groupArray.appendObject(UnitCommand.PlaceCommand);
    groupArray.appendObject(UnitCommand.Occupation);
    groupArray.appendObject(UnitCommand.Treasure);
    groupArray.appendObject(UnitCommand.Village);
    groupArray.appendObject(UnitCommand.Shop);
    groupArray.appendObject(UnitCommand.Gate);
    // Unit commands used to be here
    groupArray.appendObject(UnitCommand.Quick);
    groupArray.appendObject(UnitCommand.Steal);
    groupArray.appendObject(UnitCommand.Wand);
    groupArray.appendObject(UnitCommand.Information);
    this._appendMetamorphozeCommand(groupArray);
    this._appendFusionCommand(groupArray);
    groupArray.appendObject(UnitCommand.Item);
    this._appendUnitEvent(groupArray); // Unit events are now here
    groupArray.appendObject(UnitCommand.Trade);
    groupArray.appendObject(UnitCommand.Stock);
    groupArray.appendObject(UnitCommand.MetamorphozeCancel);
    groupArray.appendObject(UnitCommand.Wait);
};