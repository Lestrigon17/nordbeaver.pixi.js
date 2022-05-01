
import * as PIXI from 'pixi.js';
export class ResourceLoader {
	private static _cachedResources: string[] = [];
	private static _loader = new PIXI.Loader();
	private static _resolversQuery: Map<string, Function[]> = new Map();

	public static Get(link: string): Promise<PIXI.LoaderResource> {
		if (!!~this._cachedResources.indexOf(link)) {
			return Promise.resolve(
				this._loader.resources[link]
			);
		}

		let returnPromise = new Promise<PIXI.LoaderResource>((resolve, _) => {
			const resolvers = this._resolversQuery.get(link);
			if (!resolvers) {
				this._resolversQuery.set(link, [resolve]);

				this._loader
					.add(link, link)
					.load(() => {
						if (!this._resolversQuery.has(link)) return; // wtf?!
						const resource = this._loader.resources[link];
						this._resolversQuery.get(link)!.forEach(resolver => resolver(resource));
						this._resolversQuery.delete(link);
					})
				return;
			}

			resolvers.push(resolve);
		}) 

		return returnPromise;
	}
}