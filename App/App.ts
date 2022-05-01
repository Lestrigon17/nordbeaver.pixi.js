/// <reference path="App$Types.d.ts" />
/// <reference path="Global.d.ts" />
import 'pixi.js';
import "./App.imports";
import Core from './Scripts/Core';
import Scenes from './Scripts/Scenes';

Core.PIXI.ApplicationController.Instantiate();
Scenes.SceneManager.LoadScene(Scenes.SceneStart);
