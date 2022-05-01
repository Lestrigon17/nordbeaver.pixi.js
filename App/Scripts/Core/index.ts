/// <reference path="index.d.ts" />

import { EventHandler } from "./EventHandler";
import { PIXIComponents } from "./PIXIComponents";
import { ResourceLoader } from "./ResourceLoader";

// export const Core = { ...exports };
export class Core {
	public static ResourceLoader = ResourceLoader;
	public static EventHandler 	 = EventHandler;
	public static PIXIComponents = PIXIComponents;
}