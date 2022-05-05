import * as PIXI from 'pixi.js';
import { Core } from "../../../Core";
export declare type TContstrains = {
    up?: typeof Base[];
    down?: typeof Base[];
    left?: typeof Base[];
    right?: typeof Base[];
};
export declare class Base extends Core.PIXIComponents.Base {
    static allowHeight: number;
    get allowHeight(): number;
    sprite: PIXI.Sprite;
    size: PIXI.ISize;
    matrixPoint: PIXI.IPointData;
    allowConstrains: TContstrains;
    protected spriteTexture?: PIXI.Texture;
    protected OnLoad(): void;
}
//# sourceMappingURL=Base.d.ts.map