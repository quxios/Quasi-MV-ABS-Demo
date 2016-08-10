//=============================================================================
// Quasi Popup
// Version: 1.04
// Last Update: August 10, 2016
//=============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//=============================================================================
// Downloading from Github
//  - Click on Raw next to Blame and History
//  - Once new page loads, right click and save as
//=============================================================================
// How to install:
//  - Save this file as "QuasiPopup.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://forums.rpgmakerweb.com/index.php?/topic/58257-quasi-popup/
//=============================================================================

var Imported = Imported || {};
Imported.QuasiPopup = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 Allows to create Popups on Map
 * <QuasiPopup>
 * @author Quasi
 *
 * @param Default Font
 * @desc Name of default font to use
 * MV Default: GameFont
 * @default GameFont
 *
 * @param Default Font Size
 * @desc Default font size to use
 * MV Default: 28px
 * @default 28px
 *
 * @param Default Fill
 * @desc Default font color to use ( CSS colors )
 * MV Default: #ffffff
 * @default #ffffff
 *
 * @param Default Stroke
 * @desc Default stroke color ( CSS colors )
 * MV Default: rgba(0, 0, 0, 0.5)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Default Stroke Thickness
 * @desc Default stroke size, set to 0 for none
 * MV Default: 4
 * @default 4
 *
 * @param Default Text Align
 * @desc Default text align
 * MV Default: left
 * @default left
 *
 * @help
 * ============================================================================
 * ** Links
 * ============================================================================
 * For a guide on how to use this plugin go to:
 *  - http://forums.rpgmakerweb.com/index.php?/topic/58257-quasi-popup/
 * ============================================================================
 */
//=============================================================================

//-----------------------------------------------------------------------------
// New Classes

function Sprite_QuasiPopup() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi Popup

var QuasiPopup = {};

QuasiPopup._test = function() {
  test = new Sprite_QuasiPopup();
  test.setup("testing");
  SceneManager._scene.addChild(test);
  return test;
};

