import * as PIXI from 'pixi.js';
import { IPointData } from 'pixi.js';
export declare namespace Utils {
    class Promises {
        static GetResolver<T = void>(): {
            resolver: Function;
            promise: Promise<T>;
        };
    }
    class Number {
        /***
         * @param min inclusive
         * @param max exclusive
         */
        static RandomInteger(min: number, max: number): number;
        static Lerp(from: number, to: number, time: number): number;
    }
    class PIXI {
        static IsCollideByRectangle(target: PIXI.Container, attacker: PIXI.Container): boolean;
        static GetDistance(target: PIXI.Container, attacker: PIXI.Container): IPointData;
        static GetHalfSize(container: PIXI.Container): PIXI.ISize;
        static GetCeneter(container: PIXI.Container): PIXI.IPointData;
    }
    class Array {
        static GetRandom<T>(array: T[]): Nullable<T>;
    }
}
//# sourceMappingURL=Utils.d.ts.map