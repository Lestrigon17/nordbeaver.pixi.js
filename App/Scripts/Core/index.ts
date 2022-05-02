/// <reference path="index.d.ts" />

import { EventHandler } from "./EventHandler";
import { PIXIComponents } from "./PIXIComponents";
import { ResourceLoader } from "./ResourceLoader";
import { SoundPlayer } from "./SoundPlayer";
import { Utils } from "./Utils";

// export const Core = { ...exports };
export class Core {
	public static ResourceLoader = ResourceLoader;
	public static EventHandler 	 = EventHandler;
	public static PIXIComponents = PIXIComponents;
	public static SoundPlayer 	 = SoundPlayer;
	public static Utils 		 = Utils;
}