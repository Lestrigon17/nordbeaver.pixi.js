/// <reference path="App$Types.d.ts" />
/// <reference path="Global.d.ts" />
import 'pixi.js';
import "./App.imports";
import { Core } from './Scripts/Core';
import { Scenes } from './Scripts/Scenes';

Core.PIXIComponents.ApplicationController.Instantiate();
Scenes.Manager.LoadScene(Scenes.List.Start);