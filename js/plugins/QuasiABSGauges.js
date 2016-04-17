//============================================================================
// Quasi ABS Gauges
// Version: 1.00
// Last Update: December 22, 2015
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiABSGauges.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiABS
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/mv/abs/
//  - - http://forums.rpgmakerweb.com/ -- abs link
//============================================================================

var Imported = Imported || {};
Imported.Quasi_ABSGauges = 1.00;

//=============================================================================
 /*:
 * @plugindesc Adds hp Gauges to Quasi ABS enemies
 * Version: 1.00
 * <QuasiABSGauges>
 * @author Quasi      Site: http://quasixi.com
 *
 * @param Gauge Width
 * @desc Set the width of the gauge.
 * Default: 48
 * @default 48
 *
 * @param Gauge Height
 * @desc Set the height of the gauge.
 * Default: 4
 * @default 4
 *
 * @param Gauge Offset Y
 * @desc Set the gauges y offset, can be negative
 * Default: -48
 * @default -48
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Boss Gauge Width
 * @desc Set the width of the boss gauge.
 * Default: 480
 * @default 480
 *
 * @param Boss Gauge Height
 * @desc Set the height of the boss gauge.
 * Default: 16
 * @default 16
 *
 * @param Boss Gauge Offset Y
 * @desc Set the boss gauges y offset, can be negative
 * Default: 36
 * @default 36
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Gauge Background Color
 * @desc  The hex color behind the gauge.
 * Default: #202040
 * @default #202040
 *
 * @param Gauge Inbetween Color
 * @desc  The hex color between background and gradient
 * Default: #ffffff
 * @default #ffffff
 *
 * @param Gauge HP Color 1
 * @desc  The hex color for first color of the gradient
 * Default: #e08040
 * @default #e08040
 *
 * @param Gauge HP Color 2
 * @desc  The hex color for second color of the gradient
 * Default: #f0c040
 * @default #f0c040
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Text Font
 * @desc The font to use for the enemy name.
 * Default: GameFont
 * @default GameFont
 *
 * @param Font Size
 * @desc The font size to use for the enemy name.
 * Default: 14
 * @default 14
 *
 * @param Font Color
 * @desc The font color to use for the enemy name.
 * Default: #ffffff
 * @default #ffffff
 *
 * @param Boss Text Font
 * @desc The font to use for the enemy name.
 * Default: GameFont
 * @default GameFont
 *
 * @param Boss Font Size
 * @desc The font size to use for the enemy name.
 * Default: 18
 * @default 18
 *
 * @param Boss Font Color
 * @desc The font color to use for the enemy name.
 * Default: #ffffff
 * @default #ffffff
 *
 * @help
 * =============================================================================
 * ** About
 * =============================================================================
 *   ABS Gauges will only show the hp gauge of the enemy and their name on top
 * of the bar. The gauges will only appear if the enemy is in combat.
 *
 * Enemy Notetags:
 *   Don't show hp gauge
 *     <noHpBar>
 *
 *   Show boss gauge instead
 *     <bossHpBar>
 *
 * * These tags go inside the note field of the enemy in the database.
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
  alert("Error: Quasi ABS Gauges requires Quasi ABS to work.");
  throw new Error("Error: Quasi ABS Gauges requires Quasi ABS to work.")
}

//-----------------------------------------------------------------------------
// New Classes

function Sprite_Gauge() {
  this.initialize.apply(this, arguments);
}

function Sprite_BossGauge() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi ABS Hud A

(function() {
  var parameters = $plugins.filter(function(p) { return p.description.contains('<QuasiABSGauges>'); })[0].parameters;
  var gaugeSettings = {
    width:  Number(parameters["Gauge Width"]) || 0,
    height: Number(parameters["Gauge Height"]) || 0,
    oy:     Number(parameters["Gauge Offset Y"]) || 0,
    bosswidth:  Number(parameters["Boss Gauge Width"]) || 0,
    bossheight: Number(parameters["Boss Gauge Height"]) || 0,
    bossoy:     Number(parameters["Boss Gauge Offset Y"]) || 0,
    bg:     parameters["Gauge Background Color"],
    in:     parameters["Gauge Inbetween Color"],
    color1: parameters["Gauge HP Color 1"],
    color2: parameters["Gauge HP Color 2"],
    font:  parameters["Text Font"],
    size:  parameters["Font Size"],
    color: parameters["Font Color"],
    bossfont:  parameters["Boss Text Font"],
    bosssize:  parameters["Boss Font Size"],
    bosscolor: parameters["Boss Font Color"]
  };

  //-----------------------------------------------------------------------------
  // Game_Enemy
  //
  // The game object class for an enemy.

  var Alias_Game_Enemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Alias_Game_Enemy_setup.call(this, enemyId, x, y);
    var notes = this.enemy().note;
    this._hidehpbar = /<nohpbar>/i.test(notes);
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  // The superclass of Game_Character. It handles basic information, such as
  // coordinates and images, shared by all characters.

  Game_CharacterBase.prototype.showGauge = function() {
    return this.inCombat();
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  // The game object class for an event. It contains functionality for event page
  // switching and running parallel process events.

  Game_Event.prototype.showGauge = function() {
    return this.inCombat() && !this._battler._hidehpbar;
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //
  // The sprite for displaying a character.

  var Alias_Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    Alias_Sprite_Character_initMembers.call(this);
    this.createGaugeSprite();
  };

  Sprite_Character.prototype.createGaugeSprite = function() {
    this._gaugeSprite = new Sprite_Gauge();
    this.addChild(this._gaugeSprite);
  };

  var Alias_Sprite_Character_setBattler = Sprite_Character.prototype.setBattler;
  Sprite_Character.prototype.setBattler = function(battler) {
    Alias_Sprite_Character_setBattler.call(this, battler);
    if (!battler || this._character === $gamePlayer) return;
    this._gaugeSprite.setup(this._character, battler);
    var notes = battler.enemy().note;
    if (/<bosshpbar>/i.test(notes)) this.setBossGauge();
  };

  Sprite_Character.prototype.setBossGauge = function() {
    if (!this._bossGauge) {
      this._bossGauge = new Sprite_BossGauge();
      this.parent.addChild(this._bossGauge);
    }
    this._bossGauge.setup(this._character, this._battler);
  };

  //-----------------------------------------------------------------------------
  // Sprite_Gauge
  //
  // The sprite for displaying a battler gauge

  Sprite_Gauge.prototype = Object.create(Sprite.prototype);
  Sprite_Gauge.prototype.constructor = Sprite_Gauge;

  Sprite_Gauge.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._width = gaugeSettings.width;
    this._height = gaugeSettings.height;
    this.setupGauges();
    this._character = null;
    this._battler = null;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.y = gaugeSettings.oy;
    this.z = 8
  };

  Sprite_Gauge.prototype.setupGauges = function() {
    this.bitmap = new Bitmap(this._width, 32);
    // Background
    this._background = new PIXI.Graphics();
    var bgColor = gaugeSettings.bg.replace("#", "");
    bgColor = parseInt(bgColor, 16);
    this._background.beginFill(bgColor);
    this._background.drawRect(0, 0, this._width, this._height);
    this._background.endFill();
    this._background.cacheAsBitmap = true;
    this._background.x -= this._width / 2;
    this._background.y = -8;
    this._background.z = 4;
    this.addChild(this._background);
    // Between
    this._between = new PIXI.Graphics();
    var inColor = gaugeSettings.in.replace("#", "");
    inColor = parseInt(inColor, 16);
    this._between.beginFill(inColor);
    this._between.drawRect(0, 0, this._width, this._height);
    this._between.endFill();
    this._between.cacheAsBitmap = true;
    this._between.x -= this._width / 2;
    this._between.y = -8;
    this._between.z = 4;
    this._currentW = this._width;
    this.addChild(this._between);
    // Top (Gradient)
    this._top = new Sprite();
    this._top.bitmap = new Bitmap(this._width, this._height);
    this._top.anchor.x = 0.5;
    this._top.z = 4;
    this._top.y = -8;
    this.addChild(this._top);
  };

  Sprite_Gauge.prototype.setup = function(character, battler) {
    this._character = character;
    this._battler = battler;
    this.refresh();
  };

  Sprite_Gauge.prototype.refresh = function() {
    this._clear();
    if (!this._battler) return;
    if (!this.showGauge()) return;
    this.drawGauge();
    this.drawName(1, 0);
    this._targetW = Math.floor(this._width * this._hpRate);
    this._speed = Math.abs(this._currentW - this._targetW) / 30;
  };

  Sprite_Gauge.prototype.drawGauge = function() {
    this._hpRate = this._battler.hpRate();
    var fillW = Math.floor(this._width * this._hpRate);
    var color1 = gaugeSettings.color1;
    var color2 = gaugeSettings.color2;
    this._top.bitmap.gradientFillRect(0, 0, fillW, this._height, color1, color2);
  };

  // Assumes the gauge is for enemies
  // Will have an error if it's for an actor
  Sprite_Gauge.prototype.drawName = function(x, y) {
    this.fontSettings();
    var name = this._battler.enemy().name;
    this.bitmap.drawText(name, x, y, this._width, 32);
  };

  Sprite_Gauge.prototype.fontSettings = function() {
    this.bitmap.fontFace  = gaugeSettings.font;
    this.bitmap.fontSize  = gaugeSettings.size;
    this.bitmap.textColor = gaugeSettings.color;
  };

  Sprite_Gauge.prototype.showGauge = function() {
    return this._character.showGauge();
  };

  Sprite_Gauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (!this._battler || !this.showGauge()) {
      this.hideHud();
      return;
    } else {
      this.showHud();
    }
    if (this._hpRate !== this._battler.hpRate()) {
      this.refresh();
    }
    if (this._currentW !== this._targetW) {
      this.updateInbetween();
    }
  };

  Sprite_Gauge.prototype.updateInbetween = function() {
    if (this._currentW < this._targetW) {
      this._currentW  = Math.min(this._currentW + this._speed, this._targetW);
    }
    if (this._currentW > this._targetW) {
      this._currentW  = Math.max(this._currentW - this._speed, this._targetW);
    }
    this._between.width = this._currentW;
  };

  Sprite_Gauge.prototype.showHud = function() {
    if (this._hidden) {
      this.refresh();
      this._hidden = false;
      this.children.forEach(function(child) {
        child.alpha = 1;
      });
    }
  };

  Sprite_Gauge.prototype.hideHud = function() {
    if (!this._hidden) {
      this._clear();
      this.children.forEach(function(child) {
        child.alpha = 0;
      });
      this._hidden = true;
    }
  };

  Sprite_Gauge.prototype._clear = function() {
    this.bitmap.clear();
    this._top.bitmap.clear();
  };

  //-----------------------------------------------------------------------------
  // Sprite_BossGauge
  //
  // The sprite for displaying a boss gauge

  Sprite_BossGauge.prototype = Object.create(Sprite_Gauge.prototype);
  Sprite_BossGauge.prototype.constructor = Sprite_BossGauge;

  Sprite_BossGauge.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._width = gaugeSettings.bosswidth;
    this._height = gaugeSettings.bossheight;
    this.setupGauges();
    this._character = null;
    this._battler = null;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.y = gaugeSettings.bossoy;
    this.x = Graphics.boxWidth / 2;
    this.z = 8;
  };

  Sprite_BossGauge.prototype.showGauge = function() {
    return this._character.inCombat();
  };

  Sprite_BossGauge.prototype.fontSettings = function() {
    this.bitmap.fontFace  = gaugeSettings.bossfont;
    this.bitmap.fontSize  = gaugeSettings.bosssize;
    this.bitmap.textColor = gaugeSettings.bosscolor;
  };
})();
