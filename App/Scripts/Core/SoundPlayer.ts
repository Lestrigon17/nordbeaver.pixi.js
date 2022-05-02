import { Sound as PIXISound} from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { Config } from '../Configs';
import { Logger } from '../Logger';
import { Utils } from './Utils';

type TSoundAliasKey = keyof typeof Config.Sounds;

// TODO: Передалть на mute логику
export class SoundPlayer {
	private static _isEnabled: boolean = true;
	private static _volume: number = 0.25;

	private static _soundStorage: Map<TSoundAliasKey, PIXISound> = new Map();

	public static Init(): Promise<void> {
		const sounds = Config.Sounds as Record<TSoundAliasKey, string>;
		let promiseQuery: Promise<void>[] = [];

		for (let _key in sounds) {
			if (_key === 'default') continue;

			const key = _key as TSoundAliasKey;
			const {resolver, promise} = Utils.Promises.GetResolver();

			PIXISound.from({
				url: sounds[key],
				preload: true,
				loaded: (err, sound) => {
					resolver();
					if (!sound) {
						Logger.LogError("Can't load sound", sounds[key])
						return;
					}

					this._soundStorage.set(key, sound);
				}
			})

			promiseQuery.push(promise);
		}

		return new Promise((resolve) => {
			Promise.all(promiseQuery)
				.then(() => resolve());
		})
	}

	public static PlaySound(key: TSoundAliasKey): void {
		if (this._isEnabled === false) return;
		if (!this._soundStorage.has(key)) {
			Logger.LogError("SoundStorage has no ", key);
			return;
		}

		const sound = this._soundStorage.get(key)!;
		sound.volume = this._volume;
		sound.play();
	}
}