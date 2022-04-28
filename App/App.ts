/// <reference path="App$Types.d.ts" />
/// <reference path="Global.d.ts" />
import 'pixi.js';
import * as Core from "./Scripts/Core/Core";
import * as Scenes from  "./Scripts/Scenes/Scenes";
import * as PIXI from "./Scripts/PIXI/PIXI";

import "./Scripts/Logger";
import "./Scripts/Config";
import "./Scripts/ConfigSprites";

PIXI.ApplicationController.Instantiate();
Scenes.SceneManager.LoadScene(Scenes.SceneStart);