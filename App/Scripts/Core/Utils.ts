import * as PIXI from 'pixi.js'
import { IPointData } from 'pixi.js';

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

	export class PIXI {
		public static HitRectangle(
			target: PIXI.Container, 
			attacker: PIXI.Container
		): boolean {
			let isCollide: boolean = false;
			const distance: PIXI.IPointData = this.GetDistance(target, attacker);
			const targetHalfSize: PIXI.ISize = this.GetHalfSize(target);
			const attackerHalfSize: PIXI.ISize = this.GetHalfSize(target);
			const combinedHalfSize: PIXI.ISize = {
				width: targetHalfSize.width + attackerHalfSize.width,
				height: targetHalfSize.height + attackerHalfSize.height
			}

			const collideByX = distance.x < combinedHalfSize.width;
			const collideByY = distance.y < combinedHalfSize.height;

			isCollide = collideByX && collideByY;

			return isCollide;
		}

		public static GetDistance(
			target: PIXI.Container, 
			attacker: PIXI.Container
		): IPointData {
			return {
				x: Math.abs(target.x - attacker.x),
				y: Math.abs(target.y - attacker.y)
			}
		}

		public static GetHalfSize(container: PIXI.Container): PIXI.ISize {
			return {
				width: container.width / 2,
				height: container.height / 2
			}
		}

		public static GetCeneter(container: PIXI.Container): PIXI.IPointData {
			return {
				x: container.x + container.width / 2,
				y: container.y + container.height / 2
			}
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