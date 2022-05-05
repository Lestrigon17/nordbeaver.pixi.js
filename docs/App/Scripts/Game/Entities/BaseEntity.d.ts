import * as PIXI from 'pixi.js';
import { Core } from "../../Core";
import { Player } from "../Player";
export declare class BaseEntity extends Core.PIXIComponents.Base {
    sprite: PIXI.Sprite;
    isCollisionEnabled: boolean;
    protected spriteTexture?: PIXI.Texture;
    protected OnLoad(): void;
    OnCollidePlayer(player: Player): void;
    private CreateView;
}
//# sourceMappingURL=BaseEntity.d.ts.map