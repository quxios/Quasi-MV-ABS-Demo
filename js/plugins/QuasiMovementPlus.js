//============================================================================
// Quasi Movement Plus
// Version: 1.11
// Last Update: March 2, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/terms-of-use/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiMovementPlus.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiMovement
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/mv/movement/
//  - - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
//============================================================================

var Imported = Imported || {};
Imported.Quasi_MovementPlus = 1.11;

//=============================================================================
 /*:
 * @plugindesc Quasi Movement Addon: Adds extra features to Quasi Movement
 * Version 1.11
 * @author Quasi      Site: http://quasixi.com
 *
 * @param Extra Interaction Distance
 * @desc Lets you increase the interaction distance, in pixel terms.
 * Default: 0
 * @default 0
 *
 * @param Dash on Mouse
 * @desc Auto dash on mouse clicks?
 * Set to true or false
 * @default true
 *
 * @param Face towards Mouse
 * @desc Player will face towards mouse location
 * Set to true or false
 * @default true
 *
 * @param Disable Vertical Input
 * @desc Disables up and down input keys
 * Set to true or false
 * @default false
 *
 * @param Disable Horizontal Input
 * @desc Disables left and right input keys
 * Set to true or false
 * @default false
 *
 * @param Adjust Jump
 * @desc Adjusts jump distance to a passable location.
 * Set to true or false
 * @default true
 * @help
 * =============================================================================
 * ** Extras
 * =============================================================================
 * Stop Event while Messgae is playing <Comment> or <Note>
 *       <lockonmsg>
 *     Place this inside a comment on the event page or place it inside
 *     the events note.
 *
 * Stop all Events on map <script call>
 *      $gameMap.globalLock(ignore)
 *    ignore: an array with the id's of events to ignore, can be left out
 *            to not ignore any events.
 *
 * Unlock all Events that are globalLocked <script call>
 *      $gameMap.globalUnlock()
 *
 *  ** Comments are Page based.
 *  ** Notes apply to all Pages.
 * =============================================================================
 * Links
 *  - http://quasixi.com/mv/movement/
 *  - https://github.com/quasixi/RPG-Maker-MV
 *  - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
 */
//=============================================================================

//-----------------------------------------------------------------------------
// Dependencies

if (!Imported.Quasi_Movement) {
  alert("Error: Quasi Movement Plus requires Quasi Movement to work.");
  throw new Error("Error: Quasi Movement Plus requires Quasi Movement to work.")
}

//-----------------------------------------------------------------------------
// Movement Plus

