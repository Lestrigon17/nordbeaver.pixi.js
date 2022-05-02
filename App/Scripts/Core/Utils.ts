export namespace Utils {
	export class Promises {
		public static GetResolver<T = void>(): {
			resolver: Function,
			promise: Promise<T>
		} {
			let resolver!: Function;
			let promise = new Promise<T>((resolve) => {
				resolver = resolve;
			});

			return {
				resolver,
				promise
			}
		}
	}
}