//============================================================================
// Quasi Snippets
// Version: 1.02
// Last Update: April 1, 2016
//============================================================================

var Imported = Imported || {};
Imported.Quasi_Snippets = 1.02;

//=============================================================================
 /*:
 * @plugindesc Some quick changes to MV.
 * @author Quasi
 *
 * @param Quick Test
 * @desc Enable quick testing.
 * Set to true or false
 * @default true
 *
 * @param Default Enabled Switches
 * @desc Turns on a list of switches on by default
 * Each switch should be seperated by a comma.
 * @default 1
 *
 * @param Debug
 * @desc Turns on Console by Default
 * Set to true or false
 * @default true
 *
 * @param Screen Width
 * @desc Set the default Screen Width
 * Default: 1104
 * @default 1104
 *
 * @param Screen Height
 * @desc Set the default Screen Width
 * Default: 624
 * @default 624
  */
 //=============================================================================

(function() {
  var Quasi = {};
  Quasi.param      = PluginManager.parameters('QuasiSnippets');
  Quasi.quickStart = (Quasi.param['Quick Test'].toLowerCase() == 'true');
  Quasi.debug      = (Quasi.param['Debug'].toLowerCase() == 'true');
  Quasi.switches   = Quasi.param['Default Enabled Switches'].split(",").map(function(n) { return Number(n) || 0 });

  SceneManager._screenWidth       = Number(Quasi.param['Screen Width']);
  SceneManager._screenHeight      = Number(Quasi.param['Screen Height']);
  SceneManager._boxWidth          = Number(Quasi.param['Screen Width']);
  SceneManager._boxHeight         = Number(Quasi.param['Screen Height']);

  window.resizeBy(SceneManager._screenWidth - window.innerWidth, SceneManager._screenHeight - window.innerHeight);

  if (Quasi.debug) {
    require('nw.gui').Window.get().showDevTools();
  }

  var Alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    if (DataManager.isBattleTest() || DataManager.isEventTest()) {
      Alias_Scene_Boot_start.call(this);
    } else if (Quasi.quickStart) {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
      for (var i = 0; i < Quasi.switches.length; i++) {
        $gameSwitches.setValue(Quasi.switches[i], true);
      }
      this.updateDocumentTitle();
    } else {
      Alias_Scene_Boot_start.call(this);
    }
  };
})();
