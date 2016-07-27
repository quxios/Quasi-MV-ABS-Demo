//============================================================================
// Quasi ABS
// Version: 0.9924
// Last Update: July 27, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiABS.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiMovement
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/mv/
//  - - https://github.com/quasixi/Quasi-MV-ABS-Demo
//  - - http://forums.rpgmakerweb.com/index.php?/topic/52049-quasi-abs/
//
//============================================================================

var Imported = Imported || {};
Imported.Quasi_ABS = 0.9924;

//=============================================================================
 /*:
 * @plugindesc v0.9924 Action Battle System
 * <QuasiABS>
 * @author Quasi      Site: http://quasixi.com
 *
 * @param Quick Target
 * @desc Ground target skills will instantly cast at mouse location
 * Default: false   Set to true or false
 * @default false
 *
 * @param Lock when Targeting
 * @desc Player can not move when using Ground / Select targeting skills
 * Default: false   Set to true or false
 * @default false
 *
 * @param Attack Towards Mouse
 * @desc All actions will be used towards your mouse location
 * Default: false   Set to true or false
 * @default false
 *
 * @param Attack Moves Towards Mouse
 * @desc Attacks that move will move towards mouse or target location
 * Default: true   Set to true or false
 * @default true
 *
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Loot Decay
 * @desc How long until the loot disappears, in frames.
 * Default: 600
 * @default 600
 *
 * @param AoE Loot
 * @desc Collect nearby loot or pick up one at a time.
 * Default: true   Set to true or false
 * @default true
 *
 * @param Loot Touch Trigger
 * @desc Set to true for loot pick up on touch
 * Default: false
 * @default false
 *
 * @param Gold Icon
 * @desc Icon Index to display for gold loot
 * Default: 314
 * @default 314
 *
 * @param Level Animation
 * @desc The animation to play on level up.
 * Default: 52   Set to 0 for no animation.
 * @default 52
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Move Resistance Rate Stat
 * @desc Which stat to use for Move Resistance Rate
 * Default: xparam(1)     //  This is Evasion
 * @default xparam(1)
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param AI Default Sight Range
 * @desc Default range for enemies to go after player, in pixels
 * Default: 240
 * @default 240
 *
 * @param AI Use Quasi Sight
 * @desc Enable using Quasi Sight for enemies
 * Default: true  (Only matters if you're using Sight addon)
 * @default true
 *
 * @param AI Action Wait
 * @desc How many frames to wait before running AI for next skill
 * Default: 30
 * @default 30
 *
 * @param AI Pathfind Chase
 * @desc Enable using Quasi Pathfind for enemy chase
 * Default: true  (Only matters if you're using Pathfind addon)
 * @default true
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Show Damage Popups
 * @desc Show Damage Popups
 * Default: true (Only matters if you're using Quasi Popup )
 * @default false
 *
 * @param Show Damage as Notifications
 * @desc Show Damage as Notifications
 * Default: false (Only matters if you're using Quasi Popup )
 * @default false
 *
 * @param Show Item Gain Popups
 * @desc Show Item Gain Popups
 * Default: true (Only matters if you're using Quasi Popup )
 * @default true
 *
 * @param Show Item Gain as Notifications
 * @desc Show Item Gain as Notifications
 * Default: false (Only matters if you're using Quasi Popup )
 * @default false
 *
 * @param Show Exp Gain Popups
 * @desc Show Exp Gain Popups
 * Default: true (Only matters if you're using Quasi Popup )
 * @default true
 *
 * @param Show Exp Gain as Notifications
 * @desc Show Exp Gain as Notifications
 * Default: false (Only matters if you're using Quasi Popup )
 * @default false
 *
 * @param Show Level Gain Popups
 * @desc Show Level Gain Popups
 * Default: true (Only matters if you're using Quasi Popup )
 * @default true
 *
 * @param Show Level Gain as Notifications
 * @desc Show Level Gain as Notifications
 * Default: false (Only matters if you're using Quasi Popup )
 * @default false
 *
 * @param =====================
 * @desc Spacer
 * @default
 *
 * @param Skill Key 1
 * @desc Select which input key for Skill Key 1
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 1 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 1 Skill
 * @desc Select which skill is used by default for Skill Key 1
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 2
 * @desc Select which input key for Skill Key 2
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 2 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 2 Skill
 * @desc Select which skill is used by default for Skill Key 2
 * Leave empty to set set ingame
 * @default
 *
 * @param Skill Key 3
 * @desc Select which input key for Skill Key 3
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 3 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 3 Skill
 * @desc Select which skill is used by default for Skill Key 3
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 4
 * @desc Select which input key for Skill Key 4
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 4 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 4 Skill
 * @desc Select which skill is used by default for Skill Key 4
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 5
 * @desc Select which input key for Skill Key 5
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 5 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 5 Skill
 * @desc Select which skill is used by default for Skill Key 5
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 6
 * @desc Select which input key for Skill Key 6
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 6 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 6 Skill
 * @desc Select which skill is used by default for Skill Key 6
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 7
 * @desc Select which input key for Skill Key 7
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 7 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 7 Skill
 * @desc Select which skill is used by default for Skill Key 7
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 8
 * @desc Select which input key for Skill Key 8
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 8 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 8 Skill
 * @desc Select which skill is used by default for Skill Key 8
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 9
 * @desc Select which input key for Skill Key 9
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 9 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 9 Skill
 * @desc Select which skill is used by default for Skill Key 9
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 10
 * @desc Select which input key for Skill Key 10
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 10 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 10 Skill
 * @desc Select which skill is used by default for Skill Key 10
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 11
 * @desc Select which input key for Skill Key 11
 * Leave empty to disable
 * @default
 *
 * @param Skill Key 11 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 11 Skill
 * @desc Select which skill is used by default for Skill Key 11
 * Leave empty to set ingame
 * @default
 *
 * @param Skill Key 12
 * @desc Select which input key for Skill Key 12
 * Leave empty to disable this skill key
 * @default
 *
 * @param Skill Key 12 Rebind
 * @desc Set to true or false if the skill in this key
 * can be reassisgned
 * @default true
 *
 * @param Skill Key 12 Skill
 * @desc Select which skill is used by default for Skill Key 12
 * Leave empty to set ingame
 * @default
 *
 * @help
 * ============================================================================
 * ** Links
 * ============================================================================
 * For a guide on how to use this plugin go to:
 *
 *    http://quasixi.com/quasi-abs-documentation/
 *    ( Special thanks to Skymen )
 *
 * Other Links
 *  - http://quasixi.com/mv/
 *  - https://github.com/quasixi/Quasi-MV-ABS-Demo
 *  - http://forums.rpgmakerweb.com/index.php?/topic/52049-quasi-abs/
 */
//=============================================================================

//-----------------------------------------------------------------------------
// Dependencies

if (!Imported.Quasi_Movement) {
  alert("Error: Quasi ABS requires Quasi Movement to work.");
  throw new Error("Error: Quasi ABS requires Quasi Movement to work.")
}

//-----------------------------------------------------------------------------
// New Classes

function Game_Loot() {
  this.initialize.apply(this, arguments);
}

function Game_EventCopy() {
  this.initialize.apply(this, arguments);
}

function Skill_Sequencer() {
  this.initialize.apply(this, arguments);
}

function AnimatedSprite() {
  this.initialize.apply(this, arguments);
}

function Sprite_SkillCollider() {
  this.initialize.apply(this, arguments);
}

function Sprite_Icon() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi ABS

