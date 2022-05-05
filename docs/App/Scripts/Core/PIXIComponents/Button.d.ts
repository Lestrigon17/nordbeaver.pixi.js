import * as PIXI from "pixi.js";
import { EventHandler } from "../EventHandler";
import { Base } from "./Base";
export declare enum EEventType {
    PointerDown = "pointerdown",
    PointerUp = "pointerup",
    PointerUpOutSide = "pointerupoutside",
    PointerOver = "pointerover",
    PointerOut = "pointerout",
    InteractiveChange = "interactivechange"
}
export declare class Button extends Base {
    static EEventType: typeof EEventType;
    OnButtonEvent: EventHandler<(event: EEventType, state?: boolean) => void>;
    set isInteractive(state: boolean);
    private _isInteractive;
    constructor(...args: ConstructorParameters<typeof PIXI.Container>);
    protected OnLoad(): void;
    protected OnDestroy(): void;
    private OnButtonDown;
    private OnButtonUp;
    private OnButtonUpOutSide;
    private OnButtonOver;
    private OnButtonOut;
}
//# sourceMappingURL=Button.d.ts.map