//============================================================================
// Quasi ABS Hud A
// Version: 1.03
// Last Update: August 10, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiABSHudA.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiABS
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/mv/abs/
//  - - http://forums.rpgmakerweb.com/ -- abs link
//============================================================================

var Imported = Imported || {};
Imported.Quasi_ABSHudA = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 Adds a hud for Quasi ABS ( Version A )
 * <QuasiABSHudA>
 * @author Quasi      Site: http://quasixi.com
 *
 * @param Show Unassigned Keys
 * @desc Shows Keys even if they have nothing assigned to them
 * Default: false   Set to true or false
 * @default false
 *
 * @help
 * =============================================================================
 * ** About
 * =============================================================================
 *   This version A of a skill toolbar hud. This version is designed to give
 * a mmo rpg feel. Version A is targeted for desktop use. Version B is targeted
 * for touch input.
 * =============================================================================
 * * Toggling hud
 * =============================================================================
 * Script Call:
 *     QuasiABSHudA.show(bool)
 *   Set bool to true or false
 *
 * Plugin Command:
 *     qABS showHud bool
 *   Set bool to true or false
 *
 * =============================================================================
 * Links
 *  - http://quasixi.com/mv/abs/
 *  - https://github.com/quasixi/RPG-Maker-MV
 *  - http://forums.rpgmakerweb.com/ -- abs link
 */
//=============================================================================

//-----------------------------------------------------------------------------
// Dependencies

if (!Imported.Quasi_ABS) {
  alert("Error: Quasi ABS Hud A requires Quasi ABS to work.");
  throw new Error("Error: Quasi ABS Hud A requires Quasi ABS to work.")
}

//-----------------------------------------------------------------------------
// New Classes

function Sprite_ABSKeys() {
  this.initialize.apply(this, arguments);
}

function Sprite_ABSSkill() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi ABS Hud A