var QuasiABS = {};
(function() {
  QuasiABS.proccessParameters = function() {
    var parameters = $plugins.filter(function(p) { return p.description.contains('<QuasiABS>') && p.status; })[0].parameters;
    this.skillKey  = {};
    for (var key in parameters) {
      if (!parameters.hasOwnProperty(key)) continue;
      var input = parameters[key];
      var skillN = /^Skill Key ([0-9]+)$/.exec(key);
      if (skillN && input !== "") {
        this.skillKey[skillN[1]] = {
          input: input,
          skillId: Number(parameters[key + " Skill"]) || 0,
          rebind: parameters[key + " Rebind"] === "true"
        };
      }
    }
    this.quickTarget   = parameters["Quick Target"] === "true";
    this.lockTargeting = parameters["Lock when Targeting"] === "true";
    this.radianAtks    = parameters["Attack Moves Towards Mouse"] === "true";
    this.towardsMouse  = parameters["Attack Towards Mouse"] === "true";
    this.lootDecay   = Number(parameters["Loot Decay"]) || 1;
    this.lootTrigger = parameters["Loot Touch Trigger"] === "true" ? 2 : 0;
    this.aoeLoot     = parameters["AoE Loot"] === "true";
    this.goldIcon    = Number(parameters["Gold Icon"]) || 314;
    this.levelAni    = Number(parameters["Level Animation"]) || 0;
    this.aiLength    = Number(parameters["AI Default Sight Range"]) || 0;
    this.ce1         = Number(parameters["Common Event Variable 1"]) || 0;
    this.ce2         = Number(parameters["Common Event Variable 2"]) || 0;
    this.aiSight     = parameters["AI Use Quasi Sight"] === "true";
    this.aiWait1     = Number(parameters["AI Action Wait"]) || 30;
    this.aiAStar     = parameters["AI Pathfind Chase"] === "true";
    this.mrst        = parameters["Move Resistance Rate Stat"];
    this.showDmg     = parameters["Show Damage Popups"] === "true";
    this.dmgAsNoti   = parameters["Show Damage as Notifications"] === "true";
    this.showItem    = parameters["Show Item Gain Popups"] === "true";
    this.itemAsNoti  = parameters["Show Item Gain as Notifications"] === "true";
    this.showExp     = parameters["Show Exp Gain Popups"] === "true";
    this.expAsNoti   = parameters["Show Exp Gain as Notifications"] === "true";
    this.showLevel   = parameters["Show Level Gain Popups"] === "true";
    this.levelAsNoti = parameters["Show Level Gain as Notifications"] === "true";
  };
  QuasiABS.proccessParameters();

  QuasiABS.stringToSkillKeyObj = function(string) {
    var ary = string.split('\n');
    var obj = {};
    ary = ary.filter(function(i) { return i != "" });
    ary.forEach(function(e, i, a) {
      var s = /^(.*):(.*)/.exec(e);
      if (s) {
        var key = s[1];
        var data = s[2].split(' ');
        data = data.filter(function(i) { return i != "" });
        data = data.map(function(i) { return i.trim() });
        var skillId = Number(data[0])
        var rebind = data[1] ? data[1] === "true" : false;
        var input = QuasiABS.skillKey[key].input;
        if (input) {
          obj[key] = {
            input: input,
            skillId: skillId || 0,
            rebind: rebind
          };
        }
      }
    });
    return obj;
  };

  // Skill Settings Cache
  QuasiABS._skillSettings = {};
  QuasiABS.getSkillSettings = function(skill) {
    if (!this._skillSettings.hasOwnProperty(skill.id)) {
      var settings = /<absSettings>([\s\S]*)<\/absSettings>/i.exec(skill.note);
      this._skillSettings[skill.id] = false;
      if (settings) {
        settings = QuasiMovement.stringToObjAry(settings[1], QuasiMovement);
        this._skillSettings[skill.id] = settings;
        this._skillSettings[skill.id].cooldown = Number(settings.cooldown) || 0;
        this._skillSettings[skill.id].through  = Number(settings.through) || 0;
        if (settings.groundtarget) var range = Number(settings.groundtarget);
        if (settings.selecttarget) var range = Number(settings.selecttarget);
        this._skillSettings[skill.id].groundtarget = settings.groundtarget && !settings.selecttarget;
        this._skillSettings[skill.id].selecttarget = !settings.groundtarget && settings.selecttarget;
        this._skillSettings[skill.id].range = range || 0;
        this._skillSettings[skill.id].passabilityLevel = settings.passabilityLevel || 0;
      }
    }
    return this._skillSettings[skill.id];
  };

  // Skill Sequence Cache
  QuasiABS._skillSequence = {};
  QuasiABS.getSkillSequence = function(skill) {
    if (!this._skillSequence.hasOwnProperty(skill.id)) {
      var settings = /<absSequence>([\s\S]*)<\/absSequence>/i.exec(skill.note);
      this._skillSequence[skill.id] = [];
      if (settings) {
        settings = settings[1].split('\n');
        var actions = [];
        var sequence;
        for (var i = 0; i < settings.length; i++) {
          if (settings[i] !== "") {
            sequence = QuasiMovement.stringToAry(settings[i], true);
            actions.push(sequence);
          }
        }
        actions.push("collider hide");
        actions.push("user unlock");
        actions.push("user casting false");
        this._skillSequence[skill.id] = actions;
      }
    }
    return this._skillSequence[skill.id];
  };

  // Skill on Damage Cache
  QuasiABS._skillOnDamage = {};
  QuasiABS.getSkillOnDamage = function(skill) {
    if (!this._skillOnDamage.hasOwnProperty(skill.id)) {
      var settings = /<absOnDamage>([\s\S]*)<\/absOnDamage>/i.exec(skill.note);
      var actions = [];
      actions.push("animation 0");
      if (settings) {
        settings = settings[1].split('\n');
        var sequence;
        for (var i = 0; i < settings.length; i++) {
          var l = actions.length - 1;
          if (settings[i] !== "") {
            sequence = QuasiMovement.stringToAry(settings[i], true);
            actions.push(sequence);
          }
        }
      }
      this._skillOnDamage[skill.id] = actions;
    }
    return this._skillOnDamage[skill.id];
  };

  QuasiABS._weaponSkills = {};
  QuasiABS.weaponSkills = function(id) {
    if (!this._weaponSkills[id]) {
      var note = $dataWeapons[id].note;
      var skills = /<absSkills>([\s\S]*)<\/absSkills>/i.exec(note);
      this._weaponSkills[id] = {};
      if (skills) {
        this._weaponSkills[id] = QuasiABS.stringToSkillKeyObj(skills[1]);
      }
    }
    return this._weaponSkills[id];
  };

  // AI Range cache
  // Calculates the range for moving skills
  QuasiABS._aiRange = {};
  QuasiABS.getAiRange = function(skill) {
    if (!this._aiRange.hasOwnProperty(skill.id)) {
      var actions = this.getSkillSequence(skill).slice();
      var dist = 0;
      var maxDist = 0;
      actions.forEach(function(action) {
        var match = /^move(.*)/i.exec(action);
        if (match) {
          match = match[1].trim();
          match = match.split(" ");
          if (match[0] === "forward") {
            dist += Number(match[1]) || 0;
          } else {
            dist -= Number(match[1]) || 0;
          }
          maxDist = Math.max(dist, maxDist);
        }
      });
      this._aiRange[skill.id] = maxDist;
    }
    return this._aiRange[skill.id];
  };

  QuasiABS.enable = function() {
    $gameSystem._absEnabled = true;
  };

  QuasiABS.disable = function() {
    $gameSystem._absEnabled = false;
  };

  //-----------------------------------------------------------------------------
  // QuasiABS Manager
  //
  // Functions required for the ABS

  QuasiABS.Manager = {};

  //-----------------------------------------------------------------------------
  // Graphical Related stuff first

  QuasiABS.Manager.startPopup = function(type, x, y, string, iconIndex) {
    if (Imported.QuasiPopup) {
      if (type === "item") {
        var show = QuasiABS.showItem;
        var noti = QuasiABS.itemAsNoti;
        var style = {};
        var settings = {};
        var id = 0;
      }
      if (type === "exp") {
        var show = QuasiABS.showExp;
        var noti = QuasiABS.expAsNoti;
        var style = {};
        var settings = {};
        var id = 1;
      }
      if (type === "level") {
        var show = QuasiABS.showLevel;
        var noti = QuasiABS.levelAsNoti;
        var style = {};
        var settings = {};
        var id = 2;
      }
      if (!show) return;
      if (noti) {
        this.startNotification(id, x, y, string, iconIndex, style, settings);
        return;
      }
      if (!settings.transitions) {
        var start = settings.duration ? settings.duration - 30 : 90;
        var fadeout = start + " 30 fadeout";
        var slideup = "0 120 slideup 48";
        settings.transitions = [fadeout, slideup];
      }
      if (iconIndex) {
        string = "<icon:" + iconIndex + ">" + string;
      }
      QuasiPopup.start(x, y, string, style, settings);
    }
  };

  QuasiABS.Manager.startNotification = function(id, x, y, string, iconIndex, style, settings) {
    if (Imported.QuasiPopup) {
      if (id === 0) {
        x = Graphics.width;
        y = Graphics.height - 96;
        settings.alignX = "right";
      }
      if (id === 1) {
        x = Graphics.width / 2;
        y = 144;
        style.align = "center";
      }
      if (id === 2) {
        x = Graphics.width / 2;
        y = 96;
        style.align = "center";
      }
      if (!settings) {
        settings = {};
      }
      if (!settings.transitions) {
        var start = settings.duration ? settings.duration - 30 : 90;
        var fadeout = start + " 30 fadeout";
        settings.transitions = [fadeout];
      }
      if (iconIndex) {
        string = "<icon:" + iconIndex + ">" + string;
      }
      QuasiPopup.startList(id, x, y, string, style, settings);
    }
  };

  //-----------------------------------------------------------------------------
  // QuasiABS Manager Animations
  // Store animations in Manager so they dont get removed
  // when changing scenes, ex: openning a menu
  // * Clears when map is changed.

  QuasiABS.Manager._animations = [];
  QuasiABS.Manager.startAnimation = function(id, x, y) {
    var scene = SceneManager._scene;
    if (scene.constructor !== Scene_Map) return;
    var temp = new Sprite_Base();
    temp.realX = x;
    temp.realY = y;
    temp.z = 8;
    if (id < 0) id = 1;
    if (id === 0) return;
    var animation = $dataAnimations[id];
    this._animations.push(temp);
    scene._spriteset._tilemap.addChild(temp);
    temp.startAnimation(animation, false, 0);
    temp = null;
  };

  //-----------------------------------------------------------------------------
  // QuasiABS Manager Pictures
  // Store pictures in Manager so they dont get removed
  // when changing scenes, ex: openning a menu
  // * Clears when map is changed.

  QuasiABS.Manager._pictures = [];
  QuasiABS.Manager.addPicture = function(sprite) {
    var scene = SceneManager._scene;
    if (scene.constructor !== Scene_Map) return;
    this._pictures.push(sprite);
    scene._spriteset._tilemap.addChild(sprite);
  };

  QuasiABS.Manager.removePicture = function(sprite) {
    var scene = SceneManager._scene;
    if (scene.constructor !== Scene_Map) return;
    var i = this._pictures.indexOf(sprite);
    if (i < 0) return;
    this._pictures[i] = null;
    this._pictures.splice(i, 1);
    scene._spriteset._tilemap.removeChild(sprite);
  };

  //-----------------------------------------------------------------------------
  // QuasiABS Manager Loot
  // Store loot in Manager so they dont get removed
  // when changing scenes, ex: openning a menu
  // * Clears when map is changed.

  QuasiABS.Manager.createItem = function(x, y, itemId, type) {
    var loot = new Game_Loot(x, y);
    var data = $dataItems;
    if (type === 1) data = $dataWeapons;
    if (type === 2) data = $dataArmors;
    loot.setItem(data[itemId]);
  };

  QuasiABS.Manager.createGold = function(x, y, value) {
    var loot = new Game_Loot(x, y);
    loot.setGold(value);
  };

  QuasiABS.Manager.loadEvent = function(mapId, eventId, x, y) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + 'Map%1.json'.format(mapId.padZero(3));
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        var data = JSON.parse(xhr.responseText);
        var event = data.events[eventId];
        event.x = x || event.x;
        event.y = y || event.y;
        QuasiABS.Manager.createEvent(event);
      }
    };
    xhr.send();
  };

  QuasiABS.Manager.createEvent = function(eventData) {
    var event = new Game_EventCopy(this._mapId, eventData);
    this.addEvent(event);
    var spriteset = SceneManager._scene._spriteset;
    var sprite = new Sprite_Character(event);
    spriteset._characterSprites.push(sprite);
    spriteset._tilemap.addChild(sprite);
  };

  QuasiABS.Manager._cachedEmptyEvent = [];
  QuasiABS.Manager.addEvent = function(event) {
    var id;
    for (var i = 0; i < QuasiABS.Manager._cachedEmptyEvent.length; i++) {
      if (QuasiABS.Manager._cachedEmptyEvent[i]) {
        id = QuasiABS.Manager._cachedEmptyEvent[i];
        QuasiABS.Manager._cachedEmptyEvent[i] = null;
        break;
      }
    }
    if (!id) {
      id = $gameMap._events.length;
    }
    event._eventId = id;
    $gameMap._events[id] = event;
  };

  QuasiABS.Manager.removeEvent = function(event) {
    var id = event._eventId;
    if (!id) return;
    $gameMap.removeFromCharacterGrid(event);
    var scene = SceneManager._scene;
    if (scene === Scene_Map) {
      var spriteset = scene._spriteset;
      var spriteCharas = spriteset._characterSprites;
      for (var i = 0; i < spriteCharas.length; i++) {
        if (spriteCharas[i] && spriteCharas[i]._character === event) {
          spriteset._tilemap.removeChild(spriteCharas[i]);
          spriteCharas[i] = null;
          spriteCharas.splice(i, 1);
          break;
        }
      }
    }
    $gameMap._events[id].clearABS();
    $gameMap._events[id] = null;
    for (var i = 0; i < QuasiABS.Manager._cachedEmptyEvent.length; i++) {
      if (!QuasiABS.Manager._cachedEmptyEvent[i]) {
        QuasiABS.Manager._cachedEmptyEvent[i] = id;
        break;
      }
    }
    event = null;
  };

  // Clears pictures, animations and loot on map change.
  // Don't think there is a need to remove child from the spriteset
  // since it will be a new spriteset on map change
  // ( This is only called on map change )
  QuasiABS.Manager.clear = function() {
    this._pictures = [];
    this._animations = [];
    this._mapId = $gameMap._mapId;
  };

  //-----------------------------------------------------------------------------
  // Action / AI Related

  QuasiABS.Manager.getTargets = function(item, self) {
    return $gameMap.getCharactersAt(item.collider, function(chara) {
      if (!chara.battler()) return true;
      if (chara.battler().isDeathStateAffected()) return true;
      if ([1, 2, 3, 4, 5, 6].contains(item.data.scope)) {
        return chara === self || chara.isFriendly(self);
      }
      if ([7, 8, 9, 10].contains(item.data.scope)) {
        return !chara.isFriendly(self);
      }
      if (item.data.scope === 11) return !chara === self;
    });
  };

  QuasiABS.Manager.startAction = function(self, targets, item) {
    if (!item.animationTarget || targets.length === 0) {
      this.startAnimation(item.data.animationId, item.collider.center.x, item.collider.center.y);
    }
    for (var i = 0; i < targets.length; i++) {
      if (item.animationTarget === 1) {
        var x = targets[i].cx();
        var y = targets[i].cy();
        this.startAnimation(item.data.animationId, x, y);
      }
      var action = new Game_Action(self.battler(), true);
      action.setSkill(item.data.id);
      action.absApply(targets[i].battler());
      var id = self === $gamePlayer ? 0 : self.eventId();
      targets[i].addAgro(id, item.data);
    }
  };

  //-----------------------------------------------------------------------------
  // AI Object
  // * Was original going to be in Manager, but moved to seperate object
  //   for less characters to type.

  QuasiABS.AI = {};

  QuasiABS.AI.bestAction = function(userId) {
    var self  = userId === 0 ? $gamePlayer : $gameMap.event(userId);
    if (!self.battler()) return false;
    var targets;
    var action = {};
    var skills = self.usableSkills().filter(function(skillId) {
      targets = QuasiABS.AI.willHit(userId, skillId);
      if (targets && targets.length > 0) {
        action[skillId] = targets;
        return true;
      }
      return false;
    });
    if (skills.length === 0) return false;
    // Change below for better AI instead of random skill
    // from possible skills
    var random = skills[Math.floor(Math.random() * skills.length)]
    return random;
  };

  /**
   * Checks if the user can hit the target with a skill.
   * * Based off the users current direction, not all direction.
   * @param userId   - The Event Id, or 0 for the Player
   * @param skillId  - The Id of the skill
   * @return array   - Filled with targets it can hit
   */
  QuasiABS.AI.willHit = function(userId, skillId) {
    var skill = $dataSkills[skillId];
    var self  = userId === 0 ? $gamePlayer : $gameMap.event(userId);
    var settings = QuasiABS.getSkillSettings(skill);
    if (!settings.collider) {
      settings.collider = ["box", self.collider().width, self.collider().height];
    }
    var targetRange = settings.range; // ground target or select target range
    var width   = w = settings.collider[1];
    var height  = h = settings.collider[2];
    var infront = settings.infront === true;
    var rotate  = settings.rotate === true;
    var offset  = Number(settings.offset || 0);
    var horz    = [4, 6].contains(self._direction);
    if (rotate && horz) {
      w = height;
      h = width;
    }
    // Center skill on caster
    var x1 = self.cx() - w / 2;
    var y1 = self.cy() - h / 2;
    if (infront) {
      var w2 = self.collider().width / 2;
      var h2 = self.collider().height / 2;
      if (horz) {
        x1 = self._direction === 4 ?  x1 - w2 - w / 2 : x1 + w2 + w / 2;
        x1 += self._direction === 6 ? offset : -offset;
      } else {
        y1 = self._direction === 8 ?  y1 - h2 - h / 2 : y1 + h2 + h / 2;
        y1 += self._direction === 2 ? offset : -offset;
      }
    }
    // in radius range for ground / select target
    var range, targets;
    var getTargetObj = {data: skill};
    var aiRange = QuasiABS.getAiRange(skill);
    if (targetRange !== 0 || (aiRange > 0 && QuasiABS.radianAtks)) {
      var maxRange = targetRange < aiRange * 2 ? aiRange * 2 : targetRange;
      range = new QuasiMovement.Circle_Collider(w + maxRange, h + maxRange);
      range.moveto(x1 - maxRange / 2, y1 - maxRange / 2);
      getTargetObj.collider = range;
      targets = QuasiABS.Manager.getTargets(getTargetObj, self);
      SceneManager._scene.addTempCollider(range, 60); // For testing purposes
      return targets.filter(function(chara) {
        return range.intersects(chara.collider());
      });
    }
    if (aiRange > 0) {
      // check if moving skills hit
      if (horz) {
        w += aiRange;
        x1 += aiRange * (self._direction === 4 ? -1 : 0);
      } else {
        h += aiRange;
        y1 += aiRange * (self._direction === 8 ? 1 : 0);
      }
      var range = new QuasiMovement.Box_Collider(w, h);
      range.moveto(x1, y1);
      SceneManager._scene.addTempCollider(range, 60); // For testing purposes
      getTargetObj.collider = range;
      targets = QuasiABS.Manager.getTargets(getTargetObj, self);
      return targets.filter(function(chara) {
        return range.intersects(chara.collider());
      });
    }
    var range = self.makeSkillCollider(settings);
    SceneManager._scene.addTempCollider(range, 60); // For testing purposes
    getTargetObj.collider = range;
    targets = QuasiABS.Manager.getTargets(getTargetObj, self);
    return targets.filter(function(chara) {
      return range.intersects(chara.collider());
    });
  };

  //-----------------------------------------------------------------------------
  // Skill_Sequencer
  //
  // Handles the skill sequence for Quasi ABS

  Skill_Sequencer.prototype.constructor = Skill_Sequencer;

  Skill_Sequencer.prototype.initialize = function(character, skill) {
    this._character = character;
    this._skill = skill;
  };

  Skill_Sequencer.prototype.update = function() {
    if (this._skill.break) {
      var i = this._character._skillLocked.indexOf(this._skill);
      if (i >= 0) {
        this._character._skillLocked.splice(i, 1);
      }
      this._character._casting = false;
      QuasiABS.Manager.removePicture(this._skill.picture);
      QuasiABS.Manager.removePicture(this._skill.trail);
      QuasiABS.Manager.removePicture(this._skill.pictureCollider);
      i = this._character._activeSkills.indexOf(this._skill);
      this._character._activeSkills.splice(i, 1);
      return;
    }
    if (this._skill.moving) {
      this.updateSkillPosition();
    }
    if (this._waitCount > 0) {
      this._waitCount--;
      return;
    }
    if (this._waitForUserMove || this._waitForUserJump || this._waitForPose) {
      if (!this._character.isMoving())   this._waitForUserMove = false;
      if (!this._character.isJumping())  this._waitForUserJump = false;
      if (!this._character._posePlaying) this._waitForPose = false;
    }
    if (this._waitForMove || this._waitForUserMove ||
        this._waitForUserJump || this._waitForPose) {
      return;
    }
    var sequence = this._skill.sequence.shift();
    if (sequence) {
      var action = sequence.split(' ');
      this.startAction(action);
    }
    if (this._skill.sequence.length === 0) {
      if (!this._skill.moving) {
        var i = this._character._activeSkills.indexOf(this._skill);
        QuasiABS.Manager.removePicture(this._skill.picture);
        QuasiABS.Manager.removePicture(this._skill.trail);
        QuasiABS.Manager.removePicture(this._skill.pictureCollider);
        this._character._activeSkills.splice(i, 1);
      }
    }
  };

  Skill_Sequencer.prototype.updateSkillDamage = function() {
    var targets = this._skill.targets;
    for (var i = 0; i < this._skill.ondmg.length; i++) {
      var action = this._skill.ondmg[i].split(' ');
      this.startDamageAction(action, targets);
    }
    QuasiABS.Manager.startAction(this._character, targets, this._skill);
  };

  Skill_Sequencer.prototype.updateSkillPosition = function() {
    if (this._skill.waving) {
      return this.updateSkillWavePosition();
    }
    if (!this.canSkillMove()) {
      return;
    }
    var x1 = this._skill.collider.x;
    var x2 = this._skill.newX;
    var y1 = this._skill.collider.y;
    var y2 = this._skill.newY;
    if (x1 < x2) x1 = Math.min(x1 + this._skill.speedX, x2);
    if (x1 > x2) x1 = Math.max(x1 - this._skill.speedX, x2);
    if (y1 < y2) y1 = Math.min(y1 + this._skill.speedY, y2);
    if (y1 > y2) y1 = Math.max(y1 - this._skill.speedY, y2);
    this._skill.collider.moveto(x1, y1);
    var x3 = this._skill.collider.center.x;
    var y3 = this._skill.collider.center.y;
    if (this._skill.picture) {
      this._skill.picture.move(x3, y3);
    }
    if (this._skill.pictureCollider) {
      this._skill.pictureCollider.move(x3, y3);
    }
    if (this._skill.trail) {
      var x = this._skill.trail.startX;
      var y = this._skill.trail.startY;
      var x4 = x - x3;
      var y4 = y - y3;
      var dist = Math.sqrt(x4 * x4 + y4 * y4);
      var r = this._skill.trail.rotation;
      var xc = dist * -Math.cos(r);
      var yc = dist * -Math.sin(r);
      x += xc / 2;
      y += yc / 2;
      var h = this._skill.trail.bitmap.height;
      this._skill.trail.move(x, y, dist, h);
    }
    if (x1 === x2 && y1 === y2) {
      this._skill.targetsHit = [];
      this._skill.moving = false;
      this._waitForMove = false;
    }
  };

  Skill_Sequencer.prototype.updateSkillWavePosition = function() {
    if (!this.canSkillMove()) {
      this._skill.waving = false;
      return;
    }
    var x1 = this._skill.xi;
    var y1 = this._skill.yi;
    var x2 = (this._skill.theta / this._skill.waveLength * this._skill.distance );
    var y2 = this._skill.amp * -Math.sin(this._skill.theta);
    var h = Math.sqrt(y2 * y2 + x2 * x2);
    var rad = Math.atan2(-y2, x2);
    rad += this._skill.radian;
    var x3 = h * Math.cos(rad);
    var y3 = h * -Math.sin(rad);
    this._skill.collider.moveto(x1 + x3, y1 + y3);
    var x4 = this._skill.collider.center.x;
    var y4 = this._skill.collider.center.y;
    if (this._skill.picture) {
      this._skill.picture.move(x4, y4);
    }
    if (this._skill.pictureCollider) {
      this._skill.pictureCollider.move(x4, y4);
    }
    if (this._skill.theta >= this._skill.waveLength) {
      this._skill.targetsHit = [];
      this._skill.waving = false;
      this._skill.moving = false;
      this._waitForMove = false;
    }
    this._skill.theta += this._skill.waveSpeed;
  };

  Skill_Sequencer.prototype.startAction = function(action) {
    switch (action[0].toLowerCase()) {
      case "user":
        this.startUserAction(action);
        break;
      case "store":
        this.storePosition();
        break;
      case "clearstore":
        this._stored = null;
        break;
      case "teleportto":
        this.startTeleport(action);
        break;
      case "move":
        this.startMove(action);
        break;
      case "movetostored":
        this.startMoveToStored(action);
        break;
      case "wave":
        this.startWave(action);
        break;
      case "damage":
      case "trigger":
        this.triggerSkill(action);
        break;
      case "wait":
        this.startWait(action);
        break;
      case "picture":
        this.showPicture(action);
        break;
      case "trail":
        this.showTrail(action);
        break;
      case "collider":
        this.setCollider(action);
        break;
      case "animation":
        this.startAnimation(action);
        break;
      case "se":
        this.startSE(action);
        break;
      case "globallock":
        if (Imported.Quasi_MovementPlus) $gameMap.globalLock();
        break;
      case "globalunlock":
        if (Imported.Quasi_MovementPlus) $gameMap.globalUnlock();
        break;
      }
  };

  Skill_Sequencer.prototype.startUserAction = function(action) {
    switch (action[1].toLowerCase()) {
      case "casting":
        this.userCasting(action);
        break;
      case "lock":
        this.userLock();
        break;
      case "unlock":
        this.userUnlock();
        break;
      case "speed":
        this.userSpeed(action);
        break;
      case "move":
        this.userMove(action);
        break;
      case "jump":
        this.userJump(action);
        break;
      case "jumphere":
        this.userJumpHere(action);
        break;
      case "slide":
        this.userSlide(action);
        break;
      case "teleport":
        this.userTeleport();
        break;
      case "setdirection":
        this.userSetDirection(action);
        break;
      case "directionfix":
        this.userDirectionFix(action);
        break;
      case "pose":
        this.userPose(action);
        break;
      case "forceskill":
        this.userForceSkill(action);
        break;
      case "animation":
        this.userAnimation(action);
        break;
    }
  };

  Skill_Sequencer.prototype.startDamageAction = function(action, targets) {
    switch (action[0].toLowerCase()) {
      case "target":
        this.startDamageTargetAction(action, targets);
        break;
      case "user":
        this.startDamageUserAction(action, targets);
        break;
      case "animationtarget":
        this._skill.animationTarget = Number(action[1]) || 0;
        break;
    }
  };

  Skill_Sequencer.prototype.startDamageTargetAction = function(action, targets) {
    switch (action[1].toLowerCase()) {
      case "move":
        this.targetMove(action, targets);
        break;
      case "jump":
        this.targetJump(action, targets);
        break;
      case "pose":
        this.targetPose(action, targets);
        break;
      case "cancel":
        this.targetCancel(action, targets);
        break;
    }
  };

  Skill_Sequencer.prototype.startDamageUserAction = function(action, targets) {
    switch (action[1].toLowerCase()) {
      case "forceskill":
        this.userForceSkill(action);
        break;
    }
  };

  Skill_Sequencer.prototype.targetMove = function(action, targets) {
    var dist = Number(action[3]) || this._character.moveTiles();
    for (var i = 0; i < targets.length; i++) {
      dist -= dist * eval("targets[i].battler()." + QuasiABS.mrst);
      if (dist <= 0) return;
      var dx = targets[i]._px - this._character._px;
      var dy = targets[i]._py - this._character._py;
      var rad = Math.atan2(-dy, dx);
      rad = rad < 0 ? rad + 2 * Math.PI : rad;
      var dir = this.radianToDirection(rad);
      if (action[2] === "towards") {
        dir = this.reverseDir(dir);
      }
      var route = {
        list: [],
        repeat: false,
        skippable: true,
        wait: false
      };
      var cmd = {
        code: "fixedMove",
        parameters: [dir, this._character.moveTiles()]
      };
      var steps = 0;
      while (steps < dist) {
        steps += this._character.moveTiles();
        route.list.unshift(cmd);
      }
      if (steps < dist && QuasiMovement.offGrid) {
        cmd.parameters = [dir, dist - steps];
        route.list.unshift(cmd);
      }
      route.list.unshift({code: 35});
      if (targets[i].isDirectionFixed()) {
        route.list.push({code: 35});
      } else {
        route.list.push({code: 36});
      }
      route.list.push({code: 0});
      targets[i].forceMoveRoute(route);
      targets[i].updateRoutineMove();
    }
  };

  Skill_Sequencer.prototype.targetJump = function(action, targets) {
    var dist = Number(action[3]);
    for (var i = 0; i < targets.length; i++) {
      dist -= dist * eval("targets[i].battler()." + QuasiABS.mrst);
      if (dist <= 0) return;
      var dx = targets[i]._px - this._character._px;
      var dy = targets[i]._py - this._character._py;
      var rad = Math.atan2(-dy, dx);
      rad = rad < 0 ? rad + 2 * Math.PI : rad;
      var dir = this.radianToDirection(rad);
      if (action[2] === "towards") {
        dir = this.reverseDir(dir);
      }
      dist ? targets[i].pixelJumpFixed(dir, dist) : targets[i].jumpFixed(dir);
    }
  };

  Skill_Sequencer.prototype.targetPose = function(action, targets) {
    var pose = action[2];
    if (Imported.Quasi_Sprite) {
      for (var i = 0; i < targets.length; i++) {
        targets[i].playPose(pose);
      }
    }
  };

  Skill_Sequencer.prototype.targetCancel = function(action, targets) {
    for (var i = 0; i < targets.length; i++) {
      if (!targets[i]._casting) continue;
      targets[i]._casting.break = true;
    }
  };

  Skill_Sequencer.prototype.userCasting = function(action) {
    if (!this._skill.forced) {
      this._character._casting = action[2] === "true" ? this._skill : false;
    }
  };

  Skill_Sequencer.prototype.userLock = function() {
    this._character._skillLocked.push(this._skill);
  };

  Skill_Sequencer.prototype.userUnlock = function() {
    var i = this._character._skillLocked.indexOf(this._skill);
    if (i >= 0) {
      this._character._skillLocked.splice(i, 1);
    }
  };

  Skill_Sequencer.prototype.userSpeed = function(action) {
    var amt = Number(action[3]) || 1;
    var spd = this._character.moveSpeed();
    if (action[2] === "inc") {
      this._character.setMoveSpeed(spd + amt);
    } else if (action[2] === "dec")  {
      this._character.setMoveSpeed(spd - amt);
    }
  };
  Skill_Sequencer.prototype.userMove = function(action) {
    var dist = Number(action[3]) || this._character.moveTiles();
    var route = {
      list: [{code: 45}, {code: 0}],
      repeat: false,
      skippable: true,
      wait: false
    };
    var dir = action[2] === "backward" ? 0 : 5;
    route.list[0].parameters = ["qmove(" + dir + "," + dist + ")"];
    this._character.forceMoveRoute(route);
    this._character.updateRoutineMove();
    this._waitForUserMove = action[4] ? action[4] === "true" : false;
  };

  Skill_Sequencer.prototype.userJump = function(action) {
    var dist = Number(action[3]);
    if (action[2] === "backward") {
      dist ? this._character.pixelJumpBackward(dist) : this._character.jumpBackward();
    } else if (action[2] === "forward")  {
      dist ? this._character.pixelJumpForward(dist) : this._character.jumpForward();
    }
    this._waitForUserJump = action[4] ? action[4] === "true" : false;
  };

  Skill_Sequencer.prototype.userJumpHere = function(action) {
    var x1 = this._character.cx();
    var y1 = this._character.cy();
    var x2 = this._skill.collider.center.x;
    var y2 = this._skill.collider.center.y;
    var dx = x2 - x1;
    var dy = y2 - y1;
    var final = this.adjustPosition(this._character._px, this._character._py, this._character._px + dx, this._character._py + dy);
    this._character.pixelJump(final.x - this._character._px, final.y - this._character._py);
    this._waitForUserJump = action[2] ? action[2] === "true" : false;
  };

  Skill_Sequencer.prototype.userSlide = function(action) {
    var x1 = this._character._px;
    var y1 = this._character._py;
    var x2 = this._skill.collider.center.x;
    var y2 = this._skill.collider.center.y;
    var final = this.adjustPosition(x1, y1, x2, y2);
    this._character.slideTo(final.x, final.y);
    this._waitForUserMove = action[2] ? action[2] === "true" : false;
  };

  Skill_Sequencer.prototype.userTeleport = function() {
    var x1 = this._skill.collider.x;
    var y1 = this._skill.collider.y;
    if (!QuasiMovement.offGrid) {
      x1 = Math.round(x1 / QuasiMovement.tileSize);
      y1 = Math.round(y1 / QuasiMovement.tileSize);
    }
    this._character.setPixelPosition(x1, y1);
  };

  Skill_Sequencer.prototype.userSetDirection = function(action) {
    var dir = Number(action[2]);
    if (dir) {
      this._character.setDirection(dir);
    }
  };

  Skill_Sequencer.prototype.userDirectionFix = function(action) {
    var fix = action[2] === "true";
    this._character.setDirectionFix(fix);
  };

  Skill_Sequencer.prototype.userPose = function(action) {
    var pose = action[2];
    var wait = action[3] === "true";
    if (Imported.Quasi_Sprite) {
      this._character.playPose(pose);
      this._waitForPose = wait;
    }
  };

  Skill_Sequencer.prototype.userForceSkill = function(action) {
    var id = Number(action[2]);
    var angleOffset = Number(action[3]);
    if (angleOffset) {
      var radOffset = angleOffset * Math.PI / 180;
      this._character._radian = this._character.directionToRadian(this._character._direction);
      this._character._radian += radOffset;
      this._character._radian += this._character._radian < 0 ? 2 * Math.PI : 0;
    }
    this._character.forceSkill(id, true);
  };

  Skill_Sequencer.prototype.storePosition = function() {
    this._stored = new Point(this._skill.collider.x, this._skill.collider.y);
  };

  Skill_Sequencer.prototype.startTeleport = function(action) {
    var chara = action[1].toLowerCase() === "player" ? $gamePlayer : null;
    if (chara) {
      var w = this._skill.collider.width;
      var h = this._skill.collider.height;
      var x = chara.cx() - w / 2;
      var y = chara.cy() - h / 2;
      this._skill.collider.moveto(x, y);
    }
  };

  Skill_Sequencer.prototype.startMoveToStored = function(action) {
    if (this._stored) {
      var x1 = this._skill.collider.x;
      var y1 = this._skill.collider.y;
      var x2 = this._stored.x;
      var y2 = this._stored.y;
      var dx = x2 - x1;
      var dy = y2 - y1;
      var dist = Math.sqrt(dx * dx + dy * dy);
      this._skill.radian = Math.atan2(-(y2 - y1), x2 - x1);
      this._skill.radian += this._skill.radian < 0 ? 2 * Math.PI : 0;
      this.startMove([null, "forward", dist, action[1], action[2]]);
    }
  };

  Skill_Sequencer.prototype.startMove = function(action) {
    var dir = action[1];
    var distance = Number(action[2]);
    var duration = Number(action[3]);
    var wait = action[4] === "true";
    SceneManager._scene.addTempCollider(this._skill.collider, duration);
    var radian = dir === "forward" ? this._skill.radian : dir;
    radian = radian === "backward" ? this.reverseRadian(this._skill.radian) : radian;
    this.setSkillRadian(Number(radian));
    this.moveSkill(distance, duration);
    this._waitForMove = wait;
  };

  Skill_Sequencer.prototype.startWave = function(action) {
    var dir = action[1];
    var amp = Number(action[2]);
    var harm = Number(action[3]);
    var distance = Number(action[4]);
    var duration = Number(action[5]);
    var wait = action[6] === "true";
    SceneManager._scene.addTempCollider(this._skill.collider, duration);
    var radian = dir === "forward" ? this._skill.radian : dir;
    radian = radian === "backward" ? this.reverseRadian(this._skill.radian) : radian;
    this.setSkillRadian(Number(radian));
    this.waveSkill(amp, harm, distance, duration);
    this._waitForMove = wait;
  };

  Skill_Sequencer.prototype.triggerSkill = function() {
    this._skill.targets = QuasiABS.Manager.getTargets(this._skill, this._character);
    this.updateSkillDamage();
  };

  Skill_Sequencer.prototype.startWait = function(action) {
    SceneManager._scene.addTempCollider(this._skill.collider, Number(action[1]));
    this._waitCount = Number(action[1]);
  };

  Skill_Sequencer.prototype.showPicture = function(action) {
    var animated = /#\[(.*)\]/i.exec(action[1]);
    if (animated) {
      var settings = animated[1].split("-");
      this._skill.picture = new AnimatedSprite();
      this._skill.picture.bitmap = ImageManager.loadPicture(action[1]);
      this._skill.picture._frames = Number(settings[0]) || 1;
      this._skill.picture._speed = Number(settings[1]) || 15;
      var skill = this._skill;
      this._skill.picture.bitmap.addLoadListener(function() {
        skill.picture.setFramePosition();
      });
    } else {
      this._skill.picture = new Sprite();
      this._skill.picture.bitmap = ImageManager.loadPicture(action[1]);
    }
    this._skill.picture.rotatable = action[2] === "true";
    this._skill.picture.originDirection = Number(action[3]);
    this._skill.picture.z = 3;
    this._skill.picture.anchor.x = 0.5;
    this._skill.picture.anchor.y = 0.5;
    this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
    QuasiABS.Manager.addPicture(this._skill.picture);
  };

  Skill_Sequencer.prototype.showTrail = function(action) {
    this._skill.trail = new TilingSprite();
    this._skill.trail.bitmap = ImageManager.loadPicture(action[1]);
    this._skill.trail.move(0, 0, Graphics.width, Graphics.height);
    this._skill.trail.rotatable = action[2] === "true";
    this._skill.trail.originDirection = Number(action[3]);
    this._skill.trail.z = 2;
    this.setSkillPictureRadian(this._skill.trail, this._skill.radian);
    var x = this._skill.collider.center.x;
    var y = this._skill.collider.center.y;
    this._skill.trail.startX = x;
    this._skill.trail.startY = y;
    var skill = this._skill;
    this._skill.trail.bitmap.addLoadListener(function() {
      var w = skill.trail.bitmap.width;
      var h = skill.trail.bitmap.height;
      skill.trail.anchor.x = 0.5;
      skill.trail.anchor.y = 0.5;
      skill.trail.move(x, y, w, h);
      QuasiABS.Manager.addPicture(skill.trail);
    });
  };

  Skill_Sequencer.prototype.setCollider = function(action) {
    if (action[1] === "show") {
      if (!this._skill.pictureCollider) {
        this._skill.pictureCollider = new Sprite_SkillCollider(this._skill.collider);
        var x = this._skill.collider.center.x;
        var y = this._skill.collider.center.y;
        this._skill.pictureCollider.move(x, y);
        QuasiABS.Manager.addPicture(this._skill.pictureCollider);
      }
    } else if (action[1] === "hide") {
      if (this._skill.pictureCollider) {
        QuasiABS.Manager.removePicture(this._skill.pictureCollider);
        this._skill.pictureCollider = null;
      }
    }
  };

  Skill_Sequencer.prototype.startAnimation = function(action) {
    var id = Number(action[1]);
    var x = this._skill.collider.center.x;
    var y = this._skill.collider.center.y;
    QuasiABS.Manager.startAnimation(id, x, y);
  };

  Skill_Sequencer.prototype.userAnimation = function(action) {
    var id = Number(action[2]);
    var x = this._character.cx();
    var y = this._character.cy();
    QuasiABS.Manager.startAnimation(id, x, y);
  };

  Skill_Sequencer.prototype.startSE = function(action) {
    var se ={};
    se.name = action[1];
    se.volume = Number(action[2]) || 90;
    se.pitch = Number(action[3]) || 100;
    se.pan = Number(action[4]) || 0;
    AudioManager.playSe(se);
  };

  Skill_Sequencer.prototype.moveSkill = function(distance, duration) {
    this._skill.newX   = this._skill.collider.x + Math.round(distance * Math.cos(this._skill.radian));
    this._skill.newY   = this._skill.collider.y + Math.round(distance * -Math.sin(this._skill.radian));
    this._skill.speed  = Math.abs(distance / duration);
    this._skill.speedX = Math.abs(this._skill.speed * Math.cos(this._skill.radian));
    this._skill.speedY = Math.abs(this._skill.speed * -Math.sin(this._skill.radian));
    this._skill.moving = true;
  };

  Skill_Sequencer.prototype.waveSkill = function(amp, harmonics, distance, duration) {
    this._skill.amp = amp;
    this._skill.distance = distance;
    this._skill.waveLength = harmonics * Math.PI;
    this._skill.waveSpeed = this._skill.waveLength / duration;
    this._skill.theta = 0;
    this._skill.xi = this._skill.collider.x;
    this._skill.yi = this._skill.collider.y;
    this._skill.waving = true;
    this._skill.moving = true;
  };

  Skill_Sequencer.prototype.canSkillMove = function() {
    var stop = false;
    var targets = QuasiABS.Manager.getTargets(this._skill, this._character);
    if (targets.length > 0) {
      for (var j = targets.length - 1; j >= 0; j--) {
        if (!this._skill.targetsHit.contains(targets[j].battler()._charaId)) {
          this._skill.targetsHit.push(targets[j].battler()._charaId);
        } else {
          targets.splice(j, 1);
        }
      }
      if (targets.length > 0) {
        this._skill.targets = targets;
        if (this._skill.settings.through === 1 || this._skill.settings.through === 3) {
          stop = true
          this._skill.targets = [targets[0]];
        }
        this.updateSkillDamage();
      }
    }
    if (this._skill.settings.through === 2 || this._skill.settings.through === 3) {
      var boxes = $gameMap.getTileBoxesAt(this._skill.collider);
      for (var i = 0; i < boxes.length; i++) {
        if (this._skill.settings.overwater && (boxes[i].isWater1 || boxes[i].isWater2)) {
          continue;
        }
        if (this._skill.passableColors.contains(boxes[i].color)) {
          continue;
        }
        stop = true;
        break;
      }
    }
    var edge = this._skill.collider.gridEdge();
    var x1   = edge[0];
    var x2   = edge[1];
    var y1   = edge[2];
    var y2   = edge[3];
    var maxW = $gameMap.width();
    var maxH = $gameMap.height();
    if (!$gameMap.isLoopHorizontal()) {
      if (x1 < 0 || x2 >= maxW) stop = true;
    }
    if (!$gameMap.isLoopVertical()) {
      if (y1 < 0 || y2 >= maxH) stop = true;
    }
    if (stop) {
      this._skill.targetsHit = [];
      this._skill.moving = false;
      this._waitForMove = false;
      return false;
    }
    return true;
  };

  Skill_Sequencer.prototype.adjustPosition = function(xi, yi, xf, yf) {
    var final = new Point(xf, yf);
    var dx = xf - xi;
    var dy = yf - yi;
    var rad = Math.atan2(dy, dx);
    rad += rad < 0 ? 2 * Math.PI : 0;
    var vx = Math.cos(rad) * this._character.moveTiles();
    var vy = Math.sin(rad) * this._character.moveTiles();
    while (!this._character.canPixelPass(final.x, final.y, 5)) {
      final.x -= vx;
      final.y -= vy;
    };
    this._character.collider().moveto(xi, yi);
    return final;
  };

  Skill_Sequencer.prototype.setSkillRadian = function(radian) {
    var oldRadian    = this._skill.radian;
    var oldDirection = this._skill.direction;
    var rotate       = this._skill.settings.rotate === true;
    this._skill.radian     = radian;
    this._skill.direction  = this.radianToDirection(radian);
    this._skill.collider.setRadian(Math.PI / 2 - radian);
    if (this._skill.picture) this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
  };

  Skill_Sequencer.prototype.setSkillPictureRadian = function(picture, radian) {
    if (!picture.rotatable) return;
    var originDirection = picture.originDirection;
    var originRad = this.directionToRadian(originDirection);
    picture.rotation = originRad - radian;
  };

  Skill_Sequencer.prototype.directionToRadian = function(direction) {
    return this._character.directionToRadian(direction);
  };

  Skill_Sequencer.prototype.radianToDirection = function(radian) {
    return this._character.radianToDirection(radian);
  };

  Skill_Sequencer.prototype.reverseRadian = function(radian) {
    return this._character.reverseRadian(radian);
  };

  Skill_Sequencer.prototype.reverseDir = function(direction) {
    return this._character.reverseDir(direction);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //
  // The interpreter for running event commands.

  var Alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command.toLowerCase() === "qabs") {
      var id;
      var chara;
      if (args[0].toLowerCase() === "event") {
        id = this.eventId();
        chara = $gameMap.event(id);
      }

      if (args[0].toLowerCase() === "player") {
        id = 0;
        chara = $gamePlayer;
      }

      if (!chara) {
        id = Number(args[0]);
        chara = $gameMap.event(id);
        if (!chara) return;
      }

      if (args[1].toLowerCase() === "usebestskill") {
        var bestTarget = chara.bestTarget();
        if (!bestTarget) return;
        chara._radian = chara.radianTowards(bestTarget);
        var skillId = QuasiABS.AI.bestAction(id);
        chara.useSkill(skillId);
        return;
      }

      if (args[1].toLowerCase() === "useskill") {
        var skillId = Number(args[2]) || 0;
        chara.useSkill(skillId);
        return;
      }

      if (args[1].toLowerCase() === "forceskill") {
        var skillId = Number(args[2]);
        if (skillId) {
          chara.forceSkill(skillId);
          return;
        }
      }

      if (chara !== $gamePlayer && args[1].toLowerCase() === "disable") {
        chara.disableEnemy();
        return;
      }
    }
    Alias_Game_Interpreter_pluginCommand.call(this, command, args);
  };

  //-----------------------------------------------------------------------------
  // Changes to existing Game Classes

  var Alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    Alias_Game_Map_setup.call(this, mapId);
    if (mapId !== QuasiABS.Manager._mapId) QuasiABS.Manager.clear();
  };

  var Alias_Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    Alias_Game_Map_update.call(this, sceneActive);
    if (QuasiABS._needsUncompress) {
      this.uncompressBattlers();
      QuasiABS._needsUncompress = false;
    }
  };

  Game_Map.prototype.compressBattlers = function() {
    for (i = 0, j = this.events().length; i < j; i++) {
      if (this.events()[i]._battler) {
        var oldRespawn = this.events()[i]._respawn;
        this.events()[i].clearABS();
        this.events()[i]._battler = null;
        this.events()[i]._respawn = oldRespawn;
      }
      if (this.events()[i].constructor === Game_Loot) {
        QuasiABS.Manager.removePicture(this.events()[i]._itemIcon);
        this.events()[i]._itemIcon = null;
        this.events()[i]._decay = 0;
      }
    }
    $gamePlayer.clearABS();
    QuasiABS.Manager.clear();
  };

  Game_Map.prototype.uncompressBattlers = function() {
    for (i = 0, j = this.events().length; i < j; i++) {
      if (this.events()[i]._respawn >= 0) {
        var wasDead = true;
        var oldRespawn = this.events()[i]._respawn;
      }
      this.events()[i].setupBattler();
      if (wasDead) {
        this.events()[i].clearABS();
        this.events()[i]._battler = null;
        this.events()[i]._respawn = oldRespawn;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //
  // The game object class for a battle action.

  var Alias_Game_Action_setSubject = Game_Action.prototype.setSubject;
  Game_Action.prototype.setSubject = function(subject) {
    Alias_Game_Action_setSubject.call(this, subject);
    this._realSubject = subject;
  };

  var Alias_Game_Action_subject = Game_Action.prototype.subject;
  Game_Action.prototype.subject = function() {
    if (this._isAbs) return this._realSubject;
    return Alias_Game_Action_subject.call(this);
  };

  Game_Action.prototype.absApply = function(target) {
    this._isAbs = true;
    var result = target.result();
    this._realSubject.clearResult();
    result.clear();
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (this.item().damage.type > 0) {
      result.critical = (Math.random() < this.itemCri(target));
      var value = this.makeDamageValue(target, result.critical);
      this.executeDamage(target, value);
      target.startDamagePopup();
    }
    this.item().effects.forEach(function(effect) {
      this.applyItemEffect(target, effect);
    }, this);
    this.applyItemUserEffect(target);
    if (Imported.Quasi_QEvents) {
      this.applyQEvent(target);
    } else {
      this.applyGlobal(); // Run common events
    }
    this._isAbs = false;
  };

  Game_Action.prototype.applyQEvent = function(target) {
    var id1 = this.subject().isActor() ? this.subject().actorId() : this.subject().enemyId();
    var id2 = target.isActor() ? target.actorId() : target.enemyId();
    var variables = {
      self: this.subject(),
      target: target,
      selfId: id1,
      targetId: id2
    }
    this.item().effects.forEach(function(effect) {
      if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
        QuasiQEvents.start(effect.dataId, variables);
      }
    }, this);
  };

  TouchInput._onMouseMove = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    this._onMove(x, y);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  // The scene class of the map screen.

  var Alias_Scene_Map_initialize = Scene_Map.prototype.initialize;
  Scene_Map.prototype.initialize = function() {
    Alias_Scene_Map_initialize.call(this);
    this.preloadABS();
  };

  Scene_Map.prototype.preloadABS = function() {
    $gameSystem.preloadSkills();
    // Preload any other stuff here
  };

  var Alias_Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
  Scene_Map.prototype.isMenuCalled = function() {
    if ($gameSystem.anyAbsMouse2()) return Input.isTriggered('menu');
    return Alias_Scene_Map_isMenuCalled(this);
  };

  var Alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    this.updateInsideWindow();
    Alias_Scene_Map_update.call(this);
  };

  Scene_Map.prototype.updateInsideWindow = function() {
    var inside = 0;
    for (child of this._windowLayer.children) {
      if (child.visible && child.isOpen() && child.insideWindowArea()) {
        inside++;
      }
    }
    $gamePlayer._insideWindow = inside > 0;
  };

  //-----------------------------------------------------------------------------
  // Scene_Save
  //
  // The scene class of the save screen.

  var Alias_Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
  Scene_Save.prototype.onSavefileOk = function() {
    $gameMap.compressBattlers();
    Alias_Scene_Save_onSavefileOk.call(this);
    $gameMap.uncompressBattlers();
  };

  var Alias_Scene_Load_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
  Scene_Load.prototype.reloadMapIfUpdated = function() {
    Alias_Scene_Load_reloadMapIfUpdated.call(this);
    QuasiABS._needsUncompress = true;
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //
  // The game object class for the system data.

  // Store some ABS settings in Game_System so values can be changed
  // ingame and be remembered when loaded.
  var Alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    Alias_Game_System_initialize.call(this);
    // Might move quickTarget and towardsMouse into ConfigManager so
    // they're global settings instead of different per save
    this._quickTarget  = QuasiABS.quickTarget;
    this._towardsMouse = QuasiABS.towardsMouse;
    this._absKeys    = JSON.parse(JSON.stringify(QuasiABS.skillKey)); // Clones the obj
    this._absWeaponKeys = {};
    this._absEnabled = true;
    this._disabledEnemies = {};
  };

  Game_System.prototype.disableEnemy = function(mapId, eventId) {
    if (!this._disabledEnemies[mapId]) {
      this._disabledEnemies[mapId] = [];
    }
    this._disabledEnemies[mapId][eventId] = true;
  };

  Game_System.prototype.enableEnemy = function(mapId, eventId) {
    if (!this._disabledEnemies[mapId]) {
      this._disabledEnemies[mapId] = [];
    }
    this._disabledEnemies[mapId][eventId] = false;
  };

  Game_System.prototype.isDisabled = function(mapId, eventId) {
    if (!this._disabledEnemies[mapId]) {
      return false;
    }
    return this._disabledEnemies[mapId][eventId];
  };

  Game_System.prototype.loadClassABSKeys = function() {
    if (!$gameParty.leader()) return;
    var playerClass = $gameParty.leader().currentClass();
    var classKeys = /<skillKeys>([\s\S]*)<\/skillKeys>/i.exec(playerClass.note);
    if (classKeys && classKeys[1].trim() !== "") {
      var newKeys = QuasiABS.stringToSkillKeyObj(classKeys[1]);
      for (var key in this._absKeys) {
        if (!this._absKeys.hasOwnProperty(key)) continue;
        if (!newKeys[key]) {
          newKeys[key] = {
            input: this._absKeys[key].input,
            rebind: this._absKeys[key].rebind,
            skillId: null
          };
        }
        this._absKeys[key] = newKeys[key];
      }
      this.preloadSkills();
    }
  };

  Game_System.prototype.absKeys = function() {
    var obj = {};
    for (var key in this._absKeys) {
      if (!this._absKeys.hasOwnProperty(key)) continue;
      obj[key] = this._absKeys[key];
    }
    for (var key in this._absWeaponKeys) {
      if (!this._absWeaponKeys.hasOwnProperty(key)) continue;
      obj[key] = this._absWeaponKeys[key];
    }
    return obj;
  };

  Game_System.prototype.changeABSSkill = function(skillNumber, skillId, forced) {
    if (!this._absKeys[skillNumber]) return;
    if (!forced && !this._absKeys[skillNumber].rebind) return;
    for (var key in this._absKeys) {
      if (!this._absKeys.hasOwnProperty(key)) continue;
      if (this._absKeys[key].skillId === skillId) {
        if (!this._absKeys[key].rebind) return;
        this._absKeys[key].skillId = null;
      }
    }
    this._absKeys[skillNumber].skillId = skillId;
    this.preloadSkills();
  };

  Game_System.prototype.changeABSWeaponSkills = function(skillSet) {
    this._absWeaponKeys = skillSet;
    this.preloadSkills();
  };

  Game_System.prototype.changeABSSkillInput = function(skillNumber, input) {
    if (!this._absKeys[skillNumber]) return;
    for (var key in this._absKeys) {
      if (!this._absKeys.hasOwnProperty(key)) continue;
      if (this._absKeys[key].input === input) {
        this_.absKeys[key].input = "";
      }
    }
    this._absKeys[skillNumber].input = input;
  };

  // Goes through every skill in the players abs keys
  // and preloads the skills animation as well as any animations
  // in the sequence.
  Game_System.prototype.preloadSkills = function() {
    var keys = this.absKeys();
    for (var key in keys) {
      if (!keys.hasOwnProperty(key)) continue;
      var skill = $dataSkills[keys[key].skillId];
      if (skill) {
        var aniId = skill.animationId;
        aniId = aniId < 0 ? 1 : aniId;
        var ani = $dataAnimations[aniId];
        if (ani) {
          ImageManager.loadAnimation(ani.animation1Name, ani.animation1Hue);
          ImageManager.loadAnimation(ani.animation2Name, ani.animation2Hue);
        }
        var sequence = QuasiABS.getSkillSequence(skill);
        sequence.forEach(function(action) {
          var ani = /^animation(.*)/i.exec(action);
          //var pic = /^picture(.*)/i.exec(action); // Already preloaded?
          if (ani) {
            ani = ani[1].trim();
            ani = $dataAnimations[ani];
            if (ani) {
              ImageManager.loadAnimation(ani.animation1Name, ani.animation1Hue);
              ImageManager.loadAnimation(ani.animation2Name, ani.animation2Hue);
            }
          }
        });
      }
    }
  };

  Game_System.prototype.anyAbsMouse = function() {
    if (typeof this._absMouse1 === "undefined") {
      this.checkAbsMouse();
    }
    return this._absMouse1;
  };

  Game_System.prototype.anyAbsMouse2 = function() {
    if (typeof this._absMouse2 === "undefined") {
      this.checkAbsMouse();
    }
    return this._absMouse2;
  };

  Game_System.prototype.checkAbsMouse = function() {
    this._absMouse1 = false;
    this._absMouse2 = false;
    var keys = this.absKeys();
    for (var key in keys) {
      if (!keys.hasOwnProperty(key)) continue;
      if (keys[key].input === "mouse1") {
        this._absMouse1 = true;
      }
      if (keys[key].input === "mouse2") {
        this._absMouse2 = true;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Battler
  //
  // The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
  // and actions.

  var Alias_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    Alias_Game_Battler_initMembers.call(this);
    this._isStunned = 0;
    this._moveSpeed = 0;
    this._damageQueue = [];
  };

  var Alias_Game_Battler_startDamagePopup = Game_Battler.prototype.startDamagePopup;
  Game_Battler.prototype.startDamagePopup = function() {
    if (!QuasiABS.showDmg) return;
    var result = JSON.parse(JSON.stringify(this._result)); // clone
    this._damageQueue.push(result);
    Alias_Game_Battler_startDamagePopup.call(this);
  };

  Game_Battler.prototype.updateABS = function() {
    for (var i = 0; i < this.states().length; i++) {
      this.updateStateSteps(this.states()[i]);
    }
    //this.showAddedStates();   //Currently does nothing, so no need to run it
    //this.showRemovedStates(); //Currently does nothing, so no need to run it
  };

  Game_Battler.prototype.stepsForTurn = function() {
    return 60;
  };

  Game_Battler.prototype.updateStateSteps = function(state) {
    if (!state.removeByWalking) return;
    if (this._stateSteps[state.id] >= 0) {
      if (this._stateSteps[state.id] % this.stepsForTurn() === 0) {
        this.onTurnEnd();
        this.result().damageIcon = $dataStates[state.id].iconIndex;
        this.startDamagePopup();
        if (this._stateSteps[state.id] === 0) this.removeState(state.id);
      }
      this._stateSteps[state.id]--;
    }
  };

  Game_Battler.prototype.showAddedStates = function() {
    this.result().addedStateObjects().forEach(function(state) {
      // does nothing
    }, this);
  };

  Game_Battler.prototype.showRemovedStates = function() {
    this.result().removedStateObjects().forEach(function(state) {
      // Popup that state was removed?
    }, this);
  };

  var Alias_Game_Battler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function(stateId) {
    if (this.isStateAffected(stateId)) {
      if ($dataStates[stateId].meta.moveSpeed) {
        this._moveSpeed -= Number($dataStates[stateId].meta.moveSpeed) || 0;
      }
      if ($dataStates[stateId].meta.stun) {
        this._isStunned--;
      }
    }
    Alias_Game_Battler_removeState.call(this, stateId);
  };

  Game_Battler.prototype.moveSpeed = function() {
    return this._moveSpeed;
  };

  Game_Battler.prototype.isStunned = function() {
    return this._isStunned > 0
  };

  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //
  // The superclass of Game_Battler. It mainly contains parameters calculation.

  var Alias_Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
  Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    Alias_Game_BattlerBase_resetStateCounts.call(this, stateId);
    this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove || 0;
  };

  var Alias_Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function(stateId) {
    Alias_Game_BattlerBase_addNewState.call(this, stateId);
    if ($dataStates[stateId].meta.moveSpeed) {
      this._moveSpeed += Number($dataStates[stateId].meta.moveSpeed) || 0;
    }
    if ($dataStates[stateId].meta.stun) {
      this._isStunned++;
    }
  };

  var Alias_Game_ActionResult_clear = Game_ActionResult.prototype.clear;
  Game_ActionResult.prototype.clear = function() {
    Alias_Game_ActionResult_clear.call(this);
    this.damageIcon = null;
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //
  // The game object class for an actor.

  var Alias_Game_Actor_changeClass = Game_Actor.prototype.changeClass;
  Game_Actor.prototype.changeClass = function(classId, keepExp) {
    Alias_Game_Actor_changeClass.call(this, classId, keepExp);
    if (this === $gameParty.leader()) $gameSystem.loadClassABSKeys();
  };

  var Alias_Game_Actor_initEquips = Game_Actor.prototype.initEquips;
  Game_Actor.prototype.initEquips = function(equips) {
    Alias_Game_Actor_initEquips.call(this, equips);
    this.initWeaponSkills();
  };

  Game_Actor.prototype.initWeaponSkills = function() {
    if (this === $gameParty.leader()) {
      for (var i = 0; i < this._equips.length; i++) {
        if (this._equips[i].object()) {
          var equipId = this._equips[i].object().baseItemId || this._equips[i].object().id;
          if (this._equips[i].isWeapon() && equipId) {
            this.changeWeaponSkill(equipId);
          }
        }
      }
    }
  };

  var Alias_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function(slotId, item) {
    var oldId, equipId = 0;
    var wasWeapon;
    if (this._equips[slotId] && this._equips[slotId].object()) {
      oldId = this._equips[slotId].object().baseItemId || this._equips[slotId].object().id;
      wasWeapon = DataManager.isWeapon(this._equips[slotId].object());
    }
    Alias_Game_Actor_changeEquip.call(this, slotId, item);
    if (this._equips[slotId] && this._equips[slotId].object()) {
      equipId = this._equips[slotId].object().baseItemId || this._equips[slotId].object().id;
    }
    if (equipId !== oldId && this._equips[slotId].isWeapon()) {
      this.changeWeaponSkill(equipId);
    }
    if (equipId === 0 && wasWeapon) {
      this.changeWeaponSkill(0);
    }
  };

  Game_Actor.prototype.changeWeaponSkill = function(id) {
    if (this !== $gameParty.leader()) return;
    var skills = id ? QuasiABS.weaponSkills(id) : {};
    $gameSystem.changeABSWeaponSkills(skills);
  };

  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    QuasiABS.Manager.startPopup("level", $gamePlayer.cx(), $gamePlayer.cy(), "Level Up!");
    QuasiABS.Manager.startAnimation(QuasiABS.levelAni, $gamePlayer.cx(), $gamePlayer.cy());
    $gamePlayer.requestAnimation(QuasiABS.levelAni);
    newSkills.forEach(function(skill) {
      //$gameMessage.add(TextManager.obtainSkill.format(skill.name));
      //Popup new skills?
    });
  };

  Game_Actor.prototype.onPlayerWalk = function() {
    this.clearResult();
    this.checkFloorEffect();
  };

  Game_Actor.prototype.updateStateSteps = function(state) {
    Game_Battler.prototype.updateStateSteps.call(this, state);
  };

  Game_Actor.prototype.showAddedStates = function() {
    Game_Battler.prototype.showAddedStates.call(this);
  };

  Game_Actor.prototype.showRemovedStates = function() {
    Game_Battler.prototype.showRemovedStates.call(this);
  };

  Game_Actor.prototype.resetStateCounts = function(stateId) {
    Game_Battler.prototype.resetStateCounts.call(this, stateId);
  };

  Game_Actor.prototype.stepsForTurn = function() {
    return Game_Battler.prototype.stepsForTurn.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Enemy
  //
  // The game object class for an enemy.

  var Alias_Game_Enemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Alias_Game_Enemy_setup.call(this, enemyId, x, y);
    var notes = this.enemy().note;
    this._noai = /<noai>/i.test(notes);
    this._aiRange = this.enemy().meta.range;
    this._noPopup = /<nopopup>/i.test(notes);
    var onDeath = /<ondeath>([\s\S]*)<\/ondeath>/i.exec(notes);
    this._onDeath = onDeath ? onDeath[1] : "";
    this._dontErase = /<donterase>/i.test(notes);
    this._team  = this.enemy().meta.team || 2;
  };

  Game_Enemy.prototype.clearStates = function() {
    Game_Battler.prototype.clearStates.call(this);
    this._stateSteps = {};
  };

  Game_Enemy.prototype.eraseState = function(stateId) {
    Game_Battler.prototype.eraseState.call(this, stateId);
    this._stateSteps[stateId] = null;
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  // The superclass of Game_Character. It handles basic information, such as
  // coordinates and images, shared by all characters.

  var Alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    Alias_Game_CharacterBase_initMembers.call(this);
    this.clearABS();
  };

  Game_CharacterBase.prototype.battler = function() {
    return false;
  };

  Game_CharacterBase.prototype.clearABS = function() {
    if (this._activeSkills && this._activeSkills.length > 0) {
      this.clearSkills();
    }
    this.clearAgro();
    this._activeSkills = [];
    this._skillCooldowns = {};
    this._agroList  = {}; // List of charas that attacked this
    this._agrodList = []; // List of charas that this attacked
    this._inCombat = false;
    this._casting = null;
    this._skillLocked = [];
  };

  Game_CharacterBase.prototype.clearSkills = function() {
    for (var i = this._activeSkills.length - 1; i >= 0; i--) {
      var skill = this._activeSkills[i];
      QuasiABS.Manager.removePicture(skill.picture);
      QuasiABS.Manager.removePicture(skill.trail);
      QuasiABS.Manager.removePicture(skill.pictureCollider);
      this._activeSkills.splice(i, 1);
    }
  };

  /**
   * Returns the team this character is on.
   * Default values:
   * 0 - Neutral
   * 1 - Player
   * 2 - Enemy
   * @return {Number}
   */
  Game_CharacterBase.prototype.team = function() {
    return 0;
  };

  Game_CharacterBase.prototype.isFriendly = function(target) {
    return target.team() === this.team();
  };

  // Agro list contains characters that have attacked this character
  // Gets reset when out of combat
  Game_CharacterBase.prototype.addAgro = function(chara, skill) {
    var realChara;
    if (chara === 0) realChara = $gamePlayer;
    if (chara > 0)   realChara = $gameMap.event(chara);
    if (realChara === this) return;
    if (this.isFriendly(realChara)) return;
    this._agroList[chara] = this._agroList[chara] || 0;
    this._agroList[chara] += skill && skill.agroPoints ? skill.agroPoints : 1;
    this._inCombat = true;
    var id = this === $gamePlayer ? 0 : this.eventId();
    if (!realChara._agrodList.contains(id)) realChara._agrodList.push(id);
    realChara._inCombat = true;
  };

  // Should be called on death / moving too far
  Game_CharacterBase.prototype.removeAgro = function(chara) {
    this._agroList[chara] = null;
    var i = this._agrodList.indexOf(chara);
    if (i !== -1) this._agrodList.splice(i, 1);
    this._inCombat = this.agroLength() + this._agrodList.length > 0;
    if (!this._inCombat && this.endCombat) {
      this.endCombat();
    }
  };

  Game_CharacterBase.prototype.clearAgro = function() {
    for (var charaId in this._agroList) {
      if (!this._agroList.hasOwnProperty(charaId)) continue;
      var chara = charaId == 0 ? $gamePlayer : $gameMap.event(charaId);
      chara.removeAgro(this === $gamePlayer ? 0 : this.eventId());
    }
    this._agroList = {};
    this._inCombat = false;
  };

  Game_CharacterBase.prototype.agroLength = function() {
    var length = 0;
    for (var agro in this._agroList) {
      if (!this._agroList.hasOwnProperty(agro)) continue;
      length += this._agroList[agro];
    }
    return length;
  };

  Game_CharacterBase.prototype.bestTarget = function() {
    var mostAgro = 0;
    var bestChara = null;
    for (var chara in this._agroList) {
      if (!this._agroList.hasOwnProperty(chara)) continue;
      if (this._agroList[chara] > mostAgro) {
        mostAgro = this._agroList[chara];
        bestChara = Number(chara);
      }
    }
    if (!bestChara || bestChara === 0) {
      if (bestChara === null && this.team() !== 2) {
        return null;
      }
      return $gamePlayer
    }
    return $gameMap.event(bestChara);
  };

  Game_CharacterBase.prototype.inCombat = function() {
    if (!this.battler()) return false;
    return this._inCombat;
  };

  var Alias_Game_CharacterBase_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
  Game_CharacterBase.prototype.realMoveSpeed = function() {
    var value = Alias_Game_CharacterBase_realMoveSpeed.call(this);
    if (this.battler()) {
      value += this.battler().moveSpeed();
    };
    return value;
  };

  var Alias_Game_CharacterBase_update = Game_CharacterBase.prototype.update;
  Game_CharacterBase.prototype.update = function() {
    this.updateABS();
    Alias_Game_CharacterBase_update.call(this);
  };

  Game_CharacterBase.prototype.updateABS = function() {
    if (this.battler())  {
      if (this.battler().hp <= 0) return this.onDeath();
      this.updateSkills();
      this.battler().updateABS();
    }
  };

  // Placeholder method, overwrittein in Game_Player and Game_Event
  Game_CharacterBase.prototype.onDeath = function() {
  };

  Game_CharacterBase.prototype.updateSkills = function() {
    if (this._groundtargeting) this.updateTargeting();
    if (this._activeSkills.length > 0) this.updateSkillSequence();
    for (var id in this._skillCooldowns) {
      if (this._skillCooldowns.hasOwnProperty(id)) {
        if (this._skillCooldowns[id] === 0) {
           delete this._skillCooldowns[id];
        } else {
          this._skillCooldowns[id]--;
        }
      }
    }
  };

  Game_CharacterBase.prototype.updateTargeting = function() {
    return this.onTargetingEnd();
  };

  Game_CharacterBase.prototype.onTargetingEnd = function() {
    var skill = this._groundtargeting;
    this.battler().paySkillCost(skill.data);
    this._activeSkills.push(skill);
    this._skillCooldowns[skill.data.id] = skill.settings.cooldown;
    SceneManager._scene.addTempCollider(skill.collider, skill.sequence.length);
    QuasiABS.Manager.removePicture(this._groundtargeting.picture);
    this._groundtargeting = null;
    this._selecttargeting = null;
  };

  Game_CharacterBase.prototype.updateSkillSequence = function() {
    for (var i = this._activeSkills.length - 1; i >= 0; i--) {
      var skill = this._activeSkills[i];
      skill.sequencer.update();
    };
  };

  Game_CharacterBase.prototype.isCasting = function() {
    if (this._casting) {
      if (this._casting.break) {
        this._casting = null;
        return false;
      }
      return true;
    }
    return false;
  };

  Game_CharacterBase.prototype.canInputSkill = function() {
    if (Imported.Quasi_MovementPlus && this._globalLocked) {
      return false;
    }
    if ($gameMap.isEventRunning()) return false;
    if (!$gameSystem._absEnabled) return false;
    if (!this.battler()) return false;
    if (this.battler().isDead()) return false;
    if (this.battler().isStunned()) return false;
    if (this.isCasting()) return false;
    if (this._skillLocked.length > 0) return false;
    return true;
  };

  Game_CharacterBase.prototype.canUseSkill = function(id) {
    var skill = $dataSkills[id];
    return this.usableSkills().contains(id) && this.battler().canPaySkillCost(skill);
  };

  Game_CharacterBase.prototype.usableSkills = function() {
    return [];
  };

  // Checks if skill can be used before forcing it.
  Game_CharacterBase.prototype.useSkill = function(skillId) {
    if (!this.canInputSkill()) return;
    if (!this.canUseSkill(skillId)) return;
    if (this._groundtargeting) {
      QuasiABS.Manager.removePicture(this._groundtargeting.picture);
      this._groundtargeting = null;
      this._selecttargeting = null;
    }
    this.beforeSkill(skillId);
    this.forceSkill(skillId);
    this.afterSkill(skillId);
  };

  Game_CharacterBase.prototype.beforeSkill = function(skillId) {
    // Placeholder method, might need for addons
    // This function only runs from .useSkill() not .forceSkill()
    var notes = $dataSkills[skillId].note;
    var before = /<beforeskill>([\s\S]*)<\/beforeskill>/i.exec(notes);
    if (before) {
      // Change to use the skill sequencer, like the onDamage tag does?
      eval(before[1]);
    }
  };

  Game_CharacterBase.prototype.afterSkill = function(skillId) {
    // Placeholder method, might need for addons
    // This function only runs from .useSkill() not .forceSkill()
    if (!this._groundtargeting) {
      this.battler().paySkillCost($dataSkills[skillId]);
    }
  };

  // Sets up the skill object and gets it's abs settings
  Game_CharacterBase.prototype.forceSkill = function(skillId, forced) {
    if (!this.battler()) return;
    var skill = {};
    skill.data = $dataSkills[skillId];
    skill.settings = QuasiABS.getSkillSettings(skill.data);
    skill.sequence = QuasiABS.getSkillSequence(skill.data).slice(); // clone
    skill.ondmg    = QuasiABS.getSkillOnDamage(skill.data);
    if (!skill.settings || skill.data.scope === 0) return;
    skill.collider  = this.makeSkillCollider(skill.settings);
    skill.sequencer = new Skill_Sequencer(this, skill);
    skill.userDirection = this._direction;
    skill.radian = this._radian || this.directionToRadian(this._direction);
    this._radian = null;
    skill.direction = this._direction;
    skill.targetsHit = [];
    skill.forced = forced;
    var oldLevel = this._passabilityLevel;
    this._passabilityLevel = skill.settings.passabilityLevel;
    skill.passableColors = this.passableColors().slice();
    this._passabilityLevel = oldLevel;
    if (skill.settings.groundtarget || skill.settings.selecttarget) {
      this.makeTargetingSkill(skill);
      return;
    }
    this._activeSkills.push(skill);
    this._skillCooldowns[skillId] = skill.settings.cooldown;
    SceneManager._scene.addTempCollider(skill.collider, skill.sequence.length + 60);
  };

  Game_CharacterBase.prototype.makeTargetingSkill = function(skill) {
    this._groundtargeting = skill;
    this._selecttargeting = this.constructor === Game_Event ? true : skill.settings.selecttarget;
    var collider = skill.collider;
    var diameter = skill.settings.range * 2;
    skill.targeting = new QuasiMovement.Circle_Collider(diameter, diameter);
    skill.targeting.moveto(this.cx() - diameter / 2, this.cy() - diameter / 2);
    SceneManager._scene.addTempCollider(skill.targeting, 200);
    skill.collider = skill.targeting;
    this._groundtargeting.targets = QuasiABS.Manager.getTargets(skill, this);
    skill.collider = collider;
    skill.picture = new Sprite_SkillCollider(skill.collider);
    if (this._selecttargeting) {
      // If there was no target, cancel skill
      if (this._groundtargeting.targets.length === 0 ) {
        this._groundtargeting = null;
        this._selecttargeting = null;
        QuasiABS.Manager.removePicture(skill.picture);
        return;
      }
      var target = this._groundtargeting.targets[0];
      var w = skill.collider.width;
      var h = skill.collider.height;
      var x = target.cx() - w / 2;
      var y = target.cy() - h / 2;
      skill.collider.color = 0x00ff00;
      skill.collider.moveto(x, y);
      skill.picture.move(x + w / 2, y + h / 2);
      skill.index = 0;
    } else {
      var x = $gameMap.canvasToMapPX(TouchInput.x) - skill.collider.width / 2;
      var y = $gameMap.canvasToMapPY(TouchInput.y) - skill.collider.height / 2;
      skill.picture.move(x, y);
    }
    QuasiABS.Manager.addPicture(skill.picture);
  };

  /**
   * Creates a collider for the skill based off its settings
   * @param {object} settings
   *        The abs settings for the skill
   * @return Box_Collider || Circle_Collider
   */
  Game_CharacterBase.prototype.makeSkillCollider = function(settings) {
    settings.collider = settings.collider || ["box", this.collider().width, this.collider().height];
    var collider, w, h;
    var width    =  w = settings.collider[1];
    var height   =  h = settings.collider[2];
    var infront  = settings.infront === true;
    var rotate   = settings.rotate === true;
    var offset   = Number(settings.offset || 0);
    var horz     = [4, 6].contains(this._direction);
    if (settings.collider[0].toLowerCase() === "box") {
      collider = new QuasiMovement.Box_Collider(width, height);
    } else if (settings.collider[0].toLowerCase() === "circle") {
      collider = new QuasiMovement.Circle_Collider(width, height);
    }
    if (rotate) {
      if (QuasiABS.radianAtks) {
        collider.rotate(Math.PI / 2 - this._radian);
      } else {
        collider.rotate(Math.PI / 2 - this.directionToRadian(this._direction));
      }
    }
    var x1 = this.cx() - collider.center.x;
    var y1 = this.cy() - collider.center.y;
    if (infront) {
      var w1 = this.collider().width;
      var w2 = collider.width;
      var h1 = this.collider().height;
      var h2 = collider.height;
      var rad = this._radian || this.directionToRadian(this._direction);
      var w3 = Math.cos(rad) * w1 / 2 + Math.cos(rad) * w2 / 2;
      var h3 = -Math.sin(rad) * h1 / 2 - Math.sin(rad) * h2 / 2;;
      x1 += w3;
      y1 += h3;
    }
    collider.moveto(x1, y1);
    return collider;
  };

  var Alias_Game_Character_canMove = Game_Character.prototype.canMove;
  Game_Character.prototype.canMove = function() {
    if (this.battler() && this._skillLocked.length > 0) return false;
    return Alias_Game_Character_canMove.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  // The game object class for the player. It contains event starting
  // determinants and map scrolling functions.

  var Alias_Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    Alias_Game_Player_refresh.call(this);
    if (!this.battler()) this.setupBattler();
  };

  Game_Player.prototype.battler = function() {
    return this.actor();
  };

  Game_Player.prototype.setupBattler = function() {
    if (!this.battler()) return;
    this._battlerId = this.battler()._actorId;
    this.battler()._charaId = 0;
    $gameSystem.loadClassABSKeys();
    $gameSystem.changeABSWeaponSkills({});
    this.battler().initWeaponSkills();
    this._isDead = false;
  };

  Game_Player.prototype.team = function() {
    return 1;
  };

  var Alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if (this.battler() && this._skillLocked.length > 0) return false;
    if (QuasiABS.lockTargeting && this._groundtargeting) return false;
    return Alias_Game_Player_canMove.call(this);
  };

  Game_Player.prototype.canInput = function() {
    return this.canInputSkill() && !this._groundtargeting;
  };

  Game_Player.prototype.canClick = function() {
    return !this._insideWindow;
  };

  Game_Player.prototype.usableSkills = function() {
    return this.battler().skills().filter(function(skill) {
      if (this._skillCooldowns[skill.id]) return;
      return true;
    }, this).map(function(skill) {
      return skill.id;
    });
  };

  Game_Player.prototype.onDeath = function() {
    this.clearABS();
    this._isDead = true;
    SceneManager.goto(Scene_Gameover);
  };

  var Alias_Game_Player_updateDashing = Game_Player.prototype.updateDashing;
  Game_Player.prototype.updateDashing = function() {
    /*
    if (this.inCombat()) {
      this._dashing = false;
      return;
    }
    */
    Alias_Game_Player_updateDashing.call(this);
  };

  Game_Player.prototype.updateABS = function() {
    if(this._isDead) return;
    if (this.battler() && this.canInput()) this.updateInput();
    Game_CharacterBase.prototype.updateABS.call(this);
    if (this._battlerId !== this.actor()._actorId) {
      this.clearABS();
      this.setupBattler();
    }
  };

  Game_Player.prototype.onPositionChange = function() {
    Game_CharacterBase.prototype.onPositionChange.call(this);
    if (this._selecttargeting) {
      QuasiABS.Manager.removePicture(this._groundtargeting.picture);
      this._groundtargeting = null;
      this._selecttargeting = null;
    }
  };

  Game_Player.prototype.updateTargeting = function() {
    return this._selecttargeting ? this.updateSelectTargeting() : this.updateGroundTargeting();
  };

  Game_Player.prototype.updateSelectTargeting = function() {
    if (Input.isTriggered("pageup")) {
      this._groundtargeting.index++;
      this.updateSkillTarget();
    }
    if (Input.isTriggered("pagedown")) {
      this._groundtargeting.index--;
      this.updateSkillTarget();
    }
    if (Input.isTriggered("ok")) {
      this.onTargetingEnd();
    }
    if (Input.isTriggered("escape")) {
      Input.clear(); // Prevents menu
      QuasiABS.Manager.removePicture(this._groundtargeting.picture);
      this._groundtargeting = null;
      this._selecttargeting = null;
      return;
    }
  };

  // Moves skill to current target
  // Only called when index is changed
  Game_Player.prototype.updateSkillTarget = function() {
    var skill  = this._groundtargeting;
    if (skill.index < 0) skill.index = skill.targets.length - 1;
    if (skill.index >= skill.targets.length) skill.index = 0;
    var target = skill.targets[skill.index];
    var w = skill.collider.width;
    var h = skill.collider.height;
    var x = target.cx() - w / 2;
    var y = target.cy() - h / 2;
    skill.collider.moveto(x, y);
    // Picture is anchored at center, so we need to shift it to
    // line up with the real position
    skill.picture.move(x + w / 2, y + h / 2);
  };

  Game_Player.prototype.updateGroundTargeting = function() {
    this.updateGroundTargetingPosition();
    if (Input.isTriggered("escape") || TouchInput.isCancelled()) {
      TouchInput.clear(); // Prevents Menu
      Input.clear();
      QuasiABS.Manager.removePicture(this._groundtargeting.picture);
      this._groundtargeting = null;
      return;
    }
    if (Input.isTriggered("ok") || (this.canClick() && TouchInput.isTriggered()) ||
        $gameSystem._quickTarget) {
      if (!this._groundtargeting.isOk) {
        TouchInput.clear();
        Input.clear();
        QuasiABS.Manager.removePicture(this._groundtargeting.picture);
        this._groundtargeting = null;
      } else {
        this.onTargetingEnd();
      }
      return;
    }
  };

  Game_Player.prototype.updateGroundTargetingPosition = function() {
    var skill = this._groundtargeting;
    var w = skill.collider.width;
    var h = skill.collider.height;
    var x1 = $gameMap.canvasToMapPX(TouchInput.x);
    var y1 = $gameMap.canvasToMapPY(TouchInput.y);
    var x2 = x1 - w / 2;
    var y2 = y1 - h / 2;
    this.setDirection(this.directionTowards(x1, y1));
    skill.collider.moveto(x2, y2);
    // Picture is anchored at center, so we need to shift it to
    // line up with the real position
    skill.picture.move(x2 + w / 2, y2 + h / 2);
    var dx = Math.abs(this.cx() - x2 - w / 2);
    var dy = Math.abs(this.cy() - y2 - h / 2);
    var distance = Math.sqrt(dx * dx + dy * dy);
    skill.isOk = distance <= skill.settings.range;
    skill.collider.color = skill.isOk ? 0x00ff00 : 0xff0000;
  };

  Game_Player.prototype.updateInput = function() {
    var absKeys = $gameSystem.absKeys();
    for (var key in absKeys) {
      if (!absKeys.hasOwnProperty(key)) continue;
      if (!absKeys[key]) continue;
      var input = absKeys[key].input;
      if (Input.isTriggered(input)) {
        this.useSkill(absKeys[key].skillId);
      }
      if (input === "mouse1" && TouchInput.isTriggered() && this.canClick()) {
        TouchInput._triggered = false;
        this.useSkill(absKeys[key].skillId);
      }
      if (input === "mouse2" && TouchInput.isCancelled() && this.canClick()) {
        TouchInput._cancelled = false;
        this.useSkill(absKeys[key].skillId);
      }
    }
  };

  // Only runs when this.useSkill is called, not when .forceSkill
  Game_Player.prototype.beforeSkill = function(skillId) {
    var skill = $dataSkills[skillId];
    if ($gameSystem._towardsMouse && !skill.meta.dontTurn) {
      var x = $gameMap.canvasToMapPX(TouchInput.x);
      var y = $gameMap.canvasToMapPY(TouchInput.y);
      var dir = this.directionTowards(x, y);
      if (dir === 1) {
        if (this._direction !== 4 && this._direction !== 2) {
          this.setDirection(this.reverseDir(this._direction));
        }
        this._diagonal = 1;
      } if (dir === 3) {
        if (this._direction !== 6 && this._direction !== 2) {
          this.setDirection(this.reverseDir(this._direction));
        }
        this._diagonal = 3;
      } if (dir === 7) {
        if (this._direction !== 4 && this._direction !== 8) {
          this.setDirection(this.reverseDir(this._direction));
        }
        this._diagonal = 7;
      } if (dir === 9) {
        if (this._direction !== 6 && this._direction !== 8) {
          this.setDirection(this.reverseDir(this._direction));
        }
        this._diagonal = 9;
      } else {
        this._diagonal = false;
        this.setDirection(dir);
      }
    }
    if (QuasiABS.radianAtks) {
      var x1 = $gameMap.canvasToMapPX(TouchInput.x);
      var y1 = $gameMap.canvasToMapPY(TouchInput.y);
      var x2 = this.cx();
      var y2 = this.cy();
      this._radian = Math.atan2(-(y1 - y2), x1 - x2);
      this._radian += this._radian < 0 ? 2 * Math.PI : 0;
    }
    Game_CharacterBase.prototype.beforeSkill.call(this, skillId);
  };

  Game_Player.prototype.startPathFind = function(goalX, goalY) {
    if ($gameSystem.anyAbsMouse()) return $gameTemp.clearDestination();
    if (this._groundtargeting)     return $gameTemp.clearDestination();
    return Game_Character.prototype.startPathFind.call(this, goalX, goalY);
  };

  //-----------------------------------------------------------------------------
  // Game_EventCopy

  Game_EventCopy.prototype = Object.create(Game_Event.prototype);
  Game_EventCopy.prototype.constructor = Game_Event;

  Game_EventCopy.prototype.initialize = function(mapId, eventData) {
    this._eventData = eventData;
    Game_Event.prototype.initialize.call(this, mapId, null);
  };

  Game_EventCopy.prototype.event = function() {
    return this._eventData;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  // The game object class for an event. It contains functionality for event page
  // switching and running parallel process events.

  var Alias_Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function(mapId, eventId, eventData) {
    Alias_Game_Event_initialize.call(this, mapId, eventId);
    this.setupBattler();
  };

  Game_Event.prototype.battler = function() {
    if (this._battlerId) {
      return this._battler;
    }
    return false;
  };

  Game_Event.prototype.setupBattler = function() {
    var foe = /<enemy:([0-9]*?)>/i.exec(this.notes());
    var disabled = $gameSystem.isDisabled(this._mapId, this._eventId);
    if (foe && !disabled) {
      this.clearABS();
      this._battlerId = foe[1];
      this._battler = new Game_Enemy(this._battlerId, 0, 0);
      this._battler._charaId = this.eventId();
      this._actions = this._battler.enemy().actions;
      this._skillList = [];
      this._aiRange = this._battler.aiRange || QuasiABS.aiLength;
      this._aiWait1 = 0; // wait for action
      if (QuasiABS.aiSight && !this._battler._noai) {
        this.setupAISight();
      }
      for (var i = 0; i < this._actions.length; i++) {
        this._skillList.push(this._actions[i].skillId);
      }
      this._respawn = -1;
      this._onDeath = this._battler._onDeath;
      this._noPopup = this._battler._noPopup;
      this._dontErase = this._battler._dontErase;
      this._team = this._battler._team;
    }
  };

  Game_Event.prototype.setupAISight = function() {
    this._sightSettings = {};
    this._sightSettings.length = this._aiRange;
    this._sightSettings.target = $gamePlayer;
    this._sightSettings.switch = [this._mapId, this._eventId, "E"];
    this._sightSettings.shape  = "circle";
    this._sightSettings.update = true;
    this._hasSight = true;
  };

  Game_Event.prototype.disableEnemy = function() {
    $gameSystem.disableEnemy(this._mapId, this._eventId);
    this.clearABS();
    this._battler = null;
  };

  Game_Event.prototype.team = function() {
    return this._battler ? this._team : 0;
  };

  Game_Event.prototype.hasAI = function() {
    return !this._battler._noai;
  };

  Game_Event.prototype.usableSkills = function() {
    if (!this._battler) return [];
    return this._skillList.filter(function(skillId) {
      if (this._skillCooldowns[skillId]) return false;
      return true;
    }, this);
  };

  Game_Event.prototype.radianTowardsPlayer = function() {
    var x1 = $gamePlayer.cx();
    var y1 = $gamePlayer.cy();
    var x2 = this.cx();
    var y2 = this.cy();
    this._radian = Math.atan2(-(y1 - y2), x1 - x2);
    this._radian += this._radian < 0 ? 2 * Math.PI : 0;
  };

  Game_Event.prototype.updateABS = function() {
    Game_CharacterBase.prototype.updateABS.call(this);
    if (this._battler) this.updateAI();
    if (this._respawn >= 0) this.updateRespawn();
  };

  Game_Event.prototype.updateAI = function() {
    if (!this.hasAI() || !this.isNearTheScreen()) return;
    var bestTarget = this.bestTarget();
    if (!bestTarget) return;
    var targetId = bestTarget === $gamePlayer ? 0 : bestTarget.eventId();
    if (this.targetInRange(bestTarget)) {
      // First time going in range
      if (!this._agroList.hasOwnProperty(targetId)) {
        this._aiWait1 = QuasiABS.aiWait1;
        this.addAgro(targetId);
      }
    } else {
      if (this._inCombat) {
        this.endCombat();
      }
      return;
    }
    var bestAction;
    if (this._aiWait1 >= QuasiABS.aiWait1) {
      this._radian = this.radianTowards(bestTarget);
      bestAction = QuasiABS.AI.bestAction(this._eventId);
      this._aiWait1 = 0;
    } else {
      this._aiWait1++;
    }
    if (bestAction) {
      this.useSkill(bestAction);
    } else if (this.canMove()) {
      if (Imported.Quasi_PathFind && QuasiABS.aiAStar) {
        if (!this._isChasing && this._freqCount < this.freqThreshold()) {
          this.pathFindChase(targetId, true);
        }
      } else {
        if (this._freqCount < this.freqThreshold()) {
          this.moveTowardCharacter(bestTarget);
        }
      }
    }
  };

  Game_Event.prototype.endCombat = function() {
    if (Imported.Quasi_PathFind) {
      this.stopChase();
    }
    this._inCombat = false;
    this._moveRouteForcing = false;
    this.restoreMoveRoute();
    if (this.agroLength() > 0) {
      this.clearAgro();
    }
    if (Imported.Quasi_PathFind && QuasiABS.aiAStar) {
      this.pathFindGrid(this.event().x, this.event().y);
    } else {
      this.findRespawnLocation();
    }
    this.refresh();
  };

  Game_Event.prototype.targetInRange = function(target) {
    if (!target) return false;
    if (QuasiABS.aiSight && Imported["Quasi_Sight"]) {
      if (!this._sightSettings) {
        this.setupAISight();
      }
      var prev = this._sightSettings.length;
      if (this._inCombat) {
        this._sightSettings.length = this._aiRange + QuasiMovement.tileSize * 3;
      } else {
        this._sightSettings.length = this._aiRange;
      }
      if (prev !== this._sightSettings.length) {
        this._sight = null;
      }
      if (this._sightSettings.target !== target) {
        if (Imported.Quasi_PathFind) {
          this.stopChase();
        }
        this._sightSettings.target = target;
        this._sight = null;
      }
      if (this.needsSightUpdate()) {
        $gameSelfSwitches.setValue(this._sightSettings.switch, this.checkSight());
      }
      return $gameSelfSwitches.value(this._sightSettings.switch);
    }
    var dx = Math.abs(target.cx() - this.cx());
    var dy = Math.abs(target.cy() - this.cy());
    var range = this._aiRange + (this._inCombat ? 96 : 0);
    if (dx <= range && dy <= range) {
      return true;
    }
    return false;
  };

  Game_Event.prototype.updateRespawn = function() {
    if (this._respawn === 0) {
      this._erased = false;
      this._respawning = false;
      this.setupBattler();
      this.findRespawnLocation();
      this.refresh();
    }
    this._respawn--;
  };

  Game_Event.prototype.findRespawnLocation = function() {
    var x = this.event().x * QuasiMovement.tileSize;
    var y = this.event().y * QuasiMovement.tileSize;
    var dist = this.moveTiles();
    this._through = false;
    while (true) {
      var stop;
      for (var i = 4; i < 5; i++) {
        var dir = i * 2;
        var x2 = $gameMap.roundPXWithDirection(x, dir, dist);
        var y2 = $gameMap.roundPYWithDirection(y, dir, dist);
        if (this.canPixelPass(x2, y2, 5)) {
          stop = true;
          break;
        }
      }
      if (stop) break;
      dist += this.moveTiles();
    }
    this.setPixelPosition(x2, y2);
    this.straighten();
    this.refreshBushDepth();
  };

  Game_Event.prototype.onDeath = function() {
    if (this._onDeath) {
      eval(this._onDeath);
    }
    if (this._agroList[0] > 0) {
      var exp = this.battler().exp();
      $gamePlayer.battler().gainExp(exp);
      if (exp > 0) {
        QuasiABS.Manager.startPopup("exp", $gamePlayer.cx(), $gamePlayer.cy(), "Exp: " + exp);
      }
      this.setupLoot();
    }
    this.clearABS();
    this._respawn = Number(this.battler().enemy().meta.respawn) || -1;
    this._battler = null;
    if (!this._dontErase) {
      this.erase();
    }
  };

  Game_Event.prototype.setupLoot = function() {
    var x, y;
    this.battler().makeDropItems().forEach(function(item) {
      x = this.x + (Math.random() / 2) - (Math.random() / 2);
      y = this.y + (Math.random() / 2) - (Math.random() / 2);
      var type = 0;
      if (DataManager.isWeapon(item)) type = 1;
      if (DataManager.isArmor(item))  type = 2;
      QuasiABS.Manager.createItem(x, y, item.id, type);
    }, this);
    if (this.battler().gold() > 0) {
      x = this.x + (Math.random() / 2) - (Math.random() / 2);
      y = this.y + (Math.random() / 2) - (Math.random() / 2);
      QuasiABS.Manager.createGold(x, y, this.battler().gold());
    }
  };

  Game_Event.prototype.onTargetingEnd = function() {
    var skill  = this._groundtargeting;
    // Selects random target from possible targets
    // Should add an AI function here to select best target
    var target = skill.targets[Math.floor(Math.random() * skill.targets.length)];
    var w = skill.collider.width;
    var h = skill.collider.height;
    var x = target.cx() - w / 2;
    var y = target.cy() - h / 2;
    skill.collider.moveto(x, y);
    skill.picture.move(x + w / 2, y + h / 2);
    Game_CharacterBase.prototype.onTargetingEnd.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Loot
  //
  // The game object class for an enemy loot.

  Game_Loot.prototype = Object.create(Game_Event.prototype);
  Game_Loot.prototype.constructor = Game_Loot;

  Game_Loot.prototype.initialize = function(x, y) {
    Game_Character.prototype.initialize.call(this);
    this._decay = QuasiABS.lootDecay;
    this._eventId = 0;
    this._gold = null;
    this._loot = null;
    this.locate(x, y);
    this.refresh();
    QuasiABS.Manager.addEvent(this);
  };

  Game_Loot.prototype.event = function() {
    return {
      note: ""
    };
  };

  Game_Loot.prototype.setGold = function(value) {
    this._gold = value;
    this.setIcon(QuasiABS.goldIcon);
  };

  Game_Loot.prototype.setItem = function(item) {
    this._loot = item;
    this.setIcon(item.iconIndex);
  };

  Game_Loot.prototype.setIcon = function(iconIndex) {
    this._iconIndex = iconIndex;
    this._itemIcon = new Sprite_Icon(iconIndex);
    this._itemIcon.move(this._px, this._py);
    this._itemIcon.z = 1;
    QuasiABS.Manager.addPicture(this._itemIcon);
  };

  Game_Loot.prototype.page = function() {
    if (!this._lootPage) {
      this._lootPage = {
        conditions: {
          actorId: 1, actorValid: false,
          itemId: 1,  itemValid: false,
          selfSwitchCh: "A", selfSwitchValid: false,
          switch1Id: 1,   switch1Valid: false,
          switch2Id: 1,   switch2Valid: false,
          variable1Id: 1, variable1Valid: false, variableValue: 0
        },
        image: {
          characterIndex: 0, characterName: "",
          direction: 2, pattern: 1, tileId: 0
        },
        moveRoute: {
          list: [{code: 0, parameters: []}],
          repeat: false, skippable: false, wait: false
        },
        list: [],
        directionFix: false,
        moveFrequency: 4,
        moveSpeed: 3,
        moveType: 0,
        priorityType: 0,
        stepAnime: false,
        through: true,
        trigger: QuasiABS.lootTrigger,
        walkAnime: true
      };
      this._lootPage.list = [];
      this._lootPage.list.push({
        code: 355,
        indent: 0,
        parameters: ["this.character().collectDrops();"]
      });
      this._lootPage.list.push({
        code: 0,
        indent: 0,
        parameters: [0]
      });
    }
    return this._lootPage;
  };

  Game_Loot.prototype.findProperPageIndex = function() {
    return 0;
  };

  Game_Loot.prototype.collectDrops = function() {
    if (QuasiABS.aoeLoot) {
      this.aoeCollect();
      return;
    }
    if (this._loot) $gameParty.gainItem(this._loot, 1);
    if (this._gold) $gameParty.gainGold(this._gold);
    var string = this._gold ? String(this._gold) : this._loot.name;
    QuasiABS.Manager.startPopup("item", this.cx(), this.cy(), string, this._iconIndex);
    this.erase();
    QuasiABS.Manager.removeEvent(this);
    QuasiABS.Manager.removePicture(this._itemIcon);
  };

  Game_Loot.prototype.aoeCollect = function() {
    var events = $gameMap.getCharactersAt(this.collider(), function(e) {
      return (e.constructor !== Game_Loot || e._erased);
    });
    var totalLoot = [];
    var totalGold = 0;
    for (var event of events){
      if (event._loot) totalLoot.push(event._loot);
      if (event._gold) totalGold += event._gold;
      var neighborLoot = $gameMap.getCharactersAt(event.collider(), function(e) {
        return (e.constructor !== Game_Loot || e._erased || events.contains(e));
      });
      events.push.apply(events, neighborLoot);
      event.erase();
      QuasiABS.Manager.removeEvent(event);
      QuasiABS.Manager.removePicture(event._itemIcon);
    };
    var display = {};
    for (var item of totalLoot) {
      $gameParty.gainItem(item, 1);
      display[item.name] = display[item.name] || {};
      display[item.name].iconIndex = item.iconIndex;
      display[item.name].total = display[item.name].total + 1 || 1;
    }
    var y = this.cy();
    for (var name in display) {
      if (!display.hasOwnProperty(name)) continue;
      var string = "x" + display[name].total + " " + name;
      var iconIndex = display[name].iconIndex;
      QuasiABS.Manager.startPopup("item", this.cx(), y, string, iconIndex);
      y += 22;
    }
    if (totalGold > 0) {
      $gameParty.gainGold(totalGold);
      var string = String(totalGold);
      QuasiABS.Manager.startPopup("item", this.cx(), y, string, QuasiABS.goldIcon);
    }
  };

  Game_Loot.prototype.update = function() {
    if (this.positionChanged()) {
      this.onPositionChange();
    }
    if (this._decay === 0) {
      this.erase();
      QuasiABS.Manager.removeEvent(this);
      QuasiABS.Manager.removePicture(this._itemIcon);
      return;
    }
    this._decay--;
  };

  Game_Loot.prototype.setupCollider = function(direction) {
    this._collider = [];
    this._collider[5] = new QuasiMovement.Box_Collider(32, 32, 0, 0, 0);
    this._collider[5].moveto(this._px, this._py);
  };

  //-----------------------------------------------------------------------------
  // Window_Base
  //
  // The superclass of all windows within the game.

  Window_Base.prototype.insideWindowArea = function() {
    var x = TouchInput.x - this.x;
    var y = TouchInput.y - this.y;
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  };

  //-----------------------------------------------------------------------------
  // AnimatedSprite

  AnimatedSprite.prototype = Object.create(Sprite.prototype);
  AnimatedSprite.prototype.constructor = AnimatedSprite;

  AnimatedSprite.prototype.initialize = function(bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this._timer = 0;
    this._pattern = 0;
    this._speed = 15;
    this._frames = 1;
  };

  AnimatedSprite.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._bitmap && this._bitmap.isReady()) {
      if (this._timer > this._speed) {
        this._pattern++;
        if (this._pattern >= this._frames) {
          this._pattern = 0;
        }
        this.setFramePosition();
        this._timer = -1;
      }
      this._timer++;
    }
  };

  AnimatedSprite.prototype.setFramePosition = function() {
    var pw = this._bitmap.width / this._frames;
    var ph = this._bitmap.height;
    var sx = pw * this._pattern;
    this.setFrame(sx, 0, pw, ph);
  };

  //-----------------------------------------------------------------------------
  // Sprite_SkillCollider
  //
  // The sprite for displaying a skills collider.

  Sprite_SkillCollider.prototype = Object.create(Sprite_Collider.prototype);
  Sprite_SkillCollider.prototype.constructor = Sprite_SkillCollider;

  Sprite_SkillCollider.prototype.initialize = function(collider) {
    Sprite_Collider.prototype.initialize.call(this, collider);
    this.z = 2;
    this.alpha = 0.4;
    this._frameCount = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
  };

  Sprite_SkillCollider.prototype.drawCollider = function() {
    var collider = this._collider;
    this._colliderSprite.clear();
    this._color = collider.color;
    var color = this._color || 0xff0000;
    this._colliderSprite.beginFill(color);
    this._colliderSprite.lineStyle(1, "#" + color.toString(16));
    if (collider.isCircle()) {
      var radiusX = collider._radiusX;
      var radiusY = collider._radiusY;
      this._colliderSprite.drawEllipse(radiusX, radiusY, radiusX, radiusY);
    } else if (collider.isPolygon()) {
      this._colliderSprite.drawPolygon(collider.baseVertices);
    } else {
      this._colliderSprite.drawRect(0, 0, collider.width, collider.height);
    }
    this._colliderSprite.endFill();
    this._colliderSprite.x = -collider.width / 2;
    this._colliderSprite.y = -collider.height / 2;
    if (QuasiMovement.cachedCollider) this._colliderSprite.cacheAsBitmap = true;
  };

  Sprite_SkillCollider.prototype.update = function() {
    Sprite_Collider.prototype.update.call(this);
    this.updateAnimation();
  };

  Sprite_SkillCollider.prototype.updateAnimation = function() {
    this._frameCount++;
    if (this._frameCount > 30) {
      this.alpha += 0.2 / 30;
      this.scale.x += 0.1 / 30;
      this.scale.y = this.scale.x;
      if (this._frameCount === 60) this._frameCount = 0;
    } else {
      this.alpha -= 0.2 / 30;
      this.scale.x -= 0.1 / 30;
      this.scale.y = this.scale.x;
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //
  // The sprite for displaying a character.

  var Alias_Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    Alias_Sprite_Character_initMembers.call(this);
    this._lastDamageRequest = 0;
    this._damages = [];
    this.createStateSprite();
  }

  Sprite_Character.prototype.createStateSprite = function() {
    this._stateSprite = new Sprite_StateOverlay();
    this.addChild(this._stateSprite);
  };

  var Alias_Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    Alias_Sprite_Character_update.call(this);
    this.updateDamagePopup();
    if (this._character) this.updateBattler();
  };

  Sprite_Character.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; i++) {
        this._damages[i].x = this._damages[i].realX;
        this._damages[i].x -= $gameMap.displayX() * $gameMap.tileWidth();
        this._damages[i].y = this._damages[i].realY;
        this._damages[i].y -= $gameMap.displayY() * $gameMap.tileHeight();
      }
      if (!this._damages[0].isPlaying()) {
        this.parent.removeChild(this._damages[0]);
        this._damages[0] = null;
        this._damages.shift();
      }
    }
  };

  Sprite_Character.prototype.updateBattler = function() {
    if (this._battler !== this._character.battler()) {
      this.setBattler(this._character.battler());
    }
  };

  Sprite_Character.prototype.setBattler = function(battler) {
    this._battler = battler;
    this._stateSprite.setup(this._battler);
  };

  Sprite_Character.prototype.setupDamagePopup = function() {
    if (!this._battler) return;
    if (!Imported.QuasiPopup) return;
    if (this._character._noPopup) return;
    if (!QuasiABS.showDmg) return;
    if (this._battler._damageQueue.length > 0) {
      var time = Graphics.frameCount;
      var wait = this._battler._damageQueue.length / 15;
      if (time - this._lastDamageRequest < wait) {
        // Makes it so only 1 dmg pop up per X frames
        return;
      }
      this._lastDamageRequest = time;
      var sprite = new Sprite_QuasiPopup();
      sprite.x = sprite.realX = this._character.cx();
      sprite.y = sprite.realY = this._character.cy() - this.height + 20;
      var string;
      var style = {};
      var result = this._battler._damageQueue.shift();
      if (result.missed || result.evaded) {
        string = "Missed";
      } else if (result.hpAffected) {
        var dmg = result.hpDamage;
        if (dmg >= 0) {
          string = dmg;
          style.fill = "#ffffff";
        } else {
          string = Math.abs(dmg);
          style.fill = "#00ff00";
        }
      } else if (result.mpDamage) {
        string = String(result.mpDamage);
        style.fill = "#0000ff";
      }
      if (!string && string != 0) return;
      string = String(string);
      var iconIndex = result.damageIcon;
      if (iconIndex) {
        string = "<icon:" + iconIndex + ">" + string;
      }
      if (result.critical) style.fill = "#FF8C00";
      settings = {};
      var fadeout = "90 30 fadeout";
      var slideup = "0 120 slideup 40";
      settings.transitions = [fadeout, slideup];
      settings.charaId = this._character === $gamePlayer ? 0 : this._character.eventId();
      sprite.setup(string, style, settings);
      this._damages.push(sprite);
      this.parent.addChild(sprite);
      this._battler.clearDamagePopup();
      this._battler.clearResult();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Icon
  //
  // The sprite for displaying icons

  Sprite_Icon.prototype = Object.create(Sprite.prototype);
  Sprite_Icon.prototype.constructor = Sprite_Icon;

  Sprite_Icon.prototype.initialize = function(index, sheet, w, h) {
    Sprite.prototype.initialize.call(this);
    this._iconIndex = index;
    this._iconSheet = sheet || "IconSet";
    this._iconW = w || 32;
    this._iconH = h || 32;
    this.setBitmap();
  };

  Sprite_Icon.prototype.setBitmap = function() {
    this.bitmap = ImageManager.loadSystem(this._iconSheet);
    var pw = this._iconW;
    var ph = this._iconH;
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //
  // The set of sprites on the map screen.

  var Alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    Alias_Spriteset_Map_createLowerLayer.call(this);
    this._pictures = [];
    this._tempAnimations = [];
  };

  Spriteset_Map.prototype.addPictures = function() {
    this._pictures = QuasiABS.Manager._pictures;
    if (this._pictures.length === 0) return;
    for (var i = 0; i < this._pictures.length; i++) {
      if (this.children.indexOf(this._pictures[i]) !== -1) continue;
      this._tilemap.addChild(this._pictures[i]);
    }
  };

  Spriteset_Map.prototype.addAnimations = function() {
    this._tempAnimations = QuasiABS.Manager._animations;
    if (this._tempAnimations.length === 0) return;
    for (var i = 0; i < this._tempAnimations.length; i++) {
      if (this.children.indexOf(this._tempAnimations[i]) !== -1) continue;
      this._tilemap.addChild(this._tempAnimations[i]);
      if (this._tempAnimations[i].isAnimationPlaying()) {
        for (var j = 0; j < this._tempAnimations[i]._animationSprites.length; j++) {
          this._tilemap.addChild(this._tempAnimations[i]._animationSprites[j]);
        }
      }
    }
  };

  var Alias_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
  Spriteset_Map.prototype.updateTilemap = function() {
    Alias_Spriteset_Map_updateTilemap.call(this);
    this.updateTempAnimations();
    this.updatePictures();
  };

  Spriteset_Map.prototype.updatePictures = function() {
    if (this._pictures !== QuasiABS.Manager._pictures) this.addPictures();
    for (var i = 0; i < this._pictures.length; i++) {
      this._pictures[i].x = this._pictures[i].realX;
      this._pictures[i].x -= $gameMap.displayX() * QuasiMovement.tileSize;
      this._pictures[i].y = this._pictures[i].realY;
      this._pictures[i].y -= $gameMap.displayY() * QuasiMovement.tileSize;
    }
  };

  Spriteset_Map.prototype.updateTempAnimations = function() {
    if (this._tempAnimations !== QuasiABS.Manager._animations) this.addAnimations();
    if (this._tempAnimations.length > 0) {
      for (var i = this._tempAnimations.length - 1; i >= 0; i--) {
        this._tempAnimations[i].x = this._tempAnimations[i].realX;
        this._tempAnimations[i].x -= $gameMap.displayX() * QuasiMovement.tileSize;
        this._tempAnimations[i].y = this._tempAnimations[i].realY;
        this._tempAnimations[i].y -= $gameMap.displayY() * QuasiMovement.tileSize;
        this._tempAnimations[i].update();
        if (!this._tempAnimations[i].isAnimationPlaying()) {
          this._tilemap.removeChild(this._tempAnimations[i].sprite);
          this._tempAnimations[i] = null;
          this._tempAnimations.splice(i, 1);
        }
      }
    }
  };

  var Alias_Sprite_move = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    Alias_Sprite_move.call(this, x, y);
    this.realX = x;
    this.realY = y;
  };

  var Alias_TilingSprite_move = TilingSprite.prototype.move;
  TilingSprite.prototype.move = function(x, y, width, height) {
    Alias_TilingSprite_move.call(this, x, y, width, height);
    this.realX = x;
    this.realY = y;
  };
})();