(function() {
  QuasiPopup.processParameters = function() {
    var params = $plugins.filter(function(p) { return p.description.contains('<QuasiPopup>'); })[0].parameters;
    var fontName = params["Default Font"] || "GameFont";
    var fontSize = params["Default Font Size"] || "28px";
    this._defaultStyle = {
      fontFamily: fontName,
      fontSize: fontSize,
      fontStyle: "normal",
      fill: params["Default Fill"] || "#ffffff",
      stroke: params["Default Stroke"] || "rgba(0, 0, 0, 0.5)",
      strokeThickness: Number(params["Default Stroke Thickness"]) || 4,
      align: params["Default Text Align"] || "left"
    }
  };
  QuasiPopup.processParameters();

  QuasiPopup.start = function(x, y, string, style, settings, notification) {
    var popup = new Sprite_QuasiPopup();
    popup.setup(string, style, settings);
    var ox = settings ? settings.offsetX || 0 : 0;
    var oy = settings ? settings.offsetY || 0 : 0;
    popup.realX = popup.x = x - ox;
    popup.realY = popup.y = y - oy;
    popup.notification = notification;
    this.add(popup);
  };

  QuasiPopup.startList = function(id, x, y, string, style, settings) {
    var popup = new Sprite_QuasiPopup();
    if (!settings) {
      settings = {};
    }
    if (!settings.transitions) {
      var start = settings.duration ? settings.duration : 120;
      var fadeout = start + " 30 fadeout";
      settings.transitions = [];
    }
    popup.setup(string, style, settings);
    var ox = settings ? settings.offsetX || 0 : 0;
    var oy = settings ? settings.offsetY || 0 : 0;
    popup.realX = popup.x = x - ox;
    popup.realY = popup.y = y - oy;
    popup.notification = true;
    popup.listId = id;
    this.addToList(id, popup);
  };

  QuasiPopup._cache = [];
  QuasiPopup.add = function(sprite) {
    var scene = SceneManager._scene;
    this._cache.push(sprite);
    if (scene.constructor !== Scene_Map) {
      scene.addChild(sprite);
    } else {
      scene._spriteset._tilemap.addChild(sprite);
    }
  };

  QuasiPopup._list = [];
  QuasiPopup.addToList = function(id, sprite) {
    var scene = SceneManager._scene;
    this._list[id] = this._list[id] || [];
    for (var i = 0; i < this._list[id].length; i++) {
      var item = this._list[id][i];
      var start = item.duration;
      for (j = 0; j < 30; j++) {
        var t = item.timeline;
        if (!t[start + j]) {
          t[start + j] = [];
        }
        t[start + j].push("slideup 30 " + sprite.height);
      }
    }
    this._list[id].push(sprite);
    if (scene.constructor !== Scene_Map) {
      scene.addChild(sprite);
    } else {
      scene._spriteset._tilemap.addChild(sprite);
    }
  };

  QuasiPopup.remove = function(sprite) {
    var scene = SceneManager._scene;
    var i = this._cache.indexOf(sprite);
    if (i < 0) return;
    this._cache[i] = null;
    this._cache.splice(i, 1);
    if (scene.constructor !== Scene_Map) {
      scene.removeChild(sprite);
    } else {
      scene._spriteset._tilemap.removeChild(sprite);
    }
  };

  QuasiPopup.removeFromList = function(id, sprite) {
    var scene = SceneManager._scene;
    if (!this._list[id]) return;
    var i = this._list[id].indexOf(sprite);
    if (i < 0) return;
    this._list[id][i] = null;
    this._list[id].splice(i, 1);
    if (scene.constructor !== Scene_Map) {
      scene.removeChild(sprite);
    } else {
      scene._spriteset._tilemap.removeChild(sprite);
    }
  };

  QuasiPopup.clear = function() {
    this._cache = [];
    this._list = [];
    this._mapId = $gameMap.mapId;
  };

  var Alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    Alias_Game_Map_setup.call(this, mapId);
    if (mapId !== QuasiPopup._mapId) QuasiPopup.clear();
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  // The game object class for an event. It contains functionality for event page
  // switching and running parallel process events.

  var Alias_Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    this._quasiPopupSettings;
    this._quasiPopups;
    this._quasiPopupTicker = 0;
    Alias_Game_Event_setupPage.call(this);
  };

  var Alias_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    Alias_Game_Event_setupPageSettings.call(this);
    var list = this.list();
    var settings, style;
    var popups = [];
    var transitions = [];
    var comment = 0;
    var addTo, getSettings, getStyle, getTrans;
    for (var i = 0; i < list.length; i++) {
      var code = list[i].code;
      var param = list[i].parameters;
      if (code === 108 || code === 408) {
        if (/<\/popupSettings>/i.test(param[0])) {
          getSettings = false;
        }
        if (/<\/popupStyle>/i.test(param[0])) {
          getStyle = false;
        }
        if (/<\/popupTransition>/i.test(param[0])) {
          getTrans= false;
        }
        if (getSettings || getStyle) {
          var s = /^(.*):(.*)/.exec(param[0]);
          if (s) {
            var key = s[1].trim();
            var value = s[2].trim();
            if (/^-?\d+\.?\d*$/.test(value)) {
              value = Number(value);
            }
            if (getSettings) {
              settings = settings || {};
              settings[key] = value;
            } else {
              style = style || {};
              style[key] = value;
            }
          }
        }
        if (getTrans) {
          transitions.push(param[0]);
        }
        if (/<popupSettings>/i.test(param[0])) {
          getSettings = true;
          getStyle = false;
          getTrans = false;
        }
        if (/<popupStyle>/i.test(param[0])) {
          getSettings = false;
          getStyle = true;
          getTrans = false;
        }
        if (/<popupTransition>/i.test(param[0])) {
          getSettings = false;
          getStyle = false
          getTrans = true;
        }
        if (addTo) {
          if(code === 108) comment++;
          if (comment > 1) {
            addTo = null;
          } else {
            if (!popups[addTo]) {
              popups[addTo] = "";
            } else {
              popups[addTo] += "\n";
            }
            popups[addTo] += param[0];
          }
        }
      } else if (code === 118) {
        var line = param[0].replace(/\s/g, "");
        if (/QuasiPopup/i.test(line)) {
          var n = Number(line.replace(/QuasiPopup/i,""));
          comment = 0;
          addTo = n;
        }
      } else {
        addTo = null;
      }
    };
    if (settings) {
      settings.transitions = transitions;
      settings.charaId = this.eventId();
      this._quasiPopupSettings = settings;
      this._quasiPopupStyle = style;
      this._quasiPopups = popups.filter(function(e) { return !!e; });
    }
  };

  var Alias_Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    Alias_Game_Event_update.call(this);
    if (this._quasiPopupSettings && !this._locked) {
      this.updatePopups();
    }
  };

  Game_Event.prototype.updatePopups = function() {
    var settings = this._quasiPopupSettings;
    var style = this._quasiPopupStyle;
    if (this._quasiPopupTicker >= settings.interval) {
      var i = Math.randomInt(this._quasiPopups.length);
      var x = this.x * $gameMap.tileWidth();
      x +=  $gameMap.tileWidth() / 2;
      var y = this.y * $gameMap.tileHeight();
      QuasiPopup.start(x, y, this._quasiPopups[i], style, settings);
      this._quasiPopupTicker = -1;
    }
    this._quasiPopupTicker++;
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //
  // The set of sprites on the map screen.

  var Alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    Alias_Spriteset_Map_createLowerLayer.call(this);
    this._popups = [];
  };

  Spriteset_Map.prototype.addPopups = function() {
    this._popups = QuasiPopup._cache;
    if (this._popups.length === 0) return;
    for (var i = 0; i < this._popups.length; i++) {
      if (this.children.indexOf(this._popups[i]) !== -1) {
        continue;
      }
      this._tilemap.addChild(this._popups[i]);
    }
  };

  var Alias_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
  Spriteset_Map.prototype.updateTilemap = function() {
    Alias_Spriteset_Map_updateTilemap.call(this);
    this.updatePopups();
  };

  Spriteset_Map.prototype.updatePopups = function() {
    if (this._popups !== QuasiPopup._cache) {
      this.addPopups();
    }
    for (var i = 0; i < this._popups.length; i++) {
      if (this._popups[i].notification) continue;
      this._popups[i].x = this._popups[i].realX;
      this._popups[i].x -= $gameMap.displayX() * $gameMap.tileWidth();
      this._popups[i].y = this._popups[i].realY;
      this._popups[i].y -= $gameMap.displayY() * $gameMap.tileHeight();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_QuasiPopup
  //
  // The sprite for displaying a popup.

  Sprite_QuasiPopup.prototype = Object.create(Sprite.prototype);
  Sprite_QuasiPopup.prototype.constructor = Sprite_QuasiPopup;

  Sprite_QuasiPopup.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(0, 0);
    this.window = null;
    this.z = 9;
    this._ox = 0;
    this._oy = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.settings = null;
    this.timeline = {};
    this.duration = 0;
    this._defaultSettings = {
      duration: 120,
      remove: true,
      alignX: "center",
      alignY: "top",
      transitions: [],
      window: false,
      bind: true
    }
    this._defaultStyle = JSON.parse(JSON.stringify(QuasiPopup._defaultStyle));
  };

  Object.defineProperty(Sprite_QuasiPopup.prototype, 'realX', {
    get: function() {
      return this._realX + this._ox;
    },
    set: function(value) {
      this._realX = value;
    },
    configurable: true
  });

  Object.defineProperty(Sprite_QuasiPopup.prototype, 'realY', {
    get: function() {
      return this._realY + this._oy;
    },
    set: function(value) {
      this._realY = value;
    },
    configurable: true
  });

  Sprite_QuasiPopup.prototype.setup = function(string, style, settings) {
    style = this.setupStyle(style);
    this.settings = this.setupSettings(settings);
    this.formatString(string, style);
    this.formatTransitions();
  };

  Sprite_QuasiPopup.prototype.setupStyle = function(style) {
    if (!style) {
      style = this._defaultStyle;
    } else {
      for (var key in this._defaultStyle) {
        if (!this._defaultStyle.hasOwnProperty(key)) {
          continue;
        }
        if (!style.hasOwnProperty(key)) {
          style[key] = this._defaultStyle[key];
        }
      }
    }
    return style;
  };

  Sprite_QuasiPopup.prototype.setupSettings = function(settings) {
    if (!settings) {
      settings = this._defaultSettings;
    } else {
      for (var key in this._defaultSettings) {
        if (!this._defaultSettings.hasOwnProperty(key)) {
          continue;
        }
        if (!settings.hasOwnProperty(key)) {
          settings[key] = this._defaultSettings[key];
        }
      }
    }
    return settings;
  };

  Sprite_QuasiPopup.prototype.formatString = function(string, style) {
    var lines = string.split(/\r?\n/);
    var currentY = 0;
    var largestW = 0;
    for (var i = 0; i < lines.length; i++) {
      var lineContainer = new Sprite();
      var currentX = 0;
      var bold = false;
      var italic = false;
      var string = lines[i];
      var regex = /(.*?)<\/?(b|i|icon:(\d+))>/;
      var match = regex.exec(string);
      var originalStyle = style.fontStyle;
      var ran = 0;
      var icon = 0;
      while (match) {
        style.fontStyle = bold ? "bold " : style.fontStyle;
        style.fontStyle = italic ? "italic " : style.fontStyle;
        string = string.slice(match[0].length, string.length);
        if (match[3] === undefined) {
          var preLine = new PIXI.Text(match[1] || "", style);
        } else {
          var iconIndex = Number(match[3]) || 0;
          var preLine = new Sprite();
          preLine.y -= 16;
          preLine.bitmap = ImageManager.loadSystem('IconSet');
          var sx = iconIndex % 16 * 32;
          var sy = Math.floor(iconIndex / 16) * 32;
          preLine.setFrame(sx, sy, 32, 32);
          icon = 32;
        }
        preLine.x = currentX;
        currentX += preLine.width;
        lineContainer.addChild(preLine);
        bold = /<b>/.test(match[0]) || bold;
        italic = /<i>/.test(match[0]) || italic;
        if (/<\/b>/.test(match[0])) bold = false;
        if (/<\/i>/.test(match[0])) italic = false;
        match = regex.exec(string);
        ran++;
        if (ran > 100) {
          break;
        }
      }
      style.fontStyle = originalStyle;
      var line = new PIXI.Text(string, style);
      line.x = currentX;
      lineContainer.addChild(line);
      currentX += line.width;
      currentY += Math.max(line.height, icon);

      largestW = currentX > largestW ? currentX : largestW;
      lineContainer.width = currentX;
      lineContainer.y = currentY;
      this.addChild(lineContainer);
    }
    var wx = 0;
    var wy = 0;
    for (var i = 0; i < this.children.length; i++) {
      var container = this.children[i];
      var ow = 0;
      if (style.align === "center") {
        ow = largestW / 2 - container.width / 2;
        container.x = ow;
      } else if (style.align === "right") {
        ow = largestW  - container.width;
        container.x = ow;
      }
      if (this.settings.alignX === "center") {
        container.x -= largestW / 2;
      } else if (this.settings.alignX === "right") {
        container.x -= largestW;
      }
      if (this.settings.alignY === "center") {
        container.y -= currentY / 2;
      } else if (this.settings.alignY === "top") {
        container.y -= currentY;
      }
      wx = wx > container.x ? container.x : wx;
      wy = wy > container.y ? container.y : wy;
    }
    this.width = largestW;
    this.height = currentY;
    if (this.settings.window === "true") {
      var windowBg = new Window_Base(wx - 18, wy - 18, this.width + 36, this.height + 36);
      this.addChildAt(windowBg, 0);
    }
  };

  Sprite_QuasiPopup.prototype.formatTransitions = function() {
    var transitions = this.settings.transitions;
    for (var i = 0; i < transitions.length; i++) {
      var params = transitions[i].split(" ");
      var transition = params[2] + " " + params[1] +  " ";
      var j;
      for (j = 3; j < params.length; j++) {
        transition += params[j];
        if (j !== params.length - 1) {
          transition += " ";
        }
      }
      var startTime = Number(params[0]);
      var totalTime = Number(params[1]);
      for (j = 0; j < totalTime; j++) {
        if (!this.timeline[startTime + j]) {
          this.timeline[startTime + j] = [];
        }
        this.timeline[startTime + j].push(transition);
      }
    }
  };

  Sprite_QuasiPopup.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (!this.settings) return;
    if (this.settings.bind && this.settings.charaId) {
      var chara;
      if (this.settings.charaId === 0) {
        chara = $gamePlayer;
      } else {
        chara = $gameMap.event(this.settings.charaId);
      }
      var x = chara.x * $gameMap.tileWidth();
      x +=  $gameMap.tileWidth() / 2;
      var y = chara.y * $gameMap.tileHeight();
      this.realX = x;
      this.realY = y;
    }
    this.updateTransition();
    if (this.notification) {
      this.y = this.realY;
      this.x = this.realX;
    }
    if(this.settings.remove && !this.isPlaying()) {
      if (this.listId || this.listId === 0) {
        QuasiPopup.removeFromList(this.listId, this);
      } else {
        QuasiPopup.remove(this);
      }
    }
    this.duration++;
  };

  Sprite_QuasiPopup.prototype.updateTransition = function() {
    var currentFrame = this.timeline[this.duration];
    if (currentFrame) {
      for (var i = 0; i < currentFrame.length; i++) {
        this.processAction(currentFrame[i].split(" "));
      }
    }
  };

  Sprite_QuasiPopup.prototype.processAction = function(action) {
    switch (action[0].toLowerCase()) {
      case "slideup":
        this.slideup(action);
        break;
      case "slidedown":
        this.slidedown(action);
        break;
      case "fadein":
        this.fadein(action);
        break;
      case "fadeout":
        this.fadeout(action);
        break;
    }
  };

  Sprite_QuasiPopup.prototype.slideup = function(action) {
    var duration = Number(action[1]);
    var distance = Number(action[2]);
    var speed = distance / duration;
    this._oy -= speed;
  };

  Sprite_QuasiPopup.prototype.slidedown = function(action) {
    var duration = Number(action[1]);
    var distance = Number(action[2]);
    var speed = distance / duration;
    this._oy += speed;
  };

  Sprite_QuasiPopup.prototype.fadeout = function(action) {
    var duration = Number(action[1]);
    var speed = 255 / duration;
    if (this.opacity > 0) {
      this.opacity -= speed;
    }
  };

  Sprite_QuasiPopup.prototype.fadein = function(action) {
    var duration = Number(action[1]);
    var speed = 255 / duration;
    if (this.opacity < 255) {
      this.opacity += speed;
    }
  };

  Sprite_QuasiPopup.prototype.isPlaying = function() {
    return this.duration < this.settings.duration;
  };
}());
