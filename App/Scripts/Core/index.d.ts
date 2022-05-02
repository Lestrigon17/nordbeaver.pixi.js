declare namespace Types {
	export namespace Core {
		export type ResourceLoader  = import('./ResourceLoader').ResourceLoader;
		export type EventHandler 	= import('./EventHandler').EventHandler;
		export type SoundPlayer		= import("./SoundPlayer").SoundPlayer;
		export type Utils 			= import("./Utils").Utils;
	}
}