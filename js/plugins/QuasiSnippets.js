//============================================================================
// Quasi Snippets
// Version: 1.01
// Last Update: March 30, 2016
//============================================================================

var Imported = Imported || {};
Imported.Quasi_Snippets = 1.01;

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
 * @param Demo Text
 * @desc Turns switch 1 on or off on new game with Quick Test
 * Set to true or false
 * @default true
 *
 * @param Debug
 * @desc Turns on Console by Default
 * Set to true or false
 * @default true
  */
 //=============================================================================

(function() {
  var Quasi = {};
  Quasi.param      = PluginManager.parameters('QuasiSnippets');
  Quasi.quickStart = (Quasi.param['Quick Test'].toLowerCase() == 'true');
  Quasi.demoText   = (Quasi.param['Demo Text'].toLowerCase() == 'true');
  Quasi.debug      = (Quasi.param['Debug'].toLowerCase() == 'true');

  SceneManager._screenWidth       = 1104;
  SceneManager._screenHeight      = 624;
  SceneManager._boxWidth          = 1104;
  SceneManager._boxHeight         = 624;

  window.resizeTo(SceneManager._screenWidth, SceneManager._screenHeight);

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
      $gameSwitches.setValue(1, Quasi.demoText);
      this.updateDocumentTitle();
    } else {
      Alias_Scene_Boot_start.call(this);
    }
  };
})();
