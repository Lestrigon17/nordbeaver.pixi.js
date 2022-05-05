/// <reference path="./index.d.ts" />

import { EntityController } from "./EntityController";
import { Manager } from "./Manager";
import { Session } from "./Session";


export class Game {
	public static Manager = Manager;
	public static Session = Session;
	public static EntityController = EntityController;
}