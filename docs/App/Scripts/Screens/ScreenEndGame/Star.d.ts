import * as PIXI from 'pixi.js';
import { Core } from "../../Core";
export declare class Star extends Core.PIXIComponents.Base {
    sprite: PIXI.Sprite;
    private _speedScale;
    private _speedRotation;
    protected OnLoad(): void;
    private InitializeSprite;
    protected OnUpdate(deltaTime: number): void;
}
//# sourceMappingURL=Star.d.ts.map