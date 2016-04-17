//============================================================================
// Quasi Q Events
// Version: 1.00
// Last Update: February 8, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiQEvents.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - Open the Help menu for setup guide
//============================================================================

var Imported = Imported || {};
Imported.Quasi_QEvents = 1.00;

//=============================================================================
 /*:
 * @plugindesc Extends Common Events functionality
 * Version 1.00
 * @author Quasi      Site: http://quasixi.com
 *
 * @help
 * =============================================================================
 * ** What this does
 * =============================================================================
 *  This extends common events, into an new type of "common event" which I
 * called QEvents. You can run multiple QEvents at the same time, unlike
 * common events.
 *  Other plugins I create will also pass in variables that you can use
 * inside this QEvent, like a variable to know which character triggered it.
 * Those plugins will have instructions on how to access those variables.
 * =============================================================================
 * ** Usage
 * =============================================================================
 *  To mark a common event as a Q Event, add the following inside
 * a comment in the common event:
 *     <qevent>
 * =============================================================================
 * Links
 *  - http://quasixi.com/mv/
 *  - https://github.com/quasixi/Quasi-MV-Master-Demo
 */
//=============================================================================

//-----------------------------------------------------------------------------
// New Classes

function Game_QuasiQEvent() {
  this.initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------
// Quasi Region Events

var QuasiQEvents = (function() {
  QuasiQEvents = {
    _ids: [],
    _playing: []
  };

  QuasiQEvents.getQEvents = function() {
    for (var i = 1; i < $dataCommonEvents.length; i++) {
      var list = $dataCommonEvents[i].list;
      var id   = $dataCommonEvents[i].id;
      var comment = "";
      for (var j = 0; j < list.length; j++) {
        if (list[j].code !== 108 && list[j].code !== 408) continue;
        comment += list[j].parameters[0];
      }
      if (/<qevent>/i.test(comment)) {
        this._ids.push(id);
      }
    }
  };

  QuasiQEvents.start = function(id, variables) {
    for (var i = 0; i <= this._playing.length; i++) {
      if (!this._playing[i]) {
        this._playing[i] = new Game_QuasiQEvent(id, i, variables);
        break;
      }
    }
  };

  QuasiQEvents.contains = function(id) {
    return this._ids.contains(id);
  };

  //-----------------------------------------------------------------------------
  // Game_QuasiQEvent
  //
  // The game object class for a Quasi QEvent

  Game_QuasiQEvent.prototype = Object.create(Game_CommonEvent.prototype);
  Game_QuasiQEvent.prototype.constructor = Game_QuasiQEvent;

  Game_QuasiQEvent.prototype.initialize = function(commonEventId, index, variables) {
    this._queueIndex = index;
    this._variables  = variables || {};
    Game_CommonEvent.prototype.initialize.call(this, commonEventId);
  };

  Game_QuasiQEvent.prototype.refresh = function() {
    this._interpreter = new Game_Interpreter();
    for (var key in this._variables) {
      if (!this._variables.hasOwnProperty(key)) continue;
      this._interpreter[key] = this._variables[key];
    }
    this._interpreter.setup(this.list());
  };

  Game_QuasiQEvent.prototype.update = function() {
    if (!this._interpreter.isRunning()) {
      QuasiQEvents._playing[this._queueIndex] = null;
    }
    this._interpreter.update();
  };

  //-----------------------------------------------------------------------------
  // DataManager
  //
  // The static class that manages the database and game objects.

  var Alias_DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    Alias_DataManager_createGameObjects.call(this);
    QuasiQEvents.getQEvents();
  };

  //-----------------------------------------------------------------------------
  // Game_Temp
  //
  // The game object class for temporary data that is not included in save data.

  var Alias_Game_Temp_reserveCommonEvent = Game_Temp.prototype.reserveCommonEvent;
  Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    if (QuasiQEvents.contains(commonEventId)) {
      QuasiQEvents.start(commonEventId);
      return;
    }
    Alias_Game_Temp_reserveCommonEvent.call(this, commonEventId);
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //
  // The game object class for a map. It contains scrolling and passage
  // determination functions.

  var Alias_Game_Map_updateEvents = Game_Map.prototype.updateEvents;
  Game_Map.prototype.updateEvents = function() {
    Alias_Game_Map_updateEvents.call(this);
    QuasiQEvents._playing.forEach(function(event) {
      if (event) event.update();
    });
  };

  return QuasiQEvents;
})();
