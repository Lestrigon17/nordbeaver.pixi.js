
import * as PIXI from 'pixi.js';

class LoaderItem {
	public link: string = "";
	public callback?: Function;
}

export class ResourceLoader {
	private static _loader = new PIXI.Loader();
	private static _resolversQuery: Map<string, Function[]> = new Map();
	private static _loaderQuery: LoaderItem[] = [];

	public static GetList(links: string[]): Promise<void[]> {
		let promiseList: Promise<void>[] = [];

		links.forEach((link) => {
			if (this._loader.resources[link]) return;
			let resolver!: Function;
			promiseList.push(new Promise((resolve) => {
				resolver = resolve;
			}))

			const loaderItem = new LoaderItem();
			loaderItem.link = link;
			loaderItem.callback = resolver;

			this._loaderQuery.push(loaderItem);
		})

		return Promise.all(promiseList);
	}

	public static Get(link: string): Promise<PIXI.LoaderResource> {
		if (this._loader.resources[link]) {
			return Promise.resolve(	this._loader.resources[link] );
		}

		let returnPromise = new Promise<PIXI.LoaderResource>((resolve, _) => {
			const resolvers = this._resolversQuery.get(link);

			if (!resolvers) {
				this._resolversQuery.set(link, [resolve]);

				const loaderItem = new LoaderItem();
				loaderItem.link = link;
				loaderItem.callback = () => {
					if (!this._resolversQuery.has(link)) return; // wtf?!

					const resource = this._loader.resources[link];
					this._resolversQuery.get(link)!.forEach(resolver => resolver(resource));
					this._resolversQuery.delete(link);
				}

				this._loaderQuery.push(loaderItem);
				return;
			}

			resolvers.push(resolve);
		}) 

		return returnPromise;
	}

	public static OnUpdate(): void {
		if (this._loader.loading) return;
		if (this._loaderQuery.length === 0) return;

		const callbacks: Function[] = []
		this._loaderQuery.forEach(info => {
			if (!this._loader.resources[info.link]) {
				this._loader.add(info.link, info.link);
			}

			if (info.callback) {
				callbacks.push(info.callback);
			}
		})

		this._loaderQuery = [];
		this._loader.load(() => {
			callbacks.forEach(callback => void callback());
		});
	}
}

// Initialize updates
setInterval(function() {
	ResourceLoader.OnUpdate();
}, 0);