(function() {
  var MovementPlus = {};
  MovementPlus.proccessParameters = function() {
    var parameters     = PluginManager.parameters('QuasiMovementPlus');
    this.interaction   = Number(parameters['Extra Interaction Distance'] || 0);
    this.dashOnMouse   = parameters['Dash on Mouse'].toLowerCase() === 'true';
    this.faceMouse     = parameters['Face towards Mouse'].toLowerCase() === 'true';
    this.adjustJump    = parameters['Adjust Jump'].toLowerCase() === 'true';
    this.cantVertical   = parameters['Disable Vertical Input'].toLowerCase() === 'true';
    this.cantHorizontal = parameters['Disable Horizontal Input'].toLowerCase() === 'true';
  };
  MovementPlus.proccessParameters();

  TouchInput._onMouseMove = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    this._onMove(x, y);
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //
  // The game object class for a map. It contains scrolling and passage
  // determination functions.

  Game_Map.prototype.globalLock = function(ignore) {
    ignore = ignore || [];
    $gamePlayer._globalLocked = true;
    this.events().forEach(function(event) {
      if (ignore.contains(event.eventId)) return;
      event._globalLocked = true;
    });
  };

  Game_Map.prototype.globalUnlock = function() {
    $gamePlayer._globalLocked = false;
    this.events().forEach(function(event) {
      event._globalLocked = false;
    });
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  // The superclass of Game_Character. It handles basic information, such as
  // coordinates and images, shared by all characters.

  Game_CharacterBase.prototype.jumpable = function() {
    return false;
  };

  Game_CharacterBase.prototype.canJump = function(xPlus, yPlus) {
    this._findingJump = true;
    var x2 = this.px + (xPlus * QuasiMovement.tileSize);
    var y2 = this.py + (yPlus * QuasiMovement.tileSize);
    if (this.canPixelPass(x2, y2, 5)) {
      this._findingJump = false;
      return [xPlus, yPlus];
    }
    var i = 0;
    if (x2 !== this.px) {
      var dir = xPlus > 0 ? -1 : 1;
      i = 0;
      while (!this.canPixelPass(x2, y2, 5)) {
        x2 += this.moveTiles() * dir;
        i++;
        if (i > 20) break;
      }
      if (i > 20) x2 = this.px;
    }
    if (y2 !== this.py) {
      var dir = yPlus > 0 ? -1 : 1;
      i = 0;
      while (!this.canPixelPass(x2, y2, 5)) {
        y2 += this.moveTiles() * dir;
        i++;
        if (i > 20) break;
      }
      if (i > 20) y2 = this.py;
    }
    this._findingJump = false;
    x2 = (x2 - this.px) / QuasiMovement.tileSize;
    y2 = (y2 - this.py) / QuasiMovement.tileSize;
    return [x2, y2];
  };

  var Alias_Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
  Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    if (MovementPlus.adjustJump) {
      var newPos = this.canJump(xPlus, yPlus);
      xPlus = newPos[0];
      yPlus = newPos[1];
    }
    Alias_Game_CharacterBase_jump.call(this, xPlus, yPlus);
  };

  var Alias_Game_Event_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
  Game_Character.prototype.updateRoutineMove = function() {
    if (this._globalLocked) return;
    Alias_Game_Event_updateRoutineMove.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  // The game object class for the player. It contains event starting
  // determinants and map scrolling functions.

  var Alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if (this._globalLocked) return false;
    return Alias_Game_Player_canMove.call(this);
  };

  var Alias_Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    Alias_Game_Player_initMembers.call(this);
    this._mouseX = TouchInput.x;
    this._mouseY = TouchInput.y;
  }

  var Alias_Game_Player_moveInputHorizontal = Game_Player.prototype.moveInputHorizontal;
  Game_Player.prototype.moveInputHorizontal = function(dir) {
    if (MovementPlus.cantHorizontal) return;
    return Alias_Game_Player_moveInputHorizontal.call(this, dir);
  };

  var Alias_Game_Player_moveInputVertical = Game_Player.prototype.moveInputVertical;
  Game_Player.prototype.moveInputVertical = function(dir) {
    if (MovementPlus.cantVertical) return;
    return Alias_Game_Player_moveInputVertical.call(this, dir);
  };

  var Alias_Game_Player_moveInputDiagonal = Game_Player.prototype.moveInputDiagonal;
  Game_Player.prototype.moveInputDiagonal = function(dir) {
    if (MovementPlus.cantVertical || MovementPlus.cantHorizontal) return;
    return Alias_Game_Player_moveInputDiagonal.call(this, dir);
  };

  var Alias_Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function(sceneActive) {
    if (MovementPlus.faceMouse && !this.isMoving() && this.canMove()) {
      this.updateDirection();
    }
    Alias_Game_Player_update.call(this, sceneActive);
  };

  Game_Player.prototype.updateDirection = function() {
    if (this._mouseX !== TouchInput.x && this._mouseY !== TouchInput.y) {
      this._mouseX = TouchInput.x;
      this._mouseY = TouchInput.y;
      var x = $gameMap.canvasToMapPX(this._mouseX);
      var y = $gameMap.canvasToMapPY(this._mouseY);
      this.setDirection(this.directionTowards(x, y));
    }
  };

  Game_Player.prototype.updateDashing = function() {
    if (this.startedMoving()) return;
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
      this._dashing = this.isDashButtonPressed() || (MovementPlus.dashOnMouse && $gameTemp.isDestinationValid() && QuasiMovement.moveOnClick);
    } else {
      this._dashing = false;
    }
  };

  Game_Player.prototype.checkEventTriggerThere = function(triggers, x2, y2) {
    if (this.canStartLocalEvents()) {
      var direction = this.direction();
      var x1 = this.px;
      var y1 = this.py;
      x2 = x2 || $gameMap.roundPXWithDirection(x1, direction, this.moveTiles() + MovementPlus.interaction);
      y2 = y2 || $gameMap.roundPYWithDirection(y1, direction, this.moveTiles() + MovementPlus.interaction);
      this.startMapEvent(x2, y2, triggers, true);
      if ($gameMap.isAnyEventStarting) {
        var es = $gameMap.isAnyEventStarting();
      } else if ($gameMap.someEventStarting) {
        var es = $gameMap.someEventStarting();
      } else {
        var es = true;
        alert("Please inform Quasi that you do not have a 'isAnyEventStarting' function");
      }
      if (!es) return this.checkCounter(triggers);
    }
  };

  Game_Player.prototype.checkCounter = function(triggers, x2, y2) {
    var direction = this.direction();
    var x1 = this.px;
    var y1 = this.py;
    x2 = x2 || $gameMap.roundPXWithDirection(x1, direction, this.moveTiles() + MovementPlus.interaction);
    y2 = y2 || $gameMap.roundPYWithDirection(y1, direction, this.moveTiles() + MovementPlus.interaction);
    this.collider().moveto(x2, y2);
    var counters = $gameMap.getTileBoxesAt(this.collider(), function(tile) {
      if (!tile.isCounter) return true;
      return false;
    });
    this.collider().moveto(x1, y1);
    var counter = counters[0];
    if (counter) {
      if ([4, 6].contains(direction)) {
        var dist = Math.abs(counter._center.x - this.cx());
        dist += this.collider().width;
      }  else if ([8, 2].contains(direction)) {
        var dist = Math.abs(counter._center.y - this.cy());
        dist += this.collider().height;
      }
      var x3 = $gameMap.roundPXWithDirection(x1, direction, dist);
      var y3 = $gameMap.roundPYWithDirection(y1, direction, dist);
      return this.startMapEvent(x3, y3, triggers, true);
    }
    return false;
  };

  Game_Player.prototype.shipBoatThere = function(x2, y2) {
    var direction = this.direction();
    var x1 = this.px;
    var y1 = this.py;
    x2 = x2 || $gameMap.roundPXWithDirection(x1, direction, this.moveTiles() + 4 + MovementPlus.interaction);
    y2 = y2 || $gameMap.roundPYWithDirection(y1, direction, this.moveTiles() + 4 + MovementPlus.interaction);
    var collider = this.collider();
    collider.moveto(x2, y2)
    var vehicles = $gameMap.getCharactersAt(collider, function(e) {
      if (e.constructor !== Game_Vehicle) return true;
      return (e.isAirship() || !e.isOnMap());
    });
    collider.moveto(this.px, this.py);
    if (vehicles.length === 0) return false;
    var cx = this.cx;
    var cy = this.cy;
    vehicles.sort(function(a, b) {
      return a.pixelDistanceFrom(cx, cy) - b.pixelDistanceFrom(cx, cy);
    });
    return vehicles[0];
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  // The game object class for an event. It contains functionality for event page
  // switching and running parallel process events.

  Game_Event.prototype.lockOnMsg = function() {
    var comment = this.comments();
    var note = this.notes();
    return /<lockonmsg>/i.test(comment) || /<lockonmsg>/i.test(note);
  };

  var Alias_Game_Event_canMove = Game_Event.prototype.canMove;
  Game_Event.prototype.canMove = function() {
    return Alias_Game_Event_canMove.call(this) && !this._globalLocked;
  };

  var Alias_Game_Event_updateStop = Game_Event.prototype.updateStop;
  Game_Event.prototype.updateStop = function() {
    if (this.lockOnMsg()) {
      if ($gameMessage.isBusy()) {
        this.lockedFromMsg = true;
        this._locked = true;
      } else if (this._locked && this.lockedFromMsg) {
        this.lockedMsg = null;
        this._locked = false;
      }
    }
    Alias_Game_Event_updateStop.call(this);
  };
})();
