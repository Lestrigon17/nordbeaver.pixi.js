import * as PIXI from "pixi.js";
import { Button, EEventType } from "./Button";
declare type TSpriteConfig = {
    active: string;
    hover?: string;
    press?: string;
};
export declare class ButtonSprite extends Button {
    sprite: PIXI.Sprite;
    set spriteConfig(config: TSpriteConfig);
    set spriteSheet(config: PIXI.LoaderResource);
    private _spriteConfig;
    private _spriteSheet?;
    private _isHover;
    private _isDown;
    protected OnLoad(): void;
    protected OnDestroy(): void;
    protected OnPointerEvent(event: EEventType): void;
    private UpdateView;
}
export {};
//# sourceMappingURL=ButtonSprite.d.ts.map