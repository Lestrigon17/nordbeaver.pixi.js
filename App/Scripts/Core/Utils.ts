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

	export class Number {
		/***
		 * @param min inclusive
		 * @param max exclusive 
		 */
		public static RandomInteger(min: number, max: number): number {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
		}
	}
}