var QuasiABSHudA = (function() {
  var QuasiABSHudA = {};
  QuasiABSHudA.params = $plugins.filter(function(p) { return p.description.contains('<QuasiABSHudA>'); })[0].parameters;
  QuasiABSHudA.showUnassigned = QuasiABSHudA.params["Show Unassigned Keys"] === "true";
  QuasiABSHudA.requestRefresh = true;

  QuasiABSHudA.show = function(bool) {
    $gameSystem._showABSHud = bool;
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //
  // The game object class for the system data.

  var Alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    Alias_Game_System_initialize.call(this);
    this._showABSHud = true;
  };

  var Alias_Game_System_loadClassABSKeys = Game_System.prototype.loadClassABSKeys;
  Game_System.prototype.loadClassABSKeys = function() {
    Alias_Game_System_loadClassABSKeys.call(this);
    QuasiABSHudA.requestRefresh = true;
  };

  var Alias_Game_System_changeABSSkill = Game_System.prototype.changeABSSkill;
  Game_System.prototype.changeABSSkill = function(skillNumber, skillId, forced) {
    Alias_Game_System_changeABSSkill.call(this, skillNumber, skillId, forced);
    QuasiABSHudA.requestRefresh = true;
  };

  var Alias_Game_System_changeABSWeaponSkills = Game_System.prototype.changeABSWeaponSkills;
  Game_System.prototype.changeABSWeaponSkills = function(skillNumber, skillId, forced) {
    Alias_Game_System_changeABSWeaponSkills.call(this, skillNumber, skillId, forced);
    QuasiABSHudA.requestRefresh = true;
  };

  var Alias_Game_System_changeABSSkillInput = Game_System.prototype.changeABSSkillInput;
  Game_System.prototype.changeABSSkillInput = function(skillNumber, input) {
    Alias_Game_System_changeABSSkillInput.call(this, skillNumber, input);
    QuasiABSHudA.requestRefresh = true;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //
  // The interpreter for running event commands.

  var Alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command.toLowerCase() === "qabs") {
      if (args[0].toLowerCase() === "showhud") {
        QuasiABSHudA.show(args[1] === "true");
        return;
      }
    }
    Alias_Game_Interpreter_pluginCommand.call(this, command, args);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  // The game object class for the player. It contains event starting
  // determinants and map scrolling functions.

  var Alias_Game_Player_canClick = Game_Player.prototype.canClick;
  Game_Player.prototype.canClick = function() {
    return Alias_Game_Player_canClick.call(this) && !this._overABSKeys;
  };

  var Alias_Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
  Game_Actor.prototype.learnSkill = function(skillId) {
    Alias_Game_Actor_learnSkill.call(this, skillId);
    QuasiABSHudA.requestRefresh = true;
  };

  var Alias_Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
  Game_Actor.prototype.forgetSkill = function(skillId) {
    Alias_Game_Actor_forgetSkill.call(this, skillId);
    QuasiABSHudA.requestRefresh = true;
  };

  var Alias_Game_Actor_changeClass = Game_Actor.prototype.changeClass;
  Game_Actor.prototype.changeClass = function(classId, keepExp) {
    Alias_Game_Actor_changeClass.call(this, classId, keepExp);
    QuasiABSHudA.requestRefresh = true;
  };

  //-----------------------------------------------------------------------------
  // Sprite_ABSKeys
  //
  // A Sprite container for displaying skill keys

  Sprite_ABSKeys.prototype = Object.create(Sprite_Base.prototype);
  Sprite_ABSKeys.prototype.constructor = Sprite_ABSKeys;

  Sprite_ABSKeys.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.y = Graphics.height - 36;
    this._buttons = [];
    this._over = 0;
    this._absKeys = $gameSystem.absKeys();
    this._actorId = $gameParty.leader()._actorId;
    this.createKeys();
  };

  Sprite_ABSKeys.prototype.createKeys = function() {
    if (this._buttons.length > 0) this.removeKeys();
    for (var key in this._absKeys) {
      if (!this._absKeys.hasOwnProperty(key)) continue;
      if (!this._absKeys[key] && !QuasiABSHudA.showUnassigned) continue;
      var skillId = this._absKeys[key] ? this._absKeys[key].skillId : null;
      var input = this._absKeys[key] ? this._absKeys[key].input : null;
      this.createSkill(skillId, input);
    }
    var w1 = Graphics.width / 2;
    var w2 = (this._buttons.length * 36) / 2;
    this.x = w1 - w2;
  };

  Sprite_ABSKeys.prototype.removeKeys = function() {
    this._buttons.forEach(function(button) {
      this.removeChild(button);
    }, this);
    this._buttons = [];
  };

  Sprite_ABSKeys.prototype.createSkill = function(skillId, input) {
    var button = new Sprite_Button();
    // Black box under icon
    button._frame = this.createButtonFrame();
    button.addChild(button._frame);
    // Skill Icon
    button._icon = this.createButtonIcon(skillId);
    button.addChild(button._icon);
    // Black box over icon, size changes based off cooldown
    button._cooldown = this.createButtonFrame();
    button._cooldown.alpha = 0.5;
    button._cooldown.height = 0;
    button.addChild(button._cooldown);
    // Hover frame
    button._hover = this.createButtonHover();
    button._hover.alpha = 0;
    button.addChild(button._hover);
    // Skill Key text
    button._input = this.createButtonInput(input);
    button.addChild(button._input);
    // Skill info
    if (skillId) {
      button._info = new Sprite_ABSSkill(skillId);
      button.addChild(button._info);
    }
    var x = 36 * this._buttons.length;
    button.x = x;
    button._skillId = skillId;
    button.setClickHandler(this.onButtonDown.bind(this, skillId));
    this._buttons.push(button);
    this.addChild(button);
  };

  Sprite_ABSKeys.prototype.createButtonFrame = function() {
    var frame = new Sprite();
    frame.bitmap = new Bitmap(34, 34);
    frame.bitmap.fillAll("#000000");
    frame.alpha = 0.3;
    return frame;
  };

  Sprite_ABSKeys.prototype.createButtonIcon = function(skillId) {
    var icon = new Sprite();
    if (!skillId) return icon;
    icon.bitmap = ImageManager.loadSystem("IconSet");
    var skill = $dataSkills[skillId];
    var iconIndex = skill ? skill.iconIndex : 0;
    var pw = 32;
    var ph = 32;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    icon.setFrame(sx, sy, pw, ph);
    icon.x = 1;
    icon.y = 1;
    if (!$gameParty.leader().isLearnedSkill(skillId) &&
        !$gameParty.leader().addedSkills().contains(skillId)) {
      icon.alpha = 0.5;
    }
    return icon;
  };

  Sprite_ABSKeys.prototype.createButtonHover = function() {
    var frame = new Sprite();
    frame.bitmap = new Bitmap(34, 34);
    var color1 = "rgba(255, 255, 255, 0.9)";
    var color2 = "rgba(255, 255, 255, 0)";
    frame.bitmap.gradientFillRect(0, 0, 8, 34, color1, color2);
    frame.bitmap.gradientFillRect(26, 0, 8, 34, color2, color1);
    frame.bitmap.gradientFillRect(0, 0, 34, 8, color1, color2, true);
    frame.bitmap.gradientFillRect(0, 26, 34, 8, color2, color1, true);
    return frame;
  };

  Sprite_ABSKeys.prototype.createButtonInput = function(input) {
    var sprite = new Sprite();
    if (!input) return sprite;
    sprite.bitmap = new Bitmap(34, 34);
    input = input.replace("#", "");
    input = input.replace("mouse", "M");
    sprite.bitmap.fontSize = 14;
    sprite.bitmap.drawText(input, 0, 8, 34, 34, "center");
    return sprite;
  };

  Sprite_ABSKeys.prototype.onButtonDown = function(skillId) {
    if (!skillId) return;
    $gamePlayer.useSkill(skillId);
  };

  Sprite_ABSKeys.prototype.onButtonHover = function(button) {
    // Absolute value function so alpha goes from 0.4 to 0.9 to 0.4 repeat
    // no need for switches
    var twoAmp = 1; // amp is 0.5, so 2 amp is 1
    var count = button._count * 0.02; // speed modifier
    var newAlpha = 0.9 - Math.abs(count % twoAmp - (twoAmp / 2));
    button._hover.alpha = newAlpha;
    if (button._info) button._info.alpha = 1;
  };

  Sprite_ABSKeys.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (!$gameSystem._showABSHud) {
      this.visible = false;
      return;
    }
    this.needsRefresh();
    this._over = 0;
    for (var i = 0; i < this._buttons.length; i++) {
      this.updateButton(this._buttons[i]);
    }
    $gamePlayer._overABSKeys = this._over > 0;
  };

  Sprite_ABSKeys.prototype.updateButton = function(button) {
    if (button.isButtonTouched()) {
      this.onButtonHover(button);
      button._count++;
      this._over++;
    } else {
      button._count = 0;
      button._hover.alpha = 0;
      if (button._info) button._info.alpha = 0;
    }
    var skillId = button._skillId;
    if (!skillId) return;
    var cd = $gamePlayer._skillCooldowns[skillId];
    if (cd) {
      var settings = QuasiABS.getSkillSettings($dataSkills[skillId]);
      var newH = cd / settings.cooldown;
      button._cooldown.height = 34 * newH;
    } else {
      button._cooldown.height = 0;
    }
  };

  Sprite_ABSKeys.prototype.needsRefresh = function() {
    if (this._actorId !== $gameParty.leader()._actorId) {
      this._actorId = $gameParty.leader()._actorId;
      this._absKeys = $gameSystem.absKeys();
      this.createKeys();
    }
    if (QuasiABSHudA.requestRefresh) {
      QuasiABSHudA.requestRefresh = false;
      this._absKeys = $gameSystem.absKeys();
      this.createKeys();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_ABSSkill
  //
  // A Sprite container for displaying skill info

  Sprite_ABSSkill.prototype = Object.create(Sprite_Base.prototype);
  Sprite_ABSSkill.prototype.constructor = Sprite_ABSSkill;

  Sprite_ABSSkill.prototype.initialize = function(skillId) {
    Sprite_Base.prototype.initialize.call(this);
    this.width = 200;
    this.height = 250;
    this.y = -this.height;
    this._skillId = skillId;
    this._skill = $dataSkills[skillId];
    if (!this._skill) return;
    this.createBackground();
    this.drawInfo();
  };

  Sprite_ABSSkill.prototype.createBackground = function() {
    this.bitmap = new Bitmap(this.width, this.height);
    this.bitmap.fillAll("rgba(0, 0, 0, 0.8)");
  };

  Sprite_ABSSkill.prototype.drawInfo = function() {
    this._realHeight = 4;
    // Draw the details
    this.drawName(0, 0);
    this.drawIcon(2, 36);
    this.drawAbsSettings(40, 36);
    this.drawDescription(4, this._realHeight);
    this.drawLine(this._realHeight + 2);
    this.drawData(4, this._realHeight);
    // Resize to fit height
    this.height = this._realHeight + 4;
    this.y = -this.height;
  };

  Sprite_ABSSkill.prototype.drawName = function(x, y) {
    this.bitmap.fontSize = 28;
    this.bitmap.textColor = "#ffffa0";
    this.bitmap.drawText(this._skill.name, x, y, this.width, 36, "center");
    this._realHeight = Math.max(y + 28, this._realHeight);
  };

  Sprite_ABSSkill.prototype.drawIcon = function(x, y) {
    var iconIndex = this._skill.iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
    this._realHeight = Math.max(y + 32, this._realHeight);
  };

  Sprite_ABSSkill.prototype.drawAbsSettings = function(x, y) {
    var abs = QuasiABS.getSkillSettings(this._skill);
    var w = this.width - x - 4; // 4 is padding
    this.bitmap.fontSize = 14;
    var cooldown = abs.cooldown / 60;
    var range = abs.range;
    var mpCost = this._skill.mpCost;
    var tpCost = this._skill.tpCost;
    var i = 0;
    var l = 18; // line height
    if (cooldown !== 0) {
      this.bitmap.textColor = "#ffffa0";
      var w2 = this.bitmap.measureTextWidth(cooldown);
      this.bitmap.drawText("Cooldown: ", x - w2, y + l * i, w, l, "right");
      this.bitmap.textColor = "#ffffff";
      this.bitmap.drawText(cooldown, x, y + l * i, w, l, "right");
      i++;
    }
    if (range !== 0) {
      this.bitmap.textColor = "#ffffa0";
      var w2 = this.bitmap.measureTextWidth(range);
      this.bitmap.drawText("Range: ", x - w2, y + l * i, w, l, "right");
      this.bitmap.textColor = "#ffffff";
      this.bitmap.drawText(range, x, y + l * i, w, l, "right");
      i++;
    }
    if (mpCost!== 0) {
      this.bitmap.textColor = "#ffffa0";
      var w2 = this.bitmap.measureTextWidth(mpCost);
      this.bitmap.drawText(TextManager.mpA + " Cost: ", x - w2, y + l * i, w, l, "right");
      this.bitmap.textColor = "#ffffff";
      this.bitmap.drawText(mpCost, x, y + l * i, w, l, "right");
      i++;
    }
    if (tpCost!== 0) {
      this.bitmap.textColor = "#ffffa0";
      var w2 = this.bitmap.measureTextWidth(tpCost);
      this.bitmap.drawText(TextManager.tpA + " Cost: ", x - w2, y + l * i, w, l, "right");
      this.bitmap.textColor = "#ffffff";
      this.bitmap.drawText(tpCost, x, y + l * i, w, l, "right");
      i++;
    }
    this._realHeight = Math.max(y + (i * l), this._realHeight);
  };

  Sprite_ABSSkill.prototype.drawDescription = function(x, y) {
    this.bitmap.fontSize = 14;
    this.bitmap.textColor = "#ffffa0";
    this.bitmap.drawText("Desc:", x, y, this.width, 18, "left");
    var desc = "         " + this._skill.description;
    var settings = {
      fontName: "GameFont",
      fontSize: 14,
      fill: "#ffffff",
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeThickness: 4,
      wordWrap: true,
      wordWrapWidth: this.width - 4,
      lineHeight: 18
    }
    this._desc = new PIXI.Text(desc, settings);
    this._desc.x = x;
    this._desc.y = y - 1;
    this.addChild(this._desc);
    this._realHeight = Math.max(y + this._desc.height, this._realHeight);
  };

  Sprite_ABSSkill.prototype.drawLine = function(y) {
    this.bitmap.fillRect(2, y, this.width - 4, 2, "rgba(255, 255, 255, 0.8)");
    this._realHeight = Math.max(y + 4, this._realHeight);
  };

  Sprite_ABSSkill.prototype.drawData = function(x, y) {
    var w = this.width - x - 4; // 4 is padding
    this.bitmap.fontSize = 18;
    var formula = this._skill.damage.formula;
    formula = formula.replace(/b.(\w+)/g, "0");
    var a = $gamePlayer.actor();
    var v = $gameVariables._data;
    var dmg = eval(formula);
    var i = 0;
    var l = 18; // line height
    if (dmg !== 0 && this._skill.damage.type !== 0) {
      this.bitmap.textColor = "#ffffa0";
      var title;
      if (this._skill.damage.type === 1) {
        title = "Damage: ";
      } else if (this._skill.damage.type === 2) {
        title = "MP Damage: ";
      } else if (this._skill.damage.type === 3) {
        title = "Recover: ";
      } else if (this._skill.damage.type === 4) {
        title = "MP Recover: ";
      }
      this.bitmap.drawText(title, x, y + l * i, w, l, "left");
      this.bitmap.textColor = "#ffffff";
      var w2 = this.bitmap.measureTextWidth(title);
      this.bitmap.drawText(dmg, x + w2, y + l * i, w, l, "left");
      i++;
    }
    // Write the effects:
    this._realHeight = Math.max(y + (i * l), this._realHeight);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  // The scene class of the map screen.

  var Alias_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    Alias_Scene_Map_createAllWindows.call(this);
    this.createABSKeys();
  };

  Scene_Map.prototype.createABSKeys = function() {
    this._absKeys = new Sprite_ABSKeys();
    this.addChild(this._absKeys);
  };

  return QuasiABSHudA;
})();
