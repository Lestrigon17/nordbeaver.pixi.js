/// <reference path="./index.d.ts" />

import { BaseScreen } from "./BaseScreen";
import { Manager } from "./Manager";
import { ScreenStart } from "./ScreenStart/ScreenStart";

export class Screens {
	public static BaseScreen = BaseScreen;
	public static Manager 	 = Manager;

	public static List = {
		Start: ScreenStart
	}
}