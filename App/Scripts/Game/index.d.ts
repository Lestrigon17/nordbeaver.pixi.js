declare namespace Types {
	export namespace Game {
		export type Manager = import('./Manager').Manager;
		export type Session = import("./Session").Session;
		export type EntityController = typeof import("./EntityController").EntityController;
	}
}