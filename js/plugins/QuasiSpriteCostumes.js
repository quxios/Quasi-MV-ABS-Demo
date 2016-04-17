//=============================================================================
// Quasi Sprite Costumes
// Version: 1.00
// Last Update: March 18, 2016
//=============================================================================
// ** Terms of Use
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//=============================================================================
// Downloading from Github
//  - Click on Raw next to Blame and History
//  - Once new page loads, right click and save as
//=============================================================================
// How to install:
//  - Save this file as "QuasiSpriteCostumes.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiSprite
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/quasi-sprite-costume/
//=============================================================================

var Imported = Imported || {};
Imported.QuasiSpriteCostumes = 1.00;

//=============================================================================
 /*:
 * @plugindesc Quasi Sprite Addon: Adds a costumes feature
 * Version 1.00
 * <QuasiSpriteCostumes>
 * @author Quasi       Site: http://quasixi.com
 *
 * @help
 * ============================================================================
 * ** Quasi Sprite Costumes v1.00
 * ============================================================================
 * ** Links
 * ============================================================================
 * For a guide on how to use this plugin go to:
 *
 *   http://quasixi.com/quasi-sprite-costume/
 *
 * Other Links
 *  - https://github.com/quasixi/Quasi-MV-Master-Demo
 * ============================================================================
 */
//=============================================================================

//-----------------------------------------------------------------------------
// Dependencies

if (!Imported.Quasi_Sprite) {
  alert("Error: Quasi Sprite Costumes requires Quasi Sprite to work.");
  throw new Error("Error: Quasi Sprite Costumes requires Quasi Sprite to work.")
}

//-----------------------------------------------------------------------------
// New Classes

function Sprite_CharacterCostume() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi Sprite Costumes

