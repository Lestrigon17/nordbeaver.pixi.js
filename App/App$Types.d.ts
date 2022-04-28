declare namespace App$Types {
	export type EventHandler<T extends Function = () => void> = import('./Scripts_old/Core/EventHandler').EventHandler<T>;
}