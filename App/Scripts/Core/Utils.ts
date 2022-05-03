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

		
		public static Lerp(from: number, to: number, time: number): number {
			time = Math.min(Math.max(time, 0), 1);
			
			return ( 1 - time ) * from + time * to;
		}
	}

	export class Array {
		public static GetRandom<T>(array: T[]): Nullable<T> {
			if (array.length === 0) return;

			const randomIndex = Number.RandomInteger(0, array.length);
			return array[randomIndex]!;
		}
	}
}