var QuasiSpriteCostumes = {};
(function(QuasiSpriteCostumes) {
  QuasiSpriteCostumes._costumes = [];
  QuasiSpriteCostumes._costumes[0] = {}; // weapons
  QuasiSpriteCostumes._costumes[1] = {}; // armors
  QuasiSpriteCostumes.equipCostume = function(equip) {
    var data = !equip.atypeId ? this._costumes[0] : this._costumes[1];
    var id   = equip.baseItemId || equip.id;
    if (!data[id]) {
      var dataBase = !equip.atypeId ? $dataWeapons : $dataArmors;
      var note     = equip.note || dataBase[id].note;
      var costume  = /<costume>([\s\S]*)<\/costume>/i.exec(note);
      data[id] = {};
      if (!costume) {
        costume = /<costume:(.*?)>/i.exec(note);
        if (costume) {
          data[id] = {"default": costume[1]};
        }
      } else {
        data[id] = this.stringToObj(costume[1]);
      }
    }
    return data[id];
  };

  QuasiSpriteCostumes.stringToObj = function(string) {
    var ary = string.split('\n');
    var obj = {};
    ary = ary.filter(function(i) { return i != ""; });
    ary.forEach(function(e) {
      var s = /^(.*):(.*)/.exec(e);
      if (s) obj[s[1]] = s[2].trim();
    });
    return obj;
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  // The superclass of Game_Character. It handles basic information, such as
  // coordinates and images, shared by all characters.

  Game_CharacterBase.prototype.requestCostumeChange = function() {
    if (this.constructor === Game_Player || this.constructor === Game_Follower) {
      if (!this.actor()) return false;
      return this.actor()._requestCostumeChange;
    }
    return false;
  };

  Game_CharacterBase.prototype.finishCostumeChange = function() {
    if (this.constructor === Game_Player || this.constructor === Game_Follower) {
      this.actor()._requestCostumeChange = false;
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //
  // The game object class for an actor.

  var Alias_Game_Actor_initEquips = Game_Actor.prototype.initEquips;
  Game_Actor.prototype.initEquips = function(equips) {
    Alias_Game_Actor_initEquips.call(this, equips);
    this._requestCostumeChange = true;
  };

  var Alias_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function(slotId, item) {
    Alias_Game_Actor_changeEquip.call(this, slotId, item);
    this._requestCostumeChange = true;
  };

  var Alias_Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
  Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    Alias_Game_Actor_forceChangeEquip.call(this, slotId, item);
    this._requestCostumeChange = true;
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //
  // The sprite for displaying a character.

  var Alias_Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    Alias_Sprite_Character_initMembers.call(this);
    this._costumes = null;
  };

  var Alias_Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    Alias_Sprite_Character_update.call(this);
    this.updateCostume();
  };

  Sprite_Character.prototype.updateCostume = function() {
    if (typeof(this._character.actor) !== "function") {
      return;
    }
    if (this.isCostumeChanged()) this.setCostume();
  };

  Sprite_Character.prototype.isCostumeChanged = function() {
    return !this._costumes || this._character.requestCostumeChange();
  };

  Sprite_Character.prototype.setCostume = function() {
    this._costumes = {};
    var actor  = this._character.actor();
    if (!actor) return;
    var equips = actor.equips();
    for (var i = 0; i < equips.length; i++) {
      if (!equips[i]) continue;
      var id      = equips[i].baseItemId || equips[i].id;
      var costume = QuasiSpriteCostumes.equipCostume(equips[i]);
      var hasCostume = costume[actor.actorId()] || costume["default"];
      if (!hasCostume) continue;
      if (!this._costumes[i]) {
        this._costumes[i] = new Sprite_CharacterCostume(this._character);
        this.addChild(this._costumes[i]);
      }
      this._costumes[i].setCharacterBitmap(hasCostume);
    }
    this._character.finishCostumeChange();
  };

  //-----------------------------------------------------------------------------
  // Sprite_CharacterCostume
  //
  // The sprite for displaying a characters costume

  Sprite_CharacterCostume.prototype = Object.create(Sprite_Character.prototype);
  Sprite_CharacterCostume.prototype.constructor = Sprite_CharacterCostume;

  Sprite_CharacterCostume.prototype.isQCharacter = function() {
    if (this._isQChara === undefined) {
      this._isQChara = this._costumeName.match(/^#(.+?)-/);
    }
    return this._isQChara ? this._isQChara[1] : false;
  };

  Sprite_CharacterCostume.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateFrame();
    this.updateOther();
  };

  Sprite_CharacterCostume.prototype.isTile = function() {
    return false;
  };

  Sprite_CharacterCostume.prototype.setCharacterBitmap = function(name) {
    this._isQChara = undefined;
    this._costumeName = name;
    this.bitmap = ImageManager.loadCharacter(name);
    this._isBigCharacter = ImageManager.isBigCharacter(name);
  };

  Sprite_CharacterCostume.prototype.hasPose = function(pose) {
    if (this.isQCharacter()) {
      return QuasiSpriteCostumes.json[this.isQCharacter()].poses.hasOwnProperty(pose);
    }
    return false;
  };

  //-----------------------------------------------------------------------------
  // Window_Base
  //
  // The superclass of all windows within the game.

  var Alias_Window_Base_drawActorCharacter = Window_Base.prototype.drawActorCharacter;
  Window_Base.prototype.drawActorCharacter = function(actor, x, y) {
    Alias_Window_Base_drawActorCharacter.call(this, actor, x, y);
    var equips = actor.equips();
    for (var i = 0; i < equips.length; i++) {
      if (!equips[i]) continue;
      var id      = equips[i].baseItemId || equips[i].id;
      var costume = QuasiSpriteCostumes.equipCostume(equips[i]);
      var costumeName = costume[actor.actorId()] || costume["default"];
      if (!costumeName) continue;
      this.drawCharacter(costumeName, actor.characterIndex(), x, y);
    }
  };

  var Alias_Window_SavefileList_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters;
  Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
    Alias_Window_SavefileList_drawPartyCharacters.call(this, info, x, y);
    if (info.costumes) {
      for (var i = 0; i < info.costumes.length; i++) {
        for (var j = 0; j < info.costumes[i].length; j++) {
          var data = info.costumes[i][j];
          if (!data) continue;
          this.drawCharacter(data, 0, x + i * 48, y);
        }
      }
    }
  };

  var Alias_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function() {
    var info = Alias_DataManager_makeSavefileInfo.call(this);
    info.costumes = $gameParty.costumesForSavefile();
    return info;
  };

  Game_Party.prototype.costumesForSavefile = function() {
    return this.battleMembers().map(function(actor) {
      var costumes = [];
      var equips = actor.equips();
      for (var i = 0; i < equips.length; i++) {
        if (!equips[i]) continue;
        var id      = equips[i].baseItemId || equips[i].id;
        var costume = QuasiSpriteCostumes.equipCostume(equips[i]);
        var costumeName = costume[actor.actorId()] || costume["default"];
        costumes.push(costumeName);
      }
      return costumes;
    });
  };
}(QuasiSpriteCostumes));
