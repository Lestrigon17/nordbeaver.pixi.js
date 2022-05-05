import * as PIXI from "pixi.js";
import { Core } from "../../Core";
export declare class PlayerItem extends Core.PIXIComponents.Base {
    labelName?: PIXI.Text;
    labelScore?: PIXI.Text;
    labelPlace?: PIXI.Text;
    OnReady: Types.Core.EventHandler;
    private _spriteSheet?;
    protected OnLoad(): void;
    Show(): void;
    Hide(): void;
    CreateView(isTop: boolean, place?: string): void;
}
//# sourceMappingURL=PlayerItem.d.ts.map