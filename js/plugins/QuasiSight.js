//============================================================================
// Quasi Sight
// Version: 1.08
// Last Update: June 26, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiSight.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiMovement
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/quasi-sight/
//  - - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
//============================================================================

var Imported = Imported || {};
Imported.Quasi_Sight = 1.08;

//=============================================================================
 /*:
 * @plugindesc v1.08
 * Quasi Movement Addon: A line of sight script with real time shadow casting.
 * <QuasiSight>
 *
 * @author Quasi      Site: http://quasixi.com
 *
 * @param Show Sight
 * @desc Set to true or false to show Sights
 * Warning! The bitmaps may get stuck on screen!
 * @default false
 *
 * @help
 * ============================================================================
 * ** Links
 * ============================================================================
 * For a guide on how to use this plugin go to:
 *
 *   http://quasixi.com/quasi-sight/
 *
 * Other Links
 *  - https://github.com/quasixi/Quasi-MV-Master-Demo
 *  - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
 */
//=============================================================================

if (!Imported.Quasi_Movement) {
  alert("Error: Quasi Sight requires Quasi Movement to work.");
  throw new Error("Error: Quasi Sight requires Quasi Movement to work.")
}
(function() {
  var Sight = {};
  var _params = $plugins.filter(function(p) { return p.description.contains('<QuasiSight>') && p.status; })[0].parameters;
  Sight.show  = _params['Show Sight'].toLowerCase() === "true";

  // This isn't used, for a future feature where you
  // create polygons on the map to use for shadows.
  // This will allow you to use Sight with Collision Maps
  Sight.loadShadowMap = function() {
    var xhr = new XMLHttpRequest();
    var url = QuasiMovement.jFolder + 'Shadows.json';
    xhr.open('GET', url, true);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        Sight.onLoadShadowMap(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //
  // The interpreter for running event commands.

  var Alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command.toLowerCase() === "qsight") {
      if (args[0].toLowerCase() === "setinvisible") {
        var charaId = Number(args[1]);
        var chara = charaId === 0 ? $gamePlayer : $gameMap.event(charaId);
        if (!chara) return;
        chara._invisible = args[1].toLowerCase() === "true";
        return;
      }
    }
    Alias_Game_Interpreter_pluginCommand.call(this, command, args);
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  // The superclass of Game_Character. It handles basic information, such as
  // coordinates and images, shared by all characters.

  var Alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    Alias_Game_CharacterBase_initMembers.call(this);
    this._invisible = false;
  };

  var Alias_Game_CharacterBase_update = Game_CharacterBase.prototype.update;
  Game_CharacterBase.prototype.update = function() {
    Alias_Game_CharacterBase_update.call(this);
    if (this._sightSettings && this._sightSettings.collider) {
      if (this._sightSettings.collider.constructor === Object) {
        this._sightSettings = null;
      } else {
        this._sightSettings.collider.update();
      }
    }
    if (this._hasSight && this.needsSightUpdate()) {
      this._prevDirection = this._direction;
      $gameSelfSwitches.setValue(this._sightSettings.switch, this.checkSight());
    }
  };

  Game_CharacterBase.prototype.canSee = function(charaId, shape, length) {
    var target = charaId === 0 ? $gamePlayer : $gameMap.event(charaId);
    if (!target) return false;
    var settings = {
      length: length,
      target: target,
      shape: shape,
      collider: this.createSightShape(shape, length)
    }
    this._sight = {};
    this._sight.tileShadows = {};
    this._sight.objs = {};
    this._sight.target = new Point(0, 0);
    return this.checkSight(settings);
  };

  Game_CharacterBase.prototype.checkSight = function(settings) {
    this._sight.origin = {
      x: this._px,
      y: this._py,
      dir: this._direction
    };
    settings = settings || this._sightSettings;
    this._sight.target = new Point(settings.target._px, settings.target._py);
    if (settings.target._invisible) {
      return false;
    }
    if (!this.insideSightRange(settings)) return false;
    if (this.insideTileShadow(settings)) return false;
    if (this.insideEventShadow(settings)) return false;
    return true;
  };

  Game_CharacterBase.prototype.insideSightRange = function(settings) {
    settings = settings || this._sightSettings;
    this._sight.base = settings.collider;
    if (this._sight.base.constructor === QuasiMovement.Polygon_Collider) {
      this._sight.base.moveto(this.cx(), this.cy());
      var rad;
      if (this._direction === 6) rad = 0;
      if (this._direction === 2) rad = Math.PI / 2;
      if (this._direction === 4) rad = Math.PI;
      if (this._direction === 8) rad = 3 * Math.PI / 2;
      rad -= Math.PI / 2; // Rotate because base shape is facing down
      if (Math.abs(this._sight.base.radian - rad) < Math.PI) {
        this._sight.base.rotateTo(rad, 15);
      } else {
        this._sight.base.setRadian(rad);
      }
    } else {
      this._sight.base.moveto(this.cx() - this._sight.base.width / 2, this.cy() - this._sight.base.height / 2);
    }
    if (Sight.show) {
      this._sight.base.color = 0xffffff;
      SceneManager._scene.addTempCollider(this._sight.base, 120, true);
    }
    return this._sight.base.intersects(settings.target.collider());
  };

  Game_CharacterBase.prototype.insideTileShadow = function(settings) {
    settings = settings || this._sightSettings;
    this._sight.tiles = $gameMap.getTileBoxesAt(this._sight.base);
    this._sight.tiles = this._sight.tiles.filter(function(tile) {
      if (tile.width !== 0 && tile.height !== 0 && !/<noshadow>/i.test(tile.note) &&
          !tile.isLadder && !tile.isBush && !tile.isDamage) {
        return tile;
      }
    });
    var i, j, insideAny;
    for (i = 0, j = this._sight.tiles.length; i < j; i++) {
      var id = this._sight.tiles[i].location;
      if (!this._sight.tileShadows[id]) {
        this._sight.tileShadows[id] = {};
        var shadowData = this.shadowCast(this._sight.tiles[i], settings);
        var shadow = new QuasiMovement.Polygon_Collider(shadowData[0]);
        shadow.color = 0x000000;
        shadow.moveto(shadowData[1], shadowData[2]);
        this._sight.tileShadows[id].shadow = shadow;
      }
      if (this._sight.tileShadows[id].reshape) {
        SceneManager._scene.removeTempCollider(this._sight.tileShadows[id].shadow);
        this._sight.tileShadows[id].reshape = false;
        var shadowData = this.shadowCast(this._sight.tiles[i], settings);
        this._sight.tileShadows[id].shadow.reshape(shadowData[0]);
        this._sight.tileShadows[id].shadow.moveto(shadowData[1], shadowData[2]);
      }
    }
    var verticesInside = 0;
    var verticesTotal  = settings.target.collider().vertices().length
    for (i = 0; i < verticesTotal; i++) {
      var vertice = settings.target.collider().vertices()[i];
      for (var id in this._sight.tileShadows) {
        if (!this._sight.tileShadows.hasOwnProperty(id)) continue;
        if (this._sight.tileShadows[id].shadow.containsPoint(vertice.x, vertice.y)) {
          verticesInside++;
          if (Sight.show) {
            SceneManager._scene.addTempCollider(this._sight.tileShadows[id].shadow, 180, true);
          }
          break;
        }
      }
    }
    return verticesInside > verticesTotal / 2;
  };

  Game_CharacterBase.prototype.insideEventShadow = function(settings) {
    settings = settings || this._sightSettings;
    var self = this;
    var events = $gameMap.getCharactersAt(this._sight.base, function(chara) {
      if (chara.constructor !== Game_Event || chara === self) {
        return true;
      }
      if (!chara.castShadow()) {
        return true;
      }
      return false;
    });
    var i, j, insideAny;
    for (i = 0, j = events.length; i < j; i++) {
      if (!this._sight.objs[events[i]._eventId]) {
        this._sight.objs[events[i]._eventId] = {};
        this._sight.objs[events[i]._eventId].cache = new Point(events[i]._px, events[i]._py);
        this._sight.objs[events[i]._eventId].chara = events[i];
        var shadowData = this.shadowCast(events[i].collider(), settings);
        var shadow  = new QuasiMovement.Polygon_Collider(shadowData[0]);
        shadow.moveto(shadowData[1], shadowData[2]);
        shadow.color = 0x000000;
        this._sight.objs[events[i]._eventId].shadow = shadow;
      }
      if (this._sight.objs[events[i]._eventId].reshape) {
        SceneManager._scene.removeTempCollider(this._sight.objs[events[i]._eventId].shadow);
        this._sight.objs[events[i]._eventId].reshape = false;
        var shadowData = this.shadowCast(events[i].collider(), settings);
        this._sight.objs[events[i]._eventId].shadow.reshape(shadowData[0]);
        this._sight.objs[events[i]._eventId].shadow.moveto(shadowData[1], shadowData[2]);
      }
    }
    var verticesInside = 0;
    var verticesTotal  = settings.target.collider().vertices().length
    for (i = 0; i < verticesTotal; i++) {
      var vertice = settings.target.collider().vertices()[i];
      for (var id in this._sight.objs) {
        if (!this._sight.objs.hasOwnProperty(id)) continue;
        if (this._sight.objs[id].shadow.containsPoint(vertice.x, vertice.y)) {
          verticesInside++;
          if (Sight.show) {
            SceneManager._scene.addTempCollider(this._sight.objs[id].shadow, 180, true);
          }
          break;
        }
      }
    }
    return verticesInside > verticesTotal / 2;
  };

  Game_CharacterBase.prototype.shadowCast = function(obj, settings) {
    settings = settings || this._sightSettings;
    var radians = [];
    var radianWithPoint = {};
    var pointWithRadian = {};
    var points = [];
    var vertices = obj.vertices();
    var i, j;
    for (i = 0, j = vertices.length; i < j; i++) {
      var x1 = vertices[i].x;
      var y1 = vertices[i].y;
      var point = new Point(x1, y1);
      var radian = Math.atan2(this.cy() - y1, x1 - this.cx())
      radian += radian < 0 ? 2 * Math.PI : 0;
      radianWithPoint[radian] = point;
      pointWithRadian[JSON.stringify(point)] = radian;
      radians.push(radian);
      points.push(point);
    }
    radians.sort(function(a, b) {
      return a - b;
    });
    var min = radians[0];
    var max = radians[radians.length - 1];
    if (Math.abs(max - min)> Math.PI) {
      var i, j, old;
      for (i = 0, j = radians.length; i < j; i++) {
        if (radians[i] > Math.PI) {
          old = radianWithPoint[radians[i]];
          radians[i] -= 2 * Math.PI;
          radianWithPoint[radians[i]] = old;
          pointWithRadian[JSON.stringify(old)] = radians[i];
        }
      }
      radians.sort(function(a, b) {
        return a - b;
      });
      min = radians[0];
      max = radians[radians.length - 1];
    }
    var l = settings.length * 1.5;
    var points = [];
    var x1 = radianWithPoint[max].x - radianWithPoint[min].x;
    var y1 = radianWithPoint[max].y - radianWithPoint[min].y;
    var x2 = x1 + l * Math.cos(max);
    var y2 = y1 + l * -Math.sin(max);
    var x3 = l * Math.cos(min);
    var y3 = l * -Math.sin(min);
    points.push(new Point(0, 0));
    points.push(new Point(x1, y1));
    points.push(new Point(x2, y2));
    points.push(new Point(x3, y3));
    return [points, radianWithPoint[min].x, radianWithPoint[min].y];
    /*
    // New Method that outlines object, casting the shadow
    // behind the object instead.
    // Not enabled for now because it's most likely more
    // performant and not needed.
    var minIndex = points.indexOf(radianWithPoint[min]);
    var firstHalf = points.splice(0, minIndex);
    points = points.concat(firstHalf);
    finalPoints = [];
    midPoints = [];
    points.reverse();
    var first = points.pop();
    points.unshift(first);
    var x, y, dx, dy, rad;
    var l = settings.length;
    for (i = 0, j = points.length; i < j; i++) {
      x = points[i].x - radianWithPoint[min].x;
      y = points[i].y - radianWithPoint[min].y;
      finalPoints.push(new Point(x, y));
      if (points[i] === radianWithPoint[max]) {
        break;
      } else if (points[i] !== radianWithPoint[min]) {
        rad =  pointWithRadian[JSON.stringify(points[i])]
        dx = points[i].x - radianWithPoint[min].x;
        dy = points[i].y - radianWithPoint[min].y;
        x = dx + l * Math.cos(rad);
        y = dy + l * -Math.sin(rad);
        midPoints.push(new Point(x, y));
      }
    }
    var x1 = radianWithPoint[max].x - radianWithPoint[min].x;
    var y1 = radianWithPoint[max].y - radianWithPoint[min].y;
    var x2 = x1 + l * Math.cos(max);
    var y2 = y1 + l * -Math.sin(max);
    var x3 = l * Math.cos(min);
    var y3 = l * -Math.sin(min);
    finalPoints.push(new Point(x2, y2));
    finalPoints = finalPoints.concat(midPoints.reverse());
    finalPoints.push(new Point(x3, y3));
    return [finalPoints, radianWithPoint[min].x, radianWithPoint[min].y];
    */
  };

  Game_CharacterBase.prototype.needsSightUpdate = function() {
    if (!this._sightSettings.collider) {
      var collider = this.createSightShape(this._sightSettings.shape, this._sightSettings.length);
      this._sightSettings.collider = collider;
    }
    if (!this._sight) {
      this._sight = {};
      this._sight.tileShadows = {};
      this._sight.objs = {};
      this._sight.target = new Point(0, 0);
      return true;
    }
    if (!this._sightSettings.update) return false;
    if (this._sight.origin.x !== this._px || this._sight.origin.y !== this._py ||
        this._sight.origin.dir !== this._direction) {
      SceneManager._scene.removeTempCollider(this._sight.base);
      for (var obj in this._sight.tileShadows) {
        if (this._sight.tileShadows.hasOwnProperty(obj)) {
          this._sight.tileShadows[obj].reshape = true;
        }
      }
      for (var obj in this._sight.objs) {
        if (this._sight.objs.hasOwnProperty(obj)) {
          this._sight.objs[obj].reshape = true;
        }
      }
      return true;
    }
    if (this._sight.base._dr) return true;
    if (this._sight.target.x !== this._sightSettings.target._px ||
        this._sight.target.y !== this._sightSettings.target._py) {
      return true;
    }
    var objMoved = false;
    for (var obj in this._sight.objs) {
      if (this._sight.objs.hasOwnProperty(obj)) {
        if (this._sight.objs[obj].cache.x !== this._sight.objs[obj].chara._px ||
            this._sight.objs[obj].cache.y !== this._sight.objs[obj].chara._py) {
          objMoved = true;
          this._sight.objs[obj].reshape = true;
        }
      }
    }
    return objMoved;
  };

  Game_CharacterBase.prototype.createSightShape = function(shape, length) {
    var collider;
    if (shape === "circle") {
      collider = new QuasiMovement.Circle_Collider(length * 2, length * 2);
    } else if (shape === "box") {
      collider = new QuasiMovement.Box_Collider(length, length);
    } else if (shape === "poly") {
      var w = this.collider().width;
      var h = this.collider().height;
      var lw = length - w / 2;
      var lh = length - h / 2;
      var points = [];
      points.push(new Point(0, 0));
      var x2 = lw + Math.cos(Math.PI / 4);
      var y2 = lh;
      points.push(new Point(x2, y2));
      points.push(new Point(-x2, y2));
      collider = new QuasiMovement.Polygon_Collider(points);
      var rad = 0;
      if (this._direction === 6) rad = 0;
      if (this._direction === 2) rad = Math.PI / 2;
      if (this._direction === 4) rad = Math.PI;
      if (this._direction === 8) rad = 3 * Math.PI / 2;
      rad -= Math.PI / 2; // Rotate because base shape is facing down
      collider.setRadian(rad);
    }
    collider.moveto(this.cx(), this.cy());
    return collider;
  };

  Game_CharacterBase.prototype.castShadow = function() {
    return false;
  };

  var Alias_Game_CharacterBase_reloadBoxes = Game_CharacterBase.prototype.reloadBoxes;
  Game_CharacterBase.prototype.reloadBoxes = function() {
    Alias_Game_CharacterBase_reloadBoxes.call(this);
    if (this._sight) var hadSight = true;
    this._sight = null;
    if (hadSight) this.setupSight();
  }

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  // The game object class for an event. It contains functionality for event page
  // switching and running parallel process events.

  var Alias_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    if (this._sight) {
      SceneManager._scene.removeTempCollider(this._sight.base);
    }
    this._sight = null;
    Alias_Game_Event_setupPageSettings.call(this);
    if (/<retaindirection>/i.test(this.notes())) {
      this.setDirection(this._prevDirection);
    }
    this.setupSight();
  };

  var Alias_Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
  Game_Event.prototype.clearPageSettings = function() {
    Alias_Game_Event_clearPageSettings.call(this);
    if (this._sight) {
      SceneManager._scene.removeTempCollider(this._sight.base);
    }
    this._sight = null;
  };

  Game_Event.prototype.setupSight = function() {
    var sight = /<sight[=|:]([0-9a-zA-Z,\s]*)>/i.exec(this.comments());
    if (!sight) {
      sight = /<sight[=|:]([0-9a-zA-Z,\s]*)>/i.exec(this.notes());
    }
    this._castShadow = /<shadowcast>/i.test(this.comments());
    this._hasSight = false;
    if (sight) {
      sight = QuasiMovement.stringToAry(sight[1]);
      this._sightSettings = {};
      this._sightSettings.length = sight[1];
      this._sightSettings.target = $gamePlayer;
      this._sightSettings.switch = [this._mapId, this._eventId, sight[2].toUpperCase()];
      this._sightSettings.shape  = sight[0].toLowerCase();
      sight[3] = typeof sight[3] !== "undefined" ? sight[3] : "true";
      this._sightSettings.update = sight[3] === "true";
      this._hasSight = true;
    }
  };

  Game_Event.prototype.castShadow = function() {
    return this._castShadow;
  };
})();
