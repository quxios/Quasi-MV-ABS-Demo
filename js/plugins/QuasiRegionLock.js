//============================================================================
// Quasi Region Lock
// Version: 1.04
// Last Update: February 8, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiRegionLock.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiMovement
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/quasi-region-lock/
//  - - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
//============================================================================

var Imported = Imported || {};
Imported.Quasi_RegionLock = 1.04;

//=============================================================================
 /*:
 * @plugindesc Quasi Movement Addon: Allows you to let Characters only move on certain Regions.
 * Version 1.04
 * @author Quasi      Site: http://quasixi.com
 *
 * @help
 * ============================================================================
 * ** Links
 * ============================================================================
 * For a guide on how to use this plugin go to:
 *
 *    http://quasixi.com/quasi-region-lock/
 *
 * Other Links
 *  - https://github.com/quasixi/Quasi-MV-Master-Demo
 *  - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
 * ============================================================================
 */
//=============================================================================

if (!Imported.Quasi_Movement) {
  alert("Error: Quasi Region Lock requires Quasi Movement to work.");
  throw new Error("Error: Quasi Region Lock requires Quasi Movement to work.")
}
(function() {
  var Alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command.toLowerCase() === "quasi") {
      if (args[0].toLowerCase() === "regionlock") {
        var charaId = Number(args[1]);
        var chara = charaId === 0 ? $gamePlayer : $gameMap.event(charaId);
        var regions = [];
        for (var i = 2; i < args.length; i++) {
          var id = args[i];
          if (id[0] !== "#") {
            id = Number(id);
          }
          regions.push(id);
        }
        chara.setRegionLock(regions);
      }
    }
    Alias_Game_Interpreter_pluginCommand.call(this, command, args);
  };

  var Alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    Alias_Game_CharacterBase_initMembers.call(this);
    this.clearRegionLock();
  };

  Game_CharacterBase.prototype.regionLock = function() {
    return this._regionLock;
  };

  var Alias_Game_CharacterBase_collisionCheck = Game_CharacterBase.prototype.collisionCheck;
  Game_CharacterBase.prototype.collisionCheck = function(x, y, dir, dist) {
    this.collider(dir).moveto(x, y);
    if (!this.isDebugThrough() && this.movedOffRegion(dir)) {
      return false;
    }
    return Alias_Game_CharacterBase_collisionCheck.call(this, x, y, dir, dist);
  };

  Game_CharacterBase.prototype.movedOffRegion = function(d) {
    if (this.regionLock().length > 0) {
      var collider = this.collider(d);
      var pass = 0;
      var x1 = Math.floor(collider.edges["top"][0].x);
      var x2 = Math.floor(collider.edges["top"][1].x);
      var y1 = Math.floor(collider.edges["top"][0].y);
      var y2 = Math.floor(collider.edges["bottom"][0].y);
      var p = [[x1, y1], [x2, y1], [x1, y2], [x2, y2]];
      var r1, r2;
      for (var i = 0; i < 8; i++) {
        if (i < 4) {
          r1 = $gameMap.regionId(Math.floor(p[i][0] / QuasiMovement.tileSize), Math.floor(p[i][1] / QuasiMovement.tileSize));
          r2 = $gameMap.getPixelRegion(p[i][0], p[i][1]);
          if (!this.regionLock().contains(r1) && !this.regionLock().contains(r2)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  Game_CharacterBase.prototype.setRegionLock = function(newArray) {
    this._regionLock = newArray;
  };

  Game_CharacterBase.prototype.clearRegionLock = function() {
    this._regionLock = [];
  };

  var Alias_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    Alias_Game_Event_setupPageSettings.call(this);
    var regions = /<region[=|:]([0-9a-zA-Z,#\s]*)>/.exec(this.comments());
    if (regions) {
      regions = QuasiMovement.stringToAry(regions[1]);
      if (typeof regions !== "object") {
        regions = [regions];
      }
      this.setRegionLock(regions);
    }
  };
